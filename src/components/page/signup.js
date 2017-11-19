import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import $ from 'jquery';

import { CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';
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

class Signup extends Component {

  constructor(props: Props) {
    super(props);
    this.state = {
      inputEmail: '',
      inputPassword: '',
      inputConfirmPassword: ''
    };
  }

  updateEmailInput() {
    this.setState({
      inputEmail: $('#emailInputRegister').val()
    });
  }

  updatePasswordInput() {
    this.setState({
      inputPassword: $('#passwordInputRegister').val()
    });
  }

  updatePassword2Input() {
    this.setState({
      inputConfirmPassword: $('#password2InputRegister').val()
    });
  }

  handleSubmit(e) {
    var onSuccess = function registerSuccess(result) {
        var cognitoUser = result.user;
        console.log('user name is ' + cognitoUser.getUsername());
        alert('Registration successful. Please check your email for your verification code');
    };
    var onFailure = function registerFailure(err) {
        alert(err);
    };
    e.preventDefault();
    if (this.state.inputPassword === this.state.inputConfirmPassword) {
        this.register(this.state.inputEmail, this.state.inputPassword, onSuccess, onFailure);
    } else {
        alert('Passwords do not match');
    }
  }

  toUsername(email) {
      return email.replace('@', '-at-');
  }

  register(email, password, onSuccess, onFailure) {
      var dataEmail = {
          Name: 'email',
          Value: email
      };
      var attributeEmail = new CognitoUserAttribute(dataEmail);

      userPool.signUp(this.toUsername(email), password, [attributeEmail], null,
          function signUpCallback(err, result) {
              if (!err) {
                  onSuccess(result);
              } else {
                  alert(err);
                  onFailure(err);
              }
          }
      );
  }

  render() {
    return (

      <div className="wrapped-content">
        <div className="jumbotron jumbotron-fluid text-center">

          <div className="main-text">
            <h1>
              Sign up for Better Experience
            </h1>
            <h2>
              Register for your username and password, and enjoy customizable search functionalities
            </h2>
          </div>

          <div className="upper-globe register">
              <div className="internal"></div>
          </div>

          <form className="form-data signup" id="signupForm">
            <h1>Sign up</h1>
            <TextField className="input-form" hintText="" floatingLabelText="Email Address" floatingLabelFixed={true} type="email" id="emailInputRegister" onChange={this.updateEmailInput.bind(this)}
              errorStyle={styles.errorStyle} floatingLabelStyle={styles.floatingLabelStyle} underlineFocusStyle={styles.underlineStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle} required/><br />
            <TextField className="input-form" hintText="" floatingLabelText="Password" floatingLabelFixed={true} type="password" id="passwordInputRegister" onChange={this.updatePasswordInput.bind(this)}
              errorStyle={styles.errorStyle} floatingLabelStyle={styles.floatingLabelStyle} underlineFocusStyle={styles.underlineStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle} required/><br />
            <p>Contains at least 8 characters with one symbol and one capital letter</p><br />
            <TextField className="input-form" hintText="" floatingLabelText="Confirm Password" floatingLabelFixed={true} type="password" id="password2InputRegister" onChange={this.updatePassword2Input.bind(this)}
              errorStyle={styles.errorStyle} floatingLabelStyle={styles.floatingLabelStyle} underlineFocusStyle={styles.underlineStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle} required/><br />
            <RaisedButton className="dark-button" label="Back" primary={true} style={buttonStyle} containerElement={<Link to="/signin"></Link>} />
            <RaisedButton className="darker-button" type="submit" label="Sign up" primary={true} style={buttonStyle} value="Sign Up" onClick={this.handleSubmit.bind(this)}/>
          </form>

        </div>
      </div>

    );
  }
}

export default Signup;
