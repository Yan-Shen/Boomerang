import React from 'react';
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import LayersMenu from 'material-ui/svg-icons/maps/layers'
import { IconMenu } from 'material-ui'


const EditLayers = ({ canvas }) => (
  <IconMenu
    iconButtonElement={<IconButton><LayersMenu /></IconButton>}
    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
    targetOrigin={{horizontal: 'left', vertical: 'top'}}
  >
    <MenuItem primaryText="Bring To Front" onClick={() => {changeZAxis('bringToFront', canvas)}} />
    <MenuItem primaryText="Bring Forward" onClick={() => {changeZAxis('bringForward', canvas)}} />
    <MenuItem primaryText="Send Backwards" onClick={() => {changeZAxis('sendBackwards', canvas)}} />
    <MenuItem primaryText="Send To Back"  onClick={() => {changeZAxis('sendToBack', canvas)}} />
  </IconMenu>
)

function changeZAxis(action, canvas) {
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
      break
    }
  }
  canvas.renderAll()
}

export default EditLayers