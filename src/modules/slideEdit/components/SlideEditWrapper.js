import React from 'react';
import {AppBar, Paper} from 'material-ui';
import {db} from '../../../firebase';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {ToolContainer} from '../../tools';
import {MainDisplayContainer} from '../../display';
import CanvasBlock from './CanvasBlock';
import SelectActiveUsers from './SelectActiveUsers';
import CamView from './CamView';


const SlideEditWrapper = (props) => (
	<DragDropContextProvider backend={HTML5Backend}>
	<div style={{width: '100vw', display: 'flex'}}>

			<Paper style={{flex: 1, margin: '10px'}} zDepth={1}>
				<CanvasBlock {...props} />
			</Paper>
		 {/* thumbnail area */}


		<div style={{width: '350px'}}>
			{	props.panel ? (
				<Paper style={{margin: "10px"}} zDepth={1}>
		 		 	<SelectActiveUsers lessonId={props.lesson.id} toggleActiveStudent={props.toggleActiveStudent} users={props.users}/>
		 			<CamView users={props.users} getSubscribers={props.getSubscribers} subscribers={props.subscribers} currentUser={props.currentUser}/>
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

export default SlideEditWrapper;
