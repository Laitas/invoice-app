import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyCzLClGb-CIz9MvhV7tFiav14oF0JSxZMw",
  authDomain: "invoice-app-3876c.firebaseapp.com",
  projectId: "invoice-app-3876c",
  storageBucket: "invoice-app-3876c.appspot.com",
  messagingSenderId: "277824855187",
  appId: "1:277824855187:web:b53f3a0f93dec0b0748166",
};


const app = initializeApp(firebaseConfig);
const auth = getAuth()
const db = getFirestore(app)
const storage = getStorage()
const provider = new GoogleAuthProvider();

export { db,auth, provider, storage }