import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../redux/services/users/usersApi";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: user,
    isLoading,
    isError,
  } = useGetUserByIdQuery(id, { skip: !id });

  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    role: "user",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        username: user.username || "",
        role: user.role || "user",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user]);

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (isError) return <div className="p-4 text-red-600">Failed to load user.</div>;
  if (!user) return <div className="p-4">User not found.</div>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ id: user.id, ...form }).unwrap();
      setEditing(false);
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update user");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await deleteUser(user.id).unwrap();
      navigate("/users");
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete user");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="mb-4 flex items-center justify-between">
        <Link to="/users" className="text-blue-600 hover:underline">
          ← Back to users
        </Link>
        <div className="space-x-2">
          <button
            className="bg-yellow-500 text-white px-3 py-1 rounded"
            onClick={() => setEditing((v) => !v)}
          >
            {editing ? "Cancel" : "Edit"}
          </button>
          <button
            className="bg-red-600 text-white px-3 py-1 rounded"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>

      {editing ? (
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input name="name" value={form.name} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input name="email" value={form.email} onChange={handleChange} type="email" className="w-full border rounded px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium">Username</label>
            <input name="username" value={form.username} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium">Role</label>
            <select name="role" value={form.role} onChange={handleChange} className="w-full border rounded px-3 py-2">
              <option value="user">user</option>
              <option value="admin">admin</option>
              <option value="moderator">moderator</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium">Address</label>
            <input name="address" value={form.address} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>

          <div>
            <button type="submit" disabled={isUpdating} className="bg-green-600 text-white px-4 py-2 rounded">
              {isUpdating ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
          <div className="text-sm text-gray-600 mb-4">{user.username}</div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border rounded p-4">
              <div className="text-sm text-gray-500">Email</div>
              <div className="font-medium">{user.email}</div>
            </div>

            <div className="border rounded p-4">
              <div className="text-sm text-gray-500">Role</div>
              <div className="font-medium">{user.role}</div>
            </div>

            <div className="border rounded p-4">
              <div className="text-sm text-gray-500">Phone</div>
              <div className="font-medium">{user.phone || "—"}</div>
            </div>

            <div className="border rounded p-4">
              <div className="text-sm text-gray-500">Address</div>
              <div className="font-medium">{user.address || "—"}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserDetails;
