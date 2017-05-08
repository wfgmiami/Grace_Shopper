import React from 'react';
import { connect } from 'react-redux';
import UserListItem from './UserListItem';

const Users = ({ users }) => {
  return (
    <div className="container">
      <h3>Users</h3>
      <ul className="list-group">
        { users.map(user => (
          <li key={user.id} className="list-group-item form-inline">
            <UserListItem user={user} />
          </li>) ) }
      </ul>
    </div>
  );
};

const mapStateToProps = ({ users }) => ({
  users
});

export default connect(mapStateToProps)(Users);
