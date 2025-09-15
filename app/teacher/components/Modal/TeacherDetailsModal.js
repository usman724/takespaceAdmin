'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { api } from '../../../lib/api';
import toast, { Toaster } from 'react-hot-toast';

const TeacherDetailsModal = ({ isOpen, onClose, teacher, onResetPassword, onEditSubjects }) => {
    const { t } = useTranslation();
    const [showStudentList, setShowStudentList] = useState(false);
    const [showSubjectEdit, setShowSubjectEdit] = useState(false);
    // Store selected subjects as subject IDs (strings) for robust comparison
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [students, setStudents] = useState([]);
    const [loadingStudents, setLoadingStudents] = useState(false);
    const [studentsError, setStudentsError] = useState(null);
    const [allSubjects, setAllSubjects] = useState([]);
    const [loadingSubjects, setLoadingSubjects] = useState(false);
    const [subjectsError, setSubjectsError] = useState(null);
    const [updatingSubjects, setUpdatingSubjects] = useState(false);
    const [teacherDetails, setTeacherDetails] = useState(null);
    const [loadingDetails, setLoadingDetails] = useState(false);
    const [detailsError, setDetailsError] = useState(null);

    const handleSubjectChange = (subjectId) => {
        setSelectedSubjects(prev => {
            const newSubjects = prev.includes(subjectId)
                ? prev.filter(s => s !== subjectId)
                : [...prev, subjectId];
            return newSubjects;
        });
    };

    const handleSubjectSubmit = async () => {
        if (!teacher?.id) return;
        
        setUpdatingSubjects(true);
        try {
            // Determine current assigned IDs from details or teacher fallback
            const currentAssignedIds = Array.isArray(teacherDetails?.subjects) && teacherDetails.subjects.length
                ? teacherDetails.subjects.map(s => String(s.id ?? s.subject_id ?? s.pk)).filter(Boolean)
                : Array.isArray(teacher?.subjects)
                    ? teacher.subjects.map(s => String(typeof s === 'string' ? (allSubjects.find(a => a.name === s)?.id ?? '') : (s?.id ?? s?.subject_id ?? s?.pk ?? ''))).filter(Boolean)
                    : [];

            const nextIds = selectedSubjects; // already string ids

            const toAdd = nextIds.filter(id => !currentAssignedIds.includes(id)).map(id => Number(id));
            const toRemove = currentAssignedIds.filter(id => !nextIds.includes(id)).map(id => Number(id));

            // 1) Add new subjects if any
            if (toAdd.length) {
                const addRes = await api.assignSubjectsToTeacher(teacher.id, toAdd);
                if (!(addRes && (addRes.status === 201 || addRes.status === 200 || addRes.status === 204))) {
                    const msg = addRes.body?.error?.message || 'Failed to add subjects';
                    toast.error(msg);
                    setUpdatingSubjects(false);
                    return;
                }
            }

            // 2) Remove unselected subjects one by one via DELETE endpoint
            for (const sid of toRemove) {
                const delRes = await api.removeSubjectFromTeacherAdmin(teacher.id, sid);
                if (!(delRes && delRes.ok)) {
                    const msg = delRes.body?.error?.message || delRes.body?.detail || 'Failed to remove subject';
                    toast.error(msg);
                    setUpdatingSubjects(false);
                    return;
                }
            }

            // Success
            const idToName = Object.fromEntries(allSubjects.map(s => [String(s.id), s.name]));
            const selectedNames = selectedSubjects.map(id => idToName[String(id)]).filter(Boolean);
            onEditSubjects(selectedNames);
            setShowSubjectEdit(false);
            toast.success('Subjects updated successfully');
        } catch (error) {
            console.error('Error updating subjects:', error);
            toast.error('Failed to update subjects. Please try again.');
        } finally {
            setUpdatingSubjects(false);
        }
    };

    // Fetch teacher details when modal opens
    useEffect(() => {
        const fetchTeacherDetails = async () => {
            if (teacher?.id && isOpen) {
                setLoadingDetails(true);
                setDetailsError(null);
                try {
                    const details = await api.getTeacherDetails(teacher.id);
                    setTeacherDetails(details);
                } catch (error) {
                    console.error('Error fetching teacher details:', error);
                    setDetailsError('Failed to load teacher details');
                    setTeacherDetails(null);
                } finally {
                    setLoadingDetails(false);
                }
            }
        };

        fetchTeacherDetails();
    }, [teacher?.id, isOpen]);

    // Fetch students when teacher changes or modal opens
    useEffect(() => {
        const fetchStudents = async () => {
            if (teacher?.id && isOpen) {
                setLoadingStudents(true);
                setStudentsError(null);
                try {
                    const response = await api.getTeacherRoster(teacher.id);
                    if (response.error) {
                        setStudentsError(response.error.message);
                        setStudents([]);
                    } else {
                        setStudents(response.data || []);
                    }
                } catch (error) {
                    console.error('Error fetching students:', error);
                    setStudentsError('Failed to load students');
                    setStudents([]);
                } finally {
                    setLoadingStudents(false);
                }
            }
        };

        fetchStudents();
    }, [teacher?.id, isOpen]);

    // Fetch all subjects when modal opens
    useEffect(() => {
        const fetchAllSubjects = async () => {
            if (isOpen) {
                setLoadingSubjects(true);
                setSubjectsError(null);
                try {
                    const response = await api.getAllSubjects();
                    const list = Array.isArray(response)
                        ? response
                        : Array.isArray(response?.data?.results)
                            ? response.data.results
                            : Array.isArray(response?.data)
                                ? response.data
                                : [];
                    const normalized = list
                        .map(s => ({ id: String(s.id ?? s.subject_id ?? s.pk ?? ''), name: s.name || s.title || '-' }))
                        .filter(s => s.id);
                    setAllSubjects(normalized);
                } catch (error) {
                    console.error('Error fetching subjects:', error);
                    setSubjectsError('Failed to load subjects');
                    setAllSubjects([]);
                } finally {
                    setLoadingSubjects(false);
                }
            }
        };

        fetchAllSubjects();
    }, [isOpen]);

    // When teacher details or allSubjects are loaded while modal is open, pre-select already assigned subjects
    useEffect(() => {
        if (!isOpen) return;
        // Prefer detailed subjects from teacherDetails
        const detailSubjects = teacherDetails?.subjects;
        if (Array.isArray(detailSubjects) && detailSubjects.length) {
            const ids = detailSubjects.map(s => String(s.id ?? s.subject_id ?? s.pk)).filter(Boolean);
            if (ids.length) {
                setSelectedSubjects(ids);
                return;
            }
        }
        // Fallback to subjects on teacher prop (names array or objects)
        if (Array.isArray(teacher?.subjects) && teacher.subjects.length) {
            const nameToId = new Map(allSubjects.map(s => [s.name, String(s.id)]));
            const ids = teacher.subjects
                .map(s => (typeof s === 'string' ? s : (s?.name || ''))) // names
                .map(name => nameToId.get(name))
                .filter(Boolean);
            if (ids.length) setSelectedSubjects(ids);
        }
    }, [isOpen, teacherDetails, teacher, allSubjects]);

    if (!isOpen) return null;

    return (
        <>
            <Toaster position="top-right" />
            {/* Main Teacher Details Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Background Overlay */}
                <div
                    className="fixed inset-0 bg-[#1033583b]"
                    onClick={onClose}
                ></div>

                {/* Modal - Responsive with exact Figma dimensions for larger screens */}
                <div
                    className="relative bg-white rounded-[29.98px] shadow-[0px_0px_8px_2px_rgba(9,161,218,0.1)] w-full max-w-[1099px] h-[602px] mx-auto"
                >
                    {/* Header Row */}
                    <div className="absolute left-[36px] top-[29px] flex items-center gap-2">
                        <h2 className="text-[20px] font-medium text-[#103358] leading-[24px] font-['Poppins']">
                            {loadingDetails ? 'Loading...' : (teacherDetails?.full_name || teacher?.full_name || teacher?.name || 'Teacher Name')}
                        </h2>
                    </div>

                    {/* Reset Password Link */}
                    <div className="absolute left-[179px] top-[32px] flex items-center gap-2 cursor-pointer" onClick={onResetPassword}>
                        <span className="text-[12px] font-medium text-[#398AC8] leading-[24px] font-['Poppins']">
                            Reset Password
                        </span>
                        <img src="/teacher/resetpassword.svg" alt="reset password" className="w-[10px] h-[13px]" />
                    </div>

                    {/* Close Button - Exact Figma positioning */}
                    <div className="absolute right-[36px] top-[27px] cursor-pointer" onClick={onClose}>
                        <img src="/teacher/close.svg" alt="close" className="w-[19.55px] h-[19.55px]" />
                    </div>

                    {/* Divider Lines */}
                    <div className="absolute left-[36px] top-[70px] w-[calc(100%-72px)] h-[1px] border border-[#D9E7EF]"></div>
                    <div className="absolute left-[36px] top-[205px] w-[calc(100%-72px)] h-[1px] border border-[#D9E7EF]"></div>
                    <div className="absolute left-[36px] top-[305px] w-[calc(100%-72px)] h-[1px] border border-[#D9E7EF]"></div>
                    <div className="absolute left-[36px] top-[445px] w-[calc(100%-72px)] h-[1px] border border-[#D9E7EF]"></div>

                    {/* Content Container */}
                    <div className="absolute left-[36px] top-[90px] w-[calc(100%-72px)] h-[459px] flex flex-col gap-[41px]">

                        {/* Personal Info Section */}
                        <div className="w-full h-[94px]">
                            <div className="flex items-center gap-2 mb-4">
                                <h3 className="text-[18px] font-medium text-[#398AC8] leading-[24px] font-['Poppins']">
                                    Personal Info
                                </h3>
                                <img src="/teacher/edite.svg" alt="edit" className="w-[18px] h-[18px]" />
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <p className="text-[14px] font-normal text-[#ABABAB] leading-[20px] font-['Poppins'] letter-spacing-[0.25px] mb-1">
                                        Name
                                    </p>
                                    <p className="text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px]">
                                        {loadingDetails ? 'Loading...' : (teacherDetails?.full_name || teacher?.full_name || teacher?.name || 'N/A')}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[14px] font-normal text-[#ABABAB] leading-[20px] font-['Poppins'] letter-spacing-[0.25px] mb-1">
                                        Email Address
                                    </p>
                                    <p className="text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px]">
                                        {loadingDetails ? 'Loading...' : (teacherDetails?.email || teacher?.email || 'N/A')}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[14px] font-normal text-[#ABABAB] leading-[20px] font-['Poppins'] letter-spacing-[0.25px] mb-1">
                                        Username
                                    </p>
                                    <p className="text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px]">
                                        {loadingDetails ? 'Loading...' : (teacherDetails?.username || teacher?.username || 'N/A')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Subjects Section */}
                        <div className="w-full h-[94px]">
                            <div className="flex items-center gap-2 mb-4">
                                <h3 className="text-[18px] font-medium text-[#398AC8] leading-[24px] font-['Poppins']">
                                    Subjects
                                </h3>
                                <img src="/teacher/edite.svg" alt="edit" className="w-[18px] h-[18px] cursor-pointer" onClick={() => setShowSubjectEdit(true)} />
                            </div>
                            <div className="flex items-center gap-4">
                                <img src="/teacher/calculator.svg" alt="calculator" className="w-[18px] h-[18px]" />
                                <span className="text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px]">
                                    {loadingDetails ? 'Loading...' : (teacherDetails?.subjects?.map(s => s.name || s).join(', ') || teacher?.subjects?.map(s => s.name || s).join(', ') || 'No subjects assigned')}
                                </span>
                            </div>
                        </div>

                        {/* Students Section - Exact Figma specifications */}
                        <div className="w-full h-[90px]">
                            <div className="flex items-center gap-2 mb-4">
                                <h3 className="text-[18px] font-medium text-[#398AC8] leading-[24px] font-['Poppins']">
                                    Students
                                </h3>
                                <img src="/teacher/bluestudent.svg" alt="students" className="w-[13px] h-[14px]" />
                            </div>
                            <div className="flex items-center gap-4 mb-2">
                                <img src="/teacher/calculator.svg" alt="calculator" className="w-[18px] h-[18px]" />
                                <span className="text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px]">
                                    Class
                                </span>
                            </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px]">
                                        Not enrolled in classes
                                    </span>
                                    <div className="flex items-center gap-4">
                                        <span className="text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px]">
                                            {loadingStudents ? 'Loading...' : `${students.length} Students`}
                                        </span>
                                        <button 
                                            onClick={() => setShowStudentList(true)}
                                            className="text-[12px] font-normal text-[#2F80ED] leading-[20px] font-['Poppins'] letter-spacing-[0.25px] cursor-pointer"
                                        >
                                            View All
                                        </button>
                                    </div>
                                </div>
                        </div>

                        {/* Account History Section */}
                        <div className="w-full h-[94px]">
                            <div className="flex items-center gap-2 mb-4">
                                <h3 className="text-[18px] font-medium text-[#398AC8] leading-[24px] font-['Poppins']">
                                    Account History
                                </h3>
                                <img src="/teacher/accounthistory.svg" alt="account history" className="w-[18px] h-[18px]" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[14px] font-normal text-[#ABABAB] leading-[20px] font-['Poppins'] letter-spacing-[0.25px] mb-1">
                                        Account Created
                                    </p>
                                    <p className="text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px]">
                                        {loadingDetails ? 'Loading...' : (teacherDetails?.created_at || teacher?.created_at || 'N/A')}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[14px] font-normal text-[#ABABAB] leading-[20px] font-['Poppins'] letter-spacing-[0.25px] mb-1">
                                        Last Updated
                                    </p>
                                    <p className="text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px]">
                                        {loadingDetails ? 'Loading...' : (teacherDetails?.modified_at || teacher?.modified_at || 'N/A')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Subject Edit Modal */}
            {showSubjectEdit && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-[#1033583b]" onClick={() => setShowSubjectEdit(false)}></div>
                    
                    <div className="relative bg-white rounded-[29.98px] shadow-[0px_0px_8px_2px_rgba(9,161,218,0.1)] w-full max-w-[848px] h-[240px] mx-auto">
                        {/* Header */}
                        <div className="absolute left-[36px] top-[29px] flex items-center gap-2">
                            <img src="/teacher/blueuser.svg" alt="user" className="w-[17px] h-[19.43px]" />
                            <h2 className="text-[20px] font-medium text-[#103358] leading-[24px] font-['Poppins']">
                                {teacher?.full_name || teacher?.name || 'Teacher Name'}
                            </h2>
                        </div>

                        {/* Close Button */}
                        <div className="absolute right-[36px] top-[27px] cursor-pointer" onClick={() => setShowSubjectEdit(false)}>
                            <img src="/teacher/close.svg" alt="close" className="w-[19.55px] h-[19.55px]" />
                        </div>

                        {/* Divider */}
                        <div className="absolute left-[36px] top-[70px] w-[calc(100%-72px)] h-[1px] border border-[#D9E7EF]"></div>

                        {/* Content */}
                        <div className="absolute left-[36px] top-[84px] w-[calc(100%-72px)]">
                            <h3 className="text-[18px] font-medium text-[#398AC8] leading-[24px] font-['Poppins'] mb-4">
                                Subjects
                            </h3>
                            {loadingSubjects ? (
                                <div className="flex items-center justify-center py-4">
                                    <div className="text-[14px] text-[#374151] font-['Poppins']">
                                        Loading subjects...
                                    </div>
                                </div>
                            ) : subjectsError ? (
                                <div className="flex items-center justify-center py-4">
                                    <div className="text-[14px] text-red-500 font-['Poppins']">
                                        {subjectsError}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-wrap gap-5 max-h-[88px] overflow-y-auto pr-2">
                                    {allSubjects.map(subject => (
                                        <div key={subject.id} className="flex items-center gap-3">
                                            <div className="relative">
                                                <input
                                                    type="checkbox"
                                                    id={`subject-${subject.id}`}
                                                    checked={selectedSubjects.includes(String(subject.id))}
                                                    onChange={() => handleSubjectChange(String(subject.id))}
                                                    className="w-[22px] h-[22px] bg-white border border-[#103358] rounded-[3px] checked:bg-[#103358] checked:border-[#103358] appearance-none relative cursor-pointer"
                                                />
                                                {selectedSubjects.includes(String(subject.id)) && (
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
                                                htmlFor={`subject-${subject.id}`}
                                                className="text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px] cursor-pointer"
                                            >
                                                {subject.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="absolute right-[36px] top-[169px] flex gap-2">
                            <button
                                onClick={() => setShowSubjectEdit(false)}
                                className="w-[92px] h-[40px] bg-[rgba(12,104,199,0.06)] border border-[#16375A] rounded-[8px] text-[16px] font-normal text-[#16375A] leading-[24px] font-['Poppins'] flex items-center justify-center letter-spacing-[0.5px]"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubjectSubmit}
                                disabled={updatingSubjects}
                                className={`w-[92px] h-[40px] rounded-[8px] text-[16px] font-normal leading-[24px] font-['Poppins'] flex items-center justify-center letter-spacing-[0.5px] ${
                                    updatingSubjects 
                                        ? 'bg-gray-400 text-white cursor-not-allowed' 
                                        : 'bg-[#16375A] text-white hover:bg-[#0f2a47]'
                                }`}
                            >
                                {updatingSubjects ? 'Updating...' : 'Submit'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Student List Modal */}
            {showStudentList && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-[#1033583b]" onClick={() => setShowStudentList(false)}></div>
                    
                    <div className="relative bg-white rounded-[29.98px] shadow-[0px_0px_8px_2px_rgba(9,161,218,0.1)] w-full max-w-[1200px] h-[600px] md:h-[700px] lg:h-[800px] mx-auto flex flex-col">
                        {/* Header */}
                        <div className="flex-shrink-0 p-8 pb-4">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h2 className="text-[20px] md:text-[24px] font-medium text-[#103358] leading-[24px] font-['Poppins'] mb-2">
                                        {teacher?.full_name || teacher?.name || 'Teacher Name'}'s Roster
                                    </h2>
                                    <p className="text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins']">
                                        {teacher?.full_name || teacher?.name || 'Teacher Name'}'s Roster contains the following {students.length} students.
                                    </p>
                                </div>
                                <button 
                                    onClick={() => setShowStudentList(false)}
                                    className="flex-shrink-0"
                                >
                                    <img src="/teacher/close.svg" alt="close" className="w-[19.55px] h-[19.55px]" />
                                </button>
                            </div>
                        </div>

                        {/* Table Container */}
                        <div className="flex-1 px-8 pb-8 overflow-hidden">
                            {/* Table Header */}
                            <div className="bg-[#16375A] rounded-t-[8px] flex items-center px-4 md:px-8 py-4 mb-0">
                                <div className="grid grid-cols-4 w-full gap-4 md:gap-8">
                                    <span className="text-[14px] md:text-[16px] font-medium text-white leading-[24px] font-['Poppins']">
                                        Student Name
                                    </span>
                                    <span className="text-[14px] md:text-[16px] font-medium text-white leading-[24px] font-['Poppins']">
                                        Email
                                    </span>
                                    <span className="text-[14px] md:text-[16px] font-medium text-white leading-[24px] font-['Poppins']">
                                        Year
                                    </span>
                                    <span className="text-[14px] md:text-[16px] font-medium text-white leading-[24px] font-['Poppins']">
                                        Username
                                    </span>
                                </div>
                            </div>

                            {/* Table Content with Scroll */}
                            <div className="bg-white border border-[#E0E0E0] rounded-b-[8px] overflow-hidden">
                                <div className="max-h-[300px] md:max-h-[400px] lg:max-h-[500px] overflow-y-auto">
                                    {loadingStudents ? (
                                        <div className="flex items-center justify-center py-8">
                                            <div className="text-[14px] text-[#374151] font-['Poppins']">
                                                Loading students...
                                            </div>
                                        </div>
                                    ) : studentsError ? (
                                        <div className="flex items-center justify-center py-8">
                                            <div className="text-[14px] text-red-500 font-['Poppins']">
                                                {studentsError}
                                            </div>
                                        </div>
                                    ) : students.length === 0 ? (
                                        <div className="flex items-center justify-center py-8">
                                            <div className="text-[14px] text-[#374151] font-['Poppins']">
                                                No students found
                                            </div>
                                        </div>
                                    ) : (
                                        students.map((student, index) => (
                                            <div key={student.id || index} className="flex items-center px-4 md:px-8 py-3 border-b border-[#E0E0E0] last:border-b-0 hover:bg-gray-50">
                                                <div className="grid grid-cols-4 w-full gap-4 md:gap-8">
                                                    <span className="text-[12px] md:text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] truncate">
                                                        {student.full_name || 'N/A'}
                                                    </span>
                                                    <span className="text-[12px] md:text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] truncate">
                                                        {student.email || 'N/A'}
                                                    </span>
                                                    <span className="text-[12px] md:text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] truncate">
                                                        {student.year || 'N/A'}
                                                    </span>
                                                    <span className="text-[12px] md:text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] truncate">
                                                        {student.username || 'N/A'}
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Footer with Close Button */}
                        <div className="flex-shrink-0 p-8 pt-4 flex justify-end">
                            <button
                                onClick={() => setShowStudentList(false)}
                                className="w-[109px] h-[40px] bg-[#16375A] text-white rounded-[8px] text-[16px] font-normal leading-[24px] font-['Poppins'] flex items-center justify-center letter-spacing-[0.5px]"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TeacherDetailsModal; 