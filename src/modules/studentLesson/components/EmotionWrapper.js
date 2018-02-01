import React from 'react';
import {Paper} from 'material-ui';
import ThumbsUp from './Emotions/ThumbsUp.js'
import ThumbsDown from './Emotions/ThumbsDown.js'
import Happy from './Emotions/Happy.js'
import Content from './Emotions/Content.js'
import Sad from './Emotions/Sad.js'

const EmotionWrapper = ({addEmotionThunk}) => (
	<Paper style={{height: "60px", width: "350px", marginTop: "10px"}}>
		<div style={{paddingLeft: "15px",paddingRight: "15px", paddingTop: "10px",alignItems: 'center',display: 'flex', justifyContent: 'space-between'}}>
			<div onClick={()=>{addEmotionThunk('thumbsUp')}}>
				<ThumbsUp  style={{height: "40px"}}/>
			</div>
			<div onClick={()=>{addEmotionThunk('thumbsDown')}}>
				<ThumbsDown style={{height: "40px"}}/>
			</div>
			<div onClick={()=>{addEmotionThunk('happy')}}>
				<Happy style={{height: "40px"}}/>
			</div>
			<div onClick={()=>{addEmotionThunk('content')}}>
				<Content style={{height: "40px"}}/>
			</div>
			<div onClick={()=>{addEmotionThunk('sad')}}>
				<Sad style={{height: "40px"}}/>
			</div>
		</div>
	</Paper>
);

export default EmotionWrapper;
