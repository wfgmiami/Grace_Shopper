import React, { Component } from 'react';
import { login, logout } from '../../redux/reducers/auth';
import { connect } from 'react-redux';


const LoginForm = ({ invalidLogin, login, name, password, onNameChange, onPasswordChange, user, logout }) => {

  const submitFn = user ? logout : login;
  const h3Style = { marginTop: '0px' };
 return (
   <div>
     { user ? <h3 style={h3Style}>Sign Out</h3> : <h3 style={h3Style}>Sign In</h3>}
     { user && `Hello, ${ user.name }` }
     { invalidLogin ? <div style={{ color: 'red' }}>Invalid Login</div> : null }
      <div className="buffer local">
        <form onSubmit={ submitFn }>
          {!user && (<div>
            <div className="form-group">
              <input className="form-control" placeholder="name" value={ name } onChange={ onNameChange } />
            </div>
            <div className="form-group">
              <input className="form-control" type="password" placeholder="password" value={ password } onChange={ onPasswordChange } />
            </div>
            </div>)}

              <button className="btn btn-primary">{ user ? `Sign Out` : `Sign In` }</button>
        </form>
      </div>
      {!user && (<div>
        <div className="or buffer">
          <div className="back-line">
            <span>OR</span>
          </div>
        </div>
        <div className="buffer oauth">
          <p>
            <a href="/api/auth/google" className="btn btn-social btn-google">
              <i className="fa fa-google" />
              <span>Sign In With Google</span>
            </a>
          </p>
        </div>
      </div>)}

      <pre>
        Login:
        <br />
        name: Arum, password: 123<br />
        name: Richard, password: 1234<br />
        name: Evan, password: 12345<br />
        name: Alex, password: 123456
      </pre>
  </div>
 );
};

class LoginPage extends Component{
  constructor(){
    super();

    this.state = {
      name: '',
      password: ''
    };
    this.onNameChange = this.onNameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);

  }

  onNameChange(ev) {
    this.setState({ name: ev.target.value });
  }

  onPasswordChange(ev) {
    this.setState({ password: ev.target.value });
  }

  onLogin(ev) {
    ev.preventDefault();
    this.props.login(this.state);
    this.setState({ name: '', password: ''});
  }

  onLogout(ev) {
    ev.preventDefault();
    this.props.logout();
  }

  render(){
    return (
      <LoginForm
        invalidLogin={ this.props.invalidLogin }
        logout={ this.onLogout }
        user={ this.props.user }
        login={ this.onLogin }
        name={ this.state.name }
        password={ this.state.password }
        onNameChange={ this.onNameChange }
        onPasswordChange={ this.onPasswordChange }
      />
    );
  }

}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    invalidLogin: state.auth.invalidLogin
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => dispatch(login(credentials)),
    logout: () => dispatch(logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
