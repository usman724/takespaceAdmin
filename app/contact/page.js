'use client';

import { useState } from 'react';
import Image from 'next/image';
import { toast, Toaster } from 'react-hot-toast';
import I18nProvider from '../components/providers/I18nProvider';
import Layout from '../components/layout/Layout';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Select from '../components/ui/Select';
import api from '../lib/api';

const roleTabs = ['Parent', 'Student', 'Teacher', 'Administrator', 'Other'];

export default function ContactSupportPage() {
  const [role, setRole] = useState('Administrator');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [about, setAbout] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset password modals
  const [showResetEmailModal, setShowResetEmailModal] = useState(false);
  const [showResetNewModal, setShowResetNewModal] = useState(false);

  // Recover username modals
  const [showRecoverEmailModal, setShowRecoverEmailModal] = useState(false);
  const [showRecoverResultModal, setShowRecoverResultModal] = useState(false);
  const [recoveredUsername, setRecoveredUsername] = useState('');

  const handleFileDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newFiles = Array.from(e.dataTransfer?.files || []);
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleBrowseFiles = (e) => {
    const newFiles = Array.from(e.target.files || []);
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const aboutOptions = [
    { label: 'Account management', value: 'account_management' },
    { label: 'Billing & subscription', value: 'billing' },
    { label: 'Technical issues', value: 'technical' },
    { label: 'Content & curriculum', value: 'content' },
    { label: 'Other', value: 'other' },
  ];

  // Map role to API format
  const getRoleForAPI = (role) => {
    const roleMap = {
      'Parent': 'parent',
      'Student': 'student', 
      'Teacher': 'teacher',
      'Administrator': 'admin',
      'Other': 'other'
    };
    return roleMap[role] || 'other';
  };

  // Form validation
  const validateForm = () => {
    if (!name.trim()) {
      toast.error('Name is required');
      return false;
    }
    if (!email.trim()) {
      toast.error('Email is required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (!username.trim()) {
      toast.error('Username is required');
      return false;
    }
    if (!phone.trim()) {
      toast.error('Phone number is required');
      return false;
    }
    if (!about) {
      toast.error('Please select what this is about');
      return false;
    }
    if (!subject.trim()) {
      toast.error('Subject is required');
      return false;
    }
    if (!description.trim()) {
      toast.error('Description is required');
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const ticketData = {
        full_name: name.trim(),
        username: username.trim(),
        email: email.trim(),
        phone: phone.trim(),
        type: 'account_management', // API only supports account_management
        subject: subject.trim(),
        message: description.trim(),
        attachment: files.length > 0 ? files[0] : null // For now, only support single file
      };

      const response = await api.createSupportTicket(ticketData);

      if (response.error) {
        toast.error(response.error.message || 'Failed to submit support ticket');
        return;
      }

      if (response.statusCode === 201) {
        toast.success('Support ticket submitted successfully! We\'ll get back to you within 1 business day.');
        
        // Reset form
        setName('');
        setEmail('');
        setUsername('');
        setPhone('');
        setAbout('');
        setSubject('');
        setDescription('');
        setFiles([]);
      } else {
        toast.error('Failed to submit support ticket. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting support ticket:', error);
      toast.error('An error occurred while submitting your ticket. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <I18nProvider>
      <Layout>
        <div className="min-h-screen bg-[#F7F9FC]">
          {/* Header */}
          <div className="relative h-64 overflow-hidden">
            <Image
              src="/contact/topheader.svg"
              alt="Header Background"
              fill
              className="object-cover"
              priority
            />

            <div className="relative z-10 h-full w-full flex flex-col items-center justify-center px-4 gap-4">
              <h1 className="text-white text-4xl sm:text-5xl font-bold font-['Objective'] text-center">Customer Support</h1>

              {/* Search bar (responsive) */}
              <div className="w-full flex justify-center">
                <div className="relative w-full max-w-[517px]">
                  <input
                    type="text"
                    placeholder="Search for a Subjects"
                    className="w-full h-[45px] rounded-full bg-[#EBF3F9] pl-12 pr-4 text-[15px] font-['Poppins'] placeholder-[#BDBDBD] text-[#103358] focus:outline-none focus:ring-2 focus:ring-white/40"
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 w-[17px] h-[17px]">
                    <Image src="/contact/search.svg" alt="search" width={17} height={17} />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="px-4 lg:px-10 xl:px-16 py-8">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left card */}
              <aside className="bg-white rounded-2xl shadow-[0_0_24px_1px_rgba(0,0,0,0.09)] p-6 w-full lg:w-[364px] self-start">
                <div className="flex flex-col gap-7">
                  <h3 className="text-[24px] leading-[25px] font-['Objective'] font-normal bg-gradient-to-r from-[#20507A] to-[#2F71A8] bg-clip-text text-transparent">Need help signing in?</h3>
                  <p className="text-[18px] leading-[19px] font-['Objective'] font-bold bg-gradient-to-r from-[#20507A] to-[#2F71A8] bg-clip-text text-transparent">Try the quick links below:</p>

                  <div className="flex flex-col gap-3">
                    <Button
                      variant="secondary"
                      className="w-full h-[42px] rounded-lg !bg-[#398AC8] gap-2"
                      onClick={() => setShowRecoverEmailModal(true)}
                    >
                      <Image src="/contact/person.svg" alt="recover" width={18} height={18} />
                      <span>Recover Username</span>
                    </Button>
                    <Button
                      variant="secondary"
                      className="w-full h-[42px] rounded-lg !bg-[#398AC8] gap-2"
                      onClick={() => setShowResetEmailModal(true)}
                    >
                      <Image src="/contact/reset.svg" alt="reset" width={18} height={18} />
                      <span>Reset Password</span>
                    </Button>
                  </div>

                  <h4 className="text-[20px] leading-[21px] font-['Objective'] font-normal bg-gradient-to-r from-[#20507A] to-[#2F71A8] bg-clip-text text-transparent">Need immediate assistance?</h4>
                  <p className="text-[16px] font-['Poppins'] bg-gradient-to-r from-[#20507A] to-[#2F71A8] bg-clip-text text-transparent">
                    Our help center has 100+ articles addressing frequently asked question
                  </p>
                  <button className="text-[#398AC8] underline text-[16px] font-['Poppins'] text-left">Visit Help Centre?</button>

                  <h4 className="text-[20px] leading-[21px] font-['Objective'] font-normal bg-gradient-to-r from-[#20507A] to-[#2F71A8] bg-clip-text text-transparent">Went support by phone?</h4>
                  <p className="text-[16px] font-['Poppins'] bg-gradient-to-r from-[#20507A] to-[#2F71A8] bg-clip-text text-transparent">
                    To speak with a member of our of our team, please call <span className="font-semibold">+6 8655 0005</span><br />
                    Mon - Fri 8AM - 8PM EST
                  </p>
                </div>
              </aside>

              {/* Right column - form */}
              <section className="flex-1">
                <form onSubmit={handleSubmit} className="bg-white rounded-[20px] shadow-[0_0_24px_1px_rgba(0,0,0,0.09)] p-6 sm:p-10">
                  <h2 className="text-3xl sm:text-4xl font-bold font-['Objective'] leading-tight text-[#103358]">Contact Us</h2>
                  <p className="text-[#666] mt-2 font-['Poppins']">
                    Welcome Please fill out the support form below, and our team of product experts will get back to you within 1 business day
                  </p>

                  {/* Articles link placeholder to mirror design */}
                  <h3 className="mt-8 text-[26px] font-['Objective'] text-[#3F3F3F]">Articles</h3>

                  {/* Contact information */}
                  <h4 className="mt-2 mb-4 text-lg font-['Objective'] text-[#3F3F3F]">Your contact information</h4>

                  {/* Role tabs */}
                  <div className="flex flex-wrap gap-3">
                    {roleTabs.map((item) => (
                      <button
                        key={item}
                        className={`rounded-[5px] h-10 px-[19px] py-[10px] border text-[16px] leading-5 font-['Poppins'] font-medium transition-colors ${
                          role === item
                            ? 'bg-[#103358] text-white border-transparent'
                            : 'bg-white text-[#398AC8] border-[#398AC8]'
                        }`}
                        onClick={() => setRole(item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>

                  {/* Two column basic info */}
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-[#103358] font-['Poppins']">Name</label>
                      <Input
                        placeholder="Alexandra Kuznetsov"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border-[#D1D5DB] text-[#103358] placeholder-[#BDBDBD]"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-[#103358] font-['Poppins']">Email Address</label>
                      <Input
                        type="email"
                        placeholder="doctorKuznbeut@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-[#D1D5DB] text-[#103358] placeholder-[#BDBDBD]"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-[#103358] font-['Poppins']">User Name</label>
                      <Input
                        placeholder="Admin"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border-[#D1D5DB] text-[#103358] placeholder-[#BDBDBD]"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-[#103358] font-['Poppins']">Phone Number</label>
                      <Input
                        type="tel"
                        placeholder="+876 0977655680"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="border-[#D1D5DB] text-[#103358] placeholder-[#BDBDBD]"
                      />
                    </div>
                  </div>

                  {/* What do you need help with */}
                  <h3 className="mt-8 text-[26px] font-['Objective'] text-[#3F3F3F]">What do you need help with?</h3>
                  <label className="block mt-3 mb-2 text-[#6B7280] font-['Poppins']">What is this about?</label>
                  <Select
                    options={aboutOptions}
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    placeholder="Account management"
                    className="max-w-full"
                  />

                  {/* How can we help */}
                  <h3 className="mt-8 text-[26px] font-['Objective'] text-[#3F3F3F]">How can we help?</h3>
                  <div className="mt-3">
                    <label className="block mb-2 text-[#103358] font-['Poppins']">Subject line</label>
                    <Input
                      placeholder="Account management"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="border-[#D1D5DB] text-[#103358] placeholder-[#BDBDBD]"
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block mb-2 text-[#103358] font-['Poppins']">Describe the issue you are experiencing</label>
                    <textarea
                      rows={6}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder=""
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#398AC8] focus:border-transparent text-[#103358]"
                    />
                  </div>

                  {/* Upload area */}
                  <div
                    className="mt-6 border-2 border-dashed border-[#8EC2EA] rounded-lg bg-[#F8FBFF] p-6 sm:p-10"
                    onDrop={handleFileDrop}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    <div className="flex flex-col items-center gap-3 text-center">
                      <Image src="/contact/upload.svg" alt="upload" width={40} height={40} />
                      <p className="font-['Poppins'] text-[#103358]">
                        Drag & drop files or <label className="text-[#398AC8] underline cursor-pointer"><input type="file" className="hidden" multiple onChange={handleBrowseFiles} />Browse</label>
                      </p>
                      <p className="text-sm text-[#9CA3AF] font-['Poppins']">Supported formats: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT</p>
                      {files.length > 0 && (
                        <div className="mt-2 text-sm text-[#103358] font-['Poppins']">{files.length} file(s) selected</div>
                      )}
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <Button 
                      type="submit"
                      variant="primary" 
                      className="px-8 h-12"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>
                  </div>
                </form>
              </section>
            </div>
          </div>

          {/* Recover Username - Step 1 (Email) */}
          <Modal
            isOpen={showRecoverEmailModal}
            onClose={() => setShowRecoverEmailModal(false)}
            className="w-[90vw] max-w-[455px] rounded-[29.98px] shadow-[0_0_8px_2px_rgba(9,161,218,0.1)] p-6"
          >
            <div className="relative">
              <h3 className="text-[#103358] font-['Poppins'] text-[20px] font-medium mb-4">Recover Username</h3>
              <div className="border-t border-[#D9E7EF] -mx-6 mb-4" />
              <label className="block text-[#374151] font-['Poppins'] mb-2">Email</label>
              <Input
                type="email"
                placeholder="example@gmail.com"
                className="border-[#103358] placeholder-[#C6C6C6]"
              />
              <div className="mt-6 flex justify-end gap-2">
                <Button variant="outline" className="h-10" onClick={() => setShowRecoverEmailModal(false)}>Cancel</Button>
                <Button
                  variant="primary"
                  className="h-10"
                  onClick={() => {
                    setShowRecoverEmailModal(false);
                    setRecoveredUsername('Jhoen Lisa');
                    setShowRecoverResultModal(true);
                  }}
                >
                  Save
                </Button>
              </div>
            </div>
          </Modal>

          {/* Recover Username - Step 2 (Result) */}
          <Modal
            isOpen={showRecoverResultModal}
            onClose={() => setShowRecoverResultModal(false)}
            className="w-[90vw] max-w-[455px] rounded-[29.98px] shadow-[0_0_8px_2px_rgba(9,161,218,0.1)] p-6"
          >
            <div className="relative">
              <h3 className="text-[#103358] font-['Poppins'] text-[20px] font-medium mb-4">Recover Username</h3>
              <div className="border-t border-[#D9E7EF] -mx-6 mb-4" />
              <label className="block text-[#374151] font-['Poppins'] mb-2">Username</label>
              <Input value={recoveredUsername} readOnly className="border-[#103358]" />
              <div className="mt-6 flex justify-end gap-2">
                <Button variant="outline" className="h-10" onClick={() => setShowRecoverResultModal(false)}>Cancel</Button>
                <Button variant="primary" className="h-10" onClick={() => setShowRecoverResultModal(false)}>Save</Button>
              </div>
            </div>
          </Modal>

          {/* Reset Password - Step 1 (Email) */}
          <Modal
            isOpen={showResetEmailModal}
            onClose={() => setShowResetEmailModal(false)}
            className="w-[90vw] max-w-[455px] rounded-[29.98px] shadow-[0_0_8px_2px_rgba(9,161,218,0.1)] p-6"
          >
            <div className="relative">
              <h3 className="text-[#103358] font-['Poppins'] text-[20px] font-medium mb-4">Reset Password</h3>
              <div className="border-t border-[#D9E7EF] -mx-6 mb-4" />
              <label className="block text-[#374151] font-['Poppins'] mb-2">Email</label>
              <Input type="email" placeholder="example@gmail.com" className="border-[#103358] placeholder-[#C6C6C6]" />
              <div className="mt-6 flex justify-end gap-2">
                <Button variant="outline" className="h-10" onClick={() => setShowResetEmailModal(false)}>Cancel</Button>
                <Button
                  variant="primary"
                  className="h-10"
                  onClick={() => {
                    setShowResetEmailModal(false);
                    setShowResetNewModal(true);
                  }}
                >
                  Save
                </Button>
              </div>
            </div>
          </Modal>

          {/* Reset Password - Step 2 (New password) */}
          <Modal
            isOpen={showResetNewModal}
            onClose={() => setShowResetNewModal(false)}
            className="w-[90vw] max-w-[455px] rounded-[29.98px] shadow-[0_0_8px_2px_rgba(9,161,218,0.1)] p-6"
          >
            <div className="relative">
              <h3 className="text-[#103358] font-['Poppins'] text-[20px] font-medium mb-4">Reset Password</h3>
              <div className="border-t border-[#D9E7EF] -mx-6 mb-4" />
              <div className="space-y-4">
                <div>
                  <label className="block text-[#374151] font-['Poppins'] mb-2">New Password</label>
                  <Input type="password" placeholder="********" className="border-[#103358] placeholder-[#C6C6C6]" />
                </div>
                <div>
                  <label className="block text-[#374151] font-['Poppins'] mb-2">Repeat New Password</label>
                  <Input type="password" placeholder="********" className="border-[#103358] placeholder-[#C6C6C6]" />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <Button variant="outline" className="h-10" onClick={() => setShowResetNewModal(false)}>Cancel</Button>
                <Button variant="primary" className="h-10" onClick={() => setShowResetNewModal(false)}>Save</Button>
              </div>
            </div>
          </Modal>
        </div>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 5000,
              style: {
                background: '#10B981',
                color: '#fff',
              },
            },
            error: {
              duration: 5000,
              style: {
                background: '#EF4444',
                color: '#fff',
              },
            },
          }}
        />
      </Layout>
    </I18nProvider>
  );
}


