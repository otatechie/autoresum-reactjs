import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const ChangePasswordPage = () => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: null
            }));
        }
    };

    const togglePasswordVisibility = (field) => {
        if (field === 'currentPassword') {
            setShowCurrentPassword(!showCurrentPassword);
        } else if (field === 'newPassword') {
            setShowNewPassword(!showNewPassword);
        } else if (field === 'confirmPassword') {
            setShowConfirmPassword(!showConfirmPassword);
        }
    };

    const validateForm = () => {
        const errors = {};
        
        if (!formData.currentPassword) {
            errors.currentPassword = "Current password is required";
        }
        
        if (!formData.newPassword) {
            errors.newPassword = "New password is required";
        } else if (formData.newPassword.length < 8) {
            errors.newPassword = "Password must be at least 8 characters";
        }
        
        if (!formData.confirmPassword) {
            errors.confirmPassword = "Please confirm your password";
        } else if (formData.newPassword !== formData.confirmPassword) {
            errors.confirmPassword = "Passwords don't match";
        }
        
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm();
        
        if (Object.keys(errors).length === 0) {
            setIsSubmitting(true);
            setFormErrors({});
            
            // Simulate API call
            setTimeout(() => {
                setIsSubmitting(false);
                setIsSuccess(true);
                
                // Reset form
                setFormData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });
            }, 1500);
        } else {
            setFormErrors(errors);
        }
    };

    return (
        <div className="min-h-screen py-12">
            <div className="max-w-md mx-auto px-4 sm:px-6">
                {isSuccess ? (
                    <div className="text-center">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900">
                            <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">Password updated</h1>
                        <p className="mt-2 text-gray-700 dark:text-gray-300">Your password has been changed successfully.</p>
                        <div className="mt-6">
                            <Link 
                                to="/profile"
                                className="btn-primary dark:bg-blue-600 dark:hover:bg-blue-700"
                            >
                                Return to profile
                            </Link>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="text-center mb-6">
                            <Link to="/profile" className="inline-flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to profile
                            </Link>
                        </div>
                        
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Change password</h1>
                        <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm">
                            Update your password to keep your account secure
                        </p>
                        
                        <form onSubmit={handleSubmit} className="mt-6">
                            <div className="mt-4">
                                <div className="relative flex items-center justify-between">
                                    <label htmlFor="currentPassword" className="block">Current password</label>
                                    <button
                                        type="button"
                                        onClick={() => togglePasswordVisibility('currentPassword')}
                                        className="flex items-center text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 cursor-pointer"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        <span className="font-medium text-sm">{showCurrentPassword ? 'Hide' : 'Show'}</span>
                                    </button>
                                </div>
                                <input
                                    type={showCurrentPassword ? "text" : "password"}
                                    id="currentPassword"
                                    name="currentPassword"
                                    value={formData.currentPassword}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                                {formErrors.currentPassword && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.currentPassword}</p>
                                )}
                            </div>
                            
                            <div className="mt-4">
                                <div className="relative flex items-center justify-between">
                                    <label htmlFor="newPassword" className="block">New password</label>
                                    <button
                                        type="button"
                                        onClick={() => togglePasswordVisibility('newPassword')}
                                        className="flex items-center text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 cursor-pointer"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        <span className="font-medium text-sm">{showNewPassword ? 'Hide' : 'Show'}</span>
                                    </button>
                                </div>
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    id="newPassword"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                    minLength="8"
                                />
                                {formErrors.newPassword ? (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.newPassword}</p>
                                ) : (
                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Password must be at least 8 characters</p>
                                )}
                            </div>
                            
                            <div className="mt-4">
                                <div className="relative flex items-center justify-between">
                                    <label htmlFor="confirmPassword" className="block">Confirm new password</label>
                                    <button
                                        type="button"
                                        onClick={() => togglePasswordVisibility('confirmPassword')}
                                        className="flex items-center text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 cursor-pointer"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        <span className="font-medium text-sm">{showConfirmPassword ? 'Hide' : 'Show'}</span>
                                    </button>
                                </div>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                                {formErrors.confirmPassword && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.confirmPassword}</p>
                                )}
                            </div>
                            
                            <div className="flex items-center justify-between mt-6">
                                <Link 
                                    to="/profile"
                                    className="text-sm link-primary dark:text-blue-400 dark:hover:text-blue-300"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn-primary dark:bg-blue-600 dark:hover:bg-blue-700"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Updating...
                                        </>
                                    ) : (
                                        'Update password'
                                    )}
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};