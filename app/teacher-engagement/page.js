'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import I18nProvider from '../components/providers/I18nProvider';
import { api } from '../lib/api';
import FilterDropdown from '../components/common/FilterDropdown';
import NavigationTabs from '../components/common/NavigationTabs'; // Import the new component

const TeacherEngagementPage = () => {
  const { t } = useTranslation();
  const [engagementData, setEngagementData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('teacherEngagement');
  const [filters, setFilters] = useState({
    grade: 'All Grade',
    subject: 'All subjects', 
    dateRange: 'Last 30 days',
    teachers: 'All'
  });

  const filterOptions = {
    grade: ['All Grade', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7'],
    subject: ['All subjects', 'Math', 'Science', 'English', 'Geography'],
    dateRange: ['Last 30 days', 'Last 7 days', 'Last 90 days', 'Last year'],
    teachers: ['All', 'Active only', 'Inactive only']
  };

  const filterWidths = {
    grade: '172px',
    subject: '207px', 
    dateRange: '225px',
    teachers: '172px'
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.getTeacherEngagementData();
        setEngagementData(data);
      } catch (error) {
        console.error('Error fetching engagement data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    // Here you can add API call to fetch filtered data
  };

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
    // Here you can add navigation logic or API calls based on the selected tab
    console.log('Tab changed to:', tabKey);
  };

const EngagementBar = ({ teacher, isSummary = false }) => {
  const percentage = isSummary ? teacher.percentage : teacher.engagement;
  const color = teacher.color;
  const isFullEngagement = percentage === 100;
  
  return (
    <div className="mb-6">
      {!isSummary && (
        <div
          className="mb-3"
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '18px',
            fontWeight: 600,
            color: '#103358'
          }}
        >
          {teacher.name}
        </div>
      )}
      <div className="relative">
        <div
          className="relative overflow-hidden"
          style={{
            width: isSummary ? '100%' : '100%',
            height: isSummary ? '50px' : '44px',
            backgroundColor: '#E0E0E0',
            borderRadius: '8px'
          }}
        >
          {/* Main engagement bar */}
          <div
            className="h-full flex items-center relative"
            style={{
              width: `${percentage}%`,
              backgroundColor: color,
              borderRadius: isFullEngagement ? '8px' : '8px 0px 0px 8px',
              clipPath: !isSummary && !isFullEngagement ? 
                'polygon(0% 0%, 63% 1%, 100% 50%, 65% 100%, 0% 100%, 0% 53%)' : 
                'none'
            }}
          >
            {/* White chevron dividers for 100% engagement */}
            {!isSummary && isFullEngagement && (
              <>
                {/* First chevron */}
                <div
                  className="absolute"
                  style={{
                    left: '358px',
                    top: '0px'
                  }}
                >
                  <svg width="29" height="44" viewBox="0 0 29 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 -1L27 23L2 47" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                
                {/* Second chevron */}
                <div
                  className="absolute"
                  style={{
                    left: '664px',
                    top: '0px'
                  }}
                >
                  <svg width="29" height="44" viewBox="0 0 29 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 -1L27 23L2 47" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                
                {/* Third chevron */}
                <div
                  className="absolute"
                  style={{
                    left: '948px',
                    top: '0px'
                  }}
                >
                  <svg width="29" height="44" viewBox="0 0 29 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 -1L27 23L2 47" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </>
            )}
          </div>
          
          {/* Percentage text for partial engagement */}
          {!isSummary && !isFullEngagement && (
            <div
              className="absolute top-1/2 transform -translate-y-1/2"
              style={{
                right: '15%', // Positioned to avoid the arrow area
                fontFamily: 'Poppins, sans-serif',
                fontSize: '18px',
                fontWeight: 600,
                color: '#103358'
              }}
            >
              {percentage}%
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

  const SummaryBar = ({ segments }) => {
    return (
      <div 
        className="flex rounded-lg overflow-hidden mb-8"
        style={{ height: '50px' }}
      >
        {segments.map((segment, index) => {
          const isFirst = index === 0;
          const isLast = index === segments.length - 1;
          
          return (
            <div
              key={index}
              className="flex items-center justify-center relative"
              style={{
                width: `${segment.percentage}%`,
                backgroundColor: segment.color === 'white' ? '#FFFFFF' : segment.color,
                border: segment.color === 'white' ? '1px solid #F2F2F2' : 'none',
                borderRadius: isFirst ? '8px 0 0 8px' : isLast ? '0 8px 8px 0' : '0'
              }}
            >
              <span
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 500,
                  fontSize: '18px',
                  lineHeight: '27px',
                  color: segment.color === 'white' ? '#343C6A' : '#FFFFFF'
                }}
              >
                {segment.percentage}%
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  if (loading) {
    return (
      <I18nProvider>
        <Layout showSidebar={false}>
          <div className="flex items-center justify-center h-64">
            <div className="text-[#103358]">{t('loading')}</div>
          </div>
        </Layout>
      </I18nProvider>
    );
  }

  return (
    <I18nProvider>
      <Layout showSidebar={false}>
        <div className="p-8 max-w-[1300px] m-auto ">
          {/* Header */}
          <div className="flex justify-between items-center mb-8 ">
            <h1 className="text-3xl font-bold text-[#103358]">
              {t('teacherEngagement')}
            </h1>
            
            {/* Filter Dropdowns */}
            <div className="flex space-x-4">
              <FilterDropdown
                label="GRADE"
                value={filters.grade}
                options={filterOptions.grade}
                onChange={(value) => handleFilterChange('grade', value)}
                width={filterWidths.grade}
              />
              <FilterDropdown
                label="SUBJECT"
                value={filters.subject}
                options={filterOptions.subject}
                onChange={(value) => handleFilterChange('subject', value)}
                width={filterWidths.subject}
              />
              <FilterDropdown
                label="DATE RANGE"
                value={filters.dateRange}
                options={filterOptions.dateRange}
                onChange={(value) => handleFilterChange('dateRange', value)}
                width={filterWidths.dateRange}
              />
              <FilterDropdown
                label="TEACHERS"
                value={filters.teachers}
                options={filterOptions.teachers}
                onChange={(value) => handleFilterChange('teachers', value)}
                width={filterWidths.teachers}
              />
            </div>
          </div>

          {/* Navigation and Sort */}
          <div className="flex justify-between items-center mb-6">
            <div 
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '16px',
                color: '#103358'
              }}
            >
              Sort by name
            </div>
            
            {/* Navigation Buttons */}
            <NavigationTabs 
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />
          </div>

          {/* Summary Engagement Bar */}
          <SummaryBar segments={engagementData?.summary?.segments || []} />

          {/* Individual Teacher Engagement */}
          <div >
            {engagementData?.teachers?.map((teacher, index) => (
              <EngagementBar key={index} teacher={teacher} />
            ))}
          </div>
        </div>
      </Layout>
    </I18nProvider>
  );
};

export default TeacherEngagementPage;