import React from 'react';
import { Link } from 'react-router-dom';

export function ForgotPasswordPage() {
    return (
        <>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reset your password</h1>
            <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">
                Fear not. We'll email you instructions to reset your password.
            </p>
            <form method="POST" className="mt-6" action="/signup">
                <div className="mt-4">
                    <label htmlFor="email" className="block">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="email"
                        className="form-control"
                        required
                    />
                </div>
                <div className="flex items-center justify-between mt-6">
                    <button type="submit" className="btn-primary dark:bg-blue-600 dark:hover:bg-blue-700">
                        Reset password
                    </button>
                </div>
                <div className="text-right mt-4">
                    <Link to="/login" className="text-sm link-primary dark:text-blue-400 dark:hover:text-blue-300">
                        Return to login
                    </Link>
                </div>
            </form>
        </>
    );
}