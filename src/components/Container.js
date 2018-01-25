import React, { Component } from 'react'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Dustbin from './Dustbin'
import Box from './ToolsMini'

export default class Container extends Component {
	render() {
		return (
			<div className="flex-container-row">
				<div className="slideContainer">Slide Side</div>
				<div className="flex-container-column toolSectionContainer">
					<DragDropContextProvider backend={HTML5Backend}>
						<div className="toolSection">
							<div>
									<Box name="Choice Q" />
									<Box name="Input Q" />
									<Box name="Repel" />
									<Box name="Hot Spot" />
									<Box name="Name Picker" />
							</div>
							<Dustbin />
						</div>
					</DragDropContextProvider>
					<div className="displayArea">Display Area</div>
				</div>
			</div>
		)
	}
}
