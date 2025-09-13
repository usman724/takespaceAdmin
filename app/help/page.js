'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../components/layout/Layout';
import I18nProvider from '../components/providers/I18nProvider';
import '../lib/i18n';
import Image from 'next/image';
import api from '../lib/api';

const HelpPage = () => {
    const { t } = useTranslation();
    const [activeCategory, setActiveCategory] = useState('Your account');
    const [showAllArticles, setShowAllArticles] = useState(false);
    const [articlesData, setArticlesData] = useState({});
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [error, setError] = useState(null);

    // Load articles data from API
    useEffect(() => {
        const loadArticlesData = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await api.getSupportArticles(1);
                
                if (response.error) {
                    throw new Error(response.error);
                }

                // Transform API response to match expected format
                const transformedData = {};
                if (response.data && response.data.results) {
                    response.data.results.forEach(article => {
                        const category = article.category;
                        if (!transformedData[category]) {
                            transformedData[category] = [];
                        }
                        transformedData[category].push({
                            id: article.title.toLowerCase().replace(/\s+/g, '-'),
                            title: article.title,
                            content: article.content,
                            category: article.category,
                            author: article.author
                        });
                    });
                }
                
                setArticlesData(transformedData);
                setLoading(false);
            } catch (error) {
                console.error('Error loading articles:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        loadArticlesData();
    }, []);

    const categories = Object.keys(articlesData);
    const currentArticles = articlesData[activeCategory] || [];
    const displayedArticles = showAllArticles ? currentArticles : currentArticles.slice(0, 8);
    const hasMoreArticles = currentArticles.length > 8;

    if (loading) {
        return (
            <I18nProvider>
                <Layout>
                    <div className="min-h-screen bg-white flex items-center justify-center">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#398AC8] mx-auto mb-4"></div>
                            <p className="text-[#103358] font-['Poppins']">Loading help articles...</p>
                        </div>
                    </div>
                </Layout>
            </I18nProvider>
        );
    }

    if (error) {
        return (
            <I18nProvider>
                <Layout>
                    <div className="min-h-screen bg-white flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-red-500 text-xl mb-4">⚠️</div>
                            <p className="text-[#103358] font-['Poppins'] mb-4">Failed to load help articles</p>
                            <p className="text-gray-500 font-['Poppins'] text-sm">{error}</p>
                            <button 
                                onClick={() => window.location.reload()} 
                                className="mt-4 bg-[#398AC8] text-white px-4 py-2 rounded-lg font-['Poppins'] hover:bg-[#2F71A8] transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </Layout>
            </I18nProvider>
        );
    }

    return (
        <I18nProvider>
            <Layout>
                <div className="min-h-screen bg-white">
                    {/* Header Section with Background Image */}
                    <div className="relative h-40 md:h-64 overflow-hidden">
                        <div className="absolute inset-0">
                            <Image
                                src="/help/topheader.svg"
                                alt="Header Background"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="relative z-10 flex items-center justify-center h-full">
                            <h1 className="text-white text-3xl md:text-5xl font-bold font-['Objective'] leading-tight md:leading-[48px] text-center px-4">
                                How Can We Help?
                            </h1>
                        </div>
                    </div>

                    {/* Getting Started Section */}
                    <div className="px-6 md:px-24 py-8 md:py-12">
                        <div className="max-w-2xl">
                            <h2 className="text-2xl font-bold text-[#3F3F3F] mb-4 font-['Objective']">
                                Getting Started
                            </h2>
                            <p className="text-[#3F3F3F] text-base leading-6 mb-6 font-['Poppins']">
                                First time using TakeSpase? Curious about a feature you've never tried? Our user guides will give you a step-by-step walkthrough!
                            </p>
                            <button className="bg-[#16375A] text-white px-4 py-2 rounded-lg font-['Poppins'] text-base leading-6 hover:bg-[#2F71A8] transition-colors">
                                See Users Guides
                            </button>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="px-6 md:px-24 pb-12">
                        {/* Mobile: Toggle to open topics */}
                        <div className="md:hidden mb-4">
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="w-full justify-center bg-white border border-[#D9E7EF] rounded-xl py-3 px-4 text-[#103358] font-['Poppins'] text-base flex items-center gap-2 shadow-sm"
                                aria-label="Open topics menu"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                                    <path d="M3 6h18M3 12h18M3 18h18" stroke="#103358" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                                Browse Topics
                            </button>
                        </div>

                        {/* Mobile slide-over sidebar */}
                        <div className={`fixed inset-0 z-50 md:hidden ${isSidebarOpen ? '' : 'pointer-events-none'}`} role="dialog" aria-modal="true">
                            <div
                                className={`absolute inset-0 bg-black/30 transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}
                                onClick={() => setIsSidebarOpen(false)}
                            />
                            <div
                                className={`absolute left-0 top-0 h-full w-72 max-w-[80%] bg-white shadow-2xl transform transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
                            >
                                <div className="relative h-full p-6">
                                    <div className="absolute left-0 top-0 w-1 h-full bg-[#398AC8]"></div>
                                    <div className="ml-4 space-y-6 overflow-y-auto h-full">
                                        {categories.map((category) => (
                                            <button
                                                key={category}
                                                onClick={() => {
                                                    setActiveCategory(category);
                                                    setShowAllArticles(false);
                                                    setIsSidebarOpen(false);
                                                }}
                                                className={`block text-left font-['Objective'] text-base leading-[17px] transition-colors ${
                                                    activeCategory === category
                                                        ? 'text-[#398AC8] font-bold'
                                                        : 'text-[#103358] font-medium'
                                                }`}
                                            >
                                                {category}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-8">
                            {/* Left Navigation Sidebar */}
                            <div className="w-48 flex-shrink-0 hidden md:block">
                                <div className="relative">
                                    {/* Blue vertical line */}
                                    <div className="absolute left-0 top-0 w-1 h-full bg-[#398AC8]"></div>
                                    
                                    {/* Navigation items */}
                                    <div className="ml-8 space-y-8">
                                        {categories.map((category) => (
                                            <button
                                                key={category}
                                                onClick={() => {
                                                    setActiveCategory(category);
                                                    setShowAllArticles(false);
                                                }}
                                                className={`text-left font-['Objective'] text-base leading-[17px] transition-colors ${
                                                    activeCategory === category
                                                        ? 'text-[#398AC8] font-bold'
                                                        : 'text-[#103358] font-medium'
                                                }`}
                                            >
                                                {category}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Content Panel */}
                            <div className="flex-1">
                                <div className="bg-white rounded-[22px] shadow-lg p-6 md:p-12 min-h-[500px] md:min-h-[931px]">
                                    <div className="max-w-4xl">
                                        {/* Header */}
                                        <div className="mb-8">
                                            <h2 className="text-2xl md:text-4xl font-bold mb-4 font-['Objective'] leading-[28px] md:leading-[37px] bg-gradient-to-r from-[#20507A] to-[#2F71A8] bg-clip-text text-transparent">
                                                {activeCategory}
                                            </h2>
                                            <p className="text-[#948F8F] text-base leading-6 font-['Poppins']">
                                                Get help signing in, managing your account setting, and more.
                                            </p>
                                        </div>

                                        {/* Articles Section */}
                                        <div className="mb-8">
                                            <h3 className="text-2xl font-medium text-[#3F3F3F] mb-6 font-['Objective'] leading-[26px]">
                                                Articles
                                            </h3>
                                            
                                            {displayedArticles.length > 0 ? (
                                                <div className="space-y-6">
                                                    {displayedArticles.map((article, index) => (
                                                        <div key={article.id || index}>
                                                            <button className="text-left w-full text-[#398AC8] font-medium text-lg leading-7 font-['Poppins'] hover:text-[#2F71A8] transition-colors">
                                                                {article.title}
                                                            </button>
                                                            {index < displayedArticles.length - 1 && (
                                                                <div className="w-full h-px bg-[#D9E7EF] mt-6"></div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="text-center py-8">
                                                    <p className="text-gray-500 font-['Poppins'] text-lg">
                                                        No articles available for this category yet.
                                                    </p>
                                                </div>
                                            )}

                                            {/* See all articles button */}
                                            {hasMoreArticles && !showAllArticles && (
                                                <button
                                                    onClick={() => setShowAllArticles(true)}
                                                    className="text-[#103358] font-medium text-lg leading-[27px] font-['Poppins'] mt-6 flex items-center gap-2 hover:text-[#2F71A8] transition-colors"
                                                >
                                                    See all articles ({currentArticles.length})
                                                    <svg width="15" height="9" viewBox="0 0 15 9" fill="none">
                                                        <path d="M1 1L7.5 7L14 1" stroke="#103358" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Support Section */}
                    <div className="text-center py-12">
                        <p className="text-[#103358] text-xl leading-[30px] font-['Poppins'] mb-6">
                            Can't find what you are looking for?
                        </p>
                        <button className="bg-[#16375A] text-white px-6 py-4 rounded-lg font-['Poppins'] text-base leading-6 flex items-center gap-2 mx-auto hover:bg-[#2F71A8] transition-colors">
                            <Image src="/help/contactsupport.svg" alt="Contact TS Support" width={30} height={30} />
                            Contact TS Support
                        </button>
                    </div>
                </div>
            </Layout>
        </I18nProvider>
    );
};

export default HelpPage; 