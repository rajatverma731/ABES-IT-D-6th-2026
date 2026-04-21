import { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './components/UserList';
import UserForm from './components/UserForm';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Custom hook pattern alternative for straightforward data fetching
  const [usersData, setUsersData] = useState([]);

  // For modal form
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const API_URL = 'http://localhost:3000/users';

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setUsersData(response.data.data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (userData) => {
    try {
      await axios.post(API_URL, userData);
      fetchUsers();
      setIsFormOpen(false);
    } catch (err) {
      setError(err.message || 'Failed to add user');
    }
  };

  const handleUpdateUser = async (id, userData) => {
    try {
      await axios.put(`${API_URL}/${id}`, userData);
      fetchUsers();
      setIsFormOpen(false);
      setEditingUser(null);
    } catch (err) {
      setError(err.message || 'Failed to update user');
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchUsers();
    } catch (err) {
      setError(err.message || 'Failed to delete user');
    }
  };

  const openAddForm = () => {
    setEditingUser(null);
    setIsFormOpen(true);
  };

  const openEditForm = (user) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>User Management</h1>
        <button className="btn btn-primary pulse-hover" onClick={openAddForm}>
          <span className="icon">+</span> Add New User
        </button>
      </header>

      <main className="main-content">
        {error && <div className="error-banner">{error}</div>}
        
        <div className="card glass-effect">
          {loading ? (
            <div className="loader">Loading users...</div>
          ) : (
            <UserList 
              users={usersData} 
              onEdit={openEditForm} 
              onDelete={handleDeleteUser} 
            />
          )}
        </div>
      </main>

      {isFormOpen && (
        <UserForm 
          user={editingUser}
          onSubmit={editingUser ? (data) => handleUpdateUser(editingUser.id, data) : handleAddUser}
          onClose={() => {
            setIsFormOpen(false);
            setEditingUser(null);
          }}
        />
      )}
    </div>
  );
}

export default App;
