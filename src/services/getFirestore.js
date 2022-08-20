import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBFsBgugaxRM39grxzXgyLWEBu1Kk9vzog",
    authDomain: "company-name-325822.firebaseapp.com",
    projectId: "company-name-325822",
    storageBucket: "company-name-325822.appspot.com",
    messagingSenderId: "667879865209",
    appId: "1:667879865209:web:a00ed8648fea9ecfb4cda8",
    measurementId: "G-KWG7KJCPYM"
  };

  const app = firebase.initializeApp(firebaseConfig);

  export function getFirestore(){
      return firebase.firestore(app)
  }