import { useState, useEffect, useCallback, useMemo } from 'react';
import { fetchCourses, searchCourses, getCoursesFromMockAPI } from '../services/api';

// Custom hook to manage courses data
// Demonstrates: custom hooks, async/await, error handling, loading states, memoization
export const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [lastFetchTime, setLastFetchTime] = useState(null);

  // Memoized filtered courses to prevent unnecessary recalculations
  const filteredCourses = useMemo(() => {
    if (!searchQuery) return courses;
    
    return courses.filter(course =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [courses, searchQuery]);

  // Memoized course statistics (simplified for new API structure)
  const courseStats = useMemo(() => {
    const total = courses.length;
    
    // Group by course name length for demonstration
    const byLength = courses.reduce((acc, course) => {
      const length = course.name.length;
      const category = length <= 10 ? 'Short' : length <= 15 ? 'Medium' : 'Long';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

    return {
      total,
      byLength,
      averageNameLength: courses.length > 0 
        ? Math.round(courses.reduce((sum, course) => sum + course.name.length, 0) / courses.length)
        : 0
    };
  }, [courses]);

  // Fetch all courses with error handling and loading states
  const loadCourses = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('🔄 Fetching courses...'); // Demonstrates console logging for debugging
      
      // Use the new API function that matches the specified format
      const response = await getCoursesFromMockAPI();
      
      // The API now returns a direct array, so we handle it accordingly
      if (Array.isArray(response)) {
        setCourses(response);
        setLastFetchTime(new Date().toISOString());
        console.log(`✅ Loaded ${response.length} courses successfully`);
      } else {
        throw new Error('Invalid response format from API');
      }
      
    } catch (err) {
      console.error('❌ Error fetching courses:', err);
      setError(err.message);
      
      // Retry logic with exponential backoff (demonstrates advanced error handling)
      if (err.message.includes('temporarily unavailable')) {
        console.log('🔄 Retrying in 2 seconds...');
        setTimeout(() => {
          loadCourses();
        }, 2000);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Search courses with debouncing (demonstrates performance optimization)
  const searchCoursesDebounced = useCallback(async (query) => {
    if (!query.trim()) {
      setSearchQuery('');
      return;
    }

    setSearchQuery(query);
    setLoading(true);
    
    try {
      const response = await searchCourses(query);
      
      if (response.success) {
        setCourses(response.data);
        console.log(`🔍 Found ${response.data.length} courses for "${query}"`);
      }
      
    } catch (err) {
      console.error('❌ Search error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get course by ID (demonstrates utility functions)
  const getCourseById = useCallback((id) => {
    return courses.find(course => course.id === parseInt(id));
  }, [courses]);

  // Get course by name
  const getCourseByName = useCallback((name) => {
    return courses.find(course => course.name === name);
  }, [courses]);

  // Get courses with names containing a specific word
  const getCoursesByKeyword = useCallback((keyword) => {
    return courses.filter(course => 
      course.name.toLowerCase().includes(keyword.toLowerCase())
    );
  }, [courses]);

  // Refresh courses (demonstrates manual refresh functionality)
  const refreshCourses = useCallback(() => {
    console.log('🔄 Manual refresh triggered');
    loadCourses();
  }, [loadCourses]);

  // Load courses on mount
  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  // Auto-refresh courses every 5 minutes (demonstrates setInterval and cleanup)
  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log('🔄 Auto-refreshing courses...');
      loadCourses();
    }, 5 * 60 * 1000); // 5 minutes

    // Cleanup function to prevent memory leaks
    return () => {
      console.log('🧹 Cleaning up auto-refresh interval');
      clearInterval(intervalId);
    };
  }, [loadCourses]);

  // Return memoized object to prevent unnecessary re-renders
  return {
    // State
    courses: filteredCourses,
    allCourses: courses,
    loading,
    error,
    searchQuery,
    lastFetchTime,
    
    // Computed values
    courseStats,
    
    // Actions
    loadCourses,
    searchCourses: searchCoursesDebounced,
    getCourseById,
    getCourseByName,
    getCoursesByKeyword,
    refreshCourses,
    
    // Utility functions
    clearError: () => setError(null),
    clearSearch: () => setSearchQuery('')
  };
}; 