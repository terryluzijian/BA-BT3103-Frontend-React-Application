import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class Header extends Component {
  constructor(props) {
      super(props);
      var pathname = this.props.location.pathname;
      if (pathname === "/analytics" ||  pathname === "/about" || pathname === "/transport") {
        this.state = {
          theme: "white",
          width: 0,
          height: 0,
        };
      }
      else {
        this.state = {
          theme: "dark",
          width: 0,
          height: 0,
        };
      }
  }

  handleResize(e) {
    const newWidth = document.getElementsByClassName("main-app")[0] != null ? document.getElementsByClassName("main-app")[0].offsetWidth : 500;
    const newHeight = document.getElementsByClassName("main-app")[0] != null ? document.getElementsByClassName("main-app")[0].offsetHeight : 500;
    this.setState({
      width: newWidth,
      height: newHeight,
    });
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

  componentDidMount() {
    const currentWidth = document.getElementsByClassName("main-app")[0].offsetWidth;
    const currentHeight = document.getElementsByClassName("main-app")[0].offsetHeight;
    this.setState({
      width: currentWidth,
      height: currentHeight,
    })
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  render() {

    const menuDefaultStyle = {
      position: "absolute",
      display: this.state.width <= 500 ? "inline-block" : "none",
    }

    const navDefaultStyle = {
      display: this.state.width <= 500 && "none"
    }

    const innerDivStyle = {
      "fontFamily": "'Roboto', 'Open Sans', sans-serif",
      "fontWeight": 500,
      "textDecoration": "none",
      margin: 0,
      width: "100%",
      color: "#2B667F",
      display: this.state.width > 500 && "none"
    }

    const linkStyle = {
      "minHeight": '36px',
      "lineHeight": '36px',
      display: this.state.width > 500 && "none"
    }

    return (
      <header className={this.state.theme}>

        <div className="logo">
          <Link to="/" onClick={this.changeDarkTheme.bind(this)}>LOGO HERE</Link>
        </div>

        <IconMenu className='mobile-nav' style={menuDefaultStyle}
          iconButtonElement={<IconButton><MoreVertIcon className="menu-icon" color={this.state.theme === 'white' ? '#2B667F' : '#FFFFFF'} /></IconButton>}
          anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}>

          <MenuItem className="menu-item" innerDivStyle={innerDivStyle} style={linkStyle} primaryText="About" onClick={this.changeWhiteTheme.bind(this)} containerElement={<Link to="/about">About</Link>}/>
          <MenuItem className="menu-item" innerDivStyle={innerDivStyle} style={linkStyle} primaryText="Transport" onClick={this.changeWhiteTheme.bind(this)} containerElement={<Link to="/transport">Transport</Link>}/>
          <MenuItem className="menu-item" innerDivStyle={innerDivStyle} style={linkStyle} primaryText="Analytics" onClick={this.changeWhiteTheme.bind(this)} containerElement={<Link to="/analytics">Analytics</Link>}/>
          <MenuItem className="menu-item" innerDivStyle={innerDivStyle} style={linkStyle} primaryText="Sign in" onClick={this.changeDarkTheme.bind(this)} containerElement={<Link to="/signin">Sign in</Link>}/>

        </IconMenu>

        <nav style={navDefaultStyle}>
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
