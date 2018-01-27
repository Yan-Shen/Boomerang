import React, { Component } from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {fetchLesson,addSlide,deleteSlide,changeSlide} from "../actions";

import SlideEditWrapper from '../components/SlideEditWrapper'


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
        <SlideEditWrapper {...this.props}/>
    );
  }
}
function mapStateToProps(state){
  return {
    currentSlide: state.lesson.currentSlide,
    slides: state.lesson.slides,
    lesson: state.lesson.lesson
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchLesson,addSlide,deleteSlide,changeSlide}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(SlideEdit);
