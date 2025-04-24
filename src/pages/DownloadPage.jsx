import React, { useState, useEffect } from 'react';

export function DownloadPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const templates = [
        {
            id: 1,
            name: "Modern Professional",
            category: "Professional",
            preview: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=60",
            downloads: 1245,
            rating: 4.8,
            fileTypes: ["PDF", "DOCX", "TXT"],
            description: "Clean and professional design perfect for corporate roles."
        },
        {
            id: 2,
            name: "Creative Designer",
            category: "Creative",
            preview: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60",
            downloads: 892,
            rating: 4.6,
            fileTypes: ["PDF", "DOCX"],
            description: "Modern and artistic layout ideal for creative professionals."
        },
        {
            id: 3,
            name: "Executive",
            category: "Executive",
            preview: "https://images.unsplash.com/photo-1521791055366-0d553872125f?w=800&auto=format&fit=crop&q=60",
            downloads: 1567,
            rating: 4.9,
            fileTypes: ["PDF", "DOCX"],
            description: "Sophisticated design for executive-level positions."
        },
        {
            id: 4,
            name: "Minimalist",
            category: "Minimal",
            preview: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=60",
            downloads: 1032,
            rating: 4.7,
            fileTypes: ["PDF", "DOCX", "TXT"],
            description: "Clean and simple layout focusing on content."
        },
        {
            id: 5,
            name: "Academic",
            category: "Academic",
            preview: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=60",
            downloads: 756,
            rating: 4.5,
            fileTypes: ["PDF", "DOCX"],
            description: "Structured format for academic positions."
        },
        {
            id: 6,
            name: "Tech Professional",
            category: "Technical",
            preview: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&auto=format&fit=crop&q=60",
            downloads: 1432,
            rating: 4.8,
            fileTypes: ["PDF", "DOCX", "TXT"],
            description: "Modern tech-focused design for IT professionals."
        }
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const filteredTemplates = templates.filter(template => {
        const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            template.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = !selectedCategory || template.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handlePreview = (template) => {
        setSelectedTemplate(template);
        setIsPreviewOpen(true);
    };

    const handleDownload = (template, fileType) => {
        console.log(`Downloading ${template.name} in ${fileType} format`);
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Templates</h1>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Choose from our collection of resume templates
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    placeholder="Search templates..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">All Categories</option>
                                <option value="Professional">Professional</option>
                                <option value="Creative">Creative</option>
                                <option value="Executive">Executive</option>
                                <option value="Minimal">Minimal</option>
                                <option value="Academic">Academic</option>
                                <option value="Technical">Technical</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Template Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden animate-pulse">
                                <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
                                <div className="p-4">
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTemplates.map((template) => (
                            <div
                                key={template.id}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
                            >
                                <div className="relative">
                                    <img
                                        src={template.preview}
                                        alt={template.name}
                                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                                        onClick={() => handlePreview(template)}
                                    />
                                    <div className="absolute top-2 right-2">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                            {template.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                {template.name}
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                                                {template.description}
                                            </p>
                                            <div className="mt-2 flex items-center">
                                                <div className="flex items-center">
                                                    {[...Array(5)].map((_, i) => (
                                                        <svg
                                                            key={i}
                                                            className={`h-4 w-4 ${
                                                                i < Math.floor(template.rating)
                                                                    ? 'text-yellow-400'
                                                                    : 'text-gray-300 dark:text-gray-600'
                                                            }`}
                                                            fill="currentColor"
                                                            viewBox="00 20 20"
                                                        >
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    ))}
                                                </div>
                                                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                                                    {template.rating} ({template.downloads})
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="flex space-x-2">
                                            {template.fileTypes.map((type) => (
                                                <span
                                                    key={type}
                                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                                                >
                                                    {type}
                                                </span>
                                            ))}
                                        </div>
                                        <button
                                            onClick={() => handleDownload(template, template.fileTypes[0])}
                                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            Download
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Preview Modal */}
            {isPreviewOpen && selectedTemplate && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
                        </div>
                        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
                            <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                                                {selectedTemplate.name}
                                            </h3>
                                            <button
                                                onClick={() => setIsPreviewOpen(false)}
                                                className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                                            >
                                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="mt-4">
                                            <img
                                                src={selectedTemplate.preview}
                                                alt={selectedTemplate.name}
                                                className="w-full rounded-lg"
                                            />
                                        </div>
                                        <div className="mt-4">
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {selectedTemplate.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    onClick={() => handleDownload(selectedTemplate, selectedTemplate.fileTypes[0])}
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Download
                                </button>
                                <button
                                    onClick={() => setIsPreviewOpen(false)}
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}