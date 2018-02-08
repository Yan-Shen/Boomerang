import React, { Component } from 'react'
import {IconMenu, MenuItem, IconButton} from 'material-ui'
import { TwitterPicker } from 'react-color'

import FormatColorText from 'material-ui/svg-icons/editor/format-color-text'


class ChangeColor extends Component {
	constructor(props) {
		super(props)
		this.state = {
			colorPicker: false,
			color: '#000000',
			textColor: '#000000',
			displayColor: '#000000'
		}

		this.colorPicker = this.colorPicker.bind(this)
		this.changeColor = this.changeColor.bind(this)
	}

	componentDidMount() {
		this.props.canvas.on('selection:created', (event) => {
			if (event.target && event.target._objects) {
				let decider = event.target._objects[0]
				this.setState({displayColor: decider.stroke || decider.fill})
			}
			else if (event.target.text) {
				this.setState({displayColor: event.target.fill})
			}
			else if (event.target.stroke) {
				this.setState({displayColor: event.target.stroke})
			}
		})
		
		this.props.canvas.on('selection:updated', (event) => {
			if (event.target.text) {
				this.setState({displayColor: event.target.fill})
			}
			else if (event.target.stroke) {
				this.setState({displayColor: event.target.stroke})
			}
		})
	}

	colorPicker(type) {
		if (type) {
			this.setState({
				colorPicker: !this.state.colorPicker,
				color: type
			})
		}
		else {
			this.setState({ colorPicker: !this.state.colorPicker, color: null })
		}
	}

	changeColor(color, proxy, object = null) {
		const canvas = this.props.canvas
		if (!object) object = canvas.getActiveObject()
		this.setState({ textColor: color.hex, displayColor: color.hex })
		if (object && object._objects) {
			object._objects.forEach(element => {
				this.changeColor(color, proxy, element)
			})
		}
		if (object && object.textLines) {
			if (object.setSelectionStyles && object.isEditing) {
				let style = {}
				style.fill = color.hex
				object.setSelectionStyles(style)
			}
			else {
				object.removeStyle('fill')
				object.setColor(color.hex)
			}
		}
		else if (object && object.stroke) {
			if (object.setSelectionStyles && object.isEditing) {
				let style = {};
				style.stroke = color.hex;
				object.setSelectionStyles(style);
			}
			else {
				// object.removeStyle('fill');
				object.set('stroke', color.hex);
			}
		}
		this.props.canvas.renderAll()
		const slideData = this.props.canvas.toJSON()
		// slideData.youtubeVideo = this.props.currentSlide.youtubeVideo
		this.props.updateSlide(this.props.currentSlide.id, slideData)
	}

	render() {
		return (
			<div style={{display: 'flex', alignItems: 'center'}}>
				<IconButton onClick={() => this.colorPicker('text')}>
					<FormatColorText />
					{this.state.colorPicker && this.state.color === 'text' && 
					<TwitterPicker onChange={ this.changeColor } triangle="hide" />}
				</IconButton>
				<div style={{
					width: 30, 
					height: 30, 
					borderRadius: 4, 
					backgroundColor: this.state.displayColor, 
					boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 4px'}} />
			</div>
		)
	}
}

export default ChangeColor
