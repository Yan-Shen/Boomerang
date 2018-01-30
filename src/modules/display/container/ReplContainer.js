import React, { Component } from 'react';
import components from '../components'
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux'
import { updateReplsThunk } from '../reducers/repl';

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
    this.handleChangeSolution = this.handleChangeSolution.bind(this)
  }

  handleChangeQuestion(evt, newValue) {
    this.setState({ReplQuestion:  newValue})
  }

  handleChangeSolution(evt, newValue) {
    this.setState({ReplSolution:  newValue})
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.addQuestion(this.state.ReplQuestion, this.state.ReplSolution, this.props.currentSlideId)
    this.setState({ReplQuestion: "", ReplSolution: ""})
    this.props.toggleRepl();
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
    addQuestion(question, solution, slideId) {
      dispatch(updateReplsThunk(question, solution, slideId))

    }
  }
}
export default connect(null, mapDispatcher)(ReplContainer);

