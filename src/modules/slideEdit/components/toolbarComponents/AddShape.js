import React from 'react';
import {IconMenu, MenuItem,IconButton} from 'material-ui';

import Widgets from 'material-ui/svg-icons/device/widgets';
import Square from 'material-ui/svg-icons/image/crop-din';
import Rectangle from 'material-ui/svg-icons/image/crop-landscape';
import Circle from 'material-ui/svg-icons/image/panorama-fish-eye';
import Triangle from 'material-ui/svg-icons/action/change-history';

const AddShape = ({}) => (
	<IconMenu
		iconButtonElement={<IconButton><Widgets /></IconButton>}
		anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
		targetOrigin={{horizontal: 'left', vertical: 'top'}}
	>
		<MenuItem primaryText="Square" leftIcon={<Square />} />
		<MenuItem primaryText="Rounded Rectangle" leftIcon={<Rectangle />} />
		<MenuItem primaryText="Circle" leftIcon={<Circle />} />
		<MenuItem primaryText="Triangle" leftIcon={<Triangle />} />
	</IconMenu>
);

export default AddShape;
