import React from 'react';
import {Paper} from 'material-ui';
import components from '../../display/components'

const {ReplSolution} = components

function StudentDisplay(props) {
  const {replShow, slideId, userId, addStudentCode} = props
  return (
    // <Paper>
    <div width="300" height="550" style={{borderRadius: "4px"}}>
    {
      replShow &&
       <ReplSolution slideId={slideId} userId = {userId} addStudentCode={addStudentCode}/>
    }
    </div>
  // </Paper>
  )

}

export default StudentDisplay;
