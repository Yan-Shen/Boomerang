import React, { Component } from 'react';
import {db} from '../../../firebase'
import _ from 'lodash'
import {Paper} from 'material-ui';
import StudentDisplay from './StudentDisplay'
import ReplOverlay from '../../slideEdit/components/overlayComponents/ReplOverlay'
import EmotionAnimation from './EmotionAnimation'
import EmotionWrapper from './EmotionWrapper'


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
		const {displayObject} = this.props
		const currentDisplayObject = displayObject.find(display=>display.id === id)
		const replQuestion = currentDisplayObject.Repl.question
		const replSolution = currentDisplayObject.Repl.solution
		const replShow = currentDisplayObject.Repl.show
		console.log('repshow is------------', replShow)

		return (
			<div style={{background: "#ccc",padding: "15px", display: 'flex'}}>
				<div ref={block => this.block = block} style={{marginRight: "30px", flex: 4}}>
					<Paper style={{position: 'relative'}}>
							{/* <canvas id='studentCanvas' width="900" height="550" style={{borderRadius: "4px", position: 'absolute', top: 0, left: 0, }}/>
							{this.props.emotions.map(emotion => <div style={{zIndex: 5000, position: "absolute", right: "400px"}}>testy</div>)} */}
						<canvas id='studentCanvas' width="900" height="550" style={{borderRadius: "4px"}}/>
							<div>
								{this.props.emotions.map((emotion, index) => (
									<EmotionAnimation id={this.props.lesson.id} key={emotion.time} emotion={emotion} width={this.block.clientWidth}/>
								))}
							</div>

							<div style={{zIndex: replShow ? 6000 : -1000,  position: 'absolute', backgroundColor: "yellow", top: 0, left: 0, width: this.block ? this.block.clientWidth : "0px", height: this.block ? this.block.clientHeight : "0px"}}>
								<ReplOverlay value={replSolution} question={replQuestion} />
							</div>

					{/* <Paper> */}

					</Paper>

				</div>
				<div style={{width: '350px', height: 'calc(100vh - 90px)'}}>
					<Paper style={{width: '350px', height: 'calc(100vh - 190px)'}}>
						<StudentDisplay currentDisplayObject={currentDisplayObject}/>
					</Paper>
					<EmotionWrapper id={this.props.lesson.id} addEmotionThunk={this.props.addEmotionThunk}/>
				</div>
			</div>
		);
	}
}

export default LessonWrapper;
