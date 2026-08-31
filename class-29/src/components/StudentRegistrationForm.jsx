import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { COURSES, QUALIFICATIONS, CITIES, SKILLS_LIST, SHIFTS } from '../data/courses';

export const DEFAULT_FORM_VALUES = {
  fullName: '',
  fatherName: '',
  cnic: '',
  email: '',
  phone: '',
  dob: '',
  gender: 'Male',
  course: COURSES[0].name,
  qualification: QUALIFICATIONS[0],
  shift: 'morning',
  city: 'Karachi',
  address: '',
  skills: [],
  terms: false
};

export function StudentRegistrationForm({ 
  onSubmitSuccess, 
  onWatchChange, 
  photoPreview, 
  setPhotoPreview,
  editStudentData,
  onClearEdit
}) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    mode: 'onChange',
    defaultValues: DEFAULT_FORM_VALUES
  });

  // Populate form if user wants to edit / correct data
  useEffect(() => {
    if (editStudentData) {
      reset(editStudentData);
      if (editStudentData.photoPreview) {
        setPhotoPreview(editStudentData.photoPreview);
      }
    }
  }, [editStudentData, reset, setPhotoPreview]);

  // Watch all fields for live sync with ID card
  const watchedValues = watch();

  useEffect(() => {
    if (onWatchChange) {
      onWatchChange(watchedValues);
    }
  }, [watchedValues, onWatchChange]);

  // Handle Photo Upload
  const [photoError, setPhotoError] = useState('');
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    setPhotoError('');
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setPhotoError('Please upload an image file (PNG, JPG, WebP)');
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      setPhotoError('Image size must be less than 3MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPhotoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Autofill Sample Data for Quick Demo / Testing
  const handleFillSample = () => {
    setValue('fullName', 'Muhammad Ali Khan', { shouldValidate: true, shouldDirty: true });
    setValue('fatherName', 'Tariq Mehmood Khan', { shouldValidate: true, shouldDirty: true });
    setValue('cnic', '42101-9876543-1', { shouldValidate: true, shouldDirty: true });
    setValue('email', 'ali.khan@example.com', { shouldValidate: true, shouldDirty: true });
    setValue('phone', '0300-9876543', { shouldValidate: true, shouldDirty: true });
    setValue('dob', '2003-08-14', { shouldValidate: true, shouldDirty: true });
    setValue('gender', 'Male', { shouldValidate: true, shouldDirty: true });
    setValue('course', COURSES[0].name, { shouldValidate: true, shouldDirty: true });
    setValue('qualification', QUALIFICATIONS[1], { shouldValidate: true, shouldDirty: true });
    setValue('shift', 'morning', { shouldValidate: true, shouldDirty: true });
    setValue('city', 'Karachi', { shouldValidate: true, shouldDirty: true });
    setValue('address', 'House # 42, Block 6, PECHS Society', { shouldValidate: true, shouldDirty: true });
    setValue('skills', ['HTML5 / CSS3', 'JavaScript (ES6+)', 'React.js', 'Git & GitHub'], { shouldValidate: true, shouldDirty: true });
    setValue('terms', true, { shouldValidate: true, shouldDirty: true });
  };

  // Form submission handler
  const onFormSubmit = async (data) => {
    // Simulate API delay for nice UX spinner
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newStudentRecord = {
      ...data,
      id: Date.now().toString(),
      photoPreview: photoPreview || null,
      submittedAt: new Date().toLocaleDateString()
    };

    onSubmitSuccess(newStudentRecord);

    // Automatically reset the form for the next student
    reset(DEFAULT_FORM_VALUES);
    setPhotoPreview(null);
  };

  return (
    <div className="glass-panel">
      {/* Panel Header */}
      <div className="panel-header">
        <div>
          <h2 className="panel-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#6366f1' }}>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
            </svg>
            Student Enrollment Form
          </h2>
          <p className="panel-subtitle">React Hook Form validation • Clean, accessible & fast</p>
        </div>

        <div className="quick-actions">
          <button 
            type="button" 
            className="btn-ghost-sm" 
            onClick={handleFillSample}
            title="Auto-fill sample student data"
          >
            <span>✨</span> Demo Data
          </button>
          <button 
            type="button" 
            className="btn-ghost-sm" 
            onClick={() => {
              reset(DEFAULT_FORM_VALUES);
              setPhotoPreview(null);
              if (onClearEdit) onClearEdit();
            }}
            title="Clear all fields"
          >
            <span>🔄</span> Reset
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
        {/* Section 1: Personal & Contact Information */}
        <div className="form-section">
          <div className="section-legend">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            1. Personal & Contact Information
          </div>

          <div className="form-grid">
            {/* Full Name */}
            <div className="input-group">
              <label className="input-label">
                <span>Full Name <span className="required-star">*</span></span>
              </label>
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder="e.g. Muhammad Ali"
                  className={`input-field ${errors.fullName ? 'input-error' : watchedValues.fullName ? 'input-valid' : ''}`}
                  {...register('fullName', {
                    required: 'Full name is required',
                    minLength: {
                      value: 3,
                      message: 'Minimum 3 characters'
                    },
                    pattern: {
                      value: /^[a-zA-Z\s.'-]+$/,
                      message: 'Letters only'
                    }
                  })}
                />
              </div>
              {errors.fullName && (
                <span className="error-msg">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                  {errors.fullName.message}
                </span>
              )}
            </div>

            {/* Father's / Guardian's Name */}
            <div className="input-group">
              <label className="input-label">
                <span>Father / Guardian Name <span className="required-star">*</span></span>
              </label>
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder="e.g. Tariq Mehmood"
                  className={`input-field ${errors.fatherName ? 'input-error' : watchedValues.fatherName ? 'input-valid' : ''}`}
                  {...register('fatherName', {
                    required: "Father's name is required",
                    minLength: {
                      value: 3,
                      message: 'Minimum 3 characters'
                    }
                  })}
                />
              </div>
              {errors.fatherName && (
                <span className="error-msg">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                  {errors.fatherName.message}
                </span>
              )}
            </div>

            {/* CNIC / B-Form */}
            <div className="input-group">
              <label className="input-label">
                <span>CNIC / B-Form <span className="required-star">*</span></span>
              </label>
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder="42101-1234567-1"
                  maxLength={15}
                  className={`input-field ${errors.cnic ? 'input-error' : watchedValues.cnic ? 'input-valid' : ''}`}
                  {...register('cnic', {
                    required: 'CNIC is required',
                    pattern: {
                      value: /^\d{5}-?\d{7}-?\d{1}$/,
                      message: 'Format: XXXXX-XXXXXXX-X (13 digits)'
                    }
                  })}
                />
              </div>
              {errors.cnic && (
                <span className="error-msg">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                  {errors.cnic.message}
                </span>
              )}
            </div>

            {/* Date of Birth */}
            <div className="input-group">
              <label className="input-label">
                <span>Date of Birth <span className="required-star">*</span></span>
              </label>
              <div className="input-wrapper">
                <input
                  type="date"
                  className={`input-field ${errors.dob ? 'input-error' : watchedValues.dob ? 'input-valid' : ''}`}
                  {...register('dob', {
                    required: 'DOB is required',
                    validate: (value) => {
                      if (!value) return true;
                      const birthYear = new Date(value).getFullYear();
                      const currentYear = new Date().getFullYear();
                      const age = currentYear - birthYear;
                      if (age < 14) return 'Must be at least 14 years old';
                      return true;
                    }
                  })}
                />
              </div>
              {errors.dob && (
                <span className="error-msg">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                  {errors.dob.message}
                </span>
              )}
            </div>

            {/* Email Address */}
            <div className="input-group">
              <label className="input-label">
                <span>Email Address <span className="required-star">*</span></span>
              </label>
              <div className="input-wrapper">
                <input
                  type="email"
                  placeholder="student@example.com"
                  className={`input-field ${errors.email ? 'input-error' : watchedValues.email ? 'input-valid' : ''}`}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                />
              </div>
              {errors.email && (
                <span className="error-msg">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Phone Number */}
            <div className="input-group">
              <label className="input-label">
                <span>Mobile / WhatsApp <span className="required-star">*</span></span>
              </label>
              <div className="input-wrapper">
                <input
                  type="tel"
                  placeholder="0300-1234567"
                  className={`input-field ${errors.phone ? 'input-error' : watchedValues.phone ? 'input-valid' : ''}`}
                  {...register('phone', {
                    required: 'Mobile is required',
                    pattern: {
                      value: /^(\+92|0|0092)?3[0-9]{2}[-]?[0-9]{7}$/,
                      message: 'Format: 0300-1234567'
                    }
                  })}
                />
              </div>
              {errors.phone && (
                <span className="error-msg">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                  {errors.phone.message}
                </span>
              )}
            </div>

            {/* Gender */}
            <div className="input-group full-width">
              <label className="input-label">
                <span>Gender <span className="required-star">*</span></span>
              </label>
              <div className="radio-group">
                {['Male', 'Female', 'Other'].map((genderOption) => (
                  <label 
                    key={genderOption} 
                    className={`radio-card-label ${watchedValues.gender === genderOption ? 'active' : ''}`}
                  >
                    <input
                      type="radio"
                      value={genderOption}
                      {...register('gender', { required: 'Please select gender' })}
                    />
                    <span>{genderOption === 'Male' ? '👨 Male' : genderOption === 'Female' ? '👩 Female' : '✨ Other'}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Program, Location & Address */}
        <div className="form-section">
          <div className="section-legend">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
              <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
            </svg>
            2. Program & Academic Preference
          </div>

          <div className="form-grid">
            {/* Course Select */}
            <div className="input-group full-width">
              <label className="input-label">
                <span>Select Program / Specialization <span className="required-star">*</span></span>
              </label>
              <div className="input-wrapper">
                <select
                  className={`select-field ${errors.course ? 'input-error' : ''}`}
                  {...register('course', { required: 'Please select course' })}
                >
                  {COURSES.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name} ({c.code})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Preferred Shift */}
            <div className="input-group full-width">
              <label className="input-label">
                <span>Preferred Batch Shift <span className="required-star">*</span></span>
              </label>
              <div className="radio-group">
                {SHIFTS.map((shift) => (
                  <label 
                    key={shift.id} 
                    className={`radio-card-label ${watchedValues.shift === shift.id ? 'active' : ''}`}
                  >
                    <input
                      type="radio"
                      value={shift.id}
                      {...register('shift', { required: 'Please select shift' })}
                    />
                    <span>{shift.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* City */}
            <div className="input-group">
              <label className="input-label">
                <span>City <span className="required-star">*</span></span>
              </label>
              <div className="input-wrapper">
                <select
                  className={`select-field ${errors.city ? 'input-error' : ''}`}
                  {...register('city', { required: 'Select city' })}
                >
                  {CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Qualification */}
            <div className="input-group">
              <label className="input-label">
                <span>Highest Qualification <span className="required-star">*</span></span>
              </label>
              <div className="input-wrapper">
                <select
                  className={`select-field ${errors.qualification ? 'input-error' : ''}`}
                  {...register('qualification', { required: 'Select qualification' })}
                >
                  {QUALIFICATIONS.map((q) => (
                    <option key={q} value={q}>{q}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Address */}
            <div className="input-group full-width">
              <label className="input-label">
                <span>Complete Address <span className="required-star">*</span></span>
              </label>
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder="House #, Street, Area / Sector..."
                  className={`input-field ${errors.address ? 'input-error' : watchedValues.address ? 'input-valid' : ''}`}
                  {...register('address', {
                    required: 'Address is required',
                    minLength: {
                      value: 6,
                      message: 'Please enter a valid address'
                    }
                  })}
                />
              </div>
              {errors.address && (
                <span className="error-msg">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                  {errors.address.message}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Section 3: Skills, Photo & Declaration */}
        <div className="form-section">
          <div className="section-legend">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
              <circle cx="12" cy="13" r="4"></circle>
            </svg>
            3. Skills, Photo & Declaration
          </div>

          <div className="form-grid">
            {/* Skills */}
            <div className="input-group full-width">
              <label className="input-label">
                <span>Prior Skills & Interests (Optional)</span>
              </label>
              <div className="checkbox-grid">
                {SKILLS_LIST.map((skill) => {
                  const isChecked = Array.isArray(watchedValues.skills) && watchedValues.skills.includes(skill);
                  return (
                    <label key={skill} className={`checkbox-badge ${isChecked ? 'checked' : ''}`}>
                      <input
                        type="checkbox"
                        value={skill}
                        {...register('skills')}
                      />
                      <span>{skill}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Photo Upload */}
            <div className="input-group full-width">
              <label className="file-upload-box">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  style={{ display: 'none' }}
                />
                {photoPreview ? (
                  <img src={photoPreview} alt="Preview" className="avatar-preview-thumb" />
                ) : (
                  <div className="avatar-placeholder-thumb">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                  </div>
                )}
                <div className="upload-text">
                  <div><span>Upload Student Photo</span> (JPG/PNG/WebP, Max 3MB)</div>
                </div>
              </label>
              {photoError && (
                <span className="error-msg">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                  {photoError}
                </span>
              )}
            </div>

            {/* Terms Declaration */}
            <div className="input-group full-width">
              <label className="terms-wrapper">
                <input
                  type="checkbox"
                  {...register('terms', {
                    required: 'Please accept terms & declaration'
                  })}
                />
                <span className="terms-text">
                  I certify that all information provided is accurate. I agree to abide by the institution's rules & regulations.
                </span>
              </label>
              {errors.terms && (
                <span className="error-msg">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                  {errors.terms.message}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Submit and Action Buttons */}
        <div className="form-actions">
          <button 
            type="submit" 
            className="btn-primary" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="spinner"></div>
                <span>Registering...</span>
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="8.5" cy="7" r="4"></circle>
                  <polyline points="17 11 19 13 23 9"></polyline>
                </svg>
                <span>Register Student</span>
              </>
            )}
          </button>

          <button 
            type="button" 
            className="btn-secondary"
            onClick={() => {
              reset(DEFAULT_FORM_VALUES);
              setPhotoPreview(null);
              if (onClearEdit) onClearEdit();
            }}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
