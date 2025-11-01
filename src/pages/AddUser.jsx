import React, { useState } from "react";
import { useCreateUserMutation } from "../redux/services/users/usersApi";

const AddUser = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    role: "user",
    phone: "",
    address: "",
  });
  const [status, setStatus] = useState(null);

  const [createUser, { isLoading }] = useCreateUserMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const created = await createUser(form).unwrap();
      console.log("User created", created);
      setStatus("success");
      setForm({ name: "", email: "", username: "", role: "user", phone: "", address: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add User</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Username</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="user">user</option>
            <option value="admin">admin</option>
            <option value="moderator">moderator</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Address</label>
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {isLoading ? "Adding..." : "Add User"}
          </button>
        </div>
      </form>

      {status === "success" && (
        <p className="mt-3 text-green-600">User added successfully.</p>
      )}
      {status === "error" && (
        <p className="mt-3 text-red-600">Failed to add user.</p>
      )}
    </div>
  );
};

export default AddUser;
