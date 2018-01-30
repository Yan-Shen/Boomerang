import {db} from '../../firebase'
import * as actions from './actionTypes';


export const getLesson = lesson =>  ({type: actions.GET_LESSON, lesson})
export const getSlide = slide =>  ({type: actions.GET_SLIDE, slide})
export const getSlideIndex = index =>  ({type: actions.GET_SLIDE_INDEX, index})

export function fetchLesson (id) {
  return function thunk (dispatch) {
		db.ref(`lessons/-L3nOPjk6NFSMcJGRn4p/currentSlide`).on('value', (data)=>{
			dispatch(getSlideIndex(data.val()))
		})
    return db.ref(`/lessons/${id}`).once('value')
			.then(lesson => {

				dispatch(getLesson(lesson.val().title))
				return db.ref(`/lessons/${id}/slides`).once('value')
			})
			.then((slides)=>{
				slides.forEach((slide)=>{
					db.ref(`slides/${slide.key}`).on('value', (data)=>{
						const slideData = data.val()
						const slideId = data.key
						const slideObject = {
							id: slideId,
							...slideData
						}
						dispatch(getSlide(slideObject));
					})
			})
		});
	}
}
