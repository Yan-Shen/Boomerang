import React from 'react';
import {IconMenu, MenuItem,IconButton} from 'material-ui';
import { TwitterPicker } from 'react-color';

import FormatColorFill from 'material-ui/svg-icons/editor/format-color-fill';

const ChangeTextBackground = ({colorPicker,colorPickerState,color, changeTextBGColor, textBGColor}) => (
	<div style={{display: 'flex', alignItems: 'center'}}>
		<IconButton onClick={() => colorPicker('fill')}>
			<FormatColorFill />
				{colorPickerState && color === 'fill' && <TwitterPicker onChange={ changeTextBGColor } triangle="hide" />}
			</IconButton>
		<div style={{width: 30, height: 30, borderRadius: 4, backgroundColor: textBGColor, boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 4px'}} />
	</div>
);

export default ChangeTextBackground;
