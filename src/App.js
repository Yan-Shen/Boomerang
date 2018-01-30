import React, { Component } from 'react';
import {AppBar, Paper} from 'material-ui';
import {BrowserRouter as Router, Route, withRouter} from 'react-router-dom';
// import Container from './components/Container.js'
//import SlideEdit from './components/Container.js'

import logo from './logo.svg';
import './App.css';

import modules from './modules'

//IMPORT firebase
import {db} from './firebase'
//const {db} = firebase
//import {init as firebaseInit} from './firebase/firebase'
import {lightBlue500,teal500} from 'material-ui/styles/colors';

const {slideEdit, teacherDashboard, studentDashboard} = modules
const {SlideEdit} = slideEdit.containers
const {StudentDashboard} = studentDashboard.containers
const {TeacherDashboard} = teacherDashboard.containers
//const rootReference = db.ref().child('testObject')
//console.log(rootReference)

class App extends Component {

  render() {
    const student = this.props.location.pathname.indexOf('student') >= 0
    return (
      <div className="App">
        <AppBar style={{background: student ? lightBlue500: teal500}} zDepth={0} iconClassNameRight="muidocs-icon-navigation-expand-more"/>
          <div>
            <Route
              exact path={'/'}
              render={() => <SlideEdit />}
            />
            <Route
              path={'/teacher'}
              component={TeacherDashboard}
            />
            <Route
              path={'/student'}
              component={StudentDashboard}
            />
          </div>
      </div>
    );
  }
}

export default withRouter(App);
