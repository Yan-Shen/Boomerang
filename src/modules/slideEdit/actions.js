import {db} from '../../firebase'
import * as actions from './actionTypes';

export const changePanel = () => ({type: actions.CHANGE_PANEL})
// export const getSelectedTools = tools =>  ({type: actions.GET_SELECTED_TOOLS, tools})
export const getSubscribers = (session,subscribers) => ({type: actions.GET_CAMERA_SUBSCRIBERS, session, subscribers})
export const getStudents = students => ({type: actions.GET_ONLINE_USERS, students})
export const getLesson = lesson =>  ({type: actions.GET_LESSON, lesson})
export const getSlide = slide =>  ({type: actions.GET_SLIDE, slide})
export const getSlideIndex = index =>  ({type: actions.GET_SLIDE_INDEX, index})
export const removeSlide = slideId =>  ({type: actions.DELETE_SLIDE, slideId})
export const changeSlideAction = index => ({type: actions.CHANGE_SLIDE, index})
export const activeStudents = students => ({type: actions.GET_ACTIVE_STUDENTS, students})
export const unmountLesson = () => ({type: actions.UNMOUNT_LESSON})
export const addEmotion = (emotion) => ({type: actions.ADD_TEACHER_EMOTION, emotion})
export const getWhiteboard = bool => ({type: actions.TOGGLE_WHITEBOARD, bool})
export const updateSlideData = data =>  ({type: actions.UPDATE_SLIDE, data})
export const switchYoutube = bool =>  ({type: actions.TOGGLE_YOUTUBE, bool})
// export const changeSlide = index => ({type: actions.CHANGE_SLIDE, index})
export const getDisplay = displayObject => ({type: actions.GET_DISPLAYOBJECT, displayObject})
export const getTemplates= templates =>  ({type: actions.GET_TEMPLATES, templates})
export const removeTemplate = templateId =>  ({type: actions.DELETE_TEMPLATE, templateId})

// export function selectedTools (id) {
//   return function thunk (dispatch) {
//     db.ref(`selectedTools/${id}`).on('value', (data)=>{
//       dispatch(getSelectedTools(data.val()))
//     })
//   }
// }



export const changeSlide = (index, id) =>  {
	return function thunk (dispatch) {
		db.ref(`lessons/${id}/currentSlide`).set(index)
		//dispatch(getToolsDispatcher(id))
		dispatch(changeSlideAction(index))
	}
}



export const toggleWhiteboard = (id, status) =>  {
	const sendStatus = status === 'true' ? "false" : "true"
	return function thunk (dispatch) {
		db.ref().child(`lessons/${id}/whiteboard`).set('true')
	}
}

export const toggleActiveStudent = (lessonId, studentId,bool) =>  {
	return function thunk (dispatch) {
		db.ref().child(`lessons/${lessonId}/activeStudents/${studentId}`).once("value")
		.then((data)=>{
			if(data.val() === null){
				db.ref().child(`lessons/${lessonId}/activeStudents/${studentId}`).set(true)
			}
			else{
				db.ref().child(`lessons/${lessonId}/activeStudents/${studentId}`).remove()
			}
		})
	}
}

export const toggleYoutube = (id,bool) =>  {
	return function thunk (dispatch) {
		console.log(bool)
		db.ref(`slides/${id}/youtubeVideo`).update({show: bool})
	}
}

export const changeYouTube = (id, videoId, YTObj) =>  {
	return function thunk (dispatch) {
		db.ref().child(`slides/${id}/youtubeVideo/videoId`).set(videoId)
		.then(() => {
			if (YTObj) {
				db.ref().child(`slides/${id}/youtubeVideo/YTObj`).set(YTObj)
			}
		})
	}
}

export function fetchLesson (id) {
  return function thunk (dispatch) {
			db.ref(`lessons/${id}/whiteboard`).set('false').then(()=>{
				db.ref(`lessons/${id}/whiteboard`).on('value', data =>{
					console.log('whiteboard triggered')
					dispatch(getWhiteboard(data.val()))
				})
			})
			db.ref(`lessons/${id}/youtubeVideo/show`).on('value', (data)=>{
				console.log('agggeggegegegeg emotionb',data.val())
				dispatch(switchYoutube(data.val()))
			})
			db.ref(`lessons/${id}/emotions`).set(true)
			db.ref(`lessons/${id}/emotions`).limitToLast(1).on('child_added', (data)=>{
				console.log('agggeggegegegeg emotionb')
				dispatch(addEmotion(data.val()))
			})

		db.ref(`lessons/${id}/activeStudents`).set(true)
		.then(()=>{
			db.ref(`lessons/${id}/activeStudents`).on('value', (data)=>{
				const dataObj = data.val()
				const activeArr = []
				for(var key in dataObj){
					activeArr.push(key)
				}
				dispatch(activeStudents(activeArr))
			})
		})

		db.ref(`lessons/${id}/currentSlide`).on('value', (data)=>{
			dispatch(getSlideIndex(data.val()))
		})

		db.ref('users/').orderByChild('onlineState')
    .equalTo(true)
    .on('value', (data)=>{
			const dataObj = data.val()
			const studentArr = []
			for(var key in dataObj){

				if(dataObj[key].role === "student") {
					var student = dataObj[key]
					student.id = key
					studentArr.push(student)
				}
			}
			dispatch(getStudents(studentArr))
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
					db.ref(`/studentDisplay/${slide.key}/Choice`).set(true)
					db.ref(`/studentDisplay/${slide.key}/Repl`).set(true)
					db.ref(`studentDisplay/${slide.key}`).on('value', (data)=>{
						const displayData = data.val()
						const slideId = data.key
						const displayObject = {
							id: slideId,
							...displayData
						}
						dispatch(getDisplay(displayObject));
					})

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

export function deleteSlide (slideId, lessonId, index) {
	return function thunk (dispatch) {
		return db.ref(`/lessons/${lessonId}/slides/${slideId}`).remove()
			.then(()=> {
				return db.ref(`/slides/${slideId}`).remove()
			})
			.then(()=>{
				db.ref(`/selectedTools/${slideId}`).remove()
			})
			.then(()=>{
				db.ref(`/studentDisplay/${slideId}`).remove()
			})
			.then(()=>{
				dispatch(removeSlide(slideId))
				dispatch(changeSlide(index, lessonId))
			})
	}
}

export function deleteTemplate (templateId) {
	return function thunk (dispatch) {
		return db.ref(`/templates/${templateId}`).remove()
			.then(()=>{
				dispatch(removeTemplate(templateId))
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

export function addTemplate (index, lessonId, canvasJSON) {
  return function thunk (dispatch) {
		db.ref().child('templates').push(canvasJSON)
			.then(slideKey => {
				db.ref().child(`templates/${slideKey.key}`).set(canvasJSON)
				return slideKey
			})
	}
}

export function updateSlide (id,data) {
  return function thunk (dispatch) {
		db.ref().child(`slides/${id}`).set(data)
		.then(()=>console.log('updateSlide'))
	}
}
