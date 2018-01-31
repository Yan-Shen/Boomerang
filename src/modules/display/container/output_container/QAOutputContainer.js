import React from 'react';
import components from '../../components'
import Paper from 'material-ui/Paper';

const {QuestionOutput, ChoiceOutput} = components
const style = {
  height: 200,
  width: 300,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

function QAOutputContainer(props) {
  const QA = props.QA
  console.log('QA--------', QA)
  return (
      <div>
        <Paper style={style} zDepth={1} >
        {
          QA && QA.map(each =>{
           return (
              <div key={each.question}>
                <QuestionOutput question={each.question}/>
                <ChoiceOutput choice={each.choice}/>
              </div>
            )
          })
      }
      </Paper>
    </div>


  )
}

export default QAOutputContainer;
