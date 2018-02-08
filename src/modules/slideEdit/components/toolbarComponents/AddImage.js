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

	urlImage(){
		window.fabric.Image.fromURL(this.state.imageURL, (myImg) => {
			const img1 = myImg.set({ left: 250, top: 250, width: myImg.width, height: myImg.height})
			this.props.canvas.add(img1)
		})
		this.setState({imageURL: ''})
	}

	computerImage(file) {
		if (!file) return false
		const canvas = this.props.canvas
		const reader = new FileReader()
    reader.onload = function (event) {
			const imgObj = new Image()
			imgObj.src = event.target.result
			imgObj.onload = function () {
				const image = new window.fabric.Image(imgObj)
				image.set({
						left: 250,
						top: 250
				})
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
				<MenuItem onClick={() => this.urlImage(this.state.imageURL)} primaryText='From URL' leftIcon={<Url />} />
				<TextField 
					style={{width: 550}}
					hintText='Enter URL here' 
					id='url-field' 
					onChange={(event) => this.setState({imageURL: event.target.value})}
				/>
				<MenuItem
					primaryText='From Computer'
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
