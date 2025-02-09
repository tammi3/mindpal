<template>
  <div class="flex min-h-screen font-Poppins">
    <div class="hidden md:block md:w-2/5 bg-gradient-to-r from-[#859F3D] to-Bay_Leaf relative">
      <router-link
        to="/"
        class="font-PlaywriteIN text-2xl text-Tiber font-bold top-10 left-10 absolute"
      >
        MindPal
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
