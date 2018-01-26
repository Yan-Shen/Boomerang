import React, { Component } from 'react';
import Delete from 'material-ui/svg-icons/action/delete';
import Url from 'material-ui/svg-icons/action/language';
import Computer from 'material-ui/svg-icons/hardware/computer';
import FormatShape from 'material-ui/svg-icons/editor/format-shapes';
import InsertPhoto from 'material-ui/svg-icons/editor/insert-photo';
import FormatColorFill from 'material-ui/svg-icons/editor/format-color-fill';
import FormatColorText from 'material-ui/svg-icons/editor/format-color-text';
import TextField from 'material-ui/svg-icons/editor/text-fields';
import FormatBold from 'material-ui/svg-icons/editor/format-bold';
import FormatItalic from 'material-ui/svg-icons/editor/format-italic';
import FormatUnderlined from 'material-ui/svg-icons/editor/format-underlined';
import Widgets from 'material-ui/svg-icons/device/widgets';
import Square from 'material-ui/svg-icons/image/crop-din';
import Rectangle from 'material-ui/svg-icons/image/crop-landscape';
import Circle from 'material-ui/svg-icons/image/panorama-fish-eye';
import Triangle from 'material-ui/svg-icons/action/change-history';
import {IconMenu,Toolbar,ToolbarGroup,ToolbarSeparator,SelectField} from 'material-ui';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import Download from 'material-ui/svg-icons/file/file-download';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import { TwitterPicker } from 'react-color'

class CanvasBlock extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: false,
			textPositionSelect: false,
			imagePositionSelect: false,
			colorPicker: false,
			font: 'Times New Roman'
		}
		this.removeObject = this.removeObject.bind(this)
		this.addText = this.addText.bind(this)
		this.addImage = this.addImage.bind(this)
		this.textPosition = this.textPosition.bind(this)
		this.imagePosition = this.imagePosition.bind(this)
		this.editTextStyles = this.editTextStyles.bind(this)
		this.colorPicker = this.colorPicker.bind(this)
		this.changeColor = this.changeColor.bind(this)
		this.changeTextBGColor = this.changeTextBGColor.bind(this)
	}

	componentDidMount(){
		this.canvas = new window.fabric.Canvas('fabricTest');
		this.canvas.backgroundColor="white"
		this.canvas.on('mouse:down', (click) =>{
  		if(this.state.textPositionSelect){
				this.addText(click.e.layerX, click.e.layerY)
				this.setState({textPositionSelect: false})
			}
			if(this.state.imagePositionSelect){
				this.addImage(click.e.layerX, click.e.layerY)
			}
		})
		this.canvas.on('mouse:down', (click) =>{
  		if(this.state.textPositionSelect){
				this.addText(click.e.layerX, click.e.layerY)
				this.setState({textPositionSelect: false})
			}
		})
	}

	colorPicker(type){
		if(type){
			this.setState({
				colorPicker: !this.state.colorPicker,
				color: type,
			})
		}
		else {
			this.setState({ colorPicker: !this.state.colorPicker, color: null})
		}
	}

	removeObject(){
		this.canvas.remove(this.canvas.getActiveObject());
	}

	addText(x,y){
		var text = new window.fabric.IText('Text Box', { left: x, top: y , fontSize: this.state.fontSize, fontWeight: this.state.fontWeight});
		this.canvas.add(text);
	}

	textPosition(type){
		switch(type) {
			case 'normal':
			this.setState({
				textPositionSelect: true,
				fontSize: 10,
				fontWeight: 'normal'
			})
			break;
			case 'h1':
			this.setState({
				textPositionSelect: true,
				fontSize: 30,
				fontWeight: 'bold'
			})
			break;
			case 'h2':
			this.setState({
				textPositionSelect: true,
				fontSize: 20,
				fontWeight: 'bold'
			})
			break;
			default:
			return null
		}

	}

	imagePosition(){
		this.setState({imagePositionSelect: !this.state.imagePositionSelect})
	}

	addImage(x,y){
		window.fabric.Image.fromURL('http://fabricjs.com/assets/pug_small.jpg', (myImg) =>{
			console.log(myImg)
 			var img1 = myImg.set({ left: x, top: y,width:myImg.width/2,height:myImg.height/2});
 			this.canvas.add(img1);
		})

		this.setState({imagePositionSelect: !this.state.imagePositionSelect})
	}
	
	changeColor(color){
		const obj = this.canvas.getActiveObject()
		if (obj.setSelectionStyles && obj.isEditing) {
			let style = {}
			style.fill = color.hex
			obj.setSelectionStyles(style)
		}
		else {
			obj.removeStyle('fill')
			obj.setColor(color.hex)
		}
		this.canvas.renderAll()
	}

	changeTextBGColor(color){
		const object = this.canvas.getActiveObject()
		if (object) {
			if (object.setSelectionStyles && object.isEditing) {
				let style = {}
				style.textBackgroundColor = color.hex
				object.setSelectionStyles(style)
			}
			else {
				object.removeStyle('textBackgroundColor')
				object.set('textBackgroundColor', color.hex)
			}
			this.canvas.renderAll()
		}
	}

	editTextStyles(action, value = null) {
		const object = this.canvas.getActiveObject()
		if (object) {
			let curStyles = object.getSelectionStyles()
			switch(action) {
				case 'underline':
					if (object.setSelectionStyles && object.isEditing) {
						this.setIndividualStyles(object, 'underline', !curStyles[0][action])
					} else {
						let isUnderline = this.getStyle(object, 'underline') === true
						this.setStyle(object, 'underline', isUnderline ? false : true)
					}
				break

				case 'italic':
					if (object.setSelectionStyles && object.isEditing) {
						this.setIndividualStyles(object, 'fontStyle', curStyles[0]['fontStyle'] ? '' : 'italic')
					} else {
						let isItalic = this.getStyle(object, 'fontStyle') === 'italic'
						this.setStyle(object, 'fontStyle', isItalic ? '' : 'italic')
					}
				break

				case 'bold':
					if (object.setSelectionStyles && object.isEditing) {
						this.setIndividualStyles(object, 'fontWeight', curStyles[0]['fontWeight'] ? '' : 'bold')
					} else {
						let isBold = this.getStyle(object, 'fontWeight') === 'bold'
						this.setStyle(object, 'fontWeight', isBold ? '' : 'bold')
					}
				break

				case 'fontSize':
				if (object.setSelectionStyles && object.isEditing) {
					this.setIndividualStyles(object, 'fontSize', value)
				} else {
					this.setStyle(object, 'fontSize', value)
				}
				break
			}
		}
		this.canvas.renderAll()
	}

	getStyle(object, styleName) {
		return object[styleName]
	}

	setStyle(object, styleName, value) {
		object.removeStyle(styleName)
		object.set(styleName, value)
	}

	setIndividualStyles(object, styleName, value) {
		let style = {}
		style[styleName] = value
		object.setSelectionStyles(style)
	}

	render() {
		return (
			<div>
				<div style={{display: 'flex', flexDirection: 'column'}}>
					<Toolbar style={{width: '100%'}}>
						<ToolbarGroup firstChild={true}>
							<IconMenu
						    iconButtonElement={<IconButton><FormatShape /></IconButton>}
						    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
						    targetOrigin={{horizontal: 'left', vertical: 'top'}}
						  >
								<MenuItem onClick={()=>this.textPosition('normal')} primaryText="Normal Text" leftIcon={<TextField />} />
						    <MenuItem onClick={()=>this.textPosition('h1')} primaryText="Header 1" leftIcon={<TextField />} />
								<MenuItem onClick={()=>this.textPosition('h2')} primaryText="Header 2" leftIcon={<TextField />} />
						  </IconMenu>
							<IconMenu
						    iconButtonElement={<IconButton><InsertPhoto /></IconButton>}
						    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
						    targetOrigin={{horizontal: 'left', vertical: 'top'}}
						  >
								<MenuItem onClick={this.imagePosition} primaryText="From URL" leftIcon={<Url />} />
						    <MenuItem onClick={this.imagePosition} primaryText="From File" leftIcon={<Computer />} />
						  </IconMenu>
							<IconMenu
						    iconButtonElement={<IconButton><Widgets /></IconButton>}
						    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
						    targetOrigin={{horizontal: 'left', vertical: 'top'}}
						  >
								<MenuItem primaryText="Square" leftIcon={<Square />} />
								<MenuItem primaryText="Rounded Rectangle" leftIcon={<Rectangle />} />
								<MenuItem primaryText="Circle" leftIcon={<Circle />} />
								<MenuItem primaryText="Triangle" leftIcon={<Triangle />} />
						  </IconMenu>


							<ToolbarSeparator style={{marginRight: '24px'}}/>
							<IconButton onClick={()=>this.colorPicker("text")}>
								<FormatColorText />
								{this.state.colorPicker && this.state.color === 'text' && <TwitterPicker onChange={ this.changeColor } triangle="hide"/>}
							</IconButton>
							<IconButton onClick={()=>this.colorPicker("fill")}>
								<FormatColorFill />
								{this.state.colorPicker && this.state.color === 'fill' && <TwitterPicker onChange={ this.changeTextBGColor } triangle="hide"/>}
							</IconButton>
							<ToolbarSeparator style={{marginRight: '24px'}}/>
							<IconMenu
						    iconButtonElement={<IconButton><TextField /></IconButton>}
						    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
						    targetOrigin={{horizontal: 'left', vertical: 'top'}}
						  >
								<MenuItem primaryText="12" onClick={() => this.editTextStyles('fontSize', 12)} />
								<MenuItem primaryText="16" onClick={() => this.editTextStyles('fontSize', 16)} />
								<MenuItem primaryText="20" onClick={() => this.editTextStyles('fontSize', 20)}/>
						  </IconMenu>
							<SelectField value={this.state.font} hintText={this.state.font} onChange={(event,key,value)=>this.setState({font: value})}>
				        <MenuItem value="Times New Roman"  primaryText="Times New Roman" />
				        <MenuItem value="Arial"  primaryText="Arial" />
				        <MenuItem value="Comic Sans"  primaryText="Comic sans" />
      				</SelectField>
							<ToolbarSeparator style={{marginRight: '24px'}}/>
							<IconButton><FormatBold onClick={() => this.editTextStyles('bold')} color="rgba(0,0,0,.3)"/></IconButton>
							<IconButton><FormatItalic onClick={() => this.editTextStyles('italic')} color="rgba(0,0,0,.3)"/></IconButton>
							<IconButton><FormatUnderlined onClick={() => this.editTextStyles('underline')} color="rgba(0,0,0,.3)"/></IconButton>
							<ToolbarSeparator style={{marginRight: '24px'}}/>
							<IconMenu
						    iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
						    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
						    targetOrigin={{horizontal: 'left', vertical: 'top'}}
						  >


						    <MenuItem
						      primaryText="Case Tools"
						    />
						    <MenuItem primaryText="Download" leftIcon={<Download />} />
						  </IconMenu>
						</ToolbarGroup>
						<ToolbarGroup lastChild={true}>
							<IconButton><Delete onClick={this.removeObject} color="rgba(0,0,0,.3)"/></IconButton>
						</ToolbarGroup>
					</Toolbar>

						<canvas id="fabricTest" width="960" height="615" />

				</div>
			</div>
		);
	}

}

export default CanvasBlock;
