'use client';

const DeactivateStudentModal = ({ isOpen, onClose, studentsCount = 165 }) => {
  
  const handleDeactivate = () => {
    // Deactivate students functionality
    console.log(`Deactivating ${studentsCount} students`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-[#1033583b]" onClick={onClose}></div>
      
      <div className="relative bg-white rounded-[29.98px] shadow-[0px_0px_8px_2px_rgba(9,161,218,0.1)] w-full max-w-[741px] h-[250px] mx-auto">
        {/* Close Button */}
        <div className="absolute right-[36px] top-[27px] cursor-pointer" onClick={onClose}>
          <img src="/students/close.svg" alt="close" className="w-[19.55px] h-[19.55px]" />
        </div>

        {/* Header */}
        <div className="absolute left-[36px] top-[39px] w-[400px] h-[24px]">
          <h2 className="text-[20px] font-medium text-[#103358] leading-[24px] font-['Poppins']">
            Deactivate current list of {studentsCount} students
          </h2>
        </div>

        {/* Divider Line */}
        <div className="absolute left-[36px] top-[70px] w-[calc(100%-72px)] h-[1px] border border-[#D9E7EF]"></div>

        {/* Content */}
        <div className="absolute left-[36px] top-[90px] w-[calc(100%-72px)] h-[60px]">
          <p className="text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins']">
            The current list includes {studentsCount} active students, these will be deactivated. Their progress will be saved and you can always reactivate them at a later time. Are you sure you wish to proceed?
          </p>
        </div>

        {/* Buttons */}
        <div className="absolute right-[36px] top-[180px] flex flex-row items-start gap-2">
          <button
            onClick={onClose}
            className="w-[92px] h-[40px] bg-[rgba(12,104,199,0.06)] border border-[#16375A] rounded-[8px] text-[16px] font-normal text-[#16375A] leading-[24px] font-['Poppins'] flex items-center justify-center"
          >
            Cancel
          </button>
          <button
            onClick={handleDeactivate}
            className="w-[164px] h-[40px] bg-[#16375A] text-white rounded-[8px] text-[16px] font-normal leading-[24px] font-['Poppins'] flex items-center justify-center"
          >
            Deactivate Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeactivateStudentModal;