'use client';

import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import Layout from '../components/layout/Layout';
import I18nProvider from '../components/providers/I18nProvider';
import StepperComponent from '../components/roster/StepperComponent';
import UploadStep from '../components/roster/UploadStep';
import ReviewStep from '../components/roster/ReviewStep';
import ConfirmationStep from '../components/roster/ConfirmationStep';
import ReviewModal from '../components/roster/ReviewModal';
import '../lib/i18n';

const UploadRosterPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const fileInputRef = useRef(null);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [reviewData, setReviewData] = useState(null);
  const [selectedAction, setSelectedAction] = useState('');
  const [issues, setIssues] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const [currentIssue, setCurrentIssue] = useState(1);

  const handleBackToStudentList = () => {
    router.push('/students');
  };

  const handleFileSelect = (file) => {
    setUploadedFile(file);
    setIsProcessing(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsProcessing(false);
          // Mock review data
          setReviewData({
            students: ['Student 1', 'Student 2', 'Student 3'],
            teachers: ['Teacher 1', 'Teacher 2']
          });
        }, 500);
      }
    }, 200);
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) handleFileSelect(files[0]);
  };

  const handleBrowseClick = () => fileInputRef.current?.click();

  const handleActionChange = (e) => setSelectedAction(e.target.value);

  const handleContinueFromUpload = () => {
    if (selectedAction === 'Add them to my roster') {
      setCurrentStep(3); // Skip review if adding to roster
    } else {
      setCurrentStep(2); // Go to review
      setIssues([
        { type: 'missing_first_name', message: 'First name is missing for the student in row 2. This student cannot be added or updated.', detail: 'First name is required for all students.', row: 2, fields: ['First name', 'Last name', 'Student ID number', 'Year level'] },
        { type: 'invalid_email', message: 'Invalid email format for teacher in row 3.', detail: 'Email must be in valid format.', row: 3, fields: ['Email'] },
        { type: 'duplicate_student_id', message: 'Duplicate student ID found in row 5.', detail: 'Student ID must be unique.', row: 5, fields: ['Student ID number'] },
        { type: 'missing_teacher_name', message: 'Teacher name is missing in row 7.', detail: 'Teacher name is required.', row: 7, fields: ['First name', 'Last name'] },
        { type: 'invalid_year_level', message: 'Invalid year level for student in row 9.', detail: 'Year level must be between 1 and 12.', row: 9, fields: ['Year level'] }
      ]);
    }
  };

  const handleContinueFromReview = () => {
    if (issues.length > 0) setShowReviewModal(true);
    else setCurrentStep(3);
  };

  const handleDownloadTemplate = () => {
    console.log('Downloading roster template...');
  };

  const handleCloseReviewModal = () => setShowReviewModal(false);

  return (
    <I18nProvider>
      <Layout>
        <div 
          className="w-screen h-screen relative overflow-hidden" 
          style={{ margin: 0, padding: 0, minHeight: '100vh', minWidth: '100vw' }}
        >
          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            onChange={(e) => {
              const file = e.target.files && e.target.files[0];
              if (file) handleFileSelect(file);
            }}
            className="hidden"
            accept=".jpeg,.jpg,.png,.gif,.mp4,.pdf,.psd,.ai,.doc,.docx,.ppt,.pptx,.xlsx"
          />

          {/* Stepper */}
          <StepperComponent currentStep={currentStep} onBackClick={handleBackToStudentList} />

          {/* Main Stage */}
          <div className="absolute left-64 top-0 right-0 h-full">
            {currentStep === 1 && (
              <UploadStep
                uploadedFile={uploadedFile}
                uploadProgress={uploadProgress}
                isProcessing={isProcessing}
                reviewData={reviewData}
                selectedAction={selectedAction}
                onFileSelect={handleFileSelect}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onBrowseClick={handleBrowseClick}
                onActionChange={handleActionChange}
                onContinue={handleContinueFromUpload}
                onDownloadTemplate={handleDownloadTemplate}
              />
            )}

            {currentStep === 2 && (
              <ReviewStep
                issues={issues}
                expandedSection={expandedSection}
                setExpandedSection={setExpandedSection}
                currentIssue={currentIssue}
                onContinue={handleContinueFromReview}
              />
            )}

            {currentStep === 3 && (
              <ConfirmationStep onBackToStudentList={handleBackToStudentList} />
            )}
          </div>

          {/* Review Modal */}
          <ReviewModal isOpen={showReviewModal} onClose={handleCloseReviewModal} />
        </div>
      </Layout>
    </I18nProvider>
  );
};

export default UploadRosterPage;
