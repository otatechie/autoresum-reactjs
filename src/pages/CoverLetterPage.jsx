import React, { useState, useEffect } from 'react';

export const CoverLetterPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('popular');
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const templates = [
        {
            id: 1,
            name: 'Professional Standard',
            category: 'Professional',
            preview: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop&q=60',
            downloads: 890,
            rating: 4.7,
            description: 'A classic professional cover letter format suitable for corporate positions',
            isFeatured: true
        },
        {
            id: 2,
            name: 'Creative Modern',
            category: 'Creative',
            preview: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&auto=format&fit=crop&q=60',
            downloads: 756,
            rating: 4.6,
            description: 'Modern and creative design for roles in design and media',
            isFeatured: true
        },
        {
            id: 3,
            name: 'Executive Brief',
            category: 'Professional',
            preview: 'https://images.unsplash.com/photo-1586282391129-76a6df230234?w=800&auto=format&fit=crop&q=60',
            downloads: 650,
            rating: 4.5,
            description: 'Concise and impactful format for executive positions',
            isFeatured: true
        }
    ];

    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const filteredTemplates = templates.filter(template => {
        const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
        return matchesSearch && matchesCategory;
    }).sort((a, b) => {
        switch (sortBy) {
            case 'popular':
                return b.downloads - a.downloads;
            case 'rating':
                return b.rating - a.rating;
            case 'newest':
                return b.id - a.id;
            default:
                return 0;
        }
    });

    const featuredTemplates = filteredTemplates.filter(template => template.isFeatured);
    const otherTemplates = filteredTemplates.filter(template => !template.isFeatured);

    const handlePreview = (template) => {
        setSelectedTemplate(template);
        setIsPreviewOpen(true);
    };

    const handleDownload = (template) => {
        console.log('Downloading cover letter template:', template.name);
        // Implement actual download logic here
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Header */}
                <div className="bg-white dark:bg-gray-800 p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Cover Letters</h1>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Browse and customize professional cover letter templates
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, index) => (
                                <div key={index} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 animate-pulse">
                                    <div className="h-48 bg-gray-200 dark:bg-gray-600 rounded-md mb-4"></div>
                                    <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
                                    <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Cover Letters</h1>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Browse and customize professional cover letter templates
                        </p>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                    {/* Search and Filters */}
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex flex-col md:flex-row gap-3">
                            <div className="flex-1">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search cover letters..."
                                        className="w-full px-3 py-2 pl-9 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <svg className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <select
                                    className="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    <option value="all">All Categories</option>
                                    <option value="Professional">Professional</option>
                                    <option value="Creative">Creative</option>
                                    <option value="Academic">Academic</option>
                                </select>
                                <select
                                    className="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="popular">Most Popular</option>
                                    <option value="rating">Highest Rated</option>
                                    <option value="newest">Newest First</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Featured Templates */}
                    {featuredTemplates.length > 0 && (
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Featured Cover Letters</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {featuredTemplates.map(template => (
                                    <div key={template.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg overflow-hidden">
                                        <div className="relative">
                                            <img
                                                src={template.preview}
                                                alt={template.name}
                                                className="w-full h-48 object-cover"
                                            />
                                            <span className="absolute top-2 right-2 bg-yellow-400 text-yellow-800 text-xs font-bold px-2 py-0.5 rounded">
                                                Featured
                                            </span>
                                        </div>
                                        <div className="p-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                                    {template.category}
                                                </span>
                                                <div className="flex items-center">
                                                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                    <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                                                        {template.rating}
                                                    </span>
                                                </div>
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                                {template.name}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                                {template.description}
                                            </p>
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handlePreview(template)}
                                                    className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                                                >
                                                    Preview
                                                </button>
                                                <button
                                                    onClick={() => handleDownload(template)}
                                                    className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                                                >
                                                    Use Template
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* All Templates */}
                    <div className="p-6">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">All Cover Letters</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {otherTemplates.map(template => (
                                <div key={template.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg overflow-hidden">
                                    <div className="relative">
                                        <img
                                            src={template.preview}
                                            alt={template.name}
                                            className="w-full h-48 object-cover"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                                {template.category}
                                            </span>
                                            <div className="flex items-center">
                                                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                                                    {template.rating}
                                                </span>
                                            </div>
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                            {template.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                            {template.description}
                                        </p>
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handlePreview(template)}
                                                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                                            >
                                                Preview
                                            </button>
                                            <button
                                                onClick={() => handleDownload(template)}
                                                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                                            >
                                                Use Template
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Preview Modal */}
            {isPreviewOpen && selectedTemplate && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full mx-4">
                        <div className="relative">
                            <img
                                src={selectedTemplate.preview}
                                alt={selectedTemplate.name}
                                className="w-full h-64 sm:h-96 object-cover rounded-t-lg"
                            />
                            <button
                                onClick={() => setIsPreviewOpen(false)}
                                className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-1.5 hover:bg-opacity-75"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                        {selectedTemplate.name}
                                    </h2>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {selectedTemplate.category}
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                                        {selectedTemplate.rating}
                                    </span>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                {selectedTemplate.description}
                            </p>
                            <div className="flex items-center justify-end gap-2">
                                <button
                                    onClick={() => setIsPreviewOpen(false)}
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={() => handleDownload(selectedTemplate)}
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                                >
                                    Use Template
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}; 