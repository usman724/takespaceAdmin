'use client';

import { useState } from 'react';

const DataTable = ({
  data = [],
  columns = [],
  dataColumns = null,
  title = '',
  searchPlaceholder = 'Search',
  showSearch = true,
  showPagination = false,
  itemsPerPage = 10,
  className = '',
  headerStyle = {},
  rowStyle = {},
  onRowClick = null,
  footerContent = null,
  summaryStats = null
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter data based on search term
  const filteredData = data.filter(row => {
    if (!searchTerm) return true;
    return Object.values(row).some(value => 
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = showPagination 
    ? filteredData.slice(startIndex, endIndex) 
    : filteredData;

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={`bg-white rounded-[20px] shadow-[0px_2px_6px_rgba(13,10,44,0.08)] overflow-hidden ${className}`}>
      {/* Table Header */}
      <div className="flex justify-between items-center p-6 pb-4">
        <h3 
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '18px',
            fontWeight: 600,
            color: '#103358',
            ...headerStyle
          }}
        >
          {title}
        </h3>
        {showSearch && (
          <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2">
            <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder={searchPlaceholder} 
              value={searchTerm}
              onChange={handleSearch}
              className="bg-transparent outline-none text-sm w-32"
              style={{
                fontFamily: 'Poppins, sans-serif',
                color: '#9CA3AF'
              }}
            />
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            {/* Multi-level headers support */}
            {columns.map((headerRow, rowIndex) => (
              <tr key={rowIndex} style={{ backgroundColor: headerRow.backgroundColor || '#103358' }}>
                {headerRow.cells.map((cell, cellIndex) => (
                  <th 
                    key={cellIndex}
                    className={`px-6 py-4 text-white font-medium ${cell.align || 'text-left'}`}
                    colSpan={cell.colSpan || 1}
                    rowSpan={cell.rowSpan || 1}
                    style={{
                      borderBottom: headerRow.borderBottom || '1px solid rgba(255,255,255,0.2)',
                      ...cell.style
                    }}
                  >
                    {cell.content}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
                             <tr 
                 key={index} 
                 className="border-b border-gray-200 hover:bg-gray-50"
                 style={{
                   cursor: onRowClick ? 'pointer' : 'default',
                   ...rowStyle
                 }}
                 onClick={() => onRowClick && onRowClick(row, index)}
               >
                 {dataColumns ? dataColumns.map((cell, colIndex) => (
                   <td key={colIndex} className={`px-6 py-4 ${cell.align || 'text-left'}`}>
                     {cell.render ? cell.render(row[cell.key], row) : row[cell.key]}
                   </td>
                 )) : columns[columns.length - 1].cells.map((cell, colIndex) => (
                   <td key={colIndex} className={`px-6 py-4 ${cell.align || 'text-left'}`}>
                     {cell.render ? cell.render(row[cell.key], row) : row[cell.key]}
                   </td>
                 ))}
               </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      {(footerContent || summaryStats || showPagination) && (
        <div className="bg-gray-50 p-6">
          {/* Pagination */}
          {showPagination && totalPages > 1 && (
            <div className="flex justify-center mb-4">
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded text-sm disabled:opacity-50"
                  style={{
                    backgroundColor: currentPage === 1 ? '#E5E7EB' : '#103358',
                    color: currentPage === 1 ? '#9CA3AF' : '#FFFFFF',
                    fontFamily: 'Poppins, sans-serif'
                  }}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className="px-3 py-1 rounded text-sm"
                    style={{
                      backgroundColor: currentPage === page ? '#398AC8' : '#103358',
                      color: '#FFFFFF',
                      fontFamily: 'Poppins, sans-serif'
                    }}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded text-sm disabled:opacity-50"
                  style={{
                    backgroundColor: currentPage === totalPages ? '#E5E7EB' : '#103358',
                    color: currentPage === totalPages ? '#9CA3AF' : '#FFFFFF',
                    fontFamily: 'Poppins, sans-serif'
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Custom Footer Content */}
          {footerContent && (
            <div className="flex justify-center mb-4">
              {footerContent}
            </div>
          )}

          {/* Summary Stats */}
          {summaryStats && (
            <div className="grid grid-cols-6 gap-4 text-center">
              {summaryStats.map((stat, index) => (
                <div key={index}>
                  <div style={{ 
                    fontFamily: 'Poppins, sans-serif', 
                    fontSize: '12px', 
                    color: '#6B7280' 
                  }}>
                    {stat.label}
                  </div>
                  <div style={{ 
                    fontFamily: 'Poppins, sans-serif', 
                    fontWeight: 500, 
                    color: '#374151' 
                  }}>
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DataTable; 