import React, { Component } from 'react';
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import LayersMenu from 'material-ui/svg-icons/maps/layers'
import TextField from 'material-ui/TextField'
import TextFieldIcon from 'material-ui/svg-icons/editor/text-fields'
import { IconMenu, SelectField, ToolbarSeparator } from 'material-ui'
import FormatBold from 'material-ui/svg-icons/editor/format-bold'
import FormatItalic from 'material-ui/svg-icons/editor/format-italic'
import FormatUnderlined from 'material-ui/svg-icons/editor/format-underlined'

class EditText extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fontFamily: 'Times New Roman',
      fontSize: 14
    }
    this.editTextStyles = this.editTextStyles.bind(this)
  }

  componentDidMount() {
    this.props.canvas.on('selection:created', (event) => {
			if (event.target.text) {
				this.setState({fontSize: event.target.fontSize, fontFamily: event.target.fontFamily})
			}
			else if (event.target && event.target._objects) {
				let decider = event.target._objects[0]
        if (decider.fontSize) this.setState({fontSize: decider.fontSize, fontFamily: decider.fontFamily})
      }
		})
		this.props.canvas.on('selection:updated', (event) => {
			if (event.target.text) {
        this.setState({fontSize: event.target.fontSize, fontFamily: event.target.fontFamily})
			}
		})
  }

  editTextStyles(action, value = null, object = null) {
    const canvas = this.props.canvas
    if (!object) object = canvas.getActiveObject()
    if (action === 'fontSize') this.setState({fontSize: value})
    if (object && object._objects) {
      object._objects.forEach(element => {
        this.editTextStyles(action, value, element)
      })
    }
    if (object && object.textLines) {
      let curStyles = object.getSelectionStyles()
      switch (action) {
        case 'underline':
          if (object.setSelectionStyles && object.isEditing) {
            this.setIndividualStyles(object, 'underline', !curStyles[0][action])
          } else {
            let isUnderline = this.getStyle(object, 'underline') === true
            this.setStyle(object, 'underline', !isUnderline)
          }
        break
  
        case 'italic':
          if (object.setSelectionStyles && object.isEditing) {
            this.setIndividualStyles(object, 'fontStyle', curStyles[0].fontStyle ? '' : 'italic')
          } else {
            let isItalic = this.getStyle(object, 'fontStyle') === 'italic'
            this.setStyle(object, 'fontStyle', isItalic ? '' : 'italic')
          }
        break
  
        case 'bold':
          if (object.setSelectionStyles && object.isEditing) {
            this.setIndividualStyles(object, 'fontWeight', curStyles[0].fontWeight ? '' : 'bold')
          } else {
            let isBold = this.getStyle(object, 'fontWeight') === 'bold'
            this.setStyle(object, 'fontWeight', isBold ? '' : 'bold')
          }
        break
  
        case 'fontSize':
          if (object.setSelectionStyles && object.isEditing) {
            this.setIndividualStyles(object, 'fontSize', value)
          } else {
            this.setStyle(object, 'fontSize', value)
          }
        break
  
        case 'fontFamily':
          if (object.setSelectionStyles && object.isEditing) {
            this.setIndividualStyles(object, 'fontFamily', value)
          } else {
            this.setStyle(object, 'fontFamily', value)
            this.setState({fontFamily: value})
          }
        break
      }
    }
    canvas.renderAll()
    const slideData = this.props.canvas.toJSON()
    this.props.updateSlide(this.props.currentSlide.id, slideData)
  }

  getStyle(object, styleName) {
    return object[styleName]
  }
  
  setStyle(object, styleName, value) {
    object.removeStyle(styleName)
    object.set(styleName, value)
  }
  
  setIndividualStyles(object, styleName, value) {
    let style = {}
    style[styleName] = value
    object.setSelectionStyles(style)
  }

  render() {
    return (
      <div style={{display: 'flex', alignItems: 'center'}}>
        <IconMenu
          iconButtonElement={<IconButton><TextFieldIcon /></IconButton>}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
        >
          <MenuItem primaryText="14" onClick={() => this.editTextStyles('fontSize', 14)} />
          <MenuItem primaryText="18" onClick={() => this.editTextStyles('fontSize', 18)} />
          <MenuItem primaryText="20" onClick={() => this.editTextStyles('fontSize', 20)} />
          <MenuItem primaryText="24" onClick={() => this.editTextStyles('fontSize', 24)} />
          <MenuItem primaryText="30" onClick={() => this.editTextStyles('fontSize', 30)} />
          <MenuItem primaryText="36" onClick={() => this.editTextStyles('fontSize', 36)} />
          <MenuItem primaryText="48" onClick={() => this.editTextStyles('fontSize', 48)} />
        </IconMenu>
        <TextField 
          style={{width: 30}}  
          id="font-size-field" 
          value={this.state.fontSize} 
          onChange={(event) => {this.editTextStyles('fontSize', event.target.value)}} 
        />

        <SelectField 
          value={this.state.fontFamily} hintText={this.state.fontFamily} onChange={(event, key, value) => this.setState({fontFamily: value})}
        >
          <MenuItem value="Times New Roman"  primaryText="Times New Roman" onClick={() => this.editTextStyles('fontFamily', 'Times New Roman')} />
          <MenuItem value="Arial"  primaryText="Arial" onClick={() => this.editTextStyles('fontFamily', 'Arial')} />
          <MenuItem value="Cursive"  primaryText="Cursive" onClick={() => this.editTextStyles('fontFamily', 'Cursive')} />
        </SelectField>

        <ToolbarSeparator style={{marginRight: '10px', marginLeft: '10px'}} />

        <IconButton><FormatBold onClick={() => this.editTextStyles('bold')} color="rgba(0,0,0,.3)" /></IconButton>
        <IconButton><FormatItalic onClick={() => this.editTextStyles('italic')} color="rgba(0,0,0,.3)" /></IconButton>
        <IconButton><FormatUnderlined onClick={() => this.editTextStyles('underline')} color="rgba(0,0,0,.3)" /></IconButton>
      </div>
    )
  }
}

export default EditText