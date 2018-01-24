import React, { Component } from 'react'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Dustbin from './Dustbin'
import Box from './Box'

export default class Container extends Component {
	render() {
		return (
			<DragDropContextProvider backend={HTML5Backend}>
				<div>
				<div style={{ overflow: 'hidden', clear: 'both' }}>
						<Box name="Choice" />
						<Box name="Input" />
						<Box name="Repel" />
						<Box name="Hot Spot" />
						<Box name="Name Generator" />
					</div>
					<div style={{ overflow: 'hidden', clear: 'both' }}>
						<Dustbin />
					</div>
				</div>
			</DragDropContextProvider>
		)
	}
}
