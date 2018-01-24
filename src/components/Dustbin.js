import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DropTarget } from 'react-dnd'
import {connect} from 'react-redux'
import ItemTypes from '../ItemTypes'
import Box from './Box'
import ToolChoice from './tools/Choice'


const style = {
	height: '400px',
	width: '12rem',
	marginRight: '1.5rem',
	marginBottom: '1.5rem',
	color: 'white',
	padding: '1rem',
	textAlign: 'center',
	fontSize: '1rem',
	lineHeight: 'normal',
	float: 'left',
}

const boxTarget = {
	drop() {
		return { name: 'Dustbin' }
	},
}

const collect = (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop(),
})

// @DropTarget(ItemTypes.BOX, boxTarget, (connect, monitor) => ({
// 	connectDropTarget: connect.dropTarget(),
// 	isOver: monitor.isOver(),
// 	canDrop: monitor.canDrop(),
// }))
class Dustbin extends Component {

	static propTypes = {
		connectDropTarget: PropTypes.func.isRequired,
		isOver: PropTypes.bool.isRequired,
		canDrop: PropTypes.bool.isRequired,
	}

	render() {
		const { canDrop, isOver, connectDropTarget } = this.props
		const isActive = canDrop && isOver
		const selectedTools = this.props.selectedTools

		let backgroundColor = '#222'
		if (isActive) {
			backgroundColor = 'darkgreen'
		} else if (canDrop) {
			backgroundColor = 'darkkhaki'
		}

		return connectDropTarget(
			<div style={{ ...style, backgroundColor }}>
				{isActive ? 'Release to drop' : 'Drag a box here'}
		{selectedTools.includes("Choice") &&	<ToolChoice name="Choice" /> }
		{selectedTools.includes("Input") &&		<Box name="Input" /> }
		{selectedTools.includes("Repel")	&&	<Box name="Repel" /> }
		{selectedTools.includes("Hot Spot")	&&	<Box name="Hot Spot" />}
		{selectedTools.includes("Name Generator")	&&		<Box name="Name Generator" />}
			</div>,
		)
	}
}

const mapState = state => {
	return {
		selectedTools: state.selectedTools
	}
}

export default connect(mapState)(DropTarget(ItemTypes.BOX, boxTarget, collect)(Dustbin))

