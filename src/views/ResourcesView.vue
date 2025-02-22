<script setup>
import { useArticleStore } from '../stores/article.js'
import { useSearchArticles } from '@/composables/searchArticles.js'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
const articleStore = useArticleStore()
const { tags, search, articles } = storeToRefs(articleStore)
const filteredArticles = useSearchArticles(articles, search)
const selectedTag = ref('')

onMounted(() => {
  articleStore.getArticleTags()
  articleStore.getArticles('All')
})
</script>
<template>
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
        v-model="search"
        type="text"
        placeholder="Search articles..."
        class="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
      <!-- Category Filter -->
      <select
        v-model="selectedTag"
        @change="articleStore.getArticles(selectedTag)"
        class="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
      >
        <option value="All" selected>All</option>
        <option v-for="tag in tags" :value="tag" :key="tag">{{ tag }}</option>
      </select>
    </div>

    <!-- Blog Grid -->
    <div
      v-if="filteredArticles.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <!-- Blog Card 1 -->
      <div
        v-for="article in filteredArticles"
        :key="article"
        class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
      >
        <img :src="article.imageUrl" alt="Blog Image" class="w-full h-48 object-cover" />
        <div class="p-6">
          <span class="text-sm text-teal-600 font-semibold">{{ article.tag }}</span>
          <h2 class="text-xl font-bold mt-2">{{ article.title }}</h2>
          <p class="text-gray-600 mt-2">
            Practical tips and techniques to help you manage anxiety and stay calm in stressful
            situations.
          </p>
          <router-link
            :to="'/resource/' + article.id"
            class="inline-block mt-4 text-teal-600 font-semibold hover:underline"
          >
            Read More →
          </router-link>
        </div>
      </div>
    </div>
  </div>

  <!-- Footer Section -->
  <!-- <footer class="bg-gray-800 text-white py-6 mt-8">
      <div class="container mx-auto px-4 text-center">
        <p>&copy; 2023 Mental Health Platform. All rights reserved.</p>
      </div>
    </footer> -->
</template>
