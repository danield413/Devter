import firebase from "firebase/app"
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCkDk0daFyevkMXODs8WoGjVB-b8KIcPgE",
  authDomain: "devter-34a73.firebaseapp.com",
  projectId: "devter-34a73",
  storageBucket: "devter-34a73.appspot.com",
  messagingSenderId: "996780250762",
  appId: "1:996780250762:web:8fe0566b4a783ea3b83f73",
  measurementId: "G-7VXBNCQZNY",
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
} else {
  firebase.app() // si está iniciliazada usar esta
}

const mapUserFromFirebaseAuthToUser = (user) => {
  const { photoURL, email, displayName } = user

  return {
    avatar: photoURL,
    username: displayName,
    email,
  }
}

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null
    onChange(normalizedUser)
  })
}

export const loginWithGitHub = () => {
  // auth provider Github
  const githubProvider = new firebase.auth.GithubAuthProvider()
  return firebase.auth().signInWithPopup(githubProvider)
}
