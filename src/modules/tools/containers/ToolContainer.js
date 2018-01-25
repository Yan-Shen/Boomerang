import React, { Component } from 'react'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import components from '../components'

const {ToolBox, ToolMini} = components


const style = {
	height: "56px",
	backgroundColor: "rgb(232, 232, 232)"
}

export default class Container extends Component {
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
							<ToolBox />
						</div>
					</DragDropContextProvider>
		)
	}
}


