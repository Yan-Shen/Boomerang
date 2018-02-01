
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import { DropTarget } from 'react-dnd'
import ItemTypes from '../../../../ItemTypes'

import ReplSolution from '../../../display/components/input_components/ReplSolution'
import QuestionOutput from '../../../display/components/output_components/QuestionOutput';


const boxTarget = {
	drop() {
		return { name: 'Overlay' }
	},
}

const collect = (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop(),
})

// Create a new component. This compinent should produce some HTMl
class ReplOverlay extends Component { // ReplOverlay
  constructor(props) {
    super(props);
  }

  static propTypes = {
		connectDropTarget: PropTypes.func.isRequired,
		isOver: PropTypes.bool.isRequired,
		canDrop: PropTypes.bool.isRequired,
  }


  render() {
    const { canDrop, isOver, connectDropTarget} = this.props

    return connectDropTarget(
      <div style={{display: 'flex', flexDirection: 'column', backgroundColor:'white', width:'100%', height:'100%'}}>
      {
       <QuestionOutput question={this.props.question}/>
      }
      {
        this.props.value && <ReplSolution value= {this.props.value} style={{flex: 2}} />
      }

      </div>
    );
  }
}
// Take this compoment's generated HTML and put it on the page(in the DOM)

// ReactDOM.render(<App />, document.querySelector('.container'));

export default DropTarget(ItemTypes.BOX, boxTarget, collect)(ReplOverlay)
