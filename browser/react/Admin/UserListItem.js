import React from 'react';
import { destroyUser, modifyUser } from '../../redux/reducers/admin/users';
import { connect } from 'react-redux';

const UserItem = ({ user, destroyUser, updatePassExp, passwordExpired, requireNewPassword, isAdmin }) => {
  const selStyle = JSON.parse(isAdmin) ? { color: 'blue', fontWeight: 'bold' } : {};
  const passButtonClass = passwordExpired ? 'btn btn-default pull-right' : 'btn btn-warning pull-right';
  const passButtonText = passwordExpired ? 'Password Required Sent' : 'Require New Password';
  return (
  <div>
    <button className="glyphicon glyphicon-remove btn btn-danger btn-xs pull-right" onClick={ () => destroyUser(user) } />
    <p>
      <b>ID:</b> { user.id }
    </p>
    <p>
      <b>Name:</b> { user.name }
    </p>
    <p>
      <b>Email:</b> { user.email }
    </p>
    <button className={ passButtonClass } onClick={ () => requireNewPassword( user ) } disabled={ passwordExpired }>
      { passButtonText }
    </button>
    <p>
      <b>Admin:</b> { ' ' }
      <select
        onChange={ ev => updatePassExp(ev, user) }
        defaultValue={ JSON.parse( isAdmin ) }
        style={ selStyle }
        className="form-control"
      >
        <option value="true">true</option>
        <option value="false">false</option>
      </select>
    </p>
  </div>
)};

class UserListItem extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isAdmin: props.user.isAdmin,
      passwordExpired: props.user.passwordExpired
    };
    this.updatePassExp = this.updatePassExp.bind(this);
    this.requireNewPassword = this.requireNewPassword.bind(this);
  }

  updatePassExp( ev, user ) {
    this.setState({ isAdmin: ev.target.value }, () => {
      this.props.modifyUser(user, { mods: this.state });
    });
  }

  requireNewPassword( user ) {
    this.setState({ passwordExpired: true }, () => {
      this.props.modifyUser(user, { mods: this.state });
    });
  }

  render() {
    const { user } = this.props;
    const selStyle = JSON.parse(this.state.isAdmin) ? { color: 'blue', fontWeight: 'bold' } : {};
    console.log(this.props);
    return (
      <UserItem
        user={ user }
        isAdmin={ this.state.isAdmin }
        destroyUser={ this.props.destroyUser }
        updatePassExp={ this.updatePassExp }
        passwordExpired={ this.state.passwordExpired }
        requireNewPassword={ this.requireNewPassword }
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  destroyUser: user => dispatch(destroyUser(user)),
  modifyUser: (user, mods) => dispatch(modifyUser(user, mods))
});

export default connect(null, mapDispatchToProps)(UserListItem);
