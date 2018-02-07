import React, { Component } from 'react';
import {Paper} from 'material-ui';
import components from '../../display/components'
import QAOutputContainer from '../../display/container/output_container/QAOutputContainer';
import IconButton from 'material-ui/IconButton'
import ActionHome from 'material-ui/svg-icons/action/home'

const {ReplSolution} = components

class StudentDisplay extends Component {
  constructor(props){
    super(props)
    // this.handleSubmit = this.handleSubmit.bind(this)
  }

  render () {
    const {replShow, choiceShow, slideId, userId, addStudentCode, activeUser, QA} = this.props


  let question="", choice=[], choiceArray = []
  for (let key in QA) {
    let obj ={}
    obj[key] = QA[key]
    choiceArray.push(obj)
  }


  return (
      // <Paper>
      <div width="300" height="550" style={{borderRadius: "4px"}}>
      {
        choiceShow &&
        choiceArray.map(choiceEach=>{
          const [value] = Object.values(choiceEach)
          const [qaId] = Object.keys(choiceEach)
          return <QAOutputContainer QA={value} role="student" key={qaId} qaId={qaId} slideId={slideId}/>
        })
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


