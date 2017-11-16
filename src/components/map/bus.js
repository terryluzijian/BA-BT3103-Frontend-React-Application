import React, { Component } from 'react';
import BusIcon from '../../asset/svg/Bus.svg';
import BusSchoolIcon from '../../asset/svg/Bus-School.svg';
import BusCombinedIcon from '../../asset/svg/Bus-Combined.svg';

class Bus extends Component {

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

    let BusMapIcon = null;
    if (this.props.brand === "Public") {
      BusMapIcon = <img className="map-icon" src={BusIcon} alt='' style={iconStyle} />;
    }
    else if (this.props.brand === "Public/NUS") {
      BusMapIcon = <img className="map-icon" src={BusCombinedIcon} alt='' style={iconStyle}/>;
    }
    else if (this.props.brand === "NUS") {
      BusMapIcon = <img className="map-icon" src={BusSchoolIcon} alt='' style={iconStyle}/>;
    }

    return (
      <div className="mapboxgl-popup mapboxgl-popup-anchor-bottom" style={defaultContainerStyle}>
        <div key="tip" className="mapboxgl-popup-tip" />
        <div key="content" className="mapboxgl-popup-content">
          {BusMapIcon}
          {this.props.zoom >= 15.5 && <p>{(this.props.dist * 1000).toFixed(0)}m</p>}
        </div>
      </div>
    );
  }
}

export default Bus;
