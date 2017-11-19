import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import $ from 'jquery';

import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';
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

class Verify extends Component {

  constructor(props: Props) {
    super(props);
    this.state = {
      inputEmail: '',
      inputCode: '',
    };
  }

  updateEmailInput() {
    this.setState({
      inputEmail: $('#emailInputVerify').val()
    });
  }

  updateCodeInput() {
    this.setState({
      inputCode: $('#codeInputVerify').val()
    });
  }

  verify(email, code, onSuccess, onFailure) {
      this.createCognitoUser(email).confirmRegistration(code, true, function confirmCallback(err, result) {
          if (!err) {
              onSuccess(result);
          } else {
              onFailure(err);
          }
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

  handleVerify(e) {
      var email = this.state.inputEmail;
      var code = this.state.inputCode;
      e.preventDefault();
      this.verify(email, code,
          function verifySuccess(result) {
              console.log('call result: ' + result);
              console.log('Successfully verified');
              alert('Verification successful. You will now be redirected to the login page.');
              window.location.href = '/signin';
          },
          function verifyError(err) {
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
              Sign in for Better Experience
            </h1>
            <h2>
              Register for your username and password, and enjoy customizable search functionalities
            </h2>
          </div>

          <div className="upper-globe verify">
              <div className="internal"></div>
          </div>

          <div className="form-data verify">
            <h1>Verify</h1>
            <TextField className="input-form" hintText="" floatingLabelText="Email Address" floatingLabelFixed={true} id="emailInputVerify" onChange={this.updateEmailInput.bind(this)}
              errorStyle={styles.errorStyle} floatingLabelStyle={styles.floatingLabelStyle} underlineFocusStyle={styles.underlineStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle} required/><br />
            <TextField className="input-form" hintText="" floatingLabelText="Verification Code" floatingLabelFixed={true} id="codeInputVerify" onChange={this.updateCodeInput.bind(this)}
              errorStyle={styles.errorStyle} floatingLabelStyle={styles.floatingLabelStyle} underlineFocusStyle={styles.underlineStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle} required/><br />
            <RaisedButton className="dark-button" label="Back" primary={true} style={buttonStyle} containerElement={<Link to="/signin"></Link>}/>
            <RaisedButton className="darker-button" type="submit" label="Verify" primary={true} style={buttonStyle} onClick={this.handleVerify.bind(this)}/>
          </div>

        </div>
      </div>

    );
  }
}

export default Verify;
