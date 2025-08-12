'use client';

import { useTranslation } from 'react-i18next';

const StepperComponent = ({ currentStep, onBackClick }) => {
  const { t } = useTranslation();

  const steps = [
    { id: 1, title: 'Upload', subtitle: 'Upload File' },
    { id: 2, title: 'Review', subtitle: 'Review Status' },
    { id: 3, title: 'Confirmation', subtitle: 'Step description' }
  ];

  const BLUE = '#398AC8';
  const GREY = '#B3B3B3';
  const TITLE = '#103358';

  const StepIndicator = ({ step, isActive, isCompleted }) => {
    return (
      <div className="relative flex items-start gap-4">
        {/* 32x32 wrapper */}
        <div
          className="relative"
          style={{ width: 32, height: 32, flex: 'none', order: 0, flexGrow: 0 }}
        >
          {/* Outer */}
          <div
            style={{
              boxSizing: 'border-box',
              position: 'absolute', left: 0, right: 0, top: 0, bottom: 0,
              border: `1px solid ${isActive || isCompleted ? BLUE : GREY}`,
              borderRadius: '50%', background: '#FFFFFF'
            }}
          />
          {/* Inner (active/completed) */}
          {(isActive || isCompleted) && (
            <div
              style={{
                boxSizing: 'border-box',
                position: 'absolute', left: '12.5%', right: '12.5%', top: '12.5%', bottom: '12.5%',
                background: BLUE, border: `1px solid ${BLUE}`, borderRadius: '50%'
              }}
            />
          )}
          {/* Number */}
          {!isCompleted && (
            <span
              style={{
                position: 'absolute',
                width: 16, height: 24, left: 'calc(50% - 8px)', top: 'calc(50% - 12px)',
                fontFamily: 'Lato', fontWeight: 600, fontSize: 16, lineHeight: '24px',
                textAlign: 'center', color: isActive ? '#FCFCFC' : GREY
              }}
            >
              {step.id}
            </span>
          )}
          {/* Check (completed) */}
          <svg
            width="16" height="16" viewBox="0 0 16 16" fill="none"
            style={{
              position: 'absolute',
              visibility: isCompleted ? 'visible' : 'hidden',
              left: 'calc(50% - 8px)', top: 'calc(50% - 8px)'
            }}
          >
            <path d="M13.5 4.5L6 12L2.5 8.5" stroke="#FCFCFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Labels */}
        <div className="flex-1 mt-1">
          <h3 className="text-[16px] font-semibold leading-[24px] font-['Poppins']" style={{ color: currentStep >= step.id ? TITLE : GREY }}>
            {step.title}
          </h3>
          <p className="text-[14px] leading-[20px] font-['Poppins']" style={{ color: currentStep === step.id ? '#6B7280' : GREY }}>
            {step.subtitle}
          </p>
        </div>

        {/* Connector (1.5px) */}
        {step.id < 3 && (
          <div
            style={{
              position: 'absolute', left: 16, top: 32, width: 1.5, height: 64,
              background: currentStep > step.id ? BLUE : GREY, transform: 'translateX(-50%)', borderRadius: 1
            }}
          />
        )}
      </div>
    );
  };

  return (
    <div className="hidden md:block fixed left-0 top-0 h-full w-56 md:w-56 lg:w-64 bg-white z-0 lg:pl-[70px]">
      <div style={{marginTop: '100px'}} className="p-6 pt-8">
        <button 
          onClick={onBackClick}
          className="text-[16px] font-normal text-[#374151] leading-[24px] font-['Poppins'] hover:text-[#103358] mb-8"
        >
          {t('roster.backToStudentList')}
        </button>
        <div className="space-y-8 relative">
          {steps.map((step) => (
            <StepIndicator 
              key={step.id}
              step={step} 
              isActive={currentStep === step.id}
              isCompleted={currentStep > step.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepperComponent;
