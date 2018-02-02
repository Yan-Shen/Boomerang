import React from 'react';
import {Paper} from 'material-ui';
import ThumbsUp from './Emotions/ThumbsUp.js'
import ThumbsDown from './Emotions/ThumbsDown.js'
import Happy from './Emotions/Happy.js'
import Content from './Emotions/Content.js'
import Sad from './Emotions/Sad.js'

const EmotionWrapper = ({addEmotionThunk, id}) => (
	<Paper style={{height: "60px", width: "350px", marginTop: "10px"}}>
		<div style={{paddingLeft: "15px",paddingRight: "15px", paddingTop: "10px",alignItems: 'center',display: 'flex', justifyContent: 'space-between'}}>
			<div onClick={()=>{addEmotionThunk('thumbsUp', id)}}>
				<ThumbsUp  height="40px"/>
			</div>
			<div onClick={()=>{addEmotionThunk('thumbsDown',id)}}>
				<ThumbsDown height="40px"/>
			</div>
			<div onClick={()=>{addEmotionThunk('happy',id)}}>
				<Happy height="40px"/>
			</div>
			<div onClick={()=>{addEmotionThunk('content',id)}}>
				<Content height="40px"/>
			</div>
			<div onClick={()=>{addEmotionThunk('sad',id)}}>
				<Sad height="40px"/>
			</div>
		</div>
	</Paper>
);

export default EmotionWrapper;
