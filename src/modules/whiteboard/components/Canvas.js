import React, { Component } from 'react';


class Canvas extends Component {
	// componentDidMount(){
	// 	this.canvas = new window.fabric.Canvas('whiteboardCanvas');
	// 	this.canvas.width = this.props.width
	// 	this.canvas.height = this.props.height
	// 	this.canvas.isDrawingMode = true
	// }
	componentDidUpdate(prevProps){
		if(prevProps.height === null){
			this.canvas = new window.fabric.Canvas('whiteboardCanvas');
			this.canvas.isDrawingMode = true
			this.canvas.setDimensions({
	        "width": this.props.width,
	        "height": this.props.height
	    })
			this.canvas.isDrawingMode = true
			this.canvas.freeDrawingBrush.color = 'red';
      this.canvas.freeDrawingBrush.width = 10;
		}
		if(prevProps.penWidth !== this.props.penWidth){
			this.canvas.freeDrawingBrush.width = this.props.penWidth;
		}
		if(prevProps.penWidth !== this.props.penWidth){
			this.canvas.freeDrawingBrush.color = this.props.color;
		}
	}
	render() {
		const {width, height} = this.props;
		return (
			<div style={{position: 'absolute', top: 0, left: 0}}>
			 <canvas id="whiteboardCanvas"  width={this.props.width} width={this.props.height}/>
			</div>
		);
	}


}

export default Canvas;
