'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const TopicsDisplay = ({
  leftColumn = {
    title: '5.1 Fractions',
    topics: [],
    showStatus: true
  },
  rightColumn = {
    title: 'Units and Topics',
    topics: [],
    showStatus: true
  },
  filters = [],
  onFilterChange,
  className = '',
  showSeparator = true,
  maxHeight = '520px',
  scrollable = true
}) => {
  const { t } = useTranslation();
  const [selectedFilters, setSelectedFilters] = useState({});

  // Refs and state for custom center scrollbar synced with left column scroll
  const leftScrollRef = useRef(null);
  const [trackMetrics, setTrackMetrics] = useState({
    trackHeight: 0,
    thumbHeight: 0,
    thumbOffset: 0
  });

  // Helper to recalc track metrics
  const recalcTrackMetrics = () => {
    const el = leftScrollRef.current;
    if (!el) return;
    const client = el.clientHeight;
    const scroll = el.scrollHeight;
    const trackHeight = client; // Match visual track to the actual visible area height
    const ratio = scroll > 0 ? client / scroll : 1;
    const thumbHeight = Math.max(20, Math.round(trackHeight * ratio));
    const maxThumbOffset = Math.max(0, trackHeight - thumbHeight);
    const progress = scroll > client ? el.scrollTop / (scroll - client) : 0;
    const thumbOffset = Math.round(maxThumbOffset * progress);
    setTrackMetrics({ trackHeight, thumbHeight, thumbOffset });
  };

  useEffect(() => {
    recalcTrackMetrics();
    const handleResize = () => recalcTrackMetrics();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLeftScroll = () => {
    recalcTrackMetrics();
  };

  const getStatusDot = (status) => {
    if (!status) return null;
    
    const colors = {
      green: '#6AA84F',
      yellow: '#FFD966',
      red: '#FF0000'
    };

    return (
      <div 
        className="rounded-full flex-shrink-0"
        style={{
          width: '9px',
          height: '9px',
          backgroundColor: colors[status],
          borderRadius: '30px'
        }}
      />
    );
  };

  const handleFilterChange = (filterKey, value) => {
    const newFilters = { ...selectedFilters, [filterKey]: value };
    setSelectedFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  return (
    <div className={`max-w-[1124px] mx-auto ${className}`}>
      {/* Filters Section */}
      {filters.length > 0 && (
        <div className="mb-6">
          <div className="flex flex-wrap gap-4">
            {filters.map((filter) => (
              <div key={filter.key} className="bg-white border border-gray-300 rounded-lg px-4 py-2">
                <span className="text-[#103358] text-sm">
                  {filter.label}: {selectedFilters[filter.key] || filter.defaultValue || 'All'}
                </span>
                {filter.options && (
                  <select
                    value={selectedFilters[filter.key] || ''}
                    onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                    className="ml-2 text-sm border-none bg-transparent focus:outline-none"
                  >
                    {filter.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Content Card */}
      <div 
        className="bg-white rounded-[20px] p-4 sm:p-6 lg:p-8"
        style={{
          boxShadow: '0px 2px 6px rgba(13, 10, 44, 0.08)'
        }}
      >
        {/* 3-column grid on large screens: left | center track | right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-12 xl:gap-16 relative">
          {/* Left Column */}
          <div className="relative">
            <h2 
              className="mb-4 sm:mb-6"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontStyle: 'normal',
                fontWeight: 700,
                fontSize: 'clamp(18px, 3vw, 22px)',
                lineHeight: '28px',
                color: '#1E1B39'
              }}
            >
              {leftColumn.title}
            </h2>
            
            <div 
              ref={leftScrollRef}
              onScroll={scrollable ? handleLeftScroll : undefined}
              className={scrollable ? "scrollable-content pr-4" : ""}
              style={{
                maxHeight: scrollable ? maxHeight : 'auto',
                overflowY: scrollable ? 'auto' : 'visible'
              }}
            >
              {leftColumn.topics.map((topic, index) => (
                <div key={topic.id || index} className="flex items-center justify-between py-2.5">
                  <span 
                    className="flex-1 mr-4"
                    style={{
                      fontFamily: 'Roboto, sans-serif',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      fontSize: 'clamp(11px, 2vw, 13px)',
                      lineHeight: '39px',
                      color: '#000000'
                    }}
                  >
                    {index + 1}. {topic.name}
                  </span>
                  {leftColumn.showStatus && getStatusDot(topic.status)}
                </div>
              ))}
            </div>
          </div>

          {/* Center custom scrollbar track (visible on lg+) */}
          {showSeparator && (
            <div className="hidden lg:flex flex-col items-center">
              {/* Spacer to align with headings margin */}
              <div className="mb-4 sm:mb-6" style={{ height: 0 }} />
              <div
                aria-hidden
                style={{
                  width: '6px',
                  height: `${trackMetrics.trackHeight || parseInt(maxHeight, 10) || 520}px`,
                  background: '#F2F2F2',
                  borderRadius: '40px',
                  position: 'relative'
                }}
              >
                {/* Thumb */}
                {trackMetrics.trackHeight > 0 && (
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: `${trackMetrics.thumbOffset}px`,
                      width: '6px',
                      height: `${trackMetrics.thumbHeight}px`,
                      background: '#398AC8',
                      borderRadius: '40px'
                    }}
                  />
                )}
              </div>
            </div>
          )}

          {/* Right Column */}
          <div className="relative">
            <h2 
              className="mb-4 sm:mb-6"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontStyle: 'normal',
                fontWeight: 700,
                fontSize: 'clamp(18px, 3vw, 22px)',
                lineHeight: '28px',
                color: '#1E1B39'
              }}
            >
              {rightColumn.title}
            </h2>
            
            <div>
              {rightColumn.topics.map((topic, index) => (
                <div key={topic.id || index} className="flex items-center justify-between py-2.5">
                  <span 
                    className="flex-1 mr-4"
                    style={{
                      fontFamily: 'Roboto, sans-serif',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      fontSize: 'clamp(11px, 2vw, 13px)',
                      lineHeight: '39px',
                      color: '#000000'
                    }}
                  >
                    {index + 1}. {topic.name}
                  </span>
                  {rightColumn.showStatus && getStatusDot(topic.status)}
                </div>
              ))}
            </div>
          </div>

          {/* Fallback thin separator for non-scrollable mode or when track hidden */}
          {!scrollable && showSeparator && (
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#E5E5E5] transform -translate-x-1/2"></div>
          )}
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      {scrollable && (
        <style jsx global>{`
          .scrollable-content {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          
          .scrollable-content::-webkit-scrollbar {
            width: 0px;
            background: transparent;
            display: none;
          }
          
          .scrollable-content::-webkit-scrollbar-thumb {
            background: transparent;
          }

          @media (max-width: 1023px) {
            .scrollable-content {
              max-height: 400px !important;
            }
          }

          @media (max-width: 640px) {
            .scrollable-content {
              max-height: 300px !important;
            }
          }
        `}</style>
      )}
    </div>
  );
};

export default TopicsDisplay; 