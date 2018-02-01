import React from 'react';

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';


function ChoiceOutput(props) {
  return (
    <div>
          {
            props.choice &&
            <RadioButtonGroup name="shipSpeed" valueSelected={props.choice[0]}>
            {
              props.choice.map(choice=> {
                return (
                  <RadioButton
                  value={choice}
                  label={choice}
                  />
                )
              })
            }
            </RadioButtonGroup>
          }
    </div>
  )
}

export default ChoiceOutput;
