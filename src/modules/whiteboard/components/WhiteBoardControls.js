import React, { Component } from 'react';
import { TwitterPicker } from 'react-color'
import {Slider,Card} from 'material-ui';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {changeColor, changeWidth} from '../actions'

class WhiteBoardControls extends Component {
	constructor(props) {
		super(props);
		this.state = {
			color: "#ccc",
			slider: 10,
		};
	}
	handleSlider(val){
		console.log(val)
	}
	changeColor(){
		console.log("color")
	}
	render() {
		return(
			<Card style={{marginTop: '10px', borderBottom: '1px solid #ccc', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
				<div style={{fontSize: '18px',display: "flex", justifyContent: "flex-start",marginTop: '15px', fontWeight: 800, color: '#6bada7'}}>
					Whiteboard Controls
				</div>
				<div style={{display: 'flex', alignItems: 'center'}}>
					<div style={{alignItems: 'center',width: "80px",position: 'relative', top: "5px"}}>
						<div style={{backgroundColor: this.props.color, height: this.props.width * 0.85, width: this.props.width *0.85, borderRadius: `${this.props.width}px`}}></div>
					</div>
					<TwitterPicker width="340px" onChange={(val)=>this.props.changeColor(val.hex) } triangle="hide" />

				</div>
				<Slider
					style={{width: "420px"}}
					min={20}
					max={70}
					step={2}
					value={this.props.width}
					onChange={(e,val)=>this.props.changeWidth(val)}
				/>
			</Card>
		)
	}
}
function mapStateToProps(state){
  return {
    width: state.whiteboard.width,
		color: state.whiteboard.color,
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({changeColor, changeWidth}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(WhiteBoardControls);
