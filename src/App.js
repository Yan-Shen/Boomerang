import React, { Component } from 'react';
import {AppBar, FlatButton} from 'material-ui';
import { Route, withRouter} from 'react-router-dom';

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {userStatus} from './modules/authentication/actions'


import './App.css';

import modules from './modules'

//IMPORT firebase
import {db,auth} from './firebase'
//const {db} = firebase
//import {init as firebaseInit} from './firebase/firebase'
import {lightBlue500,teal500} from 'material-ui/styles/colors';

const {teacherDashboard, studentDashboard, authentication} = modules
const {StudentDashboard} = studentDashboard.containers
const {TeacherDashboard} = teacherDashboard.containers
const {Authentication} = authentication.containers
//const rootReference = db.ref().child('testObject')
//console.log(rootReference)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: null
    };
  }
  componentDidMount() {
    auth.onAuthStateChanged(authUser => {
      if(authUser){
        const user = db.ref(`users/${authUser.uid}`)
        user.update({
           onlineState: true,
           status: "I'm online."
        });
        user.onDisconnect().update({
          onlineState: false,
          status: "I'm offline."
        })
        this.props.userStatus(authUser)

      }
      else {
        this.props.userStatus(authUser)
      }
    })
  }
  shouldComponentUpdate(nextProps){
    if(nextProps.user !== this.props.user) {
      if(nextProps.user) nextProps.history.push(`/${nextProps.user.role}`)
      else nextProps.history.push(`/`)
    }
    return true
  }
  handleLogout(){
    db.ref(`users/${auth.currentUser.uid}`)
    .update({
      onlineState: false,
      status: "I'm offline."
    })
    .then(()=> auth.signOut())

  }
  render() {
    const student = this.props.location.pathname.indexOf('student') >= 0
    return (
      <div className="App">
        {this.props.user ?
          <div>
            <AppBar style={{background: student ? lightBlue500: teal500}} zDepth={0} iconElementRight={this.props.user && <FlatButton onClick={this.handleLogout} label="Logout" />}/>
            <Route
              path={'/teacher'}
              component={TeacherDashboard}
            />
            <Route
              path={'/student'}
              component={StudentDashboard}
            />
          </div>
          :
          <Route
            exact path={'/'}
            component = {Authentication}
          />
        }
      </div>
    );
  }
}
function mapStateToProps(state){
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({userStatus}, dispatch);
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
