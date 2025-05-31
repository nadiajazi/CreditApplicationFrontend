import React, { forwardRef } from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

export interface Column<T = any> {
  key: string;
  title: string;
  dataIndex?: string;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  sortable?: boolean;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export interface TableProps<T = any> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  pagination?: boolean;
  pageSize?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
  sortKey?: string;
  sortDirection?: 'asc' | 'desc';
  rowKey?: string | ((record: T) => string);
  onRowClick?: (record: T, index: number) => void;
  emptyText?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  striped?: boolean;
  bordered?: boolean;
  hoverable?: boolean;
}

const Table = <T extends Record<string, any>>({
  columns,
  data,
  loading = false,
  pagination = false,
  pageSize = 10,
  currentPage = 1,
  onPageChange,
  onSort,
  sortKey,
  sortDirection,
  rowKey = 'id',
  onRowClick,
  emptyText = 'No data available',
  className = '',
  size = 'md',
  striped = false,
  bordered = false,
  hoverable = true,
}: TableProps<T>) => {
  // Size classes
  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const cellPaddingClasses = {
    sm: 'px-3 py-2',
    md: 'px-4 py-3',
    lg: 'px-6 py-4',
  };

  // Get row key
  const getRowKey = (record: T, index: number): string => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    return record[rowKey] || index.toString();
  };

  // Handle sort
  const handleSort = (key: string) => {
    if (!onSort) return;
    
    let direction: 'asc' | 'desc' = 'asc';
    if (sortKey === key && sortDirection === 'asc') {
      direction = 'desc';
    }
    onSort(key, direction);
  };

  // Render cell content
  const renderCell = (column: Column<T>, record: T, index: number) => {
    if (column.render) {
      return column.render(record[column.dataIndex || column.key], record, index);
    }
    return record[column.dataIndex || column.key];
  };

  // Pagination logic
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = pagination ? data.slice(startIndex, endIndex) : data;
  const totalPages = Math.ceil(data.length / pageSize);

  return (
    <div className={`overflow-hidden rounded-xl ${className}`}>
      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className={`
          w-full ${sizeClasses[size]}
          ${bordered ? 'border border-neutral-200' : ''}
        `}>
          {/* Table Header */}
          <thead className="bg-neutral-50 border-b border-neutral-200">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`
                    ${cellPaddingClasses[size]}
                    font-semibold text-neutral-900 
                    text-${column.align || 'left'}
                    ${column.sortable ? 'cursor-pointer hover:bg-neutral-100 transition-colors' : ''}
                    ${column.className || ''}
                  `}
                  style={{ width: column.width }}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center gap-2">
                    <span>{column.title}</span>
                    {column.sortable && (
                      <div className="flex flex-col">
                        <ChevronUpIcon 
                          className={`h-3 w-3 ${
                            sortKey === column.key && sortDirection === 'asc' 
                              ? 'text-primary-600' 
                              : 'text-neutral-400'
                          }`} 
                        />
                        <ChevronDownIcon 
                          className={`h-3 w-3 -mt-1 ${
                            sortKey === column.key && sortDirection === 'desc' 
                              ? 'text-primary-600' 
                              : 'text-neutral-400'
                          }`} 
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="bg-white divide-y divide-neutral-200">
            {loading ? (
              <tr>
                <td colSpan={columns.length} className={`${cellPaddingClasses[size]} text-center`}>
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                    <span className="ml-3 text-neutral-600">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className={`${cellPaddingClasses[size]} text-center text-neutral-500 py-8`}>
                  {emptyText}
                </td>
              </tr>
            ) : (
              paginatedData.map((record, index) => (
                <tr
                  key={getRowKey(record, index)}
                  className={`
                    ${striped && index % 2 === 1 ? 'bg-neutral-25' : ''}
                    ${hoverable ? 'hover:bg-neutral-50 transition-colors' : ''}
                    ${onRowClick ? 'cursor-pointer' : ''}
                  `}
                  onClick={() => onRowClick?.(record, index)}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={`
                        ${cellPaddingClasses[size]}
                        text-neutral-900
                        text-${column.align || 'left'}
                        ${column.className || ''}
                      `}
                    >
                      {renderCell(column, record, index)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 bg-neutral-50 border-t border-neutral-200">
          <div className="text-sm text-neutral-600">
            Showing {startIndex + 1} to {Math.min(endIndex, data.length)} of {data.length} results
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange?.(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm border border-neutral-300 rounded-md hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => onPageChange?.(page)}
                className={`
                  px-3 py-1 text-sm border rounded-md transition-colors
                  ${page === currentPage 
                    ? 'bg-primary-600 text-white border-primary-600' 
                    : 'border-neutral-300 hover:bg-neutral-100'
                  }
                `}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => onPageChange?.(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm border border-neutral-300 rounded-md hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export { Table };
export default Table;
