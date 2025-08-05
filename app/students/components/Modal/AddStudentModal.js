'use client';

import { useState } from 'react';

const AddStudentModal = ({ isOpen, onClose, onSubmit, teachers = [], subjects = [] }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    class: '',
    grade: '',
    userName: '',
    password: '',
    email: '',
    aptitudeLevel: '1 - highest',
    subjects: [],
    teachers: []
  });

  const [showTeacherSearch, setShowTeacherSearch] = useState(false);
  const [teacherSearchTerm, setTeacherSearchTerm] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTeacherSelect = (teacher) => {
    if (!formData.teachers.includes(teacher)) {
      setFormData(prev => ({
        ...prev,
        teachers: [...prev.teachers, teacher]
      }));
    }
    setShowTeacherSearch(false);
    setTeacherSearchTerm('');
  };

  const handleTeacherRemove = (teacher) => {
    setFormData(prev => ({
      ...prev,
      teachers: prev.teachers.filter(t => t !== teacher)
    }));
  };

  const filteredTeachers = teachers.filter(teacher =>
    teacher.toLowerCase().includes(teacherSearchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      firstName: '',
      lastName: '',
      class: '',
      grade: '',
      userName: '',
      password: '',
      email: '',
      aptitudeLevel: '1 - highest',
      subjects: [],
      teachers: []
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-[#1033583b]" onClick={onClose}></div>
      
      <div className="relative bg-white rounded-[29.98px] shadow-[0px_0px_8px_2px_rgba(9,161,218,0.1)] w-full max-w-[1000px] h-[700px] mx-auto overflow-hidden">
        {/* Header */}
        <div className="absolute left-[36px] top-[29px] flex items-center gap-4">
          <img src="/students/user-icons.svg" alt="add student icon" className="w-[17px] h-[19px]" />
          <h2 className="text-[20px] font-medium text-[#103358] leading-[24px] font-['Poppins']">
            Add a Student
          </h2>
        </div>

        {/* Close Button */}
        <div className="absolute right-[36px] top-[27px] cursor-pointer" onClick={onClose}>
          <img src="/students/close.svg" alt="close" className="w-[19.55px] h-[19.55px]" />
        </div>

        {/* Divider Line */}
        <div className="absolute left-[36px] top-[70px] w-[calc(100%-72px)] h-[1px] border border-[#D9E7EF]"></div>

        <form onSubmit={handleSubmit} className="absolute left-[36px] top-[84px] w-[calc(100%-72px)] h-[calc(100%-150px)]">
          {/* Personal Info Section */}
          <div className="mb-6">
            <h3 className="text-[18px] font-medium text-[#398AC8] leading-[24px] font-['Poppins'] mb-4">
              Personal Info
            </h3>

            {/* First Row */}
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px] mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full h-[48px] px-4 py-[14px] bg-white border border-[#103358] rounded-[8px] text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px] placeholder-opacity-20"
                  placeholder="Alya"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px] mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full h-[48px] px-4 py-[14px] bg-white border border-[#103358] rounded-[8px] text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px] placeholder-opacity-20"
                  placeholder="Osamn"
                  required
                />
              </div>
            </div>

            {/* Second Row */}
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px] mb-2">
                  Class
                </label>
                <input
                  type="text"
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  className="w-full h-[48px] px-4 py-[14px] bg-white border border-[#103358] rounded-[8px] text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px] placeholder-opacity-20"
                  placeholder="A"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px] mb-2">
                  Grade
                </label>
                <input
                  type="text"
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  className="w-full h-[48px] px-4 py-[14px] bg-white border border-[#103358] rounded-[8px] text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px] placeholder-opacity-20"
                  placeholder="1"
                  required
                />
              </div>
            </div>

            {/* Third Row */}
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px] mb-2">
                  User Name
                </label>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  className="w-full h-[48px] px-4 py-[14px] bg-white border border-[#103358] rounded-[8px] text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px] placeholder-opacity-20"
                  placeholder="aarum"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px] mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full h-[48px] px-4 py-[14px] bg-white border border-[#103358] rounded-[8px] text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px] placeholder-opacity-20"
                  placeholder="sadar{}@#4"
                  required
                />
              </div>
            </div>

            {/* Fourth Row */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-[48px] px-4 py-[14px] bg-white border border-[#103358] rounded-[8px] text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px] placeholder-opacity-20"
                  placeholder="alya@5steps.academy"
                  required
                />
              </div>
              <div className="flex-1 relative">
                <label className="block text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px] mb-2">
                  Aptitude Level
                </label>
                <select
                  name="aptitudeLevel"
                  value={formData.aptitudeLevel}
                  onChange={handleChange}
                  className="w-full h-[48px] px-4 py-[14px] bg-white border border-[#103358] rounded-[8px] text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px] appearance-none"
                >
                  <option value="1 - highest">1 - highest</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5 - lowest">5 - lowest</option>
                </select>
                <div className="absolute right-4 top-[38px] pointer-events-none">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Subjects Section */}
          <div className="mb-6 relative">
            <h3 className="text-[18px] font-medium text-[#398AC8] leading-[24px] font-['Poppins'] mb-4">
              Subjects
            </h3>
            <div className="mb-4">
              <label className="block text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] letter-spacing-[0.25px] mb-2">
                Add Subjects
              </label>
              <div className="relative">
                <div className="w-full max-w-[517px] h-[35px] bg-[#EBF3F9] rounded-[40px] relative">
                  <img src="/students/search.svg" alt="search" className="absolute left-5 top-[9px] w-[17px] h-[17px]" />
                  <input
                    type="text"
                    value={teacherSearchTerm}
                    onChange={(e) => {
                      setTeacherSearchTerm(e.target.value);
                      setShowTeacherSearch(true);
                    }}
                    onFocus={() => setShowTeacherSearch(true)}
                    placeholder="Search for a teacher by name, user name or email address"
                    className="absolute left-[49px] top-[6px] w-[calc(100%-70px)] h-[23px] bg-transparent text-[15px] font-light text-[#BDBDBD] leading-[22px] font-['Poppins'] outline-none placeholder-[#BDBDBD]"
                  />
                </div>

                {/* Teacher Search Dropdown */}
                {showTeacherSearch && teacherSearchTerm && (
                  <div className="absolute top-full left-0 w-full max-w-[379px] bg-white shadow-[0px_0px_14px_rgba(0,0,0,0.09)] rounded-[10px] z-20 mt-1 max-h-[190px] overflow-y-auto">
                    {filteredTeachers.length > 0 ? (
                      filteredTeachers.map((teacher, index) => (
                        <div
                          key={index}
                          onClick={() => handleTeacherSelect(teacher)}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins'] border-b border-gray-100 last:border-b-0"
                        >
                          {teacher}
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-[14px] font-normal text-[#9CA3AF] leading-[20px] font-['Poppins']">
                        No teachers found
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Selected Teachers Display */}
            {formData.teachers.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {formData.teachers.map((teacher, index) => (
                    <div key={index} className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-[6px]">
                      <img src="/students/red-trash.svg" alt="remove" className="w-4 h-4" />
                      <span className="text-[14px] font-normal text-[#374151] leading-[20px] font-['Poppins']">
                        {teacher}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleTeacherRemove(teacher)}
                        className="text-red-500 hover:text-red-700 ml-2"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Buttons - Fixed at bottom of modal */}
          <div className="absolute bottom-[20px] right-0 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="w-[92px] h-[40px] bg-[rgba(12,104,199,0.06)] border border-[#16375A] rounded-[8px] text-[16px] font-normal text-[#16375A] leading-[24px] font-['Poppins'] letter-spacing-[0.5px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-[92px] h-[40px] bg-[#16375A] text-white rounded-[8px] text-[16px] font-normal leading-[24px] font-['Poppins'] letter-spacing-[0.5px]"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudentModal;