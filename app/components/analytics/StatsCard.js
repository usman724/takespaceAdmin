'use client';

export default function StatsCard({ title, value, icon, iconBg, iconColor }) {
  return (
    <div 
      className="flex items-center gap-6 bg-white border border-[#D7D7D7] rounded-xl"
      style={{
        width: '248px',
        height: '108px',
        padding: '24px'
      }}
    >
      {/* Icon Container */}
      <div 
        className="flex items-center justify-center rounded-lg flex-shrink-0"
        style={{
          width: '60px',
          height: '60px',
          background: iconBg || '#FFEEE8',
          borderRadius: '8px'
        }}
      >
        <img 
          src={icon} 
          alt={title}
          className="w-8 h-8"
          style={{ color: iconColor || '#FF6636' }}
        />
      </div>

      {/* Info */}
      <div className="flex flex-col justify-center gap-1.5">
        <span
          className="font-semibold text-[#1D2026]"
          style={{
            fontFamily: 'Inter',
            fontSize: '22px',
            lineHeight: '22px',
            letterSpacing: '-0.01em'
          }}
        >
          {value}
        </span>
        <span
          className="text-[#4E5566]"
          style={{
            fontFamily: 'Inter',
            fontSize: '18px',
            lineHeight: '22px',
            letterSpacing: '-0.01em'
          }}
        >
          {title}
        </span>
      </div>
    </div>
  );
}