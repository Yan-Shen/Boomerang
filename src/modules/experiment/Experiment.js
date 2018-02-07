import React, { Component } from 'react';
import { Card } from 'material-ui';
import Toolbar from './Toolbar'
import Chart from './Chart'


class Experiment extends Component {
	constructor(props) {
		super(props);
		this.handleData = this.handleData.bind(this)
		this.dataLogic = this.dataLogic.bind(this)
		this.state = {
			data: {
				"1": 0,
				"2": 0,
				"3": 0,
				"4": 0
			}
		};
	}
	handleData(type){
		var data = {...this.state.data}
		data[type] +=1;
		this.setState({data})
	}
	dataLogic(){
		var result = []
		for (var key in this.state.data) {
			result.push(this.state.data[key])
		}
		console.log(result)
		return result
	}
	render() {
		console.log(this.dataLogic())
		return (
			<div style={{display: 'flex'}}>
				<div style={{flex: 3}}>
					<Card style={{marginLeft: "15px", marginTop: "15px", width: "98%", height: "calc(100vh - 80px)"}}>
						<Chart data={()=>this.dataLogic(this.state.data)}/>
					</Card>
				</div>
				<div style={{flex: 1}}>
					<Card style={{margin: '15px', width: "98%", height: "calc(100vh - 80px)"}}>
						<Toolbar addData={this.handleData}/>
					</Card>
				</div>
			</div>
		);
	}
}

export default Experiment;
