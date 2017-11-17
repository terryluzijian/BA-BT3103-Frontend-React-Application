import React, { Component } from 'react';
import Highcharts from 'highcharts';

class TaxiChart extends Component {

  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {

    var colorList = ['#006284', '#1B813E', '#E3916E', '#FAD689', '#7DB9DE', '#00896C', '#FFBA84',
                     '#36563C', '#33A6B8', '#D7C4BB', '#D05A6E', '#EBB47E'];
    const shuffled = colorList.sort(() => .5 - Math.random());

    var chart = Highcharts.chart(this.chartContainer, {
      chart: {
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
        name: 'Average',
        color: shuffled[0],
        data: [Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10, 4,
          {y: 3}]
      }]
    });
    chart.series[0].data[11].setState('hover');
  }

  render() {
    return (
      <div className="chart-container" ref={el => this.chartContainer = el}></div>
    );
  }

}

export default TaxiChart;
