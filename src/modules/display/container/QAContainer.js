import React, { Component } from 'react';
import components from '../components'
const {Question, Choice} = components

class QAContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  render() {
    return (
      <div>
      <Question />
      <Choice />
      </div>
     )
  }
}

export default QAContainer;
