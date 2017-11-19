import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import LogoWhiteIcon from '../../asset/svg/Logo-White.svg';
import LogoDarkIcon from '../../asset/svg/Logo-Dark.svg';

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

  componentWillReceiveProps(nextProps) {
    var pathname = nextProps.location.pathname;
    if (pathname === "/analytics" ||  pathname === "/about" || pathname === "/transport") {
      this.setState({
        theme: "white"
      });
    }
    else {
      this.setState({
        theme: "dark"
      });
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
      display: this.state.width <= 500 ? "inline-block" : "none"
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
      "textAlign": 'center',
      display: this.state.width > 500 && "none"
    }

    return (
      <header className={this.state.theme}>

        <div className="logo">
          <Link to="/">
            <IconButton style={{"padding": 0, "height": 40, "width": 40}}>
              <img className="header-logo" src={this.state.theme === 'white' ? LogoDarkIcon : LogoWhiteIcon} alt='' />
            </IconButton>
          </Link>
        </div>

        {this.props.location.pathname === '/transport' ? <IconMenu className='mobile-nav' style={menuDefaultStyle}
          iconButtonElement={<IconButton><MoreVertIcon className="menu-icon" color={this.state.theme === 'white' ? '#2B667F' : '#FFFFFF'} /></IconButton>}
          anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}>
          <MenuItem className="menu-item" innerDivStyle={innerDivStyle} style={linkStyle} primaryText="Sign out" containerElement={<Link to="/">SIGN OUT</Link>}/>
        </IconMenu> :
        <IconMenu className='mobile-nav' style={menuDefaultStyle}
          iconButtonElement={<IconButton><MoreVertIcon className="menu-icon" color={this.state.theme === 'white' ? '#2B667F' : '#FFFFFF'} /></IconButton>}
          anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}>
          <MenuItem className="menu-item" innerDivStyle={innerDivStyle} style={linkStyle} primaryText="About" containerElement={<Link to="/about">About</Link>}/>
          <MenuItem className="menu-item" innerDivStyle={innerDivStyle} style={linkStyle} primaryText="Analytics" containerElement={<Link to="/analytics">Analytics</Link>}/>
          <MenuItem className="menu-item" innerDivStyle={innerDivStyle} style={linkStyle} primaryText="Sign in" containerElement={<Link to="/signin">Sign in</Link>}/>

        </IconMenu>}

        {this.props.location.pathname === '/transport' ? <nav style={navDefaultStyle}>
          <ul>
            <li className="last">
              <Link to="/">Sign out</Link>
            </li>
          </ul>
        </nav> :
        <nav style={navDefaultStyle}>
          <ul>
            <li className="first">
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/analytics">Analytics</Link>
            </li>
            <li className="last">
              <Link to="/signin">Sign in</Link>
            </li>
          </ul>
        </nav>}

      </header>
    );
  }
}

export default Header;
