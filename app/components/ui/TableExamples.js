'use client';

import { useState } from 'react';
import DataTable from './DataTable';
import AdvancedTable from './AdvancedTable';

const TableExamples = () => {
  // Sample data for examples
  const sampleData = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      status: 'Active',
      lastLogin: '2024-01-15',
      score: 95
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'User',
      status: 'Inactive',
      lastLogin: '2024-01-10',
      score: 87
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      role: 'Moderator',
      status: 'Active',
      lastLogin: '2024-01-12',
      score: 92
    },
    {
      id: 4,
      name: 'Alice Brown',
      email: 'alice@example.com',
      role: 'User',
      status: 'Active',
      lastLogin: '2024-01-14',
      score: 78
    },
    {
      id: 5,
      name: 'Charlie Wilson',
      email: 'charlie@example.com',
      role: 'Admin',
      status: 'Inactive',
      lastLogin: '2024-01-08',
      score: 89
    }
  ];

  // Multi-level header example
  const multiLevelHeaders = [
    {
      backgroundColor: '#103358',
      cells: [
        { content: 'User Info', colSpan: 2, rowSpan: 1 },
        { content: 'Account Details', colSpan: 2, rowSpan: 1 },
        { content: 'Performance', colSpan: 1, rowSpan: 1 }
      ]
    },
    {
      backgroundColor: '#2E4F73',
      cells: [
        { content: 'Name', align: 'left' },
        { content: 'Email', align: 'left' },
        { content: 'Role', align: 'center' },
        { content: 'Status', align: 'center' },
        { content: 'Score', align: 'center' }
      ]
    }
  ];

  // Data columns for multi-level table
  const multiLevelDataColumns = [
    {
      key: 'name',
      render: (value) => (
        <div style={{ fontFamily: 'Poppins, sans-serif', color: '#374151' }}>
          {value}
        </div>
      )
    },
    {
      key: 'email',
      render: (value) => (
        <div style={{ fontFamily: 'Poppins, sans-serif', color: '#374151' }}>
          {value}
        </div>
      )
    },
    {
      key: 'role',
      render: (value) => (
        <div style={{ fontFamily: 'Poppins, sans-serif', color: '#374151', textAlign: 'center' }}>
          {value}
        </div>
      )
    },
    {
      key: 'status',
      render: (value) => (
        <div style={{ 
          fontFamily: 'Poppins, sans-serif', 
          color: value === 'Active' ? '#10B981' : '#EF4444',
          textAlign: 'center',
          fontWeight: 500
        }}>
          {value}
        </div>
      )
    },
    {
      key: 'score',
      render: (value) => (
        <div style={{ fontFamily: 'Poppins, sans-serif', color: '#2563EB', textAlign: 'center', fontWeight: 500 }}>
          {value}
        </div>
      )
    }
  ];

  // Advanced table columns
  const advancedColumns = [
    {
      key: 'name',
      title: 'Name',
      sortable: true,
      render: (value) => (
        <div style={{ fontFamily: 'Poppins, sans-serif', color: '#374151' }}>
          {value}
        </div>
      )
    },
    {
      key: 'email',
      title: 'Email',
      sortable: true,
      render: (value) => (
        <div style={{ fontFamily: 'Poppins, sans-serif', color: '#374151' }}>
          {value}
        </div>
      )
    },
    {
      key: 'role',
      title: 'Role',
      sortable: true,
      render: (value) => (
        <div style={{ fontFamily: 'Poppins, sans-serif', color: '#374151', textAlign: 'center' }}>
          {value}
        </div>
      )
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      render: (value) => (
        <div style={{ 
          fontFamily: 'Poppins, sans-serif', 
          color: value === 'Active' ? '#10B981' : '#EF4444',
          textAlign: 'center',
          fontWeight: 500
        }}>
          {value}
        </div>
      )
    },
    {
      key: 'lastLogin',
      title: 'Last Login',
      sortable: true,
      render: (value) => (
        <div style={{ fontFamily: 'Poppins, sans-serif', color: '#374151', textAlign: 'center' }}>
          {value}
        </div>
      )
    },
    {
      key: 'score',
      title: 'Score',
      sortable: true,
      render: (value) => (
        <div style={{ fontFamily: 'Poppins, sans-serif', color: '#2563EB', textAlign: 'center', fontWeight: 500 }}>
          {value}
        </div>
      )
    }
  ];

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-[#103358] mb-8">Table Component Examples</h1>

      {/* Basic DataTable Example */}
      <div>
        <h2 className="text-xl font-semibold text-[#103358] mb-4">Basic DataTable</h2>
        <DataTable
          data={sampleData}
          columns={multiLevelHeaders}
          dataColumns={multiLevelDataColumns}
          title="User Management"
          searchPlaceholder="Search users..."
          footerContent={
            <button 
              className="px-4 py-2 rounded-lg text-white hover:opacity-90 transition-opacity"
              style={{
                backgroundColor: '#103358',
                fontFamily: 'Poppins, sans-serif'
              }}
            >
              Add New User
            </button>
          }
          summaryStats={[
            { label: 'Total Users', value: sampleData.length.toString() },
            { label: 'Active Users', value: sampleData.filter(u => u.status === 'Active').length.toString() },
            { label: 'Average Score', value: Math.round(sampleData.reduce((sum, u) => sum + u.score, 0) / sampleData.length).toString() }
          ]}
        />
      </div>

      {/* AdvancedTable Example */}
      <div>
        <h2 className="text-xl font-semibold text-[#103358] mb-4">AdvancedTable with Sorting & Pagination</h2>
        <AdvancedTable
          data={sampleData}
          columns={advancedColumns}
          title="Advanced User Management"
          searchPlaceholder="Search users..."
          showPagination={true}
          pageSize={3}
          footerContent={
            <div className="flex space-x-2">
              <button 
                className="px-4 py-2 rounded-lg text-white hover:opacity-90 transition-opacity"
                style={{
                  backgroundColor: '#103358',
                  fontFamily: 'Poppins, sans-serif'
                }}
              >
                Export Data
              </button>
              <button 
                className="px-4 py-2 rounded-lg text-white hover:opacity-90 transition-opacity"
                style={{
                  backgroundColor: '#398AC8',
                  fontFamily: 'Poppins, sans-serif'
                }}
              >
                Add New User
              </button>
            </div>
          }
          summaryStats={[
            { label: 'Total Users', value: sampleData.length.toString() },
            { label: 'Active Users', value: sampleData.filter(u => u.status === 'Active').length.toString() },
            { label: 'Inactive Users', value: sampleData.filter(u => u.status === 'Inactive').length.toString() },
            { label: 'Admins', value: sampleData.filter(u => u.role === 'Admin').length.toString() },
            { label: 'Average Score', value: Math.round(sampleData.reduce((sum, u) => sum + u.score, 0) / sampleData.length).toString() },
            { label: 'High Performers', value: sampleData.filter(u => u.score >= 90).length.toString() }
          ]}
        />
      </div>
    </div>
  );
};

export default TableExamples; 