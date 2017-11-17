import React, { Component } from 'react';
import Ofo from '../../asset/svg/Bike-Ofo.svg';
import Obike from '../../asset/svg/Bike-Obike.svg';
import Mobike from '../../asset/svg/Bike-Mobike.svg';

class Bike extends Component {

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
      <div className="mapboxgl-popup mapboxgl-popup-anchor-bottom" style={defaultContainerStyle}
        onMouseEnter={this.handleMouseEnter.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)} onClick={this.hideContent.bind(this)}>
        <div key="tip" className="mapboxgl-popup-tip" />
        <div key="content" className="mapboxgl-popup-content">
          {BikeIcon}
          {(this.props.zoom >= 15.5 || !this.state.hide) && <p>{(this.props.dist * 1000).toFixed(0)}m</p>}
          {this.state.hide ? <div className="transport-info hide"/> : <div className="transport-info active" style={{height: 1.75 + this.state.dataSize * 19}}>
            <hr />
            <div className="wrapped-data">
              <div className="data-index">
                <p className="header">Bike Code</p>
              </div>
              <div className="data-value">
                <p className="header">Brand</p>
              </div>
            </div>
            <div className="wrapped-data">
              <div className="data-index">
                <p className="index">{this.props.code}</p>
              </div>
              <div className="data-value">
                <p className="value">{this.props.brand}</p>
              </div>
            </div>
          </div>}
        </div>
      </div>
    );
  }
}

export default Bike;
