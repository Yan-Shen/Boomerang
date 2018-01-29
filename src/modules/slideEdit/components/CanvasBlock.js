import React, { Component } from 'react';
import Delete from 'material-ui/svg-icons/action/delete';
import Url from 'material-ui/svg-icons/action/language';
import Computer from 'material-ui/svg-icons/hardware/computer';
import FormatShape from 'material-ui/svg-icons/editor/format-shapes';
import InsertPhoto from 'material-ui/svg-icons/editor/insert-photo';
import FormatColorFill from 'material-ui/svg-icons/editor/format-color-fill';
import FormatColorText from 'material-ui/svg-icons/editor/format-color-text';
import TextFieldIcon from 'material-ui/svg-icons/editor/text-fields';
import TextField from 'material-ui/TextField';
import Widgets from 'material-ui/svg-icons/device/widgets';
import Square from 'material-ui/svg-icons/image/crop-din';
import Rectangle from 'material-ui/svg-icons/image/crop-landscape';
import Circle from 'material-ui/svg-icons/image/panorama-fish-eye';
import Triangle from 'material-ui/svg-icons/action/change-history';
import {IconMenu, Toolbar, ToolbarGroup, ToolbarSeparator, SelectField} from 'material-ui';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import Download from 'material-ui/svg-icons/file/file-download';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import LayersMenu from 'material-ui/svg-icons/maps/layers';
import AddSlide from 'material-ui/svg-icons/av/library-add';
import SlidePreview from './SlidePreview';
import { TwitterPicker } from 'react-color';
import Steps from './Steps'

import EditLayers from './toolbarComponents/EditLayers'
import EditText from './toolbarComponents/EditText'

class CanvasBlock extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: false,
			textPositionSelect: false,
			imagePositionSelect: false,
			colorPicker: false,
			textColor: '#000000',
			textBGColor: '#ffffff'
		};
		this.removeObject = this.removeObject.bind(this);
		this.addText = this.addText.bind(this);
		this.addImage = this.addImage.bind(this);
		this.textPosition = this.textPosition.bind(this);
		this.imagePosition = this.imagePosition.bind(this);
		this.colorPicker = this.colorPicker.bind(this);
		this.changeColor = this.changeColor.bind(this);
		this.changeTextBGColor = this.changeTextBGColor.bind(this);
		this.saveSlide = this.saveSlide.bind(this);
		this.updateSlide = this.updateSlide.bind(this);
	}
	componentDidUpdate(prevProps){
		if (!prevProps.currentSlide || prevProps.currentSlideIndex !== this.props.currentSlideIndex) {
			this.canvas.loadFromJSON(this.props.currentSlide, this.canvas.renderAll.bind(this.canvas));
			this.canvas.renderAll();
		}
  }
	componentDidMount(){
		this.canvas = new window.fabric.Canvas('fabricTest');
		this.canvas.backgroundColor = 'white';
		this.canvas.on('mouse:down', (click) => {
  		if (this.state.textPositionSelect){
				this.addText(click.e.layerX, click.e.layerY);
				this.setState({textPositionSelect: false});
			}
			if (this.state.imagePositionSelect){
				this.addImage(click.e.layerX, click.e.layerY);
			}
		});
		// this.canvas.on('mouse:down', (click) => {
  	// 	if (this.state.textPositionSelect){
		// 		this.addText(click.e.layerX, click.e.layerY);
		// 		this.setState({textPositionSelect: false});
		// 	}
		// });
		this.canvas.on('selection:created', (event) => {
			if (event.target.text) {
				this.setState({fontSize: event.target.fontSize});
				this.setState({fontFamily: event.target.fontFamily});
				this.setState({textColor: event.target.fill});
				this.setState({textBGColor: event.target.textBackgroundColor});
			}
			if (event.target && event.target._objects) {
				let decider = event.target._objects[0];
				this.setState({fontSize: decider.fontSize});
				this.setState({fontFamily: decider.fontFamily});
				this.setState({textColor: decider.fill});
				this.setState({textBGColor: decider.textBackgroundColor});
			}
		});
		this.canvas.on('selection:updated', (event) => {
			if (event.target.text) {
				this.setState({fontSize: event.target.fontSize});
				this.setState({fontFamily: event.target.fontFamily});
				this.setState({textColor: event.target.fill});
				this.setState({textBGColor: event.target.textBackgroundColor});
			}
			// if (event.target && event.target._objects) {
			// 	let decider = event.target._objects[0]
			// 	this.setState({fontSize: decider.fontSize})
			// 	this.setState({fontFamily: decider.fontFamily})
			// 	this.setState({textColor: decider.fill})
			// 	this.setState({textBGColor: decider.textBackgroundColor})
			// }
		});


			this.canvas.on('object:added', ()=>this.updateSlide('added'));
			this.canvas.on('object:removed', ()=>this.updateSlide('removed'));
			this.canvas.on('object:modified', ()=>this.updateSlide('modded'));
	}
	updateSlide(param){
		console.log(param,this.props.currentSlide.id)
		if(this.props.currentSlide.id){
			this.props.updateSlide(this.props.currentSlide.id,this.canvas.toJSON())
		}
	}
	colorPicker(type){
		if (type){
			this.setState({
				colorPicker: !this.state.colorPicker,
				color: type,
			});
		}
		else {
			this.setState({ colorPicker: !this.state.colorPicker, color: null});
		}
	}

	removeObject(){
		this.canvas.remove(this.canvas.getActiveObject());
	}

	/* Is addText needed? */
	addText(x, y){
		var text = new window.fabric.IText('Text Box', { left: x, top: y, fontSize: this.state.fontSize, fontWeight: this.state.fontWeight, fontFamily: this.state.fontFamily, fill: this.state.textColor, textBackgroundColor: this.state.textBGColor});
		this.canvas.add(text);
	}

	textPosition(type){
		switch (type) {
			case 'custom':
			this.setState({
				textPositionSelect: true,
				fontSize: this.state.fontSize,
				fontWeight: this.state.fontWeight,
				fontFamily: this.state.fontFamily,
				textColor: this.state.textColor,
				textBGColor: this.state.textBGColor
			});
			break;
			case 'normal':
			this.setState({
				textPositionSelect: true,
				fontSize: 24,
				fontWeight: 'normal',
				fontFamily: this.state.fontFamily,
				textColor: '#000000',
				textBGColor: '#ffffff'
			});
			break;
			case 'h1':
			this.setState({
				textPositionSelect: true,
				fontSize: 48,
				fontWeight: 'bold',
				fontFamily: this.state.fontFamily,
				textColor: '#000000',
				textBGColor: '#ffffff'
			});
			break;
			case 'h2':
			this.setState({
				textPositionSelect: true,
				fontSize: 36,
				fontWeight: 'bold',
				fontFamily: this.state.fontFamily,
				textColor: '#000000',
				textBGColor: '#ffffff'
			});
			break;
			default:
			return null;
		}

	}

	imagePosition(){
		this.setState({imagePositionSelect: !this.state.imagePositionSelect});
	}

	addImage(x, y){
		window.fabric.Image.fromURL('http://fabricjs.com/assets/pug_small.jpg', (myImg) => {
 			var img1 = myImg.set({ left: x, top: y, width: myImg.width / 2, height: myImg.height / 2});
 			this.canvas.add(img1);
		});

		this.setState({imagePositionSelect: !this.state.imagePositionSelect});
	}

	changeColor(color, proxy, object = null){
		if (!object) object = this.canvas.getActiveObject();
		this.setState({textColor: color.hex});
		if (object && object._objects) {
			object._objects.forEach(element => {
				this.changeColor(color, proxy, element);
			});
		}
		if (object && object.textLines) {
			if (object.setSelectionStyles && object.isEditing) {
				let style = {};
				style.fill = color.hex;
				object.setSelectionStyles(style);
			}
			else {
				object.removeStyle('fill');
				object.setColor(color.hex);
			}
			this.canvas.renderAll();
		}
	}

	changeTextBGColor(color, proxy, object = null){
		if (!object) object = this.canvas.getActiveObject();
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
			this.canvas.renderAll();
		}
	}

	saveSlide(){
		//const data = this.canvas.toJSON();
		this.props.addSlide(this.props.slides.length);
	}
	render() {
		const {slides, deleteSlide, addSlide, changeSlide,currentSlideIndex,updateSlide} = this.props;
		return (
			<div>
				<div style={{display: 'flex', flexDirection: 'column', background: '#ccc'}}>
					<Toolbar style={{width: '100%', background: '#fafafa', boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 4px'}}>
						<ToolbarGroup firstChild={true}>
							<IconMenu
						    iconButtonElement={<IconButton><FormatShape /></IconButton>}
						    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
						    targetOrigin={{horizontal: 'left', vertical: 'top'}}
						  >
								<MenuItem onClick={() => this.textPosition('custom')} primaryText="Custom Text" leftIcon={<TextFieldIcon />} />
								<MenuItem onClick={() => this.textPosition('normal')} primaryText="Normal Text" leftIcon={<TextFieldIcon />} />
						    <MenuItem onClick={() => this.textPosition('h1')} primaryText="Header 1" leftIcon={<TextFieldIcon />} />
								<MenuItem onClick={() => this.textPosition('h2')} primaryText="Header 2" leftIcon={<TextFieldIcon />} />
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


							<ToolbarSeparator style={{marginRight: '10px', marginLeft: '10px'}} />
							<IconButton onClick={() => this.colorPicker('text')}>
								<FormatColorText />
								{this.state.colorPicker && this.state.color === 'text' && <TwitterPicker onChange={ this.changeColor } triangle="hide" />}
							</IconButton>
							<div style={{width: 30, height: 30, borderRadius: 4, backgroundColor: this.state.textColor, boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 4px'}} />

							<IconButton onClick={() => this.colorPicker('fill')}>
								<FormatColorFill />
								{this.state.colorPicker && this.state.color === 'fill' && <TwitterPicker onChange={ this.changeTextBGColor } triangle="hide" />}
							</IconButton>
							<div style={{width: 30, height: 30, borderRadius: 4, backgroundColor: this.state.textBGColor, boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 4px'}} />

							<EditText canvas={this.canvas} />

							<EditLayers canvas={this.canvas} />
							
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

							<IconButton><Delete onClick={this.removeObject} color="rgba(0,0,0,.3)" /></IconButton>
						</ToolbarGroup>
						
					</Toolbar>
					<div style={{display: 'flex'}}>
						<div style={{flex: 1, background: 'white', margin: '10px', marginRight: '0px', height: '790px'}}>
							{slides.map((slide, index) => (
									<SlidePreview currentSlideIndex={currentSlideIndex} index={index} changeSlide={changeSlide} deleteSlide={deleteSlide} key={slide.id} data={slide} />
							)
							)}
							<AddSlide onClick={this.saveSlide}/>
						</div>
						<div style={{background: '#ccc', margin: '10px', flexDirection: 'column'}}>
							<canvas  id="fabricTest" width="1100" height="710" />
							<div style={{height: '70px', background: 'white', marginTop: '10px'}}><Steps/></div>
						</div>
					</div>


				</div>
			</div>
		);
	}

}

export default CanvasBlock;
