import React, { Component } from 'react'
import { IconMenu, MenuItem, IconButton } from 'material-ui'
import Save from 'material-ui/svg-icons/content/save'
import TemplateIcon from 'material-ui/svg-icons/action/system-update-alt'
import TextField from 'material-ui/TextField'
import TemplatePreview from './TemplatePreview'
import { db } from '../../../../firebase'
import Delete from 'material-ui/svg-icons/action/delete'



class Templates extends Component {
  constructor(props) {
    super(props)

    this.placeTemplate = this.placeTemplate.bind(this)
    this.saveTemplate = this.saveTemplate.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  placeTemplate(template) {
    db.ref().child(`templates/${template.id}`).once('value')
      .then((data) => {
        this.props.canvas.loadFromJSON(data.val(), this.props.canvas.renderAll.bind(this.canvas))
      })
  }

  saveTemplate(canvas) {
    const canvasJSON = canvas.toJSON()
    db.ref().child('templates').push(canvasJSON)
  }

  handleDelete(templateId){
    console.log('deleteTemplate', this.props.deleteTemplate)
		if (this.props.templates.length > 1 ) {
      console.log('getting here')
			this.props.deleteTemplate(templateId)
		}
	}

  render() {
    const { templates, canvas } = this.props
    return (
      <IconMenu
        iconButtonElement={<IconButton><TemplateIcon /></IconButton>}
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
      >
       <MenuItem leftIcon={<Save />} primaryText='Save Current Slide' onClick={() => this.saveTemplate(canvas)} />
       {
         templates.length && templates.map((template, index) => (
           <div key={template.id}>
              <MenuItem onClick={() => this.placeTemplate(template)}>
                <TemplatePreview template={template} id={template.id} />
              </MenuItem>
              <MenuItem leftIcon={<Delete />} primaryText='Delete Template' onClick={() => this.handleDelete(template.id)} />
            </div>
         ))
       }
      </IconMenu>
    )
  }
}

export default Templates

