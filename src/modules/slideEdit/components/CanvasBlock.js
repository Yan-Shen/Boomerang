import React, { Component } from 'react'
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui'
import AddSlide from 'material-ui/svg-icons/av/library-add'
import SlidePreview from './SlidePreview'
import Steps from './Steps'
import AddText from './toolbarComponents/AddText'
import AddImage from './toolbarComponents/AddImage'
import AddShape from './toolbarComponents/AddShape'
import ChangeTextColor from './toolbarComponents/ChangeTextColor'
import ChangeTextBackground from './toolbarComponents/ChangeTextBackground'
import RemoveObject from './toolbarComponents/RemoveObject'
import EditLayers from './toolbarComponents/EditLayers'
import EditText from './toolbarComponents/EditText'

class CanvasBlock extends Component {
	constructor(props) {
		super(props)
		this.saveSlide = this.saveSlide.bind(this)
		this.updateSlide = this.updateSlide.bind(this)
	}
	componentDidUpdate(prevProps) {
		if (!prevProps.currentSlide || prevProps.currentSlideIndex !== this.props.currentSlideIndex) {
			this.canvas.loadFromJSON(this.props.currentSlide, this.canvas.renderAll.bind(this.canvas))
			this.canvas.renderAll()
		}
  }
	componentDidMount() {
		this.canvas = new window.fabric.Canvas('fabricTest')
		this.canvas.backgroundColor = 'white'
		this.canvas.loadFromJSON(this.props.currentSlide, this.canvas.renderAll.bind(this.canvas))
		this.canvas.renderAll()
		this.canvas.on('object:added', ()=>this.updateSlide('added'))
		this.canvas.on('object:removed', ()=>this.updateSlide('removed'))
		this.canvas.on('object:modified', ()=>this.updateSlide('modded'))
	}

	updateSlide(param) {
		if(this.props.currentSlide.id) {
			this.props.updateSlide(this.props.currentSlide.id,this.canvas.toJSON())
		}
	}

	saveSlide() {
		this.props.addSlide(this.props.slides.length)
	}

	render() {
		const { slides, deleteSlide, addSlide, changeSlide,
			currentSlideIndex, updateSlide, getToolsDispatcher } = this.props
		return (
			<div>
				<div style={{
					display: 'flex',
					flexDirection: 'column',
					background: '#ccc'
				}}>
				{ !this.canvas || !this.props.currentSlide ? null :
					<Toolbar style={{
							width: '100%',
							background: '#fafafa',
							boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 4px'
					}}>
						<ToolbarGroup firstChild={true}>
							<AddText
								canvas={this.canvas}
								currentSlide={this.props.currentSlide}
								updateSlide={this.props.updateSlide}
							/>
							<AddImage
								canvas={this.canvas}
								currentSlide={this.props.currentSlide}
								updateSlide={this.props.updateSlide}
							/>
							<AddShape />
							<ToolbarSeparator style={{
								marginRight: '10px',
								marginLeft: '10px'}}
							/>
							<ChangeTextColor
								canvas={this.canvas}
								currentSlide={this.props.currentSlide}
								updateSlide={this.props.updateSlide}
							/>
						 	<ChangeTextBackground
								canvas={this.canvas}
								currentSlide={this.props.currentSlide}
								updateSlide={this.props.updateSlide}
							/>
							<EditText
								canvas={this.canvas}
								currentSlide={this.props.currentSlide}
								updateSlide={this.props.updateSlide}
							/>
							<EditLayers canvas={this.canvas} />
						</ToolbarGroup>
						<ToolbarGroup lastChild={true}>
							<RemoveObject canvas={this.canvas}/>
						</ToolbarGroup>
					</Toolbar>
				}
					<div style={{display: 'flex'}}>
						<div style={{
							flex: 1,
							background: 'white',
							margin: '10px',
							marginRight: '0px',
							height: '790px'
						}}>
							{slides.map((slide, index) => (
									<SlidePreview
										currentSlideIndex={currentSlideIndex}
										index={index}
										changeSlide={changeSlide}
										deleteSlide={deleteSlide}
										getToolsDispatcher = {getToolsDispatcher}
										key={slide.id}
										data={slide}
									/>
							))}
							<AddSlide onClick={this.saveSlide}/>
						</div>
						<div style={{
							background: '#ccc',
							margin: '10px',
							flexDirection: 'column'}}
						>
							<canvas  id="fabricTest" width="900" height="500" />
							<div style={{
								height: '70px',
								background: 'white',
								marginTop: '10px'
							}}>
								<Steps/>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default CanvasBlock
