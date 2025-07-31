'use client';
import { useState } from 'react';

const FilterDropdown = ({
  label,
  value,
  options = [],
  onChange,
  width = '172px'
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange && onChange(option);
    setIsOpen(false);
  };

  // Calculate dynamic font size based on text length and width
  const getOptimalFontSize = (text, containerWidth) => {
    const widthNum = parseInt(containerWidth);
    const textLength = text.length;
    
    // Base font size calculation
    if (widthNum <= 172 && textLength > 12) return '12px';
    if (widthNum <= 207 && textLength > 15) return '13px';
    if (widthNum <= 225 && textLength > 18) return '13px';
    
    return '14px';
  };

  const displayText = `${label}: ${value}`;
  const fontSize = getOptimalFontSize(displayText, width);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between"
        style={{
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '5px 0px',
          gap: '8px',
          width: width,
          height: '46px',
          background: '#FFFFFF',
          border: '1px solid rgba(0, 0, 0, 0.05)',
          boxShadow: '0px 0px 25px rgba(0, 0, 0, 0.05)',
          borderRadius: '10px'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '8px 16px',
            gap: '8px',
            width: '100%',
            height: '36px'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              height: '20px'
            }}
          >
            <span
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontStyle: 'normal',
               
                fontSize: fontSize,
                lineHeight: '20px',
                color: '#103358',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: `calc(${width} - 50px)` // Reserve space for arrow
              }}
              title={displayText} // Show full text on hover
            >
              {displayText}
            </span>
            
            {/* SVG Arrow with rotation */}
            <svg
              className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              style={{
                width: '20px',
                height: '6.73px',
                flexShrink: 0
              }}
              fill="none"
              stroke="#103358"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute z-10 mt-1 bg-white border rounded-lg shadow-lg"
          style={{
            width: width,
            border: '1px solid rgba(0, 0, 0, 0.05)',
            boxShadow: '0px 0px 25px rgba(0, 0, 0, 0.05)',
            borderRadius: '10px',
            maxHeight: '200px',
            overflowY: 'auto'
          }}
        >
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelect(option)}
              className="w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors"
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '14px',
            
                color: '#103358',
                border: 'none',
                background: 'transparent',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
              title={option} // Show full text on hover
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;