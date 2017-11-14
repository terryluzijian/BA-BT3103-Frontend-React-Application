import React, { Component } from 'react';

class Popup extends Component {
  render() {
    return (
      <div>{this.props.lat} + {this.props.lon}</div>
    );
  }
}

export default Popup;
