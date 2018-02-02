import React, { Component } from 'react'
import { IconMenu, MenuItem, IconButton } from 'material-ui'
import { TwitterPicker } from 'react-color'

import FormatColorFill from 'material-ui/svg-icons/editor/format-color-fill'

class ChangeTextBackground extends Component {
	constructor(props) {
		super(props)
		this.state = {
			colorPicker: false,
			color: '#ffffff',
			textBGColor: '#ffffff'
		}

		this.colorPicker = this.colorPicker.bind(this)
		this.changeTextBGColor = this.changeTextBGColor.bind(this)
	}

	componentDidMount() {
		this.props.canvas.on('selection:created', (event) => {
			if (event.target.text) {
				this.setState({textBGColor: event.target.textBackgroundColor})
			}
			if (event.target && event.target._objects) {
				let decider = event.target._objects[0]
				this.setState({textBGColor: decider.textBackgroundColor})
			}
		})
		this.props.canvas.on('selection:updated', (event) => {
			if (event.target.text) {
				this.setState({textBGColor: event.target.textBackgroundColor})
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

	changeTextBGColor(color, proxy, object = null){
		if (!object) object = this.props.canvas.getActiveObject();
		this.setState({textBGColor: color.hex});
		if (object && object._objects) {
			object._objects.forEach(element => {
				this.changeTextBGColor(color, proxy, element);
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
			this.props.canvas.renderAll();
			const slideData = this.props.canvas.toJSON()
    	slideData.youtubeVideo = this.props.currentSlide.youtubeVideo
    	this.props.updateSlide(this.props.currentSlide.id, slideData)
		}
	}

	render() {
		return (
			<div style={{display: 'flex', alignItems: 'center'}}>
				<IconButton onClick={() => this.colorPicker('fill')}>
					<FormatColorFill />
						{this.state.colorPicker && this.state.color === 'fill' && 
						<TwitterPicker onChange={ this.changeTextBGColor } triangle="hide" />}
					</IconButton>
				<div style={{
					width: 30, 
					height: 30,
					borderRadius: 4,
					backgroundColor: this.state.textBGColor,
					boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 4px'}} />
			</div>
		)
	}
}

export default ChangeTextBackground
