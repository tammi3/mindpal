<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faPhone,
  faPhoneVolume,
  faMicrophone,
  faMicrophoneSlash,
  faVideo,
  faVideoSlash,
  faPhoneSlash,
} from '@fortawesome/free-solid-svg-icons'
import { useVideoChatStore } from '@/stores/video'
import { storeToRefs } from 'pinia'

const videoChatStore = useVideoChatStore()
const { inCall, routeId, peerConnection, webcamVideo, remoteVideo, isRinging } =
  storeToRefs(videoChatStore)
const route = useRoute()
routeId.value = route.params.id

// Get Current User ID

// WebRTC Configuration
const servers = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
  iceCandidatePoolSize: 10,
}

// Global State
peerConnection.value = new RTCPeerConnection(servers)

// const callButton = ref(null)
// const answerButton = ref(null)
// const hangupButton = ref(null)

onMounted(async () => {
  // await startWebcam(peerConnection.value)
  await videoChatStore.checkRouteId(peerConnection.value)
  console.log(peerConnection.value)
  // await startCall()
  // const currentUserId = user.value.uid
  // console.log(`User ID: ${currentUserId}`)

  // Load Call History
  // onSnapshot(collection(db, 'callHistory', currentUserId, 'logs'), (snapshot) => {
  //   callHistory.value = snapshot.docs.map((doc) => doc.data())
  // })
})
</script>
<template>
  <div class="relative w-full">
    <div class="w-full">
      <video
        ref="webcamVideo"
        class="bg-black h-dvh object-none w-full"
        id="user-1"
        autoplay
        playsinline
      ></video>
      <video
        ref="remoteVideo"
        class="bg-black h-dvh object-cover smallFrame"
        id="user-2"
        autoplay
        playsinline
      ></video>
    </div>

    <div id="controls">
      <div v-if="inCall" class="flex space-x-2">
        <div class="control-container bg-white opacity-60 cursor-pointer" id="camera-btn">
          <!-- <FontAwesomeIcon :icon="faVideo"/> -->
          <FontAwesomeIcon :icon="faVideoSlash" />
        </div>

        <div class="control-container bg-white opacity-60 cursor-pointer" id="mic-btn">
          <!-- <FontAwesomeIcon :icon="faMicrophone" /> -->
          <FontAwesomeIcon :icon="faMicrophoneSlash" />
        </div>

        <div class="control-container bg-white opacity-60 cursor-pointer">
          <FontAwesomeIcon :icon="faPhoneSlash" />
        </div>
      </div>

      <div
        v-else
        @click="videoChatStore.startCall(peerConnection)"
        class="control-container bg-green-400 cursor-pointer"
        id="leave-btn"
      >
        <FontAwesomeIcon v-if="isRinging" :icon="faPhoneVolume" />
        <FontAwesomeIcon v-else :icon="faPhone" />
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#videos {
  display: grid;
  grid-template-columns: 1fr;

  overflow: hidden;
}

#user-2 {
  display: block;
}

.smallFrame {
  position: absolute;
  top: 20px;
  left: 20px;
  height: 170px;
  width: 300px;
  border-radius: 5px;
  border: 2px solid #b366f9;
  -webkit-box-shadow: 3px 3px 15px -1px rgba(0, 0, 0, 0.77);
  box-shadow: 3px 3px 15px -1px rgba(0, 0, 0, 0.77);
}

#controls {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1em;
}

.control-container {
  padding: 20px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.control-container img {
  height: 30px;
  width: 30px;
}

@media screen and (max-width: 600px) {
  .smallFrame {
    height: 80px;
    width: 120px;
  }

  .control-container img {
    height: 20px;
    width: 20px;
  }
}
</style>
