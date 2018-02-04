import {db} from '../../firebase'
import * as actions from './actionTypes';


export const userObject = authUser =>  ({type: actions.USER_STATUS, authUser})
//export const userRole = role =>  ({type: actions.USER_ROLE, role})
export function userStatus (user) {
  return function thunk (dispatch) {
		if(!user) return dispatch(userObject(user))
    db.ref(`users/${user.uid}`).once('value')
    .then(userdata =>{
      const {role,name} = userdata.val()
      const {uid, email} = user
      fetch("https://boomerang-server-rtc.herokuapp.com/room/bamboo")
        .then(data => data.json())
        .then(data => {
          const {apiKey, sessionId, token} = data
          const newObj = {name,role, uid, email, apiKey, sessionId, token}
          dispatch(userObject(newObj))
        })
    })
		}
	}
