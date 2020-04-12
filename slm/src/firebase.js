import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDWNciehJ6ght_XMumNWCc031Am1B5x_mY",
    authDomain: "support-lecture-machine-ba851.firebaseapp.com",
    databaseURL: "https://support-lecture-machine-ba851.firebaseio.com",
    projectId: "support-lecture-machine-ba851",
    storageBucket: "support-lecture-machine-ba851.appspot.com",
    messagingSenderId: "275615370247",
    appId: "1:275615370247:web:2cdea8bf4ea628c9916ea2"
};
  
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebaseApp.firestore().settings({ timestampsInSnapshots: true });
var database = firebase.firestore();
export default database;