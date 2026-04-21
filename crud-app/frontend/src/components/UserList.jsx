const UserList = ({ users, onEdit, onDelete }) => {
  if (!users || users.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">👥</div>
        <h3>No users found</h3>
        <p>There are no users in the database yet. Add a new user to get started.</p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="modern-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th className="actions-col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="table-row">
              <td>
                <div className="user-name">
                  <div className="avatar">{user.name.charAt(0).toUpperCase()}</div>
                  <span>{user.name}</span>
                </div>
              </td>
              <td className="text-muted">{user.email}</td>
              <td>
                <span className={`badge ${user.role?.toLowerCase() === 'admin' ? 'badge-admin' : 'badge-user'}`}>
                  {user.role || 'User'}
                </span>
              </td>
              <td className="actions-cell">
                <button 
                  className="btn-icon edit-btn" 
                  onClick={() => onEdit(user)}
                  title="Edit User"
                >
                  ✎
                </button>
                <button 
                  className="btn-icon delete-btn" 
                  onClick={() => onDelete(user.id)}
                  title="Delete User"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
