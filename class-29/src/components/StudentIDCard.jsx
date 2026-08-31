import React from 'react';
import { COURSES } from '../data/courses';

export function StudentIDCard({ studentData, photoPreview }) {
  const {
    fullName = '',
    cnic = '',
    course = '',
    shift = '',
    city = '',
    phone = '',
    gender = ''
  } = studentData || {};

  // Find course title
  const selectedCourseObj = COURSES.find(c => c.name === course || c.id === course);
  const courseDisplay = selectedCourseObj ? selectedCourseObj.name : (course || 'Course Not Selected');
  const courseCode = selectedCourseObj ? selectedCourseObj.code : 'REG-2026';

  // Generate roll number or fallback
  const rollNumber = cnic 
    ? `AKTI-${cnic.replace(/\D/g, '').slice(-5) || '98234'}`
    : 'AKTI-2026-0042';

  return (
    <div className="id-card-wrapper">
      <div className="id-card">
        {/* Header */}
        <div className="id-card-badge">
          <div className="institute-tag">
            <div className="institute-logo">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
              </svg>
            </div>
            <div>
              <div className="institute-name">AKTI / NAVTTC</div>
              <div className="institute-sub">Student Identity Card</div>
            </div>
          </div>
          <div className="live-indicator">
            <span className="pulse-dot"></span>
            LIVE PREVIEW
          </div>
        </div>

        {/* Body with Photo & Details */}
        <div className="id-card-body">
          <div className="id-photo-frame">
            {photoPreview ? (
              <img src={photoPreview} alt="Student Preview" className="id-photo" />
            ) : (
              <div className="id-photo-placeholder">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span>Photo Preview</span>
              </div>
            )}
          </div>

          <div className="id-details">
            <div className="id-student-name" title={fullName || 'Student Name'}>
              {fullName.trim() || 'Student Full Name'}
            </div>
            <div className="id-roll-number">ID: {rollNumber}</div>

            <div className="id-meta-row">
              <span className="id-meta-label">Program:</span>
              <span className="id-meta-val" style={{ color: '#818cf8' }}>{courseDisplay}</span>

              <span className="id-meta-label">Shift:</span>
              <span className="id-meta-val" style={{ textTransform: 'capitalize' }}>
                {shift || 'Morning'}
              </span>

              <span className="id-meta-label">City:</span>
              <span className="id-meta-val">{city || 'Karachi, PK'}</span>

              <span className="id-meta-label">Batch:</span>
              <span className="id-meta-val">{courseCode}</span>
            </div>
          </div>
        </div>

        {/* Footer with barcode and smart chip */}
        <div className="id-card-footer">
          <div className="id-barcode">
            <div className="barcode-lines"></div>
            <div className="barcode-num">{rollNumber} // VERIFIED</div>
          </div>

          <div className="id-chip"></div>
        </div>
      </div>
    </div>
  );
}
