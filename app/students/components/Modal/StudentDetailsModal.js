'use client';

import api from '@/app/lib/api';
import { useState, useEffect } from 'react';
import { Plus, Check } from 'lucide-react';

const StudentDetailsModal = ({ isOpen, onClose, student, teachers = [], subjects = [] }) => {
    const [showTeacherEdit, setShowTeacherEdit] = useState(false);
    const [showSubjectEdit, setShowSubjectEdit] = useState(false);
    const [selectedTeachers, setSelectedTeachers] = useState([]);
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [availableTeachers, setAvailableTeachers] = useState([]);
    const [availableSubjects, setAvailableSubjects] = useState([]);
    const [teacherSearchTerm, setTeacherSearchTerm] = useState('');
    const [subjectSearchTerm, setSubjectSearchTerm] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [loading, setLoading] = useState(false);

    // Load student data and fetch available teachers/subjects when modal opens
    useEffect(() => {
        if (isOpen && student) {
            const fetchData = async () => {
                try {
                    setLoading(true);
                    
                    // Use student data from the list (already available)
                    setIsActive(student.is_active ?? true);
                    
                    // Set selected teachers and subjects from student data (from students list API)
                    const selectedTeachers = Array.isArray(student.teachers) 
                        ? student.teachers.map((teacherName, index) => ({
                            id: index,
                            name: teacherName
                        }))
                        : [];

                    const selectedSubjects = Array.isArray(student.subjects) 
                        ? student.subjects.map((subjectName, index) => ({
                            id: index,
                            name: subjectName
                        }))
                        : [];

                    setSelectedTeachers(selectedTeachers);
                    setSelectedSubjects(selectedSubjects);

                    // Fetch available teachers and subjects for editing
                    const [teachersResponse, subjectsResponse] = await Promise.all([
                        api.listTeachers(),
                        api.getSubjects()
                    ]);

                    // Transform teachers data for available teachers
                    const availableTeachers = teachersResponse.map(teacher => ({
                        id: teacher.id,
                        name: `${teacher.first_name || ''} ${teacher.last_name || ''}`.trim() || teacher.full_name || teacher.name || 'Unknown Teacher',
                        email: teacher.email || ''
                    }));

                    // Transform subjects data
                    const availableSubjects = subjectsResponse.data?.map(subject => ({
                        id: subject.id,
                        name: subject.name || subject.title || 'Unknown Subject'
                    })) || [];

                    setAvailableTeachers(availableTeachers);
                    setAvailableSubjects(availableSubjects);
                } catch (error) {
                    console.error('Error fetching available teachers and subjects:', error);
                    // Fallback to props if API fails
                    setAvailableTeachers(teachers.map((name, index) => ({ id: index, name, email: '' })));
                    setAvailableSubjects(subjects.map((name, index) => ({ id: index, name })));
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
        }
    }, [isOpen, student, teachers, subjects]);

    const handleTeacherChange = (teacher) => {
        setSelectedTeachers(prev => {
            const isSelected = prev.find(t => t.name === teacher.name);
            if (isSelected) {
                // Remove teacher
                return prev.filter(t => t.name !== teacher.name);
            } else {
                // Add teacher
                return [...prev, teacher];
            }
        });
    };

    const handleSubjectChange = (subject) => {
        setSelectedSubjects(prev => {
            const isSelected = prev.find(s => s.name === subject.name);
            if (isSelected) {
                // Remove subject
                return prev.filter(s => s.name !== subject.name);
            } else {
                // Add subject
                return [...prev, subject];
            }
        });
    };

    const handleToggle = async () => {
        try {
            const newStatus = !isActive;
            const result = await api.toggleStudentStatus(student.id, newStatus);
            
            if (result.ok) {
                setIsActive(newStatus);
            } else {
                console.error('Failed to toggle student status:', result.error);
                // You might want to show a toast notification here
            }
        } catch (error) {
            console.error('Error toggling student status:', error);
            // You might want to show a toast notification here
        }
    };

    const filteredTeachers = availableTeachers.filter(teacher =>
        teacher.name.toLowerCase().includes(teacherSearchTerm.toLowerCase())
    );

    const filteredSubjects = availableSubjects.filter(subject =>
        subject.name.toLowerCase().includes(subjectSearchTerm.toLowerCase())
    );

    const handleSaveTeachers = async () => {
        try {
            // Find teacher IDs from available teachers list
            const teacherIds = selectedTeachers.map(selectedTeacher => {
                const availableTeacher = availableTeachers.find(teacher => teacher.name === selectedTeacher.name);
                return availableTeacher ? availableTeacher.id : null;
            }).filter(id => id !== null);
            
            const result = await api.addTeachersToStudent(student.id, teacherIds);
            
            if (result.ok) {
                setShowTeacherEdit(false);
                setTeacherSearchTerm('');
                // Update the student object in parent component if needed
                // This would require a callback to parent component
            } else {
                console.error('Failed to save teachers:', result.error);
                // You might want to show a toast notification here
            }
        } catch (error) {
            console.error('Error saving teachers:', error);
            // You might want to show a toast notification here
        }
    };

    const handleSaveSubjects = async () => {
        try {
            // Find subject IDs from available subjects list
            const subjectIds = selectedSubjects.map(selectedSubject => {
                const availableSubject = availableSubjects.find(subject => subject.name === selectedSubject.name);
                return availableSubject ? availableSubject.id : null;
            }).filter(id => id !== null);
            
            const result = await api.addSubjectsToStudent(student.id, subjectIds);
            
            if (result.ok) {
                setShowSubjectEdit(false);
                setSubjectSearchTerm('');
                // Update the student object in parent component if needed
                // This would require a callback to parent component
            } else {
                console.error('Failed to save subjects:', result.error);
                // You might want to show a toast notification here
            }
        } catch (error) {
            console.error('Error saving subjects:', error);
            // You might want to show a toast notification here
        }
    };

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
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="fixed inset-0 bg-[#1033583b]" onClick={onClose}></div>

                <div className="relative bg-white rounded-[30px] shadow-[0px_0px_8px_2px_rgba(9,161,218,0.1)] w-full max-w-[1100px] max-h-[90vh] flex flex-col overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between gap-4 px-4 sm:px-6 pt-4 sm:pt-6 flex-shrink-0">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <h2 className="text-[16px] sm:text-[18px] font-medium text-[#103358] leading-[24px] font-['Poppins']">
                                {student.firstName}, {student.lastName}
                            </h2>
                            <button className="text-[10px] sm:text-[12px] font-medium text-[#398AC8] leading-[20px] font-['Poppins'] flex items-center gap-1 sm:gap-2">
                                <span className="hidden sm:inline">Print Signin Card</span>
                                <span className="sm:hidden">Print</span>
                                <img src="/students/print-card.svg" alt="print card" className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>
                        </div>
                        <div className="flex items-center gap-3 sm:gap-5">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <span className="text-[10px] sm:text-[12px] text-[#374151]">Inactive</span>
                                <button
                                    type="button"
                                    onClick={handleToggle}
                                    className={`relative inline-flex w-8 h-5 sm:w-10 sm:h-6 rounded-full transition-colors duration-200 ${isActive ? 'bg-[#398AC8]' : 'bg-gray-300'}`}
                                >
                                    <span className={`absolute top-0.5 left-0.5 sm:top-1 sm:left-1 inline-block w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white transition-transform duration-200 ${isActive ? 'translate-x-3 sm:translate-x-4' : ''}`}></span>
                                </button>
                                <span className="text-[10px] sm:text-[12px] text-[#374151]">Active</span>
                            </div>
                            <button aria-label="Close" onClick={onClose}>
                                <img src="/students/close.svg" alt="close" className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="mt-4 border-t border-[#D9E7EF] flex-shrink-0" />

                    {/* Content */}
                    <div className="px-4 sm:px-6 py-4 sm:py-6 flex-1 overflow-y-auto space-y-4 sm:space-y-6">
                        {loading && (
                            <div className="flex justify-center items-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#103358]"></div>
                                <span className="ml-2 text-[#103358]">Loading student details...</span>
                            </div>
                        )}
                        {!loading && (
                            <>
                            {/* Personal Info */}
                            <section>
                                <div className="flex items-center gap-2 mb-3">
                                    <h3 className="text-[14px] sm:text-[16px] font-medium text-[#398AC8] leading-[24px] font-['Poppins']">Personal Info</h3>
                                    <img src="/students/edit-icon.svg" alt="edit" className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px]" />
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                                    <div className="flex flex-col">
                                        <span className="text-[#ABABAB] text-[10px] sm:text-[11px] mb-1">Name</span>
                                        <span className="text-[#374151] text-[10px] sm:text-[11px] break-words leading-tight">{student.firstName} {student.lastName}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[#ABABAB] text-[10px] sm:text-[11px] mb-1">User Name</span>
                                        <span className="text-[#374151] text-[10px] sm:text-[11px] break-words leading-tight">{student.userName}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[#ABABAB] text-[10px] sm:text-[11px] mb-1">Aptitude Level</span>
                                        <span className="text-[#374151] text-[10px] sm:text-[11px] leading-tight">{student.aptitudeLevel || '2'}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[#ABABAB] text-[10px] sm:text-[11px] mb-1">Class</span>
                                        <span className="text-[#374151] text-[10px] sm:text-[11px] leading-tight">{student.class}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[#ABABAB] text-[10px] sm:text-[11px] mb-1">Grade</span>
                                        <span className="text-[#374151] text-[10px] sm:text-[11px] leading-tight">{student.grade}</span>
                                    </div>
                                    <div className="flex flex-col col-span-2 sm:col-span-1">
                                        <span className="text-[#ABABAB] text-[10px] sm:text-[11px] mb-1">Email</span>
                                        <span className="text-[#374151] text-[10px] sm:text-[11px] break-all leading-tight">{student.email}</span>
                                    </div>
                                </div>
                            </section>

                        <div className="border-t border-[#D9E7EF]" />

                        {/* Teachers */}
                        <section>
                            <div className="flex items-center gap-2 mb-3">
                                <h3 className="text-[14px] sm:text-[16px] font-medium text-[#398AC8] leading-[24px] font-['Poppins']">Teachers</h3>
                                <img src="/students/edit-icon.svg" alt="edit" className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] cursor-pointer" onClick={() => setShowTeacherEdit(true)} />
                            </div>
                            <div className="flex flex-wrap gap-1 sm:gap-2">
                                {selectedTeachers.length > 0 ? (
                                    selectedTeachers.map((teacher, index) => (
                                        <span key={index} className="text-[10px] sm:text-[11px] text-[#374151] bg-blue-100 px-2 py-1 rounded-full">
                                            {teacher.name}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-[10px] sm:text-[11px] text-gray-500 italic">No teachers assigned</span>
                                )}
                            </div>
                        </section>

                        <div className="border-t border-[#D9E7EF]" />

                        {/* Subjects */}
                        <section>
                            <div className="flex items-center gap-2 mb-3">
                                <h3 className="text-[14px] sm:text-[16px] font-medium text-[#398AC8] leading-[24px] font-['Poppins']">Subjects</h3>
                                <img src="/students/edit-icon.svg" alt="edit" className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] cursor-pointer" onClick={() => setShowSubjectEdit(true)} />
                            </div>
                            <div className="flex flex-wrap gap-1 sm:gap-2">
                                {selectedSubjects.length > 0 ? (
                                    selectedSubjects.map((subject, index) => (
                                        <span key={index} className="text-[10px] sm:text-[11px] text-[#374151] bg-gray-100 px-2 py-1 rounded-full">
                                            {subject.name}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-[10px] sm:text-[11px] text-gray-500 italic">No subjects assigned</span>
                                )}
                            </div>
                        </section>

                        <div className="border-t border-[#D9E7EF]" />

                        {/* Account history */}
                        <section>
                            <div className="flex items-center gap-2 mb-3">
                                <h3 className="text-[14px] sm:text-[16px] font-medium text-[#398AC8] leading-[24px] font-['Poppins']">Account History</h3>
                                <img src="/students/history-icon.svg" alt="account history" className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px]" />
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4">
                                <div className="flex flex-col">
                                    <span className="text-[#ABABAB] text-[10px] sm:text-[11px] mb-1">Account Created</span>
                                    <span className="text-[#374151] text-[10px] sm:text-[11px]">{student.accountCreated || '20/12/22'}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[#ABABAB] text-[10px] sm:text-[11px] mb-1">Last Updated</span>
                                    <span className="text-[#374151] text-[10px] sm:text-[11px]">{student.lastUpdated || '26/12/22'}</span>
                                </div>
                            </div>
                        </section>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Teacher Edit Modal */}
            {showTeacherEdit && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-[#1033583b]" onClick={handleCloseTeacherModal}></div>

                    <div className="relative bg-white rounded-[30px] shadow-[0px_0px_8px_2px_rgba(9,161,218,0.1)] w-full max-w-[848px] h-[80vh] flex flex-col overflow-hidden">
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 sm:px-6 pt-4 sm:pt-6 flex-shrink-0">
                            <h2 className="text-[16px] sm:text-[18px] font-medium text-[#103358]">{student.firstName}, {student.lastName}</h2>
                            <button onClick={handleCloseTeacherModal}><img src="/students/close.svg" alt="close" className="w-5 h-5" /></button>
                        </div>
                        <div className="mt-4 border-t border-[#D9E7EF] flex-shrink-0" />
                        
                        {/* Content */}
                        <div className="px-4 sm:px-6 py-4 sm:py-6 flex-1 flex flex-col overflow-hidden">
                            <h3 className="text-[14px] sm:text-[16px] font-medium text-[#398AC8] mb-3 flex-shrink-0">Teachers</h3>
                            <label className="block text-[12px] sm:text-[14px] text-[#374151] mb-2 flex-shrink-0">Add Teachers</label>
                            <div className="relative mb-4 flex-shrink-0">
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
                            
                            {/* Scrollable Teacher List */}
                            <div className="flex-1 overflow-y-auto space-y-2 pr-2">
                                {filteredTeachers.length > 0 ? (
                                    filteredTeachers.map((teacher, index) => {
                                        const isSelected = selectedTeachers.find(t => t.name === teacher.name);
                                        return (
                                            <div key={index} className="flex items-center justify-between py-3 px-3 hover:bg-gray-50 rounded-lg border border-gray-100">
                                                <div className="flex flex-col flex-1 min-w-0">
                                                    <span className="text-[12px] sm:text-[14px] text-[#374151] font-medium truncate">{teacher.name}</span>
                                                    {teacher.email && (
                                                        <span className="text-[10px] sm:text-[12px] text-[#ABABAB] truncate">{teacher.email}</span>
                                                    )}
                                                </div>
                                                <button 
                                                    aria-label={isSelected ? "Remove teacher" : "Add teacher"} 
                                                    onClick={() => handleTeacherChange(teacher)}
                                                    className={`p-2 rounded-full transition-colors flex-shrink-0 ${
                                                        isSelected 
                                                            ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                                                            : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                                                    }`}
                                                >
                                                    {isSelected ? (
                                                        <Check size={16} />
                                                    ) : (
                                                        <Plus size={16} />
                                                    )}
                                                </button>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        <p className="text-[12px] sm:text-[14px]">No teachers found</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        {/* Fixed Footer */}
                        <div className="px-4 sm:px-6 py-4 border-t border-[#D9E7EF] flex justify-end gap-3 flex-shrink-0">
                            <button 
                                onClick={handleCloseTeacherModal} 
                                className="px-4 h-10 bg-white border border-[#16375A] rounded-[8px] text-[#16375A] text-[12px] sm:text-[14px] font-medium hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleSaveTeachers} 
                                className="px-4 h-10 bg-[#16375A] text-white rounded-[8px] text-[12px] sm:text-[14px] font-medium hover:bg-[#0f2a4a] transition-colors"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Subject Edit Modal */}
            {showSubjectEdit && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-[#1033583b]" onClick={handleCloseSubjectModal}></div>

                    <div className="relative bg-white rounded-[30px] shadow-[0px_0px_8px_2px_rgba(9,161,218,0.1)] w-full max-w-[848px] h-[80vh] flex flex-col overflow-hidden">
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 sm:px-6 pt-4 sm:pt-6 flex-shrink-0">
                            <h2 className="text-[16px] sm:text-[18px] font-medium text-[#103358]">{student.firstName} {student.lastName}</h2>
                            <button onClick={handleCloseSubjectModal}><img src="/students/close.svg" alt="close" className="w-5 h-5" /></button>
                        </div>
                        <div className="mt-4 border-t border-[#D9E7EF] flex-shrink-0" />
                        
                        {/* Content */}
                        <div className="px-4 sm:px-6 py-4 sm:py-6 flex-1 flex flex-col overflow-hidden">
                            <h3 className="text-[14px] sm:text-[16px] font-medium text-[#398AC8] mb-3 flex-shrink-0">Subjects</h3>
                            <label className="block text-[12px] sm:text-[14px] text-[#374151] mb-2 flex-shrink-0">Add Subjects</label>
                            <div className="relative mb-4 flex-shrink-0">
                                <input
                                    type="text"
                                    value={subjectSearchTerm}
                                    onChange={(e) => setSubjectSearchTerm(e.target.value)}
                                    placeholder="Search for subjects"
                                    className="w-full h-[40px] pl-11 pr-4 bg-[#EBF3F9] rounded-[40px] text-[13px] sm:text-[15px] text-[#1D1D1D] placeholder-[#BDBDBD]"
                                />
                                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.5 15.5L11.5 11.5M13.1667 7.33333C13.1667 10.555 10.555 13.1667 7.33333 13.1667C4.11167 13.1667 1.5 10.555 1.5 7.33333C1.5 4.11167 4.11167 1.5 7.33333 1.5C10.555 1.5 13.1667 4.11167 13.1667 7.33333Z" stroke="#BDBDBD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                </div>
                            </div>
                            
                            {/* Scrollable Subject List */}
                            <div className="flex-1 overflow-y-auto space-y-2 pr-2">
                                {filteredSubjects.length > 0 ? (
                                    filteredSubjects.map((subject, index) => {
                                        const isSelected = selectedSubjects.find(s => s.name === subject.name);
                                        return (
                                            <div key={index} className="flex items-center justify-between py-3 px-3 hover:bg-gray-50 rounded-lg border border-gray-100">
                                                <div className="flex flex-col flex-1 min-w-0">
                                                    <span className="text-[12px] sm:text-[14px] text-[#374151] font-medium truncate">{subject.name}</span>
                                                </div>
                                                <button 
                                                    aria-label={isSelected ? "Remove subject" : "Add subject"} 
                                                    onClick={() => handleSubjectChange(subject)}
                                                    className={`p-2 rounded-full transition-colors flex-shrink-0 ${
                                                        isSelected 
                                                            ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                                                            : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                                                    }`}
                                                >
                                                    {isSelected ? (
                                                        <Check size={16} />
                                                    ) : (
                                                        <Plus size={16} />
                                                    )}
                                                </button>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        <p className="text-[12px] sm:text-[14px]">No subjects found</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        {/* Fixed Footer */}
                        <div className="px-4 sm:px-6 py-4 border-t border-[#D9E7EF] flex justify-end gap-3 flex-shrink-0">
                            <button 
                                onClick={handleCloseSubjectModal} 
                                className="px-4 h-10 bg-white border border-[#16375A] rounded-[8px] text-[#16375A] text-[12px] sm:text-[14px] font-medium hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleSaveSubjects} 
                                className="px-4 h-10 bg-[#16375A] text-white rounded-[8px] text-[12px] sm:text-[14px] font-medium hover:bg-[#0f2a4a] transition-colors"
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