<script setup>
import HeaderView from '@/components/HeaderView.vue'
import { useTherapistStore } from '../stores/therapist.js'
import { useUserStore } from '@/stores/user.js'
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
const userStore = useUserStore()
const therapistStore = useTherapistStore()
const { userInfo } = storeToRefs(userStore)
const { therapists } = storeToRefs(therapistStore)

const route = useRoute()
const id = route.params.id
const therapist = ref({})
watch(therapists, (newValue) => {
  if (newValue.length > 0) {
    therapist.value = therapistStore.getTherapist(route.params.id, newValue)
    console.log('Therapist:', therapist.value)
  }
})
async function getTherapists(filter) {
  await therapistStore.getTherapists(filter)
}

onMounted(async () => {
  await getTherapists('All')
  userStore.getUserInfo() // Wait for therapists to load
  console.log('Therapists:', therapists.value)
})
</script>
<template>
  <div>
    <HeaderView />
    <!-- Profile Section -->
    <section v-if="therapist.name" class="w-full max-w-5xl mx-auto my-8 p-6 lg:px-16">
      <div class="flex flex-col md:flex-row items-center md:items-start gap-6">
        <img
          src=""
          alt="Therapist Profile"
          class="w-40 h-40 md:w-52 md:h-52 rounded-full border-4 border-blue-500"
        />
        <div class="flex-1">
          <h2 class="text-3xl font-bold">
            Dr. {{ therapist.name.firstName }} {{ therapist.name.lastName }}
          </h2>
          <p class="text-lg text-gray-600">{{ therapist.specialisation }}</p>

          <!-- Availability Toggle -->
          <div class="flex items-center mt-2">
            <span class="text-gray-700 mr-3">Availability:</span>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" class="sr-only peer" id="availability-toggle" />
              <div
                class="w-11 h-6 bg-gray-300 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"
              ></div>
              <span id="availability-status" class="ml-3 text-gray-600 font-medium"
                >Unavailable</span
              >
            </label>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="w-full max-w-5xl mx-auto mt-6 px-6 lg:px-16">
      <div class="flex justify-between items-center">
        <h3 class="text-xl font-semibold">About</h3>
      </div>
      <p id="about-text" class="text-gray-700 mt-2 leading-relaxed">
        Dr. Alex Johnson has over 10 years of experience in cognitive behavioral therapy (CBT) and
        specializes in anxiety and depression treatment. Passionate about mental wellness, Dr.
        Johnson helps clients navigate life’s challenges with empathy and expertise.
      </p>
    </section>

    <!-- Contact Section -->
    <section class="w-full max-w-5xl mx-auto mt-6 px-6 lg:px-16">
      <h3 class="text-xl font-semibold">Contact</h3>
      <p class="text-gray-700 mt-1"><strong>Email:</strong> {{ therapist.email }}</p>
    </section>

    <!-- Action Buttons -->
    <section class="w-full max-w-5xl mx-auto mt-8 px-6 lg:px-16">
      <div class="flex">
        <router-link
          :to="'/chatroom/' + therapist.id + userInfo.id"
          class="bg-gray-300 w-72 px-6 py-3 rounded-md text-lg hover:bg-gray-400"
        >
          Send Message
        </router-link>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped></style>
