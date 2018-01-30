import React, { Component } from 'react'
import { IconMenu, MenuItem, IconButton} from 'material-ui'
import Url from 'material-ui/svg-icons/action/language'
import Computer from 'material-ui/svg-icons/hardware/computer'
import InsertPhoto from 'material-ui/svg-icons/editor/insert-photo'

class AddImage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			text: false,
			imagePositionSelect: false
		}

		this.addImage = this.addImage.bind(this)
		this.imagePosition = this.imagePosition.bind(this)
	}

	componentDidMount() {
		this.props.canvas.on('mouse:down', (click) => {
			if (this.state.imagePositionSelect){
				this.addImage(click.e.layerX, click.e.layerY)
				this.setState({imagePositionSelect: false})
			}
		})
	}

	imagePosition(){
		this.setState({imagePositionSelect: !this.state.imagePositionSelect})
	}

	addImage(x, y){
		window.fabric.Image.fromURL('http://fabricjs.com/assets/pug_small.jpg', (myImg) => {
 			var img1 = myImg.set({ left: x, top: y, width: myImg.width / 2, height: myImg.height / 2})
 			this.props.canvas.add(img1)
		})
		this.setState({imagePositionSelect: !this.state.imagePositionSelect})
	}

	render() {
		return (
			<IconMenu
				iconButtonElement={<IconButton><InsertPhoto /></IconButton>}
				anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
				targetOrigin={{horizontal: 'left', vertical: 'top'}}
			>
				<MenuItem onClick={this.imagePosition} primaryText="From URL" leftIcon={<Url />} />
				<MenuItem onClick={this.imagePosition} primaryText="From File" leftIcon={<Computer />} />
			</IconMenu>
		)
	}
}

export default AddImage
