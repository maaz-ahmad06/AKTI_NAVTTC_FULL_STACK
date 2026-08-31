import React, { useState, useCallback } from 'react';
import './App.css';
import { StudentRegistrationForm } from './components/StudentRegistrationForm';
import { StudentIDCard } from './components/StudentIDCard';
import { RegisteredStudentsList } from './components/RegisteredStudentsList';
import { SuccessModal } from './components/SuccessModal';

const INITIAL_STUDENTS = [
  {
    id: '1',
    fullName: 'Hamza Farooq',
    fatherName: 'Farooq Ahmed',
    cnic: '42201-7654321-3',
    email: 'hamza.f@example.com',
    phone: '0312-3456789',
    dob: '2002-05-12',
    gender: 'Male',
    course: 'Full Stack Web Development (MERN Stack)',
    qualification: 'Bachelors (BS/BE/BSc)',
    shift: 'morning',
    city: 'Karachi',
    address: 'Gulshan-e-Iqbal, Block 13-D',
    skills: ['HTML5 / CSS3', 'JavaScript (ES6+)', 'React.js'],
    terms: true,
    submittedAt: '01/09/2026'
  },
  {
    id: '2',
    fullName: 'Ayesha Noor',
    fatherName: 'Noor Muhammad',
    cnic: '35202-9871234-8',
    email: 'ayesha.noor@example.com',
    phone: '0333-8765432',
    dob: '2004-11-20',
    gender: 'Female',
    course: 'Artificial Intelligence & Machine Learning',
    qualification: 'Intermediate / HSSC',
    shift: 'evening',
    city: 'Lahore',
    address: 'Model Town, Block C',
    skills: ['Python', 'Git & GitHub'],
    terms: true,
    submittedAt: '01/09/2026'
  }
];

function App() {
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [liveData, setLiveData] = useState({
    fullName: 'Muhammad Ali Khan',
    cnic: '42101-9876543-1',
    course: 'Full Stack Web Development (MERN Stack)',
    shift: 'morning',
    city: 'Karachi',
    phone: '0300-9876543'
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [lastSubmitted, setLastSubmitted] = useState(null);

  // Sync watch changes with live preview
  const handleWatchChange = useCallback((values) => {
    setLiveData(values);
  }, []);

  // Handle successful form submission
  const handleFormSubmitSuccess = (newStudent) => {
    setStudents((prev) => [newStudent, ...prev]);
    setLastSubmitted(newStudent);
  };

  // Delete student record
  const handleDeleteStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  // Select student from list to preview ID card
  const handleSelectStudent = (student) => {
    setLiveData(student);
    if (student.photoPreview) {
      setPhotoPreview(student.photoPreview);
    }
  };

  return (
    <div className="app-container">
      {/* Top Navigation Bar */}
      <header className="app-header">
        <div className="brand-section">
          <div className="brand-icon">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
              <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
            </svg>
          </div>
          <div className="brand-info">
            <h1>Student Admission & Registration Portal</h1>
            <p>
              <span>AKTI / NAVTTC Skill Development Program</span>
              <span className="badge-tech">React Hook Form</span>
            </p>
          </div>
        </div>

        <div className="header-actions">
          <div className="stat-pill">
            <span>Enrolled Students:</span>
            <strong>{students.length}</strong>
          </div>
        </div>
      </header>

      {/* Main Grid: Form on Left, Live ID Badge & List on Right */}
      <main className="main-layout">
        {/* Left Column: Form */}
        <section className="form-column">
          <StudentRegistrationForm
            onSubmitSuccess={handleFormSubmitSuccess}
            onWatchChange={handleWatchChange}
            photoPreview={photoPreview}
            setPhotoPreview={setPhotoPreview}
          />
        </section>

        {/* Right Column: Sticky Sidebar with ID Card & Records */}
        <aside className="sidebar-sticky">
          {/* Live ID Badge */}
          <StudentIDCard
            studentData={liveData}
            photoPreview={photoPreview}
          />

          {/* Registered Students Records */}
          <RegisteredStudentsList
            students={students}
            onDelete={handleDeleteStudent}
            onSelectStudent={handleSelectStudent}
          />
        </aside>
      </main>

      {/* Success Submission Modal */}
      {lastSubmitted && (
        <SuccessModal
          student={lastSubmitted}
          onClose={() => setLastSubmitted(null)}
        />
      )}

      {/* Footer */}
      <footer className="app-footer">
        <p>
          Built with <span>React Hook Form</span> • Fast validation, zero re-renders, accessible UI.
        </p>
      </footer>
    </div>
  );
}

export default App;
