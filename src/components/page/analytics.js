import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  marginTop: 15,
};

class Analytics extends Component {

  constructor(props: Props) {
    super(props);
    this.state = {
      getTaxi: true
    };
  }

  handleClick() {
    this.setState((prevState) => ({getTaxi: !prevState.getTaxi}));
  }

  render() {
    return (

      <div className='iframe-wrapper'>
        <RaisedButton onClick={this.handleClick.bind(this)} className="toggle" label={this.state.getTaxi ? "GET TAXI" : "GET BIKE"} style={style} >{!this.state.getTaxi ? <i class="fa fa-bicycle" aria-hidden="true"></i> : <i class="fa fa-taxi" aria-hidden="true"></i>}</RaisedButton>
        {this.state.getTaxi ? <div className="wrapped-iframe-content"><iframe className="bike-data" frameborder="0" src="https://shengyu.shinyapps.io/bikeVis/" /></div> : <div className="wrapped-iframe-content"><iframe className="taxi-data" frameborder="0" src="https://shengyu.shinyapps.io/taxiVis/" /></div>}
      </div>

    );
  }
}

export default Analytics;
