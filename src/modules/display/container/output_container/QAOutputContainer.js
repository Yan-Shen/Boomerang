import React, { Component } from 'react';
import components from '../../components'
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'
import ItemTypes from '../../../../ItemTypes'
import {db} from '../../../../firebase'



const {QuestionOutput, ChoiceOutput} = components

let style
style = {
  width: 300,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
  paddingBottom: "20px"
};


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
      let qaId = props.qaId

      db.ref(`/studentDisplay/${currentSlideId}/Choice/QA`).update({[`${qaId}`]: props.QA})
      // props.shareChoiceQADispatcher(currentSlideId, props.QA)
		}
	}
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
})



class QAOutputContainer extends Component{
  constructor(props){
    super(props)
    this.state = {send: false}
    this.handleSend = this.handleSend.bind(this)
  }
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    // question: PropTypes.string.isRequired,
  }

  handleSend(){
    this.setState({send: true})
  }

  render () {
    const { isDragging, connectDragSource, QA, role, qaId, slideId} = this.props
    const submission = QA['submission']
    let submittedChoice = []
    if(submission) {
      submittedChoice = Object.values(submission)
    }

    return connectDragSource(
        <div className="animated bounceInDown">
        {
          !this.state.send &&
          <Paper style={style} zDepth={2} >
                <div key={QA.question}>
                  <QuestionOutput question={QA.question} type="regular"/>
                  <ChoiceOutput choice={QA.choice} role={role} qaId={qaId} slideId={slideId} submittedChoice = {submittedChoice} handleSend={this.handleSend}/>
                </div>
        </Paper>
        }
      </div>

    )
  }

}

export default DragSource(ItemTypes.BOX, boxSource, collect)(QAOutputContainer);
