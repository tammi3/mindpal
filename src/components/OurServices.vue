<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPeopleGroup, faUserDoctor, faBookOpenReader } from '@fortawesome/free-solid-svg-icons'
</script>
<template>
  <div class="bg-gray-100 flex justify-center items-center">
    <div class="container w-full flex flex-col items-center px-14 py-20 font-Poppins text-center">
      <p class="text-Sushi font-semibold uppercase tracking-widest text-lg mb-2">What We Offer</p>
      <h2 class="text-4xl font-bold text-Tiber">Personalized Mental Health Solutions</h2>
      <p class="text-Tiber/80 max-w-2xl mx-auto mt-3">
        Our services are designed to cater to diverse mental health needs, ensuring personalized
        care that fosters growth and well-being.
      </p>
      <div
        class="text-Bay_Leaf flex items-start justify-center p-4 py-10 text-3xl uppercase font-bold w-full"
      ></div>
      <div
        class="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:space-x-4 justify-around text-white"
      >
        <router-link
          to="/our-team"
          class="h-[400px] w-[370px] animate__animated animate__fadeInUpBig animate__delay-3s shadow-md rounded-3xl p-4 pl-7 text-left border-4 border-Tiber text-Tiber shadow-gray-500 hover:translate-x-0 hover:-translate-y-2 hover:shadow-lg hover:shadow-gray-800 transform duration-200 ease-in-out bg-white"
        >
          <FontAwesomeIcon class="fa-8x text-Tiber mb-4" :icon="faUserDoctor" />
          <h4 class="mb-3 font-semibold text-xl">Virtual Counselling</h4>
          <p class="mb-4">
            Connect with professional counselors from the comfort of your space. Get guidance,
            support, and a listening ear whenever you need it.
          </p>
        </router-link>

        <router-link
          to="/anon-chats"
          class="h-[400px] w-[370px] animate__animated animate__fadeInUpBig animate__delay-2s shadow-md rounded-3xl p-4 pl-7 text-left border-4 border-Tiber text-Tiber shadow-gray-500 hover:translate-x-0 hover:-translate-y-2 hover:shadow-lg hover:shadow-gray-800 transform duration-200 ease-in-out bg-white"
        >
          <FontAwesomeIcon class="fa-8x text-Tiber mb-4" :icon="faPeopleGroup" />
          <h4 class="mb-3 font-semibold text-xl">Anonymous Support Forum</h4>
          <p class="mb-4">
            A safe space to share your thoughts, seek advice, and connect with others anonymously.
            No judgment, just support.
          </p>
        </router-link>
        <router-link
          to="/resources"
          class="h-[400px] w-[370px] animate__animated animate__fadeInUpBig animate__delay-3s shadow-md rounded-3xl p-4 pl-7 text-left border-4 border-Tiber text-Tiber shadow-gray-500 hover:translate-x-0 hover:-translate-y-2 hover:shadow-lg hover:shadow-gray-800 transform duration-200 ease-in-out bg-white"
        >
          <FontAwesomeIcon class="fa-8x text-Tiber mb-4" :icon="faBookOpenReader" />

          <h4 class="mb-3 font-semibold text-xl">Resources</h4>
          <p class="mb-4">
            Access helpful articles, mental health guides, and self-care tips to support your
            well-being and personal growth.
          </p>
        </router-link>
      </div>
    </div>
  </div>
</template>
