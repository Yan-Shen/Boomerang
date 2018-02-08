import React, { Component } from 'react';
import { ScaleLoader } from 'react-spinners';
import {Card} from 'material-ui';
import { OTSession, OTPublisher, OTStreams, OTSubscriber,createSession } from 'opentok-react';

class RandomName extends Component {
	constructor(props){
    super(props);
    this.state = {
			currentCount: 2,
			name: null,
      id: null,
		}
  }
  timer() {
    this.setState({
      currentCount: this.state.currentCount - 1
    })
		if(this.state.currentCount === 1) {
			const {users} = this.props
			const ind = Math.floor(Math.random() * users.length)
			const name = users.length ? users[ind].name : "No Users Online"
      const id = users.length ? users[ind].id : "gfdhjfgdhj"
			this.setState({name, id})
    }
    if(this.state.currentCount < 1) {
      clearInterval(this.intervalId);
    }
  }
  componentDidMount() {

    this.intervalId = setInterval(this.timer.bind(this), 1000);
  }
  componentWillUnmount(){
    clearInterval(this.intervalId);
  }
  renderStream(){
    if(!this.props.users.length){
      return <div>no users online</div>
    }
    const {id} = this.state

    const {subscribers, session} = this.props

    const selected = subscribers.find(stream => stream.name === id)


    return (
      <OTSubscriber
        //properties={this.subscriberProperties}
        session={session.session}
        stream={selected}
      />
    )
  }
	render() {
		return (
			<Card style={{margin: "15px", width: "300px", height: "300px"}}>
				{this.state.currentCount > 0
				?
				<ScaleLoader color={'#456e7a'}/>
				:
				<div className="animated fadeIn" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
					<div style={{fontSize: "24px",color: "#456e7a"}}>{this.state.name}</div>
          <div style={{marginTop: '20px'}} className="animated tada">
            {this.renderStream()}
          </div>
				</div>
				}
			</Card>
		);
	}

}

export default RandomName;
