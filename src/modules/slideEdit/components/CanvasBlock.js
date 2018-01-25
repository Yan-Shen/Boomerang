import React, { Component } from 'react';
import Delete from 'material-ui/svg-icons/action/delete';
import FormatShape from 'material-ui/svg-icons/editor/format-shapes';
import InsertPhoto from 'material-ui/svg-icons/editor/insert-photo';
import FormatColorFill from 'material-ui/svg-icons/editor/format-color-fill';
import FormatColorText from 'material-ui/svg-icons/editor/format-color-text';
import FormatBold from 'material-ui/svg-icons/editor/format-bold';
import FormatItalic from 'material-ui/svg-icons/editor/format-italic';
import FormatUnderlined from 'material-ui/svg-icons/editor/format-underlined';
import Widgets from 'material-ui/svg-icons/device/widgets';
import {IconMenu,Toolbar,ToolbarGroup,ToolbarSeparator} from 'material-ui';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import Download from 'material-ui/svg-icons/file/file-download';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class CanvasBlock extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: false,
			textPositionSelect: false,
			imagePositionSelect: false
		}
		this.removeObject = this.removeObject.bind(this)
		this.addText = this.addText.bind(this)
		this.addImage = this.addImage.bind(this)
		this.changeColor = this.changeColor.bind(this)
		this.textPosition = this.textPosition.bind(this)
		this.imagePosition = this.imagePosition.bind(this)
		this.editTextStyles = this.editTextStyles.bind(this)
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
	removeObject(){
		this.canvas.remove(this.canvas.getActiveObject());
	}
	addText(x,y){
		var text = new window.fabric.IText('Text Box', { left: x, top: y , opacity: 1});
		this.canvas.add(text);
	}
	textPosition(){
		this.setState({textPositionSelect: !this.state.textPositionSelect})
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
	// changeColor(){
	// 	const obj = this.canvas.getActiveObject()
	// 	var style = { };
  //   style.fill = '#007681';
	// 	obj.setSelectionStyles(style)
	// 	// obj.setColor("#6bada7")
	// 	// obj.opacity = 0.1
	// 	this.canvas.renderAll()
	// }
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

	editTextStyles(action) {
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
						this.setIndividualStyles(object, 'fontStyle', curStyles[0][action] ? '' : 'italic')
					} else {
						let isItalic = this.getStyle(object, 'fontStyle') === 'italic'
						this.setStyle(object, 'fontStyle', isItalic ? '' : 'italic')
					}
				break

				case 'bold':
					if (object.setSelectionStyles && object.isEditing) {
						this.setIndividualStyles(object, 'fontWeight', curStyles[0][action] ? '' : 'bold')
					} else {
						let isBold = this.getStyle(object, 'fontWeight') === 'bold'
						this.setStyle(object, 'fontWeight', isBold ? '' : 'bold')
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
		// console.log(styleName, value)
		object.set(styleName, value)
		this.canvas.renderAll()
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
							<IconButton><FormatShape onClick={this.textPosition} color={this.state.textPositionSelect ? "rgba(0,0,0,.7)" : "rgba(0,0,0,.3)"}/></IconButton>
							<IconButton><InsertPhoto onClick={this.imagePosition} color={this.state.imagePositionSelect ? "rgba(0,0,0,.7)" : "rgba(0,0,0,.3)"}/></IconButton>
							<IconButton><Widgets color="rgba(0,0,0,.3)"/></IconButton>
							<ToolbarSeparator style={{marginRight: '24px'}}/>
							<IconButton><FormatColorText onClick={this.changeColor} color="rgba(0,0,0,.3)"/></IconButton>
							<IconButton><FormatColorFill color="rgba(0,0,0,.3)"/></IconButton>
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
