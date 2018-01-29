import React from 'react';
import {IconMenu, MenuItem,IconButton} from 'material-ui';

import Url from 'material-ui/svg-icons/action/language';
import Computer from 'material-ui/svg-icons/hardware/computer';
import InsertPhoto from 'material-ui/svg-icons/editor/insert-photo';

const AddImage = ({imagePosition}) => (
	<IconMenu
		iconButtonElement={<IconButton><InsertPhoto /></IconButton>}
		anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
		targetOrigin={{horizontal: 'left', vertical: 'top'}}
	>
		<MenuItem onClick={imagePosition} primaryText="From URL" leftIcon={<Url />} />
		<MenuItem onClick={imagePosition} primaryText="From File" leftIcon={<Computer />} />
	</IconMenu>
);

export default AddImage;
