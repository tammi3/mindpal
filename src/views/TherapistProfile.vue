<script setup>
import { useTherapistStore } from '../stores/therapist.js'
import { useUserStore } from '@/stores/user.js'
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
const userStore = useUserStore()
const therapistStore = useTherapistStore()
const { userInfo } = storeToRefs(userStore)
const { therapists } = storeToRefs(therapistStore)
const route = useRoute()
const id = route.params.id
const therapist = ref({})
const bio = ref('')
const profileImage = ref(null)

watch(therapists, (newValue) => {
  if (newValue.length > 0) {
    therapist.value = therapistStore.getTherapist(route.params.id, newValue)
    console.log('Therapist:', therapist.value)
  }
})
async function getTherapists(filter) {
  await therapistStore.getTherapists(filter)
}
const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    profileImage.value = URL.createObjectURL(file)
  }
}

const closeModal = () => {
  // Emit event to close modal
}

const saveBio = () => {
  console.log('Saved Bio:', bio.value)
  closeModal()
}
onMounted(async () => {
  await getTherapists('All')
  userStore.getUserInfo() // Wait for therapists to load
})
</script>
<template>
  <div class="pb-10">
    <!-- Profile Section -->
    <section v-if="therapist.name" class="w-full max-w-5xl mx-auto my-8 p-6 lg:px-16">
      <div class="flex flex-col md:flex-row items-center gap-6">
        <img
          src=""
          alt="Therapist Profile"
          class="w-40 h-40 md:w-52 md:h-52 rounded-full border-4 border-Bay_Leaf"
        />
        <div class="flex-1">
          <h2 class="text-3xl font-bold text-Tiber">
            {{ therapist?.title }} {{ therapist.name.firstName }} {{ therapist.name.lastName }}
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
    <!-- Action Buttons -->
    <section class="w-full max-w-5xl mx-auto mt-8 px-6 lg:px-16">
      <div class="flex">
        <router-link
          :to="'/chat/' + therapist.id + userInfo.id"
          class="w-full md:w-72 text-white px-6 py-3 rounded-lg font-medium text-base bg-Sushi hover:bg-Bay_Leaf focus:ring-4 focus:ring-Sushi flex justify-center items-center"
        >
          <FontAwesomeIcon class="p-1 pr-2" :icon="faEnvelope" /> Message
        </router-link>
      </div>
    </section>

    <!-- About Section -->
    <!-- <section class="w-full max-w-5xl mx-auto mt-6 px-6 lg:px-16">
      <div class="flex justify-between items-center">
        <h3 class="text-xl font-semibold">About</h3>
      </div>
      <p id="about-text" class="text-gray-700 mt-2 leading-relaxed">
        Dr. Alex Johnson has over 10 years of experience in cognitive behavioral therapy (CBT) and
        specializes in anxiety and depression treatment. Passionate about mental wellness, Dr.
        Johnson helps clients navigate life’s challenges with empathy and expertise.
      </p>
    </section> -->

    <!-- Contact Section -->
    <section class="w-full max-w-5xl mx-auto mt-6 px-6 lg:px-16">
      <h3 class="text-xl font-semibold">Contact</h3>
      <p class="text-gray-700 mt-1"><strong>Email:</strong> {{ therapist.email }}</p>
    </section>

    <!-- Edit modal -->
    <div class="fixed inset-0 hidden flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
        <h2 class="text-xl font-semibold text-gray-800">Update Your Bio</h2>

        <!-- Profile Image Upload -->
        <div class="flex items-center space-x-3 mt-4">
          <label class="cursor-pointer">
            <input type="file" @change="handleFileUpload" class="hidden" accept="image/*" />
            <img
              :src="profileImage || 'https://via.placeholder.com/100'"
              class="w-16 h-16 rounded-full border object-cover"
            />
          </label>
          <p class="text-gray-600 text-sm">Click to update profile picture</p>
        </div>

        <!-- Bio Input -->
        <div class="mt-4">
          <textarea
            v-model="bio"
            class="w-full border rounded-lg p-3 focus:ring focus:ring-blue-300"
            rows="4"
            placeholder="Tell your clients about yourself..."
            maxlength="300"
          ></textarea>
          <p class="text-sm text-gray-500 text-right">{{ bio.length }}/300</p>
        </div>

        <!-- Buttons -->
        <div class="flex justify-end space-x-2 mt-5">
          <button @click="closeModal" class="px-4 py-2 rounded-lg bg-gray-200">Cancel</button>
          <button @click="saveBio" class="px-4 py-2 rounded-lg bg-blue-600 text-white">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
