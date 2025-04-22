import React, { useState, useEffect } from 'react';
// import apiService from '../services/api';
import mockApiService from '../services/mockApiService';

// Use mock service for now while waiting for friend's backend
const apiService = mockApiService;

export function DashboardPage() {
    const [resumes, setResumes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Function to fetch resumes from the backend
        async function fetchResumes() {
            try {
                setIsLoading(true);
                const data = await apiService.getResumes();
                setResumes(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching resumes:', err);
                setError('Failed to load resumes. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        }

        fetchResumes();
    }, []);

    return (
        <div className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>

                <div className="mt-8">
                    {isLoading ? (
                        <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                        </div>
                    ) : error ? (
                        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-md">
                            <p className="text-red-700 dark:text-red-400">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-2 text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                            >
                                Try again
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {resumes.length > 0 ? (
                                resumes.map((resume) => (
                                    <div
                                        key={resume.id}
                                        className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700"
                                    >
                                        <div className="px-4 py-5 sm:p-6">
                                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">{resume.title}</h3>
                                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Last updated: {new Date(resume.updated_at).toLocaleDateString()}</p>
                                            <div className="mt-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                                                    {resume.status}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-gray-700 px-4 py-4 sm:px-6 flex justify-between">
                                            <button
                                                onClick={() => window.location.href = `/edit-resume/${resume.id}`}
                                                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => window.location.href = `/preview-resume/${resume.id}`}
                                                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300"
                                            >
                                                Preview
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-12">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">No resumes found</h3>
                                    <p className="mt-1 text-gray-500 dark:text-gray-400">Create your first resume to get started</p>
                                    <button
                                        onClick={() => window.location.href = '/create-resume'}
                                        className="mt-4 btn-primary dark:bg-blue-600 dark:hover:bg-blue-700 px-4 py-2 text-sm"
                                    >
                                        Create Resume
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}