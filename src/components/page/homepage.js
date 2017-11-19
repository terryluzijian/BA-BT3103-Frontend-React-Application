import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';

import RaisedButton from 'material-ui/RaisedButton';

const style = {
  marginTop: 15,
};

class Homepage extends Component {
  render() {
    return (

      <div className="wrapped-content">
        <div className="jumbotron jumbotron-fluid text-center">

          <div className="main-text">
            <h1>
              NUS Mobility Web Applications
            </h1>
            <h2>
              Enhance your in-campus travel experience with our integrated transport information gateway
            </h2>
          </div>

          <div className="button-group">
            <RaisedButton className="light-button" label="Try Now" style={style} containerElement={<Link to="/transport"></Link>} />
            <RaisedButton className="dark-button" label="Register" primary={true} style={style} containerElement={<Link to="/signup"></Link>} />
          </div>

          <div className="upper-globe">
              <div className="internal"></div>
          </div>

        </div>
      </div>

    );
  }
}

export default Homepage;
