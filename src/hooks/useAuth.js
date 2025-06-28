import { useState, useEffect, useCallback } from 'react';
import AuthService from '../services/AuthService';
import { toast } from '../utils/notifications';
import { log } from '../config/environment';

/**
 * Custom hook for managing authentication state
 * Provides authentication methods and state management
 */
export function useAuth() {
  const [authService] = useState(() => new AuthService());
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  /**
   * Initialize authentication state on mount
   */
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        
        // Check if user is already authenticated
        const token = authService.getToken();
        const storedUser = authService.getUser();
        
        if (token && storedUser) {
          // Verify token is still valid by fetching current user
          try {
            const result = await authService.getCurrentUser();
            setUser(result.user);
            setIsAuthenticated(true);
            log('info', 'User authentication restored from storage');
          } catch (error) {
            // Token is invalid, clear auth data
            log('warn', 'Stored token is invalid, clearing auth data');
            authService.clearAuth();
            setUser(null);
            setIsAuthenticated(false);
          }
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        log('error', 'Failed to initialize authentication', error);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, [authService]);

  /**
   * Sign up a new user
   */
  const signUp = useCallback(async (userData) => {
    try {
      setIsLoading(true);
      const result = await authService.signUp(userData);
      
      setUser(result.user);
      setIsAuthenticated(true);
      
      toast.success(result.message || 'Account created successfully!');
      log('info', 'User signed up successfully', { userId: result.user?.id });
      
      return result;
    } catch (error) {
      log('error', 'Sign up failed', error);
      toast.error(error.message || 'Failed to create account');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [authService]);

  /**
   * Sign in an existing user
   */
  const signIn = useCallback(async (credentials) => {
    try {
      setIsLoading(true);
      const result = await authService.signIn(credentials);
      
      setUser(result.user);
      setIsAuthenticated(true);
      
      toast.success(result.message || 'Login successful!');
      log('info', 'User signed in successfully', { userId: result.user?.id });
      
      return result;
    } catch (error) {
      log('error', 'Sign in failed', error);
      toast.error(error.message || 'Failed to sign in');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [authService]);

  /**
   * Sign out the current user
   */
  const signOut = useCallback(async () => {
    try {
      setIsLoading(true);
      await authService.signOut();
      
      setUser(null);
      setIsAuthenticated(false);
      
      toast.success('You have been signed out successfully');
      log('info', 'User signed out successfully');
      
    } catch (error) {
      log('error', 'Sign out failed', error);
      // Still clear local state even if API call fails
      setUser(null);
      setIsAuthenticated(false);
      toast.warning('Signed out locally due to error');
    } finally {
      setIsLoading(false);
    }
  }, [authService]);

  /**
   * Request password reset
   */
  const forgotPassword = useCallback(async (email) => {
    try {
      setIsLoading(true);
      const result = await authService.forgotPassword(email);
      
      toast.success(result.message || 'Password reset instructions sent!');
      log('info', 'Password reset requested', { email });
      
      return result;
    } catch (error) {
      log('error', 'Password reset request failed', error);
      toast.error(error.message || 'Failed to send reset instructions');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [authService]);

  /**
   * Reset password with token
   */
  const resetPassword = useCallback(async (token, newPassword, confirmPassword) => {
    try {
      setIsLoading(true);
      const result = await authService.resetPassword(token, newPassword, confirmPassword);
      
      toast.success(result.message || 'Password reset successfully!');
      log('info', 'Password reset completed');
      
      return result;
    } catch (error) {
      log('error', 'Password reset failed', error);
      toast.error(error.message || 'Failed to reset password');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [authService]);

  /**
   * Refresh authentication token
   */
  const refreshToken = useCallback(async () => {
    try {
      const result = await authService.refreshToken();
      
      if (result.user) {
        setUser(result.user);
      }
      
      log('debug', 'Token refreshed successfully');
      return result;
    } catch (error) {
      log('error', 'Token refresh failed', error);
      // Clear auth state if refresh fails
      setUser(null);
      setIsAuthenticated(false);
      authService.clearAuth();
      throw error;
    }
  }, [authService]);

  /**
   * Update user profile
   */
  const updateUser = useCallback((updatedUser) => {
    setUser(updatedUser);
    authService.setUser(updatedUser);
    log('debug', 'User profile updated');
  }, [authService]);

  /**
   * Check if user has specific role or permission
   */
  const hasRole = useCallback((role) => {
    return user?.roles?.includes(role) || false;
  }, [user]);

  /**
   * Check if user has specific permission
   */
  const hasPermission = useCallback((permission) => {
    return user?.permissions?.includes(permission) || false;
  }, [user]);

  return {
    // State
    user,
    isAuthenticated,
    isLoading,
    isInitialized,
    
    // Methods
    signUp,
    signIn,
    signOut,
    forgotPassword,
    resetPassword,
    refreshToken,
    updateUser,
    
    // Utility methods
    hasRole,
    hasPermission,
    
    // Direct access to auth service if needed
    authService
  };
}

export default useAuth;
