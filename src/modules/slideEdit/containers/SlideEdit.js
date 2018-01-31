import React, { Component } from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {fetchLesson,addSlide,deleteSlide,changeSlide,updateSlide,unmountLesson} from "../actions";
import {getToolsDispatcher} from '../../../store'
import SlideEditWrapper from '../components/SlideEditWrapper'
import {AppBar, Paper} from 'material-ui';
import {db} from '../../../firebase'
import components from '../components'
import {ToolContainer} from '../../tools'
import {DisplayContainer} from '../../display'



class SlideEdit extends Component {
  componentDidMount(){
    const id = this.props.match.params.lessonId
    this.props.fetchLesson(id)
    console.log('slides are----------', this.props.slides)
  }

  componentDidUpdate(prevProps){
		if (!prevProps.slides.length && this.props.slides.length) {
        this.props.getToolsDispatcher(this.props.slides[0].id)
		}
  }
  componentWillUnmount(){
    console.log("unmounted!!!!!!")
    this.props.unmountLesson()
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
    if (!this.props.currentSlide) {
      return (<div>Loading...</div>)
    }
    return (
        <div style={{display: 'flex',width: '100vw'}}>
          <SlideEditWrapper {...this.props}/>
        </div>
    );
  }
}

function mapStateToProps(state,props){
  const slides = state.lesson.slides
  return {
    currentSlideIndex: state.lesson.currentSlide,
    currentSlide: slides[state.lesson.currentSlide],
    slides: state.lesson.slides,
    lesson: state.lesson.lessonData,
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchLesson,addSlide,deleteSlide,changeSlide,updateSlide, getToolsDispatcher,unmountLesson}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(SlideEdit);
