import React, { Component } from 'react';
import {db} from '../../../firebase'
import _ from 'lodash'
import {Paper} from 'material-ui';
import StudentDisplay from './StudentDisplay'
import EmotionContainer from '../containers/EmotionContainer'

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
		console.log("------------->",this.props)
		const {id} = this.props.currentSlide
		const {replSolution} = this.props
		return (
			<div style={{background: "#ccc",padding: "15px", display: 'flex'}}>
				<div ref={block => this.block = block} style={{marginRight: "30px", flex: 4}}>
					<Paper>
							<canvas id='studentCanvas' width="900" height="550" style={{borderRadius: "4px"}}/>
							{this.props.emotions.map(emotion => <div style={{zIndex: 9000, position: "absolute", right: "400px"}}>testy</div>)}
					</Paper>

				</div>
				<div style={{width: '350px', height: 'calc(100vh - 90px)'}}>
					<Paper style={{width: '350px', height: 'calc(100vh - 190px)'}}>
						<StudentDisplay value={replSolution}/>
					</Paper>
					<EmotionContainer/>
				</div>
			</div>
		);
	}
}

export default LessonWrapper;
