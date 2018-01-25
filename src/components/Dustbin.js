import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DropTarget } from 'react-dnd'
import {connect} from 'react-redux'
import ItemTypes from '../ItemTypes'
import Tool from './tools/Tool'


// const style = {
// 	height: '400px',
// 	width: '12rem',
// 	marginRight: '1.5rem',
// 	marginBottom: '1.5rem',
// 	color: 'white',
// 	padding: '1rem',
// 	textAlign: 'center',
// 	fontSize: '1rem',
// 	lineHeight: 'normal',
// 	float: 'left',
// }

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
			<div className="fullWidth toolBoxArea flex-container-wrap">
		{selectedTools.includes("Choice Q") &&	<Tool name="Choice Q" /> }
		{selectedTools.includes("Input Q") &&		<Tool name="Input Q" /> }
		{selectedTools.includes("Repel")	&&	<Tool name="Repel" /> }
		{selectedTools.includes("Hot Spot")	&&	<Tool name="Hot Spot" />}
		{selectedTools.includes("Name Picker")	&&		<Tool name="Name Picker" />}
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

