import React from 'react';

const style = {
  repl: {
    backgroundColor: "aqua",
    height: "100%"
  }
}

function QuestionOutput(props) {
  let styleQ
  if (props.repl) {
    styleQ = style.repl
  } else {
    styleQ ={}
  }

  return (
    <div style={styleQ}>
          <p> {props.question}</p>
    </div>
  )
}

export default QuestionOutput;
