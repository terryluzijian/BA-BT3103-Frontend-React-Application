import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl'
import dotenv from 'dotenv';

import Popup from './popup';

dotenv.config();
mapboxgl.accessToken = process.env.REACT_APP_MapboxAccessToken;

class Map extends Component {

  constructor(props: Props) {
    super(props);
    this.state = {
      lon: 103.776587,
      lat: 1.296644,
      zoom: 16
    };
  }

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/light-v9',
      maxZoom: 17.2,
      center: [this.state.lon, this.state.lat],
      maxBounds: [
          [103.766871, 1.287695],
          [103.786345, 1.310327]
      ],
      zoom: this.state.zoom
    });
    var navControl = new mapboxgl.NavigationControl();
    this.map.addControl(navControl, 'bottom-right');

    this.map.on('move', () => {
      const { lng, lat } = this.map.getCenter();
      this.setState({
        lon: lng.toFixed(7),
        lat: lat.toFixed(7),
        zoom: this.map.getZoom().toFixed(2)
      });
    });

  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    return (
      <div className="map-container" ref={el => this.mapContainer = el}>
        <Popup {...this.state} />
      </div>
    );
  }
}

export default Map;
