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
            <div className="fixed inset-0 z-50 flex items-start justify-center p-4">
                <div className="fixed inset-0 bg-[#1033583b]" onClick={onClose}></div>

                <div className="relative bg-white rounded-[30px] shadow-[0px_0px_8px_2px_rgba(9,161,218,0.1)] w-full max-w-[1100px] max-h-[90vh] overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between gap-4 px-6 sm:px-9 pt-6">
                        <div className="flex items-center gap-3">
                            <h2 className="text-[18px] sm:text-[20px] font-medium text-[#103358] leading-[24px] font-['Poppins']">
                                {student.firstName}, {student.lastName}
                            </h2>
                            <button className="text-[12px] font-medium text-[#398AC8] leading-[20px] font-['Poppins'] flex items-center gap-2">
                                <span>Print Signin Card</span>
                                <img src="/students/print-card.svg" alt="print card" className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="flex items-center gap-5">
                            <div className="flex items-center gap-3">
                                <span className="text-[12px] sm:text-[14px] text-[#374151]">Inactive</span>
                                <button
                                    type="button"
                                    onClick={handleToggle}
                                    className={`relative inline-flex w-10 h-6 rounded-full transition-colors duration-200 ${isActive ? 'bg-[#398AC8]' : 'bg-gray-300'}`}
                                >
                                    <span className={`absolute top-1 left-1 inline-block w-4 h-4 rounded-full bg-white transition-transform duration-200 ${isActive ? 'translate-x-4' : ''}`}></span>
                                </button>
                                <span className="text-[12px] sm:text-[14px] text-[#374151]">Active</span>
                            </div>
                            <button aria-label="Close" onClick={onClose}>
                                <img src="/students/close.svg" alt="close" className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="mt-5 border-t border-[#D9E7EF]" />

                    {/* Content */}
                    <div className="px-6 sm:px-9 py-6 space-y-8">
                        {/* Personal Info */}
                        <section>
                            <div className="flex items-center gap-2 mb-4">
                                <h3 className="text-[16px] sm:text-[18px] font-medium text-[#398AC8] leading-[24px] font-['Poppins']">Personal Info</h3>
                                <img src="/students/edit-icon.svg" alt="edit" className="w-[18px] h-[18px]" />
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 mb-4">
                                <div className="flex flex-col">
                                    <span className="text-[#ABABAB] text-[12px] sm:text-[14px] mb-1">Name</span>
                                    <span className="text-[#374151] text-[12px] sm:text-[14px]">{student.firstName} {student.lastName}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[#ABABAB] text-[12px] sm:text-[14px] mb-1">User ANme</span>
                                    <span className="text-[#374151] text-[12px] sm:text-[14px]">{student.userName}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[#ABABAB] text-[12px] sm:text-[14px] mb-1">Password</span>
                                    <span className="text-[#374151] text-[12px] sm:text-[14px]">{student.password}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[#ABABAB] text-[12px] sm:text-[14px] mb-1">Aptitude Level</span>
                                    <span className="text-[#374151] text-[12px] sm:text-[14px]">{student.aptitudeLevel || '2'}</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 max-w-full sm:max-w-[50%]">
                                <div className="flex flex-col">
                                    <span className="text-[#ABABAB] text-[12px] sm:text-[14px] mb-1">Class</span>
                                    <span className="text-[#374151] text-[12px] sm:text-[14px]">{student.class}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[#ABABAB] text-[12px] sm:text-[14px] mb-1">Grade</span>
                                    <span className="text-[#374151] text-[12px] sm:text-[14px]">{student.grade}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[#ABABAB] text-[12px] sm:text-[14px] mb-1">Email</span>
                                    <span className="text-[#374151] text-[12px] sm:text-[14px] break-all">{student.email}</span>
                                </div>
                            </div>
                        </section>

                        <div className="border-t border-[#D9E7EF]" />

                        {/* Teachers */}
                        <section>
                            <div className="flex items-center gap-2 mb-4">
                                <h3 className="text-[16px] sm:text-[18px] font-medium text-[#398AC8] leading-[24px] font-['Poppins']">Teachers</h3>
                                <img src="/students/edit-icon.svg" alt="edit" className="w-[18px] h-[18px] cursor-pointer" onClick={() => setShowTeacherEdit(true)} />
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {selectedTeachers.map((teacher, index) => (
                                    <span key={index} className="text-[12px] sm:text-[14px] text-[#374151]">{teacher}</span>
                                ))}
                            </div>
                        </section>

                        <div className="border-t border-[#D9E7EF]" />

                        {/* Students/Subjects */}
                        <section>
                            <div className="flex items-center gap-2 mb-4">
                                <h3 className="text-[16px] sm:text-[18px] font-medium text-[#398AC8] leading-[24px] font-['Poppins']">Students</h3>
                                <img src="/students/edit-icon.svg" alt="edit" className="w-[18px] h-[18px] cursor-pointer" onClick={() => setShowSubjectEdit(true)} />
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {selectedSubjects.map((subject, index) => (
                                    <span key={index} className="text-[12px] sm:text-[14px] text-[#374151]">{subject}</span>
                                ))}
                            </div>
                        </section>

                        <div className="border-t border-[#D9E7EF]" />

                        {/* Account history */}
                        <section>
                            <div className="flex items-center gap-2 mb-4">
                                <h3 className="text-[16px] sm:text-[18px] font-medium text-[#398AC8] leading-[24px] font-['Poppins']">Account History</h3>
                                <img src="/students/history-icon.svg" alt="account history" className="w-[18px] h-[18px]" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="flex flex-col">
                                    <span className="text-[#ABABAB] text-[12px] sm:text-[14px] mb-1">Account Created</span>
                                    <span className="text-[#374151] text-[12px] sm:text-[14px]">{student.accountCreated || '20/12/22'}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[#ABABAB] text-[12px] sm:text-[14px] mb-1">Last Updated</span>
                                    <span className="text-[#374151] text-[12px] sm:text-[14px]">{student.lastUpdated || '26/12/22'}</span>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            {/* Teacher Edit Modal */}
            {showTeacherEdit && (
                <div className="fixed inset-0 z-[60] flex items-start justify-center p-4">
                    <div className="fixed inset-0 bg-[#1033583b]" onClick={handleCloseTeacherModal}></div>

                    <div className="relative bg-white rounded-[30px] shadow-[0px_0px_8px_2px_rgba(9,161,218,0.1)] w-full max-w-[848px] max-h-[85vh] overflow-hidden">
                        <div className="flex items-center justify-between px-6 sm:px-9 pt-6">
                            <h2 className="text-[18px] sm:text-[20px] font-medium text-[#103358]">{student.firstName}, {student.lastName}</h2>
                            <button onClick={handleCloseTeacherModal}><img src="/students/close.svg" alt="close" className="w-5 h-5" /></button>
                        </div>
                        <div className="mt-4 border-t border-[#D9E7EF]" />
                        <div className="px-6 sm:px-9 py-6">
                            <h3 className="text-[16px] sm:text-[18px] font-medium text-[#398AC8] mb-3">Teachers</h3>
                            <label className="block text-[12px] sm:text-[14px] text-[#374151] mb-2">Add Teachers</label>
                            <div className="relative mb-6">
                                <input
                                    type="text"
                                    value={teacherSearchTerm}
                                    onChange={(e) => setTeacherSearchTerm(e.target.value)}
                                    placeholder="Search for a teacher by name, user name or email address"
                                    className="w-full h-[40px] pl-11 pr-4 bg-[#EBF3F9] rounded-[40px] text-[13px] sm:text-[15px] text-[#1D1D1D] placeholder-[#BDBDBD]"
                                />
                                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.5 15.5L11.5 11.5M13.1667 7.33333C13.1667 10.555 10.555 13.1667 7.33333 13.1667C4.11167 13.1667 1.5 10.555 1.5 7.33333C1.5 4.11167 4.11167 1.5 7.33333 1.5C10.555 1.5 13.1667 4.11167 13.1667 7.33333Z" stroke="#BDBDBD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                </div>
                            </div>
                            <div className="space-y-3">
                                {filteredTeachers.map((teacher, index) => (
                                    <div key={index} className="flex items-center justify-between py-2">
                                        <span className="text-[12px] sm:text-[14px] text-[#374151]">{teacher}</span>
                                        <button aria-label="remove" onClick={() => handleTeacherChange(teacher)}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 6H5H21" stroke="#FF0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="#FF0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="px-6 sm:px-9 pb-6 flex justify-end gap-3">
                            <button onClick={handleCloseTeacherModal} className="px-4 h-10 bg-white border border-[#16375A] rounded-[8px] text-[#16375A]">Cancel</button>
                            <button onClick={handleCloseTeacherModal} className="px-4 h-10 bg-[#16375A] text-white rounded-[8px]">Submit</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Subject Edit Modal */}
            {showSubjectEdit && (
                <div className="fixed inset-0 z-[60] flex items-start justify-center p-4">
                    <div className="fixed inset-0 bg-[#1033583b]" onClick={handleCloseSubjectModal}></div>

                    <div className="relative bg-white rounded-[30px] shadow-[0px_0px_8px_2px_rgba(9,161,218,0.1)] w-full max-w-[848px] max-h-[85vh] overflow-hidden">
                        <div className="flex items-center justify-between px-6 sm:px-9 pt-6">
                            <h2 className="text-[18px] sm:text-[20px] font-medium text-[#103358]">{student.firstName} {student.lastName}</h2>
                            <button onClick={handleCloseSubjectModal}><img src="/students/close.svg" alt="close" className="w-5 h-5" /></button>
                        </div>
                        <div className="mt-4 border-t border-[#D9E7EF]" />
                        <div className="px-6 sm:px-9 py-6">
                            <h3 className="text-[16px] sm:text-[18px] font-medium text-[#398AC8] mb-3">Subjects</h3>
                            <label className="block text-[12px] sm:text-[14px] text-[#374151] mb-2">Add Subjects</label>
                            <div className="relative mb-6">
                                <input
                                    type="text"
                                    value={subjectSearchTerm}
                                    onChange={(e) => setSubjectSearchTerm(e.target.value)}
                                    placeholder="Search for a Subjects"
                                    className="w-full h-[40px] pl-11 pr-4 bg-[#EBF3F9] rounded-[40px] text-[13px] sm:text-[15px] text-[#1D1D1D] placeholder-[#BDBDBD]"
                                />
                                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.5 15.5L11.5 11.5M13.1667 7.33333C13.1667 10.555 10.555 13.1667 7.33333 13.1667C4.11167 13.1667 1.5 10.555 1.5 7.33333C1.5 4.11167 4.11167 1.5 7.33333 1.5C10.555 1.5 13.1667 4.11167 13.1667 7.33333Z" stroke="#BDBDBD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                </div>
                            </div>
                            <div className="space-y-3">
                                {filteredSubjects.map((subject, index) => (
                                    <div key={index} className="flex items-center justify-between py-2">
                                        <span className="text-[12px] sm:text-[14px] text-[#374151]">{subject}</span>
                                        <button aria-label="remove" onClick={() => handleSubjectChange(subject)}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 6H5H21" stroke="#FF0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="#FF0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="px-6 sm:px-9 pb-6 flex justify-end gap-3">
                            <button onClick={handleCloseSubjectModal} className="px-4 h-10 bg-white border border-[#16375A] rounded-[8px] text-[#16375A]">Cancel</button>
                            <button onClick={handleCloseSubjectModal} className="px-4 h-10 bg-[#16375A] text-white rounded-[8px]">Submit</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default StudentDetailsModal;