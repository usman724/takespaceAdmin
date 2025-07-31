'use client';

const NavigationTabs = ({ 
  tabs = [], 
  activeTab, 
  onTabChange, 
  className = "" 
}) => {
  const defaultTabs = [
    { key: 'studentAnalytics', label: 'Student Analytics' },
    { key: 'teacherEngagement', label: 'Teacher Engagement' },
    { key: 'teacherAnalytics', label: 'Teacher Analytics' }
  ];

  const tabsToRender = tabs.length > 0 ? tabs : defaultTabs;

  return (
    <div className={`flex space-x-2 ${className}`}>
      {tabsToRender.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange && onTabChange(tab.key)}
          className="px-6 py-2 rounded-lg transition-colors hover:opacity-90"
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