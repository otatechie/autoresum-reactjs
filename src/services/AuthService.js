import axios from 'axios';
import { config, getApiUrl, log } from '../config/environment';

/**
 * Comprehensive Authentication Service Class
 * Handles all authentication-related operations with proper error handling,
 * validation, and token management.
 */
class AuthService {
  constructor() {
    this.baseURL = config.api.baseUrl;
    this.tokenKey = config.auth.tokenStorageKey;
    this.userKey = config.auth.userStorageKey;
    
    // Create axios instance with default config
    this.api = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: config.api.timeout,
    });

    // Setup interceptors
    this.setupInterceptors();
  }

  /**
   * Setup axios interceptors for request/response handling
   */
  setupInterceptors() {
    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response.data,
      (error) => {
        if (error.response?.status === 401) {
          this.clearAuth();
          // Don't redirect here, let components handle it
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Validate email format
   * @param {string} email - Email to validate
   * @returns {boolean} - True if valid email format
   */
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate password strength
   * @param {string} password - Password to validate
   * @returns {object} - Validation result with isValid and errors
   */
  validatePassword(password) {
    const errors = [];
    const passwordConfig = config.validation.password;

    if (!password) {
      errors.push('Password is required');
    } else {
      if (password.length < passwordConfig.minLength) {
        errors.push(`Password must be at least ${passwordConfig.minLength} characters long`);
      }
      if (password.length > passwordConfig.maxLength) {
        errors.push(`Password must be no more than ${passwordConfig.maxLength} characters long`);
      }
      if (passwordConfig.requireLowercase && !/(?=.*[a-z])/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
      }
      if (passwordConfig.requireUppercase && !/(?=.*[A-Z])/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
      }
      if (passwordConfig.requireNumbers && !/(?=.*\d)/.test(password)) {
        errors.push('Password must contain at least one number');
      }
      if (passwordConfig.requireSpecialChars && !/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(password)) {
        errors.push('Password must contain at least one special character');
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Sanitize user input
   * @param {string} input - Input to sanitize
   * @returns {string} - Sanitized input
   */
  sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    return input.trim().replace(/[<>]/g, '');
  }

  /**
   * Store authentication token
   * @param {string} token - JWT token
   */
  setToken(token) {
    localStorage.setItem(this.tokenKey, token);
  }

  /**
   * Retrieve authentication token
   * @returns {string|null} - JWT token or null
   */
  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Store user data
   * @param {object} user - User object
   */
  setUser(user) {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  /**
   * Retrieve user data
   * @returns {object|null} - User object or null
   */
  getUser() {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  /**
   * Clear authentication data
   */
  clearAuth() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  /**
   * Check if user is authenticated
   * @returns {boolean} - True if authenticated
   */
  isAuthenticated() {
    return !!this.getToken();
  }

  /**
   * Handle API errors and format them for UI display
   * @param {object} error - Axios error object
   * @returns {object} - Formatted error object
   */
  handleError(error) {
    let message = 'An unexpected error occurred. Please try again.';
    let status = 500;
    let validationErrors = {};

    if (error.response) {
      status = error.response.status;
      const data = error.response.data;

      switch (status) {
        case 400:
          message = data.message || 'Invalid request. Please check your input.';
          if (data.errors) {
            validationErrors = data.errors;
          }
          break;
        case 401:
          message = 'Invalid credentials. Please check your email and password.';
          break;
        case 422:
          message = 'Validation failed. Please check your input.';
          if (data.errors) {
            validationErrors = data.errors;
          }
          break;
        case 429:
          message = 'Too many requests. Please wait a moment and try again.';
          break;
        case 500:
          message = 'Server error. Please try again later.';
          break;
        default:
          message = data.message || message;
      }
    } else if (error.request) {
      message = 'Network error. Please check your connection and try again.';
      status = 0;
    }

    return {
      message,
      status,
      validationErrors,
      originalError: error
    };
  }

  /**
   * User registration
   * @param {object} userData - User registration data
   * @param {string} userData.email - User email
   * @param {string} userData.password - User password
   * @param {string} userData.confirmPassword - Password confirmation
   * @param {string} userData.firstName - User first name (optional)
   * @param {string} userData.lastName - User last name (optional)
   * @returns {Promise<object>} - Registration result
   */
  async signUp(userData) {
    try {
      log('info', 'Starting user registration', { email: userData.email });

      // Input validation
      const errors = {};

      if (!userData.email) {
        errors.email = 'Email is required';
      } else if (!this.validateEmail(userData.email)) {
        errors.email = 'Please enter a valid email address';
      }

      const passwordValidation = this.validatePassword(userData.password);
      if (!passwordValidation.isValid) {
        errors.password = passwordValidation.errors[0];
      }

      if (userData.password !== userData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }

      if (Object.keys(errors).length > 0) {
        log('warn', 'Registration validation failed', { errors });
        throw {
          response: {
            status: 422,
            data: { errors }
          }
        };
      }

      // Sanitize input
      const sanitizedData = {
        email: this.sanitizeInput(userData.email).toLowerCase(),
        password: userData.password,
        confirm_password: userData.confirmPassword, // Changed to match Django's expected field name
        username: this.sanitizeInput(userData.email).toLowerCase(), // Using email as username
        first_name: this.sanitizeInput(userData.firstName || ''),
        last_name: this.sanitizeInput(userData.lastName || '')
      };

      // Make API call
      log('debug', 'Making registration API call');
      const response = await this.api.post('/auth/register', sanitizedData);

      // Handle successful response
      if (response.token) {
        this.setToken(response.token);
        log('debug', 'Token stored successfully');
      }
      if (response.user) {
        this.setUser(response.user);
        log('debug', 'User data stored successfully');
      }

      log('info', 'User registration successful', { userId: response.user?.id });
      return {
        success: true,
        message: 'Account created successfully!',
        user: response.user,
        token: response.token
      };

    } catch (error) {
      log('error', 'Registration failed', error);
      const formattedError = this.handleError(error);
      throw formattedError;
    }
  }

  /**
   * User login
   * @param {object} credentials - Login credentials
   * @param {string} credentials.username - Username
   * @param {string} credentials.password - User password
   * @param {boolean} credentials.rememberMe - Remember user (optional)
   * @returns {Promise<object>} - Login result
   */
  async signIn(credentials) {
    try {
      // Input validation
      const errors = {};
      
      if (!credentials.username) {
        errors.username = 'Username is required';
      }

      if (!credentials.password) {
        errors.password = 'Password is required';
      }

      if (Object.keys(errors).length > 0) {
        throw {
          response: {
            status: 422,
            data: { errors }
          }
        };
      }

      // Sanitize input
      const sanitizedCredentials = {
        username: this.sanitizeInput(credentials.username),
        password: credentials.password,
        rememberMe: credentials.rememberMe || false
      };

      // Make API call
      const response = await this.api.post('/auth/login', sanitizedCredentials);
      
      // Handle successful response
      if (response.token) {
        this.setToken(response.token);
      }
      if (response.user) {
        this.setUser(response.user);
      }

      return {
        success: true,
        message: 'Login successful!',
        user: response.user,
        token: response.token
      };

    } catch (error) {
      const formattedError = this.handleError(error);
      throw formattedError;
    }
  }

  /**
   * Initiate password reset process
   * @param {string} email - User email
   * @returns {Promise<object>} - Password reset initiation result
   */
  async forgotPassword(email) {
    try {
      // Input validation
      if (!email) {
        throw {
          response: {
            status: 422,
            data: { errors: { email: 'Email is required' } }
          }
        };
      }

      if (!this.validateEmail(email)) {
        throw {
          response: {
            status: 422,
            data: { errors: { email: 'Please enter a valid email address' } }
          }
        };
      }

      // Sanitize input
      const sanitizedEmail = this.sanitizeInput(email).toLowerCase();

      // Make API call
      const response = await this.api.post('/auth/forgot-password', {
        email: sanitizedEmail
      });

      return {
        success: true,
        message: 'Password reset instructions have been sent to your email.',
        email: sanitizedEmail
      };

    } catch (error) {
      const formattedError = this.handleError(error);
      throw formattedError;
    }
  }

  /**
   * Complete password reset with token
   * @param {string} token - Password reset token
   * @param {string} newPassword - New password
   * @param {string} confirmPassword - Password confirmation
   * @returns {Promise<object>} - Password reset result
   */
  async resetPassword(token, newPassword, confirmPassword) {
    try {
      // Input validation
      const errors = {};

      if (!token) {
        errors.token = 'Reset token is required';
      }

      const passwordValidation = this.validatePassword(newPassword);
      if (!passwordValidation.isValid) {
        errors.password = passwordValidation.errors[0];
      }

      if (newPassword !== confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }

      if (Object.keys(errors).length > 0) {
        throw {
          response: {
            status: 422,
            data: { errors }
          }
        };
      }

      // Make API call
      const response = await this.api.post('/auth/reset-password', {
        token: token,
        password: newPassword,
        confirmPassword: confirmPassword
      });

      return {
        success: true,
        message: 'Password has been reset successfully. You can now log in with your new password.',
        redirectTo: '/login'
      };

    } catch (error) {
      const formattedError = this.handleError(error);
      throw formattedError;
    }
  }

  /**
   * Sign out user
   * @returns {Promise<object>} - Sign out result
   */
  async signOut() {
    try {
      // Optionally call backend to invalidate token
      if (this.isAuthenticated()) {
        try {
          await this.api.post('/auth/logout');
        } catch (error) {
          // Continue with local logout even if backend call fails
          console.warn('Backend signout failed:', error);
        }
      }

      // Clear local authentication data
      this.clearAuth();

      return {
        success: true,
        message: 'You have been signed out successfully.'
      };

    } catch (error) {
      // Always clear local data even if there's an error
      this.clearAuth();
      const formattedError = this.handleError(error);
      throw formattedError;
    }
  }

  /**
   * Refresh authentication token
   * @returns {Promise<object>} - Token refresh result
   */
  async refreshToken() {
    try {
      const response = await this.api.post('/auth/refresh');

      if (response.token) {
        this.setToken(response.token);
      }
      if (response.user) {
        this.setUser(response.user);
      }

      return {
        success: true,
        token: response.token,
        user: response.user
      };

    } catch (error) {
      // If refresh fails, clear auth data
      this.clearAuth();
      const formattedError = this.handleError(error);
      throw formattedError;
    }
  }

  /**
   * Get current user profile
   * @returns {Promise<object>} - User profile
   */
  async getCurrentUser() {
    try {
      const response = await this.api.get('/auth/me');

      if (response.user) {
        this.setUser(response.user);
      }

      return {
        success: true,
        user: response.user
      };

    } catch (error) {
      const formattedError = this.handleError(error);
      throw formattedError;
    }
  }
}

export default AuthService;
