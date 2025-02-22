import {
  collection,
  query,
  storage,
  getDownloadURL,
  ref,
  where,
  getDocs,
  db,
  auth,
  getDoc,
  doc,
  setDoc,
  onSnapshot,
  updateDoc,
  arrayUnion,
} from '@/db/firebase.js'
// import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { isProfane, containsProfanities } from 'no-profanity'
import { defineStore } from 'pinia'
import CryptoJS from 'crypto-js'
export const useChatStore = defineStore('Chat', {
  // arrow function recommended for full type inference
  state: () => ({
    loading: false,
    secretKey: 'a1eb884beb21593c4147e975695deb38b10c67d3f6167d179f970b7237df69ef',
    error: '',
    loadingUpdateImg: false,
    loadingDeleteImg: false,
    participantName: '',
    email: '',
    password: '',
    message: {},
    text: '',
    firstName: '',
    lastName: '',
    profileImg: '',
    therapist: {},
    therapistImg: '',
    messages: [],
    anonMessages: [],
    chats: [],
    userInfo: {},
  }),
  getters: {},
  actions: {
    encryptMessage(message) {
      return CryptoJS.AES.encrypt(message, this.secretKey).toString()
    },
    decryptMessage(ciphertext) {
      const bytes = CryptoJS.AES.decrypt(ciphertext, this.secretKey)
      return bytes.toString(CryptoJS.enc.Utf8)
    },
    sendAnonMessage() {
      this.anonMessages = []
    },
    createChat(chatId) {
      const studentId = chatId.slice(28)
      const therapistId = chatId.slice(0, 28)
      setDoc(doc(db, 'chats', chatId), {
        studentId: studentId,
        therapistId: therapistId,
        messages: [],
      }).then(() => {
        onSnapshot(doc(db, 'chats', chatId), (doc) => {
          const chat = doc.data()
          this.messages = chat?.messages
        })
      })
    },
    async getChat(chatId) {
      const studentId = chatId.slice(28)
      const therapistId = chatId.slice(0, 28)
      const studentRef = doc(db, 'users', studentId)
      const chatRef = doc(db, 'chats', chatId)
      const therapistRef = doc(db, 'therapists', therapistId)
      const studentSnap = await getDoc(studentRef)
      const therapistSnap = await getDoc(therapistRef)
      const chatSnap = await getDoc(chatRef)
      if (studentSnap.exists() && therapistSnap.exists()) {
        if (chatSnap.exists()) {
          onSnapshot(doc(db, 'chats', chatId), (doc) => {
            const chat = doc.data()
            this.messages = chat?.messages
          })
        } else {
          this.createChat(chatId)
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Chat ID',
          text: 'This chat ID is incorrect. You will be redirected home.',
          confirmButtonText: 'Go Home',
          confirmButtonColor: '#4CAF50', // Green button
          allowOutsideClick: false, // Prevent clicking outside to close
          allowEscapeKey: false, // Prevent closing with Escape key
        })
          .then(() => {
            window.location.href = '/' // Redirect on confirm
          })
          .catch(() => {
            window.location.href = '/' // Redirect if modal is closed in any way
          })
      }
    },
    getChatParticipant(chatId, user) {
      const studentId = chatId.slice(28)
      const therapistId = chatId.slice(0, 28)
      if (user.uid === studentId) {
        onSnapshot(doc(db, 'therapists', therapistId), (doc) => {
          const name = doc.data()?.name
          console.log(`${name?.firstName} ${name?.lastName} `)
          this.participantName = `${name?.firstName} ${name?.lastName} `
        })
      } else {
        onSnapshot(doc(db, 'users', studentId), (doc) => {
          const name = doc.data()?.name
          console.log(`${name?.firstName} ${name?.lastName} `)
          this.participantName = `${name?.firstName} ${name?.lastName} `
        })
      }
    },
    async sendMessage(chatId, text) {
      const user = auth.currentUser
      const encrypt = this.encryptMessage(text)

      console.log(this.message)
      const decypher = this.decryptMessage(this.encryptMessage(text))
      console.log('Decrypted message:', decypher)
      console.log(containsProfanities(decypher))

      if (isProfane(decypher)) {
        console.log(decypher)
        const profanities = containsProfanities(decypher).slice(0, 2)
        const extraProfanityWord = profanities.length > 1 ? `, ${profanities[1].word}, etc.` : ''
        this.message.text = text
        Swal.fire({
          text: `We noticed some words in your message that may not be appropriate for this space (eg.${profanities[0].word} ${extraProfanityWord}). Please rephrase and try again.`,
          icon: 'warning',
          confirmButtonColor: '#a6e8e0',
        })
      } else {
        this.text = ''
        this.message = { senderId: user.uid, text: encrypt, timestamp: new Date() }
        console.log(this.message)
        const chatRef = doc(db, 'chats', chatId)
        await updateDoc(chatRef, {
          messages: arrayUnion(this.message),
        })
      }
    },
    async chatHistory() {
      this.chats = []
      const user = auth.currentUser
      // const therapistRef = doc(db, 'therapists', user.uid)
      const studentRef = doc(db, 'users', user.uid)
      const studentSnap = await getDoc(studentRef)
      // const therapistSnap = await getDoc(therapistRef)
      const chatsRef = collection(db, 'chats')

      if (studentSnap.exists()) {
        const q = query(chatsRef, where('studentId', '==', user.uid))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((document) => {
          const therapistId = document.data().therapistId
          onSnapshot(doc(db, 'therapists', therapistId), (doc) => {
            this.therapist = doc.data()
            console.log(this.therapist)
            if (this.therapist.updatedProfileImage) {
              this.updatedProfileImage = true
              getDownloadURL(ref(storage, 'profile/' + therapistId))
                .then((url) => {
                  this.therapistImg = url
                })
                .catch((error) => {})
            } else {
              this.chats.push({
                id: document.id,
                ...document.data(),
                img: this.therapistImg,
                user: { ...this.therapist },
              })
            }
          })
        })
      } else {
        const q = query(chatsRef, where('therapistId', '==', user.uid))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
          this.chats.push({
            id: doc.id,
            ...doc.data(),
          })
        })
      }
    },
  },
})
