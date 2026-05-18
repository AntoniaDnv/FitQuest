export default function AdminUsers() {
  const users = [
    {
      id: 1,
      username: "mireya",
      email: "mireya@test.com",
      role: "admin",
      isBanned: false,
    },
    {
      id: 2,
      username: "antonia",
      email: "antonia@test.com",
      role: "user",
      isBanned: false,
    },
  ];

  return (
    <main className="admin-page">
      <h1>Users Management</h1>
      <p>Admin can review, ban or delete users.</p>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.isBanned ? "Banned" : "Active"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
