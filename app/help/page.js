'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../components/layout/Layout';
import I18nProvider from '../components/providers/I18nProvider';
import '../lib/i18n';
import Image from 'next/image';

const HelpPage = () => {
    const { t } = useTranslation();
    const [activeCategory, setActiveCategory] = useState('Your Account');
    const [showAllArticles, setShowAllArticles] = useState(false);
    const [articlesData, setArticlesData] = useState({});
    const [loading, setLoading] = useState(true);

    // Load articles data from API
    useEffect(() => {
        const loadArticlesData = async () => {
            try {
                const response = await fetch('/api/articles');
                if (!response.ok) {
                    throw new Error('Failed to fetch articles');
                }
                const data = await response.json();
                setArticlesData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error loading articles:', error);
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

    return (
        <I18nProvider>
            <Layout>
                <div className="min-h-screen bg-white">
                    {/* Header Section with Background Image */}
                    <div className="relative h-64  overflow-hidden">
                        <div className="absolute inset-0">
                            <Image
                                src="/help/topheader.svg"
                                alt="Header Background"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="relative z-10 flex items-center justify-center h-full">
                            <h1 className="text-white text-5xl font-bold font-['Objective'] leading-[48px]">
                                How Can We Help?
                            </h1>
                        </div>
                    </div>

                    {/* Getting Started Section */}
                    <div className="px-24 py-12">
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
                    <div className="px-24 pb-12">
                        <div className="flex gap-8">
                            {/* Left Navigation Sidebar */}
                            <div className="w-48 flex-shrink-0">
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
                                <div className="bg-white rounded-[22px] shadow-lg p-12 min-h-[931px]">
                                    <div className="max-w-4xl">
                                        {/* Header */}
                                        <div className="mb-8">
                                            <h2 className="text-4xl font-bold mb-4 font-['Objective'] leading-[37px] bg-gradient-to-r from-[#20507A] to-[#2F71A8] bg-clip-text text-transparent">
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
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                                <path d="M15 2C8.37 2 3 7.37 3 14C3 20.63 8.37 26 15 26C21.63 26 27 20.63 27 14C27 7.37 21.63 2 15 2ZM15 24C9.48 24 5 19.52 5 14C5 8.48 9.48 4 15 4C20.52 4 25 8.48 25 14C25 19.52 20.52 24 15 24Z" fill="white"/>
                                <path d="M15 6C10.58 6 7 9.58 7 14C7 18.42 10.58 22 15 22C19.42 22 23 18.42 23 14C23 9.58 19.42 6 15 6ZM15 20C11.69 20 9 17.31 9 14C9 10.69 11.69 8 15 8C18.31 8 21 10.69 21 14C21 17.31 18.31 20 15 20Z" fill="white"/>
                            </svg>
                            Contact TS Support
                        </button>
                    </div>
                </div>
            </Layout>
        </I18nProvider>
    );
};

export default HelpPage; 