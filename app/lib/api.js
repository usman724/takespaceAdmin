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
const FIXED_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU3ODQzMzIzLCJpYXQiOjE3NTc3NTY5MjMsImp0aSI6IjViODZhMTdjNDdlNzRjOTM5ZGJhMGNjN2UzNjkzNzJmIiwidXNlcl9pZCI6MX0.zi1ElASZUlbBDyVNjNZ2H2Wi22DDYGH1hCA1jpoPwrE';

const apiRequest = async (url, options = {}) => {
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${FIXED_TOKEN}`,
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFTOKEN': 'TB8QUbGYWtbYimRQnA9cgfvnuIUpqRj9UWpN25DrXkPUresdEwZnzVwTcJTvepDy',
      ...options.headers
    },
    ...options
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

// Get subjects (admin students subjects)
const getSubjects = async () => {
  try {
    const data = await apiRequest(`${API_BASE_URL}/admin/students/subjects/`);
    return data;
  } catch (error) {
    console.error('Error fetching subjects:', error);
    throw error;
  }
};

// Get all subjects (general subjects list)
const getAllSubjects = async () => {
  try {
    const data = await apiRequest(`${API_BASE_URL}/subjects/`);
    return data;
  } catch (error) {
    console.error('Error fetching all subjects:', error);
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

// Teacher Engagement (real API)
// filters: { dateRange: '30d'|'7d'|'all_time'|'last_year'|'today'|'yesterday', gradeId?: string|number, subjectId?: string|number }
const getTeacherEngagement = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.dateRange) params.set('date_range', filters.dateRange);
    if (filters.gradeId) params.set('grade', String(filters.gradeId));
    if (filters.subjectId) params.set('subject', String(filters.subjectId));
    const url = `${API_BASE_URL}/admin/teacher-engagement/?${params.toString()}`;
    const data = await apiRequest(url);
    return data;
  } catch (error) {
    console.error('Error fetching teacher engagement:', error);
    throw error;
  }
};

// Student Analytics (real API)
// filters: { avg: 'weekly'|'monthly', dateRange: '30d'|'7d'|'all_time'|'last_year'|'today'|'yesterday', grade?: 'Grade X'|'All Grade', subject?: 'Math'|'Science'|'English'|'Geography'|'All subjects', page?: number }
const getStudentAnalyticsAPI = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    // avg
    params.set('avg', filters.avg === 'monthly' ? 'monthly' : 'weekly');
    // date_range mapping (accept already mapped or UI values)
    if (filters.dateRange) {
      const map = {
        'Last 30 days': '30d',
        'Last 7 days': '7d',
        'Last 90 days': '30d',
        'All time': 'all_time',
        'Last year': 'last_year',
        'Today': 'today',
        'Yesterday': 'yesterday',
        // already API values
        '30d': '30d',
        '7d': '7d',
        'all_time': 'all_time',
        'last_year': 'last_year',
        'today': 'today',
        'yesterday': 'yesterday'
      };
      params.set('date_range', map[filters.dateRange] || '30d');
    } else {
      params.set('date_range', '30d');
    }
    // grade mapping
    if (filters.grade && filters.grade !== 'All Grade' && filters.grade !== 'All grades') {
      const m = String(filters.grade).match(/Grade\s*(\d+)/);
      if (m) params.set('grade', m[1]);
    }
    // subject mapping
    if (filters.subject && filters.subject !== 'All subjects') {
      const subjectMap = { 'Math': '1', 'Science': '2', 'English': '3', 'Geography': '4' };
      if (subjectMap[filters.subject]) params.set('subject', subjectMap[filters.subject]);
    }
    if (filters.page) params.set('page', String(filters.page));

    const url = `${API_BASE_URL}/admin/student-analytics/?${params.toString()}`;
    const data = await apiRequest(url);
    return data;
  } catch (error) {
    console.error('Error fetching student analytics:', error);
    throw error;
  }
};

// Teacher Analytics (specific charts)
const getTeacherAnalyticsData = async () => fetcher(mockData.teacherAnalytics);

// Teacher Analytics API (real API with fixed teacher ID 10)
const getTeacherAnalyticsAPI = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.dateRange) {
      // Map filter values to API expected values
      const dateRangeMap = {
        'Last 30 days': '30d',
        'Last 90 days': '90d',
        'Last 7 days': '7d',
        'All time': 'all_time',
        'Last year': 'last_year',
        'Today': 'today',
        'Yesterday': 'yesterday'
      };
      params.set('date_range', dateRangeMap[filters.dateRange] || '30d');
    }
    if (filters.grade && filters.grade !== 'All grades') {
      // Extract grade number from "Grade X" format
      const gradeMatch = filters.grade.match(/Grade (\d+)/);
      if (gradeMatch) {
        params.set('grade', gradeMatch[1]);
      }
    }
    if (filters.subject && filters.subject !== 'All subjects') {
      // Map subject names to IDs (you may need to adjust these mappings)
      const subjectMap = {
        'Math': '1',
        'Science': '2', 
        'English': '3',
        'Geography': '4'
      };
      if (subjectMap[filters.subject]) {
        params.set('subject', subjectMap[filters.subject]);
      }
    }
    
    const url = `${API_BASE_URL}/admin/teacher-analytics/10/?${params.toString()}`;
    const data = await apiRequest(url);
    return data;
  } catch (error) {
    console.error('Error fetching teacher analytics:', error);
    throw error;
  }
};

// Students data table
const getStudentsData = async () => fetcher(mockData.students);

// Dashboard data (for pie charts, leaderboard, goals)
const getDashboardData = async () => fetcher(mockData.dashboard);

// Update Subject Goals (PATCH)
// filters: { grade: 'Grade 5' | 'All grades', subject: 'Math' | 'All subjects' }
// goals: { practiceTime: number, topicsMastered: number, examDate: string (YYYY-MM-DD), lastGradeTestScore?: number }
const updateSubjectGoals = async (filters = {}, goals = {}) => {
  try {
    const params = new URLSearchParams();

    // Extract grade id
    if (filters.grade && filters.grade !== 'All grades') {
      const gradeMatch = String(filters.grade).match(/Grade (\d+)/);
      if (gradeMatch) {
        params.set('grade', gradeMatch[1]);
      }
    }

    // Map subject to id
    if (filters.subject && filters.subject !== 'All subjects') {
      const subjectMap = {
        'Math': '1',
        'Science': '2',
        'English': '3',
        'Geography': '4'
      };
      if (subjectMap[filters.subject]) {
        params.set('subject', subjectMap[filters.subject]);
      }
    }

    const url = `${API_BASE_URL}/admin/subject-goals/?${params.toString()}`;

    // Build body. Only include provided values.
    const body = {};
    if (goals.practiceTime !== undefined && goals.practiceTime !== null && goals.practiceTime !== '') {
      body.time_practiced_goal_per_week = Number(goals.practiceTime);
    }
    if (goals.topicsMastered !== undefined && goals.topicsMastered !== null && goals.topicsMastered !== '') {
      body.topics_mastered_goal_per_week = Number(goals.topicsMastered);
    }
    if (goals.examDate) {
      body.exam_date = goals.examDate;
    }
    if (goals.lastGradeTestScore !== undefined && goals.lastGradeTestScore !== null && goals.lastGradeTestScore !== '') {
      body.last_grade_test_score = Number(goals.lastGradeTestScore);
    }

    // Send PATCH
    const response = await apiRequest(url, {
      method: 'PATCH',
      body: JSON.stringify(body)
    });

    return response;
  } catch (error) {
    console.error('Error updating subject goals:', error);
    throw error;
  }
};

// Combined function for the Teacher Analytics Page to load all its data
// Uses real API with fallback to mock data
const getTeacherAnalyticsPageData = async (filters = {}) => {
  try {
    // Use real API
    const apiData = await getTeacherAnalyticsAPI(filters);
    
    // Format API response to match expected structure
    const formattedData = {
      homeworkQuestions: {
        labels: apiData.data.homework_questions.labels || [],
        data: apiData.data.homework_questions.data || [],
        average: apiData.data.homework_questions.avg || 0,
        goal: apiData.data.homework_questions.goal || 0
      },
      classroomQuestions: {
        labels: apiData.data.classroom_questions.labels || [],
        data: apiData.data.classroom_questions.data || [],
        average: apiData.data.classroom_questions.avg || 0,
        goal: apiData.data.classroom_questions.goal || 0
      },
      charts: {
        homeworkToClasswork: {
          data: [
            { label: 'Homework', value: apiData.data.homework_to_classwork_questions.homework || 0 },
            { label: 'Classwork', value: apiData.data.homework_to_classwork_questions.classwork || 0 }
          ]
        },
        timeComparison: {
          data: [
            { label: 'Homework', value: apiData.data.homework_to_classwork_time.homework_time || 0 },
            { label: 'Classwork', value: apiData.data.homework_to_classwork_time.classwork_time || 0 }
          ]
        },
        teacherEngagement: {
          percentage: apiData.data.teacher_engagement || 0
        }
      },
      leaderboard: {
        // Format difficult topic leaderboard
        ...apiData.data.difficult_topic_leaderboard.reduce((acc, subject) => {
          const subjectKey = subject.subject_name.toLowerCase();
          acc[subjectKey] = subject.topics.map(topic => ({
            id: topic.code,
            name: topic.name,
            count: topic.student_names.length
          }));
          return acc;
        }, {})
      },
      goals: {
        practiceTime: 5,
        topicsMastered: 5,
        examDate: ''
      }
    };
    
    return formattedData;
  } catch (err) {
    console.error('API Error, falling back to mock data:', err);
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
  getTeacherEngagement,
  getStudentAnalyticsAPI,
  getTeacherAnalyticsData,
  getTeacherAnalyticsAPI, // New real API function
  getStudentsData,
  getDashboardData,
  getTeacherAnalyticsPageData, // Use this for the main page
  getTeachersPageData,
  getStudentsPageData, // New function for students page
  // Real API functions
  getSubjects,
  getAllSubjects,
  getUnits,
  updateSubjectGoals,
  // --- Teachers (real) ---
  async listTeachers({ search = '', subjectIds = [] } = {}) {
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (subjectIds.length) params.set('subjects', subjectIds.join(','));
      const url = `${API_BASE_URL}/admin/teachers/${params.toString() ? `?${params.toString()}` : ''}`;
      const data = await apiRequest(url);
      // API returns an array or an object with data? Normalize to array
      const teachers = Array.isArray(data) ? data : (data.data || []);
      return teachers;
    } catch (error) {
      console.error('Error listing teachers:', error);
      throw error;
    }
  },
  async createTeacher({ firstName, lastName, email, username, subjectIds = [] }) {
    try {
      const body = {
        first_name: firstName,
        last_name: lastName,
        email,
        username,
      };
      if (Array.isArray(subjectIds) && subjectIds.length) {
        body.subject_ids = subjectIds.map(Number);
      }
      const url = `${API_BASE_URL}/admin/teachers/`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${FIXED_TOKEN}`,
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const contentType = response.headers.get('content-type') || '';
      const payload = contentType.includes('application/json') ? await response.json() : null;
      return { ok: response.ok, status: response.status, body: payload };
    } catch (error) {
      console.error('Error creating teacher:', error);
      return { ok: false, status: 0, body: { error: { message: String(error?.message || 'Network error') } } };
    }
  },
  async assignSubjectsToTeacher(teacherId, subjectIds = []) {
    try {
      const url = `${API_BASE_URL}/admin/teachers/${teacherId}/subjects/`;
      const body = { subject_ids: subjectIds.map(Number) };
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${FIXED_TOKEN}`,
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const contentType = response.headers.get('content-type') || '';
      const payload = contentType.includes('application/json') ? await response.json() : null;
      return { ok: response.ok, status: response.status, body: payload };
    } catch (error) {
      console.error('Error assigning subjects to teacher:', error);
      return { ok: false, status: 0, body: { error: { message: String(error?.message || 'Network error') } } };
    }
  },

  // Support Articles API
  async getSupportArticles(page = 1) {
    try {
      const url = `${API_BASE_URL}/support/articles/?page=${page}`;
      const data = await apiRequest(url);
      return data;
    } catch (error) {
      console.error('Error fetching support articles:', error);
      return { data: { count: 0, results: [] }, error: error.message };
    }
  },

  // Support Tickets API
  async createSupportTicket(ticketData) {
    try {
      const url = `${API_BASE_URL}/support/tickets/`;
      
      // Check if there's a file attachment
      if (ticketData.attachment && ticketData.attachment instanceof File) {
        // Use FormData for file uploads
        const formData = new FormData();
        formData.append('full_name', ticketData.full_name);
        formData.append('username', ticketData.username);
        formData.append('email', ticketData.email);
        formData.append('phone', ticketData.phone);
        formData.append('type', ticketData.type);
        formData.append('subject', ticketData.subject);
        formData.append('message', ticketData.message);
        formData.append('attachment', ticketData.attachment);
        
        // For FormData, we need to make a direct fetch call to avoid Content-Type issues
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${FIXED_TOKEN}`,
            'accept': 'application/json',
            'X-CSRFTOKEN': 'TB8QUbGYWtbYimRQnA9cgfvnuIUpqRj9UWpN25DrXkPUresdEwZnzVwTcJTvepDy',
            // Don't set Content-Type for FormData - let browser set it with boundary
          },
          body: formData
        });
        
        if (!response.ok) {
          throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        return data;
      } else {
        // Use JSON for regular requests
        const data = await apiRequest(url, {
          method: 'POST',
          body: JSON.stringify(ticketData),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        return data;
      }
    } catch (error) {
      console.error('Error creating support ticket:', error);
      return { error: { message: String(error?.message || 'Failed to create support ticket') } };
    }
  },

  async getSupportTicket(ticketId) {
    try {
      const url = `${API_BASE_URL}/support/tickets/${ticketId}/`;
      const data = await apiRequest(url);
      return data;
    } catch (error) {
      console.error('Error fetching support ticket:', error);
      return { error: { message: String(error?.message || 'Failed to fetch support ticket') } };
    }
  },

  // Teacher Roster API
  async getTeacherRoster(teacherId) {
    try {
      const url = `${API_BASE_URL}/admin/teachers/${teacherId}/roster/`;
      const data = await apiRequest(url);
      return data;
    } catch (error) {
      console.error('Error fetching teacher roster:', error);
      return { error: { message: String(error?.message || 'Failed to fetch teacher roster') } };
    }
  },

  // Teacher Activate/Deactivate API
  async activateTeacher(teacherId) {
    try {
      const url = `${API_BASE_URL}/admin/teachers/${teacherId}/activate/`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${FIXED_TOKEN}`,
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_active: true }),
      });
      return { ok: response.ok, status: response.status };
    } catch (error) {
      console.error('Error activating teacher:', error);
      return { ok: false, status: 0, error: { message: String(error?.message || 'Network error') } };
    }
  },

  async deactivateTeacher(teacherId) {
    try {
      const url = `${API_BASE_URL}/admin/teachers/${teacherId}/deactivate/`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${FIXED_TOKEN}`,
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_active: false }),
      });
      return { ok: response.ok, status: response.status };
    } catch (error) {
      console.error('Error deactivating teacher:', error);
      return { ok: false, status: 0, error: { message: String(error?.message || 'Network error') } };
    }
  },
};

export default api;