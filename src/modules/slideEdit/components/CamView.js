import React, { Component } from 'react';
import { OTSession, OTPublisher, OTStreams, OTSubscriber,createSession } from 'opentok-react';
import {Avatar, Checkbox} from 'material-ui';
import Person from 'material-ui/svg-icons/social/person';

class CamView extends Component {
	constructor(props) {
	    super(props);
	    this.state = { streams: [] };
			this.publisherProperties = {
				width: 300,
				height: 190,
				name: this.props.currentUser.uid,
			}
			this.subscriberProperties = {
				width: 300,
				height: 190
			}
	  }

	  componentWillMount() {
			const {apiKey, sessionId, token} = this.props.currentUser
	    this.sessionHelper = createSession({
	      apiKey: apiKey,
	      sessionId: sessionId,
	      token: token,
	      onStreamsUpdated: streams => { this.props.getSubscribers(streams)}
	    });
	  }

	  componentWillUnmount() {
	    this.sessionHelper.disconnect();
	  }
		getUserObject(stream){
			console.log("name function test -------------->",stream.name)
			const filtered = this.props.users.filter(user => user.id === stream.name)
			return filtered.length ? filtered[0] : { name: "Teacher!!" }
		}
	  render() {
	    return (
	      <div style={{width: "260px", display: 'flex', flexDirection: 'column'}}>
					<div style={{borderRadius: "4px", border: "1px solid #ccc"}}>
						<OTPublisher properties={this.publisherProperties} session={this.sessionHelper.session} />
					</div>
	        {this.props.subscribers && this.props.subscribers.map(stream => {
						const userObj = this.getUserObject(stream)
						console.log(userObj)
	          return (
							<div style={{width: "300px",marginLeft: "15px", marginTop: '15px', borderRadius: "4px", border: "1px solid #ccc"}}>
								<div style={{width: "300px", display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
									<Avatar style={{margin: '10px'}} icon={<Person />} color={'#6bada7'} backgroundColor={'#eee'} size={30} />
									<div style={{flex: 1,fontWeight: '600', marginLeft: '10px'}}>{userObj.name}</div>
									<Checkbox style={{width: '50px'}} />
								</div>
		            <OTSubscriber
									properties={this.subscriberProperties}
		              key={stream.id}
		              session={this.sessionHelper.session}
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
