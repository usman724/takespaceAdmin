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
      { id: 1, name: 'Test Application', email: 'willie.jennings@example.com', totalStudents: 36, status: 'active' },
      { id: 2, name: 'Ameera Binte Mohid Faisal', email: 'michael.mitc@example.com', totalStudents: 56, status: 'active' },
      { id: 3, name: 'Guy Hawkins', email: 'tanya.hill@example.com', totalStudents: 15, status: 'active' },
      { id: 4, name: 'Eleanor Pena', email: 'jessica.hanson@example.com', totalStudents: 44, status: 'active' },
      { id: 5, name: 'Theresa Webb', email: 'sara.cruz@example.com', totalStudents: 23, status: 'active' },
      { id: 6, name: 'Arlene McCoy', email: 'nevaeh.simmons@example.com', totalStudents: 20, status: 'active' },
      { id: 7, name: 'Jane Cooper', email: 'bill.sanders@example.com', totalStudents: 37, status: 'active' },
      { id: 8, name: 'Jerome Bell', email: 'curtis.weaver@example.com', totalStudents: 18, status: 'active' },
      { id: 9, name: 'Brooklyn Simmons', email: 'alma.lawson@example.com', totalStudents: 49, status: 'active' },
      { id: 10, name: 'Ronald Richards', email: 'deanna.curtis@example.com', totalStudents: 57, status: 'active' },
      { id: 11, name: 'Devon Lane', email: 'dolores.chambers@example.com', totalStudents: 51, status: 'active' },
    ],
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
const getTeacherAnalyticsPageData = async () => {
    const [analyticsData, dashboardData] = await Promise.all([
      getTeacherAnalyticsData(),
      getDashboardData()
    ]);
    return { ...analyticsData, ...dashboardData };
};

const getTeachersPageData = async () => fetcher(mockData.teachersPage);



export const api = {
  getLearningData,
  getTeacherEngagementData,
  getStudentAnalyticsData,
  getTeacherAnalyticsData,
  getStudentsData,
  getDashboardData,
  getTeacherAnalyticsPageData, // Use this for the main page
  getTeachersPageData,
};

export default api;