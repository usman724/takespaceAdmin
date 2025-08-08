'use client';

import { useTranslation } from 'react-i18next';

const ConfirmationStep = ({ onBackToStudentList }) => {
  const { t } = useTranslation();

  return (
    <div className="h-full bg-gray-50 flex items-center justify-center p-8">
      <div className="bg-white rounded-[22px] shadow-lg w-full max-w-6xl h-[90vh] overflow-y-auto relative">
        <div className="flex flex-col items-center justify-center h-full text-center p-8">
          <h2 className="text-[32px] font-semibold text-[#16375A] leading-[48px] font-['Poppins'] mb-8">
            {t('roster.uploadComplete')}
          </h2>
          
          <div className="mb-8">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-green-600">
                <path d="M20 32L10 22L13 19L20 26L35 11L38 14L20 32Z" fill="currentColor"/>
              </svg>
            </div>
            <p className="text-[18px] text-[#6B7280] leading-[28px] font-['Poppins']">
              {t('roster.rosterUploadedSuccessfully')}
            </p>
          </div>

          <button 
            onClick={onBackToStudentList}
            className="px-8 py-3 bg-[#16375A] text-white rounded-lg text-[16px] font-medium font-['Poppins'] hover:bg-[#103358] transition-colors"
          >
            {t('roster.backToStudentList')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationStep;
