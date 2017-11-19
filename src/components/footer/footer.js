import React, { Component } from 'react';
import LogoDarkIcon from '../../asset/svg/Logo-Dark.svg';

class Footer extends Component {
  render() {
    const defaultIconStyle = {
      "fontSize": 30,
      "padding": "0px 6px"
    }

    return (
      <footer>

        <div className="community">
          <i className="fa fa-behance-square" style={defaultIconStyle} />
          <i className="fa fa-github-square" style={defaultIconStyle} />
          <i className="fa fa-facebook-square" style={defaultIconStyle} />
        </div>
        <p>© AY17/18 BT3103 Group 10 All Rights Reserved.</p>

      </footer>
    );
  }
}

export default Footer;
