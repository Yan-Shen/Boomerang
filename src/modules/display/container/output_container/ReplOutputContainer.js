import React from 'react';
import Paper from 'material-ui/Paper';
import components from '../../components'
import {shareReplSolution} from '../../reducers/replSolutionShare'
import {shareReplQ} from '../../reducers/replQShare'
const {QuestionOutput, ReplSolution} = components

const style = {
  height: 200,
  width: 300,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};


function ReplOutputContainer (props){
  const {QA, repl, shareReplSolution, shareReplQ, currentSlideId} = props

  return (
      <div>
        
              <div key={QA.question}>
                 <QuestionOutput question={QA.question} repl={repl} shareReplQ={shareReplQ}
                 currentSlideId = {currentSlideId} type="replQ"/>
                <ReplSolution value={QA.solution} shareReplSolution = {shareReplSolution}
                currentSlideId = {currentSlideId}/>
              </div>

    </div>


  )
}

export default ReplOutputContainer
