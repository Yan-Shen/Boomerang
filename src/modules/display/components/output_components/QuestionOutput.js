import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'
import ItemTypes from '../../../../ItemTypes'
import Paper from 'material-ui/Paper';

const style = {
  repl: {
    backgroundColor: "#eee",
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
      props.shareReplQ(props.currentSlideId, props.question)
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
    const { isDragging, connectDragSource, question, type, name, repl } = this.props
    let styleQ, depth
    if (repl) {
      styleQ = style.repl
    } else {
      styleQ ={}
    }
    type === "regular" ? depth = 0 : depth = 2;

    return connectDragSource(

      <div style={styleQ}>
        <Paper style={{margin: "auto 10px", paddingLeft: "10px", paddingRight: "10px"}} zDepth={depth} >
          <p style={{textAlign:"left"}}> {this.props.question}</p>
        </ Paper>
      </div>

    )}

}

export default DragSource(ItemTypes.BOX, boxSource, collect)(QuestionOutput);
