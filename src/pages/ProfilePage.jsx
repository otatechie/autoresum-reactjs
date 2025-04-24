import React, { useState } from 'react';

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
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="relative">
                            <img
                                src={userData.avatar}
                                alt="Profile"
                                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover ring-2 ring-white/30"
                            />
                            <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full hover:bg-blue-700 shadow-md">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            {isEditing ? (
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        name="name"
                                        value={userData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 text-xl font-bold text-white bg-white/10 rounded-full border border-white/20 focus:outline-none focus:border-white/50"
                                    />
                                    <textarea
                                        name="bio"
                                        value={userData.bio}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 mt-2 text-white bg-white/10 rounded-full border border-white/20 focus:outline-none focus:border-white/50"
                                        rows="1"
                                    />
                                </div>
                            ) : (
                                <div>
                                    <h1 className="text-2xl sm:text-3xl font-bold text-white">{userData.name}</h1>
                                    <p className="mt-2 text-white/80">{userData.bio}</p>
                                </div>
                            )}
                            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-4">
                                <div className="flex items-center text-white/80">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    {userData.email}
                                </div>
                                <div className="flex items-center text-white/80">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {userData.location}
                                </div>
                                <div className="flex items-center text-white/80">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                    </svg>
                                    {userData.website}
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="inline-flex items-center px-4 py-1.5 text-sm font-medium rounded-full bg-white text-gray-800 hover:bg-gray-100 shadow-sm"
                        >
                            {isEditing ? 'Save changes' : 'Edit profile'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(userData.stats).map(([key, value]) => (
                        <div key={key} className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 text-center">
                            <div className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">{value}</div>
                            <div className="mt-1 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 capitalize">
                                {key}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Settings Sections */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Notifications */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
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
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${enabled ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'
                                            }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'
                                                }`}
                                        />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Privacy Settings */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Privacy Settings</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Profile Visibility
                                </label>
                                <select
                                    value={userData.privacy.profileVisibility}
                                    onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                                    className="w-full px-4 py-2 text-sm rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
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
                                    className="w-full px-4 py-2 text-sm rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
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
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${userData.privacy.showEmail ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                                        }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${userData.privacy.showEmail ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Theme Preferences */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
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
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <label htmlFor={theme} className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                                        {theme} theme
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Account Actions */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Account Actions</h2>
                        <div className="space-y-4">
                            <button className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
                                Change password
                            </button>
                            <button className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-full border border-red-300 dark:border-red-600 bg-white dark:bg-gray-800 text-red-700 dark:text-red-200 hover:bg-red-50 dark:hover:bg-red-900">
                                Delete account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};