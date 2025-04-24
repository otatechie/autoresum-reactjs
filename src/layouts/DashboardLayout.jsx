import React, { useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

// Navigation item component
function NavItem({ to, isActive, icon, children, onClick }) {
    const baseClasses = "flex items-center gap-x-3 rounded-lg p-3 text-sm font-medium transition-all";
    const activeClasses = "text-gray-900 dark:text-white bg-gray-100/50 dark:bg-gray-800/50";
    const inactiveClasses = "text-gray-600 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white";
    
    return (
        <Link
            to={to}
            className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
            onClick={onClick}
        >
            <svg className="h-6 w-6 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon} />
            </svg>
            {children}
        </Link>
    );
}

// Menu item for user dropdown
function UserMenuItem({ to, children, onClick, isRed = false }) {
    const colorClasses = isRed 
        ? "text-red-500 dark:text-red-400" 
        : "text-gray-600 dark:text-gray-100";
    
    return (
        <Link
            to={to}
            className={`block px-3 py-1 text-sm ${colorClasses} hover:bg-gray-50 dark:hover:bg-gray-700`}
            role="menuitem"
            onClick={onClick}
        >
            {children}
        </Link>
    );
}

// Social media link component
function SocialLink({ href, icon, label }) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="group">
            <span className="sr-only">{label}</span>
            <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-all">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d={icon} />
                </svg>
            </div>
        </a>
    );
}

// Dashboard layout component
export function DashboardLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const userMenuRef = useRef(null);
    const userBtnRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    
    // Fixed avatar seed
    const avatarSeed = 'Felix';

    // Navigation items configuration
    const navItems = [
        {
            to: "/dashboard",
            label: "Dashboard",
            icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
        },
        {
            to: "/samples",
            label: "Samples",
            icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
        },
        {
            to: "/template-gallery",
            label: "Templates",
            icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
        },
        {
            to: "/download-templates",
            label: "Download",
            icon: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4",
        },
        {
            to: "/review",
            label: "Review",
            icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
        },
        {
            to: "/ai-interview",
            label: "AI Interview",
            icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
        },
    ];

    // User menu items configuration
    const userMenuItems = [
        { to: "/profile", label: "Your profile" },
        { to: "/change-password", label: "Change password" },
        { to: "/profile", label: "Settings" },
        { to: "/style-guide", label: "Styleguide" },
        { to: "/logout", label: "Sign out", isRed: true },
    ];

    // Social links configuration
    const socialLinks = [
        {
            href: "https://facebook.com/autoresum",
            label: "Follow us on Facebook",
            icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
        },
        {
            href: "https://x.com/autoresum",
            label: "Follow us on X",
            icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
        },
        {
            href: "https://youtube.com/@autoresum",
            label: "Follow us on YouTube",
            icon: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
        },
        {
            href: "https://linkedin.com/company/autoresum",
            label: "Follow us on LinkedIn",
            icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
        },
    ];

    // Simple event handlers
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);
    const closeSidebar = (e) => e.target.getAttribute('role') === 'dialog' && setIsSidebarOpen(false);
    const closeUserMenu = () => setIsUserMenuOpen(false);
    const goToCreateResume = () => navigate('/create-resume');

    // Check if clicked outside user menu
    React.useEffect(() => {
        function handleClickOutside(event) {
            if (isUserMenuOpen && 
                userMenuRef.current && 
                userBtnRef.current && 
                !userMenuRef.current.contains(event.target) && 
                !userBtnRef.current.contains(event.target)) {
                setIsUserMenuOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isUserMenuOpen]);

    // Sidebar content component
    function SidebarContent({ onMenuClick }) {
        return (
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:bg-gray-900 px-6 pb-4">
                <div className="flex h-16 shrink-0 items-center">
                   <a href="/dashboard"> <img className="h-14 w-auto dark:invert" src="/images/logo.png" alt="Autoresum" /></a>
                </div>
                
                <div>
                    <button 
                        onClick={goToCreateResume}
                        className="w-full btn-primary dark:bg-blue-600 dark:hover:bg-blue-700 flex items-center justify-center gap-x-2 py-2 text-sm"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Create resume
                    </button>
                </div>
                
                <nav className="flex flex-1 flex-col">
                    {navItems.map(item => (
                        <NavItem 
                            key={item.to}
                            to={item.to}
                            isActive={location.pathname === item.to}
                            icon={item.icon}
                            onClick={onMenuClick}
                        >
                            {item.label}
                        </NavItem>
                    ))}
                </nav>
                
                <div className="mt-auto border-t border-gray-200 dark:border-gray-800 pt-4">
                    <div className="flex items-center gap-x-4 p-3 text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all cursor-pointer">
                        <img
                            className="h-10 w-10 rounded-full bg-gray-50"
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeed}`}
                            alt="User avatar"
                        />
                        <div className="flex-1">
                            <div className="text-sm font-medium">John Smith</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">john@example.com</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full bg-white dark:bg-gray-900">
            {/* Mobile sidebar */}
            {isSidebarOpen && (
                <div className="relative z-50 lg:hidden" role="dialog" aria-modal="true" onClick={closeSidebar}>
                    <div className="fixed inset-0 bg-gray-900/80" aria-hidden="true"></div>
                    <div className="fixed inset-0 flex">
                        <div className="relative mr-16 flex w-full max-w-xs flex-1">
                            <div className="absolute top-0 left-full flex w-16 justify-center pt-5">
                                <button type="button" className="-m-2.5 p-2.5 cursor-pointer" onClick={() => setIsSidebarOpen(false)}>
                                    <span className="sr-only">Close sidebar</span>
                                    <svg className="size-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <SidebarContent onMenuClick={() => setIsSidebarOpen(false)} />
                        </div>
                    </div>
                </div>
            )}

            {/* Desktop sidebar */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6">
                    <SidebarContent />
                </div>
            </div>

            {/* Main content */}
            <div className="lg:pl-72">
                {/* Top navigation */}
                <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <button
                        type="button"
                        className="border-r border-gray-200 dark:border-gray-700 px-4 text-gray-500 dark:text-gray-400 focus:outline-none lg:hidden"
                        onClick={toggleSidebar}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>

                    <div className="flex flex-1 justify-between px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-1">
                            <form className="flex w-full md:ml-0" action="#" method="GET" role="search">
                                <div className="relative flex flex-1">
                                    <label htmlFor="search-input" className="sr-only">Search Autoresum</label>
                                    <input
                                        id="search-input"
                                        type="search"
                                        name="search"
                                        placeholder="Search Autoresum"
                                        className="block h-full w-full border-0 bg-transparent py-4 pl-10 pr-4 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-0 sm:text-sm"
                                    />
                                </div>
                            </form>
                        </div>

                        <div className="ml-4 flex items-center gap-x-4 sm:gap-x-6">
                            <Link to="/help" className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                                Help
                            </Link>

                            <button
                                type="button"
                                className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 cursor-pointer"
                                aria-label="View notifications"
                            >
                                <span className="sr-only">View notifications</span>
                                <svg className="size-6" viewBox="0 0 32 32">
                                    <path
                                        fill="currentColor"
                                        d="m30,8c0-3.31-2.69-6-6-6-2.3,0-4.29,1.3-5.3,3.2-1.15-.61-2.4-1-3.7-1.13v-1.07c0-.55-.45-1-1-1s-1,.45-1,1v1.05c-5.05.5-9,4.77-9,9.95v6.18c-1.16.41-2,1.51-2,2.82,0,1.65,1.35,3,3,3h4.1c.46,2.28,2.48,4,4.9,4s4.43-1.72,4.9-4h4.1c1.65,0,3-1.35,3-3,0-1.3-.84-2.4-2-2.82v-6.18c3.31,0,6-2.69,6-6Zm-6-4c2.21,0,4,1.79,4,4s-1.79,4-4,4-4-1.79-4-4,1.79-4,4-4Zm-10,24c-1.3,0-2.4-.84-2.82-2h5.63c-.41,1.16-1.51,2-2.82,2Zm9-4H5c-.55,0-1-.45-1-1s.45-1,1-1h18c.55,0,1,.45,1,1s-.45,1-1,1Zm-1-10v6H6v-6c0-4.41,3.59-8,8-8,1.44,0,2.84.39,4.07,1.12-.04.29-.07.58-.07.88,0,2.6,1.67,4.82,3.99,5.65,0,.12,0,.24,0,.35Z"
                                    />
                                </svg>
                            </button>

                            <div className="relative">
                                <button
                                    ref={userBtnRef}
                                    type="button"
                                    className="flex items-center gap-x-4 rounded-full focus:outline-none cursor-pointer"
                                    onClick={toggleUserMenu}
                                    aria-expanded={isUserMenuOpen}
                                    aria-haspopup="true"
                                >
                                    <span className="sr-only">Open user menu</span>
                                    <img
                                        className="size-8 rounded-full bg-gray-50"
                                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeed}`}
                                        alt="User avatar"
                                    />
                                </button>

                                {isUserMenuOpen && (
                                    <div
                                        ref={userMenuRef}
                                        className="absolute right-0 z-10 mt-2.5 w-40 origin-top-right rounded-md bg-white dark:bg-gray-800 py-2 shadow-lg ring-1 ring-gray-900/5 dark:ring-gray-700/5"
                                        role="menu"
                                    >
                                        <UserMenuItem to="/profile" onClick={closeUserMenu}>Your profile</UserMenuItem>
                                        <UserMenuItem to="/change-password" onClick={closeUserMenu}>Change password</UserMenuItem>
                                        <UserMenuItem to="/profile" onClick={closeUserMenu}>Settings</UserMenuItem>
                                        
                                        <div className="border-t border-gray-200 dark:border-gray-700 mx-2 my-1" />
                                        
                                        <UserMenuItem to="/style-guide" onClick={closeUserMenu}>Styleguide</UserMenuItem>
                                        
                                        <div className="border-t border-gray-200 dark:border-gray-700 mx-2 my-1" />
                                        
                                        <UserMenuItem to="/logout" onClick={closeUserMenu} isRed={true}>Sign out</UserMenuItem>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main content area */}
                <main className="bg-gray-50 dark:bg-gray-900">
                    {children}
                </main>
            </div>

            <footer className="bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
                <div className="w-full max-w-6xl mx-auto px-6 py-16">
                    <div className="flex flex-col items-center space-y-6">
                        <div className="flex items-center justify-center space-x-6">
                            {socialLinks.map(link => (
                                <SocialLink
                                    key={link.href}
                                    href={link.href}
                                    icon={link.icon}
                                    label={link.label}
                                />
                            ))}
                        </div>

                        <div className="text-center">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                ©2025 Autoresum. All rights reserved.
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                Autoresum® is a registered trademark of The CV Group.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
} 