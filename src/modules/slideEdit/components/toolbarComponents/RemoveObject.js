import React from 'react'
import {IconMenu, MenuItem, IconButton} from 'material-ui'
import Delete from 'material-ui/svg-icons/action/delete'

const removeObject = (canvas) => {
	if (canvas.getActiveObject()._objects) {
		canvas.getActiveObject()._objects.forEach((object) => {
			canvas.remove(object)
		})
	} else {
		canvas.remove(canvas.getActiveObject())
	}
}

const RemoveObject = ({canvas}) => (
	<IconButton><Delete onClick={()=>removeObject(canvas)} color="rgba(0,0,0,.3)" /></IconButton>
)

export default RemoveObject
