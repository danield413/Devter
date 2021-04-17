import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/storage"
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

const db = firebase.firestore()

const mapUserFromFirebaseAuthToUser = (user) => {
  const { photoURL, email, displayName, uid } = user

  return {
    avatar: photoURL,
    userName: displayName,
    email,
    uid,
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

export const addDevit = ({ avatar, content, userId, imageURL, userName }) => {
  return db.collection("devits").add({
    avatar,
    content,
    imageURL,
    userId,
    userName,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  })
}

export const fetchLatestDevits = () => {
  return db
    .collection("devits")
    .orderBy("createdAt", "desc")
    .get()
    .then(({ docs }) => {
      return docs.map((doc) => {
        const data = doc.data()
        const id = doc.id
        const { createdAt } = data

        return {
          ...data,
          id,
          createdAt: +createdAt.toDate(),
        }
      })
    })
}

export const uploadImage = (file) => {
  const ref = firebase.storage().ref(`/images/${file.name}`)
  const task = ref.put(file)
  return task
}
