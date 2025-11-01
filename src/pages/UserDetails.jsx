import React from "react";
import { useParams, Link } from "react-router";
import { useGetUserByIdQuery } from "../redux/services/users/usersApi";

const UserDetails = () => {
  const { id } = useParams();
  console.log(id)
  console.log("UserDetails id:", id);
  const {
    data: user,
    isLoading,
    isError,
  } = useGetUserByIdQuery(id);
  console.log("UserDetails user:", user);

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (isError) return <div className="p-4 text-red-600">Failed to load user.</div>;
  if (!user) return <div className="p-4">User not found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="mb-4">
        <Link to="/users" className="text-blue-600 hover:underline">
          ← Back to users
        </Link>
      </div>

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
    </div>
  );
};

export default UserDetails;
