import React from 'react';
import { connect } from 'react-redux';
import { isEmail, isAlpha } from 'validator';
import { createUser } from '../../redux/reducers/auth';


class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      errorMessages: []
    };
    this.changeName = this.changeName.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changeConfirmPassword = this.changeConfirmPassword.bind(this);
    this.submitSignUp = this.submitSignUp.bind(this);
  }

  changeName( ev ) {
    this.setState({ name: ev.target.value });
  }

  changeEmail( ev ) {
    this.setState({ email: ev.target.value });
  }

  changePassword( ev ) {
    this.setState({ password: ev.target.value });
  }

  changeConfirmPassword( ev ) {
    this.setState({ confirmPassword: ev.target.value });
  }

  submitSignUp( ev ) {
    ev.preventDefault();
    const { name, email, password, confirmPassword } = this.state;

    // Validation occurs on the server
    // Run a validation on the client as well
    const errorMessages = [];
    if ( !isAlpha(name) ) errorMessages.push( 'No special characters allowed in the name' );
    if ( name.length < 2 ) errorMessages.push( 'Name is too short' );
    if ( !isEmail(email) ) errorMessages.push( 'A valid email must be provided' );
    if ( password !== confirmPassword ) errorMessages.push( 'Passwords do not match' );
    if ( password.length < 5 ) errorMessages.push( 'Password is too short' );

    this.setState({ errorMessages });
    if ( !errorMessages.length ) {
      this.props.createUser({ name, email, password });
    }
  }

  render() {
    const { password, confirmPassword, name, email, errorMessages } = this.state;
    return (
      <div className="container">
        <h1>Sign Up</h1>
        <form onSubmit={ this.submitSignUp }>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" className="form-control" value={ name } onChange={ this.changeName } />
            { name.length < 2 && <div className="text-warning">Name must be longer than one character</div> }
            { !isAlpha(name) && name.length > 1 && <div className="text-warning">Sorry, no special characters allowed</div> }
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="text" className="form-control" value={ email } onChange={ this.changeEmail } />
            { !isEmail(email) && <span className="text-warning">Must be a valid email</span> }
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" className="form-control" value={ password } onChange={ this.changePassword } />
            { password.length < 5 && <div className="text-warning">Password is too short</div>}
          </div>
          <div className="form-group">
            <label>Confirm Password:</label>
            <input type="password" className="form-control" value={ confirmPassword } onChange={ this.changeConfirmPassword } />
            { password !== confirmPassword && <span className="text-warning">Passwords do not match</span>}
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Sign Up</button>
          </div>
          <div>
            <ul>
              { errorMessages.map((message, idx) => <li className="text-danger" key={ idx }>{ message }</li> ) }
            </ul>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  createUser: userProps => dispatch(createUser(userProps))
});

export default connect(null, mapDispatchToProps)(SignUp);
