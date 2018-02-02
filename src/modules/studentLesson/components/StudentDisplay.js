import React from 'react';
import {Paper} from 'material-ui';
import components from '../../display/components'

const {ReplSolution} = components

function StudentDisplay(props) {
  console.log('currentDisplayObject for repl-----------------', props.currentDisplayObject)
  return (
    // <Paper>
    <div width="300" height="550" style={{borderRadius: "4px"}}>
    {
      props.currentDisplayObject.Repl.show &&
       <ReplSolution value={props.value}/>
    }
    </div>
  // </Paper>
  )

}

export default StudentDisplay;
