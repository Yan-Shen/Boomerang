import React, { Component } from 'react';
import {db} from '../../../firebase'


class Lesson extends Component {
	constructor(props) {
		super(props);
		this.state = {
			slides: []
		};
	}
	componentDidMount(){
		var lessonRef = db.ref(`lessons/${this.props.match.params.id}`)
		lessonRef.on('value', snap => {
			snap.forEach((slide)=>{
				let slideValue = db.ref(`slides/${slide.key}`)
				slideValue.on('value', snap => {
					const slideData = snap.val()
					const id = slide.key
					this.setState({slides: [...this.state.slides, {...slideData, id}]})
				})
			})
		})
	}
	render() {
		console.log(this.state.slides)
		return (
			<div style={{padding: "15px"}}>
				fgdfhjdgfjhdsgjhfgdjhgfh
			</div>
		);
	}
}

export default Lesson;
