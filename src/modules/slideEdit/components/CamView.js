import React, { Component } from 'react';
import { OTSession, OTPublisher, OTStreams, OTSubscriber,createSession } from 'opentok-react';


class CamView extends Component {
	constructor(props) {
	    super(props);
	    this.state = { streams: [] };
			this.publisherProperties = {
				width: 142,
				height: 142,
				name: this.props.currentUser.uid,
			}
			this.subscriberProperties = {
				width: 142,
				height: 142
			}
	  }

	  componentWillMount() {
			const {apiKey, sessionId, token} = this.props.currentUser
	    this.sessionHelper = createSession({
	      apiKey: apiKey,
	      sessionId: sessionId,
	      token: token,
	      onStreamsUpdated: streams => { this.setState({ streams }); }
	    });
	  }

	  componentWillUnmount() {
	    this.sessionHelper.disconnect();
	  }

	  render() {
			console.log(this.props.currentUser)
	    return (
	      <div style={{width: "330px", display: 'flex', flexWrap: "wrap" }}>
					<div style={{marginLeft: "15px", marginTop: '15px', borderRadius: "4px", border: "1px solid #ccc"}}>
						<OTPublisher properties={this.publisherProperties} session={this.sessionHelper.session} />
					</div>


	        {this.state.streams.map(stream => {
						console.log('streeeeeeeeeem', stream)
	          return (
							<div style={{marginLeft: "15px", marginTop: '15px', borderRadius: "4px", border: "1px solid #ccc"}}>
								<div>jfdgjdfgjhdf</div>
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
