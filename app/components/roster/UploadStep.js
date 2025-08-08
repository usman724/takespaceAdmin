'use client';

import { useTranslation } from 'react-i18next';

const UploadStep = ({ 
  uploadedFile, 
  uploadProgress, 
  isProcessing, 
  reviewData, 
  selectedAction, 
  onFileSelect, 
  onDragOver, 
  onDrop, 
  onBrowseClick, 
  onActionChange, 
  onContinue, 
  onDownloadTemplate 
}) => {
  const { t } = useTranslation();

  const readableSize = (file) => {
    if (!file) return '';
    const b = file.size || 0;
    if (b < 1024) return `${b} B`;
    if (b < 1024 * 1024) return `${Math.round(b / 1024)} KB`;
    return `${(b / (1024 * 1024)).toFixed(1)} MB`;
  };

  const studentsCount = reviewData?.students?.length ?? 0;
  const teachersCount = reviewData?.teachers?.length ?? 0;

  const showTick = uploadedFile && !isProcessing && uploadProgress === 100;

  return (
    <div className="h-full flex items-center bg-white justify-center p-4 md:p-8">
      <div className="bg-white rounded-[22px] shadow-lg w-full max-w-4xl min-h-[90vh] overflow-y-auto">
        <div className="p-6 md:p-8">
          {/* Heading */}
          <h2 className="font-['Poppins'] text-[18px] leading-[24px] mb-8 text-left" style={{ color: '#103358', fontWeight: 500 }}>
            Upload a roster
          </h2>

          {/* Upload dropzone */}
          <div className="mb-8">
            <div 
              className="w-full h-48 md:h-64 rounded-lg flex flex-col items-center justify-center p-6 md:p-10"
              style={{ borderStyle: 'dashed', borderColor: '#398AC8', borderWidth: '1.5px', background: 'rgba(57, 138, 200, 0.03)' }}
              onDragOver={onDragOver}
              onDrop={onDrop}
            >
              <div className="mb-4 w-14 h-14 md:w-20 md:h-20">
                {showTick ? (
                  <img src="/roster/tick.svg" alt="Upload Complete" className="w-full h-full" />
                ) : (
                  <img src="/roster/upload.svg" alt="Upload" className="w-full h-full" />
                )}
              </div>

              <p className="text-[14px] md:text-[16px] font-semibold text-[#0F0F0F] text-center mb-2">
                Drag & drop files or <button type="button" onClick={onBrowseClick} className="text-[#398AC8] underline">Browse</button>
              </p>

              <p className="text-[11px] md:text-[12px] text-[#676767] text-center px-2">
                Supported formats: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT
              </p>
            </div>
          </div>

          {/* Template CTA */}
          <div className="text-center mt-12 mb-8">
            <h3 className="font-['Poppins'] font-medium text-[24px] md:text-[30px] leading-[32px] md:leading-[45px] text-[#103358] mb-8">
              Use our template to quickly set up your roster file
            </h3>

            <div className="flex justify-center mb-10">
              <button 
                type="button"
                onClick={onDownloadTemplate}
                className="flex items-center justify-center gap-2 px-7 py-4 bg-[#16375A] text-white rounded-[12px] font-['Poppins'] font-medium text-[16px] leading-[24px] hover:bg-[#103358] transition-colors min-w-[200px]"
              >
                <img src="/roster/rostertem.svg" alt="Roster Template" className="w-[30px] h-[30px]" />
                Roster Template
              </button>
            </div>
          </div>

          {/* File details + progress */}
          {uploadedFile && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[14px] font-medium text-[#374151] font-['Poppins'] truncate">
                  {uploadedFile.name}
                </span>
                <span className="text-[14px] text-[#6B7280] font-['Poppins'] ml-2">
                  {readableSize(uploadedFile)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-[#398AC8] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>

              {/* counts */}
              {!isProcessing && reviewData && (
                <div className="mt-4 w-full">
                  <div className="flex items-center justify-between text-[14px]">
                    <span className="text-[#103358]">Students</span>
                    <span className="text-[#C6C2C2]">{studentsCount}</span>
                  </div>
                  <div className="flex items-center justify-between text-[14px]">
                    <span className="text-[#103358]">Teachers</span>
                    <span className="text-[#C6C2C2]">{teachersCount}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action dropdown */}
          {uploadedFile && !isProcessing && reviewData && (
            <div className="mb-8">
              <h4 className="text-[18px] font-medium text-[#103358] mb-4 font-['Poppins']" style={{ width: '580px', height: '24px' }}>
                What would you like to do with these students/teachers?
              </h4>
              
              <div 
                className="relative"
                style={{
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  padding: '5px 0px',
                  gap: '8px',
                  width: '910px',
                  maxWidth: '100%',
                  height: '46px',
                  background: '#FFFFFF',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  boxShadow: '0px 0px 25px rgba(0, 0, 0, 0.05)',
                  borderRadius: '10px 10px 0px 0px'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '8px 16px', gap: '8px', width: '100%', height: '36px' }}>
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 0, gap: '12px', width: '100%', height: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                      <select 
                        value={selectedAction}
                        onChange={onActionChange}
                        className="w-full text-[14px] font-['Poppins']"
                        style={{ fontFamily: 'Poppins', fontWeight: 400, fontSize: '14px', lineHeight: '20px', color: '#4F4F4F', border: 'none', outline: 'none', background: 'transparent' }}
                      >
                        <option value="">Select an option</option>
                        <option value="Add them to my roster">Add them to my roster</option>
                        <option value="Add them to my roster and remove everyone">Add them to my roster and remove everyone</option>
                        <option value="Remove them from my roster">Remove them from my roster</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Primary actions row (like Figma) */}
          <div className="flex justify-end items-center gap-4">
            <button 
              onClick={onContinue}
              disabled={!selectedAction}
              className="px-6 py-3 bg-[#16375A] text-white rounded-lg text-[16px] font-medium font-['Poppins'] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#103358] transition-colors"
            >
              Continue
            </button>
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-[#6B7280] font-['Poppins']">Secure</span>
              <img src="/roster/secure.svg" alt="Secure" className="w-4 h-4" />
              <span className="text-[12px] text-[#6B7280] font-['Poppins']">Server</span>
            </div>
          </div>

          {/* Divider above footer */}
          <div className="border-t border-gray-200 mt-8 pt-6">
              <div className="flex items-center justify-center gap-6">
              <p className="text-[14px] text-[#6B7280] font-['Poppins']">
                For an overview of the upload process:
              </p>
              <div className="flex items-center gap-4">
                <button className="flex items-center justify-center gap-[10px] px-[18px] py-[12px] bg-white border border-[#E0E0E0] rounded-[10px] w-[192px] h-[48px]">
                  <div className="w-[18px] h-[18px]">
                    <img src="/roster/playstore.svg" alt="Video" className="w-full h-full" />
                  </div>
                  <span className="text-[16px] font-normal text-[#103358] font-['Poppins'] leading-[22px]">Video Tutorial</span>
                </button>
                <button className="flex items-center justify-center gap-[10px] px-[18px] py-[12px] bg-white border border-[#E0E0E0] rounded-[10px] w-[192px] h-[48px]">
                  <div className="w-[18px] h-[18px]">
                    <img src="/roster/guide.svg" alt="Guide" className="w-full h-full" />
                  </div>
                  <span className="text-[16px] font-normal text-[#103358] font-['Poppins'] leading-[22px]">Quick Start Guide</span>
                </button>
              </div>
            </div>
          </div>
          {/* end body */}
        </div>
      </div>
    </div>
  );
};

export default UploadStep;
