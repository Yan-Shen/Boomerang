import React, { Component } from 'react';
import {connect} from 'react-redux'
import { QAContainer, InputQContainer } from '../index';

class DisplayContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  render() {
    return (
      <div>
        {
          this.props.toggleChoice && <QAContainer />
        }
        {
          this.props.toggleInput && <InputQContainer />
        }
      </div>
     )
  }
}


const mapState = state => {
  return {
    toggleChoice: state.toggleChoice,
    toggleInput: state.toggleInput
  }
}

export default connect(mapState)(DisplayContainer);
