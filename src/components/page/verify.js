import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

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

          <div className="upper-globe verify">
              <div className="internal"></div>
          </div>

          <div className="form-data verify">
            <h1>Verify</h1>
            <TextField className="input-form" hintText="" floatingLabelText="Email Address" floatingLabelFixed={true}
              errorStyle={styles.errorStyle} floatingLabelStyle={styles.floatingLabelStyle} underlineFocusStyle={styles.underlineStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}/><br />
            <TextField className="input-form" hintText="" floatingLabelText="Verification Code" floatingLabelFixed={true} type="password"
              errorStyle={styles.errorStyle} floatingLabelStyle={styles.floatingLabelStyle} underlineFocusStyle={styles.underlineStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}/><br />
            <RaisedButton className="dark-button" label="Back" primary={true} style={buttonStyle} containerElement={<Link to="/signin"></Link>}/>
            <RaisedButton className="darker-button" type="submit" label="Verify" primary={true} style={buttonStyle} />
          </div>

        </div>
      </div>

    );
  }
}

export default Verify;
