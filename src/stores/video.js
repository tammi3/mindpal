import {
  collection,
  addDoc,
  db,
  doc,
  onSnapshot,
  setDoc,
  auth,
  getDoc,
  updateDoc,
  deleteDoc,
} from '@/db/firebase.js'
// import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import router from '@/router'
import { defineStore } from 'pinia'
export const useVideoChatStore = defineStore('videoChat', {
  // arrow function recommended for full type inference
  state: () => ({
    callId: '',
    unsubscribeIncomingCalls: null,
    autoRejectTimeout: null,
    incomingCall: null,
    webcamVideo: null,
    remoteVideo: null,
    ringtone: null,
    peerConnection: null,
    isRinging: false,
    routeId: '',
    inCall: false,
    callerName: '',
    receiver: { role: '', id: '' },
    caller: { role: '', id: '' },
  }),
  actions: {
    async startWebcam(pc) {
      try {
        const localStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        })

        const remoteStream = new MediaStream()

        // Push tracks from local stream to peer connection
        localStream.getTracks().forEach((track) => {
          pc.addTrack(track, localStream)
        })

        // Pull tracks from remote peer connection and add to remote stream
        pc.ontrack = (event) => {
          event.streams[0].getTracks().forEach((track) => {
            remoteStream.addTrack(track)
          })
        }

        // Update video elements
        if (this.webcamVideo) this.webcamVideo.srcObject = localStream
        if (this.remoteVideo) this.remoteVideo.srcObject = remoteStream

        // Update button states
        // if (callButton) callButton.disabled = false
        // if (answerButton) answerButton.disabled = false
        // if (webcamButton) webcamButton.disabled = true

        // return { localStream, remoteStream }
      } catch (error) {
        console.error('Error accessing webcam and microphone:', error)
      }
    },
    async startCall(pc) {
      try {
        const user = auth.currentUser
        console.log('ddd', this.routeId, this.receiver.id)
        this.isRinging = true
        // Extract therapist and student IDs from routeId
        const therapistId = this.routeId.slice(0, 28)
        const studentId = this.routeId.slice(28)

        // Determine roles based on the current user
        if (user.uid === therapistId) {
          this.caller = { role: 'therapists', id: user.uid }
          this.receiver = { role: 'users', id: studentId }
        } else {
          this.caller = { role: 'users', id: user.uid }
          this.receiver = { role: 'therapists', id: therapistId }
        }
        console.log('caller', this.caller, 'receiver', this.receiver)

        // const callerRef = doc(db, this.caller.role, this.caller.id)
        const receiverRef = doc(db, this.receiver.role, this.receiver.id)
        // Check if receiver is already in a call
        const receiverSnap = await getDoc(receiverRef)
        if (receiverSnap.exists() && receiverSnap.data().callStatus === 'in call') {
          alert('User is already in a call!')
        } else {
          // Reference Firestore collections for signaling
          const callDocRef = await addDoc(collection(db, 'calls'), {}) // Empty object first
          this.callId = callDocRef.id // Store call ID
          const offerCandidates = collection(db, 'calls', callDocRef.id, 'offerCandidates')
          const answerCandidates = collection(db, 'calls', callDocRef.id, 'answerCandidates')

          // Get ICE candidates for caller and save to Firestore
          pc.onicecandidate = (event) => {
            if (event.candidate) {
              // offerCandidates.add(event.candidate.toJSON())
              try {
                addDoc(offerCandidates, event.candidate.toJSON())
              } catch (error) {
                console.error('Error adding ICE candidate:', error)
              }
            }
          }

          // Create an offer
          const offerDescription = await pc.createOffer()
          await pc.setLocalDescription(offerDescription)

          const offer = {
            sdp: offerDescription.sdp,
            type: offerDescription.type,
          }
          await setDoc(callDocRef, {
            callerId: user.uid,
            receiverId: this.receiver.id,
            routerId: this.routeId, // Replace with actual receiver ID
            offer,
            status: 'pending',
          })

          // Listen for a remote answer and set it when available
          onSnapshot(callDocRef, (snapshot) => {
            const data = snapshot.data()
            if (!pc.currentRemoteDescription && data?.answer) {
              try {
                const answerDescription = new RTCSessionDescription(data.answer)
                pc.setRemoteDescription(answerDescription)
                this.incomingCall = false
                this.isRinging = false
                this.inCall = true
                console.log('Remote description set successfully.')
              } catch (error) {
                console.error('Error setting remote description:', error)
              }
            }
          })

          // When answered, add ICE candidates to the peer connection
          onSnapshot(answerCandidates, (snapshot) => {
            snapshot.forEach((doc) => {
              try {
                const candidate = new RTCIceCandidate(doc.data())
                pc.addIceCandidate(candidate)
              } catch (error) {
                console.error('Error adding ICE candidate:', error)
              }
            })
          })

          // Enable hangup button
          this.playRingtone()
          this.isRinging = true
          await updateDoc(doc(db, this.caller.role, this.caller.id), { callStatus: 'in call' })
          await updateDoc(doc(db, this.receiver.role, this.receiver.id), { callStatus: 'in call' })
        }
      } catch (error) {
        console.error('Error starting the call:', error)
      }
    },
    async getCallerName(id) {
      try {
        const therapistRef = doc(db, 'therapists', id)
        // const studentRef = doc(db, 'users', id)

        // const studentSnap = await getDoc(studentRef)
        const therapistSnap = await getDoc(therapistRef)

        if (therapistSnap.exists()) {
          onSnapshot(doc(db, 'therapists', id), (doc) => {
            const name = doc.data()?.name
            console.log(`${name?.firstName} ${name?.lastName} `)
            this.callerName = `${name?.firstName} ${name?.lastName} `
          })
        } else {
          onSnapshot(doc(db, 'users', id), (doc) => {
            const name = doc.data()?.name
            console.log(`${name?.firstName} ${name?.lastName} `)
            this.callerName = `${name?.firstName} ${name?.lastName} `
          })
        }
      } catch (error) {
        console.error('Error getting caller name:', error)
      }
    },
    async checkRouteId(pc) {
      const studentId = this.routeId.slice(28)
      const therapistId = this.routeId.slice(0, 28)
      const therapistRef = doc(db, 'therapists', therapistId)
      const studentRef = doc(db, 'users', studentId)

      const studentSnap = await getDoc(studentRef)
      const therapistSnap = await getDoc(therapistRef)

      if (therapistSnap.exists() && studentSnap.exists()) {
        this.startWebcam(pc)
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Invalid ID',
          text: 'This  ID is incorrect. You will be redirected home.',
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
    async answerCall(pc, route) {
      try {
        console.log('Accepting call...')
        this.stopRingtone()
        console.log(this.callId)

        const callRef = doc(db, 'calls', this.callId)
        const offerCandidates = collection(callRef, 'offerCandidates')
        const answerCandidates = collection(callRef, 'answerCandidates')

        // Collect ICE candidates and store in Firestore
        pc.onicecandidate = (event) => {
          if (event.candidate) {
            addDoc(answerCandidates, event.candidate.toJSON())
          }
        }

        // Retrieve call data
        const callSnapshot = await getDoc(callRef)
        const callData = callSnapshot.data()
        const user = auth.currentUser

        // Extract therapist and student IDs from routeId
        const therapistId = callData.routerId.slice(0, 28)
        const studentId = callData.routerId.slice(28)

        // Determine roles based on the current user
        if (user.uid === therapistId) {
          this.caller = { role: 'therapists', id: user.uid }
          this.receiver = { role: 'users', id: studentId }
        } else {
          this.caller = { role: 'users', id: user.uid }
          this.receiver = { role: 'therapists', id: therapistId }
        }
        console.log('caller', this.caller, 'receiver', this.receiver)

        if (route.name !== 'chat-call') {
          console.log(callData)
          router.push(`/chat-call/${callData.routerId}`)
        }
        this.incomingCall = false

        console.log(route)
        const offerDescription = callData.offer

        // Set remote description (from caller's offer)
        await pc.setRemoteDescription(new RTCSessionDescription(offerDescription))

        // Create answer
        const answerDescription = await pc.createAnswer()
        await pc.setLocalDescription(answerDescription)

        // Save answer to Firestore
        const answer = {
          type: answerDescription.type,
          sdp: answerDescription.sdp,
        }
        console.log(this.caller, this.receiver)

        await updateDoc(callRef, { answer })
        await updateDoc(doc(db, this.caller.role, this.caller.id), { callStatus: 'in call' })
        await updateDoc(doc(db, this.receiver.role, this.receiver.id), { callStatus: 'in call' })

        // Listen for incoming ICE candidates from the caller
        onSnapshot(offerCandidates, (snapshot) => {
          snapshot.docChanges().forEach(async (change) => {
            if (change.type === 'added') {
              try {
                const data = change.doc.data()
                if (data) {
                  await pc.addIceCandidate(new RTCIceCandidate(data))
                }
              } catch (error) {
                console.error('Error adding ICE candidate:', error)
              }
            }
          })
        })
        await updateDoc(doc(db, 'calls', this.callId), {
          status: 'accepted',
        })

        this.isRinging = false
        this.inCall = true

        await this.logCall('accepted')

        console.log('Call accepted successfully.')
      } catch (error) {
        console.error('Error answering the call:', error)
      }
    },
    async endCall() {
      try {
        this.inCall = false
        this.incomingCall = false
        await deleteDoc(doc(db, 'calls', this.callId))
        await updateDoc(doc(db, this.caller.role, this.caller.id), { callStatus: 'idle' })
        await updateDoc(doc(db, this.receiver.role, this.receiver.id), { callStatus: 'idle' })
        await this.logCall('Ended', this.callId)
      } catch (error) {
        console.error('Error ending call:', error)
      }
    },
    async logCall(status) {
      const user = auth.currentUser
      try {
        await addDoc(collection(db, 'callHistory', user.uid, 'logs'), {
          timestamp: new Date().toLocaleString(),
          status: status,
          participantId: this.receiver.id,
        })
      } catch (error) {
        console.error('Error logging call:', error)
      }
    },

    async rejectCall() {
      try {
        await updateDoc(doc(db, 'calls', this.callId), {
          status: 'declined',
        })
        this.incomingCall = false
        await this.logCall('declined')
      } catch (error) {
        console.error('Error rejecting call:', error)
      }
    },

    playRingtone() {
      if (this.ringtone) return // Prevent multiple instances

      this.ringtone = new Audio('https://www.fesliyanstudios.com/play-mp3/4385')
      this.ringtone.loop = true
      this.ringtone.play()
    },

    stopRingtone() {
      if (this.ringtone) {
        this.ringtone.pause()
        this.ringtone.currentTime = 0
        this.ringtone = null
      }
      clearTimeout(this.autoRejectTimeout)
    },
    incomingCalls() {
      const user = auth.currentUser
      if (!user) return

      // Reference to the calls collection
      const callsRef = collection(db, 'calls')

      // Listen for incoming calls
      const unsubscribe = onSnapshot(callsRef, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const callData = change.doc.data()
          const callId = change.doc.id

          // Handle newly added calls
          if (
            change.type === 'added' &&
            callData.receiverId === user.uid &&
            callData.status === 'pending'
          ) {
            this.callId = callId
            this.incomingCall = true
            this.getCallerName(callData.callerId)
            this.playRingtone()

            // Auto-decline after 30 seconds if still pending
            this.callTimeout = setTimeout(() => {
              if (this.incomingCall) {
                console.log('Auto-decline after 30 seconds if still pending')
                this.rejectCall(this.callId)
                this.stopRingtone()
                this.incomingCall = false
              }
            }, 30000)
          }

          // Stop ringtone if call is answered or canceled
          if (change.type === 'modified' && callData.status !== 'pending') {
            this.stopRingtone()
            this.incomingCall = false
            clearTimeout(this.callTimeout) // Prevent timeout from rejecting an answered call
          }
        })
      })

      // Save unsubscribe function to stop listening when needed
      this.unsubscribeIncomingCalls = unsubscribe

      // const user = auth.currentUser
      // // Listen for Incoming Calls
      // onSnapshot(collection(db, 'calls'), (snapshot) => {
      //   snapshot.docChanges().forEach((change) => {
      //     const callData = change.doc.data()

      //     if (
      //       change.type === 'added' &&
      //       callData.receiverId === user.uid &&
      //       callData.status === 'pending'
      //     ) {
      //       this.callId = change.doc.id
      //       this.incomingCall = true
      //       this.getCallerName(callData.callerId)
      //       this.playRingtone()
      //       setTimeout(() => {
      //         this.rejectCall(this.callId) // Ensure rejectCall is executed
      //         this.stopRingtone() // Stop ringing
      //       }, 30000) // Auto-end call after 30s
      //     }
      //   })
      // })
    },
  },
})
