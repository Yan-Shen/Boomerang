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
      hintText="Enter Choice"
      hintStyle ={style.add}
      value = {props.value}
      onChange = {(evt, newValue)=>{props.onChange(evt, newValue, props.counter)}}
    />
    </div>
  )
}

export default Choice;
