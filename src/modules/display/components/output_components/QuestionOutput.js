import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'
import ItemTypes from '../../../../ItemTypes'

const style = {
  repl: {
    backgroundColor: "aqua",
    height: "100%"
  }
}

const boxSource = {
	beginDrag(props) {
		return {
			question: props.question,
		}
	},

	endDrag(props, monitor) {

		const item = monitor.getItem()
		const dropResult = monitor.getDropResult()

		if (dropResult) {

      // alert(`You dropped ${item.name} into ${dropResult.name}!`) // eslint-disable-line no-alert
      props.shareReplQ(props.question)
		}
	}
}

  const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })

class QuestionOutput extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    question: PropTypes.string.isRequired,
  }

  render () {
    const { isDragging, connectDragSource } = this.props
    const { name } = this.props
    let styleQ
    if (this.props.repl) {
      styleQ = style.repl
    } else {
      styleQ ={}
    }

    return connectDragSource(
      <div style={styleQ}>
            <p> {this.props.question}</p>
      </div>)
  }

}

export default DragSource(ItemTypes.BOX, boxSource, collect)(QuestionOutput);
