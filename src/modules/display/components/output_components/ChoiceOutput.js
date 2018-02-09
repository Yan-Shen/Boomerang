import React, { Component } from 'react';
import {db} from '../../../../firebase'

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import ChoiceEmoji from './ChoiceEmoji';


class ChoiceOutput extends Component {
  constructor (props) {
    super(props)
    this.state={choice: ''}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount (){
    this.setState({choice: this.props.choice[0]})
  }

  handleChange(value){
    this.setState({choice: value})
  }

  handleSubmit() {
    const choice = this.state.choice
    const slideId = this.props.slideId
    const qaId = this.props.qaId
    db.ref(`/selectedTools/${slideId}/Choice Q/QA/${qaId}/submission`).push(choice)
    this.props.handleSend()
  }

  render(){
    const {role, choice, submittedChoice} = this.props
    return (
      <div style={{position: "relative", display:"flex"}}>
            {
              choice &&
              <RadioButtonGroup name="shipSpeed"
              style={{flex: 1.5}}
              defaultSelected={this.props.choice[0]}
              onChange={(evt, value)=>this.handleChange(value)}>
              {
                choice.map(choice=> {
                  return (
                    <RadioButton
                    value={choice}
                    label={choice}
                    key = {choice}
                    style={{paddingLeft:"5px",
                    paddingTop: "8px",
                    paddingBottom: "8px"}}
                    labelStyle={{textAlign:"left", }}
                    />
                  )
                })
              }
              </RadioButtonGroup>
            }
            {
              role === "teacher" &&
              <div style={{ flex: 1}}>
              {
                choice.map(choice=>{
                 const num = submittedChoice.filter(ele=> ele===choice).length
                  return (
                    <ChoiceEmoji number={num}/>
                  )
                })
              }
              </div>
            }
            {
              role === "student" &&
              <IconButton tooltip="SVG Icon" onClick={this.handleSubmit}>
                <ActionHome />
              </IconButton>
            }
      </div>
    )
  }
}

export default ChoiceOutput;
