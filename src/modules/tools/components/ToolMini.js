import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'
import ItemTypes from '../../../ItemTypes'
import {connect} from 'react-redux'
import {addTool} from '../reducers/SelectedTools'
import IconButton from 'material-ui/IconButton';
import ListIcon from 'material-ui/svg-icons/action/list';
import CodeIcon from 'material-ui/svg-icons/action/code';
import TouchIcon from 'material-ui/svg-icons/action/touch-app';
import PersonIcon from 'material-ui/svg-icons/social/person';
import GroupIcon from 'material-ui/svg-icons/social/people';
import QuestionIcon from 'material-ui/svg-icons/action/question-answer'

import {updateToolsDispatcher} from '../reducers/SelectedTools'

const style = {
  display: "inline-block",
  fontSize: "0.7em",
  // borderStyle: "solid",
  borderWidth: 0.3,
  padding: 2,
  // margin: "30px 5px",
  color: "grey",
  boxShadow: "0.5px 0.5px 1px 1.2px #ccc",
  borderRadius: 2,
};

const boxSource = {
	beginDrag(props) {
		return {
			name: props.name,
		}
	},

	endDrag(props, monitor) {

		const item = monitor.getItem()
		const dropResult = monitor.getDropResult()

		if (dropResult) {
      let currentSlideId = props.currentSlideId
      console.log('props  is-------------', props)
      console.log('currenSlideId  is-------------', currentSlideId)
      // alert(`You dropped ${item.name} into ${dropResult.name}!`) // eslint-disable-line no-alert
      props.addTool(item.name, currentSlideId)
		}
	}
}

  const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })


  class Choice extends Component {
    static propTypes = {
      connectDragSource: PropTypes.func.isRequired,
      isDragging: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
    }
    render() {
      const { isDragging, connectDragSource } = this.props
      const { name } = this.props
      // const opacity = isDragging ? 0.4 : 1
      return connectDragSource(<div style={style}><IconButton><ListIcon /></IconButton></div>)
    }
  }


  class Repl extends Component {
    static propTypes = {
      connectDragSource: PropTypes.func.isRequired,
      isDragging: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
    }
    render() {
      const { isDragging, connectDragSource } = this.props
      const { name } = this.props
      // const opacity = isDragging ? 0.4 : 1
      return connectDragSource(<div style={style}><IconButton><CodeIcon /></IconButton></div>)
    }
  }

  class Input extends Component {
    static propTypes = {
      connectDragSource: PropTypes.func.isRequired,
      isDragging: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
    }
    render() {
      const { isDragging, connectDragSource } = this.props
      const { name } = this.props
      // const opacity = isDragging ? 0.4 : 1
      return connectDragSource(<div style={style}><IconButton><QuestionIcon /></IconButton></div>)
    }
  }

  const mapDispatch = dispatch => {
    return {
      addTool(tool, slideId){
        dispatch(updateToolsDispatcher(tool, slideId))
      }
    }
  }

export const ToolMiniChoice = connect(null, mapDispatch)(DragSource(ItemTypes.BOX, boxSource, collect)(Choice))

export const ToolMiniRepl = connect(null, mapDispatch)(DragSource(ItemTypes.BOX, boxSource, collect)(Repl))

export const ToolMiniInput = connect(null, mapDispatch)(DragSource(ItemTypes.BOX, boxSource, collect)(Input))


