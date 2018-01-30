import React, { Component } from 'react';
import {db} from '../../../firebase'
import _ from 'lodash'
import {Paper} from 'material-ui';


class LessonWrapper extends Component {
	componentDidMount(){
		const width = this.block.clientWidth
		const scale = width/900
		this.canvas = new window.fabric.StaticCanvas(`studentCanvas`);
		this.canvas.backgroundColor="white"
		this.canvas.setDimensions({
        "width": this.canvas.getWidth() * scale,
        "height": this.canvas.getHeight() * scale
    })
		this.canvas.loadFromJSON(this.props.currentSlide, this.canvas.renderAll.bind(this.canvas));
		this.canvas.setZoom(scale);
    this.canvas.renderAll();
		console.log(this.props)
	}
	componentDidUpdate(prevProps){
		if(!_.isEqual(prevProps.currentSlide,this.props.currentSlide) || prevProps.currentSlideIndex === this.props.currentSlideIndex){
			this.canvas.loadFromJSON(this.props.currentSlide, this.canvas.renderAll.bind(this.canvas));
			this.canvas.renderAll();
		}
	}
	render() {
		const {id} = this.props.currentSlide
		return (
			<div style={{padding: "15px", display: 'flex'}}>
				<div ref={block => this.block = block} style={{flex: 4}}>
					<Paper>
							<canvas id='studentCanvas' width="900" height="500" />
					</Paper>

				</div>
				<div style={{flex: 1}}>
					<Paper>
						gdfhjgdhjf
					</Paper>
				</div>
			</div>
		);
	}
}

export default LessonWrapper;
