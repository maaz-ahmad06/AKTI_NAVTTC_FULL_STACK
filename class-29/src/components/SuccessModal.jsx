import React from 'react';

export function SuccessModal({ student, onClose, onResetForm }) {
  if (!student) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="success-icon-wrap">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>

        <h2 className="modal-title">Registration Successful! 🎉</h2>
        <p className="modal-desc">
          Student record has been registered with <strong style={{ color: '#818cf8' }}>React Hook Form</strong> validation.
        </p>

        <div className="summary-table">
          <div className="summary-row">
            <span className="summary-label">Full Name:</span>
            <span className="summary-value">{student.fullName}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">CNIC / B-Form:</span>
            <span className="summary-value">{student.cnic}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Email:</span>
            <span className="summary-value">{student.email}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Phone:</span>
            <span className="summary-value">{student.phone}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Course:</span>
            <span className="summary-value">{student.course}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Shift:</span>
            <span className="summary-value" style={{ textTransform: 'capitalize' }}>{student.shift}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Qualification:</span>
            <span className="summary-value">{student.qualification}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">City:</span>
            <span className="summary-value">{student.city}</span>
          </div>
          {student.skills && student.skills.length > 0 && (
            <div className="summary-row">
              <span className="summary-label">Skills:</span>
              <span className="summary-value">{student.skills.join(', ')}</span>
            </div>
          )}
        </div>

        <div className="modal-buttons">
          <button 
            type="button"
            className="btn-secondary" 
            onClick={() => window.print()}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 6 2 18 2 18 9"></polyline>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
              <rect x="6" y="14" width="12" height="8"></rect>
            </svg>
            Print Card
          </button>
          <button 
            type="button"
            className="btn-primary" 
            onClick={() => {
              onClose();
              if (onResetForm) onResetForm();
            }}
          >
            Register Another
          </button>
        </div>
      </div>
    </div>
  );
}
