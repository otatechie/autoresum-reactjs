import React, { useState, useEffect } from 'react';

const DownloadPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('popular');
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const templates = [
        {
            id: 1,
            name: 'Modern Professional',
            category: 'Professional',
            preview: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=60',
            downloads: 1250,
            rating: 4.8,
            fileTypes: ['PDF', 'DOCX'],
            description: 'Clean and professional design perfect for corporate roles',
            isFeatured: true
        },
        {
            id: 2,
            name: 'Creative Designer',
            category: 'Creative',
            preview: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60',
            downloads: 980,
            rating: 4.7,
            fileTypes: ['PDF', 'DOCX', 'PSD'],
            description: 'Modern design with creative elements for design professionals',
            isFeatured: true
        },
        {
            id: 3,
            name: 'Executive',
            category: 'Professional',
            preview: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?w=800&auto=format&fit=crop&q=60',
            downloads: 850,
            rating: 4.6,
            fileTypes: ['PDF', 'DOCX'],
            description: 'Elegant design suitable for executive positions',
            isFeatured: true
        },
        {
            id: 4,
            name: 'Minimalist',
            category: 'Minimal',
            preview: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=60',
            downloads: 720,
            rating: 4.5,
            fileTypes: ['PDF', 'DOCX'],
            description: 'Simple and clean design focusing on content'
        },
        {
            id: 5,
            name: 'Academic',
            category: 'Academic',
            preview: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=60',
            downloads: 650,
            rating: 4.4,
            fileTypes: ['PDF', 'DOCX'],
            description: 'Formal layout ideal for academic and research positions'
        },
        {
            id: 6,
            name: 'Tech Professional',
            category: 'Technical',
            preview: 'https://images.unsplash.com/photo-1551434678-e076c9a0d8c6?w=800&auto=format&fit=crop&q=60',
            downloads: 580,
            rating: 4.3,
            fileTypes: ['PDF', 'DOCX', 'TEX'],
            description: 'Technical-focused design for IT and engineering roles'
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
        console.log('Downloading template:', template.name);
        // Implement actual download logic here
    };

    if (isLoading) {
    return (
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 animate-pulse">
                            <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-md mb-4"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Templates</h1>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search templates..."
                                className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <select
                            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="all">All Categories</option>
                            <option value="Professional">Professional</option>
                            <option value="Creative">Creative</option>
                            <option value="Minimal">Minimal</option>
                            <option value="Academic">Academic</option>
                            <option value="Technical">Technical</option>
                        </select>
                        <select
                            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
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
                <div className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Featured Templates</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredTemplates.map(template => (
                            <div key={template.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                <div className="relative">
                                    <img
                                        src={template.preview}
                                        alt={template.name}
                                        className="w-full h-48 object-cover"
                                    />
                                    <span className="absolute top-2 right-2 bg-yellow-400 text-yellow-800 text-xs font-bold px-2 py-1 rounded">
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
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                        {template.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                        {template.description}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                </svg>
                                            {template.downloads} downloads
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handlePreview(template)}
                                                className="btn btn-outline rounded-full text-sm px-4 py-2"
                                            >
                                                Preview
                                            </button>
                                            <button
                                                onClick={() => handleDownload(template)}
                                                className="btn btn-primary rounded-full text-sm px-4 py-2"
                                            >
                                                Download
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                            </div>
                        </div>
            )}

            {/* All Templates */}
                            <div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">All Templates</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {otherTemplates.map(template => (
                        <div key={template.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
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
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                    {template.name}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                    {template.description}
                                </p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        {template.downloads} downloads
                            </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handlePreview(template)}
                                            className="btn btn-outline rounded-full text-sm px-4 py-2"
                                        >
                                            Preview
                                        </button>
                                        <button
                                            onClick={() => handleDownload(template)}
                                            className="btn btn-primary rounded-full text-sm px-4 py-2"
                                        >
                                            Download
                                        </button>
                                    </div>
                                </div>
                            </div>
                                                </div>
                    ))}
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
                                className="w-full h-96 object-cover rounded-t-lg"
                            />
                            <button
                                onClick={() => setIsPreviewOpen(false)}
                                className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {selectedTemplate.name}
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {selectedTemplate.category}
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                    <span className="ml-1 text-gray-600 dark:text-gray-400">
                                        {selectedTemplate.rating}
                                    </span>
                                </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                {selectedTemplate.description}
                            </p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center text-gray-600 dark:text-gray-400">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                    {selectedTemplate.downloads} downloads
                                </div>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setIsPreviewOpen(false)}
                                        className="btn btn-outline rounded-full px-6 py-2"
                                    >
                                        Close
                                    </button>
                                    <button
                                        onClick={() => handleDownload(selectedTemplate)}
                                        className="btn btn-primary rounded-full px-6 py-2"
                                    >
                                        Download
                                        </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            </div>
    );
};

export default DownloadPage;