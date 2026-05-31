import { useState } from "react";
import AdminNav from "../../components/AdminNav";
import { getAdminUsers } from "../../services/adminService";

export default function AdminUsers() {
  const [users, setUsers] = useState(getAdminUsers());

  function handleBanUser(userId) {
    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === userId ? { ...user, isBanned: true } : user,
      ),
    );
  }

  function handleDeleteUser(userId) {
    setUsers((currentUsers) =>
      currentUsers.filter((user) => user.id !== userId),
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <AdminNav />

      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
          Admin Panel
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          Users Management
        </h1>
        <p className="mt-3 text-slate-400">
          Admin can review, ban or delete users.
        </p>
      </div>

      {users.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-slate-400">
          No users available.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-white/10 text-sm text-slate-400">
                <th className="p-4">Username</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-white/5">
                  <td className="p-4 font-semibold text-cyan-300">
                    {user.username}
                  </td>
                  <td className="p-4 text-slate-300">{user.email}</td>
                  <td className="p-4 text-slate-300">{user.role}</td>
                  <td className="p-4 text-slate-400">
                    {user.isBanned ? "Banned" : "Active"}
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleBanUser(user.id)}
                        disabled={user.isBanned}
                        className={`rounded-xl border px-4 py-2 ${
                          user.isBanned
                            ? "cursor-not-allowed border-slate-600 text-slate-500"
                            : "border-yellow-400 text-yellow-300"
                        }`}
                      >
                        {user.isBanned ? "Banned" : "Ban user"}
                      </button>

                      <button
                        onClick={() => handleDeleteUser(user.id)}
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
        </div>
      )}
    </main>
  );
}
