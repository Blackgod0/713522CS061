import React, { useEffect, useState } from "react";
import { getUsers } from "../services/api";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(Object.entries(data.users).map(([id, name]) => ({ id, name })));
    };
    fetchUsers();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center">Top Users</h2>
      <div className="list-group">
        {users.map((user) => (
          <div key={user.id} className="list-group-item list-group-item-action">
            <strong>ID:</strong> {user.id} <br />
            <strong>Name:</strong> {user.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
