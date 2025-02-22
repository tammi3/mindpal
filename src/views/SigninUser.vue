<script setup>
import { useUserStore } from '../stores/user.js'
import { storeToRefs } from 'pinia'
const userStore = useUserStore()
const { email, password, loading, error } = storeToRefs(userStore)

function handleSubmit() {
  userStore.signIn()
}
</script>

<template>
  <div class="w-full lg:w-3/5 flex items-center justify-center">
    <div class="w-full p-6 md:w-2/3">
      <h2 class="text-3xl font-bold text-gray-800 mb-4">Sign in to MindPal</h2>
      <p class="text-gray-600 mb-8 font-Montserrat">
        Don’t have an account yet?
        <router-link to="/user/signup" class="text-[#859F3D] font-medium underline"
          >Sign up</router-link
        >
      </p>

      <form @submit.prevent="handleSubmit">
        <div v-if="error != ''" class="mb-4">
          <p class="block text-sm font-medium text-red-500">{{ error }}</p>
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="johndoe@example.com"
            @keydown="error = ''"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-2 focus:outline-none focus:ring-[#859F3D] focus:border-[#859F3D] sm:text-sm"
          />
        </div>

        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Enter 6 characters or more"
            @keydown="error = ''"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-2 focus:outline-none focus:ring-[#859F3D] focus:border-[#859F3D] sm:text-sm"
          />
          <a href="#" class="text-sm text-[#859F3D] hover:underline mt-2 inline-block"
            >Forgot Password?</a
          >
        </div>

        <button
          type="submit"
          class="w-full bg-[#859F3D] text-white py-2 px-4 font-medium rounded-lg shadow-md hover:bg-[#31511E] focus:outline-none focus:ring-2 focus:ring-[#859F3D] focus:ring-offset-2 transition duration-300"
        >
          <img
            v-if="loading"
            class="animate-spin-slow w-6"
            src="../assets/images/loading.png"
            alt=""
          />
          <span class="font-medium" v-else> Sign in</span>
        </button>
      </form>

      <div class="mt-6 flex items-center justify-between">
        <span class="border-t w-1/4 mr-2 border-gray-300"></span>
        <span class="text-gray-500 w-2/4 text-center">or</span>
        <span class="border-t w-1/4 border-gray-300"></span>
      </div>

      <div class="flex mt-6">
        <button
          class="w-full bg-white font-medium text-gray-700 border border-gray-300 py-2 px-4 rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 transition duration-300"
        >
          <img
            src="https://img.icons8.com/color/48/000000/google-logo.png"
            alt="Google"
            class="w-5 h-5 inline mr-2"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  </div>
</template>
