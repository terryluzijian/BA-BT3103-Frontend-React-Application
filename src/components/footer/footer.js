import React, { Component } from 'react';

class Footer extends Component {
  render() {
    const defaultIconStyle = {
      "fontSize": 30,
      "padding": "0px 6px"
    }

    return (
      <footer>

        <div className="community">
          <a target="_blank" rel="noopener noreferrer" href="https://www.behance.net/"><i className="fa fa-behance-square" style={defaultIconStyle} /></a>
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/"><i className="fa fa-github-square" style={defaultIconStyle} /></a>
          <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/"><i className="fa fa-facebook-square" style={defaultIconStyle} /></a>
        </div>
        <p>© AY17/18 BT3103 Group 10 All Rights Reserved.</p>

      </footer>
    );
  }
}

export default Footer;
