import React, { Component } from 'react';
import BuildingIcon from '../../asset/svg/Building.svg';

import $ from 'jquery';
import geolib from 'geolib';

import { ClipLoader } from 'react-spinners';

class Building extends Component {

  constructor(props: Props) {
    super(props);
    this.state = {
      hide: true,
      hovering: false,
      dataSize: 2
    };
  }

  hideContent () {
    this.setState ((prevState, props) => {
      return {
        hide: !prevState.hide
      };
    });
  }

  handleMouseEnter() {
    this.setState({
      hovering: true
    });
  }

  handleMouseLeave() {
    this.setState({
      hovering: false
    });
  }

  getZIndex() {
    if (!this.state.hide && this.state.hovering) {
      return 13;
    }
    else if (!this.state.hide && !this.state.hovering) {
      return 12;
    }
    else if (this.state.hide && this.state.hovering) {
      return 14;
    }
    else {
      return 1;
    }
  }

  render() {
    var projected = this.props.viewport.project([this.props.lon, this.props.lat]);

    const defaultContainerStyle = {
      "zIndex": this.getZIndex(),
      "position": "absolute",
      top: projected[1] || 0,
      left: projected[0] || 0,
      transform: "translate(-50%, -100%)",

    }

    var iconStyle = {
      margin: (this.props.zoom < 15.5) && "0px"
    }

    var contentHeight = 9;

    return (
      <div className="mapboxgl-popup mapboxgl-popup-anchor-bottom" style={defaultContainerStyle}
        onMouseEnter={this.handleMouseEnter.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)} onClick={this.hideContent.bind(this)}>
        <div key="tip" className="mapboxgl-popup-tip" />
        <div key="content" className="mapboxgl-popup-content">
          <img className="map-icon" src={BuildingIcon} alt='' style={iconStyle} />
          {this.state.hide || <a className="close-button">×</a>}
            {(this.props.zoom >= 15.5 || !this.state.hide) && <p>{geolib.getDistance([this.props.lat, this.props.lon], [this.props.userLat, this.props.userLon])}m</p>}
          {this.state.hide ? <div className="transport-info hide"/> : <div className="transport-info active" style={{height: contentHeight, width: 90}}>
            <p className="title">{this.props.name}</p>
          </div>}
        </div>
      </div>
    );
  }
}

export default Building;
