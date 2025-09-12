// src/lib/api.js

// Centralized API calling module with comprehensive mock data
const mockData = {
  // Learning page data
  learning: {
   subjects: [
      { id: 1, name: 'Math', icon: '/sidebar/Math.svg', color: '#398AC8' },
      { id: 2, name: 'Science', icon: '/sidebar/Science.svg', color: '#6FCF97' },
      { id: 3, name: 'English', icon: '/sidebar/English.svg', color: '#F2C94C' },
      { id: 4, name: 'Geography', icon: '/sidebar/Geography.svg', color: '#398AC8' }
    ],
    grades: [
      { id: 3, name: 'Grade 3', selected: false },
      { id: 4, name: 'Grade 4', selected: false },
      { id: 5, name: 'Grade 5', selected: true },
      { id: 6, name: 'Grade 6', selected: false },
      { id: 7, name: 'Grade 7', selected: false }
    ],
    topics: {
      fractions: [
        { id: 1, name: 'Fractions of a number', status: 'green' },
        { id: 2, name: 'Fractions of a number: word problems', status: 'green' },
        { id: 3, name: 'Convert decimals to fractions', status: 'green' },
        { id: 4, name: 'Add and subtract fractions with like denominators using number lines', status: null },
        { id: 5, name: 'Add and subtract fractions with like denominators', status: 'yellow' },
        { id: 6, name: 'Add up to 4 fractions with denominators of 10 and 100', status: null },
        { id: 7, name: 'Add fractions with unlike denominators', status: 'yellow' },
        { id: 8, name: 'Subtract fractions with unlike denominators', status: 'yellow' },
        { id: 9, name: 'Add three or more fractions with unlike denominators', status: null },
        { id: 10, name: 'Complete addition and subtraction sentences with fractions', status: 'red' },
        { id: 11, name: 'Geometric sequences with fractions', status: 'red' },
        { id: 12, name: 'Add and subtract mixed numbers with like denominators', status: 'red' },
        { id: 13, name: 'Estimate sums and differences of mixed numbers', status: null },
        { id: 14, name: 'Add mixed numbers with unlike denominators', status: 'red' }
      ],
      decimals: [
        { id: 1, name: 'Multiply a decimal by a power of ten', status: null },
        { id: 2, name: 'Decimal division patterns over increasing place values', status: null },
        { id: 3, name: 'Add and subtract decimals: word problems', status: null },
        { id: 4, name: 'Multiply decimals and whole numbers: word problems', status: null },
        { id: 5, name: 'Division with decimal quotients: word problems', status: null },
        { id: 6, name: 'Add, subtract, multiply and divide decimals: word problems', status: null },
        { id: 7, name: 'Round decimals', status: null },
        { id: 8, name: 'Estimate sums and differences of decimals', status: null },
        { id: 9, name: 'Estimate products of decimals', status: null },
        { id: 10, name: 'Geometric sequences with fractions', status: null },
        { id: 11, name: 'Add and subtract mixed numbers with like denominators', status: null },
        { id: 12, name: 'Choose decimals with a particular sum or difference', status: null }
      ]
    }
  },

  teachersPage: {
    teachers: [
      { id: 1, name: 'Test Application', email: 'willie.jennings@example.com', totalStudents: 36, status: 'active', subjects: ['Maths', 'Science'] },
      { id: 2, name: 'Ameera Binte Mohid Faisal', email: 'michael.mitc@example.com', totalStudents: 56, status: 'active', subjects: ['English Language', 'Geography'] },
      { id: 3, name: 'Guy Hawkins', email: 'tanya.hill@example.com', totalStudents: 15, status: 'active', subjects: ['Maths', 'Science', 'History'] },
      { id: 4, name: 'Eleanor Pena', email: 'jessica.hanson@example.com', totalStudents: 44, status: 'active', subjects: ['English Language'] },
      { id: 5, name: 'Theresa Webb', email: 'sara.cruz@example.com', totalStudents: 23, status: 'active', subjects: ['Geography', 'History'] },
      { id: 6, name: 'Arlene McCoy', email: 'nevaeh.simmons@example.com', totalStudents: 20, status: 'active', subjects: ['Maths'] },
      { id: 7, name: 'Jane Cooper', email: 'bill.sanders@example.com', totalStudents: 37, status: 'active', subjects: ['Science', 'English Language'] },
      { id: 8, name: 'Jerome Bell', email: 'curtis.weaver@example.com', totalStudents: 18, status: 'active', subjects: ['History', 'Geography'] },
      { id: 9, name: 'Brooklyn Simmons', email: 'alma.lawson@example.com', totalStudents: 49, status: 'active', subjects: ['Maths', 'Science', 'English Language'] },
      { id: 10, name: 'Ronald Richards', email: 'deanna.curtis@example.com', totalStudents: 57, status: 'active', subjects: ['Geography', 'History'] },
      { id: 11, name: 'Devon Lane', email: 'dolores.chambers@example.com', totalStudents: 51, status: 'active', subjects: ['Maths', 'English Language'] },
      { id: 12, name: 'Ameer Faizal', email: 'ameer.faizal@example.com', totalStudents: 42, status: 'removed', subjects: ['Science', 'Geography'] },
      { id: 13, name: 'Sarah Johnson', email: 'sarah.johnson@example.com', totalStudents: 38, status: 'active', subjects: ['Maths', 'History'] },
      { id: 14, name: 'Michael Chen', email: 'michael.chen@example.com', totalStudents: 29, status: 'active', subjects: ['English Language', 'Science'] },
      { id: 15, name: 'Emily Davis', email: 'emily.davis@example.com', totalStudents: 33, status: 'active', subjects: ['Geography', 'History'] },
    ],
    subjects: ['Maths', 'English Language', 'Science', 'Geography', 'History']
  },

  // Students page data
  studentsPage: {
    students: [
      {
        id: 1,
        class: 'A',
        firstName: 'Alexandra',
        lastName: 'Bander',
        userName: 'Bloom',
        email: 'abddf@gmail.com',
        grade: '4',
        subjects: ['M4', 'E6'],
        teachers: 'Alexandra, Ha...',
        password: 'Password',
        status: 'active',
        aptitudeLevel: '2',
        accountCreated: '20/12/22',
        lastUpdated: '26/12/22'
      },
      {
        id: 2,
        class: 'A',
        firstName: 'Alexandra',
        lastName: 'Bander',
        userName: 'Bloom',
        email: 'abddf@gmail.com',
        grade: '4',
        subjects: ['M4', 'E6'],
        teachers: 'Alexandra, Ha...',
        password: 'Password',
        status: 'active',
        aptitudeLevel: '2',
        accountCreated: '20/12/22',
        lastUpdated: '26/12/22'
      },
      {
        id: 3,
        class: 'A',
        firstName: 'Stylianos',
        lastName: 'Angelakis',
        userName: 'StyAngel',
        email: 'stylianos@gmail.com',
        grade: '4',
        subjects: ['M4', 'E6'],
        teachers: 'Doctor Alex',
        password: 'Password',
        status: 'deactivated',
        aptitudeLevel: '3',
        accountCreated: '15/11/22',
        lastUpdated: '20/12/22'
      },
      {
        id: 4,
        class: 'A',
        firstName: 'Alexandra',
        lastName: 'Bander',
        userName: 'Bloom',
        email: 'abddf@gmail.com',
        grade: '4',
        subjects: ['M4', 'E6'],
        teachers: 'Alexandra, Ha...',
        password: 'Password',
        status: 'active',
        aptitudeLevel: '2',
        accountCreated: '20/12/22',
        lastUpdated: '26/12/22'
      },
      {
        id: 5,
        class: 'A',
        firstName: 'Alexandra',
        lastName: 'Bander',
        userName: 'Bloom',
        email: 'abddf@gmail.com',
        grade: '4',
        subjects: ['M4', 'E6'],
        teachers: 'Alexandra, Ha...',
        password: 'Password',
        status: 'active',
        aptitudeLevel: '2',
        accountCreated: '20/12/22',
        lastUpdated: '26/12/22'
      },
      {
        id: 6,
        class: 'A',
        firstName: 'Alexandra',
        lastName: 'Bander',
        userName: 'Bloom',
        email: 'abddf@gmail.com',
        grade: '4',
        subjects: ['M4', 'E6'],
        teachers: 'Alexandra, Ha...',
        password: 'Password',
        status: 'active',
        aptitudeLevel: '2',
        accountCreated: '20/12/22',
        lastUpdated: '26/12/22'
      },
      {
        id: 7,
        class: 'A',
        firstName: 'Alexandra',
        lastName: 'Bander',
        userName: 'Bloom',
        email: 'abddf@gmail.com',
        grade: '4',
        subjects: ['M4', 'E6'],
        teachers: 'Alexandra, Ha...',
        password: 'Password',
        status: 'active',
        aptitudeLevel: '2',
        accountCreated: '20/12/22',
        lastUpdated: '26/12/22'
      },
      {
        id: 8,
        class: 'A',
        firstName: 'Alexandra',
        lastName: 'Bander',
        userName: 'Bloom',
        email: 'abddf@gmail.com',
        grade: '4',
        subjects: ['M4', 'E6'],
        teachers: 'Alexandra, Ha...',
        password: 'Password',
        status: 'active',
        aptitudeLevel: '2',
        accountCreated: '20/12/22',
        lastUpdated: '26/12/22'
      },
      {
        id: 9,
        class: 'A',
        firstName: 'Alexandra',
        lastName: 'Bander',
        userName: 'Bloom',
        email: 'abddf@gmail.com',
        grade: '4',
        subjects: ['M4', 'E6'],
        teachers: 'Alexandra, Ha...',
        password: 'Password',
        status: 'active',
        aptitudeLevel: '2',
        accountCreated: '20/12/22',
        lastUpdated: '26/12/22'
      },
      {
        id: 10,
        class: 'B',
        firstName: 'Michael',
        lastName: 'Johnson',
        userName: 'MikeJ',
        email: 'michael.j@gmail.com',
        grade: '5',
        subjects: ['M5', 'S5'],
        teachers: 'Doctor Alex, Jane Cooper',
        password: 'Password',
        status: 'active',
        aptitudeLevel: '1',
        accountCreated: '10/11/22',
        lastUpdated: '25/12/22'
      },
      {
        id: 11,
        class: 'B',
        firstName: 'Sarah',
        lastName: 'Williams',
        userName: 'SarahW',
        email: 'sarah.w@gmail.com',
        grade: '3',
        subjects: ['E3', 'G3'],
        teachers: 'Annette Black',
        password: 'Password',
        status: 'active',
        aptitudeLevel: '2',
        accountCreated: '05/12/22',
        lastUpdated: '28/12/22'
      },
      {
        id: 12,
        class: 'C',
        firstName: 'David',
        lastName: 'Brown',
        userName: 'DavidB',
        email: 'david.b@gmail.com',
        grade: '6',
        subjects: ['M6', 'S6', 'E6'],
        teachers: 'Kathryn Murphy, Jerome Bell',
        password: 'Password',
        status: 'active',
        aptitudeLevel: '1',
        accountCreated: '18/10/22',
        lastUpdated: '30/12/22'
      },
      {
        id: 13,
        class: 'A',
        firstName: 'Emma',
        lastName: 'Davis',
        userName: 'EmmaD',
        email: 'emma.d@gmail.com',
        grade: '4',
        subjects: ['M4', 'E4'],
        teachers: 'Savannah Nguyen',
        password: 'Password',
        status: 'active',
        aptitudeLevel: '3',
        accountCreated: '22/11/22',
        lastUpdated: '29/12/22'
      },
      {
        id: 14,
        class: 'B',
        firstName: 'James',
        lastName: 'Wilson',
        userName: 'JamesW',
        email: 'james.w@gmail.com',
        grade: '5',
        subjects: ['M5', 'S5', 'G5'],
        teachers: 'Jane Cooper, Doctor Alex',
        password: 'Password',
        status: 'active',
        aptitudeLevel: '2',
        accountCreated: '08/12/22',
        lastUpdated: '31/12/22'
      },
      {
        id: 15,
        class: 'C',
        firstName: 'Olivia',
        lastName: 'Miller',
        userName: 'OliviaM',
        email: 'olivia.m@gmail.com',
        grade: '3',
        subjects: ['E3', 'M3'],
        teachers: 'Jerome Bell',
        password: 'Password',
        status: 'active',
        aptitudeLevel: '1',
        accountCreated: '12/11/22',
        lastUpdated: '27/12/22'
      }
    ],
    teachers: ['Doctor Alex', 'Annette Black', 'Kathryn Murphy', 'Jerome Bell', 'Savannah Nguyen', 'Jane Cooper'],
    subjects: ['Maths', 'English Language', 'Science', 'Geography', 'History']
  },
  
  // Teacher Engagement data
  teacherEngagement: {
    filters: {
      grade: 'All Grade',
      subject: 'All subjects',
      dateRange: 'Last 30 days',
      teachers: 'All'
    },
    summary: {
      segments: [
        { percentage: 8, color: 'white' },
        { percentage: 8, color: '#398AC8' },
        { percentage: 8, color: '#F2C94C' },
        { percentage: 76, color: '#103358' }
      ]
    },
    teachers: [
      { name: 'Doctor Alex', engagement: 100, color: '#103358' },
      { name: 'Ameer binte Mohad', engagement: 76, color: '#F2C94C' },
      { name: 'Mr Hafriz', engagement: 100, color: '#103358' },
      { name: 'Ram Thippeswamy', engagement: 28, color: '#398AC8' },
      { name: 'Vanitha V', engagement: 100, color: '#103358' },
      { name: 'John Zaho', engagement: 100, color: '#103358' },
      { name: 'Yuqing Fan', engagement: 100, color: '#103358' },
      { name: 'Jan Yonas', engagement: 76, color: '#F2C94C' }
    ]
  },
  
  // Student Analytics data
  studentAnalytics: {
    filters: {
      grade: 'All Grade',
      subject: 'All subjects',
      dateRange: 'Last 30 days',
      teachers: 'All'
    },
    chartData: {
      labels: ['Grade1', 'Grade2', 'Grade3', 'Grade4', 'Grade6', 'Grade7', 'Grade8', 'Grade9', 'Grade10'],
      data: [330, 470, 320, 460, 340, 330, 250, 390, 200],
      goal: 500,
      average: 157
    }
  },
  
  // Teacher Analytics data
  teacherAnalytics: {
    filters: {
      grade: 'All grades',
      subject: 'All subjects',
      dateRange: 'Last 30 days'
    },
    homeworkQuestions: {
      labels: ['Mia Alexander', 'Bandar Alharty', 'uno Bessoni d...', 'Shri Bhat', 'Aarav C.', 'Dayna C.'],
      data: [200, 350, 180, 280, 150, 90],
      average: 157,
      goal: 120
    },
    classroomQuestions: {
      labels: ['Mia Alexander', 'Bandar Alharty', 'uno Bessoni d...', 'Shri Bhat', 'Aarav C.', 'Dayna C.'],
      data: [180, 320, 160, 250, 140, 80],
      average: 140,
      goal: 100
    }
  },
  
  // Students data table
  students: {
    count: 161,
    data: [
      {
        name: 'Student Name',
        teachers: 'Doctor Alex, Alya Os..',
        year: 'P2',
        questionsAnswered: '14 030',
        questionsPerWeek: '328',
        timeSpent: '99 hrs 3 min',
        timePerWeek: '2 hr 19 min',
        questionsAnswered2: '11 593',
        questionsPerWeek2: '271'
      }
      // ... more student rows
    ],
    summary: {
      total: {
        questionsAnswered: '773 307',
        timeSpent: '10554 hrs 58 mins',
        questionsAnswered2: '223 665'
      },
      average: {
        questionsPerWeek: '112',
        timePerWeek: '1 hr 32 mins',
        questionsPerWeek2: '33'
      }
    }
  },
  
  // Dashboard data (used by TeacherAnalyticsPage)
  dashboard: {
    charts: {
      homeworkToClasswork: {
        data: [{ name: 'Homework', value: 7473 }, { name: 'Classwork', value: 5104 }]
      },
      timeComparison: {
        data: [{ name: 'Homework', value: 651 }, { name: 'Classwork', value: 204 }]
      },
      teacherEngagement: {
        percentage: 75
      }
    },
    leaderboard: {
      mathematics: [
        { id: 'm1', name: 'Homophones with pictures', count: 14 },
        { id: 'm2', name: 'Multiple-meaning words', count: 13 },
        { id: 'm3', name: 'Choose the antonym', count: 10 },
        { id: 'm4', name: 'Interpret remainders', count: 9 },
        { id: 'm5', name: 'Fractions of a number', count: 9 }
      ],
      english: [
        { id: 'e1', name: 'Homophones with pictures', count: 14 },
        { id: 'e2', name: 'Multiple-meaning words', count: 13 },
        { id: 'e3', name: 'Choose the antonym', count: 10 },
        { id: 'e4', name: 'Interpret remainders', count: 9 },
        { id: 'e5', name: 'Fractions of a number', count: 9 }
      ],
      science: [
        { id: 's1', name: 'Homophones with pictures', count: 14 },
        { id: 's2', name: 'Multiple-meaning words', count: 13 },
        { id: 's3', name: 'Choose the antonym', count: 10 },
        { id: 's4', name: 'Interpret remainders', count: 9 },
        { id: 's5', name: 'Fractions of a number', count: 9 }
      ]
    },
    goals: {
      practiceTime: 5,
      topicsMastered: 5,
      examDate: ''
    }
  }
};

// --- API Functions ---

// Generic fetcher function to simulate network delay
const fetcher = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), 500);
  });
};

// Real API functions
const API_BASE_URL = 'https://dev.takespace.com/api/v1';
const FIXED_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU3NzU2ODM1LCJpYXQiOjE3NTc2NzA0MzUsImp0aSI6ImNjNjQ3ZjZkZWVkZTQ4NDk4MDE4MjNhMjQ4NTkwMjUwIiwidXNlcl9pZCI6MX0.teahC5wAQEf33-3NK9dPqZ8krnDay78uFPPlJGnQf0M';

const apiRequest = async (url, options = {}) => {
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${FIXED_TOKEN}`,
      'accept': 'application/json',
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

// Get subjects
const getSubjects = async () => {
  try {
    const data = await apiRequest(`${API_BASE_URL}/admin/students/subjects/`);
    return data;
  } catch (error) {
    console.error('Error fetching subjects:', error);
    throw error;
  }
};

// Get units for a subject (with optional grade filter)
const getUnits = async (subjectId, grade = null) => {
  try {
    let url = `${API_BASE_URL}/subjects/${subjectId}/units/?page=1`;
    if (grade) {
      url += `&grade=${grade}`;
    }
    
    const data = await apiRequest(url);
    return data;
  } catch (error) {
    console.error('Error fetching units:', error);
    throw error;
  }
};

// Learning page
const getLearningData = async () => fetcher(mockData.learning);

// Teacher Engagement
const getTeacherEngagementData = async () => fetcher(mockData.teacherEngagement);

// Student Analytics
const getStudentAnalyticsData = async () => fetcher(mockData.studentAnalytics);

// Teacher Analytics (specific charts)
const getTeacherAnalyticsData = async () => fetcher(mockData.teacherAnalytics);

// Students data table
const getStudentsData = async () => fetcher(mockData.students);

// Dashboard data (for pie charts, leaderboard, goals)
const getDashboardData = async () => fetcher(mockData.dashboard);

// Combined function for the Teacher Analytics Page to load all its data
// First tries the local API route (so later we can swap to real API),
// and falls back to in-memory mock data if needed.
const getTeacherAnalyticsPageData = async (filters = {}) => {
  try {
    const params = new URLSearchParams({
      grade: filters.grade || mockData.teacherAnalytics.filters.grade,
      subject: filters.subject || mockData.teacherAnalytics.filters.subject,
      dateRange: filters.dateRange || mockData.teacherAnalytics.filters.dateRange,
    });
    const res = await fetch(`/api/teacher-analytics?${params.toString()}`);
    if (!res.ok) throw new Error('Failed');
    const json = await res.json();
    return json;
  } catch (err) {
    // Fallback to previously used combined mock
    const [analyticsData, dashboardData] = await Promise.all([
      getTeacherAnalyticsData(),
      getDashboardData()
    ]);
    return { ...analyticsData, ...dashboardData };
  }
};

// Teachers page data
const getTeachersPageData = async () => fetcher(mockData.teachersPage);

// Students page data
const getStudentsPageData = async () => fetcher(mockData.studentsPage);

export const api = {
  getLearningData,
  getTeacherEngagementData,
  getStudentAnalyticsData,
  getTeacherAnalyticsData,
  getStudentsData,
  getDashboardData,
  getTeacherAnalyticsPageData, // Use this for the main page
  getTeachersPageData,
  getStudentsPageData, // New function for students page
  // Real API functions
  getSubjects,
  getUnits,
};

export default api;