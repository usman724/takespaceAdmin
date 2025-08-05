'use client';

import { useTranslation } from 'react-i18next';

const ResetPasswordModal = ({ isOpen, onClose, teachersCount, width = '500px', height = '300px' }) => {
    const { t } = useTranslation();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Background Overlay */}
            <div 
                className="fixed inset-0 bg-[#103358] bg-opacity-40" 
                onClick={onClose}
            ></div>
            
            {/* Modal */}
            <div 
                className="relative bg-white rounded-[29.98px] shadow-[0px_0px_8px_2px_rgba(9,161,218,0.1)]"
                style={{ width, height }}
            >
                {/* Header */}
                <div className="p-8 pb-4">
                    <h2 className="text-[20px] font-medium text-[#103358] leading-[24px] font-['Poppins']">
                        Reset Password
                    </h2>
                </div>

                {/* Divider Line */}
                <div className="w-full h-[1px] bg-[#D9E7EF] mx-8"></div>

                {/* Content */}
                <div className="p-8 pt-4">
                    <p className="text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] mb-8">
                        The current list of {teachersCount} teachers will receive an email with instructions to set a new password.
                    </p>

                    {/* Buttons - Always on the right side */}
                    <div className="flex justify-end gap-2">
                        <button 
                            onClick={onClose}
                            className="w-[92px] h-[40px] bg-[rgba(12,104,199,0.06)] border border-[#16375A] rounded-[8px] text-[16px] font-normal text-[#16375A] leading-[24px] font-['Poppins']"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={onClose}
                            className="w-[92px] h-[40px] bg-[#16375A] text-white rounded-[8px] text-[16px] font-normal leading-[24px] font-['Poppins']"
                        >
                            Reset Password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordModal; 