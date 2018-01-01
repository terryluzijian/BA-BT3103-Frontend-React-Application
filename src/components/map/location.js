import React, { Component } from 'react';
import UserLocation from '../../asset/svg/UserLocation.svg';
import Home from '../../asset/svg/Home.svg';

class Location extends Component {

  constructor(props: Props) {
    super(props);
    this.state = {
      hide: true,
      hovering: false,
      dataSize: 4
    };
  }

  hideContent () {
    this.setState ((prevState, props) => {
      return {
        hide: !prevState.hide,
        loading: prevState.hide
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
      "zIndex": this.getZIndex() + 1,
      "position": "absolute",
      top: projected[1] || 0,
      left: projected[0] || 0,
      transform: "translate(-50%, -100%)"
    }

    var contentHeight = this.state.dataSize * 19;

    return (
      <div className="mapboxgl-popup mapboxgl-popup-anchor-bottom" style={defaultContainerStyle} onMouseEnter={this.handleMouseEnter.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)} onClick={this.hideContent.bind(this)}>
        <div key="tip" className="mapboxgl-popup-tip" />
        <div key="content" className="mapboxgl-popup-content">
          {this.state.hide || <a className="close-button">×</a>}
          <img className="map-icon-main" src={this.props.failToGetLocation ? "https://s3.ap-southeast-1.amazonaws.com/bt3103-nus-mobility-web-app/static/media/Home.bbacb71d.svg" : "https://s3.ap-southeast-1.amazonaws.com/bt3103-nus-mobility-web-app/static/media/UserLocation.87da16db.svg"} alt='' />
          {this.props.zoom >= 15.5 && <p>{this.props.failToGetLocation ? "Central, NUS" : "You're here"}</p>}
          {this.state.hide ? <div className="transport-info hide"/> :
            <div className="transport-info active" style={{height: contentHeight}}>
              <hr />
              <div className="wrapped-data">
                <div className="data-index">
                  <p className="header">Traffic Type</p>
                </div>
                <div className="data-value">
                  <p className="header">Number</p>
                </div>
              </div>
              <div className="wrapped-data">
                <div className="data-index">
                  <p className="index">Bike</p>
                </div>
                <div className="data-value">
                  <p className="value">{this.props.bikeData.length}</p>
                </div>
              </div>
              <div className="wrapped-data">
                <div className="data-index">
                  <p className="index">Bus Station</p>
                </div>
                <div className="data-value">
                  <p className="value">{this.props.busData.length}</p>
                </div>
              </div>
              <div className="wrapped-data">
                <div className="data-index">
                  <p className="index">Taxi</p>
                </div>
                <div className="data-value">
                  <p className="value">{this.props.taxiData.length}</p>
                </div>
              </div>
            </div>}
        </div>
        <div className="current-location">
          <div className="location-pin" />
        </div>
      </div>
    );
  }
}

export default Location;
