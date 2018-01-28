import React, { Component } from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {fetchLesson,addSlide,deleteSlide,changeSlide,updateSlide} from "../actions";
import SlideEditWrapper from '../components/SlideEditWrapper'
import {AppBar, Paper} from 'material-ui';
import {db} from '../../../firebase'
import components from '../components'
import {ToolContainer} from '../../tools'
import {DisplayContainer} from '../../display'



class SlideEdit extends Component {
  componentDidMount(){
    this.props.fetchLesson()
  }
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     slides: []
  //   };
  // }
  // componentDidMount(){
  //   var lessonRef = db.ref(`lessons/${this.props.match.params.id}`)
	// 	lessonRef.on('value', snap => {
	// 		snap.forEach((slide)=>{
	// 			let slideValue = db.ref(`slides/${slide.key}`)
	// 			slideValue.on('value', snap => {
	// 				const slideData = snap.val()
	// 				const id = slide.key
	// 				this.setState({slides: [...this.state.slides, {...slideData, id}]})
	// 			})
	// 		})
	// 	})
  // }
  render() {
    return (
        <div style={{display: 'flex'}}>
        {/* //   <div style={{flex: 6.5}}>
        //     <Paper style={{margin: "10px"}} zDepth={1}>
        //       <CanvasBlock />
        //     </Paper>
        //    {/* thumbnail area */}
        {/* //     <Paper style={{margin: "10px"}} zDepth={1}>
        //       <div style={{display: 'flex',height: "140px"}}>
        //         {this.state.slides.map(slide => <div style={{margin: '10px', border: '1px solid #ccc'}} key={slide.id}>Slide: {slide.id}</div>)}
        //       </div>
        //     </Paper>
        //   </div> */}

          {/* <div style={{flex: 3.5}}> */}
       {/* Toolbox area */}
        {/* <Paper style={{margin: "10px"}} zDepth={2}>
        <div className="flex-container-column toolSectionContainer">
          <ToolContainer />
          </div>
        </Paper> */}

         {/* Display area */}
        {/* <Paper style={{margin: "10px"}} zDepth={2}>
          < DisplayContainer />
        </Paper>
      </div>  */}

        <SlideEditWrapper {...this.props}/>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    currentSlideIndex: state.lesson.currentSlide,
    currentSlide: state.lesson.slides[state.lesson.currentSlide],
    slides: state.lesson.slides,
    lesson: state.lesson.lesson
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchLesson,addSlide,deleteSlide,changeSlide,updateSlide}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(SlideEdit);
