import AdminNav from "../../components/AdminNav";

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
      <AdminNav />

      <h1>Users Management</h1>
      <p>Admin can review, ban or delete users.</p>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.isBanned ? "Banned" : "Active"}</td>
              <td>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() =>
                      alert(
                        `${user.username} would be banned after backend integration.`,
                      )
                    }
                    className="rounded-xl border border-yellow-400 px-4 py-2 text-yellow-300"
                  >
                    Ban user
                  </button>

                  <button
                    onClick={() =>
                      alert(
                        `${user.username} would be deleted after backend integration.`,
                      )
                    }
                    className="rounded-xl border border-red-400 px-4 py-2 text-red-300"
                  >
                    Delete user
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
