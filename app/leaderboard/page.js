
'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../components/layout/Layout';
import I18nProvider from '../components/providers/I18nProvider';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';

// Simple countdown hook for demo purposes
function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState(() => Math.max(0, targetDate - Date.now()));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const next = Math.max(0, targetDate - Date.now());
        if (next === 0) clearInterval(interval);
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return { days, hours, minutes, seconds };
}

const podiumUsers = [
  { id: 2, name: 'Eleanor Pena', xp: 504, place: 2 },
  { id: 1, name: 'Ralph Edwards', xp: 630, place: 1 },
  { id: 3, name: 'Kathryn Murphy', xp: 420, place: 3 },
];

const leaderboardRows = Array.from({ length: 14 }).map((_, index) => {
  const rank = index + 1;
  return {
    rank,
    student: 'Entertaining Giant Pandas',
    progress: 'Avg 51 questions answered',
    teacher: 'Binte Mohd Faisal',
    grade: rank === 1 ? 'P5' : rank === 2 ? 'P6' : rank === 3 ? 'P2' : 'P1',
  };
});

export default function LeaderboardPage() {
  const router = useRouter();
  const [showEndModal, setShowEndModal] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [viewMode, setViewMode] = useState('group'); // 'individual' | 'group'

  // Target a countdown date ~4 days from now to match the mock
  const targetDate = useMemo(() => Date.now() + 4 * 24 * 60 * 60 * 1000 + 48 * 60 * 1000 + 53 * 1000, []);
  const { days, hours, minutes, seconds } = useCountdown(targetDate);

  return (
    <I18nProvider>
      <Layout>
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-12 mt-[82px]">


          {/* Top callout + podium */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              {/* Header */}
              <div className="mb-6 sm:mb-8">
                <h1 className="text-[34px] sm:text-[44px] xl:text-[62px] leading-[1] font-semibold text-[#103358]">Leaderboard</h1>
                <p className="text-[18px] sm:text-[28px] xl:text-[38px] leading-[1] text-[#103358] mt-1">5Steps Board 1</p>
                {/* dots */}
                <div className="mt-4 flex items-center gap-2">
                  <span className="w-[11px] h-[11px] rounded-full bg-[#103358]" />
                  <span className="w-[11px] h-[11px] rounded-full bg-[#103358] opacity-60" />
                  <span className="w-[11px] h-[11px] rounded-full bg-[#103358] opacity-60" />
                </div>
              </div>
              <p className="text-[18px] sm:text-[22px] xl:text-[26px] font-semibold text-[#103358]">Who has answered the most question?</p>
              <div className="mt-4">
                <Button
                  size="lg"
                  className="h-[58px] w-[260px] sm:w-[320px] xl:w-[370px] rounded-[14px]"
                  onClick={() => router.push('/leaderboard/new')}
                >
                  Add New Board
                </Button>
              </div>
            </div>

            {/* Podium */}
            <div className="flex items-end justify-center gap-[69px] w-full lg:w-auto">
              {podiumUsers.map((user) => {
                const avatarSize = user.place === 1
                  ? 'w-40 h-40 sm:w-44 sm:h-44 xl:w-48 xl:h-48'
                  : 'w-28 h-28 sm:w-32 sm:h-32 xl:w-36 xl:h-36';
                const badgeSize = user.place === 1 ? 'w-16 sm:w-20' : 'w-12 sm:w-14';
                const order = user.place === 1 ? 'order-2' : user.place === 2 ? 'order-1' : 'order-3';
                return (
                  <div key={user.id} className={`flex flex-col items-center ${order}`}>
                    <div className={`relative rounded-full overflow-hidden border-4 border-white shadow-lg ${avatarSize}`}>
                      <img src="/leaderboard/userprofile.svg" alt={`${user.name} avatar`} className="w-full h-full object-cover" />
                    </div>
                    {/* Medal placed under the avatar (not overlapping the image) */}
                    <img
                      src={`/leaderboard/badge-${user.place}.svg`}
                      alt={`badge ${user.place}`}
                      className={`${badgeSize} mt-2 sm:mt-3`}
                    />
                    <div className="mt-3 text-[#103358] text-center">
                      <div className="text-sm sm:text-base font-semibold">{user.name}</div>
                      <div className="text-base sm:text-xl font-bold mt-0.5">{user.xp} XP</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Controls + countdown */}
          <div className="mt-8 sm:mt-12">
            <div className="relative rounded-[16px] border-2 border-[#3771C8] bg-[#F1F1F1] p-4 sm:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Left: filter + view toggle (grouped buttons) */}
              <div className="flex items-center gap-4 relative">
                {/* Filter button */}
                <button
                  className="inline-flex items-center gap-3 h-12 px-4 sm:h-[52px] sm:px-5 rounded-2xl bg-[#103358] border border-[#398AC8] text-white shadow-sm"
                  onClick={() => setShowFilterMenu((s) => !s)}
                >
                  <img src="/leaderboard/filter.svg" alt="Filter" className="w-[18px] h-[18px]" />
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>

                {/* Segmented toggle */}
                <div className="inline-flex rounded-2xl overflow-hidden border border-[#398AC8] shadow-[0_0_40px_rgba(0,0,0,0.08)]">
                  <button
                    onClick={() => setViewMode('individual')}
                    className={`h-12 sm:h-[52px] px-5 ${viewMode === 'individual' ? 'bg-[#103358]' : 'bg-white'} flex items-center justify-center`}
                    aria-pressed={viewMode === 'individual'}
                  >
                    <img
                      src="/leaderboard/singleuser.svg"
                      alt="Individual"
                      className={`w-[18px] h-[18px] ${viewMode === 'individual' ? 'invert-[1] brightness-0 saturate-0' : ''}`}
                    />
                  </button>
                  <button
                    onClick={() => setViewMode('group')}
                    className={`h-12 sm:h-[52px] px-5 ${viewMode === 'group' ? 'bg-[#103358]' : 'bg-white'} flex items-center justify-center`}
                    aria-pressed={viewMode === 'group'}
                    style={{
                      borderRadius: '12px',
                    }}
                  >
                    <img
                      src="/leaderboard/groupuser.svg"
                      alt="Group"
                      className="w-[18px] h-[18px]"
                    />
                  </button>
                </div>
              </div>

              {/* Center: countdown */}
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-[14px] sm:text-[16px] text-[#103358]/90 tracking-wide">ENDS IN</div>
                  <div className="mt-2 flex items-end justify-center gap-4 sm:gap-6">
                    <TimeBlock label="Days" value={days} />
                    <Colon />
                    <TimeBlock label="HRS" value={hours} />
                    <Colon />
                    <TimeBlock label="MINS" value={minutes} />
                    <Colon />
                    <TimeBlock label="SECS" value={seconds} />
                  </div>
                </div>
              </div>

              {/* Right: End early button */}
              <div className="flex justify-center md:justify-end">
                <Button size="lg" className="h-[58px] w-[180px] rounded-[14px]" onClick={() => setShowEndModal(true)}>
                  End Early
                </Button>
              </div>

              {/* Filter dropdown */}
              {showFilterMenu && (
                <div className="absolute left-0 top-full mt-2 z-20 w-80 sm:w-96 rounded-2xl bg-white shadow-xl border border-gray-200 p-4">
                  <div className="text-[#103358] font-semibold mb-3 flex items-center justify-between">
                    <span>Participants</span>
                    <svg className="w-5 h-5 text-[#103358]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
                  </div>
                  <div className="space-y-3 text-[#103358]">
                    <div>Primary 1, Primary 2</div>
                    <div>Primary 3, Primary 4,</div>
                    <div>Primary 5, Primary 6,</div>
                    <div>Secondary 1,  Secondary 1,</div>
                    <div>Secondary 4  Higher 1,</div>
                    <div>and Higher 2</div>
                  </div>
                  <div className="mt-4 text-[#398AC8] font-semibold">Subjects:</div>
                  <div className="text-[#103358] mt-1">All Subjects</div>
                </div>
              )}
            </div>
          </div>

          {/* List Section with background confetti */}
          <div className="relative mt-10 rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(180deg, #0E497D 0%, #0B2C4F 100%)' }}>
            {/* confetti sides behind content, equal size */}
            <img
              src="/leaderboard/left-top-bgflow.svg"
              style={{
                margin: '-123px',
              }}
              alt="left confetti"
              className="pointer-events-none select-none  md:block absolute left-0 top-0 w-[320px] lg:w-[360px] "
            />
            <img
              src="/leaderboard/right-top-bgflow.svg"
              alt="right confetti"
              style={{
                margin: '-70px',
                marginTop: '-103px',
              }}
              className="pointer-events-none select-none  md:block absolute right-0 top-0 w-[320px] lg:w-[360px] "
            />

            <div className="px-4 sm:px-6 lg:px-8 py-8 ml-[218px] mt-[98px] mr-[218px]">
              {/* Header bar */}
              <div className="mx-auto max-w-6xl relative z-10">
                <div className="bg-white rounded-2xl px-4 sm:px-6 py-4 flex items-center justify-between">
                  <div className="w-[46%] sm:w-[45%] text-[#103358] font-semibold text-base sm:text-lg flex items-center gap-3">
                    <span>Student</span>
                    <svg className="w-5 h-5 text-[#103358]/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
                  </div>
                  <div className="hidden sm:block w-[24%] text-[#103358] font-semibold text-base sm:text-lg">Progress</div>
                  <div className="hidden sm:block w-[21%] text-[#103358] font-semibold text-base sm:text-lg">Teacher</div>
                  <div className="hidden sm:block w-[10%] text-[#103358] font-semibold text-base sm:text-lg">Grade</div>
                </div>
              </div>

              {/* Rows */}
              <div className="mx-auto max-w-6xl mt-5 space-y-3 sm:space-y-4 relative z-10">
                {leaderboardRows.map((row) => (
                  <LeaderboardRow key={row.rank} row={row} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* End early modal */}
        <Modal isOpen={showEndModal} onClose={() => setShowEndModal(false)} className="w-full max-w-lg p-6 sm:p-8">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-[#103358]">End Leaderboard!</div>
            <p className="mt-3 text-[#103358]/80">Are you sure want to end this leaderboard early?</p>
            <div className="mt-6 space-y-3">
              <Button size="lg" className="w-full" onClick={() => setShowEndModal(false)}>End</Button>
              <Button size="lg" variant="outline" className="w-full" onClick={() => setShowEndModal(false)}>Cancel</Button>
            </div>
          </div>
        </Modal>
      </Layout>
    </I18nProvider>
  );
}

function Colon() {
  return <div className="text-[36px] sm:text-[46px] font-semibold text-[#103358] pb-1">:</div>;
}

function TimeBlock({ label, value }) {
  const v = String(value).padStart(2, '0');
  return (
    <div className="min-w-[40px] sm:min-w-[50px]">
      <div className="text-[34px] sm:text-[41px] font-semibold text-[#103358] leading-[20px] text-center">{v}</div>
      <div className="text-[12px] sm:text-[16px] text-[#103358] tracking-wide text-center mt-2">{label}</div>
    </div>
  );
}

function LeaderboardRow({ row }) {
  const isTop1 = row.rank === 1;
  const isTop2 = row.rank === 2;
  const isTop3 = row.rank === 3;

  const badgeBg = isTop1 ? 'bg-[#F2C94C]' : isTop2 ? 'bg-[#FAD7E0]' : isTop3 ? 'bg-[#D6F2C4]' : 'bg-white';
  const textColor = isTop1 || isTop2 || isTop3 ? 'text-[#103358]' : 'text-[#103358]';

  return (
    <div className="flex items-center gap-3">
      {/* Rank circle */}
      <div className={`shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full ${isTop1 ? 'bg-[#F2C94C]' : isTop2 ? 'bg-[#FF5FC1]' : isTop3 ? 'bg-[#6CC04A]' : 'bg-white'} text-[#103358] flex items-center justify-center font-bold border-2 border-white`}>{row.rank}</div>

      {/* Row card */}
      <div className={`flex-1 rounded-full ${badgeBg} px-3 sm:px-5 py-2 sm:py-3 flex items-center justify-between shadow-sm`}>
        {/* Student */}
        <div className="w-[46%] sm:w-[45%] flex items-center gap-3 min-w-0">
          <img src="/leaderboard/panda.svg" alt="panda" className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white p-1" />
          <div className={`truncate font-semibold ${textColor}`}>{row.student}</div>
        </div>
        {/* Progress */}
        <div className="hidden sm:block w-[24%] text-[#103358]/80 truncate">{row.progress}</div>
        {/* Teacher */}
        <div className="hidden sm:block w-[21%] text-[#103358]/80 truncate">{row.teacher}</div>
        {/* Grade */}
        <div className="hidden sm:flex w-[10%] items-center justify-end">
          <span className="text-[#103358] font-semibold">{row.grade}</span>
        </div>
      </div>
    </div>
  );
}


