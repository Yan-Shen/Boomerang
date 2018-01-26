import React, { Component } from 'react'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import components from '../components'
import {getToolsDispatcher} from '../../../store'
import {connect} from 'react-redux'

const {ToolBox, ToolMiniChoice, ToolMiniRepl, ToolMiniInput, ToolMiniHotSpot, ToolMiniName} = components



const style = {
	height: "56px",
	backgroundColor: "rgb(232, 232, 232)"
}

class Container extends Component {
	componentDidMount(){
		// this.props.getTools();
  }


	render() {
		return (
					<DragDropContextProvider backend={HTML5Backend}>
						<div>
							<div style={style}>
									<ToolMiniChoice name="Choice Q" />
									<ToolMiniInput name="Input Q" />
									<ToolMiniRepl name="Repel" />
									<ToolMiniHotSpot name="Hot Spot" />
									<ToolMiniName name="Name Picker" />
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
