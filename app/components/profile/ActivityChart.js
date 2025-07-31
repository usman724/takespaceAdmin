'use client';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

export default function ActivityChart({ data, title, subtitle }) {
  return (
    <div className="w-full">
      {/* Chart Card */}
      <div
        className="bg-white rounded-xl relative"
        style={{
          border: '1px solid #D7D7D7',
          width: '100%',
          height: '350px',
          padding: '20px'
        }}
      >
        {/* Title */}
        <h3
          className="mb-2"
          style={{
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: '600',
            fontSize: '22px',
            lineHeight: '18px',
            color: '#1D2026'
          }}
        >
          {title}
        </h3>
        
        {/* Subtitle */}
        <p
          className="mb-4"
          style={{
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '16px',
            lineHeight: '18px',
            color: '#4F4F4F'
          }}
        >
          {subtitle}
        </p>
        
        {/* Chart Container */}
        <div 
          className="h-full w-full"
          style={{
            marginTop: '20px'
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 20, bottom: 40, left: 20 }}>
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  fontWeight: '400',
                  fill: '#103358'
                }}
              />
              <YAxis
                hide={true}
                domain={[0, 100]}
              />
              
              {/* Background bars (light green) */}
              <Bar
                dataKey="background"
                fill="#E9F8EB"
                radius={[0, 0, 0, 0]}
              />
              
              {/* Data bars (bright green) */}
              <Bar
                dataKey="completed"
                fill="#23BD33"
                radius={[0, 0, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}