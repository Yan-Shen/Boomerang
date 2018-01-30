import React, { Component } from 'react';
import {connect} from 'react-redux'
import { QAContainer, InputQContainer, ReplContainer } from '../index';
import {toggleRepl} from '../../tools/reducers/ToggleRepl'

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
                {
          this.props.toggleRepl && <ReplContainer />
        }
      </div>
     )
  }
}


const mapState = state => {
  return {
    toggleChoice: state.toggleChoice,
    toggleInput: state.toggleInput,
    toggleRepl: state.toggleRepl
  }
}

export default connect(mapState)(DisplayContainer);
