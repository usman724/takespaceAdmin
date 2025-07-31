'use client';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function PieChart({ title, data, colors }) {
  // Calculate total for percentage calculation
  const total = data.reduce((sum, item) => sum + item.value, 0);

  // Transform data to include percentages
  const chartData = data.map((item, index) => ({
    ...item,
    percentage: Math.round((item.value / total) * 100),
    color: colors[index % colors.length]
  }));

  // Custom label component that positions text inside pie slices
  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
    const percentage = Math.round((value / total) * 100);
    
    // Only show labels for slices that are big enough
    if (percentage < 8) return null;
    
    // Calculate position inside the slice - adjusted for better positioning
    const RADIAN = Math.PI / 180;
    let radius;
    
    // For very small slices, position closer to edge
    if (percentage < 15) {
      radius = innerRadius + (outerRadius - innerRadius) * 0.75;
    } else {
      radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    }
    
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    // Format the label text to show only the value, removing the percentage.
    const labelText = value;
    
    return (
      <text 
        x={x} 
        y={y} 
        fill="#FFFFFF" 
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="14"
        fontWeight="600"
        fontFamily="Inter"
      >
        {labelText}
      </text>
    );
  };

  // Check if this is the mastery chart (has more than 2 items)
  const isMasteryChart = data.length > 2;

  return (
    <div className="w-full max-w-[400px]">
      {/* Title outside the card */}
      <h3 
        className="mb-4"
        style={{
          fontFamily: 'Inter',
          fontWeight: '600',
          fontSize: '20px',
          lineHeight: '24px',
          color: '#1D2026'
        }}
      >
        {title}
      </h3>

      {/* Chart Card with exact padding */}
      <div
        className="bg-white rounded-xl relative"
        style={{
          border: '1px solid #D7D7D7',
          width: '100%',
          height: '400px',
          padding: '26px 47px 55px 46px' // Top Right Bottom Left
        }}
      >
        {/* Chart Container */}
        <div 
          className="relative flex items-center justify-center" 
          style={{ 
            height: 'calc(100% - 40px)', // Account for legend space
            width: '100%'
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={0}
                outerRadius={isMasteryChart ? 85 : 95}
                dataKey="value"
                startAngle={90}
                endAngle={450}
                labelLine={false}
                label={CustomLabel}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend positioned at bottom */}
        <div 
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bottom: '20px'
          }}
        >
          {!isMasteryChart ? (
            // Simple 2-item legend for Correct/Wrong
            <div className="flex items-center justify-center gap-6">
              {data.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="rounded-full"
                    style={{
                      width: '12px',
                      height: '12px',
                      background: colors[index]
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'Inter',
                      fontSize: '14px',
                      lineHeight: '20px',
                      color: '#1D2026',
                      fontWeight: '500'
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            // Multi-row legend for Mastery chart
            <div className="flex flex-col items-center gap-1">
              {/* First row */}
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <div className="flex items-center gap-1">
                  <div
                    className="rounded-full"
                    style={{
                      width: '10px',
                      height: '10px',
                      background: colors[0]
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'Inter',
                      fontSize: '11px',
                      color: '#666',
                      fontWeight: '400'
                    }}
                  >
                    Mastered
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <div
                    className="rounded-full"
                    style={{
                      width: '10px',
                      height: '10px',
                      background: colors[1]
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'Inter',
                      fontSize: '11px',
                      color: '#666',
                      fontWeight: '400'
                    }}
                  >
                    Revised Later
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <div
                    className="rounded-full"
                    style={{
                      width: '10px',
                      height: '10px',
                      background: colors[2]
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'Inter',
                      fontSize: '11px',
                      color: '#666',
                      fontWeight: '400'
                    }}
                  >
                    Last Revision
                  </span>
                </div>
              </div>
              
              {/* Second row */}
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <div className="flex items-center gap-1">
                  <div
                    className="rounded-full"
                    style={{
                      width: '10px',
                      height: '10px',
                      background: colors[3]
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'Inter',
                      fontSize: '11px',
                      color: '#666',
                      fontWeight: '400'
                    }}
                  >
                    3 More Revision left
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <div
                    className="rounded-full"
                    style={{
                      width: '10px',
                      height: '10px',
                      background: colors[4]
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'Inter',
                      fontSize: '11px',
                      color: '#666',
                      fontWeight: '400'
                    }}
                  >
                    Difficult
                  </span>
                </div>
              </div>
              
              {/* Third row */}
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <div className="flex items-center gap-1">
                  <div
                    className="rounded-full"
                    style={{
                      width: '10px',
                      height: '10px',
                      background: '#FFC107'
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'Inter',
                      fontSize: '11px',
                      color: '#666',
                      fontWeight: '400'
                    }}
                  >
                    Haven't Started
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <div
                    className="rounded-full"
                    style={{
                      width: '10px',
                      height: '10px',
                      background: '#FF9800'
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'Inter',
                      fontSize: '11px',
                      color: '#666',
                      fontWeight: '400'
                    }}
                  >
                    2 More Revision left
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}