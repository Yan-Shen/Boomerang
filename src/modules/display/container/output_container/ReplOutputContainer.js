import React from 'react';
import Paper from 'material-ui/Paper';
import components from '../../components'
import {shareReplSolution} from '../../reducers/replSolutionShare'
const {QuestionOutput, ReplSolution} = components

const style = {
  height: 200,
  width: 300,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};


function ReplOutputContainer (props){
  const {QA, repl, shareReplSolution} = props
  return (
      <div>
        <Paper style={style} zDepth={1} >
              <div key={QA.question}>
                 <QuestionOutput question={QA.question} repl={repl}/>
                <ReplSolution value={QA.solution} shareReplSolution = {shareReplSolution}/>
              </div>
      </Paper>
    </div>


  )
}

export default ReplOutputContainer
