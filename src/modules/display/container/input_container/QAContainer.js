import React, { Component } from 'react';
import components from '../../components'
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {connect} from 'react-redux'
import { updateQuestionsThunk } from '../../reducers/questions';


const {Question, Choice} = components

const style = {
  choice: {
    height: 130,
    paddingTop: 80,
    boxSizing: "border-box",
    fontSize: "0.8em",
  }

}

class QAContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      choice: {},
      counter:[]
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleChangeQuestion = this.handleChangeQuestion.bind(this)
    this.handleChangeChoice = this.handleChangeChoice.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.addQuestion(this.state.question, this.state.choice, this.props.currentSlideId)
    this.setState({question: ""})
    this.setState({choice: {}})
    this.setState({counter:[]})
    this.props.toggleChoice();
  }

  handleClick(evt){
    let array = this.state.counter
    let len = this.state.counter.length
    this.setState({counter: [...array, len]})
  }

  handleChangeQuestion(evt, newValue) {
    this.setState({question:  newValue})
  }

  handleChangeChoice(evt, newValue, counter) {
    const holder = this.state.choice
    this.setState({choice: {...holder, [counter]: newValue} } )
  }

  render() {
    const counter = this.state.counter

    return (
      <form onSubmit={this.handleSubmit}>
        <Question value={this.state.question} onChange={this.handleChangeQuestion}/>
        {
          counter.map((counter, index) =>
          <Choice
          value ={this.state.choice[counter] || ""}
          onChange = {this.handleChangeChoice}
          counter={counter}
          key={counter}/>)
        }

        <div style = {style.choice}>
          <FlatButton label="Add Choice" onClick={this.handleClick} />
        </div>
        <div>
        <RaisedButton label="Save" type="submit" />
        </div>
      </form>
     )
  }
}


const mapDispatcher = dispatch => {
  return {
    addQuestion(question, choice, slideId, qType) {
      dispatch(updateQuestionsThunk(question, choice, slideId, qType))
    }
  }
}
export default connect(null, mapDispatcher)(QAContainer);

