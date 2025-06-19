// Mock API service to demonstrate async/await and API handling
// This simulates real API calls with delays and error scenarios

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock courses data matching the provided API structure
const mockCourses = [
  { "id": 1, "name": "HTML Basics" },
  { "id": 2, "name": "CSS Mastery" },
  { "id": 3, "name": "JavaScript Pro" },
  { "id": 4, "name": "React In Depth" },
  { "id": 5, "name": "Node.js Backend" },
  { "id": 6, "name": "Database Design" },
  { "id": 7, "name": "API Development" },
  { "id": 8, "name": "DevOps Fundamentals" },
  { "id": 9, "name": "Mobile Development" },
  { "id": 10, "name": "Cloud Computing" },
  { "id": 11, "name": "Machine Learning" },
  { "id": 12, "name": "Cybersecurity" },
  { "id": 13, "name": "UI/UX Design" },
  { "id": 14, "name": "Project Management" },
  { "id": 15, "name": "Agile Development" }
];

// Mock API class to demonstrate various async patterns
class MockAPI {
  constructor() {
    this.requestCount = 0;
    this.shouldFail = false; // For testing error handling
  }

  // Simulate API failure after certain number of requests (for testing)
  setFailureMode(shouldFail) {
    this.shouldFail = shouldFail;
  }

  // Fetch courses with async/await - demonstrates event loop understanding
  // GET https://mockapi.io/courses
  async fetchCourses() {
    try {
      // Increment request counter (demonstrates state management)
      this.requestCount++;
      
      // Simulate network delay (demonstrates event loop and setTimeout)
      await delay(800 + Math.random() * 400); // Random delay between 800-1200ms
      
      // Simulate occasional API failures for error handling demonstration
      if (this.shouldFail && this.requestCount % 5 === 0) {
        throw new Error('API server temporarily unavailable');
      }
      
      // Simulate rate limiting (demonstrates error handling)
      if (this.requestCount > 10) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      
      // Return courses in the exact format specified by the API
      return {
        success: true,
        data: mockCourses, // Direct array response as per API specification
        timestamp: new Date().toISOString(),
        requestId: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      };
      
    } catch (error) {
      // Enhanced error handling with different error types
      console.error('API Error:', error);
      
      if (error.message.includes('Rate limit')) {
        throw new Error('Too many requests. Please wait a moment before trying again.');
      } else if (error.message.includes('unavailable')) {
        throw new Error('Service temporarily unavailable. Please try again in a few minutes.');
      } else {
        throw new Error('Failed to fetch courses. Please check your connection and try again.');
      }
    }
  }

  // Fetch a single course by ID (demonstrates parameterized API calls)
  async fetchCourseById(courseId) {
    try {
      await delay(300 + Math.random() * 200);
      
      const course = mockCourses.find(c => c.id === parseInt(courseId));
      
      if (!course) {
        throw new Error('Course not found');
      }
      
      return {
        success: true,
        data: course,
        timestamp: new Date().toISOString()
      };
      
    } catch (error) {
      throw new Error(`Failed to fetch course: ${error.message}`);
    }
  }

  // Search courses (demonstrates filtering and search functionality)
  async searchCourses(query) {
    try {
      await delay(200 + Math.random() * 300);
      
      const filteredCourses = mockCourses.filter(course =>
        course.name.toLowerCase().includes(query.toLowerCase())
      );
      
      return {
        success: true,
        data: filteredCourses,
        query,
        count: filteredCourses.length,
        timestamp: new Date().toISOString()
      };
      
    } catch (error) {
      throw new Error(`Search failed: ${error.message}`);
    }
  }

  // Simulate student enrollment (demonstrates POST-like operations)
  async enrollStudent(studentData, courseId) {
    try {
      await delay(1000 + Math.random() * 500);
      
      // Simulate validation errors
      if (!studentData.name || !studentData.email) {
        throw new Error('Student name and email are required');
      }
      
      if (!courseId) {
        throw new Error('Course selection is required');
      }
      
      // Verify course exists
      const course = mockCourses.find(c => c.id === parseInt(courseId));
      if (!course) {
        throw new Error('Selected course does not exist');
      }
      
      // Simulate successful enrollment
      return {
        success: true,
        data: {
          enrollmentId: `enroll_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          student: studentData,
          course: course,
          courseId,
          enrolledAt: new Date().toISOString(),
          status: 'enrolled'
        },
        message: 'Student enrolled successfully'
      };
      
    } catch (error) {
      throw new Error(`Enrollment failed: ${error.message}`);
    }
  }

  // Get API statistics (demonstrates state tracking)
  getStats() {
    return {
      totalRequests: this.requestCount,
      lastRequest: new Date().toISOString(),
      coursesCount: mockCourses.length
    };
  }

  // Simulate the exact API endpoint as specified
  // GET https://mockapi.io/courses
  async getCoursesFromMockAPI() {
    try {
      console.log('🔄 Fetching courses from mockapi.io...');
      
      // Simulate the actual API call
      await delay(1000 + Math.random() * 500);
      
      // Return the exact format as specified in the requirements
      return mockCourses; // Direct array response: [{ "id": 1, "name": "HTML Basics" }, ...]
      
    } catch (error) {
      console.error('❌ Error fetching from mockapi.io:', error);
      throw new Error('Failed to fetch courses from API');
    }
  }
}

// Create and export a singleton instance
const api = new MockAPI();

export default api;

// Export individual functions for convenience
export const fetchCourses = () => api.fetchCourses();
export const fetchCourseById = (id) => api.fetchCourseById(id);
export const searchCourses = (query) => api.searchCourses(query);
export const enrollStudent = (studentData, courseId) => api.enrollStudent(studentData, courseId);
export const getAPIStats = () => api.getStats();
export const setAPIFailureMode = (shouldFail) => api.setFailureMode(shouldFail);
export const getCoursesFromMockAPI = () => api.getCoursesFromMockAPI(); 