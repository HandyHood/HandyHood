import { useEffect, useState } from "react";
import { getUsers } from "../api";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.UserID}>{user.Username} ({user.Email})</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
