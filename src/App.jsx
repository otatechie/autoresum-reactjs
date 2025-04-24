import React, { useEffect } from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { AuthLayout } from './layouts/AuthLayout'
import { DashboardLayout } from './layouts/DashboardLayout'
import { BaseLayout } from './layouts/BaseLayout'

import { HeroSection } from './components/HeroSection'
import { FeaturesSection } from './components/FeaturesSection'
import { HowItWorksSection } from './components/HowItWorksSection'
import { BuildResumeSection } from './components/BuildResumeSection'
import { TrustSection } from './components/TrustSection'
import { AboutPage } from './pages/AboutPage'
import { LoginPage } from './pages/auth/LoginPage'
import { SignupPage } from './pages/auth/SignupPage'
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage'
import { DashboardPage } from './pages/DashboardPage'
import { CreateResumePage } from './pages/CreateResumePage'
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage'
import { VerifyEmailPage } from './pages/auth/VerifyEmailPage'
import { DownloadPage } from './pages/DownloadPage'
import { StyleGuidePage } from './pages/StyleGuidePage'
import { ProfilePage } from './pages/ProfilePage'
import { ChangePasswordPage } from './pages/ChangePasswordPage'
import { ResumePage } from './pages/ResumePage'
import { HelpPage } from './pages/HelpPage'
import './App.css'

export function HomePage() {
    return (
        <>
            <HeroSection />
            <FeaturesSection />
            <HowItWorksSection />
            <BuildResumeSection />
            <TrustSection />
        </>
    );
}

export function App() {
    // Use system preferences for dark mode
    useEffect(() => {
        // Clear any existing dark mode setting
        localStorage.removeItem('darkMode');

        // Function to update dark mode based on system preference
        const updateDarkMode = (e) => {
            const prefersDark = e?.matches || window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (prefersDark) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        };

        // Initial check
        updateDarkMode();

        // Add listener for system preference changes
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        darkModeMediaQuery.addEventListener('change', updateDarkMode);

        // Cleanup
        return () => {
            darkModeMediaQuery.removeEventListener('change', updateDarkMode);
        };
    }, []);

    return (
        <Routes>
            <Route element={<MainLayout><Outlet /></MainLayout>}>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
            </Route>
            <Route element={<AuthLayout><Outlet /></AuthLayout>}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route path="/verify-email" element={<VerifyEmailPage />} />
            </Route>
            <Route element={<DashboardLayout><Outlet /></DashboardLayout>}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/create-resume" element={<CreateResumePage />} />
                <Route path="/template-gallery" element={<DownloadPage />} />
                <Route path="/download-templates" element={<DownloadPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/change-password" element={<ChangePasswordPage />} />
                <Route path="/resume" element={<ResumePage />} />
                <Route path="/help" element={<HelpPage />} />
            </Route>
            <Route element={<BaseLayout><Outlet /></BaseLayout>}>
                <Route path="/style-guide" element={<StyleGuidePage />} />
            </Route>
        </Routes>
    )
}
