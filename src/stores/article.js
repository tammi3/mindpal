import {
  collection,
  addDoc,
  db,
  doc,
  onSnapshot,
  query,
  getDocs,
  where,
  getDownloadURL,
  uploadBytes,
  storage,
  updateDoc,
  arrayUnion,
  arrayRemove,
  ref,
} from '@/db/firebase.js'
// import { useRouter } from 'vue-router'
// import Swal from 'sweetalert2'
import { defineStore } from 'pinia'
// import CryptoJS from 'crypto-js'
export const useArticleStore = defineStore('Article', {
  // arrow function recommended for full type inference
  state: () => ({
    tags: [],
    search: '',
    articles: [],
    article: {},
  }),
  actions: {
    getArticleTags() {
      const unsub = onSnapshot(doc(db, 'categorisers', 'articles'), (doc) => {
        this.tags = doc.data().tags
      })
    },
    async getArticles(filter) {
      if (filter == 'All') {
        const q = query(collection(db, 'articles'))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          this.articles = []
          querySnapshot.forEach((doc) => {
            this.articles.push({
              id: doc.id,
              ...doc.data(),
            })
          })
        })
      } else {
        this.articles = []
        const ordersRef = collection(db, 'articles')
        const q = query(ordersRef, where('tag', '==', filter))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
          this.articles.push({
            id: doc.id,
            ...doc.data(),
          })
        })
      }
    },
    async addArticle(article) {
      const inputFile = document.getElementById('image')
      const uploadImage = inputFile.files[0]
      const storageRef = ref(storage, 'articles/' + article.title)
      console.log(article)
      //uploads uploadImage to database
      uploadBytes(storageRef, uploadImage).then((snapshot) => {
        getDownloadURL(ref(storage, 'articles/' + article.title)).then((url) => {
          article.imageUrl = url
          console.log(article)
          article.imageUrl !== ''
            ? addDoc(collection(db, 'articles'), article)
            : console.log('failed')
        })
      })
    },
    getArticle(id) {
      const unsub = onSnapshot(doc(db, 'articles', id), (doc) => {
        this.article = doc.data()
      })
    },
    async commentOnArticle(comment) {
      const articleRef = doc(db, 'articles', comment.articleId)
      await updateDoc(articleRef, {
        comments: arrayUnion(comment),
      })
    },
  },
})
