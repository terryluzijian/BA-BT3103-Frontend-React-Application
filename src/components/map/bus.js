import React, { Component } from 'react';
import BusIcon from '../../asset/svg/Bus.svg';
import BusSchoolIcon from '../../asset/svg/Bus-School.svg';
import BusCombinedIcon from '../../asset/svg/Bus-Combined.svg';

class Bus extends Component {

  constructor(props: Props) {
    super(props);
    this.state = {
      hide: true,
      hovering: false,
      dataSize: 1
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

  componentDidMount() {
    this.props.arrival.map((item, index) => (
      Object.keys(item).map((key, index) => (
        this.setState((prevState) => {
          return {
            dataSize: prevState.dataSize + item[key].length
          }
        })
      ))
    ));
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
      <div className="mapboxgl-popup mapboxgl-popup-anchor-bottom" style={defaultContainerStyle}
        onMouseEnter={this.handleMouseEnter.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)} onClick={this.hideContent.bind(this)}>
        <div key="tip" className="mapboxgl-popup-tip" />
        <div key="content" className="mapboxgl-popup-content">
          {BusMapIcon}
          {(this.props.zoom >= 15.5 || !this.state.hide) && <p>{(this.props.dist * 1000).toFixed(0)}m</p>}
          {this.state.hide ? <div className="transport-info hide"/> : <div className="transport-info active" style={{height: 1.75 + this.state.dataSize * 19}}>
            <hr />
            <div className="wrapped-data">
              <div className="data-index">
                <p className="header">Bus Code</p>
              </div>
              <div className="data-value">
                <p className="header">Arrivals</p>
              </div>
            </div>
            {this.props.arrival.map((item, index) => (
              Object.keys(item).map((key, index) => (
                item[key].length ? item[key].map((item, index) => (
                  Object.keys(item).map((key, index) => (
                    <div className="wrapped-data" key={key}>
                      <div className="data-index">
                        <p className="index">{key}</p>
                      </div>
                      <div className="data-value">
                        <p className="value">{item[key][0] === "Arr" ? "Arrving" : item[key][0]} (Next:{item[key][1]})</p>
                      </div>
                    </div>
                  ))
                )) : <p>Out of Service</p>
              ))
            ))}
          </div>}
        </div>
      </div>
    );
  }
}

export default Bus;
