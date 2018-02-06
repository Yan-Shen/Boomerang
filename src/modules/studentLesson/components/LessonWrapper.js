import React, { Component } from 'react';
import {db} from '../../../firebase'
import _ from 'lodash'
import {Paper} from 'material-ui';
import StudentDisplay from './StudentDisplay'
import ReplOverlay from '../../slideEdit/components/overlayComponents/ReplOverlay'
import YouTubeCurrentVideo from '../../slideEdit/components/overlayComponents/YouTubeCurrentVideo'
import EmotionAnimation from './EmotionAnimation'
import EmotionWrapper from './EmotionWrapper'
import ReplSolution from '../../display/components/input_components/ReplSolution'
import WhiteBoardCanvas from '../../whiteboard/containers/WhiteBoardCanvas'
import WhiteBoardControls from '../../whiteboard/components/WhiteBoardControls'
import { OTSession, OTPublisher, OTStreams, OTSubscriber,createSession } from 'opentok-react';

import CamView from '../../slideEdit/components/CamView'
import ReactDOM from 'react-dom'
import YouTube from 'react-youtube'


class LessonWrapper extends Component {
	constructor(props) {
		super(props);
		this.state = {
			width: null,
			height: null
		};
	}
	componentWillMount() {
		const {apiKey, sessionId, token} = this.props.currentUser
		this.sessionHelper = createSession({
			apiKey: apiKey,
			sessionId: sessionId,
			token: token,
			onStreamsUpdated: streams => { this.props.getSubscribers(this.sessionHelper, streams)}
		});
	}

	componentWillUnmount() {
		this.sessionHelper.disconnect();
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
		if (this.props.currentSlide.youtubeVideo) {
			const opts = {
				// this is where height and width will go for YT student view
				playerVars: {
					controls: 0,
					rel: 0,
					disablekb: 0,
					enablejsapi: 1,
					showinfo: 0
					// 'fs' : 0
				}
			}
			const videoId = this.props.currentSlide.youtubeVideo;
			ReactDOM.render(<YouTube videoId={videoId} opts={opts}></YouTube>, document.getElementById('video-overlay'))
		} else {
			ReactDOM.unmountComponentAtNode(document.getElementById('video-overlay'))
		}
	}
	componentDidUpdate(prevProps){
		if(this.state.height === null) this.setState({height: this.block.clientHeight, width: this.block.clientWidth})
		if(!_.isEqual(prevProps.currentSlide,this.props.currentSlide) || prevProps.currentSlideIndex === this.props.currentSlideIndex){
			this.canvas.loadFromJSON(this.props.currentSlide, this.canvas.renderAll.bind(this.canvas));
			this.canvas.renderAll();
		}
		if (this.props.currentSlide.youtubeVideo) {
			const opts = {
				// this is where height and width will go for YT student view
				playerVars: {
					controls: 0,
					rel: 0,
					disablekb: 0,
					enablejsapi: 1,
					showinfo: 0
					// 'fs' : 0
				}
			}
			const videoId = this.props.currentSlide.youtubeVideo;
			ReactDOM.render(<YouTube videoId={videoId} opts={opts} ></YouTube>, document.getElementById('video-overlay'))
		} else {
			ReactDOM.unmountComponentAtNode(document.getElementById('video-overlay'))
		}
	}
	render() {
		const {id} = this.props.currentSlide
		const {displayObject, addStudentCode, userId, activeUsers} = this.props
		const activeUser = activeUsers[0]
		const selectedUserObj = this.props.currentSlide[activeUser]

		const currentDisplayObject = displayObject.find(display=>display.id === id)
		let videoId, youtubeShow
		let replQuestion, replSolution, replShow, QA, choiceShow

		if (currentDisplayObject['YouTube'] ) {
			videoId = currentDisplayObject.YouTube.videoId
			youtubeShow = currentDisplayObject.YouTube.show
		} else {
			videoId = ''
			youtubeShow = false
		}


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
		console.log('QA lessson Wrapper======', QA)

		return (
			<div style={{background: "#ccc",padding: "15px", display: 'flex'}}>
				<div ref={block => this.block = block} style={{marginRight: "30px", flex: 4}}>
					<Paper style={{position: 'relative'}}>

							<canvas style={{background: "red"}} id='studentCanvas' width="900" height="550" style={{borderRadius: "4px"}}/>
							<div style={{zIndex: this.props.whiteboard ==='true' ? 5000 : -5000, position: 'absolute', top: 0, left: 0, width: this.block ? this.block.clientWidth : '0px', height: this.block ? this.block.clientHeight : '0px'}}>
								<WhiteBoardCanvas style={{zIndex: 20000}} width={this.state.width} height={this.state.height}/>
							</div>

							<div style={{position: 'relative'}}>
								{this.props.emotions.map((emotion, index) => (
									<EmotionAnimation id={this.props.lesson.id} key={emotion.time} emotion={emotion} width={this.state.width}/>
								))}
							</div>

							<div style={{zIndex: replShow ? 6000 : -1000,  position: 'absolute', backgroundColor: "yellow", top: 0, left: 0, width: this.block ? this.block.clientWidth : "0px", height: this.block ? this.block.clientHeight : "0px"}}>
								<ReplOverlay value={replSolution} question={replQuestion} selectedUserObj={selectedUserObj}/>
							</div>
							<div style={{zIndex: youtubeShow ? -1 : -1000,  position: 'absolute', backgroundColor: "white", top: 0, left: 0, width: this.block ? this.block.clientWidth : "0px", height: this.block ? this.block.clientHeight : "0px"}}>
								<YouTubeCurrentVideo currentSlide={this.props.currentSlide} />
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
						{/* <CamView session={this.sessionHelper} users={this.props.users} getSubscribers={this.props.getSubscribers} subscribers={this.props.subscribers} currentUser={this.props.currentUser}/> */}
						<WhiteBoardControls />
					</Paper>
					<EmotionWrapper id={this.props.lesson.id} addEmotionThunk={this.props.addEmotionThunk}/>
				</div>
			</div>
		);
	}
}

export default LessonWrapper;
