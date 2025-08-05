'use client';

import { useState } from 'react';

const StudentDetailsModal = ({ isOpen, onClose, student, teachers = [], subjects = [] }) => {
    const [showTeacherEdit, setShowTeacherEdit] = useState(false);
    const [showSubjectEdit, setShowSubjectEdit] = useState(false);
    const [selectedTeachers, setSelectedTeachers] = useState(student?.teachers?.split(', ') || []);
    const [selectedSubjects, setSelectedSubjects] = useState(student?.subjects || []);
    const [teacherSearchTerm, setTeacherSearchTerm] = useState('');
    const [subjectSearchTerm, setSubjectSearchTerm] = useState('');
    const [isActive, setIsActive] = useState(true);

    const handleTeacherChange = (teacher) => {
        setSelectedTeachers(prev => {
            const newTeachers = prev.includes(teacher)
                ? prev.filter(t => t !== teacher)
                : [...prev, teacher];
            return newTeachers;
        });
    };

    const handleSubjectChange = (subject) => {
        setSelectedSubjects(prev => {
            const newSubjects = prev.includes(subject)
                ? prev.filter(s => s !== subject)
                : [...prev, subject];
            return newSubjects;
        });
    };

    const handleToggle = () => {
        setIsActive(!isActive);
    };

    const filteredTeachers = teachers.filter(teacher =>
        teacher.toLowerCase().includes(teacherSearchTerm.toLowerCase())
    );

    const filteredSubjects = subjects.filter(subject =>
        subject.toLowerCase().includes(subjectSearchTerm.toLowerCase())
    );

    if (!isOpen || !student) return null;

    return (
        <>
            {/* Main Student Details Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="fixed inset-0 bg-[#1033583b]" onClick={onClose}></div>

                <div className="relative bg-white rounded-[29.98px] shadow-[0px_0px_8px_2px_rgba(9,161,218,0.1)] w-full max-w-[1099px] h-[602px] mx-auto">
                    {/* Header Row */}
                    <div className="absolute left-[36px] top-[29px] flex items-center gap-2">
                        <h2 className="text-[20px] font-medium text-[#103358] leading-[24px] font-['Poppins']">
                            {student.firstName}, {student.lastName}
                        </h2>
                    </div>

                    {/* Print Signin Card */}
                    <div className="absolute left-[260px] top-[32px] flex items-center gap-2">
                        <button className="text-[12px] font-medium text-[#398AC8] leading-[24px] font-['Poppins']">
                            Print Signin Card
                        </button>
                        <img src="/students/print-card.svg" alt="print card" className="w-4 h-4" />
                    </div>

                    {/* Status Toggle */}
                    <div className="absolute left-[36px] top-[65px] flex items-center gap-4">
                        <span className="text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins']">
                            Inactive
                        </span>
                        <div className="relative">
                            <input 
                                type="checkbox" 
                                checked={isActive}
                                onChange={handleToggle}
                                className="sr-only" 
                            />
                            <div 
                                onClick={handleToggle}
                                className={`w-10 h-6 rounded-full shadow-inner cursor-pointer transition-colors duration-200 ${
                                    isActive ? 'bg-[#398AC8]' : 'bg-gray-300'
                                }`}
                            >
                                <div className={`absolute w-4 h-4 bg-white rounded-full shadow top-1 transition-transform duration-200 ${
                                    isActive ? 'transform translate-x-5' : 'left-1'
                                }`}></div>
                            </div>
                        </div>
                        <span className="text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins']">
                            Active
                        </span>
                    </div>

                    {/* Close Button */}
                    <div className="absolute right-[36px] top-[27px] cursor-pointer" onClick={onClose}>
                        <img src="/students/close.svg" alt="close" className="w-[19.55px] h-[19.55px]" />
                    </div>

                    {/* Divider Lines */}
                    <div className="absolute left-[36px] top-[110px] w-[calc(100%-72px)] h-[1px] border border-[#D9E7EF]"></div>
                    <div className="absolute left-[36px] top-[250px] w-[calc(100%-72px)] h-[1px] border border-[#D9E7EF]"></div>
                    <div className="absolute left-[36px] top-[350px] w-[calc(100%-72px)] h-[1px] border border-[#D9E7EF]"></div>
                    <div className="absolute left-[36px] top-[450px] w-[calc(100%-72px)] h-[1px] border border-[#D9E7EF]"></div>

                    {/* Content Container */}
                    <div className="absolute left-[36px] top-[130px] w-[calc(100%-72px)]">

                        {/* Personal Info Section */}
                        <div className="mb-[40px]">
                            <div className="flex items-center gap-2 mb-4">
                                <h3 className="text-[18px] font-medium text-[#398AC8] leading-[24px] font-['Poppins']">
                                    Personal Info
                                </h3>
                                <img src="/students/edit-icon.svg" alt="edit" className="w-[18px] h-[18px]" />
                            </div>
                            
                            {/* First Row - 4 columns */}
                            <div className="grid grid-cols-4 gap-8 mb-4">
                                <div className="flex flex-col">
                                    <span className="text-[14px] font-normal text-[#ABABAB] leading-[20px] font-['Poppins'] letter-spacing-[0.25px] mb-1">
                                        Name
                                    </span>
                                    <span className="text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px]">
                                        {student.firstName} {student.lastName}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[14px] font-normal text-[#ABABAB] leading-[20px] font-['Poppins'] letter-spacing-[0.25px] mb-1">
                                        User ANme
                                    </span>
                                    <span className="text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px]">
                                        {student.userName}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[14px] font-normal text-[#ABABAB] leading-[20px] font-['Poppins'] letter-spacing-[0.25px] mb-1">
                                        Password
                                    </span>
                                    <span className="text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px]">
                                        {student.password}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[14px] font-normal text-[#ABABAB] leading-[20px] font-['Poppins'] letter-spacing-[0.25px] mb-1">
                                        Aptitude Level
                                    </span>
                                    <span className="text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px]">
                                        {student.aptitudeLevel || '2'}
                                    </span>
                                </div>
                            </div>
                            
                            {/* Second Row - 3 columns */}
                            <div className="grid grid-cols-3 gap-8 max-w-[50%]">
                                <div className="flex flex-col">
                                    <span className="text-[14px] font-normal text-[#ABABAB] leading-[20px] font-['Poppins'] letter-spacing-[0.25px] mb-1">
                                        Class
                                    </span>
                                    <span className="text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px]">
                                        {student.class}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[14px] font-normal text-[#ABABAB] leading-[20px] font-['Poppins'] letter-spacing-[0.25px] mb-1">
                                        Grade
                                    </span>
                                    <span className="text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px]">
                                        {student.grade}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[14px] font-normal text-[#ABABAB] leading-[20px] font-['Poppins'] letter-spacing-[0.25px] mb-1">
                                        Email
                                    </span>
                                    <span className="text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px]">
                                        {student.email}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Teachers Section */}
                        <div className="mb-[40px]">
                            <div className="flex items-center gap-2 mb-4">
                                <h3 className="text-[18px] font-medium text-[#398AC8] leading-[24px] font-['Poppins']">
                                    Teachers
                                </h3>
                                <img
                                    src="/students/edit-icon.svg"
                                    alt="edit"
                                    className="w-[18px] h-[18px] cursor-pointer"
                                    onClick={() => setShowTeacherEdit(true)}
                                />
                            </div>
                            <div className="flex flex-wrap gap-4">
                                {selectedTeachers.map((teacher, index) => (
                                    <span key={index} className="text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px]">
                                        {teacher}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Students Section */}
                        <div className="mb-[40px]">
                            <div className="flex items-center gap-2 mb-4">
                                <h3 className="text-[18px] font-medium text-[#398AC8] leading-[24px] font-['Poppins']">
                                    Students
                                </h3>
                                <img src="/students/students-icons.svg" alt="students" className="w-[13px] h-[14px]" />
                            </div>
                            <div className="flex flex-wrap gap-4">
                                {Array.isArray(student.subjects) ? student.subjects.map((subject, index) => (
                                    <span key={index} className="text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px]">
                                        {subject}
                                    </span>
                                )) : (
                                    <span className="text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px]">
                                        {student.subjects}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Account History Section */}
                        <div className="mb-[40px]">
                            <div className="flex items-center gap-2 mb-4">
                                <h3 className="text-[18px] font-medium text-[#398AC8] leading-[24px] font-['Poppins']">
                                    Account History
                                </h3>
                                <img src="/students/history-icon.svg" alt="account history" className="w-[18px] h-[18px]" />
                            </div>
                            <div className="grid grid-cols-2 gap-8">
                                <div className="flex flex-col">
                                    <span className="text-[14px] font-normal text-[#ABABAB] leading-[20px] font-['Poppins'] letter-spacing-[0.25px] mb-1">
                                        Account Created
                                    </span>
                                    <span className="text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px]">
                                        {student.accountCreated || '20/12/22'}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[14px] font-normal text-[#ABABAB] leading-[20px] font-['Poppins'] letter-spacing-[0.25px] mb-1">
                                        Last Updated
                                    </span>
                                    <span className="text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px]">
                                        {student.lastUpdated || '26/12/22'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Teacher Edit Modal - Same as before */}
            {showTeacherEdit && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-[#1033583b]" onClick={() => setShowTeacherEdit(false)}></div>

                    <div className="relative bg-white rounded-[29.98px] shadow-[0px_0px_8px_2px_rgba(9,161,218,0.1)] w-full max-w-[848px] h-[400px] mx-auto">
                        {/* Header */}
                        <div className="absolute left-[36px] top-[29px] flex items-center gap-2">
                            <h2 className="text-[20px] font-medium text-[#103358] leading-[24px] font-['Poppins']">
                                {student.firstName}, {student.lastName}
                            </h2>
                        </div>

                        {/* Close Button */}
                        <div className="absolute right-[36px] top-[27px] cursor-pointer" onClick={() => setShowTeacherEdit(false)}>
                            <img src="/students/close.svg" alt="close" className="w-[19.55px] h-[19.55px]" />
                        </div>

                        {/* Divider */}
                        <div className="absolute left-[36px] top-[70px] w-[calc(100%-72px)] h-[1px] border border-[#D9E7EF]"></div>

                        {/* Content */}
                        <div className="absolute left-[36px] top-[84px] w-[calc(100%-72px)]">
                            <h3 className="text-[18px] font-medium text-[#398AC8] leading-[24px] font-['Poppins'] mb-4">
                                Teachers
                            </h3>
                            <div className="mb-4">
                                <label className="block text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] mb-2">
                                    Add Teachers
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={teacherSearchTerm}
                                        onChange={(e) => setTeacherSearchTerm(e.target.value)}
                                        placeholder="Search for a teacher by name, user name or email address"
                                        className="w-full h-[48px] px-4 py-[14px] bg-white border border-[#103358] rounded-[8px] text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins']"
                                    />
                                    <img src="/students/search.svg" alt="search" className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4" />
                                </div>
                            </div>

                            {/* Teacher List */}
                            <div className="max-h-[150px] overflow-y-auto">
                                {filteredTeachers.map((teacher, index) => (
                                    <div key={index} className="flex items-center gap-3 py-2">
                                        <img src="/students/teacher-icon.svg" alt="teacher" className="w-4 h-4" />
                                        <span className="text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins']">
                                            {teacher}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="absolute right-[36px] top-[320px] flex gap-2">
                            <button
                                onClick={() => setShowTeacherEdit(false)}
                                className="w-[92px] h-[40px] bg-[rgba(12,104,199,0.06)] border border-[#16375A] rounded-[8px] text-[16px] font-normal text-[#16375A] leading-[24px] font-['Poppins'] flex items-center justify-center"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setShowTeacherEdit(false)}
                                className="w-[92px] h-[40px] bg-[#16375A] text-white rounded-[8px] text-[16px] font-normal leading-[24px] font-['Poppins'] flex items-center justify-center"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Subject Edit Modal - Same as before */}
            {showSubjectEdit && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-[#1033583b]" onClick={() => setShowSubjectEdit(false)}></div>

                    <div className="relative bg-white rounded-[29.98px] shadow-[0px_0px_8px_2px_rgba(9,161,218,0.1)] w-full max-w-[848px] h-[400px] mx-auto">
                        {/* Header */}
                        <div className="absolute left-[36px] top-[29px] flex items-center gap-2">
                            <h2 className="text-[20px] font-medium text-[#103358] leading-[24px] font-['Poppins']">
                                {student.firstName} {student.lastName}
                            </h2>
                        </div>

                        {/* Close Button */}
                        <div className="absolute right-[36px] top-[27px] cursor-pointer" onClick={() => setShowSubjectEdit(false)}>
                            <img src="/students/close.svg" alt="close" className="w-[19.55px] h-[19.55px]" />
                        </div>

                        {/* Divider */}
                        <div className="absolute left-[36px] top-[70px] w-[calc(100%-72px)] h-[1px] border border-[#D9E7EF]"></div>

                        {/* Content */}
                        <div className="absolute left-[36px] top-[84px] w-[calc(100%-72px)]">
                            <h3 className="text-[18px] font-medium text-[#398AC8] leading-[24px] font-['Poppins'] mb-4">
                                Subjects
                            </h3>
                            <div className="mb-4">
                                <label className="block text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] mb-2">
                                    Add Subjects
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={subjectSearchTerm}
                                        onChange={(e) => setSubjectSearchTerm(e.target.value)}
                                        placeholder="Search for a Subjects"
                                        className="w-full h-[48px] px-4 py-[14px] bg-white border border-[#103358] rounded-[8px] text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins']"
                                    />
                                    <img src="/students/search-icon.svg" alt="search" className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4" />
                                </div>
                            </div>

                            {/* Subject List */}
                            <div className="flex flex-wrap gap-4">
                                {['Maths', 'English', 'Science'].map(subject => (
                                    <div key={subject} className="flex items-center gap-3">
                                        <div className="relative">
                                            <input
                                                type="checkbox"
                                                id={subject}
                                                checked={selectedSubjects.includes(subject)}
                                                onChange={() => handleSubjectChange(subject)}
                                                className="w-[22px] h-[22px] bg-white border border-[#103358] rounded-[3px] checked:bg-[#103358] checked:border-[#103358] appearance-none relative cursor-pointer"
                                            />
                                            {selectedSubjects.includes(subject) && (
                                                <svg
                                                    className="absolute top-0 left-0 w-[22px] h-[22px] pointer-events-none"
                                                    viewBox="0 0 22 22"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M6 11L9 14L16 7"
                                                        stroke="white"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            )}
                                        </div>
                                        <label
                                            htmlFor={subject}
                                            className="text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] cursor-pointer"
                                        >
                                            {subject}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="absolute right-[36px] top-[320px] flex gap-2">
                            <button
                                onClick={() => setShowSubjectEdit(false)}
                                className="w-[92px] h-[40px] bg-[rgba(12,104,199,0.06)] border border-[#16375A] rounded-[8px] text-[16px] font-normal text-[#16375A] leading-[24px] font-['Poppins'] flex items-center justify-center"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setShowSubjectEdit(false)}
                                className="w-[92px] h-[40px] bg-[#16375A] text-white rounded-[8px] text-[16px] font-normal leading-[24px] font-['Poppins'] flex items-center justify-center"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default StudentDetailsModal;