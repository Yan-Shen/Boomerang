import React, { Component } from 'react';
import {Paper} from 'material-ui';
import components from '../../display/components'
import QAOutputContainer from '../../display/container/output_container/QAOutputContainer';

const {ReplSolution} = components

class StudentDisplay extends Component {
  render () {
    const {replShow, choiceShow, slideId, userId, addStudentCode, activeUser, QA} = this.props


  let question="", choice=[], obj = {}
  for (let key in QA) {
    obj.id = key
    obj.qaDetail = QA[key]
  }
  if (obj.qaDetail && obj.qaDetail['question']) {
    question = obj.qaDetail['question']
  }
    if(obj.qaDetail && obj.qaDetail['choice']) {
      choice = obj.qaDetail['choice']
    }


  return (
      // <Paper>
      <div width="300" height="550" style={{borderRadius: "4px"}}>
      {
        choiceShow && <QAOutputContainer QA={{question, choice}} role="student" qaId={obj.id} slideId={slideId}/>
      }

      {
        replShow &&
        <ReplSolution slideId={slideId} userId = {userId} userType="student" activeUser={activeUser} addStudentCode={addStudentCode}/>
      }
      </div>
    // </Paper>
    )
  }
}


export default StudentDisplay;
