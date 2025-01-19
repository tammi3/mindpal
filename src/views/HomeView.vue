<template>
  <div class="font-NotoSans">
    <HeaderView />
    <div class="flex flex-col">
      <!-- home -->
      <section class="lg:h-[1000px] bg-Catskill_White w-full flex pt-14s pl-16">
        <div class="w-2/4 h-full flex flex-col space-y-10 pt-32">
          <div class="font-bold text-8xl text-Plantation flex flex-col">
            <p>Students' <span class="text-black">Mental</span></p>
            <p><span class="text-black">Health</span> Matters.</p>
          </div>
          <div>
            <p class="font-Montserrat text-2xl text-Plantation font-semibold">
              We aim to improve campus life by prodiving accessible and inclusive ways to improve
              mental health for students.
            </p>
          </div>
        </div>
        <div class="w-2/4 relative">
          <img
            class="w-32 absolute right-2/3 top-10"
            src="../assets/images/mental-health.png"
            alt=""
          />
          <img
            class="w-full h-[740px] object-cover rounded-br-md"
            src="../assets/images/smiley-friends-with-books-having-coffee-together-outdoors.png"
            alt=""
          />
        </div>
      </section>
      <!-- services -->
      <section class="h-dvh bg-white w-full flex flex-col items-center pt-14 py-10">
        <div
          class="bg-white container h-[550px] flex flex-col -mt-[200px] rounded-2xl shadow-xl shadow-Plantation/30 border-Plantation/20 border-t"
        >
          <div
            class="text-Plantation flex items-start justify-center p-4 py-10 text-3xl uppercase font-bold w-full"
          >
            <h1>Services We offer</h1>
          </div>
          <div class="flex space-x-3 justify-around">
            <div
              class="bg-Water_Leaf/55 h-[370px] w-[370px] rounded-md hover:bg-Plantation cursor-pointer shadow-md"
            ></div>
            <div
              class="bg-Water_Leaf/55 h-[370px] w-[370px] rounded-md hover:bg-Plantation cursor-pointer shadow-md"
            ></div>
            <div
              class="bg-Water_Leaf/55 h-[370px] w-[370px] rounded-md hover:bg-Plantation cursor-pointer shadow-md"
            ></div>
          </div>
        </div>
      </section>
      <!-- Articles -->
      >
      <section class="bg-Catskill_White py-10">
        <div class="container mx-auto">
          <div class="text-center mb-8">
            <h2 class="text-4xl font-bold text-gray-800">Latest Fashion Articles</h2>
            <p class="text-gray-600 mt-2">
              Discover the latest trends and styles in our collection
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Article  -->
            <div class="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src="" alt="Article Image" class="w-full h-48 object-cover" />
              <div class="p-6">
                <div class="text-xl font-bold mb-2 cursor-pointer">
                  <a href=""></a>
                </div>
                article

                <p class="text-gray-600">article description</p>
              </div>
            </div>
            <!-- Article  -->
            <div class="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src="" alt="Article Image" class="w-full h-48 object-cover" />
              <div class="p-6">
                <div class="text-xl font-bold mb-2 cursor-pointer">
                  <a href=""></a>
                </div>
                article

                <p class="text-gray-600">article description</p>
              </div>
            </div>
            <!-- Article  -->
            <div class="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src="" alt="Article Image" class="w-full h-48 object-cover" />
              <div class="p-6">
                <div class="text-xl font-bold mb-2 cursor-pointer">
                  <a href=""></a>
                </div>
                article

                <p class="text-gray-600">article description</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
// import { reactive, toRefs } from 'vue'
import HeaderView from '@/components/HeaderView.vue'
</script>
