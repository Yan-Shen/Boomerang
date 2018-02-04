import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};

function getRandom(items) {
  return items[Math.floor(Math.random()*items.length)];
}

const Button = ({name, onClick, children}) => {
  return (
    <input type="submit" name={name} onClick={onClick} value={children} />
  )
}

class NameGenerator extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      studentName: '',
    };
  }

  componentWillMount() {
    this._randomAll()
  }

  _randomAll() {
    Object.keys(this.state).forEach(name => {
      this.setState({
        [name]: getRandom(nameData[name])
      })
    })
  };
  
  handleGetNameClick = (e) => {
    this.setState({
      [e.target.name]: getRandom(nameData[e.target.name])
    })
  };
  
  render() {
    const {studentName} = this.state;
    console.log('this is the name generator component')
    return (
      <div className="container">
        <Button name="studentName" onClick={this.handleGetNameClick}>Pick A Student </Button>
        <div className="name">
          <div>
            <br />
            <span className="studentname">{studentName}</span>
            <br />
          </div>
        </div>
      </div>
    )
  }
}


const nameData = {
	"studentName": [
		"Yan",
		"Nick",
		"Aubrey",
    "Jordon",
    "John",
    "Karen",
    "Erik",
    "Antonio",
    "Amanda",
    "Jane",
    "Will",
    "Shaun",
    "Elana",
    "John",
    "David",
    "Nimit"
	]
}

export default NameGenerator