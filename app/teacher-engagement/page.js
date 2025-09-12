'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();
  const [engagementData, setEngagementData] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState(['All subjects']);
  const [loading, setLoading] = useState(true); // initial page loader only
  const [barsLoading, setBarsLoading] = useState(false); // loader for bars section on refetch
  const [activeTab, setActiveTab] = useState('teacherEngagement');
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [filters, setFilters] = useState({
    grade: 'All Grade',
    subject: 'All subjects', 
    dateRange: 'Last 30 days',
    teachers: 'All'
  });

  const filterOptions = {
    grade: ['All Grade', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6'],
    subject: subjectOptions,
    dateRange: ['Last 30 days', 'Last 7 days', 'All time', 'Last year', 'Today', 'Yesterday'],
    teachers: ['All']
  };

  const filterWidths = {
    grade: '172px',
    subject: '207px', 
    dateRange: '225px',
    teachers: '172px'
  };

  useEffect(() => {
    const init = async () => {
      try {
        // load subjects for subject filter options
        const subjectsRes = await api.getSubjects();
        const subjectNames = subjectsRes?.data?.map(s => s.name) || [];
        setSubjects(subjectsRes?.data || []);
        setSubjectOptions(['All subjects', ...subjectNames]);
      } catch (e) {
        console.warn('Failed to load subjects for filter:', e);
      } finally {
        // trigger first fetch with full page loader
        await fetchEngagement(true);
      }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mapDateRangeToApi = (label) => {
    const map = {
      'Last 30 days': '30d',
      'Last 7 days': '7d',
      'All time': 'all_time',
      'Last year': 'last_year',
      'Today': 'today',
      'Yesterday': 'yesterday'
    };
    return map[label] || '30d';
  };

  const mapGradeToId = (gradeLabel) => {
    if (!gradeLabel || gradeLabel === 'All Grade') return null;
    const match = gradeLabel.match(/Grade\s*(\d+)/i);
    return match ? match[1] : null;
  };

  const mapSubjectToId = (subjectLabel) => {
    if (!subjectLabel || subjectLabel === 'All subjects') return null;
    const found = subjects.find(s => s.name === subjectLabel);
    return found ? found.id : null;
  };

  const transformApiToUi = (apiJson) => {
    // apiJson shape from user example: { statusCode, data: { total_engagement: [...], engagement_items: [...] }, error }
    const segments = (apiJson?.data?.total_engagement || []).map(item => {
      // map status to colors as per existing UI palette
      const colorMap = {
        low: '#FFFFFF',
        medium: '#398AC8',
        good: '#F2C94C',
        very_good: '#103358'
      };
      return { percentage: Number(item.score), color: colorMap[item.status] || '#103358' };
    });
    const teachers = (apiJson?.data?.engagement_items || []).map(item => ({
      name: item.teacher_name,
      engagement: Number(item.score),
      color: Number(item.score) === 100 ? '#103358' : '#398AC8'
    }));
    return { summary: { segments }, teachers };
  };

  const fetchEngagement = async (usePageLoader = false) => {
    if (usePageLoader) {
      setLoading(true);
    } else {
      setBarsLoading(true);
    }
    try {
      const params = {
        dateRange: mapDateRangeToApi(filters.dateRange),
        gradeId: mapGradeToId(filters.grade),
        subjectId: mapSubjectToId(filters.subject)
      };
      const apiJson = await api.getTeacherEngagement(params);
      setEngagementData(transformApiToUi(apiJson));
    } catch (error) {
      console.error('Error fetching engagement data:', error);
      setEngagementData({ summary: { segments: [] }, teachers: [] });
    } finally {
      if (usePageLoader) {
        setLoading(false);
      } else {
        setBarsLoading(false);
      }
    }
  };

  // Track screen size for responsive tweaks (mobile-first)
  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 640);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  useEffect(() => {
    // refetch on any relevant filter change
    fetchEngagement(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.grade, filters.subject, filters.dateRange]);

  const handleTabChange = (tabKey) => {
    const routeMap = {
      studentAnalytics: '/analytics',
      teacherEngagement: '/teacher-engagement',
      teacherAnalytics: '/teacher-analytics'
    };
    const target = routeMap[tabKey];
    if (target) router.push(target);
  };

// Scalable chevron overlay for full-width bars. The SVG scales to the bar size
// and keeps chevrons proportionally sized and spaced. On small screens the
// chevrons remain slim due to non-scaling strokes.
const FullWidthChevronOverlay = ({ chevrons = 3 }) => {
  const apexPositions = chevrons === 2 ? [33.33, 66.66] : [25, 50, 75];
  const chevronWidth = 3.5; // in viewBox percentage units (smaller = slimmer)
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 44"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {apexPositions.map((apex, idx) => {
        const base = apex - chevronWidth;
        return (
          <polyline
            key={idx}
            points={`${base},0 ${apex},22 ${base},44`}
            stroke="white"
            strokeWidth={2}
            vectorEffect="non-scaling-stroke"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      })}
    </svg>
  );
};

const EngagementBar = ({ teacher, isSummary = false, isSmallScreen = false }) => {
  const percentage = isSummary ? teacher.percentage : teacher.engagement;
  const color = teacher.color;
  const isFullEngagement = percentage === 100;
  const barHeightCss = isSummary ? 'clamp(32px, 6vw, 50px)' : 'clamp(26px, 4.5vw, 44px)';
  const arrowHeadWidthPx = isSmallScreen ? 14 : 18; // slimmer arrowhead on mobile

  return (
    <div className="mb-6">
      {!isSummary && (
        <div
          className="mb-3"
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: 'clamp(14px, 2.6vw, 18px)',
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
            width: '100%',
            height: barHeightCss,
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
              clipPath:
                !isSummary && !isFullEngagement
                  ? `polygon(0 0, calc(100% - ${arrowHeadWidthPx}px) 0, 100% 50%, calc(100% - ${arrowHeadWidthPx}px) 100%, 0 100%)`
                  : 'none'
            }}
          >
            {/* Responsive chevrons for 100% engagement */}
            {!isSummary && isFullEngagement && (
              <FullWidthChevronOverlay chevrons={isSmallScreen ? 2 : 3} />
            )}
          </div>

          {/* Percentage text for partial engagement */}
          {!isSummary && !isFullEngagement && (
            <div
              className="absolute top-1/2 -translate-y-1/2"
              style={{
                right: '16px',
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(14px, 2.6vw, 18px)',
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
        style={{ height: 'clamp(32px, 6vw, 50px)' }}
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
                  fontSize: 'clamp(12px, 2.2vw, 18px)',
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
        <div className="px-4 py-6 lg:p-8 max-w-[1300px] m-auto ">
          {/* Header */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-8 ">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#103358]">
              {t('teacherEngagement')}
            </h1>
            
            {/* Filter Dropdowns */}
            <div className="flex flex-wrap gap-3 lg:gap-4 w-full lg:w-auto">
              <div className="w-full sm:w-auto">
                <FilterDropdown
                  label="GRADE"
                  value={filters.grade}
                  options={filterOptions.grade}
                  onChange={(value) => handleFilterChange('grade', value)}
                  width={isSmallScreen ? '100%' : filterWidths.grade}
                />
              </div>
              <div className="w-full sm:w-auto">
                <FilterDropdown
                  label="SUBJECT"
                  value={filters.subject}
                  options={filterOptions.subject}
                  onChange={(value) => handleFilterChange('subject', value)}
                  width={isSmallScreen ? '100%' : filterWidths.subject}
                />
              </div>
              <div className="w-full sm:w-auto">
                <FilterDropdown
                  label="DATE RANGE"
                  value={filters.dateRange}
                  options={filterOptions.dateRange}
                  onChange={(value) => handleFilterChange('dateRange', value)}
                  width={isSmallScreen ? '100%' : filterWidths.dateRange}
                />
              </div>
              <div className="w-full sm:w-auto">
                <FilterDropdown
                  label="TEACHERS"
                  value={filters.teachers}
                  options={filterOptions.teachers}
                  onChange={(value) => handleFilterChange('teachers', value)}
                  width={isSmallScreen ? '100%' : filterWidths.teachers}
                />
              </div>
            </div>
          </div>

          {/* Navigation and Sort */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-6">
            <div 
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(14px, 2.4vw, 16px)',
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

          {/* Summary Engagement and Bars Section */}
          {barsLoading ? (
            <div className="flex items-center justify-center h-40">
              <div className="text-[#103358]">{t('loading')}</div>
            </div>
          ) : (
            <>
              <SummaryBar segments={engagementData?.summary?.segments || []} />
              <div>
                {engagementData?.teachers?.map((teacher, index) => (
                  <EngagementBar key={index} teacher={teacher} isSmallScreen={isSmallScreen} />
                ))}
              </div>
            </>
          )}
        </div>
      </Layout>
    </I18nProvider>
  );
};

export default TeacherEngagementPage;