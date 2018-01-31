import React from 'react';
import TextField from 'material-ui/TextField';

function Question (props) {
  return (
    <div>
      <TextField
      hintText="PLEASE ENTER THE QUESTION"
      value ={props.value}
      onChange={props.onChange}
    />
    </div>
  )
}

export default Question;
