import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Header from './components/header/header';
import Footer from './components/footer/footer';

import Homepage from './components/page/homepage';
import Signin from './components/page/signin';
import Transport from './components/page/transport';

import './asset/css/mapbox.min.css';
import './asset/css/default.min.css';

import Highcharts from 'highcharts';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

var colorList = ['#006284', '#1B813E', '#E3916E', '#FAD689', '#7DB9DE', '#00896C', '#FFBA84'];
const shuffled = colorList.sort(() => .5 - Math.random());
Highcharts.theme = {
  colors: shuffled
};
Highcharts.setOptions(Highcharts.theme);

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Router>
          <div className="main-app">

            <Route component={Header} />
            <Route exact path="/" component={Homepage} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/transport" component={Transport} />
            <Footer />

          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
