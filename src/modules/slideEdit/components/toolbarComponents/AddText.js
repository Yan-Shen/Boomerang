import React from 'react';
import {IconMenu, MenuItem,IconButton} from 'material-ui';
import FormatShape from 'material-ui/svg-icons/editor/format-shapes';
import TextFieldIcon from 'material-ui/svg-icons/editor/text-fields';

const AddText = ({textPosition}) => (
	<IconMenu
		iconButtonElement={<IconButton><FormatShape /></IconButton>}
		anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
		targetOrigin={{horizontal: 'left', vertical: 'top'}}
	>
		<MenuItem onClick={() => textPosition('custom')} primaryText="Custom Text" leftIcon={<TextFieldIcon />} />
		<MenuItem onClick={() => textPosition('normal')} primaryText="Normal Text" leftIcon={<TextFieldIcon />} />
		<MenuItem onClick={() => textPosition('h1')} primaryText="Header 1" leftIcon={<TextFieldIcon />} />
		<MenuItem onClick={() => textPosition('h2')} primaryText="Header 2" leftIcon={<TextFieldIcon />} />
	</IconMenu>
);

export default AddText;
