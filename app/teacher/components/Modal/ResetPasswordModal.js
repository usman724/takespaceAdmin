'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ResetPasswordModal = ({ isOpen, onClose, teachersCount = 12, selectedTeacher = null }) => {
    const { t } = useTranslation();
    
    // Modal states: 'confirm', 'password-input', 'final-confirm'
    const [modalStep, setModalStep] = useState('confirm');
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        repeatPassword: ''
    });

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({ ...prev, [name]: value }));
    };

    const handleConfirm = () => {
        setModalStep('password-input');
    };

    const handlePasswordSubmit = () => {
        if (passwordData.newPassword !== passwordData.repeatPassword) {
            alert('New passwords do not match');
            return;
        }
        setModalStep('final-confirm');
    };

    const handleFinalConfirm = () => {
        // Here you would typically make an API call to reset the password
        console.log('Password reset completed');
        onClose();
        setModalStep('confirm');
        setPasswordData({ currentPassword: '', newPassword: '', repeatPassword: '' });
    };

    const handleCancel = () => {
        onClose();
        setModalStep('confirm');
        setPasswordData({ currentPassword: '', newPassword: '', repeatPassword: '' });
    };

    if (!isOpen) return null;

    // First Modal: Confirm Reset for Multiple Teachers
    if (modalStep === 'confirm') {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Background Overlay */}
                <div
                    className="fixed inset-0 bg-[#1033583b]"
                    onClick={handleCancel}
                ></div>

                {/* Modal - Responsive with exact Figma dimensions for larger screens */}
                <div
                    className="relative bg-white rounded-[29.98px] shadow-[0px_0px_8px_2px_rgba(9,161,218,0.1)] w-full max-w-[741px] h-[204px] mx-auto"
                >
                    {/* Header */}
                    <div className="absolute left-[36px] top-[39px] w-[169px] h-[24px]">
                        <h2 className="text-[20px] font-medium text-[#103358] leading-[24px] font-['Poppins']">
                            Resets Password
                        </h2>
                    </div>

                    {/* Divider Line */}
                    <div className="absolute left-[36px] top-[70px] w-[calc(100%-72px)] h-[1px] border border-[#D9E7EF]"></div>

                    {/* Content */}
                    <div className="absolute left-[36px] top-[84px] w-[calc(100%-72px)] h-[20px]">
                        <p className="text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px]">
                            The current list list of {teachersCount} teachers will receive an email with instructions to set a new password.
                        </p>
                    </div>

                    {/* Buttons - Responsive positioning */}
                    <div className="absolute right-[36px] top-[140px] flex flex-row items-start gap-2">
                        <button
                            onClick={handleCancel}
                            className="w-[92px] h-[40px] bg-[rgba(12,104,199,0.06)] border border-[#16375A] rounded-[8px] text-[16px] font-normal text-[#16375A] leading-[24px] font-['Poppins'] flex items-center justify-center letter-spacing-[0.5px]"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirm}
                            className="w-[164px] h-[40px] bg-[#16375A] text-white rounded-[8px] text-[16px] font-normal leading-[24px] font-['Poppins'] flex items-center justify-center letter-spacing-[0.5px]"
                        >
                            Reset Password
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Second Modal: Password Input Fields
    if (modalStep === 'password-input') {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Background Overlay */}
                <div
                    className="fixed inset-0 bg-[#1033583b]"
                    onClick={handleCancel}
                ></div>

                {/* Modal - Responsive with exact Figma dimensions for larger screens */}
                <div
                    className="relative bg-white rounded-[29.98px] shadow-[0px_0px_8px_2px_rgba(9,161,218,0.1)] w-full max-w-[455px] h-[459px] mx-auto"
                >
                    {/* Header */}
                    <div className="absolute left-[37px] top-[36px] w-[169px] h-[24px]">
                        <h2 className="text-[20px] font-medium text-[#103358] leading-[24px] font-['Poppins']">
                            Resets Password
                        </h2>
                    </div>

                    {/* Divider Line */}
                    <div className="absolute left-[39px] top-[70px] w-[calc(100%-78px)] h-[1px] border border-[#D9E7EF]"></div>

                    {/* Password Fields Container */}
                    <div className="absolute left-[37px] top-[87px] w-[calc(100%-74px)] h-[269px] flex flex-col gap-4">
                        {/* Current Password */}
                        <div className="w-full h-[79px] relative">
                            <label className="absolute left-0 top-0 w-[128px] h-[20px] text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px]">
                                Current Password
                            </label>
                            <input
                                type="password"
                                name="currentPassword"
                                value={passwordData.currentPassword}
                                onChange={handlePasswordChange}
                                className="absolute left-0 top-[31px] w-full h-[48px] px-4 py-[14px] bg-white border border-[#103358] rounded-[8px] text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px]"
                                placeholder="********"
                            />
                        </div>

                        {/* New Password */}
                        <div className="w-full h-[79px] relative">
                            <label className="absolute left-0 top-0 w-[108px] h-[20px] text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px]">
                                New Password
                            </label>
                            <input
                                type="password"
                                name="newPassword"
                                value={passwordData.newPassword}
                                onChange={handlePasswordChange}
                                className="absolute left-0 top-[31px] w-full h-[48px] px-4 py-[14px] bg-white border border-[#103358] rounded-[8px] text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px]"
                                placeholder="********"
                            />
                        </div>

                        {/* Repeat New Password */}
                        <div className="w-full h-[79px] relative">
                            <label className="absolute left-0 top-0 w-[164px] h-[20px] text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px]">
                                Repeat New Password
                            </label>
                            <input
                                type="password"
                                name="repeatPassword"
                                value={passwordData.repeatPassword}
                                onChange={handlePasswordChange}
                                className="absolute left-0 top-[31px] w-full h-[48px] px-4 py-[14px] bg-white border border-[#103358] rounded-[8px] text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px]"
                                placeholder="********"
                            />
                        </div>
                    </div>

                    {/* Buttons - Responsive positioning */}
                    <div className="absolute right-[37px] top-[393px] flex flex-row items-start gap-2">
                        <button
                            onClick={handleCancel}
                            className="w-[92px] h-[40px] bg-[rgba(12,104,199,0.06)] border border-[#16375A] rounded-[8px] text-[16px] font-normal text-[#16375A] leading-[24px] font-['Poppins'] flex items-center justify-center letter-spacing-[0.5px]"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handlePasswordSubmit}
                            className="w-[73px] h-[40px] bg-[#16375A] text-white rounded-[8px] text-[16px] font-normal leading-[24px] font-['Poppins'] flex items-center justify-center letter-spacing-[0.5px]"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Third Modal: Final Confirmation
    if (modalStep === 'final-confirm') {
        const teacherName = selectedTeacher?.name || 'Alya Osman';
        const teacherEmail = selectedTeacher?.email || 'alya@5steps.academy';

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Background Overlay */}
                <div
                    className="fixed inset-0 bg-[#1033583b]"
                    onClick={handleCancel}
                ></div>

                {/* Modal - Responsive with exact Figma dimensions for larger screens */}
                <div
                    className="relative bg-white rounded-[29.98px] shadow-[0px_0px_8px_2px_rgba(9,161,218,0.1)] w-full max-w-[741px] h-[204px] mx-auto"
                >
                    {/* Header */}
                    <div className="absolute left-[36px] top-[39px] w-[169px] h-[24px]">
                        <h2 className="text-[20px] font-medium text-[#103358] leading-[24px] font-['Poppins']">
                            Resets Password
                        </h2>
                    </div>

                    {/* Divider Line */}
                    <div className="absolute left-[36px] top-[70px] w-[calc(100%-72px)] h-[1px] border border-[#D9E7EF]"></div>

                    {/* Content */}
                    <div className="absolute left-[36px] top-[84px] w-[calc(100%-72px)] h-[40px]">
                        <p className="text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px]">
                            Click Continue to reset {teacherName}'s password. An email with instructions for setting a new password will be sent to <strong className="text-[#103358]">{teacherEmail}</strong>.
                        </p>
                    </div>

                    {/* Buttons - Responsive positioning */}
                    <div className="absolute right-[36px] top-[140px] flex flex-row items-start gap-2">
                        <button
                            onClick={handleCancel}
                            className="w-[92px] h-[40px] bg-[rgba(12,104,199,0.06)] border border-[#16375A] rounded-[8px] text-[16px] font-normal text-[#16375A] leading-[24px] font-['Poppins'] flex items-center justify-center letter-spacing-[0.5px]"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleFinalConfirm}
                            className="w-[109px] h-[40px] bg-[#16375A] text-white rounded-[8px] text-[16px] font-normal leading-[24px] font-['Poppins'] flex items-center justify-center letter-spacing-[0.5px]"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default ResetPasswordModal; 