import React from 'react';
import { FiX, FiMail, FiBook, FiEdit, FiTrash2 } from 'react-icons/fi';

const StudentDetail = ({ student, onClose, onEdit, onDelete }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Student Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="text-center mb-6">
          <img
            src={student.image}
            alt={student.name}
            className="avatar-large mx-auto mb-4"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face';
            }}
          />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{student.name}</h3>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <FiMail size={20} className="text-gray-600" />
            <div>
              <p className="text-sm text-gray-600">Email Address</p>
              <p className="font-medium text-gray-800">{student.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <FiBook size={20} className="text-gray-600" />
            <div>
              <p className="text-sm text-gray-600">Enrolled Course</p>
              <p className="font-medium text-gray-800">{student.course}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onEdit}
            className="btn btn-primary flex-1 flex items-center justify-center gap-2"
          >
            <FiEdit size={16} />
            Edit Student
          </button>
          <button
            onClick={onDelete}
            className="btn btn-danger flex items-center justify-center gap-2"
            style={{ minWidth: '44px' }}
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail; 