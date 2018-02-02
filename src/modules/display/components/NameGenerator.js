function getRandom(items) {
  return items[Math.floor(Math.random()*items.length)];
}

const Button = ({name, onClick, children}) => {
  return (
    <input type="submit" name={name} onClick={onClick} value={children} />
  )
}

class App extends React.Component {
  
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
    return (
      <div className="container">
        <Button name="studentName" onClick={this.handleGetNameClick}>Pick A Student</Button>
        <div className="name">
          <div>
            <span className="studentname">{studentName}</span>
            <br />
          </div>
        </div>
      </div>
    )
  }
}


