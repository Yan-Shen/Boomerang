import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'
import ItemTypes from '../ItemTypes'
import {connect} from 'react-redux'
import {addTool} from '../store'
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: '2px',
  fontSize: '0.5em',
  padding: '1px'
};

// const style = {
// 	border: '1px dashed gray',
// 	backgroundColor: 'white',
// 	padding: '0.5rem 1rem',
// 	marginRight: '1.5rem',
// 	marginBottom: '1.5rem',
// 	cursor: 'move',
//   float: 'left',
//   color: 'black'
// }

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

// @DragSource(ItemTypes.BOX, boxSource, (connect, monitor) => ({
  // 	connectDragSource: connect.dragSource(),
  // 	isDragging: monitor.isDragging(),
  // }))

  const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })


  class Box extends Component {
    static propTypes = {
      connectDragSource: PropTypes.func.isRequired,
      isDragging: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
    }

    render() {
      const { isDragging, connectDragSource } = this.props
      const { name } = this.props
      const opacity = isDragging ? 0.4 : 1

      return connectDragSource(<div><RaisedButton label={name} labelStyle={style} /></div>)
    }
  }

  const mapDispatch = dispatch => {
    return {
      addTool (tool){
        dispatch(addTool(tool))
      }
    }
  }

export default connect(null, mapDispatch)(DragSource(ItemTypes.BOX, boxSource, collect)(Box))
