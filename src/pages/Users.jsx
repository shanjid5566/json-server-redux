import React from "react";
import { Link } from "react-router";
import { useGetUsersQuery } from "../redux/services/users/usersApi";

const Users = () => {
  const { data: users, isLoading } = useGetUsersQuery();
  console.log(users);

  if (isLoading) return <div className="p-4">Loading...</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {users?.map((user) => (
        <Link
          key={user.id}
          to={`/users/${user.id}`}
          className="block border rounded-lg p-4 hover:shadow-md transition no-underline text-inherit"
        >
          <div className="text-lg font-semibold">{user.name}</div>
          <div className="text-sm text-gray-600">{user.email}</div>
          <div className="mt-2 inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-md">
            {user.role}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Users;
