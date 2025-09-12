'use client';
import { useState, useEffect, useMemo, useCallback } from 'react';

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

const Sidebar = ({ 
  subjects = [], 
  grades = [], 
  selectedSubject = null, 
  selectedGrade = null,
  onSubjectSelect = () => {},
  onGradeSelect = () => {}
}) => {
  const { t } = useTranslation();
  const [expandedSections, setExpandedSections] = useState(['subject', 'grade']);
  const [imageErrors, setImageErrors] = useState({});
  const [mounted, setMounted] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

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

  const displaySubjects = useMemo(() => 
    subjects.length > 0 ? subjects : defaultSubjects, 
    [subjects]
  );
  const displayGrades = useMemo(() => 
    grades.length > 0 ? grades : defaultGrades, 
    [grades]
  );

  // Debug logging (only when props actually change)
  useEffect(() => {
    console.log('Sidebar props updated:', {
      subjects: subjects.length,
      grades: grades.length,
      selectedSubject: selectedSubject?.name,
      selectedGrade: selectedGrade?.name,
      displaySubjects: displaySubjects.length,
      displayGrades: displayGrades.length
    });
  }, [subjects, grades, selectedSubject, selectedGrade, displaySubjects, displayGrades]);

  const toggleSection = useCallback((section) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  }, []);

  const handleImageError = useCallback((subjectId, imagePath) => {
    console.log(`Image failed to load for: ${subjectId}, path: ${imagePath}`);
    setImageErrors(prev => {
      // Only update if the error state actually changes
      if (prev[subjectId] === true) return prev;
      return { ...prev, [subjectId]: true };
    });
  }, []);

  const handleImageLoad = useCallback((subjectId) => {
    console.log(`Image loaded successfully for: ${subjectId}`);
    setImageErrors(prev => {
      // Only update if the error state actually changes
      if (prev[subjectId] === false) return prev;
      return { ...prev, [subjectId]: false };
    });
  }, []);

  // Reusable sidebar content (subject + grade sections)
  const SidebarContent = () => (
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
              {displaySubjects.map((subject, index) => {
                const isSelected = selectedSubject && String(selectedSubject.id) === String(subject.id);
                return (
                  <div key={subject.id}>
                    <div 
                      className={`flex items-center py-3 cursor-pointer hover:bg-gray-50 ${isSelected ? 'bg-blue-50' : ''}`}
                      onClick={() => onSubjectSelect(subject)}
                    >
                      <div className="w-5 h-5 mr-4 flex items-center justify-center">
                        {imageErrors[subject.id] ? (
                          // Fallback: Show colored square if image fails
                          <div 
                            className="w-4 h-4 rounded"
                            style={{ 
                              backgroundColor: subject.id === 'math' || subject.id === '1' ? '#2563eb' :
                                               subject.id === 'science' || subject.id === '3' ? '#16a34a' :
                                               subject.id === 'english' || subject.id === '2' ? '#ea580c' : 
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
                          fontWeight: isSelected ? 600 : 400,
                          fontSize: '16px',
                          color: isSelected ? '#2563eb' : '#103358'
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
                );
              })}
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
              {displayGrades.map((grade, index) => {
                const isSelected = selectedGrade && String(selectedGrade.id) === String(grade.id);
                return (
                  <div key={grade.id}>
                    <div 
                      className={`flex items-center py-3 cursor-pointer hover:bg-gray-50 ${isSelected ? 'bg-blue-50' : ''}`}
                      onClick={() => onGradeSelect(grade)}
                    >
                      <div 
                        className="flex items-center justify-center mr-4 rounded-full"
                        style={{
                          width: '24px',
                          height: '24px',
                          background: isSelected ? '#103358' : 'rgba(0, 0, 0, 0.05)',
                          borderRadius: '12px'
                        }}
                      >
                        <span 
                          style={{
                            fontFamily: 'Roboto, sans-serif',
                            fontWeight: 400,
                            fontSize: '15px',
                            lineHeight: '24px',
                            color: isSelected ? '#FFFFFF' : '#000000',
                            textAlign: 'center'
                          }}
                        >
                          {grade.id}
                        </span>
                      </div>
                      <span 
                        style={{
                          fontFamily: 'Poppins, sans-serif',
                          fontWeight: isSelected ? 600 : 400,
                          fontSize: '16px',
                          color: isSelected ? '#2563eb' : '#103358'
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
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <div 
        className="hidden md:block fixed left-0 bg-white border-r border-gray-200"
        style={{
          top: '100px',
          height: 'calc(100vh - 100px - var(--footer-height))',
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
    <>
      {/* Mobile: Toggle Button in same position as sidebar */}
      <button
        type="button"
        aria-label="Open sidebar"
        onClick={() => setIsMobileOpen(true)}
        className="md:hidden fixed left-2 mt-[10px] z-50 bg-[#103358] text-white rounded-md p-2 shadow"
        style={{ top: '100px' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Desktop: Persistent sidebar */}
      <div 
        className="hidden md:block fixed left-0 bg-white border-r border-gray-200 sidebar-scroll"
        style={{
          top: '100px',
          height: 'calc(100vh - 100px - var(--footer-height))',
          width: '250px',
          overflowY: 'auto',
          overflowX: 'hidden'
        }}
      >
        <SidebarContent />
      </div>

      {/* Mobile: Slide-in sidebar with overlay */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/30" onClick={() => setIsMobileOpen(false)} />

          {/* Drawer */}
          <div 
            className="absolute left-0 bg-white border-r border-gray-200 shadow-xl"
            style={{
              top: '100px',
              height: 'calc(100vh - 100px - var(--footer-height))',
              width: '250px',
              overflowY: 'auto',
              overflowX: 'hidden'
            }}
          >
            {/* Close button */}
            <button
              type="button"
              aria-label="Close sidebar"
              onClick={() => setIsMobileOpen(false)}
              className="absolute right-2 top-2 p-1 rounded hover:bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#103358" strokeWidth="2" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="pt-8 h-full">
              <SidebarContent />
            </div>
          </div>
        </div>
      )}

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .sidebar-scroll {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e0 #f7fafc;
        }
        
        .sidebar-scroll::-webkit-scrollbar {
          width: 6px;
        }
        
        .sidebar-scroll::-webkit-scrollbar-track {
          background: #f7fafc;
        }
        
        .sidebar-scroll::-webkit-scrollbar-thumb {
          background-color: #cbd5e0;
          border-radius: 3px;
        }
        
        .sidebar-scroll::-webkit-scrollbar-thumb:hover {
          background-color: #a0aec0;
        }
      `}</style>
    </>
  );
};

export default Sidebar;