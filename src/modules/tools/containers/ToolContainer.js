import React, { Component } from 'react'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import components from '../components'
// import {getToolsDispatcher} from '../../../store'
import {connect} from 'react-redux'
import { toggleChoice } from '../reducers/ToggleChoice';
import {toggleInput} from '../reducers/ToggleInput'

const {ToolBox, ToolMiniChoice, ToolMiniRepl, ToolMiniInput} = components



const style = {
	height: "56px",
	backgroundColor: "rgb(232, 232, 232)"
}

class Container extends Component {
	componentDidMount(){
		// const slideId = this.props.currentSlideId
		// console.log('slideId -------------', slideId)
		// this.props.getTools(slideId);
  }


	render() {
		if (!this.props.currentSlideId) return <div>loading....</div>
		const {toggleInput, selectedTools, choiceStatus, inputStatus, toggleChoice, currentSlideId} = this.props
		return (
					<DragDropContextProvider backend={HTML5Backend}>
						<div>
							<div style={style}>
									<ToolMiniChoice name="Choice Q"
									currentSlideId = {currentSlideId}
									/>
									<ToolMiniInput name="Input Q"
									currentSlideId = {currentSlideId}/>
									<ToolMiniRepl name="Repel"
									currentSlideId = {currentSlideId}/>
							</div>

							<ToolBox {...this.props}/>
						</div>
					</DragDropContextProvider>
		)
	}
}

const mapState = state => {
	const slides = state.lesson.slides
	return {
		selectedTools: state.selectedTools,
		choiceStatus: state.toggleChoice,
		inputStatus: state.toggleInput,
		currentSlideId: state.lesson.slides[state.lesson.currentSlide]
	}
}

const mapDispath = dispatch => {
	return {
		// getTools(slideId){
		// 	dispatch(getToolsDispatcher(slideId))
		// },
		toggleChoice(){
			dispatch(toggleChoice())
		},
		toggleInput(){
			dispatch(toggleInput())
		}
	}
}

export default connect(mapState, mapDispath)(Container)
