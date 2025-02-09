import { collection, addDoc, db } from '@/db/firebase.js'
// import { useRouter } from 'vue-router'
// import Swal from 'sweetalert2'
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
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    profileImg: '',
    message: '',
    messages: [],
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
    sendAnonMessage() {},
    async createChat(senderId, recieverId) {
      const docRef = await addDoc(collection(db, 'chats'), {
        chat_id: senderId + recieverId,
        last_updated: '2024-02-02T12:00:00Z',
        participants: [senderId, recieverId],
      })
    },
    async sendMessage(message, senderId, recieverId) {
      const docRef = await addDoc(collection(db, 'messages'), {
        chat_id: senderId + recieverId,
        last_updated: '2024-02-02T12:00:00Z',
        messages: [
          {
            sender_id: senderId,
            receiver_id: recieverId,
            content: message,
            timestamp: '2024-02-02T12:00:00Z',
            message_type: 'text',
            is_read: false,
          },
        ],
      })
    },
  },
})
