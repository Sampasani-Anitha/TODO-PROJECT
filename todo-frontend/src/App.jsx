import React, { useState, useEffect } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from './services/api';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoEditModal from './components/TodoEditModal';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, [filter]);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const completed = filter === 'all' ? null : filter === 'completed';
      const data = await getTodos(completed);
      setTodos(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch todos. Make sure the backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (todo) => {
    try {
      await createTodo(todo);
      fetchTodos();
      setError('');
    } catch (err) {
      setError('Failed to create todo');
      console.error(err);
    }
  };

  const handleToggleTodo = async (id, completed) => {
    try {
      const todo = todos.find((t) => t.id === id);
      await updateTodo(id, { ...todo, completed });
      fetchTodos();
      setError('');
    } catch (err) {
      setError('Failed to update todo');
      console.error(err);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      fetchTodos();
      setError('');
    } catch (err) {
      setError('Failed to delete todo');
      console.error(err);
    }
  };

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
  };

  const handleSaveTodo = async (id, updatedTodo) => {
    try {
      await updateTodo(id, updatedTodo);
      fetchTodos();
      setEditingTodo(null);
      setError('');
    } catch (err) {
      setError('Failed to update todo');
      console.error(err);
    }
  };

  const handleCloseModal = () => {
    setEditingTodo(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>📋 Todo Application</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginTop: '8px', fontWeight: '500' }}>
          Stay organized and manage your tasks efficiently
        </p>
      </header>
      
      <main className="app-main">
        <div className="filter-section">
          <label>🔍 Filter by Status:</label>
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
              title="Show all todos"
            >
              📌 All
            </button>
            <button 
              className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
              onClick={() => setFilter('pending')}
              title="Show pending todos only"
            >
              ⏳ Pending
            </button>
            <button 
              className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
              title="Show completed todos only"
            >
              ✅ Completed
            </button>
          </div>
        </div>

        {error && <div className="error-banner">⚠️ {error}</div>}
        
        {loading ? (
          <div className="loading">⏳ Loading your todos...</div>
        ) : (
          <>
            <TodoForm onAddTodo={handleAddTodo} />
            <TodoList
              todos={todos}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
              onEdit={handleEditTodo}
            />
          </>
        )}

        {editingTodo && (
          <TodoEditModal
            todo={editingTodo}
            onClose={handleCloseModal}
            onSave={handleSaveTodo}
          />
        )}
      </main>
    </div>
  );
}

export default App;
