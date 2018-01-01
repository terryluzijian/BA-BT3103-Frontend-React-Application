import React, { Component } from 'react';
import Highcharts from 'highcharts';

class BusChart extends Component {

  componentDidMount() {

    var colorList = ['#006284', '#1B813E', '#E3916E', '#FAD689', '#7DB9DE', '#00896C', '#FFBA84',
                     '#36563C', '#33A6B8', '#D7C4BB', '#D05A6E', '#EBB47E'];
    const shuffled = colorList.sort(() => .5 - Math.random());

    var chart = Highcharts.chart(this.chartContainer, {
      chart: {
        type: 'area',
        width: 240,
        height: 150,
        backgroundColor:null,
        marginTop: 20,
        marginButtom: 10
      },
      title: {
        text: ''
      },
      legend: {
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'top',
        floating: true,
        y: 12,
        squareSymbol: false,
        symbolWidth: 9,
        symbolHeight: 9,
        symbolRadius: 9
      },
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
      series: this.props.busType.length > 0 && (this.props.busType.length === 2 ? [
        this.props.chartData['public bus'] != null && {
          name: 'Public Bus',
          color: shuffled[0],
          data: this.props.chartData['public bus']
        },
        this.props.chartData['shuttle bus'] != null && {
          name: 'Shuttle Bus',
          color: shuffled[1],
          data: this.props.chartData['shuttle bus']
        }] :
        (this.props.busType[0] === 'shuttle bus' ? [
          this.props.chartData['shuttle bus'] != null && {
            name: 'Shuttle Bus',
            color: shuffled[0],
            data: this.props.chartData['shuttle bus']
          }] : [
          this.props.chartData['public bus'] != null && {
            name: 'Public Bus',
            color: shuffled[0],
            data: this.props.chartData['public bus']
          }]
        )
      ),
    });
    this.props.busType > 0 && chart.series[0].data[11] != null && chart.series[0].data[11].setState('hover');
    this.props.busType > 0 && chart.series[1].data[11] != null && chart.series[1].data[11].setState('hover');
  }

  render() {
    return (
      <div className="chart-wrapper">
        <div className="chart-container" ref={el => this.chartContainer = el}></div>
        <div className="chart-title"><p>Average Waiting Time (Past 12 Hours)</p></div>
      </div>
    );
  }

}

export default BusChart;
