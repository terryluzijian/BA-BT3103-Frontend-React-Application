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

class App extends Component {
  render() {
    return (
      <Router>
        <div className="main-app">

          <Route component={Header} />
          <Route exact path="/" component={Homepage} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/transport" component={Transport} />
          <Footer />

        </div>
      </Router>
    );
  }
}

export default App;
