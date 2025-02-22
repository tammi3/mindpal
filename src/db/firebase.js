import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  getDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  Timestamp,
  getDocs,
  arrayUnion,
  arrayRemove,
  getAggregateFromServer,
  orderBy,
  sum,
  runTransaction,
} from 'firebase/firestore'
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  linkWithPopup,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
  sendEmailVerification,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth'
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'

import { app } from '@/config/firebase'
app
const db = getFirestore()
const auth = getAuth()
const storage = getStorage()
const provider = new GoogleAuthProvider()

export {
  auth,
  db,
  provider,
  onSnapshot,
  doc,
  setDoc,
  linkWithPopup,
  updateDoc,
  storage,
  addDoc,
  getDoc,
  getDocs,
  uploadBytes,
  deleteObject,
  runTransaction,
  getDownloadURL,
  sendEmailVerification,
  ref,
  query,
  where,
  deleteUser,
  orderBy,
  deleteDoc,
  collection,
  Timestamp,
  EmailAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  getAggregateFromServer,
  sum,
  arrayUnion,
  arrayRemove,
  reauthenticateWithCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
}
