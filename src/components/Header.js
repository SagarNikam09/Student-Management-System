import React from 'react';
import { FiSearch, FiPlus, FiUsers } from 'react-icons/fi';

const Header = ({ onAddClick, searchTerm, onSearchChange, studentCount }) => {
  return (
    <header style={{
      background: 'white',
      borderBottom: '1px solid #e5e7eb',
      padding: '20px 0',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <FiUsers size={32} color="#3b82f6" />
              <h1 className="text-2xl font-bold text-gray-800">Student Dashboard</h1>
            </div>
            <div className="text-sm text-gray-600">
              {studentCount} student{studentCount !== 1 ? 's' : ''} enrolled
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="search-bar">
              <FiSearch className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="search-input"
              />
            </div>
            <button
              onClick={onAddClick}
              className="btn btn-primary flex items-center gap-2"
            >
              <FiPlus size={16} />
              Add Student
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 