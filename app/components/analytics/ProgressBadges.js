'use client';

export default function ProgressBadges({ title, badges }) {
  return (
    <div 
      className="bg-white rounded-xl"
      style={{
        border: '1px solid #D7D7D7',
        borderRadius: '12px'
      }}
    >
      {/* Header */}
      <div 
        className="flex items-center justify-between"
        style={{
          padding: '20px 25px 17px 25px'
        }}
      >
        <h3 
          style={{
            fontFamily: 'Inter',
            fontWeight: '600',
            fontSize: '20px',
            lineHeight: '18px',
            color: '#1D2026'
          }}
        >
          {title}
        </h3>
        <button 
          className="border rounded-xl flex items-center justify-center"
          style={{
            width: '73px',
            height: '35px',
            border: '1.5px solid #103358',
            borderRadius: '12px',
            fontFamily: 'Inter',
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: '600',
            color: '#103358',
            background: 'transparent',
            padding: '12px 16px'
          }}
        >
          Set
        </button>
      </div>

      {/* Divider Line */}
      <div 
        style={{
          width: 'calc(100% - 50px)',
          height: '0px',
          border: '1px solid #EDEDED',
          marginLeft: '25px',
          marginBottom: '16px'
        }}
      />

      {/* Badges Grid */}
      <div 
        className="grid gap-4 pb-6"
        style={{
          padding: '0 25px 20px 25px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '16px'
        }}
      >
        {badges.map((badge, index) => (
          <div
            key={index}
            className="flex items-center justify-center rounded-lg"
            style={{
              height: '46.31px',
              background: 'rgba(57, 138, 200, 0.3)',
              border: '1.90435px solid #398AC8',
              borderRadius: '10.1565px',
              padding: '10.1565px',
              fontFamily: 'Inter',
              fontSize: '16px',
              lineHeight: '25px',
              fontWeight: '500',
              color: '#103358'
            }}
          >
            {badge}
          </div>
        ))}
      </div>
    </div>
  );
}