import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDSzsGQKsYg58aGvwWGEEkdkEQZEBCXGQg",
    authDomain: "skilledge-ai.firebaseapp.com",
    projectId: "skilledge-ai",
    storageBucket: "skilledge-ai.appspot.com",
    messagingSenderId: "377027816034",
    appId: "1:377027816034:web:698ce20c3912d020b2ff3b",
    measurementId: "G-T1EEEW8QG4"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

export { db };
