import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { DropTarget } from 'react-dnd'
import ItemTypes from '../../../ItemTypes'
import ToolBtn from './ToolBtn'


const style = {
	width: "100%",
	height: 120,
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


	render() {
		const { canDrop, isOver, connectDropTarget, selectedTools, toggleChoice, choiceStatus, inputStatus, toggleInput, currentSlideId, toggleRepl, replStatus, showChoice, showRepl } = this.props
		const selectedToolsName = Object.keys(selectedTools)
		const isActive = canDrop && isOver

		let backgroundColor = '#222'
		if (isActive) {
			backgroundColor = 'darkgreen'
		} else if (canDrop) {
			backgroundColor = 'darkkhaki'
		}

		return connectDropTarget(
			<div style ={style} className="fullWidth flex-container-wrap">
				{selectedToolsName.includes("Choice Q") &&
				<ToolBtn
				onClick={toggleChoice}
				choiceStatus = {choiceStatus}
				showChoice = {showChoice}
				name="Choice Q" /> }

				{selectedToolsName.includes("Input Q") &&
				<ToolBtn
				onClick={toggleInput}
				inputStatus = {inputStatus}
				name="Input Q" /> }

				{selectedToolsName.includes("Repl")	&&
				<ToolBtn name="Repl"
				onClick={toggleRepl}
				showRepl={showRepl}
				replStatus = {replStatus}
				/> }
			</div>,
		)
	}
}

export default DropTarget(ItemTypes.BOX, boxTarget, collect)(ToolBox)
