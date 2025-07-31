'use client';
import { useState, useEffect } from 'react';

// Mock translation function
const useTranslation = () => {
  const t = (key) => {
    const translations = {
      'subject': 'Subject',
      'grade': 'Grade'
    };
    return translations[key] || key;
  };
  return { t };
};

const Sidebar = ({ subjects = [], grades = [] }) => {
  const { t } = useTranslation();
  const [expandedSections, setExpandedSections] = useState(['subject', 'grade']);
  const [imageErrors, setImageErrors] = useState({});
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before rendering images
  useEffect(() => {
    setMounted(true);
  }, []);

  // Default data if none provided - using actual SVG files
  const defaultSubjects = [
    { id: 'math', name: 'Math', icon: '/sidebar/Math.svg' },
    { id: 'science', name: 'Science', icon: '/sidebar/Science.svg' },
    { id: 'english', name: 'English', icon: '/sidebar/English.svg' },
    { id: 'geography', name: 'Geography', icon: '/sidebar/Geography.svg' }
  ];

  const defaultGrades = [
    { id: '3', name: 'Grade 3', selected: false },
    { id: '4', name: 'Grade 4', selected: false },
    { id: '5', name: 'Grade 5', selected: true },
    { id: '6', name: 'Grade 6', selected: false },
    { id: '7', name: 'Grade 7', selected: false }
  ];

  const displaySubjects = subjects.length > 0 ? subjects : defaultSubjects;
  const displayGrades = grades.length > 0 ? grades : defaultGrades;

  const toggleSection = (section) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handleImageError = (subjectId, imagePath) => {
    console.log(`Image failed to load for: ${subjectId}, path: ${imagePath}`);
    setImageErrors(prev => ({ ...prev, [subjectId]: true }));
  };

  const handleImageLoad = (subjectId) => {
    console.log(`Image loaded successfully for: ${subjectId}`);
    setImageErrors(prev => ({ ...prev, [subjectId]: false }));
  };

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <div 
        className="fixed left-0 bg-white border-r border-gray-200"
        style={{
          top: '100px',
          height: 'calc(100vh - 100px)',
          width: '250px',
          overflow: 'hidden'
        }}
      >
        <div className="h-full flex flex-col">
          <div className="p-4">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed left-0 bg-white border-r border-gray-200"
      style={{
        top: '100px',
        height: 'calc(100vh - 100px)',
        width: '250px',
        overflow: 'hidden'
      }}
    >
      <div className="h-full flex flex-col">
        {/* Subject Section */}
        <div className="relative flex-shrink-0">
          {/* Subject Header */}
          <div 
            className="px-[20px] py-4 cursor-pointer relative"
            onClick={() => toggleSection('subject')}
            style={{
              width: '250px',
              height: '60px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {/* Left border indicator - same height as header */}
            <div 
              className="absolute left-0 bg-[#103358] rounded-r-lg"
              style={{
                width: '6px',
                height: '60px',
                top: '0'
              }}
            />
            
            <div className="flex items-center justify-between w-full">
              <span 
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 600,
                  fontSize: '18px',
                  lineHeight: '20px',
                  color: '#103358'
                }}
              >
                {t('subject')}
              </span>
              <div className="relative w-5 h-5">
                {/* Use SVG directly instead of img for chevron */}
                <svg
                  className={`w-5 h-5 transition-transform ${
                    expandedSections.includes('subject') ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="#103358"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Subject Items */}
          {expandedSections.includes('subject') && (
            <div className="px-11">
              <div className="space-y-0">
                {displaySubjects.map((subject, index) => (
                  <div key={subject.id}>
                    <div className="flex items-center py-3 cursor-pointer hover:bg-gray-50">
                      <div className="w-5 h-5 mr-4 flex items-center justify-center">
                        {imageErrors[subject.id] ? (
                          // Fallback: Show colored square if image fails
                          <div 
                            className="w-4 h-4 rounded"
                            style={{ 
                              backgroundColor: subject.id === 'math' ? '#2563eb' :
                                               subject.id === 'science' ? '#16a34a' :
                                               subject.id === 'english' ? '#ea580c' : 
                                               '#2563eb'
                            }}
                          />
                        ) : (
                          <img
                            key={`${subject.id}-${subject.icon}`} // Force re-render with key
                            src={subject.icon}
                            alt={subject.name}
                            className="w-5 h-5"
                            onError={(e) => {
                              console.log(`Error loading ${subject.icon}:`, e);
                              handleImageError(subject.id, subject.icon);
                            }}
                            onLoad={() => handleImageLoad(subject.id)}
                            style={{ 
                              display: 'block',
                              maxWidth: '100%',
                              maxHeight: '100%',
                              objectFit: 'contain'
                            }}
                            loading="eager" // Force immediate loading
                          />
                        )}
                      </div>
                      <span 
                        style={{
                          fontFamily: 'Poppins, sans-serif',
                          fontWeight: 400,
                          fontSize: '16px',
                          color: '#103358'
                        }}
                      >
                        {subject.name}
                      </span>
                    </div>
                    {/* Line under each item */}
                    <div 
                      className="w-full mt-[11px]"
                      style={{
                        height: '1px',
                        backgroundColor: '#F2F2F2',
                        width: '176px'
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Grade Section */}
        <div className="relative flex-shrink-0">
          {/* Grade Header */}
          <div 
            className="px-[20px] py-4 cursor-pointer relative"
            onClick={() => toggleSection('grade')}
            style={{
              width: '250px',
              height: '60px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {/* Left border indicator - same height as header */}
            <div 
              className="absolute left-0 bg-[#103358] rounded-r-lg"
              style={{
                width: '6px',
                height: '60px',
                top: '0'
              }}
            />
            
            <div className="flex items-center justify-between w-full">
              <span 
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 600,
                  fontSize: '18px',
                  lineHeight: '20px',
                  color: '#103358'
                }}
              >
                {t('grade')}
              </span>
              <div className="relative w-5 h-5">
                {/* Use SVG directly instead of img for chevron */}
                <svg
                  className={`w-5 h-5 transition-transform ${
                    expandedSections.includes('grade') ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="#103358"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Grade Items */}
          {expandedSections.includes('grade') && (
            <div className="px-11">
              <div className="space-y-0">
                {displayGrades.map((grade, index) => (
                  <div key={grade.id}>
                    <div className="flex items-center py-3 cursor-pointer hover:bg-gray-50">
                      <div 
                        className="flex items-center justify-center mr-4 rounded-full"
                        style={{
                          width: '24px',
                          height: '24px',
                          background: grade.selected ? '#103358' : 'rgba(0, 0, 0, 0.05)',
                          borderRadius: '12px'
                        }}
                      >
                        <span 
                          style={{
                            fontFamily: 'Roboto, sans-serif',
                            fontWeight: 400,
                            fontSize: '15px',
                            lineHeight: '24px',
                            color: grade.selected ? '#FFFFFF' : '#000000',
                            textAlign: 'center'
                          }}
                        >
                          {grade.id}
                        </span>
                      </div>
                      <span 
                        style={{
                          fontFamily: 'Poppins, sans-serif',
                          fontWeight: grade.selected ? 600 : 400,
                          fontSize: '16px',
                          color: '#103358'
                        }}
                      >
                        {grade.name}
                      </span>
                    </div>
                    {/* Line under each item */}
                    <div 
                      className="w-full"
                      style={{
                        height: '1px',
                        backgroundColor: '#F2F2F2',
                        marginLeft: '-44px',
                        width: '176px'
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;