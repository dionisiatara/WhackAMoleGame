import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDXJdzMY0KryGeyLzKU2IviS09dfXLsczQ",
    authDomain: "whack-a-mole-reactjs.firebaseapp.com",
    databaseURL: "https://whack-a-mole-reactjs.firebaseio.com",
    projectId: "whack-a-mole-reactjs",
    storageBucket: "whack-a-mole-reactjs.appspot.com",
    messagingSenderId: "394560249481"
  };
  firebase.initializeApp(config);

export default firebase;