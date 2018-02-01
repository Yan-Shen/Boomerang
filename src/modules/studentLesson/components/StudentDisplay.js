import React from 'react';
import {Paper} from 'material-ui';
import components from '../../display/components'

const {ReplSolution} = components

function StudentDisplay(props) {
  return (
    // <Paper>
    <div width="300" height="550" style={{borderRadius: "4px"}}>
    <ReplSolution value={props.value}/>
    </div>
  // </Paper>
  )

}

export default StudentDisplay;
