// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyALeyWOaIUU3lHaL8-hIj8kZExbIWez5Tc',

  authDomain: 'weekook-a7786.firebaseapp.com',

  projectId: 'weekook-a7786',

  storageBucket: 'weekook-a7786.appspot.com',

  messagingSenderId: '514358676211',

  appId: '1:514358676211:web:443a6c080883d81e188586',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
