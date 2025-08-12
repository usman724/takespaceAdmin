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
  const [loading, setLoading] = useState(true);
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

  // Chart data
  const chartData = {
    labels: ['Grade1', 'Grade2', 'Grade3', 'Grade4', 'Grade5', 'Grade6', 'Grade7', 'Grade8', 'Grade9', 'Grade10'],
    datasets: [
      {
        label: 'Questions Answered',
        data: [330, 470, 320, 460, 340, 330, 250, 390, 200, 180],
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

  // Table data
  const tableData = [
    {
      id: 1,
      studentName: 'Student Name',
      teachers: 'Doctor Alex, Alya Os..',
      year: 'P2',
      mathQuestionsAnswered: '14 030',
      mathQuestionsPerWeek: '328',
      mathTimeSpent: '99 hrs 3 min',
      mathTimePerWeek: '2 hr 19 min',
      mathQuestionsAnswered2: '11 593',
      mathQuestionsPerWeek2: '271'
    },
    {
      id: 2,
      studentName: 'Student Name',
      teachers: 'Doctor Alex, Alya Os..',
      year: 'P2',
      mathQuestionsAnswered: '14 030',
      mathQuestionsPerWeek: '328',
      mathTimeSpent: '99 hrs 3 min',
      mathTimePerWeek: '2 hr 19 min',
      mathQuestionsAnswered2: '11 593',
      mathQuestionsPerWeek2: '271'
    },
    {
      id: 3,
      studentName: 'Student Name',
      teachers: 'Doctor Alex, Alya Os..',
      year: 'P2',
      mathQuestionsAnswered: '14 030',
      mathQuestionsPerWeek: '328',
      mathTimeSpent: '99 hrs 3 min',
      mathTimePerWeek: '2 hr 19 min',
      mathQuestionsAnswered2: '11 593',
      mathQuestionsPerWeek2: '271'
    },
    {
      id: 4,
      studentName: 'Student Name',
      teachers: 'Doctor Alex, Alya Os..',
      year: 'P2',
      mathQuestionsAnswered: '14 030',
      mathQuestionsPerWeek: '328',
      mathTimeSpent: '99 hrs 3 min',
      mathTimePerWeek: '2 hr 19 min',
      mathQuestionsAnswered2: '11 593',
      mathQuestionsPerWeek2: '271'
    },
    {
      id: 5,
      studentName: 'Student Name',
      teachers: 'Doctor Alex, Alya Os..',
      year: 'P2',
      mathQuestionsAnswered: '14 030',
      mathQuestionsPerWeek: '328',
      mathTimeSpent: '99 hrs 3 min',
      mathTimePerWeek: '2 hr 19 min',
      mathQuestionsAnswered2: '11 593',
      mathQuestionsPerWeek2: '271'
    },
    {
      id: 6,
      studentName: 'Student Name',
      teachers: 'Doctor Alex, Alya Os..',
      year: 'P2',
      mathQuestionsAnswered: '14 030',
      mathQuestionsPerWeek: '328',
      mathTimeSpent: '99 hrs 3 min',
      mathTimePerWeek: '2 hr 19 min',
      mathQuestionsAnswered2: '11 593',
      mathQuestionsPerWeek2: '271'
    },
    {
      id: 7,
      studentName: 'Student Name',
      teachers: 'Doctor Alex, Alya Os..',
      year: 'P2',
      mathQuestionsAnswered: '14 030',
      mathQuestionsPerWeek: '328',
      mathTimeSpent: '99 hrs 3 min',
      mathTimePerWeek: '2 hr 19 min',
      mathQuestionsAnswered2: '11 593',
      mathQuestionsPerWeek2: '271'
    },
    {
      id: 8,
      studentName: 'Student Name',
      teachers: 'Doctor Alex, Alya Os..',
      year: 'P2',
      mathQuestionsAnswered: '14 030',
      mathQuestionsPerWeek: '328',
      mathTimeSpent: '99 hrs 3 min',
      mathTimePerWeek: '2 hr 19 min',
      mathQuestionsAnswered2: '11 593',
      mathQuestionsPerWeek2: '271'
    },
    {
      id: 9,
      studentName: 'Student Name',
      teachers: 'Doctor Alex, Alya Os..',
      year: 'P2',
      mathQuestionsAnswered: '14 030',
      mathQuestionsPerWeek: '328',
      mathTimeSpent: '99 hrs 3 min',
      mathTimePerWeek: '2 hr 19 min',
      mathQuestionsAnswered2: '11 593',
      mathQuestionsPerWeek2: '271'
    }
  ];

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
      try {
        const data = await api.getStudentAnalyticsData();
        setAnalyticsData(data);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
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

  if (loading) {
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
          <div className="overflow-x-hidden">
          <Chart
            type="bar"
            data={chartData}
            options={chartOptions}
            title="Question Answered Per Student"
            height="280px"
            showGoalLine={true}
            goalValue={500}
            showAverage={true}
            averageValue={157}
            className="mb-8"
          />
          </div>

          {/* Students Table */}
          <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
          <AdvancedTable
            data={tableData}
            columns={advancedTableColumns}
            title="161 Students"
            searchPlaceholder="Search"
            showPagination={false}
            multiLevelHeaders={true}
            headerGroups={tableColumns}
            footerContent={
              <button 
                className="px-6 py-2 rounded-lg text-white hover:opacity-90 transition-opacity"
                style={{
                  backgroundColor: '#103358',
                  fontFamily: 'Poppins, sans-serif'
                }}
              >
                See 100 more →
              </button>
            }
            summaryStats={[
              { label: 'Total', value: '773 307' },
              { label: 'Average', value: '112' },
              { label: 'Total', value: '10554 hrs 58 mins' },
              { label: 'Average', value: '1 hr 32 mins' },
              { label: 'Total', value: '223 665' },
              { label: 'Average', value: '33' }
            ]}
          />
          </div>
        </div>
      </Layout>
    </I18nProvider>
  );
};

export default StudentAnalyticsPage;