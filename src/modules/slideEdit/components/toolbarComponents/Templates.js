import React, { Component } from 'react'
import {IconMenu, MenuItem,IconButton} from 'material-ui'
import Widgets from 'material-ui/svg-icons/device/widgets'
import TextField from 'material-ui/TextField'
import TemplatePreview from './TemplatePreview'

class Templates extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // templates: []
    }

    this.placeTemplate = this.placeTemplate.bind(this)
    this.saveTemplate = this.saveTemplate.bind(this)
  }

  placeTemplate() {
    this.props.canvas.clear()
    // canvas to json
  }

  saveTemplate() {

  }

  render() {
    const { slides } = this.props // need templates instead
    return (
      <IconMenu
        iconButtonElement={<IconButton><Widgets /></IconButton>}
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
      >
       <MenuItem primaryText="Save" onClick={() => this.saveTemplate()} />
       {/* {
         slides.length && slides.map((slide, index) => (
          <MenuItem><TemplatePreview data={slide} key={slide.id} index={index} /></MenuItem>
         ))
       } */}
      </IconMenu>
    )
  }
}

export default Templates