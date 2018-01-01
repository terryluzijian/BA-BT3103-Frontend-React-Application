import React, { Component } from 'react';
import $ from 'jquery';
import BusIcon from '../../asset/svg/Bus.svg';
import BusSchoolIcon from '../../asset/svg/Bus-School.svg';
import BusCombinedIcon from '../../asset/svg/Bus-Combined.svg';

import BusChart from '../chart/buschart';
import { ClipLoader } from 'react-spinners';

class Bus extends Component {

  constructor(props: Props) {
    super(props);
    this.state = {
      hide: true,
      hovering: false,
      dataSize: 1,
      busType: [],
      chartData: [],
      loading: true,
      publicNotAvailable: false
    };
  }

  loadBusTimeInfo() {
    $.ajax({
      url: "https://carvpx8wn6.execute-api.ap-southeast-1.amazonaws.com/v1/query-bus-arrival",
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

  hideContent () {
    this.state.hide && this.loadBusTimeInfo();
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

  componentDidMount() {
    this.props.arrival.map((item, index) => (
      Object.keys(item).map((key, index) => (
        this.setState((prevState) => {
          return {
            dataSize: prevState.dataSize + item[key].length,
            busType: prevState.busType.concat(key)
          }
        })
      ))
    ));
    this.props.arrival.map((item, index) => (
      Object.keys(item).map((key, index) => (
        key !== "public bus" || (item[key].length ? true : this.setState({publicNotAvailable: true}))
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

    var colorList = ['#006284', '#1B813E', '#E3916E', '#FAD689', '#7DB9DE', '#00896C', '#FFBA84',
                     '#36563C', '#33A6B8', '#D7C4BB', '#D05A6E', '#EBB47E'];
    const shuffled = colorList.sort(() => .5 - Math.random());

    var iconStyle = {
      margin: (this.props.zoom < 15.5) && "0px"
    }

    let BusMapIcon = null;
    if (this.props.brand === "Public") {
      BusMapIcon = <img className="map-icon" src="https://s3-ap-southeast-1.amazonaws.com/bt3103-nus-mobility-web-app/static/media/Bus.ec54d4ea.svg" alt='' style={iconStyle} />;
    }
    else if (this.props.brand === "Public/NUS") {
      BusMapIcon = <img className="map-icon" src="https://s3-ap-southeast-1.amazonaws.com/bt3103-nus-mobility-web-app/static/media/Bus-Combined.4c5b670d.svg" alt='' style={iconStyle}/>;
    }
    else if (this.props.brand === "NUS") {
      BusMapIcon = <img className="map-icon" src="https://s3-ap-southeast-1.amazonaws.com/bt3103-nus-mobility-web-app/static/media/Bus-School.6942dd08.svg" alt='' style={iconStyle}/>;
    }

    var contentHeight = (this.state.loading ? 46 : (150 + 19 + 14.5)) + 12.9 + 1.75 + (this.state.dataSize - 1) * 19 + (this.state.publicNotAvailable ? 19 : 0);

    return (
      <div className="mapboxgl-popup mapboxgl-popup-anchor-bottom" style={defaultContainerStyle}
        onMouseEnter={this.handleMouseEnter.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)} onClick={this.hideContent.bind(this)}>
        <div key="tip" className="mapboxgl-popup-tip" />
        <div key="content" className="mapboxgl-popup-content">
          {BusMapIcon}
          {this.state.hide || <a className="close-button">×</a>}
          {(this.props.zoom >= 15.5 || !this.state.hide) && <p>{(this.props.dist * 1000).toFixed(0)}m</p>}
          {this.state.hide ? <div className="transport-info hide"/> : <div className="transport-info active" style={{height: contentHeight}}>
            <p className="title">{this.state.busType.length > 1 ? "Public Bus/Shuttle Bus" : (this.state.busType[0] === 'public bus' ? 'Public Bus' : 'Shuttle Bus') } Station</p>
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
                key === "shuttle bus" || (item[key].length ? item[key].map((item, index) => (
                  Object.keys(item).map((key, index) => (
                    <div className="wrapped-data" key={key}>
                      <div className="data-index">
                        <p className="index">{key}{this.state.busType.length <= 1 || " (Public)"}</p>
                      </div>
                      <div className="data-value">
                        <p className="value">{item[key][0] === "Arr" ? "Arrving" : item[key][0]} (Next:{item[key][1]})</p>
                      </div>
                    </div>
                  ))
                )) : <p key={key}>No Public Bus Data</p>)
              ))
            ))}
            {this.props.arrival.map((item, index) => (
              Object.keys(item).map((key, index) => (
                key === "public bus" || (item[key].length ? item[key].map((item, index) => (
                  Object.keys(item).map((key, index) => (
                    <div className="wrapped-data" key={key}>
                      <div className="data-index">
                        <p className="index">{key}{this.state.busType.length <= 1 || " (Shuttle)"}</p>
                      </div>
                      <div className="data-value">
                        <p className="value">{item[key][0] === "Arr" ? "Arrving" : item[key][0]} (Next:{item[key][1]})</p>
                      </div>
                    </div>
                  ))
                )) : <p key={key}>No Shuttle Bus Data</p>)
              ))
            ))}
            {this.state.loading && <div className="loader"><ClipLoader size={20} color={shuffled[0]}/></div>}
            {!this.state.loading && <BusChart {...this.props} {...this.state} />}
          </div>}
        </div>
      </div>
    );
  }
}

export default Bus;
