import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyA9OrKDQ0XPtM3rUvqLVP_Lj1nycZYtkzg",
    authDomain: "capstone-project-1710.firebaseapp.com",
    databaseURL: "https://capstone-project-1710.firebaseio.com",
    projectId: "capstone-project-1710",
    storageBucket: "",
    messagingSenderId: "276934583949"
  };


if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();
// const auth = firebase.auth();

export {
  db,
  auth
};
