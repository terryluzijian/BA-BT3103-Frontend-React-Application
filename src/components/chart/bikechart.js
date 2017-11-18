import React, { Component } from 'react';
import Highcharts from 'highcharts';

class BikeChart extends Component {

  componentDidMount() {

    var colorList = ['#006284', '#1B813E', '#E3916E', '#FAD689', '#7DB9DE', '#00896C', '#FFBA84',
                     '#36563C', '#33A6B8', '#D7C4BB', '#D05A6E', '#EBB47E'];
    const shuffled = colorList.sort(() => .5 - Math.random());

    var chart = Highcharts.chart(this.chartContainer, {
      chart: {
        type: 'column',
        width: 240,
        height: 150,
        backgroundColor:null,
        marginTop: 20,
        marginButtom: 10
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
      plotOptions: {
        series: {
          pointWidth: 13
        }
      },
      series: [{
        name: 'Activity',
        color: shuffled[0],
        data: this.props.brand === 'Ofo' ? this.props.ofoNumberData : this.props.chartData
      }]
    });
    chart.series[0].data[chart.series[0].data.length-1].setState('hover');
  }

  render() {
    return (
      <div className="chart-wrapper">
        <div className="chart-container" ref={el => this.chartContainer = el}></div>
        <div className="chart-title">{this.props.brand !== 'Ofo' ? <p>Historical Bike Usage</p> : <p>Ofo Bike Number in Campus (Past 12 Hours)</p>}</div>
      </div>
    );
  }

}

export default BikeChart;
