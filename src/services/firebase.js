import { initializeApp } from "firebase/app";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSingOut, getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDwp3rg5I-MSLoLxyyTUJfVWB6pWIzD3Ik",
    authDomain: "clothing-store-c681d.firebaseapp.com",
    projectId: "clothing-store-c681d",
    databaseURL: "https://clothing-store-c681d-default-rtdb.firebaseio.com",
    
    storageBucket: "clothing-store-c681d.appspot.com",
    messagingSenderId: "397122263482",
    appId: "1:397122263482:web:da4980699cac788a76a583",
    measurementId: "G-J5ZSPM4Z8W"
};

initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getDatabase();

export const singUp = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password)
}

export const login = async (email, password) => {
    debugger
    await signInWithEmailAndPassword(auth, email, password)
}

export const singOut = async () => {
    await firebaseSingOut(auth)
}
