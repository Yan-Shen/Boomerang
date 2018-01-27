import React, { Component } from 'react';
import {AppBar, Paper} from 'material-ui';
import {db} from '../../../firebase'
import components from '../components'
import {ToolContainer} from '../../tools'
import {QAContainer} from '../../display'

const {CanvasBlock} = components

class SlideEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slides: []
    };
  }
  componentDidMount(){
    var lessonRef = db.ref(`lessons/${this.props.match.params.id}`)
		lessonRef.on('value', snap => {
			snap.forEach((slide)=>{
				let slideValue = db.ref(`slides/${slide.key}`)
				slideValue.on('value', snap => {
					const slideData = snap.val()
					const id = slide.key
					this.setState({slides: [...this.state.slides, {...slideData, id}]})
				})
			})
		})
  }
  render() {
    console.log(this.state)
    return (
        <div style={{display: 'flex'}}>
          <div style={{flex: 7}}>
            <Paper style={{margin: "10px"}} zDepth={1}>
              <CanvasBlock />
            </Paper>
           {/* thumbnail area */}
            <Paper style={{margin: "10px"}} zDepth={1}>
              <div style={{display: 'flex',height: "140px"}}>
                {this.state.slides.map(slide => <div style={{margin: '10px', border: '1px solid #ccc'}} key={slide.id}>Slide: {slide.id}</div>)}
              </div>
            </Paper>
          </div>

          <div style={{flex: 3}}>
           {/* Toolbox area */}
            <Paper style={{margin: "10px"}} zDepth={1}>
            <div className="flex-container-column toolSectionContainer">
              <ToolContainer />
              </div>
            </Paper>

             {/* Display area */}
            <Paper style={{margin: "10px"}} zDepth={1}>
              < QAContainer />
            </Paper>
          </div>

        </div>
    );
  }
}

export default SlideEdit;
