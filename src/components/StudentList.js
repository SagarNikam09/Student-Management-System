import React from 'react';
import { FiEdit, FiTrash2, FiEye, FiMail, FiBook } from 'react-icons/fi';

const StudentList = ({ students, onEdit, onDelete, onView }) => {
  if (students.length === 0) {
    return (
      <div className="empty-state">
        <h3>No students found</h3>
        <p>Try adjusting your search or add a new student to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-3">
      {students.map((student) => (
        <div key={student.id} className="card hover:shadow-md transition">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={student.image}
              alt={student.name}
              className="avatar"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face';
              }}
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 mb-1">{student.name}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                <FiMail size={14} />
                {student.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FiBook size={14} />
                {student.course}
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => onView(student)}
              className="btn btn-secondary flex-1 flex items-center justify-center gap-2"
            >
              <FiEye size={14} />
              View
            </button>
            <button
              onClick={() => onEdit(student)}
              className="btn btn-primary flex items-center justify-center gap-2"
              style={{ minWidth: '44px' }}
            >
              <FiEdit size={14} />
            </button>
            <button
              onClick={() => onDelete(student.id)}
              className="btn btn-danger flex items-center justify-center gap-2"
              style={{ minWidth: '44px' }}
            >
              <FiTrash2 size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentList; 