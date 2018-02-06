import React, { Component } from 'react';
import _ from 'lodash'

class Canvas extends Component {
	constructor(props) {
		super(props);
		this.updateWhiteboard = this.updateWhiteboard.bind(this)
	}
	componentWillUnmount(){
		"canvas unmounted"
		this.canvas.clear();
	}
	componentDidMount(){
		this.canvas = new window.fabric.Canvas('whiteboardCanvas');
		this.canvas.on('mouse:up', this.updateWhiteboard);
		this.canvas.freeDrawingBrush.color = '#505050';
		this.canvas.freeDrawingBrush.width = 10;
		this.canvas.setBackgroundColor(null);
		// this.canvas.setBackgroundColor(null);
		// this.canvas.loadFromJSON(this.props.whiteboardData, this.canvas.renderAll.bind(this.canvas));
		// this.canvas.renderAll()

	}
	updateWhiteboard(){
		const slideData = this.canvas.toJSON();
		this.props.updateSlide(this.props.currentSlide.id,slideData)
	}
	componentDidUpdate(prevProps){
		if(this.props.whiteboardData === null){
			this.canvas.clear()
		}
		if(prevProps.currentSlide.id !== this.props.currentSlide.id){
			this.canvas.clear()
			this.canvas.loadFromJSON(this.props.whiteboardData, this.canvas.renderAll.bind(this.canvas));
		}
		if(prevProps.width !== this.props.width){
					const width = this.props.width;
					const scale = width / 900;
					this.canvas.isDrawingMode = true
					this.canvas.setDimensions({
			        "width": this.props.width,
			        "height": this.props.height
			    })
					this.canvas.setZoom(scale);
					this.canvas.loadFromJSON(this.props.whiteboardData, this.canvas.renderAll.bind(this.canvas));
					this.canvas.isDrawingMode = true
		}
		if(!_.isEqual(this.props.whiteboardData, prevProps.whiteboardData)){
					console.log('slideData updated')
					this.canvas.loadFromJSON(this.props.whiteboardData, this.canvas.renderAll.bind(this.canvas));
			}
			if(prevProps.penWidth !== this.props.penWidth){
						this.canvas.freeDrawingBrush.width = this.props.penWidth;
					}
			if(prevProps.color !== this.props.color){
						this.canvas.freeDrawingBrush.color = this.props.color;
					}

	}
	render() {
		const {width, height} = this.props;
		console.log('whiteboardData',this.props.whiteboardData)
		return (
			<div style={{zIndex: 5000, position: 'absolute', top: 0, left: 0}}>
			 <canvas id="whiteboardCanvas"  width={this.props.width} width={this.props.height}/>
			</div>
		);
	}


}

export default Canvas;
// class Canvas extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.updateWhiteboard = this.updateWhiteboard.bind(this)
// 	}
// 	componentDidMount(){
// 		this.canvas = new window.fabric.Canvas('whiteboardCanvas');
// 		this.canvas.on('mouse:up', this.updateWhiteboard);
// 		this.canvas.freeDrawingBrush.color = '#505050';
// 		this.canvas.freeDrawingBrush.width = 10;
// 		this.canvas.setBackgroundColor(null);
// 		this.canvas.loadFromJSON(this.props.whiteboardData, this.canvas.renderAll.bind(this.canvas));
// 		this.canvas.isDrawingMode = true
// 	}
// 	updateWhiteboard(){
// 		const slideData = this.canvas.toJSON();
// 		this.props.updateSlide(this.props.currentSlide.id,slideData)
// 	}
// 	componentDidUpdate(prevProps){
// 		console.log('student whiteboard check',prevProps.whiteboardData,this.props.whiteboardData)
//
// 		if(prevProps.width !== this.props.width){
// 			"ghdfhfjgggfdjhfgjhdsgfjhsdgjhfgsdjhfgjhsdgfjhsdgfjhdgsfjhsdgfjhgsdjhfgjhdsgjhfg"
// 			const width = this.props.width;
// 			const scale = width / 900;
// 			this.canvas.isDrawingMode = true
// 			this.canvas.setDimensions({
// 	        "width": this.props.width,
// 	        "height": this.props.height
// 	    })
// 			this.canvas.setZoom(scale);
// 			this.canvas.loadFromJSON(this.props.whiteboardData, this.canvas.renderAll.bind(this.canvas));
// 			this.canvas.isDrawingMode = true
// 		}
// 		if(_.isEqual(this.props.whiteboardData !== prevProps.whiteboardData)){
// 			this.canvas.loadFromJSON(this.props.whiteboardData, this.canvas.renderAll.bind(this.canvas));
// 		}
// 		if(this.props.currentSlide !== this.props.currentSlide){
// 			this.canvas.loadFromJSON(this.props.whiteboardData, this.canvas.renderAll.bind(this.canvas));
// 		}
// 		if(this.props.whiteboard !== prevProps.whiteboard){
// 			console.log("notices change in state")
// 			this.canvas.loadFromJSON(this.props.whiteboardData, this.canvas.renderAll.bind(this.canvas));
// 		}
// 		if(prevProps.penWidth !== this.props.penWidth){
// 			this.canvas.freeDrawingBrush.width = this.props.penWidth;
// 		}
// 		if(prevProps.penWidth !== this.props.penWidth){
// 			this.canvas.freeDrawingBrush.color = this.props.color;
// 		}
//
// 	}
// 	render() {
// 		const {width, height} = this.props;
// 		return (
// 			<div style={{zIndex: 5000, position: 'absolute', top: 0, left: 0}}>
// 				fhdgsfhdgfjhfdgh
// 			 <canvas id="whiteboardCanvas"  width={this.props.width} width={this.props.height}/>
// 			</div>
// 		);
// 	}
//
//
// }
//
// export default Canvas;
