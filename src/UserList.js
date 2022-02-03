import React from "react";

function UserList({ users, setCurrentUser }) {
  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id} >
            <button type="button" onClick={() => setCurrentUser(user)} >
              {user.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;