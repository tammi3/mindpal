<script setup>
import { useUserStore } from '../stores/user.js'
import { storeToRefs } from 'pinia'
import { useVideoChatStore } from '@/stores/video'
import { watch, ref, onMounted } from 'vue'
import { auth } from '@/db/firebase.js'
import { useRoute } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons'
import { onAuthStateChanged } from 'firebase/auth'

const userStore = useUserStore()
const videoChatStore = useVideoChatStore()
const { userInfo } = storeToRefs(userStore)
const { callerName, incomingCall, peerConnection } = storeToRefs(videoChatStore)

const route = useRoute()
const isBurgerMenuVisible = ref(false)
const isProfileMenuVisible = ref(false)

const loadingHeader = ref(true)
function toggleProfileMenu() {
  const profileMenu = document.getElementById('profile-menu')
  const profileMenuBg = document.getElementById('profile-menu-bg')
  if (profileMenu.classList.contains('hidden')) {
    profileMenu.classList.remove('hidden')
    profileMenu.classList.add('flex')
    profileMenuBg.classList.remove('hidden')
    isProfileMenuVisible.value = true
  } else {
    profileMenu.classList.add('hidden')
    profileMenuBg.classList.add('hidden')

    profileMenu.classList.remove('flex')
    isProfileMenuVisible.value = false
  }
}
function toggleMenu() {
  const navLinks = document.getElementById('nav-links')
  const navLinksBg = document.getElementById('nav-links-bg')
  if (navLinks.classList.contains('hidden')) {
    navLinks.classList.remove('hidden')
    navLinks.classList.add('absolute')
    navLinksBg.classList.remove('hidden')
    navLinks.classList.add('flex')
    isBurgerMenuVisible.value = true
  } else {
    navLinks.classList.add('hidden')
    navLinksBg.classList.add('hidden')
    navLinks.classList.remove('flex')
    navLinks.classList.remove('absolute')
    isBurgerMenuVisible.value = false
  }
}
function logOut() {
  userStore.logOut()
}
async function acceptCall(pc, route) {
  await videoChatStore.answerCall(pc, route)
}
async function declineCall() {
  await videoChatStore.rejectCall()
}
// Watch for route changes
watch(route, (to, from) => {
  window.scrollTo({ top: 0, behavior: 'smooth' })

  if (isBurgerMenuVisible.value) {
    toggleMenu()
  }

  if (isProfileMenuVisible.value) {
    toggleProfileMenu()
  }

  if (from.path.startsWith('/user') && from.path !== '/user-profile') {
    userStore.getUserInfo()
  }

  if (to.path.startsWith('/user') && from.path !== '/user-profile') {
    userStore.getUserInfo()
  }
})

onMounted(() => {
  userStore.getUserInfo()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      videoChatStore.incomingCalls()
    } else {
      console.log('No user detected. Incoming call listener not started.')
    }
  })
  setTimeout(() => {
    loadingHeader.value = false
  }, 1000)
})
</script>

<template>
  <div class="font-NotoSans sticky top-0 w-full z-50 border-solid border-b">
    <div v-if="loadingHeader">
      <div class="w-full h-12 animate-pulse bg-gray-300"></div>
    </div>
    <nav v-show="!loadingHeader" class="font-Ubuntu bg-white">
      <div class="container mx-auto px-4 py-2 flex justify-between items-center">
        <!-- Brand Name -->

        <RouterLink class="font-Ubuntu text-Tiber text-2xl font-bold" to="/">MindPal</RouterLink>

        <!-- Navigation Links -->
        <div
          id="nav-links"
          class="hidden lg:flex flex-col space-y-10 lg:space-y-0 z-10 h-dvh lg:h-0 bg-white lg:bg-inherit top-0 py-10 px-4 lg:p-0 w-3/4 right-0 text-lg justify-start items-start lg:justify-center lg:items-center lg:flex-row lg:space-x-6 uppercase lg:text-sm"
        >
          <div class="w-full flex lg:hidden justify-end items-center">
            <svg
              class="cursor-pointer"
              @click="toggleMenu"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="21"
            >
              <g fill="#0b2e44" fill-rule="evenodd">
                <path d="M2.575.954l16.97 16.97-2.12 2.122L.455 3.076z" />
                <path d="M.454 17.925L17.424.955l2.122 2.12-16.97 16.97z" />
              </g>
            </svg>
          </div>

          <routerLink
            activeClass="border-2 shadow-md shadow-gray-300 border-gray-400 rounded-md  p-2"
            to="/"
            class="text-gray-700 font-bold hover:text-gray-900"
          >
            Home
          </routerLink>
          <routerLink
            activeClass="border-2 shadow-md shadow-gray-300 border-gray-400 rounded-md  p-2"
            to="/resources"
            class="text-gray-700 font-bold hover:text-gray-900"
          >
          </routerLink>
          <routerLink
            activeClass="border-2 shadow-md shadow-gray-300 border-gray-400 rounded-md  p-2"
            to="/resources"
            class="text-gray-700 font-bold hover:text-gray-900"
          >
            Resources
          </routerLink>
        </div>
        <div
          id="nav-links-bg"
          @click="toggleMenu"
          class="absolute hidden inset-0 h-dvh backdrop-blur-sm"
        ></div>

        <!-- Icons and Dropdown -->
        <div class="flex items-center space-x-4">
          <!-- Profile Dropdown -->
          <div class="relative lg:pr-4">
            <button @click="toggleProfileMenu" class="flex items-center focus:outline-none">
              <FontAwesomeIcon
                v-if="!userInfo.updatedProfileImage"
                :icon="faUserCircle"
                class="fa-2x text-Tiber"
              />
              <!-- custom profile image -->
              <img
                v-show="userInfo.updatedProfileImage"
                id="profile"
                class="w-10 h-10 rounded-full"
                src=""
                alt=""
              />
            </button>
            <div
              id="profile-menu"
              class="absolute top-[50px] right-0 z-10 bg-white p-4 rounded-sm shadow-gray-400 shadow-md hidden flex-col space-y-3 uppercase"
            >
              <div v-if="userInfo === ''" class="w-full flex flex-col space-y-2">
                <router-link
                  to="/user/signin"
                  activeClass="border-2 shadow-md shadow-gray-300 border-gray-400 rounded-md  p-2 "
                  class="text-gray-700 font-bold hover:border-2 hover:rounded-md hover:border-gray-300 p-2 w-20"
                  >Log in
                </router-link>
                <router-link
                  to="/user/signup"
                  activeClass="border-2 shadow-md shadow-gray-300 border-gray-400 rounded-md  p-2 "
                  class="text-gray-700 font-bold hover:border-2 hover:rounded-md hover:border-gray-300 p-2 w-24"
                  >sign up
                </router-link>
              </div>

              <div v-if="userInfo !== ''" class="w-full flex flex-col space-y-2">
                <router-link
                  :to="
                    userInfo.role === 'therapist' ? `/therapist/${userInfo.id}` : '/user-profile'
                  "
                  activeClass="border-2 shadow-md shadow-gray-300 border-gray-400 rounded-md  p-2 "
                  class="text-gray-700 font-bold hover:border-2 hover:rounded-md hover:border-gray-300 p-2"
                  >Profile
                </router-link>
                <router-link
                  to="/chat-history"
                  v-if="userInfo.role !== 'admin'"
                  activeClass="border-2 shadow-md shadow-gray-300 border-gray-400 rounded-md  p-2 "
                  class="text-gray-700 font-bold hover:border-2 hover:rounded-md hover:border-gray-300 p-2"
                  >Messages
                </router-link>
                <routerLink
                  v-if="userInfo.role === 'admin'"
                  activeClass="border-2 shadow-md shadow-gray-300 border-gray-400 rounded-md  p-2 "
                  class="text-gray-700 font-bold hover:border-2 hover:rounded-md hover:border-gray-300 p-2"
                  to="/admin"
                >
                  Admin
                </routerLink>
                <div
                  class="text-gray-700 cursor-pointer font-bold hover:border-2 hover:rounded-md hover:border-gray-300 p-2"
                  @click="logOut"
                >
                  Logout
                </div>
              </div>
            </div>
          </div>
          <div
            id="profile-menu-bg"
            @click="toggleProfileMenu()"
            class="absolute hidden inset-0 h-dvh bg-grey-100 opacity-5"
          ></div>

          <div @click="toggleMenu" class="block lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="21">
              <g fill="#000000" fill-rule="evenodd">
                <path d="M0 0h24v3H0zM0 9h24v3H0zM0 18h24v3H0z" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </nav>

    <!-- Modal Overlay (Hidden by Default) -->
    <div
      v-if="incomingCall"
      id="callModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
        <h2 class="text-xl font-semibold">Incoming Call</h2>
        <p class="text-gray-400 mt-2">
          📞 <span id="callerName">{{ callerName }}</span> is calling...
        </p>

        <!-- Buttons -->
        <div class="mt-6 flex justify-around">
          <button
            @click="acceptCall(peerConnection, route)"
            id="acceptCall"
            class="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg"
          >
            ✅ Accept
          </button>
          <button
            @click="declineCall()"
            id="declineCall"
            class="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg"
          >
            ❌ Decline
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
