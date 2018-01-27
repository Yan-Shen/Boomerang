import React, { Component } from 'react';

class SlidePreview extends Component {
	componentDidMount(){
		this.canvas = new window.fabric.Canvas(`${this.props.data.id}`);
		this.canvas.backgroundColor="red"
		this.canvas.loadFromJSON(this.props.data, this.canvas.renderAll.bind(this.canvas));
	}
	render() {
		const {id} = this.props.data
		return (
			<canvas  id={`${id}`} width="180" height="120" />
		);
	}

}

export default SlidePreview;
