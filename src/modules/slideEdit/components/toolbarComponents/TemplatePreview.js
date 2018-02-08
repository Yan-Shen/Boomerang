import React, { Component } from 'react'
import Icon from 'react-icons-kit'

class TemplatePreview extends Component {
	constructor(props){
		super(props)
	}

	componentDidMount(){
		const scale = 0.2
		this.canvas = new window.fabric.StaticCanvas(`${this.props.id}`);
		this.canvas.backgroundColor="white"
		this.canvas.setDimensions({
        "width": this.canvas.getWidth() * scale,
        "height": this.canvas.getHeight() * scale
    })
		this.canvas.loadFromJSON(this.props.template, this.canvas.renderAll.bind(this.canvas));
		this.canvas.setZoom(scale);
		this.canvas.renderAll();
	}

	componentDidUpdate(prevProps){
		if (prevProps.data !== this.props.data) {
			this.canvas.loadFromJSON(this.props.template, this.canvas.renderAll.bind(this.canvas));
			this.canvas.renderAll();
		}
	}

	render() {
		const { id, template } = this.props
		return (
			<div style={{margin: '10px'}}>
				<div style={{height: '120px', width: '180px', overflow: 'hidden',
					border: "1px solid #ccc",
					borderRadius: '4px'}}>
					<canvas id={`${id}`} width="900" height="550" />
				</div>
			</div>
		)
	}

}

export default TemplatePreview;
