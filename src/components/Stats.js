import React, { useMemo } from 'react';
import { FiUsers, FiBook, FiTrendingUp, FiClock } from 'react-icons/fi';

// Stats component to display dashboard statistics
// Demonstrates: useMemo for performance optimization, conditional rendering, responsive design
const Stats = ({ students, courses, loading }) => {
  // Memoized statistics calculations to prevent unnecessary recalculations
  const stats = useMemo(() => {
    if (!students || !courses) return null;

    const totalStudents = students.length;
    const activeStudents = students.filter(s => !s.status || s.status === 'active').length;
    const graduatedStudents = students.filter(s => s.status === 'graduated').length;
    
    const totalCourses = courses.length;
    
    // Calculate enrollment rate
    const enrollmentRate = totalStudents > 0 ? Math.round((activeStudents / totalStudents) * 100) : 0;
    
    // Calculate average students per course
    const courseEnrollments = {};
    students.forEach(student => {
      courseEnrollments[student.course] = (courseEnrollments[student.course] || 0) + 1;
    });
    const avgStudentsPerCourse = Object.keys(courseEnrollments).length > 0 
      ? Math.round(Object.values(courseEnrollments).reduce((sum, count) => sum + count, 0) / Object.keys(courseEnrollments).length)
      : 0;

    // Calculate course popularity (most enrolled courses)
    const coursePopularity = Object.entries(courseEnrollments)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([course, count]) => ({ course, count }));

    return {
      totalStudents,
      activeStudents,
      graduatedStudents,
      totalCourses,
      enrollmentRate,
      avgStudentsPerCourse,
      coursePopularity
    };
  }, [students, courses]);

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="stats-grid">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="stat-card animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      ))}
    </div>
  );

  // Error state component
  const ErrorState = () => (
    <div className="stats-grid">
      <div className="stat-card border-red-200 bg-red-50">
        <div className="text-red-600 text-center">
          <FiUsers size={24} className="mx-auto mb-2" />
          <p className="text-sm">Unable to load statistics</p>
        </div>
      </div>
    </div>
  );

  // Main stats display
  const StatsDisplay = () => (
    <div className="stats-grid">
      {/* Total Students */}
      <div className="stat-card hover:shadow-md transition">
        <div className="flex items-center justify-between">
          <div>
            <div className="stat-number">{stats.totalStudents}</div>
            <div className="stat-label">Total Students</div>
          </div>
          <div className="text-blue-500">
            <FiUsers size={32} />
          </div>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          {stats.activeStudents} active • {stats.graduatedStudents} graduated
        </div>
      </div>

      {/* Active Students */}
      <div className="stat-card hover:shadow-md transition">
        <div className="flex items-center justify-between">
          <div>
            <div className="stat-number text-green-600">{stats.activeStudents}</div>
            <div className="stat-label">Active Students</div>
          </div>
          <div className="text-green-500">
            <FiTrendingUp size={32} />
          </div>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          {stats.enrollmentRate}% enrollment rate
        </div>
      </div>

      {/* Available Courses */}
      <div className="stat-card hover:shadow-md transition">
        <div className="flex items-center justify-between">
          <div>
            <div className="stat-number text-purple-600">{stats.totalCourses}</div>
            <div className="stat-label">Available Courses</div>
          </div>
          <div className="text-purple-500">
            <FiBook size={32} />
          </div>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          From mockapi.io
        </div>
      </div>

      {/* Average Students per Course */}
      <div className="stat-card hover:shadow-md transition">
        <div className="flex items-center justify-between">
          <div>
            <div className="stat-number text-orange-600">{stats.avgStudentsPerCourse}</div>
            <div className="stat-label">Avg. Students/Course</div>
          </div>
          <div className="text-orange-500">
            <FiClock size={32} />
          </div>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          Based on current enrollment
        </div>
      </div>
    </div>
  );

  // Conditional rendering based on state
  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!stats) {
    return <ErrorState />;
  }

  return <StatsDisplay />;
};

export default Stats; 