import React, { Component } from 'react';
import {Paper} from 'material-ui';
import _ from 'lodash';
import StudentDisplay from './StudentDisplay';
import ReplOverlay from '../../slideEdit/components/overlayComponents/ReplOverlay';
import YouTubeVideo from './YouTubeVideo';
import EmotionAnimation from './EmotionAnimation';
import EmotionWrapper from './EmotionWrapper';
import WhiteBoardCanvas from '../../whiteboard/containers/WhiteBoardCanvas';
import WhiteBoardControls from '../../whiteboard/components/WhiteBoardControls';
import {createSession } from 'opentok-react';
import StudentCamView from './StudentCamView';


class LessonWrapper extends Component {
	constructor(props) {
		super(props);
		this.state = {
			width: null,
			height: null,
			YTPlayer: ''
		};
		this.onReady = this.onReady.bind(this);
	}

	componentWillUnmount() {
		this.sessionHelper.disconnect();
	}
	componentWillMount() {
		const {apiKey, sessionId, token} = this.props.currentUser;
		this.sessionHelper = createSession({
			apiKey: apiKey,
			sessionId: sessionId,
			token: token,
			onStreamsUpdated: streams => { this.props.getSubscribers(this.sessionHelper, streams);}
		});
	}


	componentDidMount(){
		const width = this.block.clientWidth;
		const scale = width / 900;
		this.canvas = new window.fabric.StaticCanvas(`studentCanvas`);
		this.canvas.backgroundColor = 'white';
		this.canvas.setDimensions({
        width: this.canvas.getWidth() * scale,
        height: this.canvas.getHeight() * scale
    });
		this.canvas.loadFromJSON(this.props.currentSlide, this.canvas.renderAll.bind(this.canvas));
		this.canvas.setZoom(scale);
		this.canvas.renderAll();

	}

	componentDidUpdate(prevProps){
		if (this.state.height === null) this.setState({height: this.block.clientHeight, width: this.block.clientWidth});
		if (!_.isEqual(prevProps.currentSlide, this.props.currentSlide) || prevProps.currentSlideIndex === this.props.currentSlideIndex){
			this.canvas.loadFromJSON(this.props.currentSlide, this.canvas.renderAll.bind(this.canvas));
			this.canvas.renderAll();
		}
	}

	onReady(event) {
		this.setState({YTPlayer: event.target});
	}

	render() {
		//YOUTUBE LOGIC!!!!!!!!
		let youtubeShow;
		let replQuestion, replSolution, replShow, QA, choiceShow;


		if (this.props.currentSlide.youtubeVideo){
			youtubeShow = true;
		}
		const {id} = this.props.currentSlide;
		const {displayObject, addStudentCode, userId, activeUsers} = this.props;
		const activeUser = activeUsers[0];
		const selectedUserObj = this.props.currentSlide[activeUser];

		const currentDisplayObject = displayObject.find(display => display.id === id);
		const showChoiceLayer = currentDisplayObject.Choice.show;


		if (currentDisplayObject.Repl ) {
			replQuestion = currentDisplayObject.Repl.question;
			replSolution = currentDisplayObject.Repl.solution;
			replShow = currentDisplayObject.Repl.show;
		} else {
			replQuestion = '';
			replSolution = '';
			replShow = false;
		}

		if (currentDisplayObject.Choice && currentDisplayObject.Choice.QA) {
			QA = currentDisplayObject.Choice.QA;
			choiceShow = currentDisplayObject.Choice.show;
		} else {
			QA = {};
			choiceShow = false;
		}
		console.log('gfdhjfghjdgfhdsgjfhgsdjhgfhsdjhf', currentDisplayObject, choiceShow);
		return (
			<div style={{background: '#ccc', padding: '15px', display: 'flex'}}>
				<div ref={block => this.block = block} style={{marginRight: '15px', flex: 4}}>
					<Paper style={{position: 'relative'}}>

							<canvas style={{background: 'red', borderRadius: '4px'}} id="studentCanvas" width="900" height="550" />
							<div style={{zIndex: this.props.whiteboard === 'true' ? 5000 : -5000, position: 'absolute', top: 0, left: 0, width: this.block ? this.block.clientWidth : '0px', height: this.block ? this.block.clientHeight : '0px'}}>
								<WhiteBoardCanvas style={{zIndex: 20000}} width={this.state.width} height={this.state.height} />
							</div>

							<div style={{position: 'relative'}}>
								{this.props.emotions.map((emotion, index) => (
									<EmotionAnimation id={this.props.lesson.id} key={emotion.time} emotion={emotion} width={this.state.width} />
								))}
							</div>

							<div style={{zIndex: replShow || showChoiceLayer ? 6000 : -1000,  position: 'absolute', backgroundColor: 'yellow', top: 0, left: 0, width: this.block ? this.block.clientWidth : '0px', height: this.block ? this.block.clientHeight : '0px'}}>
								<ReplOverlay value={replSolution} question={replQuestion} selectedUserObj={selectedUserObj} choiceShow={showChoiceLayer}/>
							</div>
							{youtubeShow && <div style={{zIndex: 7000,  position: 'absolute', backgroundColor: 'white', top: 0, left: 0, width: this.block ? this.block.clientWidth : '0px', height: this.block ? this.block.clientHeight : '0px'}}>
								<YouTubeVideo currentSlide={this.props.currentSlide} />
							</div>}
					</Paper>

				</div>
				<div style={{width: '470px'}}>
					{	this.props.panel ? (
						<Paper zDepth={1} style={{height: 'calc(100vh - 120px)'}}>
				 		 	{/* <SelectActiveUsers lessonId={this.props.lesson.id} toggleActiveStudent={this.props.toggleActiveStudent} users={this.props.users}/> */}
				 			<StudentCamView session={this.sessionHelper} users={this.props.users} getSubscribers={this.props.getSubscribers} subscribers={this.props.subscribers} currentUser={this.props.currentUser} />
			 		 </Paper>
					)
					: (
						<div style={{marginTop: '-10px'}}>
							<WhiteBoardControls />
							<Paper style={{height: 'calc(100vh - 430px)', marginTop: '10px', padding: '15px'}} zDepth={1}>
							<div style={{margin: '15px', fontSize: '18px',display: "flex", justifyContent: "flex-start", margin: '10px', fontWeight: 800, color: '#6bada7'}}>
		 						Interactive Panel
		 					</div>
							<StudentDisplay
	 						replShow={replShow}
	 						choiceShow = {choiceShow}
	 						addStudentCode={addStudentCode}
	 						slideId ={id}
	 						activeUser = {activeUser}
	 						QA={QA}
	 						userId={userId} />

		 				</Paper>
						<EmotionWrapper id={this.props.lesson.id} addEmotionThunk={this.props.addEmotionThunk} />
		 			</div>
					)
					}

				</div>
				{/* <div style={{width: '350px', height: 'calc(100vh - 90px)'}}>
					<Paper style={{width: '350px', height: 'calc(100vh - 190px)'}}>
						<StudentDisplay
						replShow={replShow}
						choiceShow = {choiceShow}
						addStudentCode={addStudentCode}
						slideId ={id}
						activeUser = {activeUser}
						QA={QA}
						userId={userId} />
						<StudentDisplay value={replSolution}/>
						<StudentCamView session={this.sessionHelper} users={this.props.users} getSubscribers={this.props.getSubscribers} subscribers={this.props.subscribers} currentUser={this.props.currentUser} />
						<WhiteBoardControls />
					</Paper>
					<EmotionWrapper id={this.props.lesson.id} addEmotionThunk={this.props.addEmotionThunk} />
				</div> */}
			</div>
		);
	}
}

export default LessonWrapper;
