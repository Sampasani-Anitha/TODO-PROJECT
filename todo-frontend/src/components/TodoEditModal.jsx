import React, { useState, useEffect } from 'react';

const TodoEditModal = ({ todo, onClose, onSave }) => {
  const [title, setTitle] = useState(todo?.title || '');
  const [description, setDescription] = useState(todo?.description || '');
  const [completed, setCompleted] = useState(todo?.completed || false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description || '');
      setCompleted(todo.completed);
    }
  }, [todo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is mandatory');
      return;
    }
    onSave(todo.id, { title, description, completed });
    onClose();
  };

  if (!todo) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>✏️ Edit Todo</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
              placeholder="Todo title..."
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-input"
              placeholder="Add details..."
            />
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={completed}
                onChange={(e) => setCompleted(e.target.checked)}
              />
              {' '}Mark as completed
            </label>
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="modal-actions">
            <button type="submit" className="btn btn-success">
              ✓ Save Changes
            </button>
            <button type="button" onClick={onClose} className="btn btn-secondary">
              ✕ Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoEditModal;
