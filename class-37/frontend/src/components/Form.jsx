import React, { useState, useEffect } from 'react';
import './Form.css';

const API_URL = 'http://localhost:5000/api/form';

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    course: ''
  });

  const [entries, setEntries] = useState([]);
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState('');

  // Fetch all entries (Read)
  const fetchEntries = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setEntries(data);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Create / Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editId ? `${API_URL}/${editId}` : API_URL;
      const method = editId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(editId ? 'Updated successfully!' : 'Submitted successfully!');
        setFormData({ name: '', email: '', age: '', course: '' });
        setEditId(null);
        fetchEntries();
      } else {
        setMessage(data.message || 'Something went wrong');
      }
    } catch (error) {
      setMessage('Error submitting form');
    }
  };

  // Edit button click
  const handleEdit = (entry) => {
    setFormData({
      name: entry.name,
      email: entry.email,
      age: entry.age,
      course: entry.course
    });
    setEditId(entry._id);
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm('Kya aap is entry ko delete karna chahte hain?')) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setMessage('Deleted successfully!');
      fetchEntries();
    } catch (error) {
      setMessage('Error deleting entry');
    }
  };

  return (
    <div className="container">
      <div className="form-card">
        <h2>{editId ? 'Update Entry' : 'Student Form'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="course"
            placeholder="Course"
            value={formData.course}
            onChange={handleChange}
            required
          />

          <button type="submit">{editId ? 'Update' : 'Submit'}</button>
          {editId && (
            <button
              type="button"
              className="cancel-btn"
              onClick={() => {
                setEditId(null);
                setFormData({ name: '', email: '', age: '', course: '' });
              }}
            >
              Cancel
            </button>
          )}
        </form>

        {message && <p className="message">{message}</p>}
      </div>

      <div className="table-card">
        <h3>Submitted Entries</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Course</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>No entries yet</td>
              </tr>
            ) : (
              entries.map((entry) => (
                <tr key={entry._id}>
                  <td>{entry.name}</td>
                  <td>{entry.email}</td>
                  <td>{entry.age}</td>
                  <td>{entry.course}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(entry)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(entry._id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Form;