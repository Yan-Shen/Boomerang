import React, { Component } from 'react';
import {db} from '../../../firebase'
import _ from 'lodash'


class LessonWrapper extends Component {
	componentDidMount(){
		this.canvas = new window.fabric.Canvas(`studentCanvas`);
		this.canvas.backgroundColor="white"
		// this.canvas.setDimensions({
    //     "width": this.canvas.getWidth() * scale,
    //     "height": this.canvas.getHeight() * scale
    // })
		this.canvas.loadFromJSON(this.props.currentSlide, this.canvas.renderAll.bind(this.canvas));
		// this.canvas.setZoom(scale);
    this.canvas.renderAll();
		console.log(this.props)
	}
	componentDidUpdate(prevProps){
		console.log(this.props.currentSlideIndex)
		if(!_.isEqual(prevProps.currentSlide,this.props.currentSlide) || prevProps.currentSlideIndex === this.props.currentSlideIndex){
			console.log("gfhdgdhjg")
			this.canvas.loadFromJSON(this.props.currentSlide, this.canvas.renderAll.bind(this.canvas));
			this.canvas.renderAll();
		}
	}
	render() {
		const {id} = this.props.currentSlide
		return (
			<div style={{padding: "15px"}}>
				<canvas   id='studentCanvas' width="1100" height="700" />
			</div>
		);
	}
}

export default LessonWrapper;
