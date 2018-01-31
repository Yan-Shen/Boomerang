import React from 'react';
import {AppBar, Paper} from 'material-ui';
import {db} from '../../../firebase'


import {ToolContainer} from '../../tools'
import {MainDisplayContainer} from '../../display'
import CanvasBlock from './CanvasBlock'

const SlideEditWrapper = (props) => (
	<div style={{width: '100vw',display: 'flex'}}>

			<Paper style={{flex: 1, margin: "10px"}} zDepth={1}>
				<CanvasBlock {...props}/>
			</Paper>
		 {/* thumbnail area */}


		<div style={{width: '350px'}}>
		 {/* Toolbox area */}
			<Paper style={{margin: "10px"}} zDepth={1}>
			<div className="flex-container-column">
				<ToolContainer />
				</div>
			</Paper>

			 {/* Display area */}
			<Paper style={{margin: "10px"}} zDepth={1}>
				< MainDisplayContainer />
			</Paper>

		</div>

	</div>
);

export default SlideEditWrapper;
