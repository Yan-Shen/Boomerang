import React, { Component } from 'react';
import {IconMenu, MenuItem,IconButton} from 'material-ui';

import Widgets from 'material-ui/svg-icons/device/widgets';
import Square from 'material-ui/svg-icons/image/crop-din';
import Line from 'material-ui/svg-icons/content/remove';
import Circle from 'material-ui/svg-icons/image/panorama-fish-eye';

class AddShape extends Component {
	constructor(props) {
		super(props)
		this.state = {
			shape: false,
			shapePositionSelect: false,
			shapeColor: '#000000',
			shapeFill: '#ffffff'
		}

		this.addShape = this.addShape.bind(this)
		this.shapePosition = this.shapePosition.bind(this)
	}

	componentDidMount() {
		this.props.canvas.on('mouse:down', (click) => {
  		if (this.state.shapePositionSelect){
				this.addShape(click.e.layerX, click.e.layerY)
				this.setState({shapePositionSelect: false, shape: false})
			}
		})
	}

	addShape(x, y){
		let shape
		if (this.state.shape === 'rect') {
			shape = new window.fabric.Rect( 
				{ left: x, top: y, 
					fill: this.state.shapeFill,
					stroke: this.state.shapeColor,
					width: 150,
					height: 150,
					strokeWidth: 2
			})
		}
		else if (this.state.shape === 'line') {
			shape = new window.fabric.Rect( 
				{ left: x, top: y, 
					fill: '#000000',
					stroke: this.state.shapeColor,
					width: 250,
					height: 3,
					strokeWidth: 2
			})
		}
		else if (this.state.shape === 'circle') {
			shape = new window.fabric.Circle( 
				{ left: x, top: y, 
					fill: this.state.shapeFill,
					stroke: this.state.shapeColor,
					radius: 50,
					strokeWidth: 2
			})
		}
		if (shape) this.props.canvas.add(shape)
	}

	shapePosition(type) {
		switch (type) {
			case 'rect':
				this.setState({
					shapePositionSelect: true,
					shape: 'rect',
					shapeFill: this.state.shapeFill,
					shapeColor: this.state.shapeColor
				})
				break
			case 'line':
				this.setState({
					shapePositionSelect: true,
					shape: 'line',
					shapeFill: '#000000',
					shapeColor: this.state.shapeColor
				})
				break
			case 'circle':
				this.setState({
					shapePositionSelect: true,
					shape: 'circle',
					shapeFill: this.state.shapeFill,
					shapeColor: this.state.shapeColor
				})
				break
			default:
				return null
				break
		}
		const slideData = this.props.canvas.toJSON()
		this.props.updateSlide(this.props.currentSlide.id, slideData)
		// this.props.canvas.renderAll()
	}

	render() {
		return (
			<IconMenu
				iconButtonElement={<IconButton><Widgets /></IconButton>}
				anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
				targetOrigin={{horizontal: 'left', vertical: 'top'}}
			>
				<MenuItem onClick={() => this.shapePosition('rect')} primaryText="Square" leftIcon={<Square />} />
				<MenuItem onClick={() => this.shapePosition('line')} primaryText="Line" leftIcon={<Line />} />
				<MenuItem onClick={() => this.shapePosition('circle')} primaryText="Circle" leftIcon={<Circle />} />
			</IconMenu>
		)
	}
}

export default AddShape