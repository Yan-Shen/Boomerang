import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'
import ItemTypes from '../../../../ItemTypes'
import Paper from 'material-ui/Paper';

const style = {
  repl: {
    //backgroundColor: "#eee",
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

		// const item = monitor.getItem()
		const dropResult = monitor.getDropResult()

		if (dropResult) {
      // alert(`You dropped ${item.name} into ${dropResult.name}!`) // eslint-disable-line no-alert
      if(props.type === 'replQ') {
        props.shareReplQ(props.currentSlideId, props.question)
      }
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
  }

  render () {
    const { connectDragSource, type, repl } = this.props
    let styleQ, depth
    if (repl) {
      styleQ = style.repl
    } else {
      styleQ ={}
    }
    type === "regular" ? depth = 0 : depth = 2;

    return connectDragSource(

      <div style={styleQ}>

          <p style={{color: "#6bada7", fontSize: this.props.fontSize, fontWeight: 800, marginLeft: '10px', textAlign:"left"}}> {this.props.question}</p>

      </div>

    )}

}

export default DragSource(ItemTypes.BOX, boxSource, collect)(QuestionOutput);
