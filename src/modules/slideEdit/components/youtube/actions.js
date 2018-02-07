import {db} from '../../../../firebase'

export const selectYoutube = (slideId, videoId, bool, YTObj) => {
	if(!videoId){
		return db.ref(`/slides/${slideId}/youtubeVideo`).set(false)
	}
	db.ref(`/slides/${slideId}/youtubeVideo`).update({
		videoId,
		YTObj,
		show: bool
	})
}
