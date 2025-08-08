// src/lib/i18n.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // --- Navigation ---
      learning: 'Learning',
      analytics: 'Analytics',
      students: 'Students',
      teachers: 'Teachers',
      leaderboards: 'Leaderboards',
      account: 'Account',
      searchPlaceholder: 'Search for something',
      
      // --- Learning Page ---
      unitsAndTopics: 'Units and Topics',
      fractions: '5.1 Fractions',
      unitsAndTopicsSection: 'Units and Topics',
      
      // --- Sidebar ---
      subject: 'Subject',
      grade: 'Grade',
      
      // --- Analytics Page Titles ---
      teacherEngagement: 'Teacher Engagement',
      studentAnalytics: 'Student Analytics',
      teacherAnalytics: 'Teacher Analytics',
      
      // --- Filters ---
      gradeFilterLabel: 'GRADE',
      subjectFilterLabel: 'SUBJECT',
      dateRangeFilterLabel: 'DATE RANGE',
      teachersFilterLabel: 'TEACHERS',
      sortByName: 'Sort by name',
      
      // --- Student Analytics ---
      questionAnsweredPerStudent: 'Question Answered Per Student',
      weeklyAverage: 'Weekly Average',
      monthlyAverage: 'Monthly Average',
      
      // --- Teacher Analytics ---
      homeworkQuestions: 'Homework Questions',
      classroomQuestions: 'Classroom Questions',
      
      // --- Students Table ---
      studentCount: '{{count}} Students',
      studentName: 'Student Name',
      teachersLabel: 'Teacher(s)',
      year: 'Year',
      questionsAnswered: 'Questions Answered',
      questionsAnsweredPerWeek: 'Questions Answered per week',
      timeSpent: 'Time Spent',
      timeSpentPerWeek: 'Time Spent per week',
      seeMore: 'See 100 more',
      total: 'Total',
      average: 'Average',
      
      // --- Dashboard / Teacher Analytics Page ---
      questionHomeworkToClasswork: 'Question: Homework to Classwork',
      timeHomeworkToClasswork: 'Time: Homework to Classwork (hour)',
      difficultTopicLeaderboard: 'Difficult Topic Leaderboard',
      mathematics: 'Mathematics',
      english: 'English',
      science: 'Science',
      defaultGoalsTitle: 'Default Goals For The Chosen Grade(s) And Subject(s)',
      practiceTime: 'Practice Time',
      practiceTimeSub: 'Per week, in hours',
      topicsMastered: 'Topics Mastered',
      topicsMasteredSub: 'Per week',
      examDate: 'Exam Date',
      examDatePlaceholder: 'dd/mm/yyyy',
      goal: 'Goal',

      // --- Footer ---
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
      
      // --- Login/Signup ---
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

       // --- Teachers Page ---
      teachers: 'Teachers',
      addTeacher: 'Add a Teacher',
      filter: 'Filter',
      options: 'Options',
      
      // Table Headers
      teacherName: 'Teacher name',
      email: 'Email',
      totalStudents: 'Total Students',

      // Actions & Modals
      restore: 'Restore',
      teacherRemoved: "{{name}}'s account has been removed",
      resetPassword: 'Reset Password',
      exportList: 'Export Current list of teachers',
      resetPasswordWarning: 'The current list of {{count}} teachers will receive an email with instructions to set a new password',
      resetPasswordForOne: "Click Continue to reset {{name}}'s password. An email with instructions for setting a new password will be sent to {{email}}.",
      continue: 'Continue',
      cancel: 'Cancel',
      save: 'Save',
      submit: 'Submit',
      
      // Add/Edit Teacher Modal
      personalInfo: 'Personal Info',
      firstName: 'First Name',
      lastName: 'Last Name',
      emailAddress: 'Email Address',
      userName: 'User Name',
      subjects: 'Subjects',
      maths: 'Maths',
      englishLanguage: 'English Language',

      // Reset Password Form
      currentPassword: 'Current Password',
      newPassword: 'New Password',
      repeatNewPassword: 'Repeat New Password',
      
      // --- Roster Upload ---
      roster: {
        backToStudentList: 'Back to Student list',
        uploadRoster: 'Upload a roster',
        dragDropFiles: 'Drag & drop files or',
        browse: 'Browse',
        supportedFormats: 'Supported formats: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT',
        processing: 'Processing...',
        students: 'Students',
        teachers: 'Teachers',
        whatWouldYouLikeToDo: 'What would you like to do with these students/teachers?',
        selectOption: 'Select an option',
        addToRoster: 'Add them to my roster',
        addToRosterAndRemove: 'Add them to my roster and remove everyone',
        removeFromRoster: 'Remove them from my roster',
        continue: 'Continue',
        useTemplateText: 'Use our template to quickly set up you roster file',
        rosterTemplate: 'Roster Template',
        forOverviewText: 'For an overview of the upload process:',
        videoTutorial: 'Video Tutorial',
        quickStartGuide: 'Quick Start Guide',
        secure: 'Secure',
        server: 'Server',
        review: 'Review',
        thereAreIssuesToReview: 'There are 5 issues to review. Save See details below or',
        downloadPDF: 'download a PDF',
        ofAllIssues: 'of all issues',
        errorFirstNameMissing: 'Error: First name is missing for the student in row 2. This student cannot be added or updated.',
        firstNameRequired: 'First name is required for all students.',
        skipAllIssuesOfThisType: 'Skip all issues of this type',
        issueRange: 'Issue {{from}} to {{to}}',
        reviewNeeded: 'Review Needed',
        weHaveIdentifiedIssues: "We've identified issues in your student, teacher or admin data.",
        toCorrectIssues: 'To correct issues, please review them here, update your original files and return to the upload page.',
        gotIt: 'Got It',
        uploadComplete: 'Upload Complete!',
        rosterUploadedSuccessfully: 'Your roster has been successfully uploaded and processed.'
      },
      
      // --- Common ---
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
