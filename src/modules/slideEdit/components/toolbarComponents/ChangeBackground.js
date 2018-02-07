import React, { Component } from 'react'
import { IconMenu, MenuItem, IconButton } from 'material-ui'
import { TwitterPicker } from 'react-color'

import FormatColorFill from 'material-ui/svg-icons/editor/format-color-fill'

class ChangeBackground extends Component {
	constructor(props) {
		super(props)
		this.state = {
			colorPicker: false,
			color: '#ffffff',
			textBGColor: '#ffffff',
			displayColor: '#ffffff'
		}

		this.colorPicker = this.colorPicker.bind(this)
		this.changeBGColor = this.changeBGColor.bind(this)
	}

	componentDidMount() {
		this.props.canvas.on('selection:created', (event) => {
			if (event.target.text) {
				this.setState({displayColor: event.target.textBackgroundColor})
			}
			else if (event.target.stroke) {
				this.setState({displayColor: event.target.fill})
			}
			if (event.target && event.target._objects) {
				let decider = event.target._objects[0]
				this.setState({displayColor: decider.textBackgroundColor})
			}
		})

		this.props.canvas.on('selection:updated', (event) => {
			if (event.target.text) {
				this.setState({displayColor: event.target.textBackgroundColor})
			}
			else if (event.target.stroke) {
				this.setState({displayColor: event.target.fill})
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

	changeBGColor(color, proxy, object = null){
		if (!object) object = this.props.canvas.getActiveObject();
		console.log('looking for prop on obj for shapes', object) // if it has fontFamily
		this.setState({BGColor: color.hex, displayColor: color.hex});
		if (object && object._objects) {
			object._objects.forEach(element => {
				this.changeBGColor(color, proxy, element);
			});
		}
		if (object && object.textLines) {
			if (object.setSelectionStyles && object.isEditing) {
				let style = {};
				style.textBackgroundColor = color.hex;
				object.setSelectionStyles(style);
			}
			else {
				object.removeStyle('textBackgroundColor');
				object.set('textBackgroundColor', color.hex);
			}
		}
		else if (object && object.stroke) {
			if (object.setSelectionStyles && object.isEditing) {
				let style = {};
				style.fill = color.hex;
				object.setSelectionStyles(style);
			}
			else {
				object.set('fill', color.hex);
			}
		}
		this.props.canvas.renderAll()
		const slideData = this.props.canvas.toJSON()
		this.props.updateSlide(this.props.currentSlide.id, slideData)
	}

	render() {
		return (
			<div style={{display: 'flex', alignItems: 'center'}}>
				<IconButton onClick={() => this.colorPicker('fill')}>
					<FormatColorFill />
						{this.state.colorPicker && this.state.color === 'fill' && 
						<TwitterPicker onChange={ this.changeBGColor } triangle="hide" />}
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

export default ChangeBackground
