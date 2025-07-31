'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Chart = ({
  type = 'bar',
  data = {},
  options = {},
  title = '',
  height = '320px',
  width = '100%',
  className = '',
  annotations = [],
  showGoalLine = false,
  goalValue = 0,
  showAverage = false,
  averageValue = 0,
  customStyles = {},
  onChartClick = null
}) => {
  // Default chart options based on type
  const getDefaultOptions = (chartType) => {
    const baseOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: '#103358',
          titleColor: '#FFFFFF',
          bodyColor: '#FFFFFF',
          cornerRadius: 8,
        },
      },
      onHover: (event, elements) => {
        event.native.target.style.cursor = elements.length > 0 ? 'pointer' : 'default';
      },
    };

    if (chartType === 'bar') {
      return {
        ...baseOptions,
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: '#9CA3AF',
              font: {
                family: 'Poppins',
                size: 12,
              },
              maxRotation: 45,
              minRotation: 45,
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: '#E5E7EB',
              drawBorder: false,
            },
            ticks: {
              color: '#9CA3AF',
              font: {
                family: 'Poppins',
                size: 12,
              },
            },
          },
        },
      };
    }

    if (chartType === 'line') {
      return {
        ...baseOptions,
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: '#9CA3AF',
              font: {
                family: 'Poppins',
                size: 12,
              },
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: '#E5E7EB',
              drawBorder: false,
            },
            ticks: {
              color: '#9CA3AF',
              font: {
                family: 'Poppins',
                size: 12,
              },
            },
          },
        },
      };
    }

    if (chartType === 'doughnut') {
      return {
        ...baseOptions,
        plugins: {
          ...baseOptions.plugins,
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              font: {
                family: 'Poppins',
                size: 12,
              },
              color: '#374151',
            },
          },
        },
      };
    }

    return baseOptions;
  };

  // Merge default options with custom options
  const chartOptions = {
    ...getDefaultOptions(type),
    ...options,
  };

  // Render chart based on type
  const renderChart = () => {
    const chartProps = {
      data,
      options: chartOptions,
      onClick: onChartClick,
    };

    switch (type) {
      case 'bar':
        return <Bar {...chartProps} />;
      case 'line':
        return <Line {...chartProps} />;
      case 'doughnut':
        return <Doughnut {...chartProps} />;
      default:
        return <Bar {...chartProps} />;
    }
  };

  return (
    <div 
      className={`bg-white rounded-[20px] p-8 shadow-[0px_2px_6px_rgba(13,10,44,0.08)] ${className}`}
      style={{
        width,
        height,
        ...customStyles
      }}
    >
      {/* Chart Title */}
      {title && (
        <h2 
          className="mb-6"
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '20px',
            fontWeight: 600,
            color: '#103358'
          }}
        >
          {title}
        </h2>
      )}
      
      {/* Chart Container */}
      <div className="relative" style={{ height: 'calc(100% - 60px)' }}>
        {/* Annotations */}
        {annotations.map((annotation, index) => (
          <div 
            key={index}
            className="absolute z-10 px-3 py-1 rounded text-white text-sm"
            style={{
              top: annotation.top || '20%',
              right: annotation.right || '4px',
              left: annotation.left,
              bottom: annotation.bottom,
              backgroundColor: annotation.backgroundColor || '#398AC8',
              fontFamily: 'Poppins, sans-serif',
              ...annotation.style
            }}
          >
            {annotation.content}
          </div>
        ))}

        {/* Goal Line Annotation */}
        {showGoalLine && (
          <div 
            className="absolute right-4 z-10 px-3 py-1 rounded text-white text-sm"
            style={{
              top: '20%',
              backgroundColor: '#398AC8',
              fontFamily: 'Poppins, sans-serif'
            }}
          >
            Goal: {goalValue}
          </div>
        )}

        {/* Average Annotation */}
        {showAverage && (
          <div 
            className="absolute right-4 z-10 px-2 py-1 rounded text-white text-xs"
            style={{
              bottom: '25%',
              backgroundColor: '#103358',
              fontFamily: 'Poppins, sans-serif'
            }}
          >
            {averageValue} ⟚
          </div>
        )}

        {/* Chart */}
        {renderChart()}
      </div>
    </div>
  );
};

export default Chart; 