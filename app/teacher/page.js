'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { useTable, usePagination, useFilters, useSortBy } from 'react-table';
import Layout from '../components/layout/Layout';
import I18nProvider from '../components/providers/I18nProvider';
import { AddTeacherModal, ResetPasswordModal } from './components/Modal';
import TeacherDetailsModal from './components/Modal/TeacherDetailsModal';
import { api } from '../lib/api';
import '../lib/i18n';

// --- Reusable Components ---

const Modal = ({ isOpen, onClose, children, className = '' }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-[#103358] bg-opacity-40" onClick={onClose}></div>
      <div className={`relative bg-white rounded-[30px] shadow-[0px_0px_8px_2px_rgba(9,161,218,0.1)] w-full ${className}`}>
        {children}
      </div>
    </div>
  );
};

// Filter Dropdown Component
const FilterDropdown = ({ isOpen, onClose, subjects, selectedSubject, onSubjectChange, onApply }) => {
  const { t } = useTranslation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="absolute top-full right-0 mt-2 z-50">
      <div ref={dropdownRef} className="bg-white border border-[rgba(0,0,0,0.05)] shadow-[0px_0px_25px_rgba(0,0,0,0.05)] rounded-b-[10px] w-[373px]">
        <div className="flex flex-col justify-center items-start p-4 pt-4 pb-6 gap-[18px]">
          <div className="w-full">
            <div className="text-[14px] text-[#1D1D1D] font-normal mb-2">Subjects:</div>
            <div className="relative">
              <select 
                value={selectedSubject} 
                onChange={(e) => onSubjectChange(e.target.value)}
                className="w-full h-[43px] bg-[#F7F7F7] border-none rounded-[6px] px-4 pr-10 text-[14px] text-[#4F4F4F] font-normal appearance-none"
              >
                <option value="">Any</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{t(subject.toLowerCase())}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                                 <img src="/teacher/arrowdown.svg" alt="Filter icon" className="w-[15px] h-[17px]" />

              </div>
            </div>
          </div>
          <div className="flex justify-center w-full">
            <button 
              onClick={onApply}
              className="flex items-center justify-center px-4 py-2 bg-[#16375A] text-white rounded-lg text-[16px] font-normal w-[121px] h-[40px]"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Options Dropdown Component
const OptionsDropdown = ({ isOpen, onClose, onResetPassword, onExportTeachers }) => {
  const { t } = useTranslation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="absolute top-full right-0 mt-2 z-50">
      <div ref={dropdownRef} className="bg-white border border-[rgba(0,0,0,0.05)] shadow-[0px_0px_25px_rgba(0,0,0,0.05)] rounded-b-[10px] w-[249px]">
        <div className="p-4 pb-3 border-b border-[rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between">
            <span className="text-[14px] text-[#103358] font-normal">Options</span>
                                             <img src="/teacher/arrowdown.svg" alt="Filter icon" className="w-[15px] h-[17px]" />

          </div>
        </div>
        <div className="py-1">
          <button 
            onClick={onResetPassword}
            className="w-full text-left px-4 py-2 text-[14px] text-[#1D1D1D] font-normal hover:bg-gray-50 rounded"
          >
            Reset Password
          </button>
          <button 
            onClick={onExportTeachers}
            className="w-full text-left px-4 py-2 text-[14px] text-[#1D1D1D] font-normal hover:bg-gray-50 rounded"
          >
            Export Current list of teachers
          </button>
        </div>
      </div>
    </div>
  );
};

// React Table Component with Figma styling
const TeachersTable = ({ data, onDelete, onTeacherClick, deletedTeacher, onRestore }) => {
  const { t } = useTranslation();

  const columns = useMemo(() => [
    {
      Header: t('teacherName'),
      accessor: 'name',
      Cell: ({ value }) => (
        <span className="text-[14px] leading-[24px] text-[#4E4B66] font-normal">
          {value}
        </span>
      )
    },
    {
      Header: t('email'),
      accessor: 'email',
      Cell: ({ value }) => (
        <span className="text-[14px] leading-[24px] text-[#4E4B66] font-normal">
          {value}
        </span>
      )
    },
    {
      Header: t('totalStudents'),
      accessor: 'totalStudents',
      Cell: ({ value }) => (
        <span className="text-[14px] leading-[24px] text-[#4E4B66] font-normal">
          {value}
        </span>
      )
    },
    {
      Header: '',
      accessor: 'actions',
      Cell: ({ row }) => {
        const teacher = row.original;
        const isDeleted = deletedTeacher && deletedTeacher.id === teacher.id;
        
        return (
          <button 
            onClick={(e) => { 
              e.stopPropagation(); 
              if (!isDeleted) {
                onDelete(teacher); 
              }
            }} 
            className={`${isDeleted ? 'hidden' : 'text-red-500 hover:text-red-700'}`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
            </svg>
          </button>
        );
      }
    }
  ], [t, onDelete, deletedTeacher]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 }
    },
    useFilters,
    useSortBy,
    usePagination
  );

  return (
    <div className="overflow-x-auto">
      <table {...getTableProps()} className="w-full border-collapse">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} className="bg-[#16375A] text-white rounded-t-lg">
              {headerGroup.headers.map(column => (
                <th 
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="px-6 py-4 text-left font-medium text-[16px] leading-[24px]"
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            const teacher = row.original;
            const isDeleted = deletedTeacher && deletedTeacher.id === teacher.id;
            
            return (
              <tr 
                {...row.getRowProps()} 
                className={`border-b border-[#E0E0E0] ${isDeleted ? 'bg-[#398AC8] text-white' : 'bg-white hover:bg-gray-50 cursor-pointer'}`}
                onClick={!isDeleted ? () => onTeacherClick(teacher) : undefined}
              >
                {isDeleted ? (
                  // Show restore message when teacher is deleted
                  <td colSpan={4} className="px-6 py-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white text-[14px] leading-[24px] font-normal">
                        {deletedTeacher.name}'s account has been removed
                      </span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onRestore();
                        }} 
                        className="bg-white text-[#398AC8] px-4 py-2 rounded font-medium text-[14px] leading-[24px] font-normal"
                      >
                        Restore
                      </button>
                    </div>
                  </td>
                ) : (
                  // Show normal teacher data
                  row.cells.map(cell => (
                    <td {...cell.getCellProps()} className="px-6 py-4">
                      {cell.render('Cell')}
                    </td>
                  ))
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      
      {/* Pagination with Figma styling */}
      {pageCount > 1 && (
        <div className="flex justify-end items-center gap-2 py-4">
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm">
            Page {pageIndex + 1} of {pageOptions.length}
          </span>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

// Modal components are now imported from separate files

// --- Main Page Component ---

const TeachersPage = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const [pageData, setPageData] = useState({ teachers: [], subjects: [] });
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState({ type: null, isOpen: false });
    const [deletedTeacher, setDeletedTeacher] = useState(null);
    const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
    const [optionsDropdownOpen, setOptionsDropdownOpen] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [filteredTeachers, setFilteredTeachers] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [teacherDetailsModalOpen, setTeacherDetailsModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await api.getTeachersPageData();
                setPageData(data);
                setFilteredTeachers(data.teachers);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Apply filter
    const applyFilter = () => {
        if (!selectedSubject) {
            setFilteredTeachers(pageData.teachers);
        } else {
            setFilteredTeachers(pageData.teachers.filter(teacher => 
                teacher.subjects && teacher.subjects.includes(selectedSubject)
            ));
        }
        setFilterDropdownOpen(false);
    };

    // Handle removed teacher display
    const getRemovedTeacher = () => {
        return filteredTeachers.find(teacher => teacher.status === 'removed');
    };

    const getActiveTeachers = () => {
        return filteredTeachers.filter(teacher => teacher.status !== 'removed');
    };

    const handleDelete = (teacherToDelete) => {
        // Mark the teacher as removed instead of filtering out
        const updatedTeacher = { ...teacherToDelete, status: 'removed' };
        setDeletedTeacher(updatedTeacher);
        
        // Update the teacher status in both arrays
        setPageData(prev => ({
            ...prev,
            teachers: prev.teachers.map(t => 
                t.id === teacherToDelete.id ? updatedTeacher : t
            )
        }));
        setFilteredTeachers(prev => prev.map(t => 
            t.id === teacherToDelete.id ? updatedTeacher : t
        ));
    };

    const handleRestore = () => {
        if (deletedTeacher) {
            // Restore the teacher by changing status back to active
            const restoredTeacher = { ...deletedTeacher, status: 'active' };
            
            setPageData(prev => ({
                ...prev,
                teachers: prev.teachers.map(t => 
                    t.id === deletedTeacher.id ? restoredTeacher : t
                )
            }));
            setFilteredTeachers(prev => prev.map(t => 
                t.id === deletedTeacher.id ? restoredTeacher : t
            ));
            setDeletedTeacher(null);
        }
    };

    const handleAddTeacher = (newTeacherData) => {
        const newTeacher = {
            id: pageData.teachers.length + 2,
            name: `${newTeacherData.firstName} ${newTeacherData.lastName}`,
            email: newTeacherData.email,
            totalStudents: 0,
            status: 'active',
            subjects: newTeacherData.subjects,
        };
        setPageData(prev => ({
            ...prev,
            teachers: [...prev.teachers, newTeacher]
        }));
        setFilteredTeachers(prev => [...prev, newTeacher]);
    };

    const handleResetPassword = () => {
        setModal({ type: 'reset', isOpen: true });
        setOptionsDropdownOpen(false);
    };

    const handleExportTeachers = () => {
        // Export functionality
        const csvContent = "data:text/csv;charset=utf-8," 
            + "Name,Email,Total Students\n"
            + filteredTeachers.map(teacher => 
                `${teacher.name},${teacher.email},${teacher.totalStudents}`
            ).join("\n");
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "teachers_list.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setOptionsDropdownOpen(false);
    };

    const handleHelpClick = () => {
        router.push('/help');
    };

    // Handle teacher click to open details modal
    const handleTeacherClick = (teacher) => {
        setSelectedTeacher(teacher);
        setTeacherDetailsModalOpen(true);
    };

    // Handle reset password from teacher details modal
    const handleTeacherResetPassword = () => {
        setTeacherDetailsModalOpen(false);
        setModal({ type: 'reset', isOpen: true });
    };

    // Handle edit subjects from teacher details modal
    const handleEditSubjects = (newSubjects) => {
        if (selectedTeacher) {
            const updatedTeacher = { ...selectedTeacher, subjects: newSubjects };
            setPageData(prev => ({
                ...prev,
                teachers: prev.teachers.map(t => 
                    t.id === selectedTeacher.id ? updatedTeacher : t
                )
            }));
            setFilteredTeachers(prev => prev.map(t => 
                t.id === selectedTeacher.id ? updatedTeacher : t
            ));
        }
    };

    const activeTeachers = getActiveTeachers();
    const removedTeacher = getRemovedTeacher();

    if (loading) {
        return <I18nProvider><Layout><div className="flex justify-center items-center h-screen">{t('loading')}</div></Layout></I18nProvider>;
    }

    return (
        <I18nProvider>
            <Layout>
                <div className="p-8">
                    {/* Header Section */}
                    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                        {/* Teachers Heading */}
                        <h1 className="text-[22px] font-semibold text-[#103358] leading-[27px] font-['Inter']">
                            {t('teachers')}
                        </h1>
                        
                        {/* Right side buttons */}
                        <div className="flex items-center gap-2 sm:gap-4">
                            {/* Add Teacher Button */}
                            <button 
                                onClick={() => setModal({ type: 'add', isOpen: true })} 
                                className="flex items-center justify-center gap-[10px] px-[19px] py-[10px] bg-[#103358] text-white rounded-[5px] w-[166px] h-[40px]"
                            >
                                <img src="/teacher/add-teacher.svg" alt="Add Teacher" className="w-5 h-5" />
                                <span className="text-[14px] font-bold leading-[20px] ">
                                    {t('addTeacher')}
                                </span>
                            </button>
                            
                            {/* Info Icon */}
                            <button 
                                onClick={handleHelpClick}
                                className="w-[40px] h-[40px]"
                            >
                                <img src="/teacher/info.svg" alt="Add Teacher" className="w-[40px] h-[40px]" />
                            </button>
                        </div>
                    </header>

                    {/* Filter and Options Section */}
                    <div className="flex flex-col lg:justify-end sm:flex-row items-start sm:items-center gap-4 mb-6">
                        {/* Filter Button */}
                        <div className="relative">
                            <button 
                                onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
                                className="flex items-center justify-center gap-[10px] px-[19px] py-[10px] bg-white border border-[#F2F2F2] rounded-[10px] w-[119.83px] h-[40px]"
                            >
                                 <img src="/teacher/filter.svg" alt="Filter icon" className="w-[15px] h-[17px]" />
                                <span className="text-[14px] font-normal leading-[20px] text-[#103358] font-['Poppins']">
                                    Filter
                                </span>
                                  
                                  <img src="/teacher/arrowdown.svg" alt="Filter icon" className="w-[15px] h-[17px]" />

                            </button>
                            
                            <FilterDropdown 
                                isOpen={filterDropdownOpen}
                                onClose={() => setFilterDropdownOpen(false)}
                                subjects={pageData.subjects}
                                selectedSubject={selectedSubject}
                                onSubjectChange={setSelectedSubject}
                                onApply={applyFilter}
                            />
                        </div>

                        {/* Options Button */}
                        <div className="relative">
                            <button 
                                onClick={() => setOptionsDropdownOpen(!optionsDropdownOpen)}
                                className="flex items-center justify-center gap-[10px] px-[19px] py-[10px] bg-white border border-[#F2F2F2] rounded-[10px] w-[119.83px] h-[40px]"
                            >
                                <span className="text-[14px] font-normal leading-[20px] text-[#103358] font-['Poppins']">
                                    Options
                                </span>
                                                                 <img src="/teacher/arrowdown.svg" alt="Filter icon" className="w-[15px] h-[17px]" />

                            </button>
                            
                            <OptionsDropdown 
                                isOpen={optionsDropdownOpen}
                                onClose={() => setOptionsDropdownOpen(false)}
                                onResetPassword={handleResetPassword}
                                onExportTeachers={handleExportTeachers}
                            />
                        </div>
                    </div>

                    {/* Table Section */}
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <TeachersTable 
                            data={filteredTeachers} 
                            onDelete={handleDelete}
                            onTeacherClick={handleTeacherClick}
                            deletedTeacher={deletedTeacher}
                            onRestore={handleRestore}
                        />
                    </div>
                </div>

                {/* --- Modals --- */}
                <AddTeacherModal 
                    isOpen={modal.type === 'add' && modal.isOpen} 
                    onClose={() => setModal({ isOpen: false, type: null })}
                    onSubmit={handleAddTeacher}
                    subjects={pageData.subjects}
                    width="848px"
                    height="479px"
                />
                <ResetPasswordModal
                    isOpen={modal.type === 'reset' && modal.isOpen}
                    onClose={() => setModal({ isOpen: false, type: null })}
                    teachersCount={pageData.teachers.length}
                    width="500px"
                    height="300px"
                />
                <TeacherDetailsModal
                    isOpen={teacherDetailsModalOpen}
                    onClose={() => setTeacherDetailsModalOpen(false)}
                    teacher={selectedTeacher}
                    onResetPassword={handleTeacherResetPassword}
                    onEditSubjects={handleEditSubjects}
                />
            </Layout>
        </I18nProvider>
    );
};

export default TeachersPage;
