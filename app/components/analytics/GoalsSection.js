'use client';

export default function GoalsSection({ goals }) {
  return (
    <div className="space-y-5">

<h3 
          style={{
            fontFamily: 'Inter',
            fontWeight: '600',
            fontSize: '20px',
            lineHeight: '18px',
            color: '#1D2026'
          }}
        >
          Goals
        </h3>
      {goals.map((goal, index) => (
        <div 
          key={index} 
          className="rounded-xl"
          style={{
            background: '#FCFCFD',
            border: '1.12462px solid #EAE9F0',
            borderRadius: '12px',
            padding: '15px 16px'
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 
              style={{
                fontFamily: 'Inter',
                fontWeight: '500',
                fontSize: '17.994px',
                lineHeight: '22px',
                letterSpacing: '-0.26991px',
                color: '#103358'
              }}
            >
              {goal.title}
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
              width: '100%',
              height: '0px',
              border: '1px solid #EDEDED',
              marginBottom: '18px'
            }}
          />

          {/* Goal Items */}
          <div className="space-y-6">
            {goal.items.map((item, itemIndex) => (
              <div key={itemIndex}>
                {/* Label and Value Row */}
                <div className="flex items-center justify-between mb-2">
                  <span 
                    style={{
                      fontFamily: 'Inter',
                      fontSize: '15.7447px',
                      lineHeight: '22px',
                      fontWeight: '400',
                      color: '#103358'
                    }}
                  >
                    {item.label}
                  </span>
                  <span 
                    style={{
                      fontFamily: 'Inter',
                      fontSize: '15.7447px',
                      lineHeight: '22px',
                      fontWeight: '600',
                      color: '#103358'
                    }}
                  >
                    {item.value}
                  </span>
                </div>

                {/* Progress Bar */}
                <div
                  className="rounded-full"
                  style={{
                    width: '100%',
                    height: '14px',
                    background: '#E5E5E5',
                    borderRadius: '44.985px'
                  }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${item.percentage}%`,
                      height: '13.5px',
                      background: item.color,
                      borderRadius: '44.985px',
                      marginTop: '0.25px'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}