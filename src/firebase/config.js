import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAZFizqFelggWcsM2--N2bNud7wcRUVonY",
    authDomain: "financetracker-4d378.firebaseapp.com",
    projectId: "financetracker-4d378",
    storageBucket: "financetracker-4d378.appspot.com",
    messagingSenderId: "512860986407",
    appId: "1:512860986407:web:907af563fda36a2e3c4202"
};

firebase.initializeApp(firebaseConfig)

const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const timestamp = firebase.firestore.Timestamp


export { projectFirestore, projectAuth, timestamp }