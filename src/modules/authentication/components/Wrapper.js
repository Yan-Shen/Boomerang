import React, { Component } from 'react';
import {auth,db} from '../../../firebase'
import {Card,TextField,RaisedButton} from 'material-ui';



class Wrapper extends Component {
	constructor(props) {
		super(props);
		this.state = {
			login: true,
			email: "",
			password: ''
		};
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	componentDidMount(){
		document.getElementById("emailField").focus();
	}
	handleSubmit(){
		if(this.state.login){
			auth.signInWithEmailAndPassword(this.state.email, this.state.password)
			.then((data)=> console.log(data))
		}
		else if(!this.state.login){
			auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
			.then(user => db.ref(`users/${user.uid}`).set({role: 'student'}))
		}
	}
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
			<div style={{flexDirection: 'column',alignItems: 'center', justifyContent: 'space-between', display: 'flex', background: '#eee', height: '100vh'}}>
				{/* <button onClick={this.testSignUp}>sign up</button> */}
				<div style={{margin: "60px", fontWeight: 700, fontSize: "60px", color: "#6bada7"}}>Boomerang</div>
				<Card className="animated fadeInUp" style={{width: '500px', height: '400px', display: 'flex', justifyContent: 'center'}}>
						<h2 style={{fontSize: "26px", fontWeight: '700'}}> {this.state.login ? "Login" : "Sign Up"}</h2>
						<TextField id="emailField" onChange={(e,val)=> this.setState({email: val})} floatingLabelStyle={{fontSize: '22px'}} style={{margin: "10px", width: '90%'}} floatingLabelText="Email"/>
						<TextField onChange={(e,val)=> this.setState({password: val})} type="password" floatingLabelStyle={{fontSize: '22px'}} style={{margin: "10px", width: '90%'}} floatingLabelText="Password"/>
					<RaisedButton  onClick={this.handleSubmit} label={this.state.login ? "Login" : "Sign Up"} primary={true} style={{marginTop: "20px"}} labelStyle={{fontWeight: '700', fontSize: '22px'}}/>
					{this.state.login && <p style={{fontSize: "20px"}}>If you are not a member, you can sign up <span  style={{fontWeight: "600", color: '#6bada7'}} onClick={()=>this.setState({login: false})}>HERE</span></p>}
					{!this.state.login && <p style={{fontSize: "20px"}}>If you are already a member, login <span  style={{fontWeight: "600", color: '#6bada7'}} onClick={()=>this.setState({login: true})}>HERE</span></p>}
				</Card>
				<div style={{height: "30%"}}></div>

			</div>

		);
	}

}

export default Wrapper;
