import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export function ResetPasswordPage() {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reset your password</h1>
            <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">
            Almost done. Enter your new password, and you're good to go.
            </p>
            <form method="POST" className="mt-6" action="/signup">
                <div className="mt-4">
                    <div className="relative flex items-center justify-between">
                        <label htmlFor="new-password" className="block">New password</label>
                        <button 
                            type="button" 
                            onClick={togglePasswordVisibility}
                            className="flex items-center text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 cursor-pointer"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <span className="font-medium text-sm">{showPassword ? 'Hide' : 'Show'}</span>
                        </button>
                    </div>
                    <input 
                        type={showPassword ? "text" : "password"} 
                        name="new-password" 
                        className="form-control" 
                        id="new-password" 
                        autoComplete="new-password" 
                        required 
                        minLength="8"
                    />
                </div>
                <div className="mt-4">
                    <label htmlFor="confirm-password" className="block">Confirm new password</label>
                    <input 
                        type={showPassword ? "text" : "password"} 
                        name="confirm-password" 
                        className="form-control" 
                        id="confirm-password" 
                        autoComplete="new-password" 
                        required 
                        minLength="8"
                    />
                </div>
                <div className="mt-6">
                    <button type="submit" className="btn-primary dark:bg-blue-600 dark:hover:bg-blue-700">
                        Reset password
                    </button>
                </div>
            </form>
        </>
    );
}