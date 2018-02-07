import React, { Component } from 'react'
import {IconMenu, MenuItem,IconButton} from 'material-ui'
import Widgets from 'material-ui/svg-icons/device/widgets'
import TextField from 'material-ui/TextField'

class AddTemplate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      templates: []
    }

    this.placeTemplate = this.placeTemplate.bind(this)
    this.saveTemplate = this.saveTemplate.bind(this)
  }

  componentDidUpdate() {
    // grab templates here
    // this.setState({templates: templates})
  }

  placeTemplate() {
    this.props.canvas.clear()
    // canvas to json
  }

  saveTemplate() {

  }

  render() {
    return (
      <IconMenu
        iconButtonElement={<IconButton><Widgets /></IconButton>}
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
      >
       <MenuItem primaryText="Save" onClick={() => this.saveTemplate()} />
      </IconMenu>
    )
  }
}

export default AddTemplate