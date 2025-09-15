"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Layout from "../../components/layout/Layout";
import I18nProvider from "../../components/providers/I18nProvider";
import Button from "../../components/ui/Button";
import { api } from "../../lib/api";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorMessage from "../../components/common/ErrorMessage";
import SuccessMessage from "../../components/common/SuccessMessage";

export default function CreateLeaderboardPage() {
  const router = useRouter();
  const [asClasses, setAsClasses] = useState(false);
  const [asIndividuals, setAsIndividuals] = useState(true);

  const [gradesOpen, setGradesOpen] = useState(false);
  const [selectedGrades, setSelectedGrades] = useState([]);

  const [subjectsOpen, setSubjectsOpen] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  // Form state
  const [leaderboardName, setLeaderboardName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTimeOpt, setStartTimeOpt] = useState("Now");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("19:00");
  
  // API state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Grade and subject options (you might want to fetch these from API)
  const gradeOptions = [
    { id: 1, name: "Primary 1" },
    { id: 2, name: "Primary 2" },
    { id: 3, name: "Primary 3" },
    { id: 4, name: "Primary 4" },
    { id: 5, name: "Primary 5" },
    { id: 6, name: "Primary 6" },
  ];

  const subjectOptions = [
    { id: 1, name: "Maths" },
    { id: 2, name: "Science" },
    { id: 3, name: "English" },
    { id: 4, name: "Geography" },
  ];

  const toggleGrade = (gradeId) => {
    setSelectedGrades((prev) =>
      prev.includes(gradeId) ? prev.filter((x) => x !== gradeId) : [...prev, gradeId]
    );
  };

  const toggleSubject = (subjectId) => {
    setSelectedSubjects((prev) =>
      prev.includes(subjectId) ? prev.filter((x) => x !== subjectId) : [...prev, subjectId]
    );
  };

  // Set default dates
  useEffect(() => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    setStartDate(today.toISOString().split('T')[0]);
    setEndDate(nextWeek.toISOString().split('T')[0]);
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!leaderboardName.trim()) {
      setError('Please enter a leaderboard name');
      return;
    }
    
    if (selectedGrades.length === 0) {
      setError('Please select at least one grade');
      return;
    }
    
    if (selectedSubjects.length === 0) {
      setError('Please select at least one subject');
      return;
    }
    
    if (!startDate || !endDate) {
      setError('Please select start and end dates');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      // Calculate start and end times
      let startTime, endTime;
      
      if (startTimeOpt === "Now") {
        startTime = new Date().toISOString();
      } else {
        const [hours, minutes] = startTimeOpt.split(':').map(Number);
        const startDateTime = new Date(startDate);
        startDateTime.setHours(hours, minutes, 0, 0);
        startTime = startDateTime.toISOString();
      }
      
      const [endHours, endMinutes] = endTime.split(':').map(Number);
      const endDateTime = new Date(endDate);
      endDateTime.setHours(endHours, endMinutes, 0, 0);
      endTime = endDateTime.toISOString();

      // Create leaderboard
      const result = await api.createLeaderboard({
        name: leaderboardName,
        type: asIndividuals ? 'individuals' : 'classes',
        subjectIds: selectedSubjects,
        gradeIds: selectedGrades,
        startTime,
        endTime
      });

      if (result.ok) {
        setSuccess(true);
        // Redirect to the created leaderboard after 2 seconds
        setTimeout(() => {
          router.push(`/leaderboard?id=${result.body.data.id}`);
        }, 2000);
      } else {
        setError(result.body?.error?.message || 'Failed to create leaderboard');
      }
    } catch (err) {
      console.error('Error creating leaderboard:', err);
      setError('Failed to create leaderboard');
    } finally {
      setLoading(false);
    }
  };
  return (
    <I18nProvider>
      <Layout>
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 pb-16 mt-[82px]">
          <header className="mb-8 sm:mb-10">
            <h1 className="text-[34px] sm:text-[42px] lg:text-[54px] font-bold text-[#103358]">Create a new Leaderboard For</h1>
            <p className="text-2xl mt-3 text-[#103358]">5Steps</p>
            <p className="mt-6 text-[#103358] max-w-4xl text-lg">
              Leaderboard are a fun way to motivate your students and keep track of their progress. Encourage your
              student to precise and get to the top of the leaderboard!
            </p>
          </header>

          {/* Error and Success Messages */}
          {error && <ErrorMessage message={error} />}
          {success && <SuccessMessage message="Leaderboard created successfully! Redirecting..." />}

          <form onSubmit={handleSubmit}>
            {/* Leaderboard type */}
            <Section title="Select Leaderboard type">
              <div className="space-y-4">
                <label className="flex items-center gap-3 text-[#103358]">
                  <input 
                    type="radio" 
                    name="type" 
                    checked={asClasses} 
                    onChange={() => {
                      setAsClasses(true);
                      setAsIndividuals(false);
                    }} 
                    className="w-5 h-5 rounded border-[#9EC7EA] text-[#398AC8] focus:ring-[#398AC8]" 
                  />
                  Compete as classes
                </label>
                <label className="flex items-center gap-3 text-[#103358]">
                  <input 
                    type="radio" 
                    name="type" 
                    checked={asIndividuals} 
                    onChange={() => {
                      setAsIndividuals(true);
                      setAsClasses(false);
                    }} 
                    className="w-5 h-5 rounded border-[#9EC7EA] text-[#398AC8] focus:ring-[#398AC8]" 
                  />
                  Compete as individuals
                </label>
              </div>
            </Section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Section title="Select Who Should Participate">
                <Dropdown
                  open={gradesOpen}
                  onToggle={() => setGradesOpen((v) => !v)}
                  label={selectedGrades.length === 0 ? "Select Grades" : `${selectedGrades.length} grade(s) selected`}
                >
                  {gradeOptions.map((grade) => (
                    <CheckboxRow
                      key={grade.id}
                      label={grade.name}
                      checked={selectedGrades.includes(grade.id)}
                      onToggle={() => toggleGrade(grade.id)}
                    />
                  ))}
                </Dropdown>
              </Section>
              <Section title="Select Subjects">
                <Dropdown
                  open={subjectsOpen}
                  onToggle={() => setSubjectsOpen((v) => !v)}
                  label={selectedSubjects.length === 0 ? "Select Subjects" : `${selectedSubjects.length} subject(s) selected`}
                >
                  {subjectOptions.map((subject) => (
                    <CheckboxRow
                      key={subject.id}
                      label={subject.name}
                      checked={selectedSubjects.includes(subject.id)}
                      onToggle={() => toggleSubject(subject.id)}
                    />
                  ))}
                </Dropdown>
              </Section>
            </div>

          <Section title="Select a Start & And Date">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DateInput value={startDate} onChange={setStartDate} />
              <SelectInput
                value={startTimeOpt}
                onChange={setStartTimeOpt}
                options={["Now", "08:00", "12:00", "15:00", "19:00"]}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:col-span-1">
                <DateInput value={endDate} onChange={setEndDate} />
                <SelectInput
                  value={endTime}
                  onChange={setEndTime}
                  options={["08:00", "12:00", "15:00", "19:00", "21:00"]}
                />
              </div>
            </div>
          </Section>

            <Section title="Name Leaderboard">
              <input 
                className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#398AC8] focus:border-[#398AC8] text-black" 
                value={leaderboardName}
                onChange={(e) => setLeaderboardName(e.target.value)}
                placeholder="Enter leaderboard name"
                required
              />
            </Section>

            <div className="mt-8">
              <Button 
                size="lg" 
                type="submit"
                disabled={loading}
              >
                {loading ? <LoadingSpinner /> : 'Create Leaderboard'}
              </Button>
            </div>
          </form>
        </div>
      </Layout>
    </I18nProvider>
  );
}

function Section({ title, children }) {
  return (
    <section className="border border-[#E6EEF6] rounded-2xl p-6 mb-6 shadow-[0_8px_40px_rgba(0,0,0,0.04)]">
      <div className="text-[#103358] font-semibold text-xl mb-5">{title}</div>
      {children}
    </section>
  );
}

function Dropdown({ label, open, onToggle, children }) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className="w-64 flex items-center justify-between bg-white border border-[#E6EEF6] rounded-xl px-4 py-3 shadow-sm"
      >
        <span className="text-[#103358]">{label}</span>
        <ChevronDown className="text-[#398AC8]" />
      </button>
      {open && (
        <div className="absolute z-10 mt-2 w-64 bg-white border border-[#E6EEF6] rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.08)] p-3 space-y-2">
          {children}
        </div>
      )}
    </div>
  );
}

function CheckboxRow({ label, checked, onToggle }) {
  return (
    <label className="flex items-center gap-3 text-[#103358] cursor-pointer select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        className="w-5 h-5 rounded border-[#9EC7EA] text-[#398AC8] focus:ring-[#398AC8]"
      />
      {label}
    </label>
  );
}

function InputLike({ value, icon, dropdown }) {
  return (
    <div className="flex items-center gap-3 bg-white border border-[#9EC7EA] rounded-xl px-4 py-3 shadow-sm">
      {icon === "calendar" && (
        <svg className="w-5 h-5 text-[#398AC8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
      )}
      <span className="text-[#103358] flex-1">{value}</span>
      {dropdown && <ChevronDown className="text-[#398AC8]" />}
    </div>
  );
}

// Real date and select inputs styled like the mocks
function DateInput({ value, onChange }) {
  return (
    <div className="relative flex items-center gap-3 bg-white border border-[#9EC7EA] rounded-xl px-4 py-3 shadow-sm w-full overflow-hidden">
      <svg className="w-5 h-5 text-[#398AC8] pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 bg-transparent outline-none text-[#103358]"
      />
    </div>
  );
}

function SelectInput({ value, onChange, options }) {
  return (
    <div className="flex items-center gap-3 bg-white border border-[#9EC7EA] rounded-xl px-4 py-3 shadow-sm w-full">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 bg-transparent outline-none text-[#103358] pr-6"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt === "Now" ? "Now" : formatTimeLabel(opt)}
          </option>
        ))}
      </select>
      {/* Remove custom chevron; use native select indicator */}
    </div>
  );
}

function formatTimeLabel(val) {
  // val can be HH:mm
  if (!/^[0-9]{2}:[0-9]{2}$/.test(val)) return val;
  const [h, m] = val.split(":").map((n) => parseInt(n, 10));
  const period = h >= 12 ? "PM" : "AM";
  const hr12 = ((h + 11) % 12) + 1;
  return `${hr12}:${m.toString().padStart(2, "0")} ${period}`;
}

function ChevronDown({ className = "" }) {
  return (
    <svg className={`w-4 h-4 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}


