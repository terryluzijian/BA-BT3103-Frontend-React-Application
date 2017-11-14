import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';

class Header extends Component {
  constructor(props) {
      super(props);
      var pathname = this.props.location.pathname;
      if (pathname === "/analytics" ||  pathname === "/about" || pathname === "/transport") {
        this.state = {theme: "white"};
      }
      else {
        this.state = {theme: "dark"};
      }
  }

  changeDarkTheme() {
    if (this.state.theme === "white") {
      this.setState({
        theme: "dark"
      });
    }
  }

  changeWhiteTheme() {
    if (this.state.theme === "dark") {
      this.setState({
        theme: "white"
      });
    }
  }

  render() {
    return (
      <header className={this.state.theme}>

        <div className="logo">
          <Link to="/" onClick={this.changeDarkTheme.bind(this)}>LOGO HERE</Link>
        </div>

        <nav>
          <ul>
            <li className="first">
              <Link to="/about" onClick={this.changeWhiteTheme.bind(this)}>About</Link>
            </li>
            <li>
              <Link to="/transport" onClick={this.changeWhiteTheme.bind(this)}>Transport</Link>
            </li>
            <li>
              <Link to="/analytics" onClick={this.changeWhiteTheme.bind(this)}>Analytics</Link>
            </li>
            <li className="last">
              <Link to="/signin" onClick={this.changeDarkTheme.bind(this)}>Sign in</Link>
            </li>
          </ul>
        </nav>

      </header>
    );
  }
}

export default Header;
