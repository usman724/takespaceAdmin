import { useTranslation } from 'react-i18next';

const ReviewStep = ({
  issues,
  expandedSection,
  setExpandedSection,
  currentIssue,
  onContinue,
}) => {
  const { t } = useTranslation();

  // Basic derived values with safe fallbacks
  const totalIssues = Array.isArray(issues) ? issues.length : 5;

  const files = [
    { key: 'students', title: 'Setup_templates_rosters.xlsx-Students' },
    { key: 'teachers', title: 'Setup_templates_rosters.xlsx-Teachers' },
  ];

  const toggle = (key) =>
    setExpandedSection(expandedSection === key ? null : key);

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:py-8 sm:px-6 flex items-start sm:items-center justify-center">
      <div className="bg-white rounded-[22px] shadow-lg w-full max-w-6xl">
        <div className="p-4 sm:p-8">
          {/* Header */}
          <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-semibold text-[#16375A] leading-snug font-['Poppins']">
            {t('Review') || 'Review'}
          </h2>
          <p className="mt-1 text-[14px] sm:text-[16px] text-[#6B7280] leading-[22px] sm:leading-[24px] font-['Poppins']">
            {t('There are {{count}} issues to review.', { count: totalIssues }) ||
              `There are ${totalIssues} issues to review.`}{' '}
            {t('See details below') || 'See details below'} {t('or') || 'or'}{' '}
            <a
              href="#"
              className="text-[#398AC8] underline hover:text-[#2b6fa7]"
            >
              {t('download a PDF') || 'download a PDF'}
            </a>{' '}
            {t('of all issues.') || 'of all issues.'}
          </p>

          {/* Accordion list */}
          <div className="mt-6 space-y-3">
            {files.map((f) => {
              const open = expandedSection === f.key;
              return (
                <div key={f.key} className="rounded-[15px] overflow-hidden">
                  <button
                    onClick={() => toggle(f.key)}
                    className="w-full flex items-center gap-3 bg-[#F1F8FF] hover:bg-[#E8F2FD] transition-colors px-5 sm:px-7 py-4"
                  >
                    <span
                      className={`inline-flex items-center justify-center text-[#103358] transition-transform duration-200 ${
                        open ? 'rotate-90' : '-rotate-90'
                      }`}
                      aria-hidden
                    >
                      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                        <path
                          d="M6 8L10 12L14 8"
                          stroke="#103358"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="font-['Poppins'] text-[16px] sm:text-[18px] text-[#103358]">
                      {f.title}
                    </span>
                  </button>

                  {open && (
                    <div className="bg-white border border-[#E5E7EB] rounded-b-[12px] p-4 sm:p-5">
                      {/* Example issue grid; scrolls horizontally on small screens */}
                      <div className="mb-4">
                        <div className="min-w-[640px] grid grid-cols-8 gap-2 text-[11px] sm:text-[12px] font-medium text-[#374151] mb-2">
                          <div>Row #</div>
                          <div>First name</div>
                          <div>Last name</div>
                          <div>Student ID number</div>
                          <div>Year level</div>
                          <div>Student or parent ema...</div>
                          <div>Teacher(s) by ...</div>
                          <div>Custom label (optional)</div>
                        </div>

                        <div className="overflow-auto">
                          <div className="min-w-[640px] grid grid-cols-8 gap-2 text-[11px] sm:text-[12px] p-2 bg-[#FEF3C7] rounded">
                            <div className="flex items-center gap-2">
                              <span>2</span>
                              <div className="w-4 h-4 bg-[#EF4444] rounded flex items-center justify-center text-white text-[10px] font-bold">
                                !
                              </div>
                            </div>
                            <div>John</div>
                            <div>Doe</div>
                            <div>12345</div>
                            <div>10</div>
                            <div>Example: teachr1@lxl.co</div>
                            <div></div>
                            <div></div>
                          </div>
                        </div>
                      </div>

                      {/* Alert */}
                      <div className="bg-[#FEF3C7] p-3 sm:p-4 rounded-lg mb-4">
                        <div className="flex items-start gap-3">
                          <div className="flex items-center justify-center w-6 h-6 bg-[#F59E0B] text-white rounded-full text-xs font-bold">
                            !
                          </div>
                          <div className="flex-1">
                            <p className="text-[13px] sm:text-[14px] font-medium text-[#92400E] mb-1">
                              Error: First name is missing for the student in row
                              2. This student cannot be added or updated.
                            </p>
                            <p className="text-[12px] text-[#92400E]">
                              First name is required for all students.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Controls under accordion content */}
                      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-[13px] sm:text-[14px] text-[#6B7280] font-['Poppins']">
                            Skip all issues of this type
                          </span>
                        </label>

                        <div className="flex items-center gap-2 text-[13px] sm:text-[14px] text-[#6B7280] font-['Poppins']">
                          <span>Issue 1 to 50</span>
                          <div className="flex items-center gap-1">
                            <button className="w-8 h-8 flex items-center justify-center border rounded">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                              >
                                <path d="M10 4L6 8L10 12" />
                              </svg>
                            </button>
                            <span className="px-2 py-1 bg-gray-100 rounded">1</span>
                            <button className="px-2 py-1 text-gray-500">2</button>
                            <button className="px-2 py-1 text-gray-500">3</button>
                            <button className="px-2 py-1 text-gray-500">4</button>
                            <span className="px-2">...</span>
                            <button className="w-8 h-8 flex items-center justify-center border rounded">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                              >
                                <path d="M6 4L10 8L6 12" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={onContinue}
              className="px-5 sm:px-6 py-2.5 sm:py-3 bg-[#16375A] text-white rounded-lg text-[14px] sm:text-[16px] font-medium font-['Poppins'] hover:bg-[#103358] transition-colors"
            >
              {t('Continue') || 'Continue'}
            </button>
          </div>

          {/* Footer */}
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
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;