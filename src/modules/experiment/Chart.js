import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';

const data = {
  labels: ['1', '2', '3', '4'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: '#6bada7',
      borderColor: '#6bada7',
      borderWidth: 1,
      hoverBackgroundColor: '#007681',
      hoverBorderColor: '#007681',
      data: [0, 0, 0, 0]
    }
  ]
};

class Chart extends Component {

	render() {
		data.datasets[0].data = this.props.data()
		console.log(data)
		return (
			<Bar
          data={data}
          width={900}
          height={500}
          options={{
            maintainAspectRatio: true
          }}
        />
		);
	}

}

export default Chart;
