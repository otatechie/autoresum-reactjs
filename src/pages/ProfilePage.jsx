import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&auto=format&fit=crop&q=60',
        bio: 'Software Engineer with 5+ years of experience in web development.',
        location: 'San Francisco, CA',
        website: 'johndoe.dev',
        stats: {
            resumes: 12,
            templates: 5,
            downloads: 48,
            views: 1024
        },
        notifications: {
            email: true,
            push: true,
            updates: true
        },
        privacy: {
            profileVisibility: 'public',
            resumeVisibility: 'public',
            showEmail: false
        },
        theme: 'system'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleNotificationChange = (type) => {
        setUserData(prev => ({
            ...prev,
            notifications: {
                ...prev.notifications,
                [type]: !prev.notifications[type]
            }
        }));
    };

    const handlePrivacyChange = (type, value) => {
        setUserData(prev => ({
            ...prev,
            privacy: {
                ...prev.privacy,
                [type]: value
            }
        }));
    };

    const handleThemeChange = (theme) => {
        setUserData(prev => ({
            ...prev,
            theme
        }));
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Profile</h1>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Manage your account settings and preferences
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700"
                        >
                            {isEditing ? 'Save changes' : 'Edit profile'}
                        </button>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                    {/* Profile Info Section */}
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex flex-col md:flex-row items-start gap-8">
                            <div className="relative">
                                <img
                                    src={userData.avatar}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-lg object-cover ring-4 ring-gray-100 dark:ring-gray-700"
                                />
                                <button className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </button>
                            </div>
                            <div className="flex-1">
                                {isEditing ? (
                                    <div className="space-y-4">
                                        <input
                                            type="text"
                                            name="name"
                                            value={userData.name}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 text-lg font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700/50 rounded-full border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
                                        />
                                        <textarea
                                            name="bio"
                                            value={userData.bio}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
                                            rows="2"
                                        />
                                    </div>
                                ) : (
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{userData.name}</h2>
                                        <p className="mt-2 text-gray-600 dark:text-gray-300">{userData.bio}</p>
                                    </div>
                                )}
                                <div className="mt-4 flex flex-wrap gap-4">
                                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                                        <svg className="w-5 h-5 mr-2 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        {userData.email}
                                    </div>
                                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                                        <svg className="w-5 h-5 mr-2 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {userData.location}
                                    </div>
                                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                                        <svg className="w-5 h-5 mr-2 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                        </svg>
                                        {userData.website}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Statistics</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {Object.entries(userData.stats).map(([key, value]) => (
                                <div key={key} className="p-6 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                                    <div className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</div>
                                    <div className="mt-1 text-sm font-medium text-gray-500 dark:text-gray-400 capitalize">
                                        {key}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Settings Grid */}
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Notifications */}
                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Notifications</h2>
                                <div className="space-y-6">
                                    {Object.entries(userData.notifications).map(([type, enabled]) => (
                                        <div key={type} className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-900 dark:text-white capitalize">{type} notifications</h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">Receive {type} notifications about your account</p>
                                            </div>
                                            <button
                                                onClick={() => handleNotificationChange(type)}
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${enabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}
                                            >
                                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Privacy Settings */}
                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Privacy Settings</h2>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Profile Visibility
                                        </label>
                                        <select
                                            value={userData.privacy.profileVisibility}
                                            onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                                            className="w-full px-4 py-2 text-sm rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        >
                                            <option value="public">Public</option>
                                            <option value="private">Private</option>
                                            <option value="connections">Connections Only</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Resume Visibility
                                        </label>
                                        <select
                                            value={userData.privacy.resumeVisibility}
                                            onChange={(e) => handlePrivacyChange('resumeVisibility', e.target.value)}
                                            className="w-full px-4 py-2 text-sm rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        >
                                            <option value="public">Public</option>
                                            <option value="private">Private</option>
                                            <option value="connections">Connections Only</option>
                                        </select>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Show Email Address</h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Make your email visible to other users</p>
                                        </div>
                                        <button
                                            onClick={() => handlePrivacyChange('showEmail', !userData.privacy.showEmail)}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${userData.privacy.showEmail ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}
                                        >
                                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${userData.privacy.showEmail ? 'translate-x-6' : 'translate-x-1'}`} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Theme Preferences */}
                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Theme Preferences</h2>
                                <div className="space-y-4">
                                    {['light', 'dark', 'system'].map((theme) => (
                                        <div key={theme} className="flex items-center">
                                            <input
                                                type="radio"
                                                id={theme}
                                                name="theme"
                                                checked={userData.theme === theme}
                                                onChange={() => handleThemeChange(theme)}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600"
                                            />
                                            <label htmlFor={theme} className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                                                {theme} theme
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Account Actions */}
                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Account Actions</h2>
                                <div className="space-y-4">
                                    <Link 
                                        to="/change-password"
                                        className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                                    >
                                        Change password
                                    </Link>
                                    <button className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-full border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40">
                                        Delete account
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};