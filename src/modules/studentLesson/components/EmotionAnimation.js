import React, { Component } from 'react';
import { TimelineLite } from 'gsap';
import Happy from './Emotions/Happy'
import ThumbsUp from './Emotions/ThumbsUp'
import ThumbsDown from './Emotions/ThumbsDown'
import Content from './Emotions/Content'
import Sad from './Emotions/Sad'

const randomHeight = () => {
	return Math.floor(Math.random() * -200) - 30
}

class EmotionAnimation extends Component {
	componentDidMount(){
		let width= this.props.width || 1500
		let height = randomHeight()
		const proportion = width/10
		var tl = new TimelineLite()
			tl.to(this.elem, 0.5, {x:-proportion, y: height, opacity: 1, ease:"Linear.easeNone"})
			tl.to(this.elem, 0.5, {x:-(proportion *2), y: height+20,ease:"Linear.easeNone"})
			tl.to(this.elem, 0.5, {x:-(proportion *3), y: height,ease:"Linear.easeNone"})
			tl.to(this.elem, 0.5, {x:-(proportion *4), y: height-20,ease:"Linear.easeNone"})
			tl.to(this.elem, 0.5, {x:-(proportion *5), y: height,ease:"Linear.easeNone"})
			tl.to(this.elem, 0.5, {x:-(proportion *6), y: height+20,ease:"Linear.easeNone"})
			tl.to(this.elem, 0.5, {x:-(proportion *7), y: height,ease:"Linear.easeNone"})
			tl.to(this.elem, 0.5, {x:-(proportion *8), y: height-20,opacity: 0.6,ease:"Linear.easeNone"})
			tl.to(this.elem, 0.5, {x:-(proportion *9), y: height,opacity: 0.3, ease:"Linear.easeNone"})
			tl.to(this.elem, 0.5, {x:-(proportion *10), y: height+20,opacity: 0,ease:"Linear.easeNone"})
	}
	renderEmotion(emotion) {
	  switch(emotion) {
			case 'thumbsUp':
	      return <ThumbsUp height="30px"/>;
			case 'thumbsDown':
	      return <ThumbsDown height="30px"/>;
	    case 'happy':
	      return <Happy height="30px"/>;
			case 'sad':
	      return <Sad height="30px"/>;
			case 'content':
	      return <Content height="30px"/>;
	    default:
	      return null;
	  }
	}
	render() {
		const {emotion} = this.props

		return (
			<div ref={obj => this.elem = obj} style={{height: "10px", zIndex: 9000, opacity: 0, position: "absolute" , right: "0px", bottom: '50px'}}>
				{this.renderEmotion(emotion.type)}
			</div>

		);
	}

}

export default EmotionAnimation;
