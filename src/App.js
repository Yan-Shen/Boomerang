import React, { Component } from 'react';
import {AppBar, Paper} from 'material-ui';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Container from './components/Container.js'
//import SlideEdit from './components/Container.js'

import logo from './logo.svg';
import './App.css';

import modules from './modules'

//IMPORT firebase
import {db} from './firebase'
//const {db} = firebase
//import {init as firebaseInit} from './firebase/firebase'

const {slideEdit} = modules
const {SlideEdit} = slideEdit.containers


//const rootReference = db.ref().child('testObject')
//console.log(rootReference)

class App extends Component {
  componentDidMount(){
    const listener = db.ref().child('testObject')
    listener.on('value', snap => console.log(snap.val()))
  }
  render() {
    return (
      <div className="App">
        <AppBar iconClassNameRight="muidocs-icon-navigation-expand-more"/>
        <Router>
          <div>
            <Route
              exact path={'/'}
              render={() => <SlideEdit />}
            />
            <Route
              exact path={'/instructor'}
              component={() => <Container />}
            />
          </div>
       </Router>
      </div>
    );
  }
}

export default App;
