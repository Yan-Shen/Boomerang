import React from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import ChartWrapper from './ChartWrapper'

const ChartContainer = ({slideId,questionData}) => {
	return <ChartWrapper data={questionData}/>
}

const getQuestions = (state) => {
	if(!state.selectedTools || !state.selectedTools["Choice Q"] || !state.selectedTools["Choice Q"]) return []
	const questions = state.selectedTools["Choice Q"]['QA']
	const questionArray = []
	for (var key in questions){
		var choices = getChoices(questions[key].choice)
		var submissions = getSubmissions(questions[key].submission,choices)
		var question = questions[key].question
		questionArray.push({choices,submissions,question})
	}
	return questionArray
	//submission
	 // id: choice
}
const getChoices = (choices) => {
 const choiceArray = []
 for(var key in choices){
	 choiceArray.push(choices[key])
 }
 return choiceArray
}
const getSubmissions = (submissions,choices) => {
	if(!submissions) return []
	const subArray = new Array(choices.length).fill(0)
  for(var key in submissions){
	 const ind = choices.indexOf(submissions[key])
 	 subArray[ind] +=1
  }
	return subArray
}

function mapStateToProps(state,props){
	const slides = state.lesson.slides
  return {
    slideId: slides[state.lesson.currentSlide].id,
		questionData: getQuestions(state)
  };
}

export default connect(mapStateToProps,null)(ChartContainer);
