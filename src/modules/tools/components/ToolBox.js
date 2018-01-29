import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DropTarget } from 'react-dnd'
import {connect} from 'react-redux'
import ItemTypes from '../../../ItemTypes'
import ToolBtn from './ToolBtn'


const style = {
	width: "100%",
	height: 200,
	paddingTop: "30px",
	paddingBottom: "15px"
}

const boxTarget = {
	drop() {
		return { name: 'ToolBox' }
	},
}

const collect = (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop(),
})

class ToolBox extends Component {

	static propTypes = {
		connectDropTarget: PropTypes.func.isRequired,
		isOver: PropTypes.bool.isRequired,
		canDrop: PropTypes.bool.isRequired,
	}

	handleClick(){

	}

	render() {
		const { canDrop, isOver, connectDropTarget, selectedTools, toggleChoice, choiceStatus, inputStatus, toggleInput, currentSlideId } = this.props
		const isActive = canDrop && isOver

		let backgroundColor = '#222'
		if (isActive) {
			backgroundColor = 'darkgreen'
		} else if (canDrop) {
			backgroundColor = 'darkkhaki'
		}

		return connectDropTarget(
			<div style ={style} className="fullWidth flex-container-wrap">
				{selectedTools.includes("Choice Q") &&
				<ToolBtn
				onClick={toggleChoice}
				choiceStatus = {choiceStatus}
				currentSlideId = {currentSlideId}
				name="Choice Q" /> }

				{selectedTools.includes("Input Q") &&
				<ToolBtn
				onClick={toggleInput}
				inputStatus = {inputStatus}
				currentSlideId = {currentSlideId}
				name="Input Q" /> }

				{selectedTools.includes("Repel")	&&
				<ToolBtn name="Repel"
				currentSlideId = {currentSlideId}
				/> }

				{selectedTools.includes("Hot Spot")	&&
				<ToolBtn name="Hot Spot" />}

				{selectedTools.includes("Name Picker")	&&
				<ToolBtn name="Name Picker" />}
			</div>,
		)
	}
}

export default DropTarget(ItemTypes.BOX, boxTarget, collect)(ToolBox)
