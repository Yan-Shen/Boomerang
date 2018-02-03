import React from 'react';
import TextField from 'material-ui/TextField';

function ReplQuestion (props) {
  return (
    <div>
      <TextField
      hintText="PLEASE ENTER THE CODE CHALLENGE"
      value ={props.question}
      onChange={props.onChange}
      multiLine={true}
      rows={3}
    />
    </div>
  )
}

export default ReplQuestion;
