import React from 'react';
import {IconMenu, MenuItem,IconButton} from 'material-ui';
import { TwitterPicker } from 'react-color';

import FormatColorText from 'material-ui/svg-icons/editor/format-color-text';

const ChangeTextColor = ({colorPicker,colorPickerState,color, changeColor, textColor}) => (
	<div style={{display: 'flex', alignItems: 'center'}}>
	<IconButton onClick={() => colorPicker('text')}>
		<FormatColorText />
		{colorPickerState && color === 'text' && <TwitterPicker onChange={changeColor } triangle="hide" />}
	</IconButton>
	<div style={{width: 30, height: 30, borderRadius: 4, backgroundColor: textColor, boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 4px'}} />
	</div>
);

export default ChangeTextColor;
