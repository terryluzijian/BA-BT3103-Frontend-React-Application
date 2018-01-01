import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';

import RaisedButton from 'material-ui/RaisedButton';

const style = {
  marginTop: 15,
};

class About extends Component {
  render() {
    return (

      <div className="wrapped-content">
        <div className="jumbotron jumbotron-fluid text-center" id="light">

          <div className="main-text">
            <h1>
              A More Elegant Way of Displaying Campus Transportation
            </h1>
            <h2>
              Get insights from every means of public transporation including bus, shared bike, taxi and shuttle bus
            </h2>
          </div>

          <div className="button-group">
            <RaisedButton className="light-button" label="Start Your Journey" style={style} containerElement={<Link to="/signin"></Link>} />
            <RaisedButton className="dark-button" label="Get a Account" primary={true} style={style} containerElement={<Link to="/signup"></Link>} />
          </div>

          <div className="upper-globe about">
              <div className="internal"></div>
          </div>

        </div>
      </div>

    );
  }
}

export default About;
