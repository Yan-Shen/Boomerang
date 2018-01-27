import React, { Component } from 'react';
import {connect} from 'react-redux'
import { QAContainer } from '../index';
import ToggleChoice, {toggleChoice} from '../../tools/reducers/ToggleChoice'

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
      </div>
     )
  }
}


const mapState = state => {
  return {
    toggleChoice: state.toggleChoice
  }
}

export default connect(mapState)(DisplayContainer);
