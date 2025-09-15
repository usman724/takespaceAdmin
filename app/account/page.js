'use client';

import { useRef, useState, useEffect } from 'react';
import Modal from '../components/ui/Modal';
import Layout from '../components/layout/Layout';
import { api } from '../lib/api';

const sectionLinkId = (label) => label.toLowerCase().replace(/[^a-z0-9]+/g, '-');

const AccountSidebar = ({ selected, onSelect }) => {
  const items = [
    { label: 'First Day Of School', icon: '/account/sidebar/book.svg' },
    { label: 'Time Zone', icon: '/account/sidebar/clock.svg' },
    { label: 'Goals', icon: '/account/sidebar/goal.svg' },
    { label: 'Custom Sign-in-page', icon: '/account/sidebar/customsignin.svg' },
    { label: 'Account Contacts', icon: '/account/sidebar/accountcontract.svg' },
    { label: 'Current Subscriptions', icon: '/account/sidebar/subscription.svg' },
    { label: 'Username & Password', icon: '/account/sidebar/newpassword.svg' }
  ];

  return (
    <aside
      className="fixed left-0 bg-white border-r border-gray-200 hidden md:block"
      style={{ top: '100px', height: 'calc(100vh - 100px - var(--footer-height))', width: '250px' }}
    >
      <div className="h-full py-6">
        <div className="mb-6 text-[#103358] font-semibold px-[21px]" style={{ fontFamily: 'Poppins, sans-serif' }}>Account</div>
        <nav className="space-y-0">
          {items.map((item) => {
            const isActive = selected === item.label;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => onSelect(item.label)}
                className="block w-full text-left"
              >
                <div
                  style={{
                    width: '249px',
                    height: '67px',
                    background: isActive ? '#EBF3F9' : 'transparent',
                    borderRadius: 0
                  }}
                >
                  <div className="px-[21px] h-full flex items-center">
                    <div className="relative" style={{ width: '186px', height: '24px' }}>
                      <div className="absolute left-0 top-0 w-[22px] h-[22px]">
                        <img src={item.icon} alt="" className="w-[22px] h-[22px]" />
                      </div>
                      <div className="absolute" style={{ left: '34px', top: '2px', width: 'calc(186px - 34px)' }}>
                        <span
                          className="block truncate"
                          style={{
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 400,
                            fontSize: '14px',
                            lineHeight: '20px',
                            color: isActive ? '#103358' : '#4F4F4F'
                          }}
                        >
                          {item.label}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {!isActive && (
                  <div className="px-[21px]" aria-hidden>
                    <div style={{ width: '186px', borderTop: '1px solid #F2F2F2' }} />
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

const Label = ({ children }) => (
  <label className="block text-[#103358] mb-2" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
    {children}
  </label>
);

const Input = ({ placeholder, rightIcon }) => (
  <div className="relative w-full max-w-[324px]">
    <input
      className="w-full h-[43px] bg-[#F7F7F7] rounded-md px-3 text-[14px] placeholder-[#B0B0B0]"
      placeholder={placeholder}
    />
    {rightIcon && (
      <img src={rightIcon} alt="" className="absolute right-2 top-1/2 -translate-y-1/2 w-[21px] h-[21px]" />
    )}
  </div>
);

const Divider = () => (
  <div className="w-full" style={{ borderTop: '1px solid #E5E5EF' }} />
);

const TableHeader = ({ columns }) => (
  <div
    className="grid grid-cols-4 px-4 items-center text-white"
    style={{ background: '#398AC8', height: '52px', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
  >
    {columns.map((c) => (
      <div key={c} className="text-sm" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
        {c}
      </div>
    ))}
  </div>
);

const TableRow = ({ values, last = false }) => (
  <div
    className="grid grid-cols-4 px-4 items-center text-[#103358]"
    style={{ background: '#F9F9F9', height: '52px', borderBottomLeftRadius: last ? '8px' : 0, borderBottomRightRadius: last ? '8px' : 0 }}
  >
    {values.map((v, i) => (
      <div key={i} className="text-sm truncate" style={{ fontFamily: 'Poppins, sans-serif' }}>
        {v}
      </div>
    ))}
  </div>
);

export default function AccountPage() {
  const [selected, setSelected] = useState(null); // null => show all sections on load
  
  // Organization data state
  const [organizationData, setOrganizationData] = useState({
    current_school_year_first_day: '',
    next_school_year_first_day: '',
    opening_hours: '08:00:00',
    closing_hours: '17:00:00',
    timezone: 'Asia/Singapore',
    practice_time_per_week_in_hours: 5,
    topics_mastered_per_week: 5,
    desired_mark: 75.0,
    login_url_name: '',
    login_welcome_header: '',
    login_welcome_message: ''
  });

  // UI state
  const [currentYearDate, setCurrentYearDate] = useState('');
  const [nextYearDate, setNextYearDate] = useState('');
  const [tz, setTz] = useState('GMT + 08:00 Singapore');
  const [goalPractice, setGoalPractice] = useState('5');
  const [goalTopics, setGoalTopics] = useState('5');
  const [goalMark, setGoalMark] = useState('75');
  const [pageName, setPageName] = useState('');
  const [username, setUsername] = useState('admin');
  const [passwordMask] = useState('••••••••');

  // Refs for date pickers so clicking the icon opens the picker
  const currentDateRef = useRef(null);
  const nextDateRef = useRef(null);

  // API data state
  const [contacts, setContacts] = useState([]);
  const [subscriptions] = useState([
    { purchasedAccess: '175 for 5 Steps Syllabus', allocatedTo: 'Grades 1- 10', licensesUsed: '165 of 175', note: '' },
    { purchasedAccess: '', allocatedTo: '', licensesUsed: '165 of 175', note: 'Licenses Used' }
  ]);

  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Upload modal state
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadFiles, setUploadFiles] = useState([]); // {name,size,progress,status}

  // Welcome message modal state
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState('');

  // Change password modal
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  // Contact editing state
  const [editingContact, setEditingContact] = useState(null);
  const [contactFormData, setContactFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    organization_role: ''
  });

  // Load organization data on component mount
  useEffect(() => {
    loadOrganizationData();
    loadContacts();
  }, []);

  const loadOrganizationData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.getOrganizationDetails();
      
      if (response.data) {
        setOrganizationData(response.data);
        
        // Update UI state with API data
        if (response.data.current_school_year_first_day) {
          const currentDate = new Date(response.data.current_school_year_first_day);
          setCurrentYearDate(currentDate.toISOString().split('T')[0]);
        }
        if (response.data.next_school_year_first_day) {
          const nextDate = new Date(response.data.next_school_year_first_day);
          setNextYearDate(nextDate.toISOString().split('T')[0]);
        }
        
        setTz(response.data.timezone || 'GMT + 08:00 Singapore');
        setGoalPractice(response.data.practice_time_per_week_in_hours?.toString() || '5');
        setGoalTopics(response.data.topics_mastered_per_week?.toString() || '5');
        setGoalMark(response.data.desired_mark?.toString() || '75');
        setPageName(response.data.login_url_name || '');
        setWelcomeMessage(response.data.login_welcome_message || '');
      }
    } catch (err) {
      console.error('Error loading organization data:', err);
      setError('Failed to load organization data');
    } finally {
      setLoading(false);
    }
  };

  const loadContacts = async () => {
    try {
      const response = await api.getAccountContacts();
      if (response.data) {
        setContacts(response.data);
      }
    } catch (err) {
      console.error('Error loading contacts:', err);
    }
  };

  const saveOrganizationData = async () => {
    try {
      setSaving(true);
      setError(null);
      
      const dataToSave = {
        ...organizationData,
        current_school_year_first_day: currentYearDate ? new Date(currentYearDate).toISOString() : organizationData.current_school_year_first_day,
        next_school_year_first_day: nextYearDate ? new Date(nextYearDate).toISOString() : organizationData.next_school_year_first_day,
        practice_time_per_week_in_hours: parseInt(goalPractice) || organizationData.practice_time_per_week_in_hours,
        topics_mastered_per_week: parseInt(goalTopics) || organizationData.topics_mastered_per_week,
        desired_mark: parseFloat(goalMark) || organizationData.desired_mark,
        login_url_name: pageName || organizationData.login_url_name,
        login_welcome_message: welcomeMessage || organizationData.login_welcome_message
      };

      await api.updateOrganizationDetails(dataToSave);
      setSuccessMessage('Organization details updated successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Error saving organization data:', err);
      setError('Failed to save organization data');
    } finally {
      setSaving(false);
    }
  };

  const handleLogoUpload = async (file) => {
    try {
      setSaving(true);
      setError(null);
      await api.updateOrganizationLogo(file);
      setSuccessMessage('Logo updated successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Error uploading logo:', err);
      setError('Failed to upload logo');
    } finally {
      setSaving(false);
    }
  };

  const handleContactUpdate = async (contactId, contactData) => {
    try {
      setSaving(true);
      setError(null);
      await api.updateAccountContact(contactId, contactData);
      setSuccessMessage('Contact updated successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
      loadContacts(); // Reload contacts
    } catch (err) {
      console.error('Error updating contact:', err);
      setError('Failed to update contact');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordUpdate = async () => {
    if (newPassword !== repeatPassword) {
      setError('New passwords do not match');
      return;
    }
    
    try {
      setSaving(true);
      setError(null);
      await api.updatePassword({
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: repeatPassword
      });
      setSuccessMessage('Password updated successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
      setIsPasswordOpen(false);
      setCurrentPassword('');
      setNewPassword('');
      setRepeatPassword('');
    } catch (err) {
      console.error('Error updating password:', err);
      setError('Failed to update password');
    } finally {
      setSaving(false);
    }
  };

  const onBrowseFiles = (files) => {
    const mapped = Array.from(files).map((f) => ({
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      name: f.name,
      size: f.size,
      progress: 0,
      status: 'uploading',
      file: f
    }));
    setUploadFiles((prev) => [...prev, ...mapped]);
    
    // Handle actual file upload
    mapped.forEach((fileObj, idx) => {
      const interval = setInterval(() => {
        setUploadFiles((prev) =>
          prev.map((item) =>
            item.id === fileObj.id
              ? {
                  ...item,
                  progress: Math.min(100, item.progress + 8),
                  status: item.progress + 8 >= 100 ? 'completed' : item.status
                }
              : item
          )
        );
      }, 150);
      
      // Upload the file when progress reaches 100%
      setTimeout(() => {
        clearInterval(interval);
        if (fileObj.file) {
          handleLogoUpload(fileObj.file);
        }
      }, 2500 + idx * 200);
    });
  };

  const removeUpload = (i) => setUploadFiles((prev) => prev.filter((_, idx) => idx !== i));

  const startEditingContact = (contact) => {
    setEditingContact(contact.id);
    setContactFormData({
      full_name: contact.full_name,
      email: contact.email,
      phone: contact.phone,
      organization_role: contact.organization_role
    });
  };

  const saveContactEdit = () => {
    if (editingContact) {
      handleContactUpdate(editingContact, contactFormData);
      setEditingContact(null);
    }
  };

  const cancelContactEdit = () => {
    setEditingContact(null);
    setContactFormData({
      full_name: '',
      email: '',
      phone: '',
      organization_role: ''
    });
  };

  return (
    <Layout>
      {/* Sidebar (only on md+) */}
      <AccountSidebar selected={selected} onSelect={(label) => setSelected(prev => (prev === label ? null : label))} />

      {/* Content */}
      <div className="px-4 md:pl-[280px] md:pr-8 pt-6 md:pt-10" style={{ paddingBottom: 'calc(var(--footer-height) + 24px)' }}>
        <div className="relative">
          {/* Title + info icon outside white container */}
          <div className="w-full flex items-center justify-between mb-4">
            <h2 className="text-[#103358] text-2xl md:text-[32px] font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Account Details
            </h2>
            <img src="/account/info.svg" alt="info" className="w-7 h-7" />
          </div>
          {/* Mobile selector */}
          <div className="md:hidden mb-4">
            <select
              value={selected || ''}
              onChange={(e) => setSelected(e.target.value === '' ? null : e.target.value)}
              className="w-full h-[43px] bg-[#F7F7F7] rounded-md px-3 text-[14px] text-[#103358]"
            >
              <option value="">All Sections</option>
              {['First Day Of School','Time Zone','Goals','Custom Sign-in-page','Account Contacts','Current Subscriptions','Username & Password'].map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-8 md:p-10">
            {/* Error and Success Messages */}
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
            {successMessage && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
                <p className="text-green-600 text-sm">{successMessage}</p>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-8">
                <div className="text-[#103358]">Loading organization data...</div>
              </div>
            )}

            {/* First Day Of School */}
            {!loading && (!selected || selected === 'First Day Of School') && (
            <section id={sectionLinkId('First Day Of School')} className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[#103358] text-lg font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  First Day Of School
                </h3>
                <button
                  onClick={saveOrganizationData}
                  disabled={saving}
                  className="bg-[#398AC8] text-white px-4 py-2 rounded-md text-sm hover:bg-[#2c6a9a] disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-[#4F4F4F] text-sm mb-2">Current school year (2025)</div>
                  <div className="relative w-full max-w-[324px]">
                    <input
                      ref={currentDateRef}
                      type="date"
                      value={currentYearDate}
                      onChange={(e)=>setCurrentYearDate(e.target.value)}
                      className="w-full h-[43px] bg-[#F7F7F7] rounded-md px-3 text-[14px] text-black"
                    />
                    <img
                      src="/account/calender.svg"
                      alt=""
                      onClick={() => currentDateRef.current?.showPicker ? currentDateRef.current.showPicker() : currentDateRef.current?.focus()}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-[21px] h-[21px] cursor-pointer"
                    />
                  </div>
                </div>
                <div>
                  <div className="text-[#4F4F4F] text-sm mb-2">Next school year (2025)</div>
                  <div className="relative w-full max-w-[324px]">
                    <input
                      ref={nextDateRef}
                      type="date"
                      value={nextYearDate}
                      onChange={(e)=>setNextYearDate(e.target.value)}
                      className="w-full h-[43px] bg-[#F7F7F7] rounded-md px-3 text-[14px] text-black"
                    />
                    <img
                      src="/account/calender.svg"
                      alt=""
                      onClick={() => nextDateRef.current?.showPicker ? nextDateRef.current.showPicker() : nextDateRef.current?.focus()}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-[21px] h-[21px] cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </section>
            )}

            {selected == null && <Divider />}

            {/* Time Zone */}
            {!loading && (!selected || selected === 'Time Zone') && (
            <section id={sectionLinkId('Time Zone')} className="py-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[#103358] text-lg font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Time Zone
                </h3>
                <button
                  onClick={saveOrganizationData}
                  disabled={saving}
                  className="bg-[#398AC8] text-white px-4 py-2 rounded-md text-sm hover:bg-[#2c6a9a] disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
              <div className="text-[#4F4F4F] text-sm mb-2">Current: {organizationData.timezone}</div>
              <div className="relative w-full max-w-[324px] p-3">
                <select 
                  value={tz} 
                  onChange={(e) => {
                    setTz(e.target.value);
                    setOrganizationData(prev => ({ ...prev, timezone: e.target.value }));
                  }} 
                  className="w-full h-[43px] bg-[#F7F7F7] rounded-md pl-3 pr-9 text-[14px] text-black"
                >
                  <option value="Asia/Singapore">GMT + 08:00 Singapore</option>
                  <option value="Asia/Bangkok">GMT + 07:00 Bangkok</option>
                  <option value="Asia/Kolkata">GMT + 05:30 India</option>
                </select>
              </div>
            </section>
            )}
            {selected == null && <Divider />}

            {/* Goals */}
            {!loading && (!selected || selected === 'Goals') && (
            <section id={sectionLinkId('Goals')} className="py-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[#103358] text-lg font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Goals
                </h3>
                <button
                  onClick={saveOrganizationData}
                  disabled={saving}
                  className="bg-[#398AC8] text-white px-4 py-2 rounded-md text-sm hover:bg-[#2c6a9a] disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="text-[#103358] font-semibold mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>Practice Time</div>
                  <div className="text-[#4F4F4F] text-sm mb-2">Per week, in hours (1-168)</div>
                  <input 
                    type="number"
                    min="1"
                    max="168"
                    value={goalPractice} 
                    onChange={(e)=>setGoalPractice(e.target.value)} 
                    className="w-full max-w-[324px] h-[43px] bg-[#F7F7F7] rounded-md px-3 text-[14px] text-black" 
                  />
                </div>
                <div>
                  <div className="text-[#103358] font-semibold mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>Topics Mastered</div>
                  <div className="text-[#4F4F4F] text-sm mb-2">Per week (1-100)</div>
                  <input 
                    type="number"
                    min="1"
                    max="100"
                    value={goalTopics} 
                    onChange={(e)=>setGoalTopics(e.target.value)} 
                    className="w-full max-w-[324px] h-[43px] bg-[#F7F7F7] rounded-md px-3 text-[14px] text-black" 
                  />
                </div>
                <div>
                  <div className="text-[#103358] font-semibold mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>Desired Mark</div>
                  <div className="text-[#4F4F4F] text-sm mb-2">from 0 to 100</div>
                  <input 
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={goalMark} 
                    onChange={(e)=>setGoalMark(e.target.value)} 
                    className="w-full max-w-[324px] h-[43px] bg-[#F7F7F7] rounded-md px-3 text-[14px] text-black" 
                  />
                </div>
              </div>
            </section>
            )}
            {selected == null && <Divider />}

            {/* Custom Sign-in-page */}
            {!loading && (!selected || selected === 'Custom Sign-in-page') && (
            <section id={sectionLinkId('Custom Sign-in-page')} className="py-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[#103358] text-lg font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Custom Sign-in-page
                </h3>
                <button
                  onClick={saveOrganizationData}
                  disabled={saving}
                  className="bg-[#398AC8] text-white px-4 py-2 rounded-md text-sm hover:bg-[#2c6a9a] disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
              <p className="text-[#4F4F4F] text-sm max-w-2xl mb-4">
                Your students can sign in to TS through the dedicated sign-in page for your account. You can customize this page by uploading your photo or any other picture and editing the welcome message shown to students.
              </p>
              <Label>Page URL</Label>
              <div className="flex items-center gap-3 mb-6">
                <a className="text-[#398AC8] whitespace-nowrap" href="#">www.takespace.co./signin/</a>
                <input 
                  value={pageName} 
                  onChange={(e)=>setPageName(e.target.value)} 
                  placeholder="type your page name here" 
                  maxLength={300}
                  className="w-full max-w-[324px] h-[43px] bg-[#F7F7F7] rounded-md px-3 text-[14px] text-black" 
                />
              </div>
              <div className="flex items-start gap-6">
                <img src="/logo.svg" alt="brand" className="w-20 h-20 cursor-pointer" onClick={() => setIsUploadOpen(true)} />
                <div className="flex-1 space-y-4">
                  <div>
                    <Label>Welcome Header</Label>
                    <input 
                      value={organizationData.login_welcome_header || ''} 
                      onChange={(e) => setOrganizationData(prev => ({ ...prev, login_welcome_header: e.target.value }))}
                      placeholder="Welcome to Ms Alya's Class!"
                      maxLength={300}
                      className="w-full max-w-[400px] h-[43px] bg-[#F7F7F7] rounded-md px-3 text-[14px] text-black" 
                    />
                  </div>
                  <div>
                    <Label>Welcome Message</Label>
                    <div className="text-[#4F4F4F] space-y-2">
                      <button className="text-[#398AC8] underline" onClick={() => setIsWelcomeOpen(true)}>Edit welcome message</button>
                      <div className="text-sm text-gray-500 max-w-md">
                        {organizationData.login_welcome_message ? 
                          organizationData.login_welcome_message.substring(0, 100) + (organizationData.login_welcome_message.length > 100 ? '...' : '') : 
                          'No welcome message set'
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            )}
            {selected == null && <Divider />}

            {/* Account Contacts */}
            {!loading && (!selected || selected === 'Account Contacts') && (
            <section id={sectionLinkId('Account Contacts')} className="py-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[#103358] text-lg font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Account Contacts <span className="text-sm font-normal text-gray-400">Click any field to edit</span>
                </h3>
              </div>
              <div className="overflow-hidden rounded-lg">
                <TableHeader columns={["Name", "Email", "Phone", "Role", "Actions"]} />
                {contacts.map((c, idx) => (
                  <div key={c.id || idx}>
                    {editingContact === c.id ? (
                      <div className="grid grid-cols-5 px-4 items-center text-[#103358] bg-[#F9F9F9] py-4">
                        <input
                          value={contactFormData.full_name}
                          onChange={(e) => setContactFormData(prev => ({ ...prev, full_name: e.target.value }))}
                          className="h-[43px] bg-white rounded-md px-3 text-[14px] text-black border"
                        />
                        <input
                          value={contactFormData.email}
                          onChange={(e) => setContactFormData(prev => ({ ...prev, email: e.target.value }))}
                          className="h-[43px] bg-white rounded-md px-3 text-[14px] text-black border"
                        />
                        <input
                          value={contactFormData.phone}
                          onChange={(e) => setContactFormData(prev => ({ ...prev, phone: e.target.value }))}
                          className="h-[43px] bg-white rounded-md px-3 text-[14px] text-black border"
                        />
                        <select
                          value={contactFormData.organization_role}
                          onChange={(e) => setContactFormData(prev => ({ ...prev, organization_role: e.target.value }))}
                          className="h-[43px] bg-white rounded-md px-3 text-[14px] text-black border"
                        >
                          <option value="account_owner">Account Owner</option>
                          <option value="teacher">Teacher</option>
                          <option value="admin">Admin</option>
                        </select>
                        <div className="flex gap-2">
                          <button
                            onClick={saveContactEdit}
                            className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelContactEdit}
                            className="bg-gray-500 text-white px-3 py-1 rounded text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="grid grid-cols-5 px-4 items-center text-[#103358] bg-[#F9F9F9] py-4 cursor-pointer hover:bg-gray-100"
                        onClick={() => startEditingContact(c)}
                      >
                        <div className="text-sm truncate">{c.full_name}</div>
                        <div className="text-sm truncate">{c.email}</div>
                        <div className="text-sm truncate">{c.phone}</div>
                        <div className="text-sm truncate">{c.organization_role}</div>
                        <div className="text-sm text-[#398AC8]">Edit</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
            )}
            {selected == null && <Divider />}

            {/* Current Subscriptions */}
            {(!selected || selected === 'Current Subscriptions') && (
            <section id={sectionLinkId('Current Subscriptions')} className="py-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[#103358] text-lg font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Current Subscriptions <span className="text-sm font-normal text-gray-400">Click any field to edit</span>
                </h3>
              </div>
              <div className="overflow-hidden rounded-lg">
                <TableHeader columns={["Purchased Access", "Allocated To", "Licenses Used", ""]} />
                {subscriptions.map((s, idx) => (
                  <TableRow
                    key={idx}
                    values={[
                      s.purchasedAccess,
                      s.allocatedTo,
                      <span className="text-green-600">{s.licensesUsed}</span>,
                      <span className="text-gray-500">{s.note}</span>
                    ]}
                    last={idx === subscriptions.length - 1}
                  />
                ))}
              </div>
            </section>
            )}
            {selected == null && <Divider />}

            {/* Username & Password */}
            {!loading && (!selected || selected === 'Username & Password') && (
            <section id={sectionLinkId('Username & Password')} className="py-8">
              <h3 className="text-[#103358] text-lg font-semibold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Username & Password
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
                <div>
                  <Label>Username</Label>
                  <div className="flex items-center gap-2">
                    <div className="relative w-full max-w-[240px]">
                      <input 
                        value={username} 
                        onChange={(e)=>setUsername(e.target.value)} 
                        className="w-full h-[43px] bg-[#F7F7F7] rounded-md pl-3 pr-9 text-[14px] text-black"
                        placeholder="Enter username"
                      />
                    </div>
                    <span className="text-[#BDBDBD]">@5steps</span>
                  </div>
                </div>

                <div>
                  <Label>Password</Label>
                  <div className="flex items-center gap-3">
                    <div className="relative w-full max-w-[240px]">
                       <input 
                        type="password" 
                        value={passwordMask} 
                        disabled 
                        className="w-full h-[43px] bg-[#F7F7F7] rounded-md pl-3 pr-9 text-[14px] text-black"
                      />
                    </div>
                    <button 
                      type="button" 
                      className="text-[#398AC8] hover:underline" 
                      onClick={() => setIsPasswordOpen(true)}
                    >
                      Change
                    </button>
                  </div>
                </div>
              </div>
            </section>
            )}
          </div>
          {/* Upload Modal */}
          {/* Upload Modal (Figma sizing and spacing) */}
          <Modal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} overlayColor="#103358" overlayOpacity={0.7} className="w-[614px] h-[599px] rounded-[29.98px] p-0 flex flex-col">
            <div className="relative">
              {/* Header */}
              <div className="flex items-center justify-between px-[28.6764px] pt-6 pb-4 border-b border-[#CBD0DC]">
                <div className="flex items-center gap-3">
                  <img src="/account/uploadicon.svg" alt="upload" className="w-6 h-6" />
                  <div>
                    <div className="text-[22.159px] leading-[27px] font-medium text-[#292D32]">Upload files</div>
                    <div className="text-[18.9px] leading-[23px] text-[#A9ACB4]">Select and upload the files oof your choice</div>
                  </div>
                </div>
                <button onClick={() => setIsUploadOpen(false)}>
                  <img src="/account/cross.svg" alt="close" className="w-4 h-4" />
                </button>
              </div>
              {/* Body */}
              <div className="relative px-6 pt-6 pb-4">
                {/* Drag and drop area */}
                <div className="relative" style={{ background: '#FFFFFF', border: '2.60695px dashed #CBD0DC', borderRadius: '16.9452px', paddingTop: '140px', paddingBottom: '120px' }}>
                  <div className="absolute inset-0" />
                  <div className="absolute left-[15.46%] right-[15.46%] top-[16.59%] flex flex-col items-center gap-[31.28px]">
                    <div className="w-[29.98px] h-[29.98px]">
                      <img src="/account/uploadicon.svg" alt="cloud" className="w-7 h-7" />
                    </div>
                    <div className="flex flex-col items-center gap-[9.78px] w-[385px]">
                      <div className="text-[19.55px] leading-6 text-center text-[#292D32]">Choose a file or drag & drop it here</div>
                      <div className="text-[16.95px] leading-[21px] text-center text-[#A9ACB4]">JPEG, PNG, PDG, and MP4 formats, up to 50MB</div>
                    </div>
                  </div>
                  {/* Browse */}
                  <div className="absolute left-1/2 -translate-x-1/2" style={{ top: '68%' }}>
                    <label className="cursor-pointer inline-flex items-center justify-center border border-[#CBD0DC] rounded-[10.4278px] px-[21.5073px] py-[10.4278px]">
                      <span className="text-[19.55px] leading-6 text-[#54575C]">Browse File</span>
                      <input type="file" multiple className="hidden" onChange={(e) => onBrowseFiles(e.target.files)} />
                    </label>
                  </div>
                </div>

                {/* Uploaded list */}
                {uploadFiles.length > 0 && (
                  <div className="relative mt-6" style={{ background: '#EEF1F7', borderRadius: '16.9452px' }}>
                    <div className="px-6 py-4 space-y-6">
                      {uploadFiles.map((f, idx) => (
                        <div key={f.id} className="flex items-start justify-between">
                          <div className="flex items-center gap-4">
                            <img src="/logo.svg" alt="thumb" className="w-[75px] h-[73px] rounded-[10px] object-contain bg-white" />
                            <div>
                              <div className="text-[19.55px] text-[#292D32]">{f.name.split('.')[0]}</div>
                              <div className="flex items-center gap-2 text-[16.29px]">
                                <span className="text-[#A9ACB4]">{Math.round(f.size/1024)} KB</span>
                                <span className="text-[#292D32]">{f.status === 'uploading' ? 'Uploading...' : 'Completed'}</span>
                              </div>
                              {/* Progress */}
                              <div className="relative mt-3 w-full max-w-[512.27px] h-2 bg-[#CBD0DC] rounded">
                                <div className="absolute top-0 left-0 h-2 bg-[#375EF9] rounded" style={{ width: `${f.progress}%` }} />
                              </div>
                            </div>
                          </div>
                          {f.status === 'completed' && (
                            <button onClick={() => removeUpload(idx)} className="text-gray-500 hover:text-gray-700" title="Delete">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0A48.11 48.11 0 017.5 5.25m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201V5.25m7.5 0h-7.5" />
                              </svg>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 mt-6">
                  <button className="border border-[#16375A] text-[#16375A] bg-[rgba(12,104,199,0.06)] rounded-md px-4 py-2" onClick={() => setIsUploadOpen(false)}>Cancel</button>
                  <button className="bg-[#16375A] text-white rounded-md px-4 py-2">Submit</button>
                </div>
              </div>
            </div>
          </Modal>

          {/* Welcome Message Modal */}
          <Modal isOpen={isWelcomeOpen} onClose={() => setIsWelcomeOpen(false)} overlayColor="#103358" overlayOpacity={0.7} className="w-[614px] rounded-[29.98px] p-0">
            <div className="px-8 pt-8 text-[#103358]" style={{ fontFamily: 'Poppins, sans-serif' }}>
              <div className="text-[32px] font-semibold mb-4">Welcome Message</div>
            </div>
            <div className="px-8">
              <textarea 
                value={welcomeMessage} 
                onChange={(e)=>setWelcomeMessage(e.target.value)} 
                maxLength={500}
                className="w-full h-64 border border-gray-200 rounded-2xl p-6 text-[#292D32] bg-white" 
                placeholder="Enter your welcome message for students..."
              />
              <div className="text-sm text-gray-500 mt-2">
                {welcomeMessage.length}/500 characters
              </div>
              <div className="flex justify-end gap-3 mt-6 pb-8">
                <button 
                  className="border border-[#16375A] text-[#16375A] bg-[rgba(12,104,199,0.06)] rounded-md px-4 py-2" 
                  onClick={()=>setIsWelcomeOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  className="bg-[#16375A] text-white rounded-md px-4 py-2" 
                  onClick={() => {
                    setOrganizationData(prev => ({ ...prev, login_welcome_message: welcomeMessage }));
                    setIsWelcomeOpen(false);
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </Modal>

          {/* Change Password Modal */}
          <Modal isOpen={isPasswordOpen} onClose={() => setIsPasswordOpen(false)} overlayColor="#103358" overlayOpacity={0.7} className="w-[455px] h-[459px] rounded-[29.98px] shadow-[0px_0px_8px_2px_rgba(9,161,218,0.1)] p-0">
            <div className="relative w-full h-full">
              <div className="absolute left-[37px] top-[36px] text-[20px] font-medium text-[#103358]" style={{ fontFamily: 'Poppins, sans-serif' }}>Change your password</div>
              {/* Inputs group */}
              <div className="absolute left-[37px] top-[87px] w-[380px]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {/* Current Password */}
                <div className="mb-4 relative" style={{ height: '79px' }}>
                  <div className="absolute left-0 top-0 text-[14px] leading-5 text-[#374151]">Current Password</div>
                  <input 
                    type="password" 
                    value={currentPassword} 
                    onChange={(e)=>setCurrentPassword(e.target.value)} 
                    className="absolute left-1/2 -translate-x-1/2 top-[31px] w-[380px] h-[48px] border border-[#103358] rounded-[8px] px-4 text-black" 
                    placeholder="Enter current password"
                  />
                </div>
                {/* New Password */}
                <div className="mb-4 relative" style={{ height: '79px' }}>
                  <div className="absolute left-0 top-0 text-[14px] leading-5 text-[#374151]">New Password</div>
                  <input 
                    type="password" 
                    value={newPassword} 
                    onChange={(e)=>setNewPassword(e.target.value)} 
                    className="absolute left-1/2 -translate-x-1/2 top-[31px] w-[380px] h-[48px] border border-[#103358] rounded-[8px] px-4 text-black" 
                    placeholder="Enter new password"
                  />
                </div>
                {/* Repeat New Password */}
                <div className="relative" style={{ height: '79px' }}>
                  <div className="absolute left-0 top-0 text-[14px] leading-5 text-[#374151]">Repeat New Password</div>
                  <input 
                    type="password" 
                    value={repeatPassword} 
                    onChange={(e)=>setRepeatPassword(e.target.value)} 
                    className="absolute left-1/2 -translate-x-1/2 top-[31px] w-[380px] h-[48px] border border-[#103358] rounded-[8px] px-4 text-black" 
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
              {/* Buttons */}
              <div className="absolute left-[244.5px] top-[383px] flex gap-2">
                <button 
                  className="border border-[#16375A] text-[#16375A] bg-[rgba(12,104,199,0.06)] rounded-[8px] px-4 py-2 w-[92px] h-[40px]" 
                  onClick={()=>setIsPasswordOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  className="bg-[#16375A] text-white rounded-[8px] px-4 py-2 w-[73px] h-[40px] disabled:opacity-50" 
                  onClick={handlePasswordUpdate}
                  disabled={saving || !currentPassword || !newPassword || !repeatPassword}
                >
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
              {/* Divider */}
              <div className="absolute left-[39px] top-[70px] w-[378px] border-t border-[#D9E7EF]" />
            </div>
          </Modal>
        </div>
      </div>
    </Layout>
  );
}


