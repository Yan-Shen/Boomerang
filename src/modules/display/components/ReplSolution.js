import React from 'react';
import TextField from 'material-ui/TextField';

function ReplSolution (props) {
  return (
    <div>
      <TextField
      hintText="CODE SOLUTION"
      value ={props.value}
      onChange={props.onChange}
      multiLine={true}
      rows={3}
    />
    </div>
  )
}

export default ReplSolution;
