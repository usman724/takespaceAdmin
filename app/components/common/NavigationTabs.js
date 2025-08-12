'use client';

import { useRouter } from 'next/navigation';

const NavigationTabs = ({ 
  tabs = [], 
  activeTab, 
  onTabChange, 
  className = "" 
}) => {
  const router = useRouter();
  const defaultTabs = [
    { key: 'studentAnalytics', label: 'Student Analytics' },
    { key: 'teacherEngagement', label: 'Teacher Engagement' },
    { key: 'teacherAnalytics', label: 'Teacher Analytics' }
  ];

  const tabsToRender = tabs.length > 0 ? tabs : defaultTabs;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tabsToRender.map((tab) => (
        <button
          key={tab.key}
          onClick={() => {
            if (onTabChange) {
              onTabChange(tab.key);
            } else {
              const routeMap = {
                studentAnalytics: '/analytics',
                teacherEngagement: '/teacher-engagement',
                teacherAnalytics: '/teacher-analytics'
              };
              const target = routeMap[tab.key];
              if (target) router.push(target);
            }
          }}
          className="px-5 py-2 rounded-lg transition-colors hover:opacity-90 whitespace-nowrap"
          style={{
            backgroundColor: activeTab === tab.key ? '#103358' : '#398AC8',
            color: '#FFFFFF',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            border: 'none',
            cursor: 'pointer'
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default NavigationTabs;