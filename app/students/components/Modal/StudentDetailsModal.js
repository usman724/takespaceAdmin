'use client';

import { useState } from 'react';

const StudentDetailsModal = ({ isOpen, onClose, student, teachers = [], subjects = [] }) => {
    const [showTeacherEdit, setShowTeacherEdit] = useState(false);
    const [showSubjectEdit, setShowSubjectEdit] = useState(false);
    const [selectedTeachers, setSelectedTeachers] = useState(student?.teachers?.split(', ') || ['Doctor Alex', 'Annette Black', 'Kathryn Murphy', 'Jerome Bell', 'Savannah Nguyen', 'Jane Cooper']);
    const [selectedSubjects, setSelectedSubjects] = useState(student?.subjects || ['Maths', 'English Language', 'Science']);
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

    const handleCloseTeacherModal = () => {
        setShowTeacherEdit(false);
        setTeacherSearchTerm('');
    };

    const handleCloseSubjectModal = () => {
        setShowSubjectEdit(false);
        setSubjectSearchTerm('');
    };

    if (!isOpen || !student) return null;

    return (
        <>
            {/* Main Student Details Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
                <div className="fixed inset-0 bg-[#1033583b]" onClick={onClose}></div>

                <div className="relative bg-white rounded-[29.98px] shadow-[0px_0px_8px_2px_rgba(9,161,218,0.1)] w-full max-w-[1099px] h-auto min-h-[602px] mx-auto overflow-y-auto">
                    {/* Header Row */}
                    <div className="absolute left-[16px] sm:left-[36px] top-[29px] flex items-center gap-2">
                        <h2 className="text-[16px] sm:text-[20px] font-medium text-[#103358] leading-[24px] font-['Poppins']">
                            {student.firstName}, {student.lastName}
                        </h2>
                    </div>

                    {/* Print Signin Card */}
                    <div className="absolute left-[200px] sm:left-[260px] top-[32px] flex items-center gap-2">
                        <button className="text-[10px] sm:text-[12px] font-medium text-[#398AC8] leading-[24px] font-['Poppins']">
                            Print Signin Card
                        </button>
                        <img src="/students/print-card.svg" alt="print card" className="w-3 h-3 sm:w-4 sm:h-4" />
                    </div>

                    {/* Status Toggle */}
                    <div className="absolute left-[16px] sm:left-[36px] top-[65px] flex items-center gap-4">
                        <span className="text-[12px] sm:text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins']">
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
                                className={`w-8 h-5 sm:w-10 sm:h-6 rounded-full shadow-inner cursor-pointer transition-colors duration-200 ${
                                    isActive ? 'bg-[#398AC8]' : 'bg-gray-300'
                                }`}
                            >
                                <div className={`absolute w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full shadow top-1 transition-transform duration-200 ${
                                    isActive ? 'transform translate-x-4 sm:translate-x-5' : 'left-1'
                                }`}></div>
                            </div>
                        </div>
                        <span className="text-[12px] sm:text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins']">
                            Active
                        </span>
                    </div>

                    {/* Close Button */}
                    <div className="absolute right-[16px] sm:right-[36px] top-[27px] cursor-pointer" onClick={onClose}>
                        <img src="/students/close.svg" alt="close" className="w-[16px] h-[16px] sm:w-[19.55px] sm:h-[19.55px]" />
                    </div>

                    {/* Divider Lines */}
                    <div className="absolute left-[16px] sm:left-[36px] top-[110px] w-[calc(100%-32px)] sm:w-[calc(100%-72px)] h-[1px] border border-[#D9E7EF]"></div>
                    <div className="absolute left-[16px] sm:left-[36px] top-[250px] w-[calc(100%-32px)] sm:w-[calc(100%-72px)] h-[1px] border border-[#D9E7EF]"></div>
                    <div className="absolute left-[16px] sm:left-[36px] top-[350px] w-[calc(100%-32px)] sm:w-[calc(100%-72px)] h-[1px] border border-[#D9E7EF]"></div>
                    <div className="absolute left-[16px] sm:left-[36px] top-[450px] w-[calc(100%-32px)] sm:w-[calc(100%-72px)] h-[1px] border border-[#D9E7EF]"></div>

                    {/* Content Container */}
                    <div className="absolute left-[16px] sm:left-[36px] top-[130px] w-[calc(100%-32px)] sm:w-[calc(100%-72px)]">

                        {/* Personal Info Section */}
                        <div className="mb-[30px] sm:mb-[40px]">
                            <div className="flex items-center gap-2 mb-4">
                                <h3 className="text-[16px] sm:text-[18px] font-medium text-[#398AC8] leading-[24px] font-['Poppins']">
                                    Personal Info
                                </h3>
                                <img src="/students/edit-icon.svg" alt="edit" className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px]" />
                            </div>
                            
                            {/* First Row - 2 columns on mobile, 4 on desktop */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 mb-4">
                                <div className="flex flex-col">
                                    <span className="text-[12px] sm:text-[14px] font-normal text-[#ABABAB] leading-[20px] font-['Poppins'] letter-spacing-[0.25px] mb-1">
                                        Name
                                    </span>
                                    <span className="text-[12px] sm:text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px]">
                                        {student.firstName} {student.lastName}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[12px] sm:text-[14px] font-normal text-[#ABABAB] leading-[20px] font-['Poppins'] letter-spacing-[0.25px] mb-1">
                                        User ANme
                                    </span>
                                    <span className="text-[12px] sm:text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px]">
                                        {student.userName}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[12px] sm:text-[14px] font-normal text-[#ABABAB] leading-[20px] font-['Poppins'] letter-spacing-[0.25px] mb-1">
                                        Password
                                    </span>
                                    <span className="text-[12px] sm:text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px]">
                                        {student.password}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[12px] sm:text-[14px] font-normal text-[#ABABAB] leading-[20px] font-['Poppins'] letter-spacing-[0.25px] mb-1">
                                        Aptitude Level
                                    </span>
                                    <span className="text-[12px] sm:text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px]">
                                        {student.aptitudeLevel || '2'}
                                    </span>
                                </div>
                            </div>
                            
                            {/* Second Row - 3 columns */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 max-w-full sm:max-w-[50%]">
                                <div className="flex flex-col">
                                    <span className="text-[12px] sm:text-[14px] font-normal text-[#ABABAB] leading-[20px] font-['Poppins'] letter-spacing-[0.25px] mb-1">
                                        Class
                                    </span>
                                    <span className="text-[12px] sm:text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px]">
                                        {student.class}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[12px] sm:text-[14px] font-normal text-[#ABABAB] leading-[20px] font-['Poppins'] letter-spacing-[0.25px] mb-1">
                                        Grade
                                    </span>
                                    <span className="text-[12px] sm:text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px]">
                                        {student.grade}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[12px] sm:text-[14px] font-normal text-[#ABABAB] leading-[20px] font-['Poppins'] letter-spacing-[0.25px] mb-1">
                                        Email
                                    </span>
                                    <span className="text-[12px] sm:text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px]">
                                        {student.email}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Teachers Section */}
                        <div className="mb-[30px] sm:mb-[40px]">
                            <div className="flex items-center gap-2 mb-4">
                                <h3 className="text-[16px] sm:text-[18px] font-medium text-[#398AC8] leading-[24px] font-['Poppins']">
                                    Teachers
                                </h3>
                                <img
                                    src="/students/edit-icon.svg"
                                    alt="edit"
                                    className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] cursor-pointer"
                                    onClick={() => setShowTeacherEdit(true)}
                                />
                            </div>
                            <div className="flex flex-wrap gap-2 sm:gap-4">
                                {selectedTeachers.map((teacher, index) => (
                                    <span key={index} className="text-[12px] sm:text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px]">
                                        {teacher}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Students Section */}
                        <div className="mb-[30px] sm:mb-[40px]">
                            <div className="flex items-center gap-2 mb-4">
                                <h3 className="text-[16px] sm:text-[18px] font-medium text-[#398AC8] leading-[24px] font-['Poppins']">
                                    Students
                                </h3>
                                <img 
                                    src="/students/edit-icon.svg" 
                                    alt="edit" 
                                    className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] cursor-pointer"
                                    onClick={() => setShowSubjectEdit(true)}
                                />
                            </div>
                            <div className="flex flex-wrap gap-2 sm:gap-4">
                                {selectedSubjects.map((subject, index) => (
                                    <span key={index} className="text-[12px] sm:text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px]">
                                        {subject}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Account History Section */}
                        <div className="mb-[30px] sm:mb-[40px]">
                            <div className="flex items-center gap-2 mb-4">
                                <h3 className="text-[16px] sm:text-[18px] font-medium text-[#398AC8] leading-[24px] font-['Poppins']">
                                    Account History
                                </h3>
                                <img src="/students/history-icon.svg" alt="account history" className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px]" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                                <div className="flex flex-col">
                                    <span className="text-[12px] sm:text-[14px] font-normal text-[#ABABAB] leading-[20px] font-['Poppins'] letter-spacing-[0.25px] mb-1">
                                        Account Created
                                    </span>
                                    <span className="text-[12px] sm:text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px]">
                                        {student.accountCreated || '20/12/22'}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[12px] sm:text-[14px] font-normal text-[#ABABAB] leading-[20px] font-['Poppins'] letter-spacing-[0.25px] mb-1">
                                        Last Updated
                                    </span>
                                    <span className="text-[12px] sm:text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px]">
                                        {student.lastUpdated || '26/12/22'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Teacher Edit Modal */}
            {showTeacherEdit && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-4">
                    <div className="fixed inset-0 bg-[#1033583b]" onClick={handleCloseTeacherModal}></div>

                    <div className="relative bg-white rounded-[29.98px] shadow-[0px_0px_8px_2px_rgba(9,161,218,0.1)] w-full max-w-[848px] h-auto min-h-[400px] mx-auto overflow-y-auto">
                        {/* Header */}
                        <div className="absolute left-[16px] sm:left-[36px] top-[29px] flex items-center gap-2">
                            <h2 className="text-[16px] sm:text-[20px] font-medium text-[#103358] leading-[24px] font-['Poppins']">
                                {student.firstName}, {student.lastName}
                            </h2>
                        </div>

                        {/* Close Button */}
                        <div className="absolute right-[16px] sm:right-[36px] top-[27px] cursor-pointer" onClick={handleCloseTeacherModal}>
                            <img src="/students/close.svg" alt="close" className="w-[16px] h-[16px] sm:w-[19.55px] sm:h-[19.55px]" />
                        </div>

                        {/* Divider */}
                        <div className="absolute left-[16px] sm:left-[36px] top-[70px] w-[calc(100%-32px)] sm:w-[calc(100%-72px)] h-[1px] border border-[#D9E7EF]"></div>

                        {/* Content */}
                        <div className="absolute left-[16px] sm:left-[36px] top-[84px] w-[calc(100%-32px)] sm:w-[calc(100%-72px)]">
                            <h3 className="text-[16px] sm:text-[18px] font-medium text-[#398AC8] leading-[24px] font-['Poppins'] mb-4">
                                Teachers
                            </h3>
                            <div className="mb-4">
                                <label className="block text-[12px] sm:text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] mb-2">
                                    Add Teachers
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={teacherSearchTerm}
                                        onChange={(e) => setTeacherSearchTerm(e.target.value)}
                                        placeholder="Search for a teacher by name, user name or email address"
                                        className="w-full h-[35px] px-5 py-2 bg-[#EBF3F9] border-0 rounded-[40px] text-[13px] sm:text-[15px] font-light text-[#BDBDBD] leading-[22px] font-['Poppins'] placeholder-[#BDBDBD]"
                                        style={{
                                            background: '#EBF3F9',
                                            borderRadius: '40px',
                                            fontFamily: 'Poppins',
                                            fontStyle: 'normal',
                                            fontWeight: '300',
                                            fontSize: '15px',
                                            lineHeight: '22px',
                                            color: '#BDBDBD'
                                        }}
                                    />
                                    <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.5 15.5L11.5 11.5M13.1667 7.33333C13.1667 10.555 10.555 13.1667 7.33333 13.1667C4.11167 13.1667 1.5 10.555 1.5 7.33333C1.5 4.11167 4.11167 1.5 7.33333 1.5C10.555 1.5 13.1667 4.11167 13.1667 7.33333Z" stroke="#BDBDBD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Current Teachers List */}
                            <div className="mt-8">
                                {selectedTeachers.map((teacher, index) => (
                                    <div key={index} className="flex items-center justify-between py-2">
                                        <span className="text-[12px] sm:text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins']">
                                            {teacher}
                                        </span>
                                        <svg 
                                            width="16" 
                                            height="16" 
                                            viewBox="0 0 24 24" 
                                            fill="none" 
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="cursor-pointer"
                                            onClick={() => handleTeacherChange(teacher)}
                                        >
                                            <path d="M3 6H5H21" stroke="#FF0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="#FF0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="absolute right-[16px] sm:right-[36px] top-[320px] flex gap-2">
                            <button
                                onClick={handleCloseTeacherModal}
                                className="w-[80px] sm:w-[92px] h-[35px] sm:h-[40px] bg-white border border-[#16375A] rounded-[8px] text-[14px] sm:text-[16px] font-normal text-[#16375A] leading-[24px] font-['Poppins'] flex items-center justify-center"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCloseTeacherModal}
                                className="w-[80px] sm:w-[92px] h-[35px] sm:h-[40px] bg-[#16375A] text-white rounded-[8px] text-[14px] sm:text-[16px] font-normal leading-[24px] font-['Poppins'] flex items-center justify-center"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Subject Edit Modal */}
            {showSubjectEdit && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-4">
                    <div className="fixed inset-0 bg-[#1033583b]" onClick={handleCloseSubjectModal}></div>

                    <div className="relative bg-white rounded-[29.98px] shadow-[0px_0px_8px_2px_rgba(9,161,218,0.1)] w-full max-w-[848px] h-auto min-h-[400px] mx-auto overflow-y-auto">
                        {/* Header */}
                        <div className="absolute left-[16px] sm:left-[36px] top-[29px] flex items-center gap-2">
                            <h2 className="text-[16px] sm:text-[20px] font-medium text-[#103358] leading-[24px] font-['Poppins']">
                                {student.firstName} {student.lastName}
                            </h2>
                        </div>

                        {/* Close Button */}
                        <div className="absolute right-[16px] sm:right-[36px] top-[27px] cursor-pointer" onClick={handleCloseSubjectModal}>
                            <img src="/students/close.svg" alt="close" className="w-[16px] h-[16px] sm:w-[19.55px] sm:h-[19.55px]" />
                        </div>

                        {/* Divider */}
                        <div className="absolute left-[16px] sm:left-[36px] top-[70px] w-[calc(100%-32px)] sm:w-[calc(100%-72px)] h-[1px] border border-[#D9E7EF]"></div>

                        {/* Content */}
                        <div className="absolute left-[16px] sm:left-[36px] top-[84px] w-[calc(100%-32px)] sm:w-[calc(100%-72px)]">
                            <h3 className="text-[16px] sm:text-[18px] font-medium text-[#398AC8] leading-[24px] font-['Poppins'] mb-4">
                                Subjects
                            </h3>
                            <div className="mb-4">
                                <label className="block text-[12px] sm:text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] mb-2">
                                    Add Subjects
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={subjectSearchTerm}
                                        onChange={(e) => setSubjectSearchTerm(e.target.value)}
                                        placeholder="Search for a Subjects"
                                        className="w-full h-[35px] px-5 py-2 bg-[#EBF3F9] border-0 rounded-[40px] text-[13px] sm:text-[15px] font-light text-[#BDBDBD] leading-[22px] font-['Poppins'] placeholder-[#BDBDBD]"
                                        style={{
                                            background: '#EBF3F9',
                                            borderRadius: '40px',
                                            fontFamily: 'Poppins',
                                            fontStyle: 'normal',
                                            fontWeight: '300',
                                            fontSize: '15px',
                                            lineHeight: '22px',
                                            color: '#BDBDBD'
                                        }}
                                    />
                                    <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.5 15.5L11.5 11.5M13.1667 7.33333C13.1667 10.555 10.555 13.1667 7.33333 13.1667C4.11167 13.1667 1.5 10.555 1.5 7.33333C1.5 4.11167 4.11167 1.5 7.33333 1.5C10.555 1.5 13.1667 4.11167 13.1667 7.33333Z" stroke="#BDBDBD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Current Subjects List */}
                            <div className="mt-8">
                                {selectedSubjects.map((subject, index) => (
                                    <div key={index} className="flex items-center justify-between py-2">
                                        <span className="text-[12px] sm:text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins']">
                                            {subject}
                                        </span>
                                        <svg 
                                            width="16" 
                                            height="16" 
                                            viewBox="0 0 24 24" 
                                            fill="none" 
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="cursor-pointer"
                                            onClick={() => handleSubjectChange(subject)}
                                        >
                                            <path d="M3 6H5H21" stroke="#FF0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="#FF0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="absolute right-[16px] sm:right-[36px] top-[320px] flex gap-2">
                            <button
                                onClick={handleCloseSubjectModal}
                                className="w-[80px] sm:w-[92px] h-[35px] sm:h-[40px] bg-white border border-[#16375A] rounded-[8px] text-[14px] sm:text-[16px] font-normal text-[#16375A] leading-[24px] font-['Poppins'] flex items-center justify-center"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCloseSubjectModal}
                                className="w-[80px] sm:w-[92px] h-[35px] sm:h-[40px] bg-[#16375A] text-white rounded-[8px] text-[14px] sm:text-[16px] font-normal leading-[24px] font-['Poppins'] flex items-center justify-center"
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