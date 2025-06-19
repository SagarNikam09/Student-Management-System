import React, { useEffect, useMemo } from 'react';
import { StudentProvider, useStudentContext } from './context/StudentContext';
import { useCourses } from './hooks/useCourses';
import Header from './components/Header';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import StudentDetail from './components/StudentDetail';
import Stats from './components/Stats';
import './App.css';

// Main App Content Component
// Demonstrates: custom hooks, context usage, conditional rendering, performance optimization
const AppContent = () => {
  const {
    students,
    filteredStudents,
    loading,
    error,
    searchTerm,
    filter,
    addStudent,
    updateStudent,
    deleteStudent,
    setSearchTerm,
    setFilter,
    loadStudents
  } = useStudentContext();

  const {
    courses,
    loading: coursesLoading,
    error: coursesError,
    courseStats
  } = useCourses();

  // Local state for modals
  const [showForm, setShowForm] = React.useState(false);
  const [showDetail, setShowDetail] = React.useState(false);
  const [selectedStudent, setSelectedStudent] = React.useState(null);
  const [editingStudent, setEditingStudent] = React.useState(null);

  // Load students on component mount
  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  // Memoized filtered and sorted students for performance
  const sortedStudents = useMemo(() => {
    return [...filteredStudents].sort((a, b) => {
      // Sort by creation date (newest first)
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });
  }, [filteredStudents]);

  // Memoized course options for the form (simplified for new API structure)
  const courseOptions = useMemo(() => {
    if (!courses) return [];
    return courses.map(course => ({
      value: course.name, // Use course name as value
      label: course.name  // Display course name as label
    }));
  }, [courses]);

  // Event handlers
  const handleAddClick = () => {
    setEditingStudent(null);
    setShowForm(true);
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setShowForm(true);
  };

  const handleView = (student) => {
    setSelectedStudent(student);
    setShowDetail(true);
  };

  const handleFormSubmit = (studentData) => {
    if (editingStudent) {
      updateStudent({ ...studentData, id: editingStudent.id });
    } else {
      addStudent(studentData);
    }
    setShowForm(false);
    setEditingStudent(null);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingStudent(null);
  };

  const handleDetailClose = () => {
    setShowDetail(false);
    setSelectedStudent(null);
  };

  const handleDetailEdit = () => {
    if (selectedStudent) {
      handleEdit(selectedStudent);
      handleDetailClose();
    }
  };

  const handleDetailDelete = () => {
    if (selectedStudent) {
      deleteStudent(selectedStudent.id);
      handleDetailClose();
    }
  };

  // Error boundary for API errors
  if (error || coursesError) {
    return (
      <div className="container">
        <div className="card border-red-200 bg-red-50">
          <div className="text-center">
            <h3 className="text-red-800 mb-2">Something went wrong</h3>
            <p className="text-red-600 mb-4">
              {error || coursesError}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              Reload Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Header 
        onAddClick={handleAddClick}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        studentCount={students.length}
        courseStats={courseStats}
      />
      
      <main className="container">
        {/* Statistics Dashboard */}
        <Stats 
          students={students}
          courses={courses}
          loading={loading || coursesLoading}
        />

        {/* Filter Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
            >
              All Students
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`btn ${filter === 'active' ? 'btn-primary' : 'btn-secondary'}`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter('graduated')}
              className={`btn ${filter === 'graduated' ? 'btn-primary' : 'btn-secondary'}`}
            >
              Graduated
            </button>
          </div>
          
          <div className="text-sm text-gray-600">
            Showing {sortedStudents.length} of {students.length} students
          </div>
        </div>

        {/* Student List */}
        <StudentList 
          students={sortedStudents}
          onEdit={handleEdit}
          onDelete={deleteStudent}
          onView={handleView}
          loading={loading}
        />
      </main>

      {/* Modals */}
      {showForm && (
        <StudentForm
          student={editingStudent}
          courses={courseOptions}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          loading={loading}
        />
      )}

      {showDetail && selectedStudent && (
        <StudentDetail
          student={selectedStudent}
          onClose={handleDetailClose}
          onEdit={handleDetailEdit}
          onDelete={handleDetailDelete}
        />
      )}
    </div>
  );
};

// Main App Component with Context Provider
// Demonstrates: context provider pattern, component composition
const App = () => {
  return (
    <StudentProvider>
      <AppContent />
    </StudentProvider>
  );
};

export default App; 