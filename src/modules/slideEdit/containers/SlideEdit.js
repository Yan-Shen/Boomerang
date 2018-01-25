import React, { Component } from 'react';
import {AppBar, Paper} from 'material-ui';

import components from '../components'

const {CanvasBlock} = components

class SlideEdit extends Component {
  render() {
    return (
        <div style={{display: 'flex'}}>
          <div style={{flex: 7}}>
            <Paper style={{margin: "10px"}} zDepth={1}>
              <CanvasBlock />
            </Paper>
            <Paper style={{margin: "10px"}} zDepth={1}>
              <div style={{height: "140px"}}></div>
            </Paper>
          </div>
          <div style={{flex: 3}}>
            <Paper style={{margin: "10px"}} zDepth={1}>
              <div style={{height: "400px"}}></div>
            </Paper>
            <Paper style={{margin: "10px"}} zDepth={1}>
              <div style={{height: "410px"}}></div>
            </Paper>
          </div>

        </div>
    );
  }
}

export default SlideEdit;
