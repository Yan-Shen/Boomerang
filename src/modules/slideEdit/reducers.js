import * as actions from './actionTypes';
import SelectedTools from '../tools/reducers/SelectedTools'

export default function reducers(state = {lesson: {}, slides:[], currentSlide: 0, SelectedTools: []}, action){
  switch (action.type){
    case actions.GET_LESSON:
      return {...state, lesson: action.lesson}
		case actions.DELETE_SLIDE:
			const updatedSlides = state.slides.filter(slide => slide.id !== action.slideId)
	    return {...state, slides: updatedSlides}
		case actions.CHANGE_SLIDE:
			return {...state, currentSlide: action.index}
		case actions.GET_SLIDE:
			const update = state.slides.find(slide => slide.id === action.slide.id)
			if(update){
				const updatedSlides = state.slides.map(slide => {
					if(slide.id === action.slide.id) return action.slide
					return slide
				})
				return {...state, slides: updatedSlides}
			}
			return {...state, slides: [...state.slides,action.slide]}
    default:
      return state;
  }
}
