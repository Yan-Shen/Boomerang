import React, { Component } from 'react';
import Delete from 'material-ui/svg-icons/action/delete';
import {teal500} from 'material-ui/styles/colors';

class SlidePreview extends Component {
	constructor(props){
		super(props)
		this.handleClick = this.handleClick.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
	}

	componentDidMount(){
		const scale = 0.2
		this.canvas = new window.fabric.StaticCanvas(`${this.props.data.id}`);
		this.canvas.backgroundColor="white"
		this.canvas.setDimensions({
        "width": this.canvas.getWidth() * scale,
        "height": this.canvas.getHeight() * scale
    })
		this.canvas.loadFromJSON(this.props.data, this.canvas.renderAll.bind(this.canvas));
		this.canvas.setZoom(scale);
		this.canvas.renderAll();
	}

	componentDidUpdate(prevProps){
		if (prevProps.data !== this.props.data) {
			this.canvas.loadFromJSON(this.props.data, this.canvas.renderAll.bind(this.canvas));
			this.canvas.renderAll();
		}
	}

	handleClick(id, lessonId){
		// this.props.changeSlide(this.props.index, id)
		this.props.changeSlide(this.props.index, lessonId)
		this.props.getToolsDispatcher(id)
	}

	handleDelete(){
		if(this.props.slides > 1 ){
			this.props.deleteSlide(this.props.data.id,this.props.lesson.id,this.props.index-1)
		}
	}

	render() {
		const {id} = this.props.data
		const lessonId = this.props.lesson.id
		return (
			<div onClick={()=>this.handleClick(id, lessonId)} style={{margin: '10px'}}>
				<div style={{height: '120px', width: '180px', overflow: 'hidden',
					border: this.props.index === this.props.currentSlideIndex ? `2px solid ${teal500}` : "1px solid #ccc",
					borderRadius: '4px'}}>
					<canvas   id={`${id}`} width="900" height="550" />
				</div>
				<div style={{position: 'relative', height: "0px", top: "-30px", left: "75px"}}>
					<Delete onClick={()=>this.handleDelete(lessonId)}/>
				</div>

			</div>


		);
	}

}

export default SlidePreview;
