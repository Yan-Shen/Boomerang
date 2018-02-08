import React, { Component } from 'react'
import { IconMenu, MenuItem, IconButton} from 'material-ui'
import Url from 'material-ui/svg-icons/action/language'
import Computer from 'material-ui/svg-icons/hardware/computer'
import InsertPhoto from 'material-ui/svg-icons/editor/insert-photo'
import TextField from 'material-ui/TextField'

class AddImage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			imageURL: '',
			imageComp: ''
		}

		this.urlImage = this.urlImage.bind(this)
		this.computerImage = this.computerImage.bind(this)
	}

	componentDidMount() {
		// this.props.canvas.on('mouse:down', (click) => {
		// 	if (this.state.imagePositionSelect){
		// 		this.addImage(click.e.layerX, click.e.layerY)
		// 	}
		// })
	}

	urlImage(){
		window.fabric.Image.fromURL(this.state.imageURL, (myImg) => {
			let img1 = myImg.set({ left: 250, top: 250, width: myImg.width, height: myImg.height})
			this.props.canvas.add(img1)
		})
		this.setState({imageURL: ''})
	}

	// addImage(x, y){
	// 	window.fabric.Image.fromURL(this.state.imageURL, (myImg) => {
 	// 		let img1 = myImg.set({ left: x, top: y, width: myImg.width, height: myImg.height})
 	// 		this.props.canvas.add(img1)
	// 	})
	// 	this.setState({imagePositionSelect: !this.state.imagePositionSelect, imageURL: ''})
	// }

	computerImage(file) {
		let canvas = this.props.canvas
		let reader = new FileReader()
    reader.onload = function (event) {
			let imgObj = new Image()
			imgObj.src = event.target.result
			imgObj.onload = function () {
					// start fabricJS stuff
				let image = new window.fabric.Image(imgObj)
				image.set({
						left: 250,
						top: 250
				})
				//image.scale(getRandomNum(0.1, 0.25)).setCoords()
				canvas.add(image)
			}
    }
    reader.readAsDataURL(file)
	}

	render() {
		return (
			<IconMenu
				iconButtonElement={<IconButton><InsertPhoto /></IconButton>}
				anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
				targetOrigin={{horizontal: 'left', vertical: 'top'}}
			>
				<MenuItem onClick={() => this.urlImage(this.state.imageURL)} primaryText="From URL" leftIcon={<Url />} />
				<TextField 
					style={{width: 550}}  
					id="url-field" 
					onChange={(event) => this.setState({imageURL: event.target.value})}
				/>
				<MenuItem
					primaryText="From Computer"
					leftIcon={<Computer />}
					onClick={() => this.computerImage(this.state.imageComp)}
				/>
				<input name='myImage'
					type='file'
					accept='.png, .gif, .jpg, .jpeg'
					onChange={(event) => this.setState({imageComp: event.target.files[0]})}
				/>
			</IconMenu>
		)
	}
}

export default AddImage
