'use client';
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from 'recharts';

export default function PracticeTimeChart({ selectedPeriod = 'This month', onPeriodChange }) {
  const [selectedDay, setSelectedDay] = useState(null);
  
  // Dynamic data based on period
  const getDataForPeriod = (period) => {
    switch (period) {
      case 'This week':
        return [
          { day: 'Mon', hours: 1.5, fullDay: 'Monday' },
          { day: 'Tues', hours: 2, fullDay: 'Tuesday' },
          { day: 'Wed', hours: 1.2, fullDay: 'Wednesday' },
          { day: 'Thurs', hours: 1.8, fullDay: 'Thursday' },
          { day: 'Fri', hours: 2.3, fullDay: 'Friday' },
          { day: 'Sat', hours: 1.1, fullDay: 'Saturday' },
          { day: 'Sun', hours: 2.1, fullDay: 'Sunday' }
        ];
      case 'This month':
        return [
          { day: 'Week 1', hours: 8.5, fullDay: 'Week 1' },
          { day: 'Week 2', hours: 12, fullDay: 'Week 2' },
          { day: 'Week 3', hours: 9.2, fullDay: 'Week 3' },
          { day: 'Week 4', hours: 11.8, fullDay: 'Week 4' }
        ];
      case 'This year':
        return [
          { day: 'Jan', hours: 45, fullDay: 'January' },
          { day: 'Feb', hours: 52, fullDay: 'February' },
          { day: 'Mar', hours: 38, fullDay: 'March' },
          { day: 'Apr', hours: 48, fullDay: 'April' },
          { day: 'May', hours: 55, fullDay: 'May' },
          { day: 'Jun', hours: 42, fullDay: 'June' },
          { day: 'Jul', hours: 47, fullDay: 'July' },
          { day: 'Aug', hours: 50, fullDay: 'August' },
          { day: 'Sep', hours: 44, fullDay: 'September' },
          { day: 'Oct', hours: 49, fullDay: 'October' },
          { day: 'Nov', hours: 53, fullDay: 'November' },
          { day: 'Dec', hours: 41, fullDay: 'December' }
        ];
      default:
        return [
          { day: 'Mon', hours: 1.5, fullDay: 'Monday' },
          { day: 'Tues', hours: 2, fullDay: 'Tuesday' },
          { day: 'Wed', hours: 1.2, fullDay: 'Wednesday' },
          { day: 'Thurs', hours: 1.8, fullDay: 'Thursday' },
          { day: 'Fri', hours: 2.3, fullDay: 'Friday' },
          { day: 'Sat', hours: 1.1, fullDay: 'Saturday' },
          { day: 'Sun', hours: 2.1, fullDay: 'Sunday' }
        ];
    }
  };

  const chartData = getDataForPeriod(selectedPeriod);
  const selectedPoint = selectedDay ? chartData.find(point => point.day === selectedDay) : chartData[1];
  
  // Set default selected day when data changes
  useEffect(() => {
    if (chartData.length > 1) {
      setSelectedDay(chartData[1].day); // Default to second item (Tues for weekly)
    }
  }, [selectedPeriod, chartData.length]);

  // Custom dot component for the selected point
  const CustomDot = (props) => {
    const { cx, cy, payload } = props;
    if (payload.day === selectedDay) {
      return (
        <g>
          {/* Vertical dashed line */}
          <line
            x1={cx}
            y1={10}
            x2={cx}
            y2={cy + 40}
            stroke="#23BD33"
            strokeWidth="0.8"
            strokeDasharray="3,3"
          />
          {/* Green dot with white border and shadow */}
          <circle
            cx={cx}
            cy={cy}
            r="5.61"
            fill="#23BD33"
            stroke="#FFFFFF"
            strokeWidth="1.6"
            style={{
              filter: 'drop-shadow(0px 3.2px 6.4px rgba(29, 32, 38, 0.16))'
            }}
          />
        </g>
      );
    }
    return null;
  };

  // Custom tooltip positioned exactly on the line dot
  const CustomTooltip = () => {
    if (!selectedPoint) return null;
    
    const selectedIndex = chartData.findIndex(point => point.day === selectedDay);
    if (selectedIndex === -1) return null;
    
    // Calculate X position based on chart data points
    const xPercentage = (selectedIndex / (chartData.length - 1)) * 100;
    
    // Calculate Y position based on the data value (approximate)
    const maxHours = Math.max(...chartData.map(d => d.hours));
    const yPercentage = 100 - (selectedPoint.hours / maxHours) * 60; // Adjust 60 for chart area
    
    return (
      <div 
        className="absolute pointer-events-none z-20"
        style={{
          left: `${xPercentage}%`,
          top: `${yPercentage}%`,
          transform: 'translate(-50%, -100%)',
          marginTop: '-60px' // Position above the dot
        }}
      >
        {/* Main tooltip container */}
        <div className="flex flex-col items-center">
          {/* Tooltip content */}
          <div
            className="flex flex-col items-center justify-center"
            style={{
              width: '73.74px',
              height: '45.82px',
              background: '#1D2026',
              borderRadius: '8px',
              padding: '6.4px 0',
              gap: '1.6px'
            }}
          >
            <span
              style={{
                width: '73.74px',
                height: '33px',
                fontFamily: 'Inter',
                fontWeight: '500',
                fontSize: '11.22px',
                lineHeight: '16px',
                color: '#FFFFFF',
                textAlign: 'center',
                letterSpacing: '-0.01em'
              }}
            >
              {selectedPoint.hours}
              <br />
              Hours
            </span>
          </div>
          
          {/* Arrow pointing down */}
          <div 
            style={{
              width: '9.62px',
              height: '4.81px',
              background: '#1D2026',
              clipPath: 'polygon(50% 100%, 0 0, 100% 0)',
              transform: 'matrix(1, 0, 0, -1, 0, 0)'
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <div 
      className="relative bg-white w-full"
      style={{
        width: '100%',
        maxWidth: '400px',
        height: 'auto',
        minHeight: '320px'
      }}
    >
      {/* Header with exact Figma styling */}
      <div 
        className="flex items-center justify-between"
        style={{
          padding: '12px 16px',
          gap: '20px',
          width: '100%',
          height: '50px',
          background: '#FFFFFF',
          boxShadow: 'inset 0px -0.8px 0px #E9EAF0'
        }}
      >
        <h3 
          style={{
            fontFamily: 'Inter',
            fontWeight: '600',
            fontSize: '18px',
            lineHeight: '22px',
            color: '#1D2026'
          }}
        >
          Practice Time
        </h3>
        
        {/* Period Selector - Profile View */}
        <div 
          className="flex items-center"
          style={{
            gap: '6px'
          }}
        >
          <select
            value={selectedPeriod}
            onChange={(e) => {
              onPeriodChange && onPeriodChange(e.target.value);
              setSelectedDay(null);
            }}
            className="appearance-none bg-transparent cursor-pointer focus:outline-none"
            style={{
              fontFamily: 'Inter',
              fontSize: '12px',
              lineHeight: '18px',
              textAlign: 'right',
              letterSpacing: '-0.01em',
              color: '#6E7485'
            }}
          >
            <option value="This week">This week</option>
            <option value="This month">This month</option>
            <option value="This year">This year</option>
          </select>
          
          {/* ChevronDown */}
          <div
            style={{
              width: '12px',
              height: '12px',
              position: 'relative'
            }}
          >
            <svg 
              width="12" 
              height="12" 
              viewBox="0 0 13 13" 
              fill="none"
            >
              <path 
                d="M2.44 4.81L6.5 8.13L10.56 4.81" 
                stroke="#6E7485" 
                strokeWidth="0.96" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div 
        className="relative"
        style={{
          width: '100%',
          height: '280px',
          padding: '15px 8px'
        }}
      >
        {/* Custom Tooltip */}
        <CustomTooltip />
        
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{
              top: 40,
              right: 15,
              left: 15,
              bottom: 30,
            }}
          >
            <defs>
              {/* Area gradient */}
              <linearGradient id="practiceAreaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop 
                  offset="0%" 
                  stopColor="#23BD33" 
                  stopOpacity={0.1}
                />
                <stop 
                  offset="79.37%" 
                  stopColor="rgba(35, 189, 51, 0)" 
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            
            {/* X-axis with exact Figma styling */}
            <XAxis 
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{
                fontFamily: 'Inter',
                fontSize: 12,
                fill: '#A1A5B3',
                textAnchor: 'middle'
              }}
              height={30}
            />
            
            <YAxis hide />
            
            {/* Area fill */}
            <Area
              type="monotone"
              dataKey="hours"
              stroke="transparent"
              fill="url(#practiceAreaGradient)"
            />
            
            {/* Main line */}
            <Line
              type="monotone"
              dataKey="hours"
              stroke="#23BD33"
              strokeWidth={2.4}
              dot={false}
            />
            
            {/* Custom dots for interaction */}
            <Line
              type="monotone"
              dataKey="hours"
              stroke="transparent"
              dot={<CustomDot />}
            />
          </AreaChart>
        </ResponsiveContainer>

        {/* Clickable overlay for day selection */}
        <div 
          className="absolute flex"
          style={{ 
            bottom: '20px', 
            left: '15px', 
            right: '15px', 
            height: '40px' 
          }}
        >
          {chartData.map((point, index) => (
            <div
              key={point.day}
              className="flex-1 cursor-pointer"
              onClick={() => setSelectedDay(point.day)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}