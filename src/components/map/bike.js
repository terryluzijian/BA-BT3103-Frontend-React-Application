import React, { Component } from 'react';
import $ from 'jquery';
import Ofo from '../../asset/svg/Bike-Ofo.svg';
import Obike from '../../asset/svg/Bike-Obike.svg';
import Mobike from '../../asset/svg/Bike-Mobike.svg';

import BikeChart from '../chart/bikechart';

import { ClipLoader } from 'react-spinners';

class Bike extends Component {

  constructor(props: Props) {
    super(props);
    this.state = {
      hide: true,
      hovering: false,
      dataSize: 2,
      chartData: [],
      loading: true
    };
  }

  loadBikeTimeInfo() {
    if (this.props.brand !== 'Ofo') {
      $.ajax({
        url: "https://carvpx8wn6.execute-api.ap-southeast-1.amazonaws.com/v1/query-bike-activity",
        type: "get",
        data: {
          brand: this.props.brand,
          type: this.props.type,
          code: this.props.code
        },
        dataType: 'json',
        cache: false,
        success: function(data) {
          this.setState({
            chartData: data == null ? [] : data,
            loading: false,
          });
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(status, err.toString());
        }
      });
    }
  }

  hideContent () {
    this.state.hide && this.loadBikeTimeInfo();
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

  renderChart() {
    var colorList = ['#006284', '#1B813E', '#E3916E', '#FAD689', '#7DB9DE', '#00896C', '#FFBA84',
                     '#36563C', '#33A6B8', '#D7C4BB', '#D05A6E', '#EBB47E'];
    const shuffled = colorList.sort(() => .5 - Math.random());
    
    if (!this.props.ofoNumberLoadingFailure) {
      return (
        <div className="rendered-chart">
          {this.props.brand !== 'Ofo' ? (this.state.loading && <div className="loader"><ClipLoader size={20} color={shuffled[0]}/></div>) : (this.props.ofoNumberLoading && <div className="loader"><ClipLoader size={20} color={shuffled[0]}/></div>)}
          {this.props.brand !== 'Ofo' ? (!this.state.loading && <BikeChart {...this.props} {...this.state} />) : (!this.props.ofoNumberLoading && <BikeChart {...this.props} {...this.state} />)}
        </div>
      )
    }
    else {
      return (
        <p key={this.props.code}>Data Currently Unavailable</p>
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

    var contentHeight;
    if (this.props.brand === 'Ofo') {
      contentHeight = (this.props.ofoNumberLoading ? 46 : (this.state.dataSize * 19 + 150)) + 19;
    }
    else {
      contentHeight = (this.state.loading ? 46 : (this.state.dataSize * 19 + 150)) + 19;
    }

    return (
      <div className="mapboxgl-popup mapboxgl-popup-anchor-bottom" style={defaultContainerStyle}
        onMouseEnter={this.handleMouseEnter.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)} onClick={this.hideContent.bind(this)}>
        <div key="tip" className="mapboxgl-popup-tip" />
        <div key="content" className="mapboxgl-popup-content">
          {BikeIcon}
          {this.state.hide || <a className="close-button">×</a>}
          {(this.props.zoom >= 15.5 || !this.state.hide) && <p>{(this.props.dist * 1000).toFixed(0)}m</p>}
          {this.state.hide ? <div className="transport-info hide"/> : <div className="transport-info active" style={{height: contentHeight}}>
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
                <a className="value" target="_blank" rel="noopener noreferrer"
                  href={this.props.brand === 'Mobike' ? "https://mobike.com/sg/" :
                  (this.props.brand === 'Obike' ? "https://www.o.bike/" : "https://www.ofo.com/")}>
                    {this.props.brand}
                </a>
              </div>
            </div>
            {this.renderChart()}
          </div>}
        </div>
      </div>
    );
  }
}

export default Bike;
