import { useEffect, useState } from "react";
import { getUsers } from "../api";
import "../styles/Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  return (
    <div className="users-container">
      <h2 className="users-header">Users</h2>
      <ul className="users-list">
        {users.map((user) => (
          <li key={user.UserID} className="users-item">
            {user.Username} ({user.Email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;