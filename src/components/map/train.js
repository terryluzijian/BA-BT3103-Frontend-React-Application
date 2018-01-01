import React, { Component } from 'react';
import $ from 'jquery';
import TrainIcon from '../../asset/svg/Train.svg';
import geolib from 'geolib';

import { ClipLoader } from 'react-spinners';

class Train extends Component {

  constructor(props: Props) {
    super(props);
    this.state = {
      hide: true,
      hovering: false,
      dataSize: 1,
      trainData: [],
      tweetData: [],
      loading: true
    };
  }

  loadTrainData() {
    $.ajax({
      url: "https://carvpx8wn6.execute-api.ap-southeast-1.amazonaws.com/v1/get-mrt-time",
      type: "get",
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({
          trainData: data.mrt.CKRG == null ? [] : data.mrt.CKRG,
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
      }
    }).then(
    $.ajax({
      url: "https://carvpx8wn6.execute-api.ap-southeast-1.amazonaws.com/v1/get-twitter?lat=-1&lon=-1",
      type: "get",
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({
          tweetData: data.tweets.results == null ? [] : data.tweets.results,
          loading: false
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
      }
    }));
  }

  hideContent () {
    this.state.hide && this.loadTrainData();
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

  renderTrainInfo() {

    const tweetDefaultStyle = {
      'paddingTop': '5px'
    }

    return (
      <div className="wrapped-train-info">
        <div className="train-info">
          {Object.keys(this.state.trainData).map((key, index) => (
            <div className="wrapped-data" key={key}>
              <div className="data-index">
                <p className="index">{key}</p>
              </div>
              <div className="data-value">
                <p className="value">{this.state.trainData[key][0]} (Next:{this.state.trainData[key][1] == null ? '-' : this.state.trainData[key][1]})</p>
              </div>
            </div>
          ))}
        </div>
        <div className="train-info" style={tweetDefaultStyle}>
          <i className="fa fa-twitter" style={{'fontSize': 30, 'color': this.state.tweetData[0]['tag'] === 'pos' ? '#D05A6E' : '#006284'}}/>
          <div className="wrapped-data" key={'tweet'}>
            <div className="data-index">
              <p className="index">{this.state.tweetData[0]['full_text']}</p>
            </div>
          </div>
        </div>
      </div>
    )
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

    var contentHeight = (this.state.loading ? 46 : 0) + 12.9 + 1.75 + (this.state.loading ? 0 : (Object.keys(this.state.trainData).length + 1) * 19 + 140);

    return (
      <div className="mapboxgl-popup mapboxgl-popup-anchor-bottom" style={defaultContainerStyle}
        onMouseEnter={this.handleMouseEnter.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)} onClick={this.hideContent.bind(this)}>
        <div key="tip" className="mapboxgl-popup-tip" />
        <div key="content" className="mapboxgl-popup-content">
          <img className="map-icon" src="https://s3-ap-southeast-1.amazonaws.com/bt3103-nus-mobility-web-app/static/media/Train.94f7e4dc.svg" alt='' style={iconStyle}/>
          {this.state.hide || <a className="close-button">×</a>}
          {(this.props.zoom >= 15.5 || !this.state.hide) && <p>{geolib.getDistance([this.props.lat, this.props.lon], [this.props.userLat, this.props.userLon])}m</p>}
          {this.state.hide ? <div className="transport-info hide"/> : <div className="transport-info active" style={{height: contentHeight}}>
            <p className="title">{this.props.name}</p>
            <hr />
            <div className="wrapped-data">
              <div className="data-index">
                <p className="header">Direction</p>
              </div>
              <div className="data-value">
                <p className="header">Arrivals</p>
              </div>
            </div>
            {this.state.loading && <div className="loader"><ClipLoader size={20} color={shuffled[0]}/></div>}
            {!this.state.loading && this.renderTrainInfo()}
          </div>}
        </div>
      </div>
    );
  }
}

export default Train;
