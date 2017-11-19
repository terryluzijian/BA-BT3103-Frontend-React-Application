import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import $ from 'jquery';

import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import dotenv from 'dotenv';
dotenv.config();

var poolData = {
  UserPoolId: process.env.REACT_APP_USER_POOL_ID,
  ClientId: process.env.REACT_APP_CLIENT_ID
};
var userPool = new CognitoUserPool(poolData);

const styles = {
  errorStyle: {
    color: '#D05A6E',
  },
  floatingLabelStyle: {
    color: '#2B667F',
  },
  floatingLabelFocusStyle: {
    color: '#4E8EA9',
  },
  underlineStyle : {
    color: '#2B667F',
  }
};

const buttonStyle = {
  marginTop: 15,
};

class Signin extends Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      inputEmail: '',
      inputPassword: '',
    };
    this.signInSuccess = this.signInSuccess.bind(this);
  }

  updateEmailInput() {
    this.setState({
      inputEmail: $('#emailInputSignin').val()
    });
  }

  updatePasswordInput() {
    this.setState({
      inputPassword: $('#passwordInputSignin').val()
    });
  }

  toUsername(email) {
      return email.replace('@', '-at-');
  }

  createCognitoUser(email) {
      return new CognitoUser({
          Username: this.toUsername(email),
          Pool: userPool
      });
  }

  signin(email, password, onSuccess, onFailure) {
      var authenticationDetails = new AuthenticationDetails({
          Username: this.toUsername(email),
          Password: password
      });

      var cognitoUser = this.createCognitoUser(email);
      cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: onSuccess,
          onFailure: onFailure
      });
  }

  signInSuccess() {
    console.log(this.props);
    console.log('Successfully Logged In');
    window.location.href = '/transport';
  }

  handleSignin(event) {
      var email = this.state.inputEmail;
      var password = this.state.inputPassword;
      event.preventDefault();
      this.signin(email, password,
          this.signInSuccess,
          function signinError(err) {
              alert(err);
          }
      );
  }

  render() {
    return (

      <div className="wrapped-content">
        <div className="jumbotron jumbotron-fluid text-center">

          <div className="main-text">
            <h1>
              Log in for Better Experience
            </h1>
            <h2>
              Enter your username and password, and enjoy customizable search functionalities
            </h2>
          </div>

          <div className="upper-globe register">
              <div className="internal"></div>
          </div>

          <div className="form-data">
            <h1>Sign in</h1>
            <TextField className="input-form" hintText="" floatingLabelText="Email Address" floatingLabelFixed={true} id="emailInputSignin" onChange={this.updateEmailInput.bind(this)}
              errorStyle={styles.errorStyle} floatingLabelStyle={styles.floatingLabelStyle} underlineFocusStyle={styles.underlineStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle} required /><br />
            <TextField className="input-form" hintText="" floatingLabelText="Password" floatingLabelFixed={true} type="password" id="passwordInputSignin" onChange={this.updatePasswordInput.bind(this)}
              errorStyle={styles.errorStyle} floatingLabelStyle={styles.floatingLabelStyle} underlineFocusStyle={styles.underlineStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle} required /><br />
            <RaisedButton className="darker-button" type="submit" label="Sign in" primary={true} style={buttonStyle} onClick={this.handleSignin.bind(this)} />
            <div className="link-group">
              <hr />
              <Link to="/signup">Sign up Now</Link>
              <Link to="/verify">Verify Account</Link>
              <Link to="/forget">Forget Password</Link>
            </div>
          </div>

        </div>
      </div>

    );
  }
}

export default Signin;
