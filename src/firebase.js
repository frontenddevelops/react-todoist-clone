import firebase from "firebase/app";
import 'firebase/firestore'

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyDC4gFeRnu4MDEtZxmgLJVb1eRQAf-N3KI",
    authDomain: "todoist-clone-73768.firebaseapp.com",
    databaseURL: "https://todoist-clone-73768.firebaseio.com",
    projectId: "todoist-clone-73768",
    storageBucket: "todoist-clone-73768.appspot.com",
    messagingSenderId: "287218263361",
    appId: "1:287218263361:web:440f8d7ec861437c"
});

export {firebaseConfig as firebase}
