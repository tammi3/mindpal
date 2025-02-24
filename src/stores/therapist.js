import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  reauthenticateWithCredential,
  deleteUser,
  deleteDoc,
  EmailAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  storage,
  deleteObject,
  linkWithPopup,
  provider,
  ref,
  query,
  collection,
  where,
  getDocs,
  getDownloadURL,
  uploadBytes,
  onSnapshot,
  Timestamp,
  updateDoc,
  auth,
  setDoc,
  signOut,
  doc,
  db,
} from '@/db/firebase.js'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { defineStore } from 'pinia'
import { validatePassword } from '@/utils/validatePassword'
export const useTherapistStore = defineStore('therapist', {
  state: () => ({
    firstName: '',
    lastName: '',
    search: '',
    email: '',
    password: '',
    loading: '',
    error: '',
    specialisation: '',
    experience: '',
    therapists: [],
    specialisations: [
      'Cognitive Behavioral Therapy (CBT)',
      'Trauma Therapy',
      'Child & Adolescent Therapy',
      'Depression & Anxiety Counseling',
      'Stress Management',
      'Relationship & Social Anxiety Therapy',
      'Mindfulness & Meditation Therapy',
      'Academic & Career Counseling',
      'Grief & Loss Therapy',
    ],
  }),
  actions: {
    uploadFile(user) {
      const inputFile = document.getElementById('certification')
      const doc = inputFile.files[0]
      const storageRef = ref(storage, 'certifications/' + user.uid)

      //uploads image to database
      uploadBytes(storageRef, doc).then((snapshot) => {})
    },
    async getTherapistDoc(id) {
      try {
        const url = await getDownloadURL(ref(storage, 'certifications/' + id))
        return url // Return the URL so we can use it later
      } catch (error) {
        console.error('Error fetching document:', error)
        return null // Return null if there's an error
      }
    },
    async getTherapists(filter) {
      if (filter == 'All') {
        const q = query(collection(db, 'therapists'))
        onSnapshot(q, (querySnapshot) => {
          this.therapists = []
          querySnapshot.forEach((doc) => {
            this.therapists.push({
              id: doc.id,
              ...doc.data(),
            })
          })
        })
      } else {
        this.therapists = []
        const ordersRef = collection(db, 'therapists')
        const q = query(ordersRef, where('specialisation', '==', filter))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
          this.therapists.push({
            id: doc.id,
            ...doc.data(),
          })
        })
      }
    },
    async downloadTherapistFile(id) {
      try {
        // Get the file URL from Firebase Storage

        const url = await this.getTherapistDoc(id)

        // Create a hidden anchor element to trigger download
        const link = document.createElement('a')
        link.href = url
        link.download = `therapist_${id}_certification.pdf` // Customize filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } catch (error) {
        console.error('Error downloading file:', error)
      }
    },
    async registerTherapist() {
      const router = useRouter()
      const email = this.email
      const password = this.password
      this.loading = true
      this.error = ''
      const isPasswordStrong = validatePassword(password)
      if (isPasswordStrong) {
        await createUserWithEmailAndPassword(auth, email, password)
          .then((cred) => {
            const user = auth.currentUser
            console.log(user, cred)

            setDoc(doc(db, 'therapists', user.uid), {
              email: email,
              password: password,
              name: {
                firstName: this.firstName,
                lastName: this.lastName,
              },
              specialisation: this.specialisation,
              updatedProfileImage: false,
              experience: this.experience,
              isAvailable: true,
              id: user.uid,
              isVerified: false,
              status: 'Pending',
              creationTime: Timestamp.fromDate(new Date()),
            }).then(() => {
              this.uploadFile(user)
              this.email = ''
              this.password = ''
              this.firstName = ''
              this.lastName = ''
              this.experience = ''
              this.specialisation = ''
            })

            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer
                toast.onmouseleave = Swal.resumeTimer
              },
            })
            Toast.fire({
              icon: 'success',
              title: 'Signed in successfully',
            })

            router.push({ path: '/' })
          })
          .catch((err) => {
            this.loading = false
            window.scrollTo({ top: 0, behavior: 'smooth' })
            if (err.message === 'Firebase: Error (auth/email-already-in-use).') {
              this.error = 'Email already associated with another account.'
            } else {
              this.error = err.message.slice(9)
            }
          })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        this.loading = false
        this.error =
          'Password must be at least 6 characters, with 1 special character and 1 number.'
      }
    },
    getTherapist(id, therapists) {
      return therapists.find((therapist) => therapist.id === id)
    },
  },
})
