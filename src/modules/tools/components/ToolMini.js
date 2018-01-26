import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'
import ItemTypes from '../../../ItemTypes'
import {connect} from 'react-redux'
<<<<<<< HEAD
import {addTool} from '../reducers/SelectedTools'
import IconButton from 'material-ui/IconButton';
import ListIcon from 'material-ui/svg-icons/action/list';
=======
import {updateToolsDispatcher} from '../reducers/SelectedTools'
>>>>>>> 7244b90cb140b2c7abace45b56744325904ec795

const style = {
  display: "inline-block",
  fontSize: "0.7em",
  borderStyle: "solid",
  borderWidth: 0.5,
  padding: 3,
  margin: "30px 5px",
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
      // alert(`You dropped ${item.name} into ${dropResult.name}!`) // eslint-disable-line no-alert
      props.addTool(item.name)
		}
	}
}

  const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })


  class ToolMini extends Component {
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



  const mapDispatch = dispatch => {
    return {
      addTool(tool){
        dispatch(updateToolsDispatcher(tool))
      }
    }
  }

export default connect(null, mapDispatch)(DragSource(ItemTypes.BOX, boxSource, collect)(ToolMini))
