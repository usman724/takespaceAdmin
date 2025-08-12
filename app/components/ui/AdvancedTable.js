'use client';

import { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';

const AdvancedTable = ({
  data = [],
  columns = [],
  title = '',
  searchPlaceholder = 'Search',
  showSearch = true,
  showPagination = true,
  pageSize = 10,
  className = '',
  headerStyle = {},
  rowStyle = {},
  onRowClick = null,
  footerContent = null,
  summaryStats = null,
  multiLevelHeaders = false,
  headerGroups = []
}) => {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [rowSelection, setRowSelection] = useState({});

  const columnHelper = createColumnHelper();

  // Create columns for react-table
  const tableColumns = useMemo(() => {
    return columns.map(col => {
      const column = columnHelper.accessor(col.key, {
        header: col.title || col.key,
        cell: col.render ? (info) => col.render(info.getValue(), info.row.original) : info => info.getValue(),
        enableSorting: col.sortable !== false,
        enableColumnFilter: col.filterable !== false,
      });

      if (col.width) {
        column.size = col.width;
      }

      return column;
    });
  }, [columns, columnHelper]);

  const table = useReactTable({
    data,
    columns: tableColumns,
    state: {
      sorting,
      globalFilter,
      rowSelection,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize,
      },
    },
  });

  const handleSearch = (e) => {
    setGlobalFilter(e.target.value);
  };

  return (
    <div className={`bg-white rounded-[20px] shadow-[0px_2px_6px_rgba(13,10,44,0.08)] overflow-hidden ${className}`}>
      {/* Table Header */}
      <div className="flex flex-wrap gap-3 justify-between items-center p-6 pb-4">
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
          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 w-full sm:w-auto">
            <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder={searchPlaceholder} 
              value={globalFilter ?? ''}
              onChange={handleSearch}
              className="bg-transparent outline-none text-sm w-full sm:w-40"
              style={{
                fontFamily: 'Poppins, sans-serif',
                color: '#9CA3AF'
              }}
            />
          </div>
        )}
      </div>

      {/* Table with horizontal scroll */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-full md:min-w-[900px] lg:min-w-[1200px] table-fixed">
          <thead>
            {multiLevelHeaders && headerGroups ? (
              // Multi-level headers
              headerGroups.map((headerGroup, groupIndex) => (
                <tr key={groupIndex} style={{ backgroundColor: headerGroup.backgroundColor || '#103358' }}>
                  {headerGroup.cells.map((cell, cellIndex) => (
                    <th 
                      key={cellIndex}
                      className={`px-3 md:px-6 py-2.5 md:py-4 text-white font-medium text-xs md:text-sm ${cell.align || 'text-left'}`}
                      colSpan={cell.colSpan || 1}
                      rowSpan={cell.rowSpan || 1}
                      style={{
                        borderBottom: headerGroup.borderBottom || '1px solid rgba(255,255,255,0.2)',
                        ...cell.style
                      }}
                    >
                      {cell.content}
                    </th>
                  ))}
                </tr>
              ))
            ) : (
              // Single level headers with sorting
              table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} style={{ backgroundColor: '#103358' }}>
                  {headerGroup.headers.map(header => (
                    <th
                      key={header.id}
                      className={`px-3 md:px-6 py-2.5 md:py-4 text-white font-medium text-xs md:text-sm cursor-pointer hover:bg-[#2E4F73] transition-colors ${
                        header.column.getCanSort() ? 'cursor-pointer select-none' : ''
                      }`}
                      onClick={header.column.getToggleSortingHandler()}
                      style={{ width: header.getSize() }}
                    >
                      <div className="flex items-center justify-between">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getCanSort() && (
                          <span className="ml-2">
                            {{
                              asc: ' 🔼',
                              desc: ' 🔽',
                            }[header.column.getIsSorted()] ?? ' ↕️'}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))
            )}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, index) => (
              <tr 
                key={row.id} 
                className="border-b border-gray-200 hover:bg-gray-50"
                style={{
                  cursor: onRowClick ? 'pointer' : 'default',
                  ...rowStyle
                }}
                onClick={() => onRowClick && onRowClick(row.original, index)}
              >
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
          {/* Custom Footer Content - "See 100 more" button */}
          {footerContent && (
            <div className="flex justify-center mb-4">
              {footerContent}
            </div>
          )}

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="h-2 rounded-full" 
              style={{ 
                width: '30%',
                backgroundColor: '#398AC8'
              }}
            />
          </div>

          {/* Summary Stats */}
          {summaryStats && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-center">
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

          {/* Pagination (optional) */}
          {showPagination && (
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className="px-3 py-1 rounded text-sm disabled:opacity-50"
                  style={{
                    backgroundColor: !table.getCanPreviousPage() ? '#E5E7EB' : '#103358',
                    color: !table.getCanPreviousPage() ? '#9CA3AF' : '#FFFFFF',
                    fontFamily: 'Poppins, sans-serif'
                  }}
                >
                  Previous
                </button>
                <span className="text-sm text-gray-600">
                  Page {table.getState().pagination.pageIndex + 1} of{' '}
                  {table.getPageCount()}
                </span>
                <button
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className="px-3 py-1 rounded text-sm disabled:opacity-50"
                  style={{
                    backgroundColor: !table.getCanNextPage() ? '#E5E7EB' : '#103358',
                    color: !table.getCanNextPage() ? '#9CA3AF' : '#FFFFFF',
                    fontFamily: 'Poppins, sans-serif'
                  }}
                >
                  Next
                </button>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Show</span>
                <select
                  value={table.getState().pagination.pageSize}
                  onChange={e => {
                    table.setPageSize(Number(e.target.value))
                  }}
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {[10, 20, 30, 40, 50].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                      {pageSize}
                    </option>
                  ))}
                </select>
                <span className="text-sm text-gray-600">entries</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdvancedTable; 