'use client';
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from 'recharts';

export default function QuestionsAnsweredChart({ selectedPeriod = 'This month', onPeriodChange }) {
  // Dynamic data based on period - two lines (Attempted and Corrected)
  const getDataForPeriod = (period) => {
    switch (period) {
      case 'This week':
        return [
          { day: 'Sun', attempted: 45000, corrected: 95000 },
          { day: 'Mon', attempted: 40000, corrected: 85000 },
          { day: 'Tue', attempted: 90000, corrected: 50000 },
          { day: 'Wed', attempted: 8000, corrected: 12000 },
          { day: 'Thu', attempted: 5000, corrected: 30000 },
          { day: 'Fri', attempted: 85000, corrected: 25000 },
          { day: 'Sat', attempted: 3000, corrected: 55000 }
        ];
      case 'This month':
        return [
          { day: 'Week 1', attempted: 180000, corrected: 380000 },
          { day: 'Week 2', attempted: 160000, corrected: 340000 },
          { day: 'Week 3', attempted: 360000, corrected: 200000 },
          { day: 'Week 4', attempted: 32000, corrected: 48000 }
        ];
      case 'This year':
        return [
          { day: 'Jan', attempted: 720000, corrected: 1520000 },
          { day: 'Feb', attempted: 640000, corrected: 1360000 },
          { day: 'Mar', attempted: 1440000, corrected: 800000 },
          { day: 'Apr', attempted: 128000, corrected: 192000 },
          { day: 'May', attempted: 20000, corrected: 120000 },
          { day: 'Jun', attempted: 340000, corrected: 100000 },
          { day: 'Jul', attempted: 12000, corrected: 220000 },
          { day: 'Aug', attempted: 200000, corrected: 400000 },
          { day: 'Sep', attempted: 176000, corrected: 300000 },
          { day: 'Oct', attempted: 196000, corrected: 300000 },
          { day: 'Nov', attempted: 212000, corrected: 320000 },
          { day: 'Dec', attempted: 164000, corrected: 280000 }
        ];
      default:
        return [
          { day: 'Sun', attempted: 45000, corrected: 95000 },
          { day: 'Mon', attempted: 40000, corrected: 85000 },
          { day: 'Tue', attempted: 90000, corrected: 50000 },
          { day: 'Wed', attempted: 8000, corrected: 12000 },
          { day: 'Thu', attempted: 5000, corrected: 30000 },
          { day: 'Fri', attempted: 85000, corrected: 25000 },
          { day: 'Sat', attempted: 3000, corrected: 55000 }
        ];
    }
  };

  const chartData = getDataForPeriod(selectedPeriod);

  // Format Y-axis values (500k, 100k, etc.)
  const formatYAxisValue = (value) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(0)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
    return value.toString();
  };

  // Get Y-axis domain and ticks
  const getYAxisConfig = () => {
    const allValues = chartData.flatMap(d => [d.attempted, d.corrected]);
    const maxValue = Math.max(...allValues);
    
    // Round up to nearest appropriate value
    let roundedMax;
    if (maxValue <= 500000) {
      roundedMax = 500000;
      return {
        domain: [0, 500000],
        ticks: [0, 10000, 50000, 100000, 500000]
      };
    } else if (maxValue <= 1000000) {
      roundedMax = 1000000;
      return {
        domain: [0, 1000000],
        ticks: [0, 100000, 500000, 1000000]
      };
    } else {
      roundedMax = 2000000;
      return {
        domain: [0, 2000000],
        ticks: [0, 500000, 1000000, 1500000, 2000000]
      };
    }
  };

  const yAxisConfig = getYAxisConfig();

  return (
    <div 
      className="relative bg-white w-full"
      style={{
        width: '100%',
        maxWidth: '600px',
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
          Question Answered in the last 7 day
        </h3>
        
        {/* Legend - Frame 369 */}
        <div 
          className="flex items-start"
          style={{
            gap: '16px'
          }}
        >
          {/* Attempted Legend */}
          <div 
            className="flex items-center"
            style={{
              gap: '4px'
            }}
          >
            <div
              style={{
                width: '6px',
                height: '6px',
                background: '#FF6636',
                borderRadius: '50%'
              }}
            />
            <span
              style={{
                fontFamily: 'Inter',
                fontSize: '12px',
                lineHeight: '18px',
                letterSpacing: '-0.01em',
                color: '#6E7485'
              }}
            >
              Attempted
            </span>
          </div>

          {/* Corrected Legend */}
          <div 
            className="flex items-center"
            style={{
              gap: '4px'
            }}
          >
            <div
              style={{
                width: '6px',
                height: '6px',
                background: '#398AC8',
                borderRadius: '50%'
              }}
            />
            <span
              style={{
                fontFamily: 'Inter',
                fontSize: '12px',
                lineHeight: '18px',
                letterSpacing: '-0.01em',
                color: '#6E7485'
              }}
            >
              Corrected
            </span>
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div 
        className="relative"
        style={{
          width: '100%',
          height: '280px',
          padding: '15px 0px 15px 0px'
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{
              top: 20,
              right: 20,
              left: 20,
              bottom: 30,
            }}
          >
            <defs>
              {/* Orange area gradient for Attempted */}
              <linearGradient id="attemptedAreaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop 
                  offset="0%" 
                  stopColor="#FF6636" 
                  stopOpacity={0.1}
                />
                <stop 
                  offset="100%" 
                  stopColor="rgba(255, 102, 54, 0)" 
                  stopOpacity={0}
                />
              </linearGradient>
              
              {/* Blue area gradient for Corrected */}
              <linearGradient id="correctedAreaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop 
                  offset="0%" 
                  stopColor="#398AC8" 
                  stopOpacity={0.1}
                />
                <stop 
                  offset="100%" 
                  stopColor="rgba(57, 138, 200, 0)" 
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            
            {/* Y-axis with custom ticks */}
            <YAxis 
              domain={yAxisConfig.domain}
              ticks={yAxisConfig.ticks}
              tickFormatter={formatYAxisValue}
              axisLine={false}
              tickLine={false}
              tick={{
                fontFamily: 'Inter',
                fontSize: 12,
                fill: '#A1A5B3',
                textAnchor: 'end'
              }}
              width={30}
            />
            
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
            
            {/* Attempted area fill - Orange shadow */}
            <Area
              type="monotone"
              dataKey="attempted"
              stroke="transparent"
              fill="url(#attemptedAreaGradient)"
            />
            
            {/* Corrected area fill - Blue shadow */}
            <Area
              type="monotone"
              dataKey="corrected"
              stroke="transparent"
              fill="url(#correctedAreaGradient)"
            />
            
            {/* Attempted line - Orange #FF6636 */}
            <Line
              type="monotone"
              dataKey="attempted"
              stroke="#FF6636"
              strokeWidth={2.4}
              dot={false}
              name="Attempted"
            />
            
            {/* Corrected line - Blue #398AC8 */}
            <Line
              type="monotone"
              dataKey="corrected"
              stroke="#398AC8"
              strokeWidth={2.4}
              dot={false}
              name="Corrected"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}