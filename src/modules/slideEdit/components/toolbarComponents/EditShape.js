import React, { Component } from 'react';
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import LayersMenu from 'material-ui/svg-icons/maps/layers'
import TextField from 'material-ui/TextField'
import TextFieldIcon from 'material-ui/svg-icons/editor/text-fields'
import { IconMenu, SelectField, ToolbarSeparator } from 'material-ui'

class EditShape extends Component {
  constructor(props) {
    super(props)
    this.state = {
      strokeWidth: 2
    }
    this.editShape = this.editShape.bind(this)
  }

  componentDidMount() {
    this.props.canvas.on('selection:created', (event) => {
			if (event.target.strokeWidth) {
				this.setState({strokeWidth: event.target.strokeWidth})
			}
			if (event.target && event.target._objects) {
				let decider = event.target._objects[0]
				this.setState({strokeWidth: decider.strokeWidth})
			}
		})
		this.props.canvas.on('selection:updated', (event) => {
			if (event.target.strokeWidth) {
				this.setState({strokeWidth: event.target.strokeWidth})
			}
		})
  }

  editShape(action, value = null, object = null) {
    const canvas = this.props.canvas
    if (!object) object = canvas.getActiveObject()
    if (action === 'strokeWidth') this.setState({strokeWidth: value})
    if (object && object._objects) {
      object._objects.forEach(element => {
        this.editShape(action, value, element)
      })
    }
    if (object && object.strokeWidth) {
      // let curStyles = object.getSelectionStyles()
      switch (action) {
        case 'strokeWidth':
          if (object.setSelectionStyles && object.isEditing) {
            let style = {};
				    style.strokeWidth = value;
				    object.setSelectionStyles(style);
          } else {
            object.set('strokeWidth', value);
          }
          break
      }
    }
    canvas.renderAll()
    const slideData = this.props.canvas.toJSON()
    this.props.updateSlide(this.props.currentSlide.id, slideData)
  }

  render() {
    return (
      <div style={{display: 'flex', alignItems: 'center'}}>
        <IconMenu
          iconButtonElement={<IconButton><TextFieldIcon /></IconButton>}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
        >
          <MenuItem primaryText="2" onClick={() => this.editShape('strokeWidth', 2)} />
          <MenuItem primaryText="4" onClick={() => this.editShape('strokeWidth', 4)} />
          <MenuItem primaryText="6" onClick={() => this.editShape('strokeWidth', 6)} />
          <MenuItem primaryText="8" onClick={() => this.editShape('strokeWidth', 8)} />
          <MenuItem primaryText="10" onClick={() => this.editShape('strokeWidth', 10)} />
          <MenuItem primaryText="12" onClick={() => this.editShape('strokeWidth', 12)} />
          <MenuItem primaryText="14" onClick={() => this.editShape('strokeWidth', 14)} />
        </IconMenu>
        <TextField 
          style={{width: 30}}  
          id="font-size-field" 
          value={this.state.strokeWidth} 
          onChange={(event) => {this.editShape('strokeWidth', event.target.value)}} 
        />
      </div>
    )
  }
}

export default EditShape