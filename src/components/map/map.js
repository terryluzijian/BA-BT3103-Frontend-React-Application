import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl'
import dotenv from 'dotenv';

dotenv.config();
mapboxgl.accessToken = process.env.REACT_APP_MapboxAccessToken;

class Map extends Component {
  
  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/light-v9',
      zoom: 16,
      center: [103.776587, 1.296644],
      maxBounds: [
          [103.766871, 1.287695],
          [103.786345, 1.310327]
      ]
    });
    var navControl = new mapboxgl.NavigationControl();
    this.map.addControl(navControl, 'bottom-right');

    var popup = new mapboxgl.Popup({closeOnClick: false, closeButton: false})
    .setLngLat([103.776587, 1.296644])
    .setHTML('<div><h3>Bus</h3><p style="padding: 5%">3min</p><div>')
    .addTo(this.map);

    var popup = new mapboxgl.Popup({closeOnClick: false, closeButton: false})
    .setLngLat([103.774587, 1.295644])
    .setHTML('<h3>Taxi</h3>')
    .addTo(this.map);
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    return (
      <div className="map-container" ref={el => this.mapContainer = el} />
    );
  }
}

export default Map;
