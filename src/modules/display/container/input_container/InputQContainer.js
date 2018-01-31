import React, { Component } from 'react';
import components from '../../components'
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux'
import { updateInputQuestionsThunk } from '../../reducers/InputQ';

const {Question} = components

class InputQContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {inputQ: "" }
    this.handleChangeQuestion=this.handleChangeQuestion.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChangeQuestion(evt, newValue) {
    this.setState({inputQ:  newValue})
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.addQuestion(this.state.inputQ, this.props.currentSlideId)
    this.setState({inputQ: ""})
    this.props.toggleInput();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Question value={this.state.inputQ} onChange={this.handleChangeQuestion}/>
        <div>
        <RaisedButton label="Save" type="submit" />
        </div>
      </form>
     )
  }
}


const mapDispatcher = dispatch => {
  return {
    addQuestion(question, slideId) {
      dispatch(updateInputQuestionsThunk(question, slideId))

    }
  }
}
export default connect(null, mapDispatcher)(InputQContainer);

