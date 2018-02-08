import React, { Component } from 'react';
import Happy from '../../../studentLesson/components/Emotions/Happy.js'



class ChoiceEmoji extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() {
    const number = parseInt(this.props.number,10)
    const repeat = new Array(number).fill('emoji')
    return (
      <div style={{height: "40px", paddingTop:"5px", textAlign:"left"}}>
      {
        repeat.map((emoji, index) =>{
          return <Happy height="20px" key={index}/>
        })
      }
      </div>
     )
  }
}

export default ChoiceEmoji;
