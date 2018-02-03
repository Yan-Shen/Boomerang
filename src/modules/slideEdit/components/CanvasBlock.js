import React, { Component } from 'react'
import { Toolbar, ToolbarGroup, ToolbarSeparator,Toggle,IconButton } from 'material-ui'
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
import CloseOverlay from 'material-ui/svg-icons/navigation/close'
import ReactDOM from 'react-dom'
import YouTube from 'react-youtube'

import Icon from 'react-icons-kit'
import { socialYoutube } from 'react-icons-kit/typicons/socialYoutube'

import OverlayLayer from './OverlayLayer'
import ReplOverlay from './overlayComponents/ReplOverlay';

class CanvasBlock extends Component {
	constructor(props) {
		super(props)
		this.saveSlide = this.saveSlide.bind(this)
		this.updateSlide = this.updateSlide.bind(this)
		this.toggleCanvas = this.toggleCanvas.bind(this)
		this.state = {
			canvas: true
		}
	}
	toggleCanvas(view){
		if (view === 'canvas') this.setState({canvas: !this.state.canvas})
		else {
			if (!this.state.canvas) this.setState({canvas: true})
		}
	}
	componentDidUpdate(prevProps) {
		this.props.getToolsDispatcher(this.props.currentSlide.id)
		if (!prevProps.currentSlide || prevProps.currentSlideIndex !== this.props.currentSlideIndex) {
			this.canvas.loadFromJSON(this.props.currentSlide, this.canvas.renderAll.bind(this.canvas))
			this.canvas.renderAll()
		}
		if (this.props.currentSlide.youtubeVideo) {
			const videoId = this.props.currentSlide.youtubeVideo;
			ReactDOM.render(<YouTube videoId={videoId} ></YouTube>, document.getElementById('video-overlay'))
		} else {
			ReactDOM.unmountComponentAtNode(document.getElementById('video-overlay'))
		}
	}

	componentDidMount() {
		const width = this.block.clientWidth
		const scale = width/900
		this.canvas = new window.fabric.Canvas('fabricTest')
		this.canvas.backgroundColor="white"
		this.canvas.setDimensions({
        "width": this.canvas.getWidth() * scale,
        "height": this.canvas.getHeight() * scale
    })
		this.canvas.loadFromJSON(this.props.currentSlide, this.canvas.renderAll.bind(this.canvas))
		this.canvas.setZoom(scale);
		this.canvas.renderAll()
		this.canvas.on('object:added', ()=>this.updateSlide('added'))
		this.canvas.on('object:removed', ()=>this.updateSlide('removed'))
		this.canvas.on('object:modified', ()=>this.updateSlide('modded'))
	}

	updateSlide(param) {
		// if(this.props.currentSlide.youtubeVideo) {
		// 	console.log('GOT HERE ------------------------ YOUTUBE EXISTS')
		// 	this.props.changeYouTube(this.props.currentSlide.id, this.props.currentSlide.youtubeVideo)
		// }
		if(this.props.currentSlide.id) {
			const slideData = this.canvas.toJSON()
			slideData.youtubeVideo = this.props.currentSlide.youtubeVideo
			if (slideData.youtubeVideo) this.props.updateSlide(this.props.currentSlide.id, slideData)
		}
		
	}

	saveSlide() {
		this.props.addSlide(this.props.slides.length, this.props.lesson.id)
	}

	render() {
		console.log('canavas slideid-------------', this.props.currentSlide.id)
		const { slides, deleteSlide, addSlide, changeSlide,
			currentSlideIndex, updateSlide, getToolsDispatcher,lesson, replShow, choiceShow, currentSlide, shareReplSolutionDispatcher} = this.props
			const {id} = this.props.currentSlide
			const selectedUserObj = this.props.currentSlide[this.props.selectedUserId]

		return (
			<div style={{flex: 1}}>
				<div style={{
					display: 'flex',
					flex: 1,
					flexDirection: 'column',
					background: '#ccc'
				}}>
				{ !this.canvas || !this.props.currentSlide ? null :
					<Toolbar style={{
							background: '#fafafa',
							boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 4px'
					}}>
						<ToolbarGroup firstChild={true}>
							<AddText
								canvas={this.canvas}
								currentSlide={this.props.currentSlide}
								updateSlide={this.props.updateSlide}
								changeYouTube={this.props.changeYouTube}
							/>
							<AddImage
								canvas={this.canvas}
								currentSlide={this.props.currentSlide}
								updateSlide={this.props.updateSlide}
								changeYouTube={this.props.changeYouTube}
							/>
							<AddShape />
							<Icon icon={socialYoutube} toggled={this.state.canvas} onClick={() => this.toggleCanvas('canvas')} />
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
								changeYouTube={this.props.changeYouTube}
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
							width: '200px',
							background: 'white',
							margin: '10px',
							marginRight: '0px',
							height: '790px'
						}}>
							{slides.map((slide, index) => (
									<SlidePreview
										youtube={slide.youtubeVideo}
										lesson={lesson}
										slides={slides.length}
										currentSlideIndex={currentSlideIndex}
										index={index}
										changeSlide={changeSlide}
										deleteSlide={deleteSlide}
										getToolsDispatcher = {getToolsDispatcher}
										key={slide.id}
										data={slide}
										toggleCanvas={() => this.toggleCanvas('preview')}
									/>
							))}
							<AddSlide onClick={this.saveSlide}/>
						</div>
						<div ref={block => this.block = block} style={{
							position: 'relative',
							background: '#ccc',
							margin: '10px',
							flex: 1,
							flexDirection: 'column'}}
						>
							<canvas  id="fabricTest" width="900" height="550" />

							<div style={{zIndex: this.state.canvas ? -5000 : 5000, position: 'absolute', background: "white", top: 0, left: 0, width: this.block ? this.block.clientWidth : "0px", height: this.block ? this.block.clientHeight : "0px"}}>
								<IconButton><CloseOverlay onClick={() => this.toggleCanvas('canvas')} /></IconButton>
								<OverlayLayer updateSlide={this.props.updateSlide} currentSlide={currentSlide} changeYouTube={this.props.changeYouTube} />
							</div>

							<div style={{zIndex: (replShow || choiceShow) ? 6000: -6000, position: 'absolute', backgroundColor: "white", top: 0, left: 0, width: this.block ? this.block.clientWidth : "0px", height: this.block ? this.block.clientHeight : "0px"}}>
								<ReplOverlay
								value={this.props.replSolution}
								question={this.props.replQuestion}
								slideId={currentSlide.id}
							shareReplSolutionDispatcher={shareReplSolutionDispatcher}
							selectedUserObj={selectedUserObj}
							/>
							</div>

							{/* <div style={{
								height: '70px',
								background: 'white',
								marginTop: '10px'
							}}>
								<Steps/>
							</div> */}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default CanvasBlock
