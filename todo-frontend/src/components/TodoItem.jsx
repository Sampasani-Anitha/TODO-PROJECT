import React from 'react';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const handleToggle = () => {
    onToggle(todo.id, !todo.completed);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      onDelete(todo.id);
    }
  };

  const handleEdit = () => {
    onEdit(todo);
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          className="todo-checkbox"
          title={todo.completed ? "Mark as pending" : "Mark as completed"}
        />
        <div className="todo-info">
          <div className="todo-header">
            <h3 className="todo-title">{todo.title}</h3>
            <span className="todo-id">ID: {todo.id}</span>
          </div>
          {todo.description && (
            <p className="todo-description">{todo.description}</p>
          )}
          <div className="todo-metadata">
            <span className="todo-status">
              {todo.completed ? '✅ Completed' : '⏳ Pending'}
            </span>
            <span className="todo-date">
              📅 {new Date(todo.createdAt).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
      <div className="todo-actions">
        <button onClick={handleEdit} className="btn btn-primary" title="Edit this todo">
          ✏️ Edit
        </button>
        <button onClick={handleDelete} className="btn btn-danger" title="Delete this todo">
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
