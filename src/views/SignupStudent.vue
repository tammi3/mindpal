<script setup>
import { useUserStore } from '../stores/user.js'
import { storeToRefs } from 'pinia'
const userStore = useUserStore()
const { firstName, lastName, email, password, loading, error } = storeToRefs(userStore)
async function handleSubmit() {
  await userStore.registerUser()
}
</script>
<template>
  <div class="w-full lg:w-3/5 flex items-center justify-center">
    <div class="w-full p-6 md:w-2/3">
      <h2 class="text-3xl font-bold text-gray-800 mb-4 leading-10">
        Sign up to MindPal as a Student
      </h2>
      <p class="text-gray-600 mb-8 font-Montserrat">
        Already have an account?
        <router-link to="/user/login" class="text-[#859F3D] font-medium underline"
          >Sign in</router-link
        >
      </p>

      <form @submit.prevent="handleSubmit()">
        <div v-if="error != ''" class="mb-4">
          <p class="block text-sm font-medium text-red-500">{{ error }}</p>
        </div>
        <div class="mb-4">
          <label for="first_name" class="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="first_name"
            id="first_name"
            v-model="firstName"
            @keydown="error = ''"
            required
            placeholder="John"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-2 focus:outline-none focus:ring-[#859F3D] focus:border-[#859F3D] sm:text-sm"
          />
        </div>
        <div class="mb-4">
          <label for="last_name" class="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="last_name"
            id="last_name"
            placeholder="Doe"
            @keydown="error = ''"
            v-model="lastName"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 placeholder-gray-400 focus:outline-none focus:ring-[#859F3D] focus:border-[#859F3D] sm:text-sm"
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            id="email"
            v-model="email"
            @keydown="error = ''"
            required
            placeholder="johndoe@example.com"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-2 focus:outline-none focus:ring-[#859F3D] focus:border-[#859F3D] sm:text-sm"
          />
        </div>

        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            @keydown="error = ''"
            required
            placeholder="Enter 6 characters or more"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-2 focus:outline-none focus:ring-[#859F3D] focus:border-[#859F3D] sm:text-sm"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-[#859F3D] text-white py-2 px-4 rounded-lg shadow-md hover:bg-[#31511E] focus:outline-none focus:ring-2 focus:ring-[#859F3D] focus:ring-offset-2 transition duration-300"
        >
          <img v-if="loading" class="animate-spin-slow w-6" src="../assets/loading.png" alt="" />
          <span class="font-medium" v-else>Sign up</span>
        </button>
      </form>

      <div class="mt-6 flex items-center justify-between">
        <span class="border-t w-1/4 mr-2 border-gray-300"></span>
        <span class="text-gray-500 w-2/4 text-center">or </span>
        <span class="border-t w-1/4 border-gray-300"></span>
      </div>

      <div class="flex mt-6">
        <button
          @click="userStore.signInWithGoogle()"
          class="w-full bg-white font-medium text-gray-700 border border-gray-300 py-2 px-4 rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 transition duration-300"
        >
          <img
            src="https://img.icons8.com/color/48/000000/google-logo.png"
            alt="Google"
            class="w-5 h-5 inline mr-2"
          />
          Sign up with Google
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
