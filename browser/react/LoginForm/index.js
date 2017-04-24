import React, { Component } from 'react';
import { login, logout } from '../../redux/reducers/auth';
import { connect } from 'react-redux';


const LoginForm = ({ invalidLogin, login, name, password, onNameChange, onPasswordChange, user, logout }) => {

 const submitFn = user ? logout : login;

 return (
   <div>
     <h3>Sign In</h3> { user ? `Hello, ${ user.name }` : null }
     { invalidLogin ? <div style={{ color: 'red' }}>Invalid Login</div> : null }
      <form onSubmit={ submitFn }>
        <div className="form-group">
          <input className="form-control" placeholder="name" value={ name } onChange={ onNameChange } />
        </div>
        <div className="form-group">
          <input className="form-control" type="password" placeholder="password" value={ password } onChange={ onPasswordChange } />
        </div>
        <button className="btn btn-primary">{ user ? `Sign Out` : `Sign In` }</button>
      </form>
<pre>
Login:<br />
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

  }

  onNameChange(ev){
    this.setState({ name: ev.target.value });
  }

  onPasswordChange(ev){
    this.setState({ password: ev.target.value });
  }

  onLogin(ev){
    ev.preventDefault();
    this.props.login(this.state);
    this.setState({ name: '', password: ''});
  }

  render(){

    return (
      <LoginForm
        invalidLogin={ this.props.invalidLogin }
        logout={ this.props.logout }
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
