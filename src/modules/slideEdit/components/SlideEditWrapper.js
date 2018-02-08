import React, { Component } from 'react';
import {AppBar, Paper} from 'material-ui';
import {db} from '../../../firebase';
import { OTSession, OTPublisher, OTStreams, OTSubscriber,createSession } from 'opentok-react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {ToolContainer} from '../../tools';
import {MainDisplayContainer} from '../../display';
import CanvasBlock from './CanvasBlock';
import SelectActiveUsers from './SelectActiveUsers';
import CamView from './CamView';



class SlideEditWrapper extends Component {
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
	
	render() {
		return (
			<DragDropContextProvider backend={HTML5Backend}>
			<div style={{width: '100vw', display: 'flex'}}>

					<Paper style={{flex: 1, margin: '10px'}} zDepth={1}>
						<CanvasBlock {...this.props} />
					</Paper>
				 {/* thumbnail area */}


				<div style={{width: '350px'}}>
					{	this.props.panel ? (
						<Paper style={{margin: "10px"}} zDepth={1}>
				 		 	{/* <SelectActiveUsers lessonId={this.props.lesson.id} toggleActiveStudent={this.props.toggleActiveStudent} users={this.props.users}/> */}
				 			<CamView session={this.sessionHelper} {...this.props}/>
			 		 </Paper>
					)
					: (
						<div>
		 				 <Paper style={{margin: '10px'}} zDepth={1}>
		 	 			 	<div className="flex-container-column">
		 	 					<ToolContainer />
		 	 				</div>
		 	 			</Paper>
		 				<Paper style={{margin: '10px'}} zDepth={1}>
		 					<MainDisplayContainer />
		 				</Paper>
		 			</div>
					)
					}

				</div>
			</div>
			</DragDropContextProvider>
		);
	}

}


export default SlideEditWrapper;
