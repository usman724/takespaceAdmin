'use client';
import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';

export default function SetSubjectGoalsModal({ isOpen, onClose, subject, onSave }) {
  const [formData, setFormData] = useState({
    gradeLevel: '',
    examDate: '',
    aptitudeLevel: '',
    desiredScore: ''
  });

  const aptitudeLevelOptions = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'expert', label: 'Expert' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onSave(subject.id, formData);
    onClose();
    // Reset form
    setFormData({
      gradeLevel: '',
      examDate: '',
      aptitudeLevel: '',
      desiredScore: ''
    });
  };

  const handleCancel = () => {
    onClose();
    // Reset form
    setFormData({
      gradeLevel: '',
      examDate: '',
      aptitudeLevel: '',
      desiredScore: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay with exact Figma styling */}
      <div 
        className="fixed inset-0 bg-black"
        style={{ opacity: 0.7 }}
        onClick={handleCancel}
      />
      
      {/* Modal Content - Responsive */}
      <div 
        className="relative bg-white rounded-2xl shadow-xl w-full max-w-[799px] max-h-[90vh] overflow-y-auto"
        style={{
          background: '#FFFFFF',
          boxShadow: '0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)',
          borderRadius: '16px',
          minHeight: '474px'
        }}
      >
        {/* Content Container - Exact margins from Figma */}
        <div 
          className="mx-auto"
          style={{
            width: '100%',
            maxWidth: '670px',
            height: 'auto',
            minHeight: '378px',
            margin: '48px 64px',
            padding: '0'
          }}
        >
          {/* Modal Header */}
          <div className="mb-8">
            <h2 
              className="font-bold text-[#0F172A]"
              style={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: '800',
                fontSize: '30px',
                lineHeight: '40px',
                color: '#0F172A'
              }}
            >
              Set Subject Goals
            </h2>
          </div>

          {/* Form Content */}
          <div className="space-y-6">
            {/* First Row - Responsive Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Current Grade Level */}
              <div className="flex flex-col gap-1">
                <label 
                  className="text-[#0F172A] font-semibold mb-1"
                  style={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '600',
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#0F172A',
                    textTransform: 'capitalize'
                  }}
                >
                  Enter your current subject grade level
                </label>
                <Input
                  type="text"
                  placeholder="Grade Level..."
                  value={formData.gradeLevel}
                  onChange={(e) => handleInputChange('gradeLevel', e.target.value)}
                  className="w-full md:w-[320px] h-12 border-[1.5px] border-[#CBD5E1] rounded-xl text-[#8C94A3] placeholder-[#8C94A3]"
                />
              </div>

              {/* Estimated Exam Date */}
              <div className="flex flex-col gap-1">
                <label 
                  className="text-[#0F172A] font-semibold mb-1"
                  style={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '600',
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#0F172A'
                  }}
                >
                  Estimated Exam Date
                </label>
                <div className="relative">
                  <Input
                    type="date"
                    value={formData.examDate}
                    onChange={(e) => handleInputChange('examDate', e.target.value)}
                    className="w-full md:w-[320px] h-12 px-4 py-3 bg-white border-[1.5px] border-[#CBD5E1] rounded-xl focus:outline-none focus:border-[#398AC8] text-[#8C94A3] placeholder-[#8C94A3] appearance-none"
                    style={{
                      fontSize: '14px',
                      lineHeight: '24px',
                      colorScheme: 'light'
                    }}
                  />
                
                </div>
              </div>
            </div>

            {/* Second Row - Responsive Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Aptitude Level */}
              <div className="flex flex-col gap-1">
                <label 
                  className="text-[#0F172A] font-semibold mb-1"
                  style={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '600',
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#0F172A'
                  }}
                >
                  Aptitude Level
                </label>
                <Select
                  options={aptitudeLevelOptions}
                  value={formData.aptitudeLevel}
                  onChange={(e) => handleInputChange('aptitudeLevel', e.target.value)}
                  placeholder="Level..."
                  className="w-full md:w-[320px] h-12 border-[1.5px] border-[#CBD5E1] rounded-xl text-[#8C94A3]"
                />
              </div>

              {/* Desired Exam Score */}
              <div className="flex flex-col gap-1">
                <label 
                  className="text-[#0F172A] font-semibold mb-1"
                  style={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '600',
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#0F172A'
                  }}
                >
                  Subject Desired Exam Score
                </label>
                <Input
                  type="text"
                  placeholder="Desired Score..."
                  value={formData.desiredScore}
                  onChange={(e) => handleInputChange('desiredScore', e.target.value)}
                  className="w-full md:w-[320px] h-12 border-[1.5px] border-[#CBD5E1] rounded-xl text-[#8C94A3] placeholder-[#8C94A3]"
                />
              </div>
            </div>

            {/* Action Buttons - Responsive */}
            <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 mt-[63px]">
              {/* Cancel Button */}
              <Button
                onClick={handleCancel}
                useCustomClasses={true}
                className="w-full sm:w-auto flex items-center justify-center rounded-xl text-white font-semibold order-2 sm:order-1"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '12px 16px',
                  gap: '8px',
                  width: '155.65px',
                  height: '50px',
                  background: '#D2D2D2',
                  borderRadius: '12px',
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: '600',
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: '#FFFFFF'
                }}
              >
                Cancel
              </Button>

              {/* Save Button */}
              <Button
                onClick={handleSave}
                useCustomClasses={true}
                className="w-full sm:w-auto flex items-center justify-center rounded-xl text-white font-semibold order-1 sm:order-2"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '12px 16px',
                  gap: '8px',
                  width: '155.65px',
                  height: '50px',
                  background: '#103358',
                  borderRadius: '12px',
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: '600',
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: '#FFFFFF'
                }}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}