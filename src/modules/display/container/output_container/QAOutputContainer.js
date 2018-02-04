import React, { Component } from 'react';
import components from '../../components'
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'
import ItemTypes from '../../../../ItemTypes'
import {db} from '../../../../firebase'

const {QuestionOutput, ChoiceOutput} = components

const boxSource = {
	beginDrag(props) {
		return {
      question: props.question,
      QA: props.QA
		}
	},

	endDrag(props, monitor) {

		const item = monitor.getItem()
		const dropResult = monitor.getDropResult()

		if (dropResult) {
      let currentSlideId = props.currentSlideId
      console.log('dropped!!!!!!!!!')
      db.ref(`/studentDisplay/${currentSlideId}/Choice`).update({QA: props.QA})
      // props.shareChoiceQADispatcher(currentSlideId, props.QA)
		}
	}
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
})

const style = {
  height: 150,
  width: 300,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
  // backgroundColor: '#999'
};

class QAOutputContainer extends Component{
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    // question: PropTypes.string.isRequired,
  }

  render () {
    const { isDragging, connectDragSource, QA } = this.props
    return connectDragSource(
        <div>
          <Paper style={style} zDepth={2} >
                <div key={QA.question}>
                  <QuestionOutput question={QA.question} type="regular"/>
                  <ChoiceOutput choice={QA.choice}/>
                </div>
        </Paper>
      </div>

    )
  }

}

export default DragSource(ItemTypes.BOX, boxSource, collect)(QAOutputContainer);
