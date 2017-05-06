import React from 'react';
import { destroyUser, modifyUser } from '../../redux/reducers/admin/users';
import { connect } from 'react-redux';


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
      <div>
        <button className="glyphicon glyphicon-remove btn btn-danger btn-xs pull-right" onClick={ () => this.props.destroyUser(user) } />
        <p>
          <b>ID:</b> { user.id }
        </p>
        <p>
          <b>Name:</b> { user.name }
        </p>
        <p>
          <b>Email:</b> { user.email }
        </p>
        <button
          className={ this.state.passwordExpired ? 'btn btn-default pull-right' : 'btn btn-warning pull-right'}
          onClick={ () => this.requireNewPassword( user ) }
          disabled={ this.state.passwordExpired }
        >{this.state.passwordExpired ? 'Password Required Sent' : 'Require New Password'}</button>
        <p>
          <b>Admin:</b> { ' ' }
          <select
            onChange={ ev => this.updatePassExp(ev, user) }
            defaultValue={ JSON.parse( this.state.isAdmin ) }
            style={ selStyle }
            className="form-control"
          >
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        </p>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  destroyUser: user => dispatch(destroyUser(user)),
  modifyUser: (user, mods) => dispatch(modifyUser(user, mods))
});

export default connect(null, mapDispatchToProps)(UserListItem);
