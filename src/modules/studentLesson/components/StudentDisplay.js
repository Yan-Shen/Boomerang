import React from 'react';
import {Paper} from 'material-ui';
import components from '../../display/components'
import QAOutputContainer from '../../display/container/output_container/QAOutputContainer';

const {ReplSolution} = components

function StudentDisplay(props) {
  const {replShow, choiceShow, slideId, userId, addStudentCode, activeUser, QA} = props
  // console.log('activeUser, userId is-----------', activeUser, userId)
  let question, choice
  QA['question'] ? question = QA['question'] : question = ""
  QA['choice'] ? choice = QA['choice'] : choice =[]

  console.log('QA in student disply---------', QA)
  return (
    // <Paper>
    <div width="300" height="550" style={{borderRadius: "4px"}}>
    {
      choiceShow && <QAOutputContainer QA={{question, choice}} />
    }

    {
      replShow &&
       <ReplSolution slideId={slideId} userId = {userId} userType="student" activeUser={activeUser} addStudentCode={addStudentCode}/>
    }
    </div>
  // </Paper>
  )

}

export default StudentDisplay;
