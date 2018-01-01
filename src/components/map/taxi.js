import React, { Component } from 'react';
import TaxiIcon from '../../asset/svg/Taxi.svg';

import TaxiChart from '../chart/taxichart';

import { ClipLoader } from 'react-spinners';

class Taxi extends Component {

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

  renderChart() {
    var colorList = ['#006284', '#1B813E', '#E3916E', '#FAD689', '#7DB9DE', '#00896C', '#FFBA84',
                     '#36563C', '#33A6B8', '#D7C4BB', '#D05A6E', '#EBB47E'];
    const shuffled = colorList.sort(() => .5 - Math.random());

    if(!this.props.taxiNumberLoadingFailure) {
      return (
        <div className="rendered-chart">
          {this.props.taxiNumberLoading && <div className="loader"><ClipLoader size={20} color={shuffled[0]}/></div>}
          {!this.props.taxiNumberLoading && <TaxiChart {...this.props} {...this.state} />}
        </div>
      )
    }
    else {
      return (
        <p key={this.props.code} className="unavailable">Data Currently Unavailable</p>
      )
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

    var contentHeight = (this.props.taxiNumberLoading ? 46 : (150 + this.state.dataSize * 19)) + 19;

    return (
      <div className="mapboxgl-popup mapboxgl-popup-anchor-bottom" style={defaultContainerStyle}
        onMouseEnter={this.handleMouseEnter.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)} onClick={this.hideContent.bind(this)}>
        <div key="tip" className="mapboxgl-popup-tip" />
        <div key="content" className="mapboxgl-popup-content">
          <img className="map-icon" src="https://s3-ap-southeast-1.amazonaws.com/bt3103-nus-mobility-web-app/static/media/Taxi.99bc7018.svg" alt='' style={iconStyle} />
          {this.state.hide || <a className="close-button">×</a>}
          {(this.props.zoom >= 15.5 || !this.state.hide) && <p>{(this.props.dist * 1000).toFixed(0)}m</p>}
          {this.state.hide ? <div className="transport-info hide"/> : <div className="transport-info active" style={{height: contentHeight}}>
            <hr />
            <div className="wrapped-data">
              <div className="data-index">
                <p className="header">Taxi Type</p>
              </div>
              <div className="data-value">
                <p className="header">Book</p>
              </div>
            </div>
            <div className="wrapped-data">
              <div className="data-index">
                <p className="index">{this.props.brand}</p>
              </div>
              <div className="data-value">
                <a className="value" target="_blank" rel="noopener noreferrer" href="https://itunes.apple.com/us/app/comfortdelgro-taxi-booking/id954951647?ls=1&mt=8">App Download</a>
              </div>
            </div>
            {this.renderChart()}
          </div>}
        </div>
      </div>
    );
  }
}

export default Taxi;
