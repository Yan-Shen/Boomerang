import React, { Component } from 'react';
import {Step, Stepper,StepButton} from 'material-ui';

class Steps extends Component {

	render() {
		return (
			<Stepper linear={false}>
          <Step>
            <StepButton />
          </Step>
					<Step>
            <StepButton />
          </Step>
					<Step>
            <StepButton />
          </Step>
					<Step>
            <StepButton />
          </Step>
					<Step>
            <StepButton />
          </Step>
					<Step>
            <StepButton />
          </Step>

        </Stepper>
		);
	}

}

export default Steps;
