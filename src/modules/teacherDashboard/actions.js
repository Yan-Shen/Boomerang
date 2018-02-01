import {db} from '../../firebase'
import * as actions from './actionTypes';


export const getLessons = lessons =>  ({type: actions.GET_LESSONS, lessons})
export const removeLesson = id =>  ({type: actions.DELETE_LESSON, id})

export function fetchLessons (id) {
  return function thunk (dispatch) {
		db.ref(`lessons/`).on('value', data => {
			var arr = []
			data.forEach(lesson => {
				var obj = {...lesson.val(), id:lesson.key}
				arr.push(obj)
			})
			dispatch(getLessons(arr))
		})
	}
}


export function createLesson (title) {
  return function thunk (dispatch) {
		const timeStamp = new Date().getTime()
		const emptyLesson = {
			title,
			currentSlide: 0,
			slides: true,
			created: timeStamp
		}
		const emptySlide = {
			version: "2.0.0-rc.4",
			background: 'white'
		}
		let lessonKey

		//db.ref().child('slides').push(emptySlide)
		db.ref(`lessons/`).push(emptyLesson)
			.then(data => {
				lessonKey = data.key
				return db.ref().child('slides').push(emptySlide)
			})
			.then(slideKey => {
				db.ref().child(`lessons/${lessonKey}/slides/${slideKey.key}`).set(true)
				db.ref().child(`selectedTools/${slideKey.key}`).set(true)
				db.ref().child(`studentDisplay/${slideKey.key}`).set(true)
				return slideKey
		})
	}
}




export function deleteLesson (LessonId) {
	return function thunk (dispatch) {
		return db.ref(`/lessons/${LessonId}/slides/`).once('value')
			.then((data)=> {
				return data.forEach(slide =>{
					db.ref(`/slides/${slide.key}`).remove()
          db.ref(`/selectedTools/${slide.key}`).remove()
				})
			})
			.then(()=>db.ref(`/lessons/${LessonId}`).remove())
			// .then(()=> dispatch(removeLesson(LessonId)))
	}
}
