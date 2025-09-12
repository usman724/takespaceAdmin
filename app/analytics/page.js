'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import Layout from '../components/layout/Layout';
import I18nProvider from '../components/providers/I18nProvider';
import { api } from '../lib/api';
import FilterDropdown from '../components/common/FilterDropdown';
import NavigationTabs from '../components/common/NavigationTabs';
import DataTable from '../components/ui/DataTable';
import AdvancedTable from '../components/ui/AdvancedTable';
import Chart from '../components/ui/Chart';

const StudentAnalyticsPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [analyticsData, setAnalyticsData] = useState(null);
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [activeTab, setActiveTab] = useState('studentAnalytics');
  const [isWeeklyAverage, setIsWeeklyAverage] = useState(true);
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

  // Derived chart data from API
  const chartData = {
    labels: analyticsData?.data?.questions_answered_per_student?.labels || [],
    datasets: [
      {
        label: 'Questions Answered',
        data: (analyticsData?.data?.questions_answered_per_student?.data || []).map(v => Number(v) || 0),
        backgroundColor: '#103358',
        borderRadius: 4,
        barThickness: 32,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 500,
        stepSize: 100,
      },
    },
  };

  // Table data derived from API students
  const tableData = (students || []).map((s, idx) => {
    const subjectByName = Object.fromEntries((s.subjects || []).map(sub => [sub.subject_name, sub]));
    const math = subjectByName['Math'] || {};
    return {
      id: idx + 1,
      studentName: s.student_name || '',
      teachers: s.teacher_names || '',
      year: s.year || '',
      mathQuestionsAnswered: math.questions_answered || '',
      mathQuestionsPerWeek: math.questions_answered_per_week || '',
      mathTimeSpent: math.total_time_spent || '',
      mathTimePerWeek: math.time_spent_per_week || '',
      mathQuestionsAnswered2: math.questions_answered || '',
      mathQuestionsPerWeek2: math.questions_answered_per_week || ''
    };
  });

  // Table columns configuration for multi-level headers
  const tableColumns = [
    // First header row
    {
      backgroundColor: '#103358',
      cells: [
        { content: 'Student Name', colSpan: 1, rowSpan: 2 },
        { content: 'Teacher(s)', colSpan: 1, rowSpan: 2 },
        { content: 'Year', colSpan: 1, rowSpan: 2 },
        { content: 'Maths', colSpan: 4 },
        { content: 'Maths', colSpan: 2 }
      ]
    },
    // Second header row
    {
      backgroundColor: '#2E4F73',
      cells: [
        { content: 'Questions Answered', align: 'center' },
        { content: 'Questions per week', align: 'center' },
        { content: 'Time Spent', align: 'center' },
        { content: 'Time Spent per week', align: 'center' },
        { content: 'Questions Answered', align: 'center' },
        { content: 'Questions per week', align: 'center' }
      ]
    }
  ];

  // Advanced table columns configuration
  const advancedTableColumns = [
    {
      key: 'studentName',
      title: 'Student Name',
      sortable: true,
      render: (value) => (
        <div style={{ fontFamily: 'Poppins, sans-serif', color: '#374151' }}>
          {value}
        </div>
      )
    },
    {
      key: 'teachers',
      title: 'Teacher(s)',
      sortable: true,
      render: (value) => (
        <div style={{ fontFamily: 'Poppins, sans-serif', color: '#374151' }}>
          {value}
        </div>
      )
    },
    {
      key: 'year',
      title: 'Year',
      sortable: true,
      render: (value) => (
        <div style={{ fontFamily: 'Poppins, sans-serif', color: '#374151' }}>
          {value}
        </div>
      )
    },
    {
      key: 'mathQuestionsAnswered',
      title: 'Questions Answered',
      sortable: true,
      render: (value) => (
        <div style={{ fontFamily: 'Poppins, sans-serif', color: '#374151', textAlign: 'center' }}>
          {value}
        </div>
      )
    },
    {
      key: 'mathQuestionsPerWeek',
      title: 'Questions per week',
      sortable: true,
      render: (value) => (
        <div style={{ fontFamily: 'Poppins, sans-serif', color: '#374151', textAlign: 'center' }}>
          {value}
        </div>
      )
    },
    {
      key: 'mathTimeSpent',
      title: 'Time Spent',
      sortable: true,
      render: (value) => (
        <div style={{ fontFamily: 'Poppins, sans-serif', color: '#374151', textAlign: 'center' }}>
          {value}
        </div>
      )
    },
    {
      key: 'mathTimePerWeek',
      title: 'Time Spent per week',
      sortable: true,
      render: (value) => (
        <div style={{ fontFamily: 'Poppins, sans-serif', color: '#374151', textAlign: 'center' }}>
          {value}
        </div>
      )
    },
    {
      key: 'mathQuestionsAnswered2',
      title: 'Questions Answered',
      sortable: true,
      render: (value) => (
        <div style={{ fontFamily: 'Poppins, sans-serif', color: '#374151', textAlign: 'center' }}>
          {value}
        </div>
      )
    },
    {
      key: 'mathQuestionsPerWeek2',
      title: 'Questions per week',
      sortable: true,
      render: (value) => (
        <div style={{ fontFamily: 'Poppins, sans-serif', color: '#2563EB', textAlign: 'center', fontWeight: 500 }}>
          {value}
        </div>
      )
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Reset pagination when filters or toggle change
        const initialPage = 1;
        const data = await api.getStudentAnalyticsAPI({
          avg: isWeeklyAverage ? 'weekly' : 'monthly',
          dateRange: filters.dateRange,
          grade: filters.grade,
          subject: filters.subject,
          page: initialPage
        });
        setAnalyticsData(data);
        const received = data?.data?.students || [];
        setStudents(received.slice(0, 50));
        setPage(1);
        setHasMore(received.length > 50);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      } finally {
        setLoading(false);
        if (initialLoad) setInitialLoad(false);
      }
    };

    fetchData();
  }, [isWeeklyAverage, filters.grade, filters.subject, filters.dateRange]);

  // Load more handler (client-side first, then API page++)
  const handleLoadMore = async () => {
    // Try to use any remaining items from latest API response first
    if (analyticsData?.data?.students) {
      const currentAll = analyticsData.data.students;
      const nextSliceEnd = (students.length + 50);
      if (nextSliceEnd <= currentAll.length) {
        setStudents(currentAll.slice(0, nextSliceEnd));
        setHasMore(nextSliceEnd < currentAll.length);
        return;
      }
    }

    // If we exhausted local buffer, request next page from API
    try {
      setLoadingMore(true);
      const nextPage = page + 1;
      const data = await api.getStudentAnalyticsAPI({
        avg: isWeeklyAverage ? 'weekly' : 'monthly',
        dateRange: filters.dateRange,
        grade: filters.grade,
        subject: filters.subject,
        page: nextPage
      });
      const received = data?.data?.students || [];
      if (received.length === 0) {
        setHasMore(false);
        return;
      }
      setStudents(prev => [...prev, ...received].slice(0, prev.length + received.length));
      setPage(nextPage);
      setHasMore(received.length >= 50);
    } catch (e) {
      console.error('Failed to load more students:', e);
    } finally {
      setLoadingMore(false);
    }
  };

  // Footer summary stats computed from current table data (Math only)
  const parseNumber = (val) => {
    if (typeof val === 'number') return val;
    if (!val) return 0;
    const n = String(val).replace(/[^0-9.-]/g, '');
    return Number(n || 0);
  };
  const parseTimeToMinutes = (str) => {
    if (!str) return 0;
    const s = String(str).toLowerCase();
    const hrMatch = s.match(/(\d+)\s*hr|hrs/);
    const hrs = hrMatch ? parseInt(hrMatch[1], 10) : (s.includes('hr') ? parseInt(s, 10) || 0 : 0);
    const minMatch = s.match(/(\d+)\s*min/);
    const mins = minMatch ? parseInt(minMatch[1], 10) : 0;
    // Also support formats like "3 hrs" exactly
    const simpleHr = s.match(/(\d+)\s*hrs?/);
    const fallbackHrs = simpleHr ? parseInt(simpleHr[1], 10) : 0;
    return (hrs || fallbackHrs) * 60 + mins;
  };
  const minutesToHrsMins = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h} hrs ${m} mins`;
  };
  const mathTotals = students.reduce((acc, s) => {
    const math = (s.subjects || []).find(sub => sub.subject_name === 'Math') || {};
    acc.questions += parseNumber(math.questions_answered);
    acc.questionsPerWeek.push(parseNumber(math.questions_answered_per_week));
    acc.timeTotal += parseTimeToMinutes(math.total_time_spent);
    acc.timePerWeek.push(parseTimeToMinutes(math.time_spent_per_week));
    return acc;
  }, { questions: 0, questionsPerWeek: [], timeTotal: 0, timePerWeek: [] });
  const avg = (arr) => arr.length ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : 0;
  const summaryStats = [
    { label: 'Total', value: String(mathTotals.questions) },
    { label: 'Average', value: String(avg(mathTotals.questionsPerWeek)) },
    { label: 'Total', value: minutesToHrsMins(mathTotals.timeTotal) },
    { label: 'Average', value: minutesToHrsMins(avg(mathTotals.timePerWeek)) },
    { label: 'Total', value: String(mathTotals.questions) },
    { label: 'Average', value: String(avg(mathTotals.questionsPerWeek)) }
  ];

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleTabChange = (tabKey) => {
    const routeMap = {
      studentAnalytics: '/analytics',
      teacherEngagement: '/teacher-engagement',
      teacherAnalytics: '/teacher-analytics'
    };
    const target = routeMap[tabKey];
    if (target) router.push(target);
  };

  if (loading && initialLoad) {
    return (
      <I18nProvider>
        <Layout showSidebar={false}>
          <div className="flex items-center justify-center h-64">
            <div className="text-[#103358]">Loading...</div>
          </div>
        </Layout>
      </I18nProvider>
    );
  }

  return (
    <I18nProvider>
      <Layout showSidebar={false}>
        <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="flex flex-wrap gap-4 justify-between items-center mb-8">
            <h1 
              className="font-bold"
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '20px',
                color: '#103358'
              }}
            >
              Question Answered Per Student
            </h1>
            
            {/* Filter Dropdowns */}
            <div className="flex flex-wrap gap-3 sm:gap-4 w-full lg:w-auto">
              <FilterDropdown
                label="GRADE"
                value={filters.grade}
                options={filterOptions.grade}
                onChange={(value) => handleFilterChange('grade', value)}
                className="w-full sm:w-[172px]"
              />
              <FilterDropdown
                label="SUBJECT"
                value={filters.subject}
                options={filterOptions.subject}
                onChange={(value) => handleFilterChange('subject', value)}
                className="w-full sm:w-[207px]"
              />
              <FilterDropdown
                label="DATE RANGE"
                value={filters.dateRange}
                options={filterOptions.dateRange}
                onChange={(value) => handleFilterChange('dateRange', value)}
                className="w-full sm:w-[225px]"
              />
              <FilterDropdown
                label="TEACHERS"
                value={filters.teachers}
                options={filterOptions.teachers}
                onChange={(value) => handleFilterChange('teachers', value)}
                className="w-full sm:w-[172px]"
              />
            </div>
          </div>

          {/* Navigation and Toggle */}
          <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
            {/* Toggle Switch */}
            <div className="flex items-center space-x-3">
              <span 
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '14px',
                  color: '#103358',
                  fontWeight: isWeeklyAverage ? 600 : 400
                }}
              >
                Weekly Average
              </span>
              <button
                onClick={() => setIsWeeklyAverage(!isWeeklyAverage)}
                className="relative inline-flex h-5 w-10 sm:h-6 sm:w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                style={{
                  backgroundColor: isWeeklyAverage ? '#398AC8' : '#E5E7EB'
                }}
              >
                <span
                  className={`inline-block h-3.5 w-3.5 sm:h-4 sm:w-4 transform rounded-full bg-white transition-transform ${
                    isWeeklyAverage ? 'translate-x-5 sm:translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span 
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '14px',
                  color: '#103358',
                  fontWeight: !isWeeklyAverage ? 600 : 400
                }}
              >
                Monthly Average
              </span>
            </div>
            
            {/* Navigation Buttons */}
            <NavigationTabs 
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />
          </div>

          {/* Bar Chart */}
          <div className="relative overflow-x-hidden">
          {loading && !initialLoad && (
            <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
              <div className="text-[#103358]">Loading…</div>
            </div>
          )}
          <Chart
            type="bar"
            data={chartData}
            options={chartOptions}
            title="Question Answered Per Student"
            height="280px"
            showGoalLine={true}
            goalValue={Number(analyticsData?.data?.questions_answered_per_student?.goal) || 0}
            showAverage={false}
            averageValue={0}
            className="mb-8"
          />
          </div>

          {/* Students Table */}
          <div className="relative overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
          {loading && !initialLoad && (
            <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
              <div className="text-[#103358]">Loading…</div>
            </div>
          )}
          <AdvancedTable
            data={tableData}
            columns={advancedTableColumns}
            title={`${students.length} Students`}
            searchPlaceholder="Search"
            showPagination={false}
            multiLevelHeaders={true}
            headerGroups={tableColumns}
            footerContent={
              hasMore ? (
                <button 
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="px-6 py-2 rounded-lg text-white hover:opacity-90 transition-opacity disabled:opacity-60"
                  style={{
                    backgroundColor: '#103358',
                    fontFamily: 'Poppins, sans-serif'
                  }}
                >
                  {loadingMore ? 'Loading…' : 'See 50 more →'}
                </button>
              ) : null
            }
            summaryStats={summaryStats}
          />
          </div>
        </div>
      </Layout>
    </I18nProvider>
  );
};

export default StudentAnalyticsPage;