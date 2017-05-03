import React from 'react';

const UserListItem = ({ user }) => (
  <li className="list-group-item">
    <p><b>Name:</b> { user.name }</p>
    <p><b>Email:</b> { user.email }</p>
    <p><b>Admin:</b> { user.isAdmin.toString() }</p>
  </li>
);

export default UserListItem;
