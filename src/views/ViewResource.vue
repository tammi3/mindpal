<script setup>
import 'quill/dist/quill.snow.css'
import { auth } from '@/db/firebase.js'
import { useRoute } from 'vue-router'
import { useArticleStore } from '../stores/Article.js'
import { useUserStore } from '@/stores/user.js'
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'
const userStore = useUserStore()
const articleStore = useArticleStore()
const { userInfo } = storeToRefs(userStore)
const { article } = storeToRefs(articleStore)
const route = useRoute()
const id = route.params.id
const user = auth.currentUser
const comment = ref({
  articleId: id,
  userId: user.uid,
  username: '',
  content: '',
  createdAt: new Date(),
  updatedAt: new Date(),
  isFlagged: false,
})
watch(article, (newValue) => {
  if (article.value?.content) {
    console.log(article.value)
    setTimeout(() => {
      document.getElementById('article-content').innerHTML = article.value.content
    }, 1000)
  }
})
watch(userInfo, (newValue) => {
  if (userInfo.value !== '') {
    console.log(userInfo.value)
    comment.value.username = userInfo.value.name.firstname + ' ' + userInfo.value.name.lastname
  }
})
function handleSumbit(comment) {
  articleStore.commentOnArticle(comment)
  comment.content = ''
}
onMounted(() => {
  articleStore.getArticle(id)
})
</script>
<template>
  <div>
    <!-- Main Content Section -->
    <div class="container mx-auto px-4 py-8 flex flex-col gap-8">
      <!-- Blog Post Content -->
      <article
        v-if="article.title"
        class="w-full bg-white rounded-lg shadow-md overflow-hidden p-6"
      >
        <!-- Featured Image -->
        <img
          :src="article.imageUrl"
          alt="Featured Image"
          class="w-full h-64 sm:h-96 object-cover rounded-lg"
        />
        <!-- Title -->
        <h1 class="text-3xl font-bold text-gray-800 mt-6 mb-4">{{ article.title }}</h1>
        <!-- Author and Date -->
        <div
          class="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:items-center text-gray-600 mb-6"
        >
          <span class="mr-4"
            >By <strong>{{ article.authorName }}</strong></span
          >
          <span
            >Published on
            <strong>{{
              article.createdAt.toDate().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            }}</strong></span
          >
        </div>
        <!-- Blog Body -->
        <div id="article-content" class="ql-editor prose max-w-none text-gray-700"></div>
        <!-- Call-to-Action -->
        <div class="mt-8 p-6 bg-teal-50 rounded-lg block">
          <h3 class="text-xl font-bold text-teal-800">Need Immediate Support?</h3>
          <p class="text-gray-700 mt-2">
            If you're struggling with anxiety or other mental health challenges, reach out to a
            professional today. You're not alone.
          </p>
          <a
            href="#"
            class="inline-block mt-4 px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
          >
            Get Help Now
          </a>
        </div>
        <!-- Comments Section -->
        <div class="mt-8">
          <h3 class="text-2xl font-bold text-gray-800 mb-4">Comments</h3>
          <div class="space-y-4">
            <!-- Comment 1 -->
            <div
              v-for="comment in article.comments"
              :key="comment.id"
              class="bg-gray-50 p-4 rounded-lg"
            >
              <div class="flex items-center mb-2">
                <span class="font-bold text-gray-800">{{ comment.username }}</span>
                <span class="text-sm text-gray-600 ml-4">{{
                  comment.createdAt.toDate().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                }}</span>
              </div>
              <p class="text-gray-700">
                {{ comment.content }}
              </p>
            </div>
          </div>
          <!-- Comment Form -->
          <form @submit.prevent="handleSumbit(comment)" class="mt-6">
            <textarea
              placeholder="Add a comment..."
              v-model="comment.content"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              rows="4"
            ></textarea>
            <button
              type="submit"
              class="mt-4 px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
            >
              Submit
            </button>
          </form>
        </div>
      </article>

      <!-- Sidebar -->
      <aside class="w-full lg:flex lg:space-x-3">
        <!-- Resources Section -->
        <div class="lg:w-1/2 bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 class="text-xl font-bold text-gray-800 mb-4">Resources</h3>
          <ul class="space-y-2">
            <li>
              <a href="#" class="text-teal-600 hover:underline">Crisis Hotlines</a>
            </li>
            <li>
              <a href="#" class="text-teal-600 hover:underline">Find a Therapist</a>
            </li>
            <li>
              <a href="#" class="text-teal-600 hover:underline">Self-Help Guides</a>
            </li>
          </ul>
        </div>
        <!-- Related Articles -->
        <div class="lg:w-1/2 bg-white rounded-lg shadow-md p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-4">Related Articles</h3>
          <ul class="space-y-4">
            <li>
              <a href="#" class="text-teal-600 hover:underline"
                >The Power of Mindfulness Meditation</a
              >
            </li>
            <li>
              <a href="#" class="text-teal-600 hover:underline"
                >Self-Care Practices for Mental Health</a
              >
            </li>
            <li>
              <a href="#" class="text-teal-600 hover:underline"
                >What to Expect in Your First Therapy Session</a
              >
            </li>
          </ul>
        </div>
      </aside>
    </div>

    <!-- Footer Section -->
    <footer class="bg-gray-800 text-white py-6 mt-8">
      <div class="container mx-auto px-4 text-center">
        <p>&copy; 2023 Mental Health Platform. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>
<style scoped>
/* Ensure the Quill editor content has consistent spacing and typography */
.ql-editor {
  font-family: 'Arial', sans-serif;
  font-size: 16px;
  line-height: 2;
  color: #333;
  padding: 0;
  height: auto;
  text-align: justify;
}

/* Header styles */
.ql-editor h1 {
  font-size: 2em;
  font-weight: bold;
}

.ql-editor h2 {
  font-size: 1.75em;
  font-weight: bold;
}

.ql-editor h3 {
  font-size: 1.5em;
  font-weight: bold;
}

/* Font size styles */
.ql-size-small {
  font-size: 12px;
}

.ql-size-large {
  font-size: 20px;
}

.ql-size-huge {
  font-size: 28px;
}

/* Bold, Italic, and Underline */
.ql-editor strong {
  font-weight: bold;
}

.ql-editor em {
  font-style: italic;
}

.ql-editor u {
  text-decoration: underline;
}

/* Text color */
.ql-color-red {
  color: red;
}

.ql-color-blue {
  color: blue;
}

.ql-color-green {
  color: green;
}

/* Background color */
.ql-bg-yellow {
  background-color: yellow;
}

.ql-bg-gray {
  background-color: gray;
}

/* Ordered and Bullet Lists */
.ql-editor ol {
  list-style-type: decimal;
  padding-left: 20px;
}

.ql-editor ul {
  list-style-type: disc;
  padding-left: 20px;
}

/* Blockquote */
.ql-editor blockquote {
  border-left: 4px solid #ccc;
  padding-left: 10px;
  font-style: italic;
  color: #555;
}

/* Code Block */
.ql-editor pre {
  background-color: #f4f4f4;
  padding: 10px;
  border-radius: 5px;
  font-family: 'Courier New', monospace;
  overflow-x: auto;
}

/* Reset/Clean */
.ql-clean {
  all: unset;
}
</style>
