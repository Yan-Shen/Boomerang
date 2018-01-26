import React, { Component } from 'react'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import components from '../components'
import {getToolsDispatcher} from '../../../store'
import {connect} from 'react-redux'

const {ToolBox, ToolMini} = components



const style = {
	height: "56px",
	backgroundColor: "rgb(232, 232, 232)"
}

class Container extends Component {
	componentDidMount(){
		this.props.getTools();
  }


	render() {
		return (
					<DragDropContextProvider backend={HTML5Backend}>
						<div>
							<div style={style}>
									<ToolMini name="Choice Q" />
									<ToolMini name="Input Q" />
									<ToolMini name="Repel" />
									<ToolMini name="Hot Spot" />
									<ToolMini name="Name Picker" />
							</div>
							<ToolBox selectedTools={this.props.selectedTools}/>
						</div>
					</DragDropContextProvider>
		)
	}
}

const mapState = state => {
	return {
		selectedTools: state.selectedTools
	}
}

const mapDispath = dispatch => {
	return {
		getTools(){
			dispatch(getToolsDispatcher())
		}
	}
}

export default connect(mapState, mapDispath)(Container)
