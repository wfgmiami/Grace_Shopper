import React from 'react';
import { connect } from 'react-redux';
import UserListItem from './UserListItem';

const Users = ({ users }) => {
  return (
    <div className="container">
      <h1>Users</h1>
      <ul className="list-group">
        { users.map(user => <UserListItem key={user.id} user={user} /> ) }
      </ul>
    </div>
  );
};

const mapStateToProps = ({ users }) => ({
  users
});

export default connect(mapStateToProps)(Users);
