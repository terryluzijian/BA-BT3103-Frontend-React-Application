import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl'
import dotenv from 'dotenv';

import Location from './location';

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
  [103.786345, 1.310327]
]

const defaultButtonStyle = {
  "float": "right",
  "position": "absolute",
  "zIndex": 2
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
      userLat: -1
    };
  }

  handleResize(e) {
    const newWidth = document.getElementsByClassName("map-container")[0].offsetWidth;
    const newHeight = document.getElementsByClassName("map-container")[0].offsetHeight;
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
      this.setState({
        userLat: position.coords.latitude,
        userLon: position.coords.longitude
      });
      if (this.checkUserLocation(this.state.userLat, this.state.userLon)) {
        this.map.flyTo({
          center: [this.state.userLon, this.state.userLat],
          zoom: 17.2
        });
      };
    });
  }

  checkUserLocation(userLat, userLon) {
    if (userLat > defaultBound[0][1] && userLat < defaultBound[1][1] && userLon > defaultBound[0][0] && userLat < defaultBound[1][0]) {
      return true;
    }
    else return false;
  }

  componentDidMount() {
    // Get current location information
    this.handleUserLocation = this.handleUserLocation.bind(this);
    this.handleUserLocation();
    
    // Initiate new map
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/light-v9',
      maxZoom: 17.5,
      center: [this.state.centerLon, this.state.centerLat],
      maxBounds: defaultBound,
      zoom: this.state.zoom
    });

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

  render_popup() {
    return (
      <Location {...this.state} lat={this.state.userLat} lon={this.state.userLon} description={"hello!"} />
    );
  }

  render_locate_button() {
    return (
      <div className="mapboxgl-ctrl-bottom-left" style={defaultButtonStyle}>
        <div className="mapboxgl-ctrl mapboxgl-ctrl-group">
          <button className="mapboxgl-ctrl-icon mapboxgl-ctrl-geolocate" aria-label="Geolocate" onClick={this.handleUserLocation.bind(this)}></button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="map-container" ref={el => this.mapContainer = el}>
        {this.render_popup()}
        {this.render_locate_button()}
      </div>
    );
  }
}

export default Map;
