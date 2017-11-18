import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl'

import dotenv from 'dotenv';
import $ from "jquery";

import Location from './location';
import Taxi from './taxi';
import Bike from './bike';
import Bus from './bus';
import Train from './train';

import {FlatMercatorViewport} from 'viewport-mercator-project';

dotenv.config();
mapboxgl.accessToken = process.env.REACT_APP_MapboxAccessToken;

const defaultMapState = {
  centerLon: 103.776587,
  centerLat: 1.296644,
  zoom: 16.5
}

const defaultBound = [
  [103.766871, 1.287695],
  [103.787345, 1.310327]
]

const defaultButtonStyle = {
  "float": "right",
  "position": "absolute",
  "zIndex": 99
}

class Map extends Component {

  constructor(props: Props) {
    super(props);
    this.state = {
      centerLon: defaultMapState.centerLon,
      centerLat: defaultMapState.centerLat,
      zoom: defaultMapState.zoom,
      width: 0,
      height: 0,
      viewport: FlatMercatorViewport(),
      userLon: -1,
      userLat: -1,
      failToGetLocation: false,

      // Transport data
      taxiData: [],
      taxiSearchDisatance: 0,
      bikeData: [],
      bikeSearchDistance: 0,
      busData: [],
      busSearchDistance: 0,
    };
  }

  // Event handling

  handleResize(e) {
    const newWidth = document.getElementsByClassName("map-container")[0] != null ? document.getElementsByClassName("map-container")[0].offsetWidth : 650;
    const newHeight = document.getElementsByClassName("map-container")[0] != null ? document.getElementsByClassName("map-container")[0].offsetHeight : 650;
    this.setState({
      width: newWidth,
      height: newHeight,
      viewport: FlatMercatorViewport({
        longitude: this.state.centerLon,
        latitude: this.state.centerLat,
        zoom: this.state.zoom,
        width: newWidth,
        height: newHeight
      })
    });
  }

  handleUserLocation(e) {
    navigator.geolocation.getCurrentPosition((position) => {
      if (this.checkUserLocation(position.coords.latitude, position.coords.longitude)) {
        this.setState({
          userLat: position.coords.latitude,
          userLon: position.coords.longitude,
          failToGetLocation: false
        });
        this.map.flyTo({
          center: [this.state.userLon, this.state.userLat],
          zoom: 17
        });
      }
      else {
        this.setState({
          userLat: defaultMapState.centerLat,
          userLon: defaultMapState.centerLon,
          failToGetLocation: true
        });
        this.map.flyTo({
          center: [defaultMapState.centerLon, defaultMapState.centerLat],
          zoom: 17
        });
      };
    });

    // Load from server
    // this.loadTaxiData();
    // this.loadBikeData();
    // this.loadBusData();
  }

  checkUserLocation(userLat, userLon) {
    if ((userLat > defaultBound[0][1]) && (userLat < defaultBound[1][1]) && (userLon > defaultBound[0][0]) && (userLon < defaultBound[1][0])) {
      return true;
    }
    else return false;
  }

  // Lifecycle

  componentDidMount() {

    // Initiate new map
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/light-v9',
      maxZoom: 19,
      center: [this.state.centerLon, this.state.centerLat],
      maxBounds: defaultBound,
      zoom: this.state.zoom
    });

    // Get current location information
    this.handleUserLocation = this.handleUserLocation.bind(this);
    this.handleUserLocation();

    var navControl = new mapboxgl.NavigationControl();
    this.map.addControl(navControl, 'bottom-right');
    this.map.dragRotate.disable();
    this.map.touchZoomRotate.disableRotation();

    // Update viewport
    const currentWidth = document.getElementsByClassName("map-container")[0].offsetWidth;
    const currentHeight = document.getElementsByClassName("map-container")[0].offsetHeight;
    this.setState({
      width: currentWidth,
      height: currentHeight,
      viewport: FlatMercatorViewport({
        longitude: this.state.centerLon,
        latitude: this.state.centerLat,
        zoom: this.state.zoom,
        width: currentWidth,
        height: currentHeight
      })
    });

    // Handle moving
    this.map.on('move', () => {
      const { lng, lat } = this.map.getCenter();
      this.setState({
        centerLon: lng.toFixed(6),
        centerLat: lat.toFixed(6),
        zoom: this.map.getZoom().toFixed(2),
        viewport: FlatMercatorViewport({
          longitude: lng.toFixed(7),
          latitude: lat.toFixed(7),
          zoom: this.map.getZoom().toFixed(3),
          width: this.state.width,
          height: this.state.height
        })
      });
    });

    // Handle window resizing
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  componentWillUnmount() {
    this.map.remove();
  }

  // AJAX

  loadTaxiData() {
    navigator.geolocation.getCurrentPosition((position) => {
      $.ajax({
        url: "https://carvpx8wn6.execute-api.ap-southeast-1.amazonaws.com/v1/get-all-taxi",
        type: "get",
        data: {
          lat: (this.checkUserLocation(position.coords.latitude, position.coords.longitude)) ?  position.coords.latitude : defaultMapState.centerLat,
          lon: (this.checkUserLocation(position.coords.latitude, position.coords.longitude)) ? position.coords.longitude : defaultMapState.centerLon
        },
        dataType: 'json',
        cache: false,
        success: function(data) {
          this.setState({
            taxiData: data.taxi.results == null ? [] : data.taxi.results,
            taxiSearchDisatance: data.taxi.search_distance == null ? 0 : data.taxi.search_distance
          });
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(status, err.toString());
        }
      });
    });
  }

  loadBusData() {
    navigator.geolocation.getCurrentPosition((position) => {
      $.ajax({
        url: "https://carvpx8wn6.execute-api.ap-southeast-1.amazonaws.com/v1/get-all-buses",
        type: "get",
        data: {
          lat: (this.checkUserLocation(position.coords.latitude, position.coords.longitude)) ?  position.coords.latitude : defaultMapState.centerLat,
          lon: (this.checkUserLocation(position.coords.latitude, position.coords.longitude)) ? position.coords.longitude : defaultMapState.centerLon
        },
        dataType: 'json',
        cache: false,
        success: function(data) {
          this.setState({
            busData: data.bus.results == null ? [] : data.bus.results,
            busSearchDisatance: data.bus.search_distance == null ? 0 : data.bus.search_distance
          });
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(status, err.toString());
        }
      });
    });
  }

  loadBikeData() {
    navigator.geolocation.getCurrentPosition((position) => {
      $.ajax({
        url: "https://carvpx8wn6.execute-api.ap-southeast-1.amazonaws.com/v1/get-all-bikes",
        type: "get",
        data: {
          lat: (this.checkUserLocation(position.coords.latitude, position.coords.longitude)) ?  position.coords.latitude : defaultMapState.centerLat,
          lon: (this.checkUserLocation(position.coords.latitude, position.coords.longitude)) ? position.coords.longitude : defaultMapState.centerLon
        },
        dataType: 'json',
        cache: false,
        success: function(data) {
          this.setState({
            bikeData: data.bike.results == null ? [] : data.bike.results,
            bikeSearchDisatance: data.bike.search_distance == null ? 0 : data.bike.search_distance
          });
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(status, err.toString());
        }
      });
    });
  }

  // Rendering

  renderLocationPopup() {
    return (
      <Location {...this.state} lat={this.state.userLat} lon={this.state.userLon} description={"hello!"} />
    );
  }

  renderLocateButton() {
    return (
      <div className="mapboxgl-ctrl-bottom-left" style={defaultButtonStyle}>
        <div className="mapboxgl-ctrl mapboxgl-ctrl-group">
          <button className="mapboxgl-ctrl-icon mapboxgl-ctrl-geolocate" aria-label="Geolocate" onClick={this.handleUserLocation.bind(this)}></button>
        </div>
      </div>
    );
  }

  renderTaxi() {
    return (
      <div className="taxi">
      {
        this.state.taxiData.map((item, index) => (
          <Taxi viewport={this.state.viewport} {...item} zoom={this.state.zoom} key={item.code} />
        ))
      }
      </div>
    );
  }

  renderBus() {
    var item = {
      "arrival": [{"public bus": [{"183": ["4", "-"]}, {"123": ["Arr", "3"]}]}, {"shuttle bus": [{"A1": ["4", "-"]}, {"D2": ["2", "5"]}]}],
      "lat": 1.28911169277414,
      "lon": 103.77950843257454,
      "name": "The Alpha",
      "code": "16109",
      "type": "public bus",
      "brand": "Public/NUS",
      "dist": 0.19160340913707616
    }
    return (
      <div className="bus">
      {
        this.state.busData.map((item, index) => (
          <Bus viewport={this.state.viewport} {...item} zoom={this.state.zoom} key={item.code} />
        ))
      }
        <Bus viewport={this.state.viewport} zoom={this.state.zoom} key={item.code} {...item} />
      </div>
    );
  }

  renderBike() {
    return (
      <div className="bike">
      {
        this.state.bikeData.map((item, index) => (
          <Bike viewport={this.state.viewport} {...item} zoom={this.state.zoom} key={item.code} />
        ))
      }
      </div>
    );
  }

  renderTrain() {
    return (
      <div className="train">
        <Train zoom={this.state.zoom} userLat={this.state.userLat} userLon={this.state.userLon} viewport={this.state.viewport} key={"Kent Ridge MRT Station"} name={"Kent Ridge MRT Station"} lat={1.293638} lon={103.784496} />
      </div>
    )
  }

  render() {
    return (
      <div className="map-container" ref={el => this.mapContainer = el}>
        {this.renderLocationPopup()}
        {this.renderLocateButton()}
        {this.renderTaxi()}
        {this.renderBike()}
        {this.renderBus()}
        {this.renderTrain()}
      </div>
    );
  }
}

export default Map;
