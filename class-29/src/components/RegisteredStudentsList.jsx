import React from 'react';

export function RegisteredStudentsList({ students, onDelete, onSelectStudent }) {
  return (
    <div className="registered-list-card">
      <div className="registered-header">
        <h3 className="panel-title" style={{ fontSize: '1.05rem' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          Enrolled Students
        </h3>
        <span className="students-count-badge">
          {students.length} {students.length === 1 ? 'Record' : 'Records'}
        </span>
      </div>

      {students.length === 0 ? (
        <div className="empty-state">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ opacity: 0.4, margin: '0 auto 0.5rem', display: 'block' }}>
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
          No students registered yet. Fill the form to register your first student!
        </div>
      ) : (
        <div className="students-mini-list">
          {students.map((st) => (
            <div 
              key={st.id} 
              className="student-mini-item"
              onClick={() => onSelectStudent && onSelectStudent(st)}
              style={{ cursor: 'pointer' }}
              title="Click to view ID card"
            >
              <div className="mini-info">
                {st.photoPreview ? (
                  <img src={st.photoPreview} alt={st.fullName} className="mini-avatar" />
                ) : (
                  <div className="mini-avatar">
                    {st.fullName ? st.fullName.charAt(0).toUpperCase() : 'S'}
                  </div>
                )}
                <div className="mini-text">
                  <h4>{st.fullName}</h4>
                  <p>{st.course} • <span style={{ color: '#06b6d4' }}>{st.city}</span></p>
                </div>
              </div>

              <button 
                type="button" 
                className="btn-icon-danger"
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm(`Are you sure you want to remove ${st.fullName}?`)) {
                    onDelete(st.id);
                  }
                }}
                title="Delete Student"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
