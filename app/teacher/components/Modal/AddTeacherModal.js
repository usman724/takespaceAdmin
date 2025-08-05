'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const AddTeacherModal = ({ isOpen, onClose, onSubmit, subjects, width = '848px', height = '479px' }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ 
        firstName: '', 
        lastName: '', 
        email: '', 
        userName: '', 
        subjects: [] 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubjectChange = (subject) => {
        setFormData(prev => {
            const newSubjects = prev.subjects.includes(subject)
                ? prev.subjects.filter(s => s !== subject)
                : [...prev.subjects, subject];
            return { ...prev, subjects: newSubjects };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Background Overlay */}
            <div 
                className="fixed inset-0 bg-[#1033583b] " 
                onClick={onClose}
            ></div>
            
            {/* Modal */}
            <div 
                className="relative bg-white rounded-[29.98px] shadow-[0px_0px_8px_2px_rgba(9,161,218,0.1)]"
                style={{ width, height }}
            >
                {/* Header */}
                <div className="flex items-center gap-4 p-8 pb-4">
                    <svg width="17" height="19.43" viewBox="0 0 24 24" fill="currentColor" className="text-[#103358]">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                    <h2 className="text-[20px] font-medium text-[#103358] leading-[24px] font-['Poppins']">
                        Add a teacher
                    </h2>
                </div>

                {/* Divider Line */}
                <div className="w-full h-[1px] bg-[#D9E7EF] mx-8"></div>

                <form onSubmit={handleSubmit} className="p-8 pt-4">
                    {/* Personal Info Section */}
                    <div className="mb-6">
                        <h3 className="text-[18px] font-medium text-[#398AC8] leading-[24px] font-['Poppins'] mb-4">
                            Personal Info
                        </h3>
                        
                        {/* First Row */}
                        <div className="flex gap-4 mb-4">
                            <div className="flex-1">
                                <label className="block text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] mb-2">
                                    First Name
                                </label>
                                <input 
                                    type="text" 
                                    name="firstName" 
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full h-[48px] px-4 py-[14px] bg-white border border-[#103358] rounded-[8px] text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins']"
                                    placeholder="Alya"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] mb-2">
                                    Last Name
                                </label>
                                <input 
                                    type="text" 
                                    name="lastName" 
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full h-[48px] px-4 py-[14px] bg-white border border-[#103358] rounded-[8px] text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins']"
                                    placeholder="Osamn"
                                />
                            </div>
                        </div>

                        {/* Second Row */}
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] mb-2">
                                    Email Address
                                </label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full h-[48px] px-4 py-[14px] bg-white border border-[#103358] rounded-[8px] text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins']"
                                    placeholder="alya@5steps.academy"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] mb-2">
                                    User Name
                                </label>
                                <input 
                                    type="text" 
                                    name="userName" 
                                    value={formData.userName}
                                    onChange={handleChange}
                                    className="w-full h-[48px] px-4 py-[14px] bg-white border border-[#103358] rounded-[8px] text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins']"
                                    placeholder="Alya"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Subjects Section */}
                    <div>
                        <h3 className="text-[18px] font-medium text-[#398AC8] leading-[24px] font-['Poppins'] mb-4">
                            Subjects
                        </h3>
                        <div className="flex gap-5">
                            {subjects.map(subject => (
                                <div key={subject} className="flex items-center gap-3">
                                    <input 
                                        type="checkbox" 
                                        id={subject} 
                                        checked={formData.subjects.includes(subject)}
                                        onChange={() => handleSubjectChange(subject)}
                                        className="w-[22px] h-[22px] bg-white border border-[#103358] rounded-[3px] checked:bg-[#16375A] checked:border-[#16375A] appearance-none relative"
                                    />
                                    <label 
                                        htmlFor={subject} 
                                        className="text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins']"
                                    >
                                        {subject}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Buttons - Always on the right side */}
                    <div className="flex justify-end gap-2 mt-8">
                        <button 
                            type="button" 
                            onClick={onClose}
                            className="w-[92px] h-[40px] bg-[rgba(12,104,199,0.06)] border border-[#16375A] rounded-[8px] text-[16px] font-normal text-[#16375A] leading-[24px] font-['Poppins']"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            className="w-[92px] h-[40px] bg-[#16375A] text-white rounded-[8px] text-[16px] font-normal leading-[24px] font-['Poppins']"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTeacherModal; 