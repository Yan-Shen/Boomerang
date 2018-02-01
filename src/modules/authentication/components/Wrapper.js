import React, { Component } from 'react';
import {auth,db} from '../../../firebase'
class Wrapper extends Component {
	testSignUp(){
		console.log('clicked')
		auth.createUserWithEmailAndPassword("shaunoff2@gmail.com", "woodbird966")
		.then(user => db.ref(`users/${user.uid}`).set({role: 'teacher'}))
	}
	testSignInTeacher(){
		console.log('clicked')
		auth.signInWithEmailAndPassword("shaunoff2@gmail.com", "woodbird966")
		.then((data)=> console.log(data))
	}
	testSignInStudent(){
		console.log('clicked')
		auth.signInWithEmailAndPassword("shaunoff@gmail.com", "woodbird966")
		.then((data)=> console.log(data))
	}
	testSignOut(){
		console.log('clicked')
		auth.signOut();
	}
	render() {

		return (
			<div>
				{/* <button onClick={this.testSignUp}>sign up</button> */}
				<h1> logged out need to sign in </h1>
				<button onClick={this.testSignInTeacher}>Teacher sign in</button>
				<button onClick={this.testSignInStudent}>Student sign in</button>
				<button onClick={this.testSignOut}>log out</button>
			</div>

		);
	}

}

export default Wrapper;
