import React, { Component } from 'react';
import UserLocation from '../../asset/svg/UserLocation.svg';
import Home from '../../asset/svg/Home.svg';

class Location extends Component {

  render() {
    var projected = this.props.viewport.project([this.props.lon, this.props.lat]);

    const defaultContainerStyle = {
      "zIndex": "3",
      "position": "absolute",
      top: projected[1] || 0,
      left: projected[0] || 0,
      transform: "translate(-50%, -100%)"
    }

    return (
      <div className="mapboxgl-popup mapboxgl-popup-anchor-bottom" style={defaultContainerStyle}>
        <div key="tip" className="mapboxgl-popup-tip" />
        <div key="content" className="mapboxgl-popup-content">
          <img className="map-icon-main" src={this.props.failToGetLocation ? Home : UserLocation} alt='' />
          {this.props.zoom >= 15.5 && <p>{this.props.failToGetLocation ? "Central, NUS" : "You're here"}</p>}
        </div>
        <div className="current-location">
          <div className="location-pin" />
        </div>
      </div>
    );
  }
}

export default Location;
