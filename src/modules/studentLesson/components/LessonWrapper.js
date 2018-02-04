import React, { Component } from 'react';
import {db} from '../../../firebase'
import _ from 'lodash'
import {Paper} from 'material-ui';
import StudentDisplay from './StudentDisplay'
import ReplOverlay from '../../slideEdit/components/overlayComponents/ReplOverlay'
import EmotionAnimation from './EmotionAnimation'
import EmotionWrapper from './EmotionWrapper'
import ReplSolution from '../../display/components/input_components/ReplSolution'
import WhiteBoardCanvas from '../../whiteboard/containers/WhiteBoardCanvas'
import WhiteBoardControls from '../../whiteboard/components/WhiteBoardControls'


class LessonWrapper extends Component {
	constructor(props) {
		super(props);
		this.state = {
			width: null,
			height: null
		};
	}
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
		if(this.state.height === null) this.setState({height: this.block.clientHeight, width: this.block.clientWidth})
		if(!_.isEqual(prevProps.currentSlide,this.props.currentSlide) || prevProps.currentSlideIndex === this.props.currentSlideIndex){
			this.canvas.loadFromJSON(this.props.currentSlide, this.canvas.renderAll.bind(this.canvas));
			this.canvas.renderAll();
		}
	}
	render() {
		const {id} = this.props.currentSlide
		const {displayObject, addStudentCode, userId, activeUsers} = this.props
		const activeUser = activeUsers[0]
		const selectedUserObj = this.props.currentSlide[activeUser]

		const currentDisplayObject = displayObject.find(display=>display.id === id)
		let replQuestion, replSolution, replShow, QA, choiceShow

		if (currentDisplayObject['Repl'] ) {
			replQuestion = currentDisplayObject['Repl']['question']
			replSolution = currentDisplayObject['Repl']['solution']
			replShow = currentDisplayObject['Repl']['show']
		} else {
			replQuestion = ''
			replSolution = ''
			replShow = false
		}

		if(currentDisplayObject['Choice']&&currentDisplayObject['Choice']['QA']) {
			QA = currentDisplayObject['Choice']['QA']
			choiceShow = currentDisplayObject['Choice']['show']
		} else {
			QA={}
			choiceShow = false
		}

		console.log('currentDisplayObject, QA  -----------', currentDisplayObject, QA )

		return (
			<div style={{background: "#ccc",padding: "15px", display: 'flex'}}>
				<div ref={block => this.block = block} style={{marginRight: "30px", flex: 4}}>
					<Paper style={{position: 'relative'}}>
							<canvas style={{background: "red"}} id='studentCanvas' width="900" height="550" style={{borderRadius: "4px"}}/>
							<WhiteBoardCanvas width={this.state.width} height={this.state.height}/>

							<div>
								{this.props.emotions.map((emotion, index) => (
									<EmotionAnimation id={this.props.lesson.id} key={emotion.time} emotion={emotion} width={this.state.width}/>
								))}
							</div>

							<div style={{zIndex: replShow ? 6000 : -1000,  position: 'absolute', backgroundColor: "yellow", top: 0, left: 0, width: this.block ? this.block.clientWidth : "0px", height: this.block ? this.block.clientHeight : "0px"}}>
								<ReplOverlay value={replSolution} question={replQuestion} selectedUserObj={selectedUserObj}/>
							</div>

					{/* <Paper> */}

					</Paper>

				</div>
				<div style={{width: '350px', height: 'calc(100vh - 90px)'}}>
					<Paper style={{width: '350px', height: 'calc(100vh - 190px)'}}>
						<StudentDisplay
						replShow={replShow}
						choiceShow = {choiceShow}
						addStudentCode={addStudentCode}
						slideId ={id}
						activeUser = {activeUser}
						QA={QA}
						userId={userId}/>
						{/* <StudentDisplay value={replSolution}/> */}
						<WhiteBoardControls />
					</Paper>
					<EmotionWrapper id={this.props.lesson.id} addEmotionThunk={this.props.addEmotionThunk}/>
				</div>
			</div>
		);
	}
}

export default LessonWrapper;
