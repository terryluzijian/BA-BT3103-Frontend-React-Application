import React, { Component } from 'react';
import Highcharts from 'highcharts';

class BusChart extends Component {

  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {

    var chart = Highcharts.chart(this.chartContainer, {
      chart: {
        type: 'column',
        width: 240,
        height: 150,
        backgroundColor:null,
        marginTop: 20
      },
      title: {
        text: ''
      },
      legend: false,
      xAxis: {
        title: {
          text: ''
        },
        labels: {
         enabled: false
        },
        tickLength: 0,
        minorTickLength: 0
      },
      yAxis: {
        title: {
          text: ''
        },
        labels: {
         enabled: false
        }
      },
      series: [{
        name: '',
        data: [1, 3, 4, 5, 6, 5, 7, 4, 3]
      }]
    });
  }

  render() {
    return (
      <div className="chart-container" ref={el => this.chartContainer = el}></div>
    );
  }

}

export default BusChart;
