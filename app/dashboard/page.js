'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import I18nProvider from '../components/providers/I18nProvider';
import { api } from '../lib/api';

const DashboardPage = () => {
  const { t } = useTranslation();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.getDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const PieChart = ({ title, data }) => {
    return (
      <Card padding="lg" className="h-64">
        <h3 className="text-lg font-bold text-[#103358] mb-4">{title}</h3>
        <div className="flex items-center justify-center h-32">
          <div className="w-32 h-32 rounded-full border-8 border-gray-200 relative">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(${data?.homework?.color} 0deg ${(data?.homework?.percentage / 100) * 360}deg, ${data?.classwork?.color} ${(data?.homework?.percentage / 100) * 360}deg 360deg)`
              }}
            ></div>
            <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-sm text-[#103358]">{data?.homework?.value}</div>
                <div className="text-xs text-gray-500">{data?.homework?.percentage}%</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center space-x-4 mt-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#103358] mr-2"></div>
            <span className="text-sm text-[#103358]">Homework</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#398AC8] mr-2"></div>
            <span className="text-sm text-[#103358]">Classwork</span>
          </div>
        </div>
      </Card>
    );
  };

  const DonutChart = ({ title, percentage, color }) => {
    return (
      <Card padding="lg" className="h-64">
        <h3 className="text-lg font-bold text-[#103358] mb-4">{title}</h3>
        <div className="flex items-center justify-center h-32">
          <div className="w-32 h-32 rounded-full border-8 border-gray-200 relative">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(${color} 0deg ${(percentage / 100) * 360}deg, #f3f4f6 ${(percentage / 100) * 360}deg 360deg)`
              }}
            ></div>
            <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#103358]">{percentage}%</div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  const LeaderboardSection = ({ title, data }) => {
    return (
      <div>
        <h3 className="text-lg font-bold text-[#103358] mb-4">{title}</h3>
        <div className="space-y-2">
          {data?.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <div className="flex items-center">
                <span className="text-sm text-[#103358] mr-2">{item.code}</span>
                <span className="text-sm text-[#103358]">{item.name}</span>
                <div className="w-3 h-3 bg-[#F2C94C] rounded ml-2"></div>
              </div>
              <div className="flex items-center">
                <img src="" alt="user" className="w-4 h-4 text-gray-400 mr-1" />
                <span className="text-sm text-[#103358]">{item.count}</span>
              </div>
            </div>
          ))}
        </div>
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
        <div className="p-8">
          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <PieChart
              title={t('questionHomeworkToClasswork')}
              data={dashboardData?.charts?.homeworkToClasswork}
            />
            <PieChart
              title={t('timeHomeworkToClasswork')}
              data={dashboardData?.charts?.timeComparison}
            />
            <DonutChart
              title={t('teacherEngagement')}
              percentage={dashboardData?.charts?.teacherEngagement?.percentage}
              color={dashboardData?.charts?.teacherEngagement?.color}
            />
          </div>

          {/* Leaderboard Section */}
          <Card padding="lg" className="mb-8">
            <h2 className="text-xl font-bold text-[#103358] mb-6">
              {t('difficultTopicLeaderboard')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <LeaderboardSection
                title={t('mathematics')}
                data={dashboardData?.leaderboard?.mathematics}
              />
              <LeaderboardSection
                title={t('english')}
                data={dashboardData?.leaderboard?.english}
              />
              <LeaderboardSection
                title={t('science')}
                data={dashboardData?.leaderboard?.science}
              />
            </div>
          </Card>

          {/* Goals Section */}
          <Card padding="lg">
            <h2 className="text-xl font-bold text-[#103358] mb-6">
              {t('defaultGoalsTitle')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#103358] mb-2">
                  {t('practiceTimePerWeek')}
                </label>
                <Input
                  type="number"
                  value={dashboardData?.goals?.practiceTimePerWeek}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#103358] mb-2">
                  {t('topicsMasteredPerWeek')}
                </label>
                <Input
                  type="number"
                  value={dashboardData?.goals?.topicsMasteredPerWeek}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#103358] mb-2">
                  {t('examDate')}
                </label>
                <Input
                  type="text"
                  placeholder={t('examDatePlaceholder')}
                  value={dashboardData?.goals?.examDate}
                  className="w-full"
                  icon="calendar"
                  iconPosition="right"
                />
              </div>
            </div>
          </Card>
        </div>
      </Layout>
    </I18nProvider>
  );
};

export default DashboardPage; 