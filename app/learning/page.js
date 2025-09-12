'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../components/layout/Layout';
import Sidebar from '../components/layout/Sidebar';
import I18nProvider from '../components/providers/I18nProvider';
import TopicsDisplay from '../components/learning/TopicsDisplay';
import { api } from '../lib/api';

const LearningPage = () => {
  const { t } = useTranslation();
  const [subjects, setSubjects] = useState([]);
  const [grades, setGrades] = useState([]);
  const [units, setUnits] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Default grades
  const defaultGrades = [
    { id: '1', name: 'Grade 1', selected: false },
    { id: '2', name: 'Grade 2', selected: false },
    { id: '3', name: 'Grade 3', selected: false },
    { id: '4', name: 'Grade 4', selected: false },
    { id: '5', name: 'Grade 5', selected: true },
    { id: '6', name: 'Grade 6', selected: false }
  ];

  // Fetch subjects on component mount
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.getSubjects();
        
        if (response.statusCode === 200 && response.data) {
          // Map API data to our format with icons
          const subjectsWithIcons = response.data.map(subject => ({
            id: subject.id,
            name: subject.name,
            icon: getSubjectIcon(subject.name)
          }));
          console.log('API subjects loaded:', subjectsWithIcons);
          setSubjects(subjectsWithIcons);
          setGrades(defaultGrades);
          
          // Auto-select first subject and default grade
          if (subjectsWithIcons.length > 0) {
            setSelectedSubject(subjectsWithIcons[0]);
            setSelectedGrade(defaultGrades.find(g => g.id === '5') || defaultGrades[0]);
            console.log('Auto-selected:', subjectsWithIcons[0].name, 'Grade 5');
          }
        } else {
          console.log('API response not valid:', response);
        }
      } catch (error) {
        console.error('Error fetching subjects:', error);
        setError('Failed to load subjects. Please try again.');
        
        // Fallback to default subjects for testing
        const fallbackSubjects = [
          { id: '1', name: 'Math', icon: '/sidebar/Math.svg' },
          { id: '2', name: 'English', icon: '/sidebar/English.svg' },
          { id: '3', name: 'Science', icon: '/sidebar/Science.svg' },
          { id: '4', name: 'Geography', icon: '/sidebar/Geography.svg' }
        ];
        setSubjects(fallbackSubjects);
        setGrades(defaultGrades);
        setSelectedSubject(fallbackSubjects[0]);
        setSelectedGrade(defaultGrades.find(g => g.id === '5') || defaultGrades[0]);
        console.log('Using fallback subjects:', fallbackSubjects);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  // Fetch units when subject or grade changes
  useEffect(() => {
    const fetchUnits = async () => {
      if (!selectedSubject || !selectedGrade) {
        console.log('Missing subject or grade:', { selectedSubject, selectedGrade });
        return;
      }

      console.log('Fetching units for:', selectedSubject.name, selectedGrade.name);
      try {
        setLoading(true);
        setError(null);
        const response = await api.getUnits(selectedSubject.id, selectedGrade.id);
        console.log('Units response:', response);
        
        if (response.statusCode === 200 && response.data && response.data.results) {
          setUnits(response.data.results);
          setSelectedUnit(null); // Reset selected unit
          console.log('Units set:', response.data.results.length);
        }
      } catch (error) {
        console.error('Error fetching units:', error);
        setError('Failed to load units. Please try again.');
        
        // Fallback mock units for testing
        const mockUnits = [
          {
            id: '1',
            name: 'Basic Arithmetic',
            grade: selectedGrade.id,
            topics: [
              { id: '1', name: 'Addition and Subtraction', status: 'green' },
              { id: '2', name: 'Multiplication and Division', status: 'yellow' },
              { id: '3', name: 'Fractions', status: null }
            ]
          },
          {
            id: '2',
            name: 'Algebra',
            grade: selectedGrade.id,
            topics: [
              { id: '4', name: 'Linear Equations', status: 'green' },
              { id: '5', name: 'Quadratic Equations', status: 'red' }
            ]
          }
        ];
        setUnits(mockUnits);
        console.log('Using mock units:', mockUnits);
      } finally {
        setLoading(false);
      }
    };

    fetchUnits();
  }, [selectedSubject, selectedGrade]);

  // Helper function to get subject icon
  const getSubjectIcon = (subjectName) => {
    const iconMap = {
      'Math': '/sidebar/Math.svg',
      'Mathematics': '/sidebar/Math.svg',
      'Science': '/sidebar/Science.svg',
      'English': '/sidebar/English.svg',
      'Geography': '/sidebar/Geography.svg',
      'History': '/sidebar/Geography.svg' // Using geography icon as fallback
    };
    return iconMap[subjectName] || '/sidebar/Math.svg';
  };

  // Handle subject selection
  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setSelectedUnit(null); // Reset selected unit
  };

  // Handle grade selection
  const handleGradeSelect = (grade) => {
    setSelectedGrade(grade);
    setSelectedUnit(null); // Reset selected unit
  };

  // Handle unit selection
  const handleUnitSelect = (unit) => {
    setSelectedUnit(unit);
  };

  // Prepare units data for left column
  const unitsData = units.map(unit => ({
    id: unit.id,
    name: unit.name,
    grade: unit.grade,
    topics: unit.topics || []
  }));

  // Prepare topics data for right column
  const topicsData = selectedUnit ? selectedUnit.topics || [] : [];

  // Debug logging (only when state actually changes)
  useEffect(() => {
    console.log('LearningPage state updated:', {
      selectedSubject: selectedSubject?.name,
      selectedGrade: selectedGrade?.name,
      unitsCount: units.length,
      selectedUnit: selectedUnit?.name,
      topicsCount: topicsData.length
    });
  }, [selectedSubject, selectedGrade, units.length, selectedUnit, topicsData.length]);

  if (loading && subjects.length === 0) {
    return (
      <I18nProvider>
        <Layout>
          <div className="flex items-center justify-center h-64">
            <div className="text-[#103358]">Loading...</div>
          </div>
        </Layout>
      </I18nProvider>
    );
  }

  if (error) {
    return (
      <I18nProvider>
        <Layout>
          <div className="flex items-center justify-center h-64">
            <div className="text-red-500">{error}</div>
          </div>
        </Layout>
      </I18nProvider>
    );
  }

  return (
    <I18nProvider>
      <Layout>
        {/* Sidebar */}
        <Sidebar
          subjects={subjects}
          grades={grades}
          selectedSubject={selectedSubject}
          selectedGrade={selectedGrade}
          onSubjectSelect={handleSubjectSelect}
          onGradeSelect={handleGradeSelect}
        />
        
        {/* Main Content */}
        <div className="lg:ml-[250px] p-4 sm:p-6 lg:p-8" style={{ paddingBottom: 'calc(var(--footer-height) + 24px)' }}>
          {/* Page Title */}
          <h1 
            className="mb-6 sm:mb-8 xs:pl-[20px]"
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

          {/* Loading state for units */}
          {loading && units.length === 0 && (
            <div className="flex items-center justify-center h-32">
              <div className="text-[#103358]">Loading units...</div>
            </div>
          )}

          {/* Topics Display Component */}
          {!loading && (
          <TopicsDisplay
            leftColumn={{
                title: 'Units',
                topics: unitsData,
                showStatus: false,
                onItemClick: handleUnitSelect,
                selectedItem: selectedUnit
            }}
            rightColumn={{
                title: selectedUnit ? `${selectedUnit.name} - Topics` : 'Select a unit to view topics',
                topics: topicsData,
              showStatus: true
            }}
            maxHeight="520px"
            scrollable={true}
            showSeparator={true}
          />
          )}

          {/* No data state */}
          {!loading && units.length === 0 && selectedSubject && selectedGrade && (
            <div className="flex items-center justify-center h-32">
              <div className="text-gray-500">No units found for {selectedSubject.name} - {selectedGrade.name}</div>
            </div>
          )}
        </div>
      </Layout>
    </I18nProvider>
  );
};

export default LearningPage;