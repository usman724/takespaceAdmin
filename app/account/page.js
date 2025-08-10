'use client';

import { useState } from 'react';
import Layout from '../components/layout/Layout';

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
      style={{ top: '100px', height: 'calc(100vh - 100px)', width: '250px' }}
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
  const [currentYearDate, setCurrentYearDate] = useState('');
  const [nextYearDate, setNextYearDate] = useState('');
  const [tz, setTz] = useState('GMT + 08:00 Singapore');
  const [goalPractice, setGoalPractice] = useState('5');
  const [goalTopics, setGoalTopics] = useState('5');
  const [goalMark, setGoalMark] = useState('75');
  const [pageName, setPageName] = useState('');
  const [username, setUsername] = useState('admin');
  const [passwordMask] = useState('••••••••');

  return (
    <Layout>
      {/* Sidebar (only on md+) */}
      <AccountSidebar selected={selected} onSelect={(label) => setSelected(prev => (prev === label ? null : label))} />

      {/* Content */}
      <div className="px-4 md:pl-[280px] md:pr-8 pt-6 md:pt-10">
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
           

            {/* First Day Of School */}
            {(!selected || selected === 'First Day Of School') && (
            <section id={sectionLinkId('First Day Of School')} className="mb-8">
              <h3 className="text-[#103358] text-lg font-semibold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                First Day Of School
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-[#4F4F4F] text-sm mb-2">Current school year (2023)</div>
                  <div className="relative w-full max-w-[324px]">
                    <input value={currentYearDate} onChange={(e)=>setCurrentYearDate(e.target.value)} placeholder="dd/mm/yyyy" className="w-full h-[43px] bg-[#F7F7F7] rounded-md px-3 text-[14px] placeholder-[#B0B0B0]" />
                    <img src="/account/calender.svg" alt="" className="absolute right-2 top-1/2 -translate-y-1/2 w-[21px] h-[21px]" />
                  </div>
                </div>
                <div>
                  <div className="text-[#4F4F4F] text-sm mb-2">Next school year (2023)</div>
                  <div className="relative w-full max-w-[324px]">
                    <input value={nextYearDate} onChange={(e)=>setNextYearDate(e.target.value)} placeholder="dd/mm/yyyy" className="w-full h-[43px] bg-[#F7F7F7] rounded-md px-3 text-[14px] placeholder-[#B0B0B0]" />
                    <img src="/account/calender.svg" alt="" className="absolute right-2 top-1/2 -translate-y-1/2 w-[21px] h-[21px]" />
                  </div>
                </div>
              </div>
            </section>
            )}

            {(!selected || selected === 'First Day Of School') && <Divider />}

            {/* Time Zone */}
            {(!selected || selected === 'Time Zone') && (
            <section id={sectionLinkId('Time Zone')} className="py-8">
              <h3 className="text-[#103358] text-lg font-semibold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Time Zone
              </h3>
              <div className="text-[#4F4F4F] text-sm mb-2">GMT + 08:00</div>
              <div className="relative w-full max-w-[324px]">
                <select value={tz} onChange={(e)=>setTz(e.target.value)} className="w-full h-[43px] bg-[#F7F7F7] rounded-md pl-3 pr-9 text-[14px] text-[#103358]">
                  <option>GMT + 08:00 Singapore</option>
                  <option>GMT + 07:00 Bangkok</option>
                  <option>GMT + 05:30 India</option>
                </select>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#103358]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.146l3.71-3.915a.75.75 0 111.08 1.04l-4.24 4.47a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </div>
            </section>
            )}
            {(!selected || selected === 'Time Zone') && <Divider />}

            {/* Goals */}
            {(!selected || selected === 'Goals') && (
            <section id={sectionLinkId('Goals')} className="py-8">
              <h3 className="text-[#103358] text-lg font-semibold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Goals
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="text-[#103358] font-semibold mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>Practice Time</div>
                  <div className="text-[#4F4F4F] text-sm mb-2">Per week, in hours</div>
                  <input value={goalPractice} onChange={(e)=>setGoalPractice(e.target.value)} className="w-full max-w-[324px] h-[43px] bg-[#F7F7F7] rounded-md px-3 text-[14px]" />
                </div>
                <div>
                  <div className="text-[#103358] font-semibold mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>Topics Mastered</div>
                  <div className="text-[#4F4F4F] text-sm mb-2">Per week</div>
                  <input value={goalTopics} onChange={(e)=>setGoalTopics(e.target.value)} className="w-full max-w-[324px] h-[43px] bg-[#F7F7F7] rounded-md px-3 text-[14px]" />
                </div>
                <div>
                  <div className="text-[#103358] font-semibold mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>Desired Mark</div>
                  <div className="text-[#4F4F4F] text-sm mb-2">from 50 to 100</div>
                  <input value={goalMark} onChange={(e)=>setGoalMark(e.target.value)} className="w-full max-w-[324px] h-[43px] bg-[#F7F7F7] rounded-md px-3 text-[14px]" />
                </div>
              </div>
            </section>
            )}
            {(!selected || selected === 'Goals') && <Divider />}

            {/* Custom Sign-in-page */}
            {(!selected || selected === 'Custom Sign-in-page') && (
            <section id={sectionLinkId('Custom Sign-in-page')} className="py-8">
              <h3 className="text-[#103358] text-lg font-semibold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Custom Sign-in-page
              </h3>
              <p className="text-[#4F4F4F] text-sm max-w-2xl mb-4">
                Your students can sign in to TS through the dedicated sign-in page for your account. You can customize this page by uploading your photo or any other picture and editing the welcome message shown to students.
              </p>
              <Label>Page URL</Label>
              <div className="flex items-center gap-3 mb-6">
                <a className="text-[#398AC8] whitespace-nowrap" href="#">www.takespace.co./signin/</a>
                <input value={pageName} onChange={(e)=>setPageName(e.target.value)} placeholder="type your page name here" className="w-full max-w-[324px] h-[43px] bg-[#F7F7F7] rounded-md px-3 text-[14px]" />
              </div>
              <div className="flex items-start gap-6">
                <img src="/logo.svg" alt="brand" className="w-20 h-20" />
                <div className="flex-1 space-y-4">
                  <div>
                    <Label>Welcome Header</Label>
                    <div className="text-[#398AC8]">Welcome to Ms Alya’s Class!</div>
                  </div>
                  <div>
                    <Label>Welcome Message</Label>
                    <div className="text-[#4F4F4F] space-y-2">
                      <p>Practice and excel with Ms Alya!</p>
                      <p>Here the teacher’s welcome message is displayed.</p>
                      <p>Something about outstanding results and proprietory methods.</p>
                      <p>Something encouraging.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            )}
            {(!selected || selected === 'Custom Sign-in-page') && <Divider />}

            {/* Account Contacts */}
            {(!selected || selected === 'Account Contacts') && (
            <section id={sectionLinkId('Account Contacts')} className="py-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[#103358] text-lg font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Account Contacts <span className="text-sm font-normal text-gray-400">Click any field to edit</span>
                </h3>
              </div>
              <div className="overflow-hidden rounded-lg">
                <TableHeader columns={["Name", "Email", "Phone", "Role"]} />
                <TableRow values={["Alexander  Kunzetsov", "doctorkunzetsov@gmail.com", "+6589878700005", "Account owner"]} last />
              </div>
            </section>
            )}
            {(!selected || selected === 'Account Contacts') && <Divider />}

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
                <TableRow values={["175 for 5 Steps Syllabus", "Grades 1- 10", <span className="text-green-600">165 of 175</span>, ""]} />
                <TableRow values={["", "", <span className="text-green-600">165 of 175</span>, <span className="text-gray-500">Licenses Used</span>]} last />
              </div>
            </section>
            )}
            {(!selected || selected === 'Current Subscriptions') && <Divider />}

            {/* Username & Password */}
            {(!selected || selected === 'Username & Password') && (
            <section id={sectionLinkId('Username & Password')} className="py-8">
              <h3 className="text-[#103358] text-lg font-semibold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Username & Password
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
                <div>
                  <Label>Username</Label>
                  <div className="flex items-center gap-2">
                    <div className="relative w-full max-w-[240px]">
                      <select value={username} onChange={(e)=>setUsername(e.target.value)} className="w-full h-[43px] bg-[#F7F7F7] rounded-md pl-3 pr-9 text-[14px] text-[#103358]">
                        <option value="admin">admin</option>
                        <option value="teacher">teacher</option>
                      </select>
                      <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#103358]" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.146l3.71-3.915a.75.75 0 111.08 1.04l-4.24 4.47a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-[#BDBDBD]">@5steps</span>
                  </div>
                </div>

                <div>
                  <Label>Password</Label>
                  <div className="flex items-center gap-3">
                    <div className="relative w-full max-w-[240px]">
                       <select className="w-full h-[43px] bg-[#F7F7F7] rounded-md pl-3 pr-9 text-[14px] text-[#103358]">
                        <option>{passwordMask}</option>
                      </select>
                      <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#103358]" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.146l3.71-3.915a.75.75 0 111.08 1.04l-4.24 4.47a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <a href="#" className="text-[#398AC8]">Change</a>
                  </div>
                </div>
              </div>
            </section>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}


