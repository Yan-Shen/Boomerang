import React from 'react';
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import LayersMenu from 'material-ui/svg-icons/maps/layers'
import { IconMenu } from 'material-ui'


const EditLayers = ({ canvas, updateSlide, currentSlide }) => (
  <IconMenu
    iconButtonElement={<IconButton><LayersMenu /></IconButton>}
    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
    targetOrigin={{horizontal: 'left', vertical: 'top'}}
  >
    <MenuItem primaryText="Bring To Front" onClick={() => {changeZAxis('bringToFront', canvas, updateSlide, currentSlide)}} />
    <MenuItem primaryText="Bring Forward" onClick={() => {changeZAxis('bringForward', canvas, updateSlide, currentSlide)}} />
    <MenuItem primaryText="Send Backwards" onClick={() => {changeZAxis('sendBackwards', canvas, updateSlide, currentSlide)}} />
    <MenuItem primaryText="Send To Back"  onClick={() => {changeZAxis('sendToBack', canvas, updateSlide, currentSlide)}} />
  </IconMenu>
)

function changeZAxis(action, canvas, updateSlide, currentSlide) {
  const object = canvas.getActiveObject();
  if (object) {
    switch (action) {
      case 'bringToFront':
        canvas.bringToFront(object);
      break

      case 'bringForward':
        canvas.bringForward(object)
      break

      case 'sendBackwards':
        canvas.sendBackwards(object)
      break

      case 'sendToBack':
        canvas.sendToBack(object)
      default:
        canvas.bringToFront(object);
      break
    }
  }
    canvas.renderAll()
		const slideData = canvas.toJSON()
		updateSlide(currentSlide.id, slideData)
}

export default EditLayers
