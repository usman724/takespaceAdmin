"use client";

import { useState, useEffect, useMemo } from "react";
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
  const [gradeOptions, setGradeOptions] = useState([]);
  const [gradesLoading, setGradesLoading] = useState(false);

  const [subjectsOpen, setSubjectsOpen] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [subjectsLoading, setSubjectsLoading] = useState(false);

  // Form state
  const [leaderboardName, setLeaderboardName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTimeStr, setStartTimeStr] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTimeStr, setEndTimeStr] = useState("");
  
  // API state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Load subjects from API
  useEffect(() => {
    const loadSubjects = async () => {
      try {
        setSubjectsLoading(true);
        const resp = await api.getAllSubjects();
        const list = Array.isArray(resp)
          ? resp
          : (Array.isArray(resp?.data?.results) ? resp.data.results
              : Array.isArray(resp?.data) ? resp.data
              : Array.isArray(resp?.results) ? resp.results
              : []);
        const mapped = list.map((s) => ({ id: s.id, name: s.name || s.title || s.subject_name || `Subject ${s.id}` })).filter((s) => s.id);
        setSubjectOptions(mapped);
      } catch (e) {
        console.error('Error loading subjects:', e);
        setSubjectOptions([]);
      } finally {
        setSubjectsLoading(false);
      }
    };
    loadSubjects();
  }, []);

  // Load grades from Units API based on first selected subject
  useEffect(() => {
    const loadGrades = async () => {
      if (!selectedSubjects.length) { setGradeOptions([]); return; }
      const subjectId = selectedSubjects[0];
      try {
        setGradesLoading(true);
        const resp = await api.getUnits(subjectId);
        const data = resp?.data || resp;
        let grades = [];
        if (data?.grades && Array.isArray(data.grades)) {
          grades = data.grades;
        } else if (data?.results && Array.isArray(data.results)) {
          // Try to infer grade field from results if present
          const setG = new Set();
          data.results.forEach((u) => {
            if (u?.grade !== undefined && u?.grade !== null) setG.add(Number(u.grade));
            if (u?.grade_level !== undefined && u?.grade_level !== null) setG.add(Number(u.grade_level));
          });
          grades = Array.from(setG).sort((a,b)=>a-b).map((g) => ({ id: g, name: `Grade ${g}` }));
        } else if (Array.isArray(data)) {
          const setG = new Set();
          data.forEach((u) => {
            if (u?.grade !== undefined && u?.grade !== null) setG.add(Number(u.grade));
            if (u?.grade_level !== undefined && u?.grade_level !== null) setG.add(Number(u.grade_level));
          });
          grades = Array.from(setG).sort((a,b)=>a-b).map((g) => ({ id: g, name: `Grade ${g}` }));
        }
        const mapped = grades.map((g) => (
          typeof g === 'object' ? { id: g.id ?? g.level ?? g.grade ?? g, name: g.name ?? `Grade ${g.level ?? g.id ?? g}` } : { id: g, name: `Grade ${g}` }
        )).filter((g)=>g.id!==undefined && g.id!==null);
        setGradeOptions(mapped);
      } catch (e) {
        console.error('Error loading grades from units:', e);
        setGradeOptions([]);
      } finally {
        setGradesLoading(false);
      }
    };
    loadGrades();
  }, [selectedSubjects]);

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
    if (!startTimeStr || !endTimeStr) {
      setError('Please select start and end times');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      // Calculate start and end times
      let startTimeIso, endTimeIso;
      
      const startDateTime = new Date(startDate);
      const [sh, sm] = String(startTimeStr).split(':').map(Number);
      startDateTime.setHours(Number(sh), Number(sm), 0, 0);
      startTimeIso = startDateTime.toISOString();

      const endDateTime = new Date(endDate);
      const [eh, em] = String(endTimeStr).split(':').map(Number);
      endDateTime.setHours(Number(eh), Number(em), 0, 0);
      endTimeIso = endDateTime.toISOString();

      // Create leaderboard
      const result = await api.createLeaderboard({
        name: leaderboardName,
        type: asIndividuals ? 'individuals' : 'classes',
        subjectIds: selectedSubjects,
        gradeIds: selectedGrades,
        startTime: startTimeIso,
        endTime: endTimeIso
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
                  label={selectedGrades.length === 0 ? (gradesLoading ? "Loading grades..." : "Select Grades") : `${selectedGrades.length} grade(s) selected`}
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
                  label={selectedSubjects.length === 0 ? (subjectsLoading ? "Loading subjects..." : "Select Subjects") : `${selectedSubjects.length} subject(s) selected`}
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

          <Section title="Select Start & End Date">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Start */}
              <div>
                <div className="text-[#103358] font-semibold mb-2">Start</div>
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-4">
                  <DateInput value={startDate} onChange={setStartDate} className="min-w-[240px]" />
                  <TimeInput value={startTimeStr} onChange={setStartTimeStr} />
                </div>
              </div>
              {/* End */}
              <div>
                <div className="text-[#103358] font-semibold mb-2">End</div>
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr] gap-4">
                  <DateInput value={endDate} onChange={setEndDate} className="min-w-[240px]" />
                  <TimeInput value={endTimeStr} onChange={setEndTimeStr} />
                </div>
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
function DateInput({ value, onChange, className = "" }) {
  return (
    <div className={`relative flex items-center gap-3 bg-white border border-[#9EC7EA] rounded-xl px-4 py-3 shadow-sm w-full overflow-hidden ${className}`}>
      <svg className="w-5 h-5 text-[#398AC8] pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
      <input
        type="date"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        onInput={(e) => onChange(e.currentTarget.value)}
        className="flex-1 bg-transparent outline-none text-[#103358] cursor-pointer pointer-events-auto"
        autoComplete="off"
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
            {opt}
          </option>
        ))}
      </select>
      {/* Remove custom chevron; use native select indicator */}
    </div>
  );
}

function formatTimeLabel(val) {
  return val;
}

function ChevronDown({ className = "" }) {
  return (
    <svg className={`w-4 h-4 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function TimeInput({ value, onChange }) {
  return (
    <div className="flex items-center gap-3 bg-white border border-[#9EC7EA] rounded-xl px-4 py-3 shadow-sm w-full">
      <input type="time" value={value} onChange={(e) => onChange(e.target.value)} className="flex-1 bg-transparent outline-none text-[#103358]" />
    </div>
  );
}


