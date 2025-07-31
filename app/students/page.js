'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Table from '../components/ui/Table';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import I18nProvider from '../components/providers/I18nProvider';
import { api } from '../lib/api';

const StudentsPage = () => {
  const { t } = useTranslation();
  const [studentsData, setStudentsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.getStudentsData();
        setStudentsData(data);
      } catch (error) {
        console.error('Error fetching students data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { key: 'name', header: t('studentName'), width: '20%' },
    { key: 'teachers', header: t('teachers'), width: '20%' },
    { key: 'year', header: t('year'), width: '10%', align: 'text-center' },
    { 
      key: 'questionsAnswered', 
      header: t('questionsAnswered'), 
      width: '15%', 
      align: 'text-center' 
    },
    { 
      key: 'questionsPerWeek', 
      header: t('questionsAnsweredPerWeek'), 
      width: '15%', 
      align: 'text-center' 
    },
    { 
      key: 'timeSpent', 
      header: t('timeSpent'), 
      width: '15%', 
      align: 'text-center' 
    },
    { 
      key: 'timePerWeek', 
      header: t('timeSpentPerWeek'), 
      width: '15%', 
      align: 'text-center' 
    },
    { 
      key: 'questionsAnswered2', 
      header: t('questionsAnswered'), 
      width: '15%', 
      align: 'text-center' 
    },
    { 
      key: 'questionsPerWeek2', 
      header: t('questionsAnsweredPerWeek'), 
      width: '15%', 
      align: 'text-center' 
    }
  ];

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
              {t('studentCount', { count: studentsData?.count || 0 })}
            </h1>
            
            <Input
              placeholder={t('search')}
              className="w-64"
              icon="search"
              iconPosition="left"
            />
          </div>

          {/* Data Table */}
          <Card padding="lg" className="mb-8">
            <Table
              columns={columns}
              data={studentsData?.data || []}
              striped={true}
            />
          </Card>

          {/* Summary Statistics */}
          <Card padding="lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Totals */}
              <div>
                <h3 className="text-lg font-semibold text-[#103358] mb-4">{t('total')}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('questionsAnswered')}:</span>
                    <span className="font-medium">{studentsData?.summary?.total?.questionsAnswered}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('timeSpent')}:</span>
                    <span className="font-medium">{studentsData?.summary?.total?.timeSpent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('questionsAnswered')}:</span>
                    <span className="font-medium">{studentsData?.summary?.total?.questionsAnswered2}</span>
                  </div>
                </div>
              </div>

              {/* Averages */}
              <div>
                <h3 className="text-lg font-semibold text-[#103358] mb-4">{t('average')}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('questionsAnsweredPerWeek')}:</span>
                    <span className="font-medium">{studentsData?.summary?.average?.questionsPerWeek}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('timeSpentPerWeek')}:</span>
                    <span className="font-medium">{studentsData?.summary?.average?.timePerWeek}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('questionsAnsweredPerWeek')}:</span>
                    <span className="font-medium">{studentsData?.summary?.average?.questionsPerWeek2}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Layout>
    </I18nProvider>
  );
};

export default StudentsPage; 