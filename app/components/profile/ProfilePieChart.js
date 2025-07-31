'use client';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function ProfilePieChart({ title, subtitle, data, colors, subjects }) {
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
    
    // Calculate position inside the slice
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
    
    // Format the label text
    let labelText;
    if (percentage >= 20) {
      labelText = `${value}(${percentage}%)`;
    } else {
      labelText = `${percentage}%`;
    }
    
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

  return (
    <div className="w-full">
      {/* Chart Card */}
      <div
        className="bg-white rounded-xl relative"
        style={{
          border: '1px solid #D7D7D7',
          width: '100%',
          height: '350px',
          padding: '20px',
          paddingBottom: '68px'
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
          className="relative flex items-center justify-center" 
          style={{ 
            height: 'calc(100% - 80px)',
            width: '100%',
            marginTop: '20px'
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={0}
                outerRadius={80}
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

        {/* Subjects Legend */}
        <div 
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bottom: '40px'
          }}
        >
          <div className="flex items-center justify-center gap-4">
            {subjects.map((subject, index) => (
              <span
                key={index}
                style={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  fontSize: '14px',
                  lineHeight: '17px',
                  color: '#103358'
                }}
              >
                {subject}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 