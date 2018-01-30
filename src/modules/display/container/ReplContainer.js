import React, { Component } from 'react';
import components from '../components'
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux'
import { updateInputQuestionsThunk } from '../reducers/InputQ';

const {ReplQuestion, ReplSolution} = components

class ReplContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ReplQuestion: "",
      ReplSolution: ""
    }
    this.handleChangeQuestion=this.handleChangeQuestion.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChangeQuestion(evt, newValue) {
    this.setState({ReplQuestion:  newValue})
  }

  handleChangeSolution(evt, newValue) {
    this.setState({ReplSolution:  newValue})
  }

  handleSubmit(evt) {
    evt.preventDefault()
    // let slideId = 'id1'
    // this.props.addQuestion(this.state.inputQ, slideId)
    this.setState({ReplQuestion: "", ReplSolution: ""})
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <ReplQuestion value={this.state.ReplQuestion} onChange={this.handleChangeQuestion}/>
        <ReplSolution value={this.state.ReplSolution} onChange={this.handleChangeSolution}/>
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
      // dispatch(updateInputQuestionsThunk(question, slideId))

    }
  }
}
export default connect(null, mapDispatcher)(ReplContainer);

