import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDSzsGQKsYg58aGvwWGEEkdkEQZEBCXGQg",
  authDomain: "skilledge-ai.firebaseapp.com",
  projectId: "skilledge-ai",
  storageBucket: "skilledge-ai.appspot.com",
  messagingSenderId: "377027816034",
  appId: "1:377027816034:web:698ce20c3912d020b2ff3b",
  measurementId: "G-T1EEEW8QG4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app); 
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { firestore,app,db,storage };