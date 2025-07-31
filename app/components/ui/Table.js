'use client';

import { useTranslation } from 'react-i18next';

const Table = ({ 
  columns, 
  data, 
  className = '',
  showHeader = true,
  striped = false,
  ...props 
}) => {
  const { t } = useTranslation();

  const baseClasses = 'w-full border-collapse';
  const classes = `${baseClasses} ${className}`;

  return (
    <div className="overflow-x-auto">
      <table className={classes} {...props}>
        {showHeader && (
          <thead>
            <tr className="bg-[#103358] text-white">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`px-4 py-3 text-left font-semibold ${column.align || 'text-left'}`}
                  style={{ width: column.width }}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`border-b border-gray-200 ${
                striped && rowIndex % 2 === 1 ? 'bg-gray-50' : 'bg-white'
              }`}
            >
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className={`px-4 py-3 ${column.align || 'text-left'}`}
                >
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table; 