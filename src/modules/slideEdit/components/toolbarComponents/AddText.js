import React, { Component } from 'react'
import { IconMenu, MenuItem, IconButton } from 'material-ui'
import FormatShape from 'material-ui/svg-icons/editor/format-shapes'
import TextFieldIcon from 'material-ui/svg-icons/editor/text-fields'

class AddText extends Component {
	constructor(props) {
		super(props)
		this.state = {
			text: false,
			textPositionSelect: false,
			fontFamily: 'Times New Roman',
			fontSize: 14,
			textBGColor: '#ffffff',
			textColor: '#000000'
		}

		this.addText = this.addText.bind(this)
		this.textPosition = this.textPosition.bind(this)
	}

	componentDidMount() {
		this.props.canvas.on('mouse:down', (click) => {
  		if (this.state.textPositionSelect){
				this.addText(click.e.layerX, click.e.layerY)
				this.setState({textPositionSelect: false})
			}
		})
	}

	addText(x, y){
		var text = new window.fabric.IText('Text Box', 
			{ left: x, top: y, 
				fill: this.state.textColor, 
				textBackgroundColor: this.state.textBGColor,
				fontFamily: this.state.fontFamily,
				fontWeight: this.state.fontWeight,
				fontSize: this.state.fontSize
			})
		this.props.canvas.add(text)
	}

	textPosition(type){
		switch (type) {
			case 'normal':
				this.setState({
					textPositionSelect: true,
					fontSize: 24,
					fontWeight: 'normal',
					fontFamily: this.state.fontFamily,
					textColor: '#000000',
					textBGColor: '#ffffff'
				})
			break
			case 'h1':
				this.setState({
					textPositionSelect: true,
					fontSize: 48,
					fontWeight: 'bold',
					fontFamily: this.state.fontFamily,
					textColor: '#000000',
					textBGColor: '#ffffff'
				})
			break
			case 'h2':
				this.setState({
					textPositionSelect: true,
					fontSize: 36,
					fontWeight: 'bold',
					fontFamily: this.state.fontFamily,
					textColor: '#000000',
					textBGColor: '#ffffff'
				})
			break
			default:
				return null
		}
		const slideData = this.props.canvas.toJSON()
    this.props.updateSlide(this.props.currentSlide.id, slideData)

	}

	render() {
		return (
			<IconMenu
				iconButtonElement={<IconButton><FormatShape /></IconButton>}
				anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
				targetOrigin={{horizontal: 'left', vertical: 'top'}}
			>
				<MenuItem onClick={() => this.textPosition('normal')} primaryText="Normal Text" leftIcon={<TextFieldIcon />} />
				<MenuItem onClick={() => this.textPosition('h1')} primaryText="Header 1" leftIcon={<TextFieldIcon />} />
				<MenuItem onClick={() => this.textPosition('h2')} primaryText="Header 2" leftIcon={<TextFieldIcon />} />
			</IconMenu>
		)
	}
}

export default AddText
