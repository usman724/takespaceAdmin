'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { useTable, usePagination, useFilters, useSortBy } from 'react-table';
import Layout from '../components/layout/Layout';
import I18nProvider from '../components/providers/I18nProvider';
import { AddStudentModal, DeactivateStudentModal } from './components/Modal';
import StudentDetailsModal from './components/Modal/StudentDetailsModal';
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
// Filter Dropdown Component
const FilterDropdown = ({ isOpen, onClose, onApply, filterData, setFilterData }) => {
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
      <div ref={dropdownRef} className="bg-white shadow-[0px_0px_8px_2px_rgba(9,161,218,0.1)] rounded-[29.98px] w-[846px] h-[329px]">
        {/* Container */}
        <div className="absolute left-[35px] top-[35px] w-[776px] h-[182px] flex flex-col gap-6">
          
          {/* First Row - Status and Grade */}
          <div className="flex flex-row gap-4 w-[776px] h-[79px]">
            {/* Status Field */}
            <div className="w-[380px] h-[79px]">
              <label className="block text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px] mb-4">
                Status
              </label>
              <div className="relative">
                <select 
                  value={filterData.status} 
                  onChange={(e) => setFilterData(prev => ({...prev, status: e.target.value}))}
                  className="w-[380px] h-[48px] px-4 py-[14px] bg-white border border-[#103358] rounded-[8px] text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px] appearance-none"
                >
                  <option value="">Active Student</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-[15px] h-[9px]" viewBox="0 0 15 9" fill="none">
                    <path d="M1.5 1.5L7.5 7.5L13.5 1.5" stroke="#103358" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Grade Field */}
            <div className="w-[380px] h-[79px]">
              <label className="block text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px] mb-4">
                Grade
              </label>
              <div className="relative">
                <select 
                  value={filterData.grade} 
                  onChange={(e) => setFilterData(prev => ({...prev, grade: e.target.value}))}
                  className="w-[380px] h-[48px] px-4 py-[14px] bg-white border border-[#103358] rounded-[8px] text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px] appearance-none"
                >
                  <option value="">Any</option>
                  <option value="1">Grade 1</option>
                  <option value="2">Grade 2</option>
                  <option value="3">Grade 3</option>
                  <option value="4">Grade 4</option>
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-[15px] h-[9px]" viewBox="0 0 15 9" fill="none">
                    <path d="M1.5 1.5L7.5 7.5L13.5 1.5" stroke="#103358" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Second Row - Subject and Teacher */}
          <div className="flex flex-row gap-4 w-[776px] h-[79px]">
            {/* Subject Field */}
            <div className="w-[380px] h-[79px]">
              <label className="block text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px] mb-4">
                Subject
              </label>
              <div className="relative">
                <select 
                  value={filterData.subject} 
                  onChange={(e) => setFilterData(prev => ({...prev, subject: e.target.value}))}
                  className="w-[380px] h-[48px] px-4 py-[14px] bg-white border border-[#103358] rounded-[8px] text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px] appearance-none"
                >
                  <option value="">Any</option>
                  <option value="Maths">Maths</option>
                  <option value="English">English</option>
                  <option value="Science">Science</option>
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-[15px] h-[9px]" viewBox="0 0 15 9" fill="none">
                    <path d="M1.5 1.5L7.5 7.5L13.5 1.5" stroke="#103358" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Teacher Field */}
            <div className="w-[380px] h-[79px]">
              <label className="block text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px] mb-4">
                Teacher
              </label>
              <div className="relative">
                <select 
                  value={filterData.teacher} 
                  onChange={(e) => setFilterData(prev => ({...prev, teacher: e.target.value}))}
                  className="w-[380px] h-[48px] px-4 py-[14px] bg-white border border-[#103358] rounded-[8px] text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px] appearance-none"
                >
                  <option value="">All Teacher</option>
                  <option value="Doctor Alex">Doctor Alex</option>
                  <option value="Jane Cooper">Jane Cooper</option>
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-[15px] h-[9px]" viewBox="0 0 15 9" fill="none">
                    <path d="M1.5 1.5L7.5 7.5L13.5 1.5" stroke="#103358" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Apply Button */}
        <div className="absolute right-[35px] top-[254px] w-[80px] h-[40px]">
          <button 
            onClick={onApply}
            className="w-[80px] h-[40px] bg-[#16375A] text-white rounded-[8px] text-[16px] font-normal leading-[24px] font-['Poppins'] letter-spacing-[0.5px] flex items-center justify-center"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

// More Dropdown Component
const MoreDropdown = ({ isOpen, onClose, onExportCurrent, onExportAll, onUploadRoster, onDeactivateCurrent }) => {
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
      <div ref={dropdownRef} className="bg-white border border-[rgba(0,0,0,0.05)] shadow-[0px_0px_25px_rgba(0,0,0,0.05)] rounded-b-[10px] w-[300px]">
        <div className="py-1">
          <button 
            onClick={onExportCurrent}
            className="w-full text-left px-4 py-2 text-[14px] text-[#1D1D1D] font-normal hover:bg-gray-50 rounded"
          >
            Export the current list of students
          </button>
          <button 
            onClick={onExportAll}
            className="w-full text-left px-4 py-2 text-[14px] text-[#1D1D1D] font-normal hover:bg-gray-50 rounded"
          >
            Export all active student
          </button>
          <button 
            onClick={onUploadRoster}
            className="w-full text-left px-4 py-2 text-[14px] text-[#1D1D1D] font-normal hover:bg-gray-50 rounded"
          >
            Upload Roster
          </button>
          <button 
            onClick={onDeactivateCurrent}
            className="w-full text-left px-4 py-2 text-[14px] text-[#1D1D1D] font-normal hover:bg-gray-50 rounded"
          >
            Deactivate current list of student
          </button>
        </div>
      </div>
    </div>
  );
};

// React Table Component
const StudentsTable = ({ data, onDelete, onStudentClick, deletedStudent, onRestore }) => {
  const { t } = useTranslation();

  const columns = useMemo(() => [
    {
      Header: '#',
      accessor: 'id',
      Cell: ({ value, row }) => (
        <div className="flex items-center gap-2">
          <span className="text-[14px] leading-[24px] text-[#103358] font-normal font-['Poppins']">
            #
          </span>
          <img src="/students/chart.svg" alt="chart" className="w-5 h-5" />
        </div>
      )
    },
    {
      Header: 'Class',
      accessor: 'class',
      Cell: ({ value }) => (
        <span className="text-[14px] leading-[24px] text-[#103358] font-normal font-['Poppins']">
          {value}
        </span>
      )
    },
    {
      Header: 'First Name',
      accessor: 'firstName',
      Cell: ({ value }) => (
        <span className="text-[14px] leading-[24px] text-[#103358] font-normal font-['Poppins']">
          {value}
        </span>
      )
    },
    {
      Header: 'Last Name',
      accessor: 'lastName',
      Cell: ({ value }) => (
        <span className="text-[14px] leading-[24px] text-[#103358] font-normal font-['Poppins']">
          {value}
        </span>
      )
    },
    {
      Header: 'User Name',
      accessor: 'userName',
      Cell: ({ value }) => (
        <span className="text-[14px] leading-[24px] text-[#103358] font-normal font-['Poppins']">
          {value}
        </span>
      )
    },
    {
      Header: 'Email',
      accessor: 'email',
      Cell: ({ value }) => (
        <span className="text-[14px] leading-[24px] text-[#103358] font-normal font-['Poppins'] text-center">
          {value}
        </span>
      )
    },
    {
      Header: 'Grade',
      accessor: 'grade',
      Cell: ({ value }) => (
        <span className="text-[14px] leading-[24px] text-[#103358] font-normal font-['Poppins'] text-center">
          {value}
        </span>
      )
    },
    {
      Header: 'Subject',
      accessor: 'subjects',
      Cell: ({ value }) => (
        <div className="flex items-center gap-[9px] h-[44px]">
          {Array.isArray(value) ? value.map((subject, index) => (
            <div 
              key={index} 
              className={`flex flex-col justify-center items-center py-[10px] h-[44px] ${
                subject === 'M4' ? 'border-b border-[#398AC8] w-[21px]' : 
                subject === 'E6' ? 'border-b border-[#EB5757] w-[17px]' : 
                'border-b border-[#398AC8] w-[21px]'
              }`}
            >
              <span className="text-[14px] leading-[24px] text-[#103358] font-normal font-['Poppins']">
                {subject}
              </span>
            </div>
          )) : (
            <span className="text-[14px] leading-[24px] text-[#103358] font-normal font-['Poppins']">
              {value}
            </span>
          )}
        </div>
      )
    },
    {
      Header: 'Teacher',
      accessor: 'teachers',
      Cell: ({ value }) => (
        <span className="text-[14px] leading-[24px] text-[#103358] font-normal font-['Poppins']">
          {value}
        </span>
      )
    },
    {
      Header: 'Password',
      accessor: 'password',
      Cell: ({ value }) => (
        <span className="text-[14px] leading-[24px] text-[#103358] font-normal font-['Poppins']">
          Password
        </span>
      )
    },
    {
      Header: '',
      accessor: 'actions',
      Cell: ({ row }) => {
        const student = row.original;
        const isDeleted = deletedStudent && deletedStudent.id === student.id;
        
        return (
          <button 
            onClick={(e) => { 
              e.stopPropagation(); 
              if (!isDeleted) {
                onDelete(student); 
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
  ], [onDelete, deletedStudent]);

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

  // Calculate which pages to show (max 4 pages)
  const getVisiblePages = () => {
    const totalPages = pageCount;
    const currentPage = pageIndex + 1;
    
    if (totalPages <= 4) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    if (currentPage <= 2) {
      return [1, 2, 3, 4];
    }
    
    if (currentPage >= totalPages - 1) {
      return [totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    
    return [currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="overflow-x-auto">
      {/* Top Pagination */}
      {pageCount > 1 && (
        <div className="flex justify-end items-center gap-2 py-4 mb-4">
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className={`w-8 h-8 flex items-center justify-center text-[14px] font-normal leading-[20px] font-['Poppins'] ${
              canPreviousPage 
                ? 'text-[#103358] hover:bg-gray-100 rounded' 
                : 'text-gray-400 cursor-not-allowed'
            }`}
          >
            <img src="/common/arrowleft.svg" alt="Arrow left" className="w-4 h-4" />
          </button>
          
          {visiblePages.map((pageNum, index) => {
            const isActive = pageNum === pageIndex + 1;
            const isFirst = index === 0;
            const isLast = index === visiblePages.length - 1;
            const showEllipsisBefore = isFirst && pageNum > 1;
            const showEllipsisAfter = isLast && pageNum < pageCount;
            
            return (
              <div key={pageNum} className="flex items-center gap-1">
                {showEllipsisBefore && (
                  <span className="px-2 text-[#103358]">...</span>
                )}
                <button
                  onClick={() => gotoPage(pageNum - 1)}
                  className={`w-8 h-8 flex items-center justify-center text-[14px] font-normal leading-[20px] font-['Poppins'] ${
                    isActive 
                      ? 'bg-white border border-[#103358] rounded-[4px] text-[#103358]' 
                      : 'text-[#103358] hover:bg-gray-100 rounded'
                  }`}
                >
                  {pageNum}
                </button>
                {showEllipsisAfter && (
                  <span className="px-2 text-[#103358]">...</span>
                )}
              </div>
            );
          })}
          
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className={`w-8 h-8 flex items-center justify-center text-[14px] font-normal leading-[20px] font-['Poppins'] ${
              canNextPage 
                ? 'text-[#103358] hover:bg-gray-100 rounded' 
                : 'text-gray-400 cursor-not-allowed'
            }`}
          >
            <img src="/common/arrowright.svg" alt="Arrow right" className="w-4 h-4" />
          </button>
        </div>
      )}

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
          {page.map((row, rowIndex) => {
            prepareRow(row);
            const student = row.original;
            const isDeleted = deletedStudent && deletedStudent.id === student.id;
            const isEvenRow = rowIndex % 2 === 0;
            
            return (
              <tr 
                {...row.getRowProps()} 
                className={`border-b border-[#E0E0E0] h-[54px] ${
                  isDeleted ? 'bg-[#398AC8] text-white' : 
                  isEvenRow ? 'bg-white hover:bg-gray-50 cursor-pointer' : 
                  'bg-[#F8F9FA] hover:bg-gray-100 cursor-pointer'
                }`}
                onClick={!isDeleted ? () => onStudentClick(student) : undefined}
              >
                {isDeleted ? (
                  <td colSpan={11} className="px-6 py-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white text-[14px] leading-[24px] font-normal font-['Poppins']">
                        {deletedStudent.firstName} {deletedStudent.lastName}'s account has been deactivated. 
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onRestore();
                          }} 
                          className="text-white underline ml-2"
                        >
                          Restore
                        </button>
                      </span>
                    </div>
                  </td>
                ) : (
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
      
      {/* Bottom Pagination */}
      {pageCount > 1 && (
        <div className="flex justify-end items-center gap-2 py-4 mt-4">
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className={`w-8 h-8 flex items-center justify-center text-[14px] font-normal leading-[20px] font-['Poppins'] ${
              canPreviousPage 
                ? 'text-[#103358] hover:bg-gray-100 rounded' 
                : 'text-gray-400 cursor-not-allowed'
            }`}
          >
            <img src="/common/arrowleft.svg" alt="Arrow left" className="w-4 h-4" />
          </button>
          
          {visiblePages.map((pageNum, index) => {
            const isActive = pageNum === pageIndex + 1;
            const isFirst = index === 0;
            const isLast = index === visiblePages.length - 1;
            const showEllipsisBefore = isFirst && pageNum > 1;
            const showEllipsisAfter = isLast && pageNum < pageCount;
            
            return (
              <div key={pageNum} className="flex items-center gap-1">
                {showEllipsisBefore && (
                  <span className="px-2 text-[#103358]">...</span>
                )}
                <button
                  onClick={() => gotoPage(pageNum - 1)}
                  className={`w-8 h-8 flex items-center justify-center text-[14px] font-normal leading-[20px] font-['Poppins'] ${
                    isActive 
                      ? 'bg-white border border-[#103358] rounded-[4px] text-[#103358]' 
                      : 'text-[#103358] hover:bg-gray-100 rounded'
                  }`}
                >
                  {pageNum}
                </button>
                {showEllipsisAfter && (
                  <span className="px-2 text-[#103358]">...</span>
                )}
              </div>
            );
          })}
          
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className={`w-8 h-8 flex items-center justify-center text-[14px] font-normal leading-[20px] font-['Poppins'] ${
              canNextPage 
                ? 'text-[#103358] hover:bg-gray-100 rounded' 
                : 'text-gray-400 cursor-not-allowed'
            }`}
          >
            <img src="/common/arrowright.svg" alt="Arrow right" className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

// --- Main Page Component ---

const StudentsPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [pageData, setPageData] = useState({ students: [], teachers: [], subjects: [] });
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ type: null, isOpen: false });
  const [deletedStudent, setDeletedStudent] = useState(null);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [filterData, setFilterData] = useState({
    status: '',
    grade: '',
    subject: '',
    teacher: ''
  });
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentDetailsModalOpen, setStudentDetailsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Mock data for students
        const mockStudentsData = {
          students: [
            {
              id: 1,
              class: 'A',
              firstName: 'Alexandra',
              lastName: 'Bander',
              userName: 'Bloom',
              email: 'abddf@gmail.com',
              grade: '4',
              subjects: ['M4', 'E6'],
              teachers: 'Alexandra, Ha...',
              password: 'Password',
              status: 'active',
              aptitudeLevel: '2',
              accountCreated: '20/12/22',
              lastUpdated: '26/12/22'
            },
            {
              id: 2,
              class: 'A',
              firstName: 'Stylianos',
              lastName: 'Angelakis',
              userName: 'StyAngel',
              email: 'stylianos@gmail.com',
              grade: '4',
              subjects: ['M4', 'E6'],
              teachers: 'Doctor Alex',
              password: 'Password',
              status: 'deactivated',
              aptitudeLevel: '3',
              accountCreated: '15/11/22',
              lastUpdated: '20/12/22'
            }
          ],
          teachers: ['Doctor Alex', 'Annette Black', 'Kathryn Murphy', 'Jerome Bell', 'Savannah Nguyen', 'Jane Cooper'],
          subjects: ['Maths', 'English Language', 'Science', 'Geography', 'History']
        };
        
        setPageData(mockStudentsData);
        setFilteredStudents(mockStudentsData.students);
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
    let filtered = pageData.students;
    
    if (filterData.status) {
      filtered = filtered.filter(student => student.status === filterData.status);
    }
    if (filterData.grade) {
      filtered = filtered.filter(student => student.grade === filterData.grade);
    }
    if (filterData.subject) {
      filtered = filtered.filter(student => 
        student.subjects && student.subjects.some(subject => subject.includes(filterData.subject))
      );
    }
    if (filterData.teacher) {
      filtered = filtered.filter(student => 
        student.teachers && student.teachers.includes(filterData.teacher)
      );
    }
    
    setFilteredStudents(filtered);
    setFilterDropdownOpen(false);
  };

  const handleDelete = (studentToDelete) => {
    const updatedStudent = { ...studentToDelete, status: 'deactivated' };
    setDeletedStudent(updatedStudent);
    
    setPageData(prev => ({
      ...prev,
      students: prev.students.map(s => 
        s.id === studentToDelete.id ? updatedStudent : s
      )
    }));
    setFilteredStudents(prev => prev.map(s => 
      s.id === studentToDelete.id ? updatedStudent : s
    ));
  };

  const handleRestore = () => {
    if (deletedStudent) {
      const restoredStudent = { ...deletedStudent, status: 'active' };
      
      setPageData(prev => ({
        ...prev,
        students: prev.students.map(s => 
          s.id === deletedStudent.id ? restoredStudent : s
        )
      }));
      setFilteredStudents(prev => prev.map(s => 
        s.id === deletedStudent.id ? restoredStudent : s
      ));
      setDeletedStudent(null);
    }
  };

  const handleAddStudent = (newStudentData) => {
    const newStudent = {
      id: pageData.students.length + 1,
      class: newStudentData.class,
      firstName: newStudentData.firstName,
      lastName: newStudentData.lastName,
      userName: newStudentData.userName,
      email: newStudentData.email,
      grade: newStudentData.grade,
      subjects: newStudentData.subjects,
      teachers: newStudentData.teachers.join(', '),
      password: newStudentData.password,
      status: 'active',
      aptitudeLevel: newStudentData.aptitudeLevel,
      accountCreated: new Date().toLocaleDateString(),
      lastUpdated: new Date().toLocaleDateString()
    };
    
    setPageData(prev => ({
      ...prev,
      students: [...prev.students, newStudent]
    }));
    setFilteredStudents(prev => [...prev, newStudent]);
  };

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    setStudentDetailsModalOpen(true);
  };

  const handleClearRoster = () => {
    // Clear roster functionality
    console.log('Clear roster clicked');
  };

  const handleHelpClick = () => {
    router.push('/help');
  };

  const handleExportCurrent = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "First Name,Last Name,Email,Grade,Class\n"
      + filteredStudents.map(student => 
          `${student.firstName},${student.lastName},${student.email},${student.grade},${student.class}`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "current_students_list.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setMoreDropdownOpen(false);
  };

  const handleExportAll = () => {
    const activeStudents = pageData.students.filter(s => s.status === 'active');
    const csvContent = "data:text/csv;charset=utf-8," 
      + "First Name,Last Name,Email,Grade,Class\n"
      + activeStudents.map(student => 
          `${student.firstName},${student.lastName},${student.email},${student.grade},${student.class}`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "all_active_students.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setMoreDropdownOpen(false);
  };

  const handleUploadRoster = () => {
    // Upload roster functionality
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.onchange = (e) => {
      const file = e.target.files[0];
      console.log('File selected:', file);
    };
    input.click();
    setMoreDropdownOpen(false);
  };

  const handleDeactivateCurrent = () => {
    setModal({ type: 'deactivate', isOpen: true });
    setMoreDropdownOpen(false);
  };

  if (loading) {
    return (
      <I18nProvider>
        <Layout>
          <div className="flex justify-center items-center h-screen">Loading...</div></Layout>
     </I18nProvider>
   );
 }

 return (
   <I18nProvider>
     <Layout>
       <div className="p-8">
         {/* Header Section */}
         <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
           {/* Students Heading */}
           <h1 className="text-[22px] font-semibold text-[#103358] leading-[27px] font-['Inter']">
             Students
           </h1>
           
           {/* Right side buttons */}
           <div className="flex items-center gap-2 sm:gap-4">
             {/* Add Student Button */}
             <button 
               onClick={() => setModal({ type: 'add', isOpen: true })} 
               className="flex items-center justify-center gap-[10px] px-[19px] py-[10px] bg-[#103358] text-white rounded-[5px] w-[166px] h-[40px]"
             >
               <img src="/students/add-student.svg" alt="Add Student" className="w-5 h-5" />
               <span className="text-[14px] font-bold leading-[20px]">
                 Add a Student
               </span>
             </button>
             
             {/* Info Icon */}
             <button 
               onClick={handleHelpClick}
               className="w-[40px] h-[40px]"
             >
               <img src="/students/info.svg" alt="Info" className="w-[40px] h-[40px]" />
             </button>
           </div>
         </header>

         {/* Clear Roster and Actions Section */}
         <div className="flex flex-col lg:justify-between sm:flex-row items-start sm:items-center gap-4 mb-6">
           {/* Clear Roster Button */}
           <button 
             onClick={handleClearRoster}
             className="flex items-center justify-center gap-[10px] px-[19px] py-[10px] bg-white border border-[#F2F2F2] rounded-[10px] h-[40px]"
           >
             <img src="/students/trash.svg" alt="Clear" className="w-[15px] h-[17px]" />
             <span className="text-[14px] font-normal leading-[20px] text-[#103358] font-['Poppins']">
               Clear Roster
             </span>
             <img src="/students/arrowdown.svg" alt="Arrow down" className="w-[15px] h-[17px]" />
           </button>

        
        <div className="flex items-center gap-4">
  {/* Filter Button */}
  <div className="relative">
    <button
      onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
      className={`flex items-center justify-center gap-[10px] px-[19px] py-[10px] rounded-[10px] w-[119.83px] h-[40px] ${
        filterDropdownOpen 
          ? 'bg-[#398AC8] border border-[#398AC8] text-white' 
          : 'bg-white border border-[#F2F2F2] text-[#103358]'
      }`}
    >
      <img 
        src={filterDropdownOpen ? "/students/filter-white.svg" : "/students/filter.svg"} 
        alt="Filter icon" 
        className="w-[17px] h-[17px]" 
      />
      <span className="text-[14px] font-normal leading-[20px] font-['Poppins']">
        Filter
      </span>
      <img 
        src={filterDropdownOpen ? "/students/arrowdown-white.svg" : "/students/arrowdown.svg"} 
        alt="Arrow down" 
        className="w-[11.83px] h-[6.73px]" 
      />
    </button>
    
    <FilterDropdown
      isOpen={filterDropdownOpen}
      onClose={() => setFilterDropdownOpen(false)}
      onApply={applyFilter}
      filterData={filterData}
      setFilterData={setFilterData}
    />
  </div>

  {/* More Button */}
  <div className="relative">
    <button
      onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
      className={`flex items-center justify-center gap-[10px] px-[19px] py-[10px] rounded-[10px] w-[119.83px] h-[40px] ${
        moreDropdownOpen 
          ? 'bg-[#398AC8] border border-[#398AC8] text-white' 
          : 'bg-white border border-[#F2F2F2] text-[#103358]'
      }`}
    >
      <span className="text-[14px] font-normal leading-[20px] font-['Poppins']">
        More
      </span>
      <img 
        src={moreDropdownOpen ? "/students/arrowdown-white.svg" : "/students/arrowdown.svg"} 
        alt="Arrow down" 
        className="w-[11.83px] h-[6.73px]" 
      />
    </button>
    
    <MoreDropdown
      isOpen={moreDropdownOpen}
      onClose={() => setMoreDropdownOpen(false)}
      onExportCurrent={handleExportCurrent}
      onExportAll={handleExportAll}
      onUploadRoster={handleUploadRoster}
      onDeactivateCurrent={handleDeactivateCurrent}
    />
  </div>
</div>
         </div>

         {/* Table Section */}
         <div className="bg-white rounded-xl shadow-md overflow-hidden">
           <StudentsTable 
             data={filteredStudents} 
             onDelete={handleDelete}
             onStudentClick={handleStudentClick}
             deletedStudent={deletedStudent}
             onRestore={handleRestore}
           />
         </div>
       </div>

       {/* --- Modals --- */}
       <AddStudentModal 
         isOpen={modal.type === 'add' && modal.isOpen} 
         onClose={() => setModal({ isOpen: false, type: null })}
         onSubmit={handleAddStudent}
         teachers={pageData.teachers}
         subjects={pageData.subjects}
       />
       
       <DeactivateStudentModal
         isOpen={modal.type === 'deactivate' && modal.isOpen}
         onClose={() => setModal({ isOpen: false, type: null })}
         studentsCount={filteredStudents.length}
       />
       
       <StudentDetailsModal
         isOpen={studentDetailsModalOpen}
         onClose={() => setStudentDetailsModalOpen(false)}
         student={selectedStudent}
         teachers={pageData.teachers}
         subjects={pageData.subjects}
       />
     </Layout>
   </I18nProvider>
 );
};

export default StudentsPage;