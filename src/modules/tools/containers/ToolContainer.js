import React, { Component } from 'react';
import components from '../components';
// import {getToolsDispatcher} from '../../../store'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { toggleChoice,  toggleInput, toggleRepl, showChoiceDispatcher, showReplDispatcher } from '../../../store';


const {ToolBox, ToolMiniChoice, ToolMiniRepl, ToolMiniInput} = components;


const style = {
	height: '56px',
	backgroundColor: 'rgb(232, 232, 232)'
};

class Container extends Component {

	render() {
		if (!this.props.currentSlideId) return <div>loading....</div>;
		const { currentSlideId} = this.props;
		return (
					// <DragDropContextProvider backend={HTML5Backend}>
						<div>
							<div style={style}>
									<ToolMiniChoice
name="Choice Q"
									currentSlideId = {currentSlideId}
									/>
									<ToolMiniInput
name="Input Q"
									currentSlideId = {currentSlideId} />
									<ToolMiniRepl
name="Repl"
									currentSlideId = {currentSlideId} />
							</div>

							<ToolBox {...this.props} />
						</div>
					// </DragDropContextProvider>
		);
	}
}

const mapState = state => {
	const slides = state.lesson.slides;
	return {
		selectedTools: state.selectedTools,
		choiceStatus: state.toggleChoice,
		inputStatus: state.toggleInput,
		replStatus: state.toggleRepl,
		currentSlideId: slides[state.lesson.currentSlide].id,
		activeUsers: state.lesson.active,
	};
};

const mapDispath = dispatch => {
	return bindActionCreators({toggleChoice, toggleInput, toggleRepl, showChoiceDispatcher, showReplDispatcher}, dispatch);
};

export default connect(mapState, mapDispath)(Container);
