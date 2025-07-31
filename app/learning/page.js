'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../components/layout/Layout';
import I18nProvider from '../components/providers/I18nProvider';
import TopicsDisplay from '../components/learning/TopicsDisplay';
import { api } from '../lib/api';

const LearningPage = () => {
  const { t } = useTranslation();
  const [learningData, setLearningData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.getLearningData();
        setLearningData(data);
      } catch (error) {
        console.error('Error fetching learning data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (filters) => {
    console.log('Filters changed:', filters);
    // Handle filter changes here
  };

  if (loading) {
    return (
      <I18nProvider>
        <Layout>
          <div className="flex items-center justify-center h-64">
            <div className="text-[#103358]">{t('loading')}</div>
          </div>
        </Layout>
      </I18nProvider>
    );
  }

  return (
    <I18nProvider>
      <Layout sidebarData={learningData}>
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Page Title */}
          <h1 
            className="mb-6 sm:mb-8"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: 'clamp(18px, 4vw, 22px)',
              lineHeight: '28px',
              color: '#1E1B39'
            }}
          >
            {t('unitsAndTopics')}
          </h1>

          {/* Topics Display Component */}
          <TopicsDisplay
            leftColumn={{
              title: '5.1 Fractions',
              topics: learningData?.topics?.fractions || [],
              showStatus: true
            }}
            rightColumn={{
              title: 'Units and Topics',
              topics: learningData?.topics?.decimals?.slice(0, 12) || [],
              showStatus: true
            }}
         
            onFilterChange={handleFilterChange}
            maxHeight="520px"
            scrollable={true}
            showSeparator={true}
          />
        </div>
      </Layout>
    </I18nProvider>
  );
};

export default LearningPage;