'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../components/layout/Layout';
import I18nProvider from '../components/providers/I18nProvider';
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

const Table = ({ columns, data, onRowClick }) => (
  <div className="overflow-x-auto">
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-[#103358] text-white">
          {columns.map((col) => (
            <th key={col.key} className="px-6 py-4 text-left font-semibold">
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr 
            key={row.id} 
            className="border-b border-gray-200 bg-white hover:bg-gray-50 cursor-pointer"
            onClick={() => onRowClick && onRowClick(row)}
          >
            {columns.map((col) => (
              <td key={col.key} className="px-6 py-4">
                {col.render ? col.render(row) : row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// --- Modal Components ---

const AddTeacherModal = ({ isOpen, onClose, onSubmit, subjects }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', userName: '', subjects: [] });

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

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-3xl">
            <form onSubmit={handleSubmit} className="p-8">
                <h2 className="text-xl font-medium text-[#103358] mb-6">{t('addTeacher')}</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-medium text-[#398AC8] mb-4">{t('personalInfo')}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">{t('firstName')}</label>
                                <input type="text" name="firstName" onChange={handleChange} className="w-full p-3 border border-[#103358] rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">{t('lastName')}</label>
                                <input type="text" name="lastName" onChange={handleChange} className="w-full p-3 border border-[#103358] rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">{t('emailAddress')}</label>
                                <input type="email" name="email" onChange={handleChange} className="w-full p-3 border border-[#103358] rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">{t('userName')}</label>
                                <input type="text" name="userName" onChange={handleChange} className="w-full p-3 border border-[#103358] rounded-lg" />
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-[#D9E7EF] my-6"></div>
                    <div>
                        <h3 className="text-lg font-medium text-[#398AC8] mb-4">{t('subjects')}</h3>
                        <div className="flex flex-wrap gap-6">
                            {subjects.map(subject => (
                                <div key={subject} className="flex items-center">
                                    <input type="checkbox" id={subject} onChange={() => handleSubjectChange(subject)} className="w-5 h-5 border-[#103358] rounded" />
                                    <label htmlFor={subject} className="ml-2 text-sm text-gray-700">{t(subject.toLowerCase())}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-4 mt-8">
                    <button type="button" onClick={onClose} className="px-6 py-2 border border-[#16375A] text-[#16375A] rounded-lg">{t('cancel')}</button>
                    <button type="submit" className="px-6 py-2 bg-[#16375A] text-white rounded-lg">{t('submit')}</button>
                </div>
            </form>
        </Modal>
    );
};

const ResetPasswordModal = ({ isOpen, onClose, teachersCount }) => {
    const { t } = useTranslation();
    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-2xl">
            <div className="p-8">
                <h2 className="text-xl font-medium text-[#103358]">{t('resetPassword')}</h2>
                <div className="border-t border-[#D9E7EF] my-4"></div>
                <p className="text-gray-600">{t('resetPasswordWarning', { count: teachersCount })}</p>
                <div className="flex justify-end gap-4 mt-8">
                    <button onClick={onClose} className="px-6 py-2 border border-[#16375A] text-[#16375A] rounded-lg">{t('cancel')}</button>
                    <button onClick={onClose} className="px-6 py-2 bg-[#16375A] text-white rounded-lg">{t('resetPassword')}</button>
                </div>
            </div>
        </Modal>
    );
};


// --- Main Page Component ---

const TeachersPage = () => {
    const { t } = useTranslation();
    const [pageData, setPageData] = useState({ teachers: [], subjects: [] });
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState({ type: null, isOpen: false });
    const [deletedTeacher, setDeletedTeacher] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await api.getTeachersPageData();
                setPageData(data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleDelete = (teacherToDelete) => {
        setDeletedTeacher(teacherToDelete);
        setPageData(prev => ({
            ...prev,
            teachers: prev.teachers.filter(t => t.id !== teacherToDelete.id)
        }));
    };

    const handleRestore = () => {
        if (deletedTeacher) {
            setPageData(prev => ({
                ...prev,
                teachers: [...prev.teachers, deletedTeacher].sort((a, b) => a.id - b.id)
            }));
            setDeletedTeacher(null);
        }
    };

    const handleAddTeacher = (newTeacherData) => {
        const newTeacher = {
            id: pageData.teachers.length + 2, // simple id generation
            name: `${newTeacherData.firstName} ${newTeacherData.lastName}`,
            email: newTeacherData.email,
            totalStudents: 0,
            status: 'active',
        };
        setPageData(prev => ({
            ...prev,
            teachers: [...prev.teachers, newTeacher]
        }));
    };

    const columns = [
        { header: t('teacherName'), key: 'name' },
        { header: t('email'), key: 'email' },
        { header: t('totalStudents'), key: 'totalStudents' },
        {
            header: '',
            key: 'actions',
            render: (row) => (
                <button onClick={(e) => { e.stopPropagation(); handleDelete(row); }} className="text-red-500 hover:text-red-700">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                </button>
            )
        }
    ];

    if (loading) {
        return <I18nProvider><Layout><div className="flex justify-center items-center h-screen">{t('loading')}</div></Layout></I18nProvider>;
    }

    return (
        <I18nProvider>
            <Layout>
                <div className="p-8">
                    <header className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-semibold text-[#103358]">{t('teachers')}</h1>
                        <div className="flex items-center gap-4">
                            <button onClick={() => setModal({ type: 'add', isOpen: true })} className="flex items-center gap-2 px-4 py-2 bg-[#103358] text-white rounded-lg">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                                {t('addTeacher')}
                            </button>
                            {/* Filter and Options buttons can be implemented here */}
                        </div>
                    </header>

                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <Table columns={columns} data={pageData.teachers} />
                        {deletedTeacher && (
                            <div className="bg-[#398AC8] text-white flex justify-between items-center p-4">
                                <span>{t('teacherRemoved', { name: deletedTeacher.name })}</span>
                                <button onClick={handleRestore} className="font-semibold underline">{t('restore')}</button>
                            </div>
                        )}
                    </div>
                </div>

                {/* --- Modals --- */}
                <AddTeacherModal 
                    isOpen={modal.type === 'add' && modal.isOpen} 
                    onClose={() => setModal({ isOpen: false, type: null })}
                    onSubmit={handleAddTeacher}
                    subjects={pageData.subjects}
                />
                <ResetPasswordModal
                    isOpen={modal.type === 'reset' && modal.isOpen}
                    onClose={() => setModal({ isOpen: false, type: null })}
                    teachersCount={pageData.teachers.length}
                />
            </Layout>
        </I18nProvider>
    );
};

export default TeachersPage;
