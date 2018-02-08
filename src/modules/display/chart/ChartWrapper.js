import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import BarChart from './BarChart'


class Chart extends Component {

	render() {
		return (
			<div>
				<Carousel width="1200px">
					{this.props.data.map((chart,index) => (
						<div style={{padding: "30px", display: 'flex', flexDirection: 'column', height: '760px', background: 'white'}}>
							<div style={{fontSize: "25px", marginBottom: "15px"}}>{chart.question}</div>
							<BarChart key={index} data={chart}/>
						</div>
					))
					}

				</Carousel>
			</div>

		)

		// 	<Bar
    //       data={data}
    //       width={900}
    //       height={500}
    //       options={{
    //         maintainAspectRatio: true
    //       }}
    //     />
	}

}

export default Chart;
