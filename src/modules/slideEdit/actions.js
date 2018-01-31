import {db} from '../../firebase'
import * as actions from './actionTypes';
// import {getToolsDispatcher} from '../../store'

export function test(){}
export const getLesson = lesson =>  ({type: actions.GET_LESSON, lesson})
export const getSlide = slide =>  ({type: actions.GET_SLIDE, slide})
export const getSlideIndex = index =>  ({type: actions.GET_SLIDE_INDEX, index})
export const removeSlide = slideId =>  ({type: actions.DELETE_SLIDE, slideId})
export const changeSlideAction = index => ({type: actions.CHANGE_SLIDE, index})
export const unmountLesson = () => ({type: actions.UNMOUNT_LESSON})
// export const changeSlide = index => ({type: actions.CHANGE_SLIDE, index})



export const changeSlide = (index, id) =>  {
	return function thunk (dispatch) {
		db.ref().child(`lessons/${id}/currentSlide`).set(index)
		// dispatch(getToolsDispatcher(id))
		dispatch(changeSlideAction(index))
	}
}


export const updateSlideData = data =>  ({type: actions.UPDATE_SLIDE, data})

export function fetchLesson (id) {
  return function thunk (dispatch) {
		/// Keep track of current slide
		db.ref(`lessons/${id}/currentSlide`).on('value', (data)=>{
			dispatch(getSlideIndex(data.val()))
		})
    return db.ref(`/lessons/${id}`).once('value')
			.then(lesson => {
				lesson = lesson.val()
				lesson.id = id
				dispatch(getLesson(lesson))
				return db.ref(`/lessons/${id}/slides`).once('value')
			})
			.then((slides)=>{
				slides.forEach((slide)=>{
					db.ref(`slides/${slide.key}`).on('value', (data)=>{
						if(data.val() === null){
							return dispatch(removeSlide(data.key))
						}
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

export function deleteSlide (slideId,lessonId,index) {
	return function thunk (dispatch) {
		return db.ref(`/lessons/${lessonId}/slides/${slideId}`).remove()
			.then(()=> {
				return db.ref(`/slides/${slideId}`).remove()

			})
			.then(()=>{
				db.ref(`/selectedTools/${slideId}`).remove()
			})
			.then(()=>{
				dispatch(removeSlide(slideId))
				dispatch(changeSlide(index, lessonId))
			})
	}
}


export function addSlide (index, lessonId) {
  return function thunk (dispatch) {
		const emptySlide = {
			version: "2.0.0-rc.4",
			background: 'white'
		}
		db.ref().child('slides').push(emptySlide)
			.then(slideKey => {
				db.ref().child(`lessons/${lessonId}/slides/${slideKey.key}`).set(true)
				db.ref().child(`selectedTools/${slideKey.key}`).set(true)
				return slideKey
			})
			.then((slideKey)=>{
				db.ref().child(`slides/${slideKey.key}`).on('value', (data)=>{
					if(data.val() === null){
						return dispatch(removeSlide(data.key))
					}
					const slideData = data.val()
					const slideId = data.key
					const slideObject = {
						id: slideId,
						...slideData
					}
					dispatch(getSlide(slideObject))
					dispatch(changeSlide(index, lessonId));
				})
			})
	}
}

export function updateSlide (id,data) {
  return function thunk (dispatch) {
		db.ref().child(`slides/${id}`).set(data)
		.then(()=>console.log('updateSlide'))
	}
}
