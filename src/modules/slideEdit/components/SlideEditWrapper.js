import React from 'react';
import {AppBar, Paper} from 'material-ui';
import {db} from '../../../firebase'


import {ToolContainer} from '../../tools'
import {QAContainer} from '../../display'
import CanvasBlock from './CanvasBlock'

const SlideEditWrapper = ({addSlide,slides,deleteSlide,changeSlide}) => (
	<div style={{display: 'flex'}}>
		<div style={{flex: 7.5}}>
			<button onClick={addSlide}>test</button>
			<Paper style={{margin: "10px"}} zDepth={1}>
				<CanvasBlock addSlide={addSlide} changeSlide={changeSlide} deleteSlide={deleteSlide} slides={slides}/>
			</Paper>
		 {/* thumbnail area */}
			<Paper style={{margin: "10px"}} zDepth={1}>
				<div style={{display: 'flex',height: "140px",flexDirection: 'column'}}>
					 {slides.map(slide => <div style={{margin: '10px', border: '1px solid #ccc'}} key={slide.id}>Slide: {slide.id}</div>)}
				</div>
			</Paper>
		</div>

		<div style={{flex: 2}}>
		 {/* Toolbox area */}
			<Paper style={{margin: "10px"}} zDepth={1}>
			<div className="flex-container-column toolSectionContainer">
				<ToolContainer />
				</div>
			</Paper>

			 {/* Display area */}
			<Paper style={{margin: "10px"}} zDepth={1}>
				< QAContainer />
			</Paper>
		</div>

	</div>
);

export default SlideEditWrapper;
