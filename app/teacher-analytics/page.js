'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import I18nProvider from '../components/providers/I18nProvider';
import { api } from '../lib/api';

const TeacherAnalyticsPage = () => {
  const { t } = useTranslation();
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.getTeacherAnalyticsData();
        setAnalyticsData(data);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const BarChart = ({ title, data, average, goal }) => {
    return (
      <Card padding="lg" className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-[#103358]">{title}</h2>
          <img src="" alt="refresh" className="w-5 h-5 text-[#103358]" />
        </div>
        
        {/* Chart Container */}
        <div className="h-64 bg-gray-50 rounded-lg p-4">
          <div className="flex items-end justify-between h-full space-x-2">
            {data?.labels?.map((label, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className="w-8 bg-[#398AC8] rounded-t"
                  style={{
                    height: `${(data.data[index] / 400) * 100}%`
                  }}
                ></div>
                <div className="text-xs text-[#103358] mt-2 transform -rotate-45 origin-left">
                  {label}
                </div>
              </div>
            ))}
          </div>
          
          {/* Average and Goal Lines */}
          <div className="relative">
            <div 
              className="absolute border-t-2 border-dashed border-gray-400"
              style={{ top: `${100 - (average / 400) * 100}%` }}
            >
              <span className="bg-white px-2 text-xs text-[#103358]">
                Average: {average}q
              </span>
            </div>
            <div 
              className="absolute border-t-2 border-dashed border-gray-400"
              style={{ top: `${100 - (goal / 400) * 100}%` }}
            >
              <span className="bg-white px-2 text-xs text-[#103358]">
                Goal: {goal}q
              </span>
            </div>
          </div>
        </div>
      </Card>
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
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-[#103358]">
              {t('teacherAnalytics')}
            </h1>
            
            {/* Filter Dropdowns */}
            <div className="flex space-x-4">
              <div className="bg-white border border-gray-300 rounded-lg px-4 py-2">
                <span className="text-[#103358] text-sm">
                  {t('gradeFilter')}
                </span>
              </div>
              <div className="bg-white border border-gray-300 rounded-lg px-4 py-2">
                <span className="text-[#103358] text-sm">
                  {t('subjectFilter')}
                </span>
              </div>
              <div className="bg-white border border-gray-300 rounded-lg px-4 py-2">
                <span className="text-[#103358] text-sm">
                  {t('dateRangeFilter')}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-end mb-6">
            <div className="flex space-x-2">
              <Button variant="secondary" size="sm">
                {t('studentAnalytics')}
              </Button>
              <Button variant="secondary" size="sm">
                {t('teacherEngagement')}
              </Button>
              <Button variant="primary" size="sm">
                {t('teacherAnalytics')}
              </Button>
            </div>
          </div>

          {/* Charts */}
          <BarChart
            title={t('homeworkQuestions')}
            data={analyticsData?.homeworkQuestions}
            average={analyticsData?.homeworkQuestions?.average}
            goal={analyticsData?.homeworkQuestions?.goal}
          />

          <BarChart
            title={t('classroomQuestions')}
            data={analyticsData?.classroomQuestions}
            average={analyticsData?.classroomQuestions?.average}
            goal={analyticsData?.classroomQuestions?.goal}
          />
        </div>
      </Layout>
    </I18nProvider>
  );
};

export default TeacherAnalyticsPage; 