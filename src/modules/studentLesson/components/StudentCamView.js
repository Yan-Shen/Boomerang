import React, { Component } from 'react';
import { OTSession, OTPublisher, OTStreams, OTSubscriber,createSession } from 'opentok-react';
import {Avatar, Checkbox} from 'material-ui';
import Person from 'material-ui/svg-icons/social/person';

class CamView extends Component {
	constructor(props) {
	    super(props);
	    this.state = { streams: [] };
			console.log(this.props.currentUser)
			this.publisherProperties = {
				width: 440,
				height: 240,
				name: this.props.currentUser.uid,
			}
			this.subscriberProperties = {
				width: 220,
				height: 120
			}
			this.handleToggle = this.handleToggle.bind(this)
	  }
		handleToggle(key, val){
			const lessonId = this.props.lesson.id
 			this.props.toggleActiveStudent(lessonId, key, val)
		}
		getUserObject(stream){
			console.log("name function test -------------->",stream.name)
			const filtered = this.props.users.filter(user => user.id === stream.name)
			return filtered.length ? filtered[0] : { name: "Teacher!!" }
		}
	  render() {
			const teacher = this.props.subscribers.filter(stream =>{
				const userObj = this.getUserObject(stream)
				if(userObj.role === 'teacher'){
					return true
				}
			})
			console.log(teacher)
	    return (
	      <div style={{width: "260px", display: 'flex', flexDirection: 'column'}}>
					<div style={{borderRadius: "4px", border: "1px solid #ccc",width: "300px",marginLeft: "15px", marginTop: '15px'}}>
						<OTPublisher properties={this.publisherProperties} session={this.props.session.session} />
					</div>
					<div style={{paddingTop: '10px',display: "flex", justifyContent: "flex-start", margin: '10px', fontWeight: 800, color: '#6bada7'}}>
						Online Users
					</div>
	        {this.props.subscribers && this.props.subscribers.map(stream => {
						const userObj = this.getUserObject(stream)
						console.log(userObj)
	          return (
							<div style={{width: "300px",marginLeft: "15px", marginTop: '15px', borderRadius: "4px", border: "1px solid #ccc"}}>
								<div style={{width: "300px", display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
									<Avatar style={{margin: '10px'}} icon={<Person />} color={'#6bada7'} backgroundColor={'#eee'} size={30} />
									<div style={{flex: 1,fontWeight: '600', marginLeft: '10px'}}>{userObj.name}</div>
									<Checkbox style={{width: '50px'}} onCheck={(e, val)=>{this.handleToggle(userObj.id,val)}}/>
								</div>
		            <OTSubscriber
									properties={this.subscriberProperties}
		              key={stream.id}
		              session={this.props.session.session}
		              stream={stream}
		            />
							</div>
	          );
	        })}
	      </div>
	    );
	  }

}

export default CamView;
