import React, { useState } from 'react';

const TodoForm = ({ onAddTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is mandatory');
      return;
    }
    onAddTodo({ title, description, completed: false });
    setTitle('');
    setDescription('');
    setError('');
  };

  const handleReset = () => {
    setTitle('');
    setDescription('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div style={{ marginBottom: '4px' }}>
        <h3 style={{ color: '#2c3e50', fontSize: '18px', fontWeight: '700', marginBottom: '14px' }}>
          ➕ Create New Todo
        </h3>
      </div>
      <div className="form-group">
        <label>Title *</label>
        <input
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
          required
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          placeholder="Add more details... (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-input"
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
        <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
          ✓ Add Todo
        </button>
        <button 
          type="button" 
          onClick={handleReset} 
          className="btn btn-secondary"
          style={{ flex: 1 }}
        >
          ✕ Clear
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
