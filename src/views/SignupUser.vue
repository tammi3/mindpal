<template>
  <div class="w-full lg:w-3/5 flex items-center justify-center">
    <div class="w-full p-6 md:w-2/3">
      <h2 class="text-3xl font-bold text-gray-800 mb-4">Sign up to MindPal</h2>
      <p class="text-gray-600 mb-8 font-Montserrat">
        Already have an account?
        <router-link to="/user/login" class="text-[#859F3D] font-medium underline"
          >Sign in</router-link
        >
      </p>
      <div class="w-full flex flex-col space-y-4">
        <router-link
          to="/user/signup-student"
          class="w-full bg-[#859F3D] text-white py-2 px-4 rounded-lg shadow-md hover:bg-[#31511E] focus:outline-none focus:ring-2 focus:ring-[#859F3D] focus:ring-offset-2 transition duration-300"
        >
          Student</router-link
        >
        <router-link
          to="/user/signup-therapist"
          class="w-full bg-[#859F3D] text-white py-2 px-4 rounded-lg shadow-md hover:bg-[#31511E] focus:outline-none focus:ring-2 focus:ring-[#859F3D] focus:ring-offset-2 transition duration-300"
        >
          Therapist</router-link
        >
      </div>
    </div>
  </div>
</template>
