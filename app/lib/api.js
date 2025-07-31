// Centralized API calling module
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
  
  // Teacher Engagement data
// Update the Teacher Engagement data in your API
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
      labels: ['Mia Alexander', 'Bandar Alharty', 'uno Bessoni d...', 'Shri Bhat'],
      data: [200, 350, 180, 280],
      average: 157,
      goal: 120
    },
    classroomQuestions: {
      labels: ['Mia Alexander', 'Bandar Alharty', 'uno Bessoni d...', 'Shri Bhat'],
      data: [180, 320, 160, 250],
      average: 140,
      goal: 100
    }
  },
  
  // Student data table
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
  
  // Dashboard data
  dashboard: {
    charts: {
      homeworkToClasswork: {
        homework: { value: 7473, percentage: 59.49, color: '#103358' },
        classwork: { value: 5104, percentage: 40.51, color: '#398AC8' }
      },
      timeComparison: {
        homework: { value: 651, percentage: 76.1, color: '#103358' },
        classwork: { value: 204, percentage: 23.9, color: '#398AC8' }
      },
      teacherEngagement: {
        percentage: 75,
        color: '#398AC8'
      }
    },
    leaderboard: {
      mathematics: [
        { code: 'P2-FF.1', name: 'Homophones with pictures', count: 14 },
        { code: 'P2-FF.2', name: 'Multiple-meaning words', count: 13 },
        { code: 'P2-FF.3', name: 'Synonyms and antonyms', count: 10 },
        { code: 'P2-FF.4', name: 'Context clues', count: 9 },
        { code: 'P2-FF.5', name: 'Word relationships', count: 8 }
      ],
      english: [
        { code: 'P2-EE.1', name: 'Reading comprehension', count: 12 },
        { code: 'P2-EE.2', name: 'Writing skills', count: 11 },
        { code: 'P2-EE.3', name: 'Grammar basics', count: 9 },
        { code: 'P2-EE.4', name: 'Vocabulary building', count: 8 },
        { code: 'P2-EE.5', name: 'Story elements', count: 7 }
      ],
      science: [
        { code: 'P2-SS.1', name: 'Scientific method', count: 15 },
        { code: 'P2-SS.2', name: 'Life cycles', count: 13 },
        { code: 'P2-SS.3', name: 'Energy forms', count: 11 },
        { code: 'P2-SS.4', name: 'Matter properties', count: 10 },
        { code: 'P2-SS.5', name: 'Ecosystems', count: 9 }
      ]
    },
    goals: {
      practiceTimePerWeek: 5,
      topicsMasteredPerWeek: 5,
      examDate: 'dd/mm/yyyy'
    }
  }
};

// API functions
export const api = {
  // Learning page
  getLearningData: async () => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockData.learning), 500);
    });
  },
  
  // Teacher Engagement
  getTeacherEngagementData: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockData.teacherEngagement), 500);
    });
  },
  
  // Student Analytics
  getStudentAnalyticsData: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockData.studentAnalytics), 500);
    });
  },
  
  // Teacher Analytics
  getTeacherAnalyticsData: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockData.teacherAnalytics), 500);
    });
  },
  
  // Students data
  getStudentsData: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockData.students), 500);
    });
  },
  
  // Dashboard data
  getDashboardData: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockData.dashboard), 500);
    });
  }
};

export default api; 