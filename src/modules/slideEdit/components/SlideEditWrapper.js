import React from 'react';
import {AppBar, Paper} from 'material-ui';
import {db} from '../../../firebase'


import {ToolContainer} from '../../tools'
import {DisplayContainer} from '../../display'
import CanvasBlock from './CanvasBlock'

const SlideEditWrapper = (props) => (
	<div style={{display: 'flex'}}>
		<div style={{flex: 6}}>
			<Paper style={{margin: "10px"}} zDepth={1}>
				<CanvasBlock {...props}/>
			</Paper>
		 {/* thumbnail area */}

		</div>

		<div style={{flex: 4}}>
		 {/* Toolbox area */}
			<Paper style={{margin: "10px"}} zDepth={1}>
			<div className="flex-container-column toolSectionContainer">
				<ToolContainer />
				</div>
			</Paper>

			 {/* Display area */}
			<Paper style={{margin: "10px"}} zDepth={1}>
				< DisplayContainer />
			</Paper>

		</div>

	</div>
);

export default SlideEditWrapper;
