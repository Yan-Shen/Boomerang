import React, { Component } from 'react';

class Toolbar extends Component {
	handleClick(val){
		this.props.addData(val)
	}
	render() {
		return (
			<div>
				<button onClick={()=>{this.handleClick('1')}}> 1</button>
				<button onClick={()=>{this.handleClick('2')}}> 2</button>
				<button onClick={()=>{this.handleClick('3')}}> 3</button>
				<button onClick={()=>{this.handleClick('4')}}> 4</button>
			</div>
		);
	}

}

export default Toolbar;
