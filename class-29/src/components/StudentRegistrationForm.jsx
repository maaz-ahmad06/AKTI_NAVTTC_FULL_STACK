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

export function StudentRegistrationForm({ onSubmitSuccess, onWatchChange, photoPreview, setPhotoPreview }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting, isDirty, isValid }
  } = useForm({
    mode: 'onChange',
    defaultValues: DEFAULT_FORM_VALUES
  });

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

  // Autofill Sample Data for Easy Demo / Testing
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
    await new Promise((resolve) => setTimeout(resolve, 600));

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
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#6366f1' }}>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            Student Enrollment Form
          </h2>
          <p className="panel-subtitle">Powered by React Hook Form with real-time field validation</p>
        </div>

        <div className="quick-actions">
          <button 
            type="button" 
            className="btn-ghost-sm" 
            onClick={handleFillSample}
            title="Auto-fill sample student data"
          >
            <span>✨</span> Autofill Demo Data
          </button>
          <button 
            type="button" 
            className="btn-ghost-sm" 
            onClick={() => {
              reset();
              setPhotoPreview(null);
            }}
            title="Clear all fields"
          >
            <span>🔄</span> Reset
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
        {/* Section 1: Personal Information */}
        <div className="form-section">
          <div className="section-legend">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            1. Personal Details
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
                      message: 'Name must be at least 3 characters'
                    },
                    pattern: {
                      value: /^[a-zA-Z\s.'-]+$/,
                      message: 'Please enter valid alphabetic characters only'
                    }
                  })}
                />
              </div>
              {errors.fullName && (
                <span className="error-msg">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                  {errors.fullName.message}
                </span>
              )}
            </div>

            {/* Father's / Guardian's Name */}
            <div className="input-group">
              <label className="input-label">
                <span>Father's / Guardian's Name <span className="required-star">*</span></span>
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
                      message: 'Must be at least 3 characters'
                    }
                  })}
                />
              </div>
              {errors.fatherName && (
                <span className="error-msg">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                  {errors.fatherName.message}
                </span>
              )}
            </div>

            {/* CNIC / B-Form */}
            <div className="input-group">
              <label className="input-label">
                <span>CNIC / B-Form Number <span className="required-star">*</span></span>
              </label>
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder="42101-1234567-1"
                  maxLength={15}
                  className={`input-field ${errors.cnic ? 'input-error' : watchedValues.cnic ? 'input-valid' : ''}`}
                  {...register('cnic', {
                    required: 'CNIC / B-Form is required',
                    pattern: {
                      value: /^\d{5}-?\d{7}-?\d{1}$/,
                      message: 'Format: 42101-1234567-1 (13 digits)'
                    }
                  })}
                />
              </div>
              {errors.cnic && (
                <span className="error-msg">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
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
                    required: 'Date of birth is required',
                    validate: (value) => {
                      if (!value) return true;
                      const birthYear = new Date(value).getFullYear();
                      const currentYear = new Date().getFullYear();
                      const age = currentYear - birthYear;
                      if (age < 14) return 'Student must be at least 14 years old';
                      if (age > 70) return 'Please enter a valid date of birth';
                      return true;
                    }
                  })}
                />
              </div>
              {errors.dob && (
                <span className="error-msg">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                  {errors.dob.message}
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
                      {...register('gender', { required: 'Please select a gender' })}
                    />
                    <span>{genderOption === 'Male' ? '👨 Male' : genderOption === 'Female' ? '👩 Female' : '✨ Other'}</span>
                  </label>
                ))}
              </div>
              {errors.gender && (
                <span className="error-msg">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                  {errors.gender.message}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Section 2: Contact Information */}
        <div className="form-section">
          <div className="section-legend">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            2. Contact & Address
          </div>

          <div className="form-grid">
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
                    required: 'Email address is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Enter a valid email address (e.g. name@domain.com)'
                    }
                  })}
                />
              </div>
              {errors.email && (
                <span className="error-msg">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Phone Number */}
            <div className="input-group">
              <label className="input-label">
                <span>Phone / WhatsApp <span className="required-star">*</span></span>
              </label>
              <div className="input-wrapper">
                <input
                  type="tel"
                  placeholder="0300-1234567"
                  className={`input-field ${errors.phone ? 'input-error' : watchedValues.phone ? 'input-valid' : ''}`}
                  {...register('phone', {
                    required: 'Mobile / WhatsApp number is required',
                    pattern: {
                      value: /^(\+92|0|0092)?3[0-9]{2}[-]?[0-9]{7}$/,
                      message: 'Valid Pakistani mobile format: 0300-1234567'
                    }
                  })}
                />
              </div>
              {errors.phone && (
                <span className="error-msg">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                  {errors.phone.message}
                </span>
              )}
            </div>

            {/* City */}
            <div className="input-group">
              <label className="input-label">
                <span>City <span className="required-star">*</span></span>
              </label>
              <div className="input-wrapper">
                <select
                  className={`select-field ${errors.city ? 'input-error' : ''}`}
                  {...register('city', { required: 'Please select your city' })}
                >
                  <option value="">-- Select City --</option>
                  {CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              {errors.city && (
                <span className="error-msg">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                  {errors.city.message}
                </span>
              )}
            </div>

            {/* Qualification */}
            <div className="input-group">
              <label className="input-label">
                <span>Highest Qualification <span className="required-star">*</span></span>
              </label>
              <div className="input-wrapper">
                <select
                  className={`select-field ${errors.qualification ? 'input-error' : ''}`}
                  {...register('qualification', { required: 'Please select highest qualification' })}
                >
                  <option value="">-- Select Qualification --</option>
                  {QUALIFICATIONS.map((q) => (
                    <option key={q} value={q}>{q}</option>
                  ))}
                </select>
              </div>
              {errors.qualification && (
                <span className="error-msg">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                  {errors.qualification.message}
                </span>
              )}
            </div>

            {/* Complete Address */}
            <div className="input-group full-width">
              <label className="input-label">
                <span>Complete Residential Address <span className="required-star">*</span></span>
              </label>
              <div className="input-wrapper">
                <textarea
                  rows={2}
                  placeholder="House / Apartment #, Street, Area / Sector..."
                  className={`textarea-field ${errors.address ? 'input-error' : watchedValues.address ? 'input-valid' : ''}`}
                  {...register('address', {
                    required: 'Residential address is required',
                    minLength: {
                      value: 8,
                      message: 'Address must be at least 8 characters long'
                    }
                  })}
                ></textarea>
              </div>
              {errors.address && (
                <span className="error-msg">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                  {errors.address.message}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Section 3: Academic Program & Shift Selection */}
        <div className="form-section">
          <div className="section-legend">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
              <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
            </svg>
            3. Program & Shift Preference
          </div>

          <div className="form-grid">
            {/* Course Select */}
            <div className="input-group full-width">
              <label className="input-label">
                <span>Select Course / Specialization <span className="required-star">*</span></span>
              </label>
              <div className="input-wrapper">
                <select
                  className={`select-field ${errors.course ? 'input-error' : ''}`}
                  {...register('course', { required: 'Please select a course' })}
                >
                  <option value="">-- Choose Course --</option>
                  {COURSES.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name} ({c.code})
                    </option>
                  ))}
                </select>
              </div>
              {errors.course && (
                <span className="error-msg">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                  {errors.course.message}
                </span>
              )}
            </div>

            {/* Preferred Shift */}
            <div className="input-group full-width">
              <label className="input-label">
                <span>Preferred Batch Timing <span className="required-star">*</span></span>
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
                      {...register('shift', { required: 'Please select a shift' })}
                    />
                    <span>{shift.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Skills & Prior Knowledge */}
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
          </div>
        </div>

        {/* Section 4: Photo Upload & Declaration */}
        <div className="form-section">
          <div className="section-legend">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
              <circle cx="12" cy="13" r="4"></circle>
            </svg>
            4. Student Photo & Verification
          </div>

          <div className="form-grid">
            {/* Photo Upload Box */}
            <div className="input-group full-width">
              <label className="input-label">
                <span>Student Passport Photo (For ID Badge)</span>
              </label>
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
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                  </div>
                )}
                <div className="upload-text">
                  <div><span>Click to browse file</span> or drag & drop</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Supports JPG, PNG, WebP (Max 3MB)</div>
                </div>
              </label>
              {photoError && (
                <span className="error-msg">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                  {photoError}
                </span>
              )}
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="input-group full-width">
              <label className="terms-wrapper">
                <input
                  type="checkbox"
                  {...register('terms', {
                    required: 'You must accept the terms and declaration to register'
                  })}
                />
                <span className="terms-text">
                  I hereby declare that all information provided above is correct and accurate to the best of my knowledge. I agree to abide by the rules, attendance criteria, and regulations of the training institution.
                </span>
              </label>
              {errors.terms && (
                <span className="error-msg">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
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
                <span>Validating & Registering...</span>
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="8.5" cy="7" r="4"></circle>
                  <polyline points="17 11 19 13 23 9"></polyline>
                </svg>
                <span>Submit Student Registration</span>
              </>
            )}
          </button>

          <button 
            type="button" 
            className="btn-secondary"
            onClick={() => {
              reset();
              setPhotoPreview(null);
            }}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
