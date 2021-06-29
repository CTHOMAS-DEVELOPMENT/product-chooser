import firebase from "firebase";
import dbConfig from "./config";

const firebaseApp = firebase.initializeApp(dbConfig)
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };