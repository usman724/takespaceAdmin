'use client';

export default function UnitsTopics({ title, topics }) {
  return (
    <div className="w-full">
      {/* Title outside the cards */}
      <h3 
        className="mb-6"
        style={{
          fontFamily: 'Inter',
          fontWeight: '600',
          fontSize: '24px',
          lineHeight: '28px',
          color: '#1D2026'
        }}
      >
        {title}
      </h3>

      {/* Topics List */}
      <div className="space-y-3">
        {topics.map((topic, index) => (
          <div
            key={index}
            className="flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors duration-200 rounded-xl"
            style={{
              background: '#FFFFFF',
              border: '1px solid #E9EAF0',
              borderRadius: '12px',
              padding: '17px 24px',
             
              minHeight: '59px'
            }}
          >
            {/* Topic Text */}
            <div 
              className="flex-1"
              style={{
                fontFamily: 'Inter',
                fontWeight: '400',
                fontSize: '18px',
                lineHeight: '24px',
                letterSpacing: '-0.015em',
                color: '#1D2026'
              }}
            >
              {topic}
            </div>

            {/* Arrow Button */}
            <div 
              className="flex items-center justify-center ml-4"
              style={{
                width: '48px',
                height: '34px',
                background: '#F5F7FA',
                borderRadius: '12px',
            
                flexShrink: 0
              }}
            >
              {/* Custom Arrow SVG */}
              <img src="/icons/analytics/arrow.svg" alt="Arrow" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}