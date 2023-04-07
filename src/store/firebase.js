// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDDzMiLiHvTW5KF7iojpQeqt4aBkzSraqU',
  authDomain: 'chat-app-c8b22.firebaseapp.com',
  projectId: 'chat-app-c8b22',
  storageBucket: 'chat-app-c8b22.appspot.com',
  messagingSenderId: '687557316305',
  appId: '1:687557316305:web:a59043d3ed15914d5f3ff0'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth()
