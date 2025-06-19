import React, { createContext, useContext, useReducer, useCallback, useMemo } from 'react';

// Action types for the reducer
const ACTIONS = {
  SET_STUDENTS: 'SET_STUDENTS',
  ADD_STUDENT: 'ADD_STUDENT',
  UPDATE_STUDENT: 'UPDATE_STUDENT',
  DELETE_STUDENT: 'DELETE_STUDENT',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_COURSES: 'SET_COURSES',
  SET_COURSES_LOADING: 'SET_COURSES_LOADING',
  SET_COURSES_ERROR: 'SET_COURSES_ERROR',
  SET_SEARCH_TERM: 'SET_SEARCH_TERM',
  SET_FILTER: 'SET_FILTER'
};

// Initial state
const initialState = {
  students: [],
  courses: [],
  loading: false,
  error: null,
  coursesLoading: false,
  coursesError: null,
  searchTerm: '',
  filter: 'all', // all, active, graduated
  stats: {
    totalStudents: 0,
    activeStudents: 0,
    graduatedStudents: 0
  }
};

// Reducer function to handle state updates
const studentReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_STUDENTS:
      return {
        ...state,
        students: action.payload,
        loading: false,
        error: null
      };
      
    case ACTIONS.ADD_STUDENT:
      return {
        ...state,
        students: [...state.students, action.payload],
        loading: false,
        error: null
      };
      
    case ACTIONS.UPDATE_STUDENT:
      return {
        ...state,
        students: state.students.map(student =>
          student.id === action.payload.id ? action.payload : student
        ),
        loading: false,
        error: null
      };
      
    case ACTIONS.DELETE_STUDENT:
      return {
        ...state,
        students: state.students.filter(student => student.id !== action.payload),
        loading: false,
        error: null
      };
      
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
        error: action.payload ? null : state.error
      };
      
    case ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
      
    case ACTIONS.SET_COURSES:
      return {
        ...state,
        courses: action.payload,
        coursesLoading: false,
        coursesError: null
      };
      
    case ACTIONS.SET_COURSES_LOADING:
      return {
        ...state,
        coursesLoading: action.payload,
        coursesError: action.payload ? null : state.coursesError
      };
      
    case ACTIONS.SET_COURSES_ERROR:
      return {
        ...state,
        coursesError: action.payload,
        coursesLoading: false
      };
      
    case ACTIONS.SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload
      };
      
    case ACTIONS.SET_FILTER:
      return {
        ...state,
        filter: action.payload
      };
      
    default:
      return state;
  }
};

// Create the context
const StudentContext = createContext();

// Custom hook to use the student context
export const useStudentContext = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudentContext must be used within a StudentProvider');
  }
  return context;
};

// Provider component
export const StudentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(studentReducer, initialState);

  // Memoized computed values to prevent unnecessary re-renders
  const filteredStudents = useMemo(() => {
    let filtered = state.students;

    // Apply search filter
    if (state.searchTerm) {
      const searchLower = state.searchTerm.toLowerCase();
      filtered = filtered.filter(student =>
        student.name.toLowerCase().includes(searchLower) ||
        student.email.toLowerCase().includes(searchLower) ||
        student.course.toLowerCase().includes(searchLower)
      );
    }

    // Apply status filter
    if (state.filter !== 'all') {
      filtered = filtered.filter(student => student.status === state.filter);
    }

    return filtered;
  }, [state.students, state.searchTerm, state.filter]);

  // Memoized statistics to prevent recalculation on every render
  const stats = useMemo(() => {
    const total = state.students.length;
    const active = state.students.filter(s => !s.status || s.status === 'active').length;
    const graduated = state.students.filter(s => s.status === 'graduated').length;

    return { totalStudents: total, activeStudents: active, graduatedStudents: graduated };
  }, [state.students]);

  // Action creators using useCallback to prevent unnecessary re-renders
  const addStudent = useCallback((studentData) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    
    // Simulate async operation
    setTimeout(() => {
      const newStudent = {
        id: Date.now().toString(36) + Math.random().toString(36).substr(2, 9),
        ...studentData,
        createdAt: new Date().toISOString(),
        status: 'active'
      };
      
      dispatch({ type: ACTIONS.ADD_STUDENT, payload: newStudent });
      
      // Save to localStorage
      const currentStudents = JSON.parse(localStorage.getItem('students') || '[]');
      localStorage.setItem('students', JSON.stringify([...currentStudents, newStudent]));
    }, 500);
  }, []);

  const updateStudent = useCallback((studentData) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    
    setTimeout(() => {
      dispatch({ type: ACTIONS.UPDATE_STUDENT, payload: studentData });
      
      // Update localStorage
      const currentStudents = JSON.parse(localStorage.getItem('students') || '[]');
      const updatedStudents = currentStudents.map(student =>
        student.id === studentData.id ? studentData : student
      );
      localStorage.setItem('students', JSON.stringify(updatedStudents));
    }, 300);
  }, []);

  const deleteStudent = useCallback((studentId) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    
    setTimeout(() => {
      dispatch({ type: ACTIONS.DELETE_STUDENT, payload: studentId });
      
      // Update localStorage
      const currentStudents = JSON.parse(localStorage.getItem('students') || '[]');
      const filteredStudents = currentStudents.filter(student => student.id !== studentId);
      localStorage.setItem('students', JSON.stringify(filteredStudents));
    }, 200);
  }, []);

  const setSearchTerm = useCallback((term) => {
    dispatch({ type: ACTIONS.SET_SEARCH_TERM, payload: term });
  }, []);

  const setFilter = useCallback((filter) => {
    dispatch({ type: ACTIONS.SET_FILTER, payload: filter });
  }, []);

  const loadStudents = useCallback(() => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    
    setTimeout(() => {
      try {
        const savedStudents = localStorage.getItem('students');
        if (savedStudents) {
          dispatch({ type: ACTIONS.SET_STUDENTS, payload: JSON.parse(savedStudents) });
        } else {
          // Load sample data
          const sampleStudents = [
            {
              id: 'sample_1',
              name: 'Sagar Nikam',
              email: 'Sagar@Xmail.com',
              course: 'Computer Science',
              image: 'https://yt3.googleusercontent.com/ytc/AIdro_ns_yV7aPptSgPJlpvUm4Jvv-1ZHMgArIk7JEByl5jwN1A=s160-c-k-c0x00ffffff-no-rj',
              createdAt: new Date().toISOString(),
              status: 'active'
            },
            {
              id: 'sample_2',
              name: 'Elon Musk',
              email: 'elonmusk@Xmail.com',
              course: 'Project Management',
              image: 'https://freight.cargo.site/t/original/i/6e90ef32471e05d8bfd029d6d5877119439b23c2989a55cf182b99c54303f4fa/MS_Musk_Elon_CloseUp.jpg',
              createdAt: new Date().toISOString(),
              status: 'active'
            },
            {
              id: 'sample_3',
              name: 'Virat Kohli',
              email: 'virat@example.com',
              course: 'JavaScript pro',
              image: 'https://www.hindustantimes.com/static-content/1y/cricket-logos/players/virat-kohli.png',
              createdAt: new Date().toISOString(),
              status: 'active'
            }
          ];
          dispatch({ type: ACTIONS.SET_STUDENTS, payload: sampleStudents });
          localStorage.setItem('students', JSON.stringify(sampleStudents));
        }
      } catch (error) {
        dispatch({ type: ACTIONS.SET_ERROR, payload: 'Failed to load students' });
      }
    }, 1000);
  }, []);

  // Context value memoized to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    // State
    students: state.students,
    courses: state.courses,
    loading: state.loading,
    error: state.error,
    coursesLoading: state.coursesLoading,
    coursesError: state.coursesError,
    searchTerm: state.searchTerm,
    filter: state.filter,
    
    // Computed values
    filteredStudents,
    stats,
    
    // Actions
    addStudent,
    updateStudent,
    deleteStudent,
    setSearchTerm,
    setFilter,
    loadStudents,
    
    // Dispatch for direct access if needed
    dispatch
  }), [
    state.students,
    state.courses,
    state.loading,
    state.error,
    state.coursesLoading,
    state.coursesError,
    state.searchTerm,
    state.filter,
    filteredStudents,
    stats,
    addStudent,
    updateStudent,
    deleteStudent,
    setSearchTerm,
    setFilter,
    loadStudents
  ]);

  return (
    <StudentContext.Provider value={contextValue}>
      {children}
    </StudentContext.Provider>
  );
}; 