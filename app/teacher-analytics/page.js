'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import Layout from '../components/layout/Layout';
import I18nProvider from '../components/providers/I18nProvider';
import FilterDropdown from '../components/common/FilterDropdown';
import Chart from '../components/ui/Chart';
import PieChart from '../components/analytics/PieChart';
import { api } from '../lib/api';
import '../lib/i18n'; // Ensure i18n is initialized for the component

// --- Reusable Sub-components ---

const EngagementChart = ({ title, percentage }) => (
  <div className="flex flex-col items-center">
    <h3 className="mb-2 sm:mb-4 text-center text-base sm:text-lg font-semibold" style={{ color: '#103358' }}>{title}</h3>
    <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full flex items-center justify-center" style={{ background: `conic-gradient(#103358 0% ${percentage}%, #398AC8 ${percentage}% 100%)` }}>
      <div className="absolute w-[88%] h-[88%] bg-white rounded-full flex items-center justify-center">
        <span className="text-2xl sm:text-3xl lg:text-5xl font-semibold" style={{ color: '#103358' }}>{percentage}%</span>
      </div>
    </div>
  </div>
);

// --- Main Page Component ---

const TeacherAnalyticsPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ grade: 'All grades', subject: 'All subjects', dateRange: 'Last 30 days' });
  const [goals, setGoals] = useState({ practiceTime: 0, topicsMastered: 0, examDate: '' });

  // --- Data Fetching ---
  const fetchData = async (currentFilters) => {
    // Set loading to true only if it's not the initial load, to avoid flicker
    if (pageData) setLoading(true); 
    
    try {
      // Pass the current filters to the API
      const data = await api.getTeacherAnalyticsPageData(currentFilters);
      setPageData(data);
      if (data.goals) {
        setGoals(data.goals);
      }
    } catch (error) {
      console.error("Failed to fetch analytics data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch on component mount
  useEffect(() => {
    fetchData(filters);
  }, []);

  // --- Event Handlers ---
  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    fetchData(newFilters); // Re-fetch data when a filter changes
  };

  const handleGoalChange = (e) => {
    const { name, value } = e.target;
    setGoals(prev => ({ ...prev, [name]: value }));
  };

  // --- Chart Configuration ---
  const chartOptions = {
    responsive: true, maintainAspectRatio: false,
    scales: { y: { beginAtZero: true, max: 400 }, x: { ticks: { autoSkip: true, maxRotation: 45, minRotation: 45 } } },
    plugins: { legend: { display: false } }
  };

  const TitleWithRefresh = ({ text, onClick }) => (
    <div className="flex items-center gap-2">
      <span>{text}</span>
      <button
        type="button"
        aria-label="refresh"
        onClick={onClick}
        className="transition-transform hover:rotate-180"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#103358" strokeWidth="2">
          <path d="M23 4v6h-6"/>
          <path d="M1 20v-6h6"/>
          <path d="M3.51 9a9 9 0 0114.13-3.36L23 10"/>
          <path d="M20.49 15a9 9 0 01-14.13 3.36L1 14"/>
        </svg>
      </button>
    </div>
  );

  // --- Render Logic ---
  if (loading && !pageData) { // Show initial loading spinner
    return <I18nProvider><Layout><div className="flex justify-center items-center h-screen">{t('loading')}</div></Layout></I18nProvider>;
  }

  if (!pageData) {
    return <I18nProvider><Layout><div className="flex justify-center items-center h-screen">{t('error')}</div></Layout></I18nProvider>;
  }

  // Prepare Chart Data after ensuring pageData is loaded
  const homeworkChartData = {
    labels: pageData.homeworkQuestions.labels,
    datasets: [{
      label: t('homeworkQuestions'),
      data: pageData.homeworkQuestions.data,
      backgroundColor: '#398AC8',
      borderRadius: 4,
      barThickness: 'flex',
      maxBarThickness: 32,
    }]
  };

  const classroomChartData = {
    labels: pageData.classroomQuestions.labels,
    datasets: [{
      label: t('classroomQuestions'),
      data: pageData.classroomQuestions.data,
      backgroundColor: '#398AC8',
      borderRadius: 4,
      barThickness: 'flex',
      maxBarThickness: 32,
    }]
  };

  return (
    <I18nProvider>
      <Layout showSidebar={false}>
        <div className="w-full min-h-screen bg-[#F8F9FA] px-4 py-4 sm:p-6">
          <div className="max-w-[1297px] mx-auto space-y-4 sm:space-y-6">
            
            <header className="flex flex-wrap justify-between items-center gap-4">
              <h1 className="font-bold text-xl sm:text-2xl" style={{ color: '#103358' }}>{t('teacherAnalytics')}</h1>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 lg:gap-4">
                <FilterDropdown label={t('gradeFilterLabel')} value={filters.grade} onChange={(v) => handleFilterChange('grade', v)} options={['All grades', 'Grade 5', 'Grade 6']} />
                <FilterDropdown label={t('subjectFilterLabel')} value={filters.subject} onChange={(v) => handleFilterChange('subject', v)} options={['All subjects', 'Math', 'Science']} />
                <FilterDropdown label={t('dateRangeFilterLabel')} value={filters.dateRange} onChange={(v) => handleFilterChange('dateRange', v)} options={['Last 30 days', 'Last 90 days']} />
              </div>
            </header>
            
            <main className="space-y-4 sm:space-y-6 relative">
              {/* Loading Overlay for filter changes */}
              {loading && pageData && (
                <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
                   <div className="text-base sm:text-lg font-semibold">{t('loading')}</div>
                </div>
              )}

              <Chart
                type="bar"
                data={homeworkChartData}
                options={chartOptions}
                title={<TitleWithRefresh text={t('homeworkQuestions')} onClick={() => fetchData(filters)} />}
                showGoalLine
                goalValue={pageData.homeworkQuestions.goal}
                showAverage
                averageValue={pageData.homeworkQuestions.average}
                className="border border-black/5"
                height="350px"
              />
              <Chart
                type="bar"
                data={classroomChartData}
                options={chartOptions}
                title={<TitleWithRefresh text={t('classroomQuestions')} onClick={() => fetchData(filters)} />}
                showGoalLine
                goalValue={pageData.classroomQuestions.goal}
                showAverage
                averageValue={pageData.classroomQuestions.average}
                className="border border-black/5"
                height="350px"
              />
              
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-[0px_2px_6px_rgba(13,10,44,0.08)] border border-black/5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-center">
                  <PieChart title={t('questionHomeworkToClasswork')} data={pageData.charts.homeworkToClasswork.data} colors={['#398AC8', '#103358']} />
                  <PieChart title={t('timeHomeworkToClasswork')} data={pageData.charts.timeComparison.data} colors={['#398AC8', '#103358']} />
                  <EngagementChart title={t('teacherEngagement')} percentage={pageData.charts.teacherEngagement.percentage} />
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-[0px_2px_6px_rgba(13,10,44,0.08)] border border-black/5">
                <h2 className="mb-4 sm:mb-6 text-lg sm:text-xl font-bold" style={{ color: '#398AC8' }}>{t('difficultTopicLeaderboard')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-8 gap-y-4 sm:gap-y-6">
                  {Object.keys(pageData.leaderboard).map(subjectKey => (
                     <div key={subjectKey}>
                        <h3 className="mb-3 sm:mb-4 text-base sm:text-lg font-semibold capitalize" style={{ color: '#103358' }}>{t(subjectKey)}</h3>
                        <div className="space-y-2 sm:space-y-3">
                          {pageData.leaderboard[subjectKey].map(topic => (
                            <div key={topic.id} className="flex items-center justify-between p-2 sm:p-3 rounded-lg bg-[#F0F7FF]">
                              <div className="flex items-center space-x-2 min-w-0 flex-1">
                                <span className="text-xs sm:text-sm text-gray-800 truncate">{topic.name}</span>
                                <div className="w-[6px] h-[6px] sm:w-[7px] sm:h-[7px] bg-[#FF0000] flex-shrink-0" />
                              </div>
                              <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0 ml-2">
                                <svg width="14" height="14" className="sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="#398AC8" strokeWidth="2"><path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" /><path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" /></svg>
                                <span className="text-xs sm:text-sm font-medium text-[#398AC8]">{topic.count}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                  ))}
                </div>
              </div>

              <div className="w-full lg:w-10/12 xl:w-8/12">
                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-[0px_2px_6px_rgba(13,10,44,0.08)] border border-black/5">
                  <h2 className="mb-4 sm:mb-6 text-lg sm:text-xl font-semibold" style={{ color: '#103358' }}>{t('defaultGoalsTitle')}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 items-start">
                    <div className="space-y-1 sm:space-y-2">
                      <label className="block mb-1 text-sm sm:text-base font-semibold" style={{ color: '#103358' }}>{t('practiceTime')}</label>
                      <p className="text-xs sm:text-sm mb-2 text-gray-800">{t('practiceTimeSub')}</p>
                      <input type="number" name="practiceTime" value={goals.practiceTime} onChange={handleGoalChange} className="w-full p-2 sm:p-2.5 bg-[#F9FAFB] rounded-md text-gray-900 text-sm sm:text-base border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <label className="block mb-1 text-sm sm:text-base font-semibold" style={{ color: '#103358' }}>{t('topicsMastered')}</label>
                      <p className="text-xs sm:text-sm mb-2 text-gray-800">{t('topicsMasteredSub')}</p>
                      <input type="number" name="topicsMastered" value={goals.topicsMastered} onChange={handleGoalChange} className="w-full p-2 sm:p-2.5 bg-[#F9FAFB] rounded-md text-gray-900 text-sm sm:text-base border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <label className="block mb-1 text-sm sm:text-base font-semibold" style={{ color: '#103358' }}>{t('examDate')}</label>
                      <div className="relative mt-[2.1rem] sm:mt-0 md:mt-[2.1rem]">
                        <input name="examDate" value={goals.examDate} onChange={handleGoalChange} onFocus={(e) => e.target.type='date'} onBlur={(e) => e.target.type='text'} placeholder={t('examDatePlaceholder')} className="w-full p-2 sm:p-2.5 bg-[#F9FAFB] rounded-md text-gray-900 text-sm sm:text-base border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8 sm:pr-10" />
                        <svg className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 pointer-events-none" fill="none" stroke="#103358" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" /></svg>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </Layout>
    </I18nProvider>
  );
};

export default TeacherAnalyticsPage;