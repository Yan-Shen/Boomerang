import React from 'react';
import TextField from 'material-ui/TextField';



const style = {
  add: {
    textAlign: "center",
    width: "100%",
    fontSize: "0.8em"
  }
}

function Choice (props) {
  return (
    <div>
    <TextField
      hintText="Add OPTION"
      multiLine={true}
      rows={2}
      rowsMax={4}
      hintStyle ={style.add}
      value = {props.value}
      onChange = {(evt, newValue)=>{props.onChange(evt, newValue, props.counter)}}
    />
    </div>
  )
}

export default Choice;
