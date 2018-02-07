import React from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'



const ChartContainer = ({slideId,questions}) => {
	console.log("hehehehehehhehehehehehehehhe",questions)
	return <div>{slideId}</div>
}

const getQuestions = (state) => {
	if(!state.selectedTools || !state.selectedTools["Choice Q"] || !state.selectedTools["Choice Q"]) return "no selectedobjects"
	return state.selectedTools["Choice Q"]['QA']
}


function mapStateToProps(state,props){
	const slides = state.lesson.slides
  return {
    slideId: slides[state.lesson.currentSlide].id,
		questions: getQuestions(state)
  };
}

export default connect(mapStateToProps,null)(ChartContainer);
