import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl'
import dotenv from 'dotenv';

dotenv.config();
mapboxgl.accessToken = process.env.REACT_APP_MapboxAccessToken;

class Map extends Component {
  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      zoom: 16,
      center: [103.776587, 1.296644],
      maxBounds: [
          [103.766871, 1.287695],
          [103.786345, 1.310327]
      ]
    });
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    const style = {
      top: 0,
      bottom: 0,
      width: '100%',
      height: '800px'
    };
    return <div style={style} ref={el => this.mapContainer = el} />;
  }
}

export default Map;
