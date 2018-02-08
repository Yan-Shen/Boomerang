import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';

const options = {
	legend: {
            display: false
         },
	maintainAspectRatio: true,
  responsive: true,
  scales: {
    yAxes: [
      {
        gridLines: {
          display: false
        },
				ticks: {
					fontSize: 14,
					fontFamily: 'Quicksand',
					min: 0,
					stepSize: 1
				},
				fontSize: 25
      }
    ],
		xAxes: [
      {
        gridLines: {
          display: false
        },
				ticks: {
					fontSize: 25,
					fontFamily: 'Quicksand'
				}
      }
    ]
  }
};

class BarChart extends Component {
	render() {
		console.log(this.props.data)
		const data = {
		  labels: this.props.data.choices,
		  datasets: [
		    {
		      label: 'My First dataset',
		      backgroundColor: '#6bada7',
		      borderColor: '#6bada7',
		      borderWidth: 1,
		      hoverBackgroundColor: '#007681',
		      hoverBorderColor: '#007681',
		      data: this.props.data.submissions
		    }
		  ]
		};
		return (
			<Bar
						data={data}
						width={900}
						height={500}
						options={options}
					/>
		);
	}

}

export default BarChart;
