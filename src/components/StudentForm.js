import React, { useState, useEffect, useCallback } from 'react';
import { FiX, FiUser, FiMail, FiBook, FiImage, FiLoader } from 'react-icons/fi';

// StudentForm component with enhanced validation and API integration
// Demonstrates: controlled components, form validation, async operations, error handling
const StudentForm = ({ student, courses = [], onSubmit, onCancel, loading = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: '',
    image: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  // Initialize form data when editing
  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || '',
        email: student.email || '',
        course: student.course || '',
        image: student.image || ''
      });
      
      // Show image preview for existing student
      if (student.image) {
        setImagePreview(student.image);
      }
    } else {
      // Reset form for new student
      setFormData({
        name: '',
        email: '',
        course: '',
        image: ''
      });
      setImagePreview(null);
    }
    
    // Clear errors when form data changes
    setErrors({});
  }, [student]);

  // Enhanced validation with detailed error messages
  const validateForm = useCallback(() => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    } else if (formData.name.trim().length > 50) {
      newErrors.name = 'Name must be less than 50 characters';
    }

    // Email validation with regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Course validation
    if (!formData.course.trim()) {
      newErrors.course = 'Course selection is required';
    } else if (!courses.some(course => course.value === formData.course)) {
      newErrors.course = 'Please select a valid course';
    }

    // Image URL validation
    if (!formData.image.trim()) {
      newErrors.image = 'Profile image URL is required';
    } else {
      try {
        new URL(formData.image.trim());
      } catch {
        newErrors.image = 'Please enter a valid URL';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, courses]);

  // Handle form submission with async validation
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const studentData = {
        ...formData,
        name: formData.name.trim(),
        email: formData.email.trim(),
        course: formData.course.trim(),
        image: formData.image.trim()
      };

      if (student) {
        studentData.id = student.id;
      }

      onSubmit(studentData);
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ submit: 'Failed to save student. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input changes with real-time validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Clear submit error when any field changes
    if (errors.submit) {
      setErrors(prev => ({
        ...prev,
        submit: ''
      }));
    }
  };

  // Handle image URL change with preview
  const handleImageChange = (e) => {
    const { value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      image: value
    }));

    // Clear image error
    if (errors.image) {
      setErrors(prev => ({
        ...prev,
        image: ''
      }));
    }

    // Show image preview
    if (value.trim()) {
      setImageLoading(true);
      setImagePreview(value);
      
      // Test image loading
      const img = new Image();
      img.onload = () => {
        setImageLoading(false);
      };
      img.onerror = () => {
        setImageLoading(false);
        setImagePreview(null);
      };
      img.src = value;
    } else {
      setImagePreview(null);
      setImageLoading(false);
    }
  };

  // Handle course selection
  const handleCourseChange = (e) => {
    const { value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      course: value
    }));

    if (errors.course) {
      setErrors(prev => ({
        ...prev,
        course: ''
      }));
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {student ? 'Edit Student' : 'Add New Student'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition"
            disabled={isSubmitting}
          >
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="form-group">
            <label className="form-label flex items-center gap-2">
              <FiUser size={16} />
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-input ${errors.name ? 'border-red-500' : ''}`}
              placeholder="Enter student's full name"
              disabled={isSubmitting}
              maxLength={50}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label className="form-label flex items-center gap-2">
              <FiMail size={16} />
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? 'border-red-500' : ''}`}
              placeholder="Enter student's email address"
              disabled={isSubmitting}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          {/* Course Field */}
          <div className="form-group">
            <label className="form-label flex items-center gap-2">
              <FiBook size={16} />
              Enrolled Course *
            </label>
            <select
              name="course"
              value={formData.course}
              onChange={handleCourseChange}
              className={`form-input ${errors.course ? 'border-red-500' : ''}`}
              disabled={isSubmitting || loading}
            >
              <option value="">Select a course</option>
              {courses.map(course => (
                <option key={course.value} value={course.value}>
                  {course.label}
                </option>
              ))}
            </select>
            {errors.course && <p className="error">{errors.course}</p>}
            {loading && (
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                <FiLoader size={14} className="animate-spin" />
                Loading courses...
              </div>
            )}
          </div>

          {/* Image URL Field */}
          <div className="form-group">
            <label className="form-label flex items-center gap-2">
              <FiImage size={16} />
              Profile Image URL *
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleImageChange}
              className={`form-input ${errors.image ? 'border-red-500' : ''}`}
              placeholder="Enter profile image URL"
              disabled={isSubmitting}
            />
            {errors.image && <p className="error">{errors.image}</p>}
            
            {/* Image Preview */}
            {imagePreview && (
              <div className="mt-2">
                <div className="relative inline-block">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-16 h-16 rounded-full object-cover border"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  {imageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 rounded-full">
                      <FiLoader size={16} className="animate-spin text-gray-600" />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{errors.submit}</p>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex gap-3 mt-6">
            <button
              type="submit"
              className="btn btn-primary flex-1 flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting && <FiLoader size={16} className="animate-spin" />}
              {student ? 'Update Student' : 'Add Student'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-secondary flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm; 