import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCPQkOk-kBYOY_9fn0NxuK_UM0G9vGfD-Y",
  authDomain: "twitter-clone-54539.firebaseapp.com",
  projectId: "twitter-clone-54539",
  storageBucket: "twitter-clone-54539.appspot.com",
  messagingSenderId: "749874187128",
  appId: "1:749874187128:web:d73952add8558a7453d68d",
  measurementId: "G-4VNZX2TFYY",
};
const app=!getApps().length ?initializeApp(firebaseConfig) : getApp()

const db=getFirestore()

const storage=getStorage()


export default app
export {db,storage}