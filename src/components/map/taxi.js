import React, { Component } from 'react';
import TaxiIcon from '../../asset/svg/Taxi.svg';

class Taxi extends Component {

  render() {
    var projected = this.props.viewport.project([this.props.lon, this.props.lat]);

    const defaultContainerStyle = {
      "zIndex": "1",
      "position": "absolute",
      top: projected[1] || 0,
      left: projected[0] || 0,
      transform: "translate(-50%, -100%)"
    }

    var iconStyle = {
      margin: (this.props.zoom < 15.5) && "0px"
    }

    return (
      <div className="mapboxgl-popup mapboxgl-popup-anchor-bottom" style={defaultContainerStyle}>
        <div key="tip" className="mapboxgl-popup-tip" />
        <div key="content" className="mapboxgl-popup-content">
          <img className="map-icon" src={TaxiIcon} alt='' style={iconStyle} />
          {this.props.zoom >= 15.5 && <p>{(this.props.dist * 1000).toFixed(0)}m</p>}
        </div>
      </div>
    );
  }
}

export default Taxi;
