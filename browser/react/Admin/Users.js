import React from 'react';
import { connect } from 'react-redux';
import UserListItem from './UserListItem';
import { destroyUser } from '../../redux/reducers/admin/users';


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

// const mapDispatchToProps = dispatch => ({
//   destroyUser: user => dispatch(destroyUser(user))
// });

export default connect(mapStateToProps)(Users);
