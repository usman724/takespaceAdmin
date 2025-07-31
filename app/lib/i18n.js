import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      learning: 'Learning',
      analytics: 'Analytics',
      students: 'Students',
      teachers: 'Teachers',
      leaderboards: 'Leaderboards',
      account: 'Account',
      searchPlaceholder: 'Search for something',
      
      // Learning Page
      unitsAndTopics: 'Units and Topics',
      fractions: '5.1 Fractions',
      unitsAndTopicsSection: 'Units and Topics',
      
      // Sidebar
      subject: 'Subject',
      grade: 'Grade',
      
      // Teacher Engagement
      teacherEngagement: 'Teacher Engagement',
      studentAnalytics: 'Student Analytics',
      teacherAnalytics: 'Teacher Analytics',
      sortByName: 'Sort by name',
      
      // Filters
      gradeFilter: 'Grade: All Grade',
      subjectFilter: 'SUBJECT: All subjects',
      dateRangeFilter: 'DATE RANGE: Last 30 days',
      teachersFilter: 'TEACHERS: All',
      
      // Student Analytics
      questionAnsweredPerStudent: 'Question Answered Per Student',
      weeklyAverage: 'Weekly Average',
      monthlyAverage: 'Monthly Average',
      goal: 'Goal: 50',
      
      // Teacher Analytics
      homeworkQuestions: 'Homework Questions',
      classroomQuestions: 'Classroom Questions',
      
      // Students Table
      studentCount: '{{count}} Students',
      studentName: 'Student Name',
      teachers: 'Teacher(s)',
      year: 'Year',
      questionsAnswered: 'Questions Answered',
      questionsAnsweredPerWeek: 'Questions Answered perweek',
      timeSpent: 'Time Spent',
      timeSpentPerWeek: 'Time Spent per week',
      seeMore: 'See 100 more',
      total: 'Total',
      average: 'Average',
      
      // Dashboard
      questionHomeworkToClasswork: 'Question: Homework to Classwork',
      timeHomeworkToClasswork: 'Time: Homework to Classwork',
      difficultTopicLeaderboard: 'Difficult Topic Leaderboard',
      mathematics: 'Mathematics',
      english: 'English',
      science: 'Science',
      defaultGoalsTitle: 'Default Goals For The Chosen Grade(s) And Subject(s)',
      practiceTimePerWeek: 'Practice Time Per week, in hours',
      topicsMasteredPerWeek: 'Topics Mastered Per week',
      examDate: 'Exam Date',
      examDatePlaceholder: 'dd/mm/yyyy',
      
      // Footer
      company: 'Company',
      membership: 'Membership',
      blog: 'Blog',
      helpCentre: 'Help centre',
      userGuides: 'User guides',
      tellUsWhatYouThink: 'Tell us what you think',
      testimonials: 'Testimonials',
      careers: 'Careers',
      contactUs: 'Contact us',
      termsOfService: 'Terms of service',
      privacyPolicy: 'Privacy policy',
      copyright: 'TS © 2024 Take Space. All rights reserved.',
      followUs: 'Follow us',
      
      // Login/Signup
      login: 'Login',
      signup: 'Sign Up',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      forgotPassword: 'Forgot Password?',
      dontHaveAccount: "Don't have an account?",
      alreadyHaveAccount: 'Already have an account?',
      signUpHere: 'Sign up here',
      loginHere: 'Login here',
      
      // Common
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      save: 'Save',
      cancel: 'Cancel',
      edit: 'Edit',
      delete: 'Delete',
      refresh: 'Refresh'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 