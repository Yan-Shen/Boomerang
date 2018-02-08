import React, { Component } from 'react'
import {IconMenu, MenuItem,IconButton} from 'material-ui'
import Widgets from 'material-ui/svg-icons/device/widgets'
import TextField from 'material-ui/TextField'
import TemplatePreview from './TemplatePreview'
import {db} from '../../../../firebase'

class Templates extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // templates: []
    }

    this.placeTemplate = this.placeTemplate.bind(this)
    this.saveTemplate = this.saveTemplate.bind(this)
  }

  placeTemplate(template) {
    // this.props.canvas.clear()
    db.ref().child(`templates/${template.id}`).once('value')
      .then((data) => {
        console.log(data.val())
        this.props.canvas.loadFromJSON(data.val(), this.props.canvas.renderAll.bind(this.canvas))
      })
    // this.props.canvas.loadFromJSON(template, this.props.canvas.renderAll.bind(this.canvas))
    // this.props.canvas.renderAll()
  }

  saveTemplate(canvas) {
    const canvasJSON = canvas.toJSON()
    db.ref().child('templates').push(canvasJSON)
  }

  render() {
    const { templates, canvas } = this.props // need templates instead
    return (
      <IconMenu
        iconButtonElement={<IconButton><Widgets /></IconButton>}
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
      >
       <MenuItem  primaryText="Save" onClick={() => this.saveTemplate(canvas)} />
       {
         templates.length && templates.map((template, index) => (
          <MenuItem onClick={() => this.placeTemplate(template)}><TemplatePreview template={template} id={template.id}/></MenuItem>
         ))
       }
      </IconMenu>
    )
  }
}

export default Templates

