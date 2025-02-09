<script setup>
import HeaderView from '@/components/HeaderView.vue'
</script>
<template>
  <div>
    <!-- Header Section -->
    <HeaderView />
    <div class="py-16 px-6">
      <p class="text-Sushi font-semibold uppercase tracking-widest text-lg mb-2 text-center">
        Featured Articles
      </p>
      <h2 class="text-4xl font-bold text-gray-800 text-center">Insights on Mental Well-being</h2>
      <p class="text-gray-600 max-w-2xl mx-auto mt-3 text-center">
        Explore expert insights, research-backed advice, and personal stories that empower you to
        prioritize your mental health and well-being.
      </p>

      <!-- Search and Filters Section -->

      <div class="flex flex-col md:flex-row gap-4 my-8">
        <!-- Search Bar -->
        <input
          type="text"
          placeholder="Search articles..."
          class="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <!-- Category Filter -->
        <select
          class="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="">All Topics</option>
          <option value="anxiety">Anxiety</option>
          <option value="depression">Depression</option>
          <option value="mindfulness">Mindfulness</option>
          <option value="self-care">Self-Care</option>
          <option value="therapy">Therapy</option>
        </select>
      </div>

      <!-- Blog Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Blog Card 1 -->
        <div
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <img
            src="https://via.placeholder.com/400x200"
            alt="Blog Image"
            class="w-full h-48 object-cover"
          />
          <div class="p-6">
            <span class="text-sm text-teal-600 font-semibold">Anxiety</span>
            <h2 class="text-xl font-bold mt-2">Managing Anxiety in Daily Life</h2>
            <p class="text-gray-600 mt-2">
              Practical tips and techniques to help you manage anxiety and stay calm in stressful
              situations.
            </p>
            <a href="#" class="inline-block mt-4 text-teal-600 font-semibold hover:underline">
              Read More →
            </a>
          </div>
        </div>

        <!-- Blog Card 2 -->
        <div
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <img
            src="https://via.placeholder.com/400x200"
            alt="Blog Image"
            class="w-full h-48 object-cover"
          />
          <div class="p-6">
            <span class="text-sm text-purple-600 font-semibold">Mindfulness</span>
            <h2 class="text-xl font-bold mt-2">The Power of Mindfulness Meditation</h2>
            <p class="text-gray-600 mt-2">
              Learn how mindfulness meditation can improve your mental clarity and reduce stress.
            </p>
            <a href="#" class="inline-block mt-4 text-teal-600 font-semibold hover:underline">
              Read More →
            </a>
          </div>
        </div>

        <!-- Blog Card 3 -->
        <div
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <img
            src="https://via.placeholder.com/400x200"
            alt="Blog Image"
            class="w-full h-48 object-cover"
          />
          <div class="p-6">
            <span class="text-sm text-orange-600 font-semibold">Self-Care</span>
            <h2 class="text-xl font-bold mt-2">Self-Care Practices for Mental Health</h2>
            <p class="text-gray-600 mt-2">
              Discover simple self-care routines to boost your mood and improve your mental
              well-being.
            </p>
            <a href="#" class="inline-block mt-4 text-teal-600 font-semibold hover:underline">
              Read More →
            </a>
          </div>
        </div>

        <!-- Blog Card 4 -->
        <div
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <img
            src="https://via.placeholder.com/400x200"
            alt="Blog Image"
            class="w-full h-48 object-cover"
          />
          <div class="p-6">
            <span class="text-sm text-blue-600 font-semibold">Therapy</span>
            <h2 class="text-xl font-bold mt-2">What to Expect in Your First Therapy Session</h2>
            <p class="text-gray-600 mt-2">
              A guide to help you prepare for your first therapy session and make the most of it.
            </p>
            <a href="#" class="inline-block mt-4 text-teal-600 font-semibold hover:underline">
              Read More →
            </a>
          </div>
        </div>

        <!-- Blog Card 5 -->
        <div
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <img
            src="https://via.placeholder.com/400x200"
            alt="Blog Image"
            class="w-full h-48 object-cover"
          />
          <div class="p-6">
            <span class="text-sm text-pink-600 font-semibold">Depression</span>
            <h2 class="text-xl font-bold mt-2">Understanding and Coping with Depression</h2>
            <p class="text-gray-600 mt-2">
              Learn about the signs of depression and strategies to cope and seek help.
            </p>
            <a href="#" class="inline-block mt-4 text-teal-600 font-semibold hover:underline">
              Read More →
            </a>
          </div>
        </div>

        <!-- Blog Card 6 -->
        <div
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <img
            src="https://via.placeholder.com/400x200"
            alt="Blog Image"
            class="w-full h-48 object-cover"
          />
          <div class="p-6">
            <span class="text-sm text-yellow-600 font-semibold">Mindfulness</span>
            <h2 class="text-xl font-bold mt-2">Breathing Techniques for Stress Relief</h2>
            <p class="text-gray-600 mt-2">
              Simple breathing exercises to help you relax and reduce stress in minutes.
            </p>
            <a href="#" class="inline-block mt-4 text-teal-600 font-semibold hover:underline">
              Read More →
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Section -->
    <footer class="bg-gray-800 text-white py-6 mt-8">
      <div class="container mx-auto px-4 text-center">
        <p>&copy; 2023 Mental Health Platform. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>
