import React, { Component } from 'react'
import { Toolbar, ToolbarGroup, ToolbarSeparator, Toggle, IconButton } from 'material-ui'
import AddSlide from 'material-ui/svg-icons/av/library-add'
import SlidePreview from './SlidePreview'
import Steps from './Steps'
import AddText from './toolbarComponents/AddText'
import AddImage from './toolbarComponents/AddImage'
import AddShape from './toolbarComponents/AddShape'
import Templates from './toolbarComponents/Templates'
import ChangeColor from './toolbarComponents/ChangeColor'
import ChangeBackground from './toolbarComponents/ChangeBackground'
import RemoveObject from './toolbarComponents/RemoveObject'
import EditLayers from './toolbarComponents/EditLayers'
import EditText from './toolbarComponents/EditText'
import EditShape from './toolbarComponents/EditShape'
import EmotionAnimation from '../../studentLesson/components/EmotionAnimation'
import WhiteBoardCanvas from '../../whiteboard/containers/WhiteBoardCanvas'
import Icon from 'react-icons-kit'
import { socialYoutube } from 'react-icons-kit/typicons/socialYoutube'
import YouTubeLayer from './youtube/YouTubeLayer'
import ReplOverlay from './overlayComponents/ReplOverlay'

class CanvasBlock extends Component {
	constructor(props) {
		super(props)
		this.saveSlide = this.saveSlide.bind(this)
		this.updateSlide = this.updateSlide.bind(this)
		this.toggleCanvas = this.toggleCanvas.bind(this)
		this.updateDimensions = this.updateDimensions.bind(this)
		this.state = {
			canvas: false,
			width: window.innerWidth,
			height: window.innerHeight,
		}
	}

	toggleCanvas(view){
		if (view === 'canvas') {
			this.setState({canvas: !this.state.canvas}, ()=>{
				this.props.toggleYoutube(this.props.currentSlide.id, this.state.canvas)
			})
			// this.props.toggleYoutube(this.props.currentSlide.id, !this.state.canvas)
		}
		else if (!this.state.canvas) {this.setState({canvas: true}, ()=>{
				this.props.toggleYoutube(this.props.currentSlide.id, true)
			}
		)}
	}

	componentDidUpdate(prevProps) {
		this.props.toggleYoutube(this.props.currentSlide.id, this.state.canvas)
		//const currentDisplayObject = this.props.displayObject.find(display=>display.id === this.props.currentSlide.id)
		this.props.getToolsDispatcher(this.props.currentSlide.id)
		if (!prevProps.currentSlide || prevProps.currentSlideIndex !== this.props.currentSlideIndex) {
			this.canvas.loadFromJSON(this.props.currentSlide, this.canvas.renderAll.bind(this.canvas))
			this.canvas.renderAll()
		}
	}

	updateDimensions(){
	  this.setState({width: this.block.clientWidth, height: this.block.clientHeight})
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.updateDimensions)
	}

	componentDidMount() {
		window.addEventListener("resize", this.updateDimensions)
		this.setState({width: this.block.clientWidth, height: this.block.clientHeight})
		const width = this.block.clientWidth
		const scale = width / 900
		this.canvas = new window.fabric.Canvas('fabricTest')
		this.canvas.backgroundColor = 'white'
		this.canvas.setDimensions({
        width: this.canvas.getWidth() * scale,
        height: this.canvas.getHeight() * scale
    })
		this.canvas.loadFromJSON(this.props.currentSlide, this.canvas.renderAll.bind(this.canvas))
		this.canvas.setZoom(scale)
		this.canvas.renderAll()
		this.canvas.on('object:added', () => this.updateSlide('added'))
		this.canvas.on('object:removed', () => this.updateSlide('removed'))
		this.canvas.on('object:modified', () => this.updateSlide('modded'))
	}

	updateSlide(param) {
		if(this.props.currentSlide.id) {
			const slideData = this.canvas.toJSON()
			this.props.updateSlide(this.props.currentSlide.id, slideData)
		}
	}

	saveSlide() {
		this.props.addSlide(this.props.slides.length, this.props.lesson.id)
	}

	render() {
		const { slides, deleteSlide, addSlide, changeSlide, showYTDispatcher, whiteboard,
			currentSlideIndex, updateSlide, getToolsDispatcher, lesson, replShow, templates,
			emotions, choiceShow, currentSlide, shareReplSolutionDispatcher, activeUsers,
			replSolution, replQuestion, deleteTemplate } = this.props
		let selectedUserObj
		activeUsers ? selectedUserObj = currentSlide[activeUsers[0]] : selectedUserObj = {}

		return (
			<div style={{flex: 1}}>
				<div style={{
					display: 'flex',
					flex: 1,
					flexDirection: 'column',
					background: '#ccc'
				}}>
				{ !this.canvas || !currentSlide ? null :
					<Toolbar style={{
							background: '#fafafa',
							boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 4px'
					}}>
						<ToolbarGroup firstChild={true}>
							<AddText
								canvas={this.canvas}
								currentSlide={currentSlide}
								updateSlide={updateSlide}
							/>
							<AddImage
								canvas={this.canvas}
							/>
							<AddShape
								canvas={this.canvas}
								currentSlide={currentSlide}
								updateSlide={updateSlide}
							/>
							<EditShape
								canvas={this.canvas}
								currentSlide={currentSlide}
								updateSlide={updateSlide}
							/>
							<Icon icon={socialYoutube} onClick={() => {
								this.toggleCanvas('canvas')
							}} />
							<ToolbarSeparator style={{
								marginRight: '10px',
								marginLeft: '10px'}}
							/>
							<ChangeColor
								canvas={this.canvas}
								currentSlide={currentSlide}
								updateSlide={updateSlide}
							/>
						 	<ChangeBackground
								canvas={this.canvas}
								currentSlide={currentSlide}
								updateSlide={updateSlide}
							/>
							<EditText
								canvas={this.canvas}
								currentSlide={currentSlide}
								updateSlide={updateSlide}
							/>
							<EditLayers
								canvas={this.canvas}
								currentSlide={currentSlide}
								updateSlide={updateSlide}
							/>
							<Templates
								canvas={this.canvas}
								templates={templates}
								deleteTemplate={deleteTemplate}
							/>
						</ToolbarGroup>
						<ToolbarGroup lastChild={true}>
							<RemoveObject canvas={this.canvas} />
						</ToolbarGroup>
					</Toolbar>
				}
					<div style={{display: 'flex'}}>
						<div style={{
							width: '200px',
							background: 'white',
							margin: '10px',
							marginRight: '0px',
							height: '915px'
						}}>
							{slides.map((slide, index) => (
									<SlidePreview
										youtube={slide.youtubeVideo}
										lesson={lesson}
										slides={slides.length}
										currentSlideIndex={currentSlideIndex}
										showYTDispatcher={showYTDispatcher}
										index={index}
										changeSlide={changeSlide}
										deleteSlide={deleteSlide}
										getToolsDispatcher = {getToolsDispatcher}
										key={slide.id}
										data={slide}
										toggleCanvas={() => this.toggleCanvas('preview')}
									/>
							))}
							<AddSlide onClick={this.saveSlide} />
						</div>
						<div
							ref={block => this.block = block} style={{
							position: 'relative',
							background: '#ccc',
							margin: '10px',
							flex: 1,
							flexDirection: 'column',
							boxShadow: whiteboard ==='true' ?  "0 0 30px #007681" : ""
						}}
						>
							<canvas  style={{zIndex: 0}} id="fabricTest" width="900" height="550" />
							<div style={{zIndex: whiteboard ==='true' ? 5001 : -5000,
								position: 'absolute', top: 0, left: 0, width: this.block ? this.block.clientWidth : '0px',
								height: this.block ? this.block.clientHeight : '0px'}}
							>
								<WhiteBoardCanvas style={{zIndex: 20000}} width={this.state.width} height={this.state.height}/>
							</div>

							<div style={{position: 'relative'}}>
								{this.props.emotions.map((emotion, index) => (
									<EmotionAnimation left={this.state.width} id={this.props.lesson.id} key={index}
										emotion={emotion} width={this.state.width}
									/>
								))}
							</div>
							<div style={{zIndex: this.state.canvas ? 5 : -5, position: 'absolute', background: 'white',
								top: 0, left: 0, width: this.block ? this.block.clientWidth : '0px',
								height: this.block ? this.block.clientHeight : '0px'
							}}>
								<YouTubeLayer/>
							</div>

							<div style={{zIndex: (replShow || choiceShow) ? 4 : -6, position: 'absolute', backgroundColor: 'white',
								top: 0, left: 0, width: this.block ? this.block.clientWidth : '0px',
								height: this.block ? this.block.clientHeight : '0px'}
							}>
								<ReplOverlay
									value={replSolution}
									question={replQuestion}
									slideId={currentSlide.id}
									shareReplSolutionDispatcher={shareReplSolutionDispatcher}
									selectedUserObj={selectedUserObj}
									choiceShow={choiceShow}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default CanvasBlock
