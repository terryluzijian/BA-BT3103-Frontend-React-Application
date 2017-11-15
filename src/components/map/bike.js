import React, { Component } from 'react';
import BikeIcon from '../../asset/svg/Bike.svg';

class Bike extends Component {

  render() {
    var projected = this.props.viewport.project([this.props.lon, this.props.lat]);

    const defaultContainerStyle = {
      "zIndex": "1",
      "position": "absolute",
      top: projected[1] || 0,
      left: projected[0] || 0,
    }

    return (
      <div className="mapboxgl-popup mapboxgl-popup-anchor-bottom" style={defaultContainerStyle}>
        <div key="tip" className="mapboxgl-popup-tip" />
        <div key="content" className="mapboxgl-popup-content">
          <img className="map-icon" src={BikeIcon} alt='' />
          <p>{(this.props.dist * 1000).toFixed(0)}m</p>
        </div>
      </div>
    );
  }
}

export default Bike;
