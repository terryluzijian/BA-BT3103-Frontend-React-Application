import React, { Component } from 'react';
import Ofo from '../../asset/svg/Bike-Ofo.svg';
import Obike from '../../asset/svg/Bike-Obike.svg';
import Mobike from '../../asset/svg/Bike-Mobike.svg';

class Bike extends Component {

  render() {
    var projected = this.props.viewport.project([this.props.lon, this.props.lat]);

    const defaultContainerStyle = {
      "position": "absolute",
      top: projected[1] || 0,
      left: projected[0] || 0,
      transform: "translate(-50%, -100%)"
    }

    var iconStyle = {
      margin: (this.props.zoom < 15.5) && "0px"
    }

    let BikeIcon = null;
    if (this.props.brand === "Obike") {
      BikeIcon = <img className="map-icon" src={Obike} alt='' style={iconStyle} />;
    }
    else if (this.props.brand === "Ofo") {
      BikeIcon = <img className="map-icon" src={Ofo} alt='' style={iconStyle}/>;
    }
    else if (this.props.brand === "Mobike") {
      BikeIcon = <img className="map-icon" src={Mobike} alt='' style={iconStyle}/>;
    }

    return (
      <div className="mapboxgl-popup mapboxgl-popup-anchor-bottom" style={defaultContainerStyle}>
        <div key="tip" className="mapboxgl-popup-tip" />
        <div key="content" className="mapboxgl-popup-content">
          {BikeIcon}
          {this.props.zoom >= 15.5 && <p>{(this.props.dist * 1000).toFixed(0)}m</p>}
        </div>
      </div>
    );
  }
}

export default Bike;
