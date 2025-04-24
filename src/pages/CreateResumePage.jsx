import React from 'react';
import { Link } from 'react-router-dom';
import {
    TextInput,
    TextAreaInput,
    FormSection,
    DateInput,
    CheckboxInput
} from '../components/FormComponents';

export function CreateResumePage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Create Resume</h1>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Fill in your details to generate a professional resume
                        </p>
                    </div>
                </div>
            </div>
            
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                    <form id="resume-form" className="divide-y divide-gray-200 dark:divide-gray-700">
                        {/* Personal Information */}
                        <div className="p-8">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Personal Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <TextInput
                                    label="Full Name"
                                    id="full-name"
                                    name="full-name"
                                    required={true}
                                />

                                <TextInput
                                    label="Email Address"
                                    id="email"
                                    name="email"
                                    type="email"
                                    required={true}
                                />

                                <TextInput
                                    label="Phone Number"
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    placeholder="+1 (555) 123-4567"
                                />

                                <div>
                                    <TextInput
                                        label="Location"
                                        id="location"
                                        name="location"
                                        placeholder="e.g., New York, NY, United States"
                                    />
                                    <div className="mt-2 flex items-center">
                                        <button type="button" className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-x-2 group">
                                            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            <span className="border-b border-dashed border-blue-300 dark:border-blue-600 pb-0.5">Format Location</span>
                                        </button>
                                        <span className="ml-3 text-sm text-gray-500 dark:text-gray-400">AI will format your location consistently</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Professional Summary */}
                        <div className="p-8">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Professional Summary</h2>
                            <div>
                                <TextAreaInput
                                    label="Summary"
                                    id="summary"
                                    name="summary"
                                    placeholder="Brief overview of your professional background and career goals"
                                />
                                <div className="mt-4">
                                    <button type="button" className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-x-2 group">
                                        <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        <span className="border-b border-dashed border-blue-300 dark:border-blue-600 pb-0.5">Get AI suggestions</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Work Experience */}
                        <div className="p-8">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Work Experience</h2>
                                <button type="button" className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 gap-x-2">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Add Experience
                                </button>
                            </div>
                            <div className="space-y-6">
                                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 relative group">
                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button type="button" className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <TextInput
                                            label="Company Name"
                                            id="company"
                                            name="company[]"
                                            placeholder="Enter company name"
                                        />

                                        <div>
                                            <TextInput
                                                label="Job Title"
                                                id="job_title"
                                                name="job_title[]"
                                                placeholder="Enter your position"
                                            />
                                            <div className="mt-2">
                                                <button type="button" className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-x-2 group">
                                                    <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                    </svg>
                                                    <span className="border-b border-dashed border-blue-300 dark:border-blue-600 pb-0.5">Optimize Job Title</span>
                                                </button>
                                            </div>
                                        </div>

                                        <DateInput
                                            label="Start Date"
                                            id="start_date"
                                            name="start_date[]"
                                        />

                                        <div>
                                            <DateInput
                                                label="End Date"
                                                id="end_date"
                                                name="end_date[]"
                                            />
                                            <div className="mt-2">
                                                <CheckboxInput
                                                    label="I currently work here"
                                                    id="current_position"
                                                    name="current_position[]"
                                                />
                                            </div>
                                        </div>

                                        <div className="md:col-span-2">
                                            <div className="flex justify-between items-center mb-2">
                                                <label className="block font-medium">Job Description</label>
                                                <button type="button" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 flex items-center gap-x-2">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                    </svg>
                                                    Expert Tips
                                                </button>
                                            </div>
                                            <textarea 
                                                name="job_description[]" 
                                                rows="4" 
                                                placeholder="Describe your responsibilities and achievements" 
                                                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none mb-2"
                                            ></textarea>
                                            <div className="flex flex-col space-y-2">
                                                <button type="button" className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-x-2 group">
                                                    <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                    </svg>
                                                    <span className="border-b border-dashed border-blue-300 dark:border-blue-600 pb-0.5">Generate Description</span>
                                                </button>
                                                <button type="button" className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-x-2 group">
                                                    <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                    </svg>
                                                    <span className="border-b border-dashed border-blue-300 dark:border-blue-600 pb-0.5">Enhance Description</span>
                                                </button>
                                                <button type="button" className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-x-2 group">
                                                    <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span className="border-b border-dashed border-blue-300 dark:border-blue-600 pb-0.5">Add Keywords</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Skills */}
                        <div className="p-8">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Skills</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block mb-2 font-medium">Technical Skills</label>
                                    <div className="relative">
                                        <input 
                                            type="text" 
                                            name="skills" 
                                            placeholder="Type a skill and press Enter" 
                                            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        />
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
                                                JavaScript
                                                <button type="button" className="ml-1 hover:text-blue-600">×</button>
                                            </span>
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
                                                React
                                                <button type="button" className="ml-1 hover:text-blue-600">×</button>
                                            </span>
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
                                                Tailwind CSS
                                                <button type="button" className="ml-1 hover:text-blue-600">×</button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Resume Score */}
                        <div className="p-8 bg-gray-50 dark:bg-gray-700/50">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Resume Analysis</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="flex flex-col items-center justify-center">
                                    <div className="relative">
                                        <svg className="w-32 h-32 transform -rotate-90">
                                            <circle cx="64" cy="64" r="56" fill="none" stroke="currentColor" className="text-gray-200 dark:text-gray-700" strokeWidth="8"></circle>
                                            <circle cx="64" cy="64" r="56" fill="none" stroke="currentColor" className="text-blue-600 dark:text-blue-500" strokeWidth="8" strokeDasharray="351.86" strokeDashoffset="52.78" style={{ transition: "stroke-dashoffset 1s ease-in-out" }}></circle>
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-3xl font-bold text-gray-900 dark:text-white">85%</span>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">Score</span>
                                        </div>
                                    </div>
                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 text-center">Resume strength score</p>
                                </div>

                                <div className="md:col-span-2 space-y-6">
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="flex items-center gap-x-2">
                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">ATS Compatibility</span>
                                                <div className="group relative">
                                                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                    </svg>
                                                    <div className="hidden group-hover:block absolute bottom-full left-1/2 transform -translate-x-1/2 w-48 p-2 bg-gray-900 text-white text-xs rounded-lg mb-2">
                                                        How well your resume can be parsed by Applicant Tracking Systems
                                                    </div>
                                                </div>
                                            </div>
                                            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">92%</span>
                                        </div>
                                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                            <div className="h-2 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" style={{ width: "92%", transition: "width 1s ease-in-out" }}></div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="flex items-center gap-x-2">
                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Keyword Optimization</span>
                                                <div className="group relative">
                                                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                    </svg>
                                                    <div className="hidden group-hover:block absolute bottom-full left-1/2 transform -translate-x-1/2 w-48 p-2 bg-gray-900 text-white text-xs rounded-lg mb-2">
                                                        Match rate with job-specific keywords
                                                    </div>
                                                </div>
                                            </div>
                                            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">75%</span>
                                        </div>
                                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                            <div className="h-2 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" style={{ width: "75%", transition: "width 1s ease-in-out" }}></div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="flex items-center gap-x-2">
                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Content Quality</span>
                                                <div className="group relative">
                                                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                    </svg>
                                                    <div className="hidden group-hover:block absolute bottom-full left-1/2 transform -translate-x-1/2 w-48 p-2 bg-gray-900 text-white text-xs rounded-lg mb-2">
                                                        Overall quality of your resume content
                                                    </div>
                                                </div>
                                            </div>
                                            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">90%</span>
                                        </div>
                                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                            <div className="h-2 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" style={{ width: "90%", transition: "width 1s ease-in-out" }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
                                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Suggested Improvements</h3>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                                        <div className="flex-shrink-0">
                                            <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-700 dark:text-gray-300">Add more quantifiable achievements to your work experience</p>
                                            <button className="mt-1 text-xs text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                                                Show Examples
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                                        <div className="flex-shrink-0">
                                            <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-700 dark:text-gray-300">Include more industry-specific keywords in your skills section</p>
                                            <button className="mt-1 text-xs text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                                                View Suggestions
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end">
                                <button type="button" className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 group">
                                    View Detailed Analysis
                                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="p-8">
                            <div className="flex justify-end gap-4">
                                <button 
                                    type="button" 
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                                >
                                    Save draft
                                </button>
                                <button 
                                    type="submit" 
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                                >
                                    Generate resume
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}