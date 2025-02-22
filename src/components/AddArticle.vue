<script setup>
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import { useArticleStore } from '../stores/Article.js'
// import { useSearchArticles } from '@/composables/searchArticles.js'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { Modal } from 'flowbite'
const articleStore = useArticleStore()
const { tags } = storeToRefs(articleStore)
const editorContainer = ref(null) // Reference to Quill editor
const quill = ref(null)
const article = ref({
  title: '',
  content: '',
  authorName: '', // ID of the author
  createdAt: new Date(), // Timestamp of creation
  updatedAt: new Date(), // Timestamp of last update
  tag: '', // Relevant categories
  imageUrl: '', // Optional image
  isPublished: true, // Published status
  comments: [],
})

function toggle(action) {
  // set the modal menu element
  const $targetEl = document.getElementById('crud-modal')

  // options with default values
  const options = {
    placement: 'bottom-right',
    backdrop: 'dynamic',
    backdropClasses: 'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
    closable: true,
    onHide: () => {
      console.log('modal is hidden')
    },
    onShow: () => {
      console.log('modal is shown')
    },
    onToggle: () => {
      console.log('modal has been toggled')
    },
  }

  // instance options object
  const instanceOptions = {
    id: 'crud-modal',
    override: true,
  }
  const modal = new Modal($targetEl, options, instanceOptions)
  if (action === 'show') {
    modal.show()
  } else {
    modal.hide()
  }
}
function handleSubmit(article) {
  article.content = quill.value?.root.innerHTML
  articleStore.addArticle(article)
}
onMounted(() => {
  articleStore.getArticleTags()
  quill.value = new Quill(editorContainer.value, {
    theme: 'snow',
    placeholder: 'Write your article here...',
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, false] }], // Heading sizes
        [{ size: ['small', false, 'large', 'huge'] }], // Font size options
        ['bold', 'italic', 'underline'],
        [{ color: [] }, { background: [] }], // Text color & highlight
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['blockquote', 'code-block'],
        ['clean'],
      ],
    },
  })
})
</script>
<template>
  <div>
    <!-- Modal toggle -->
    <button
      data-modal-target="crud-modal"
      data-modal-toggle="crud-modal"
      class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      type="button"
      @click="toggle('show')"
    >
      + Add Article
    </button>

    <!-- Main modal -->
    <div
      id="crud-modal"
      tabindex="-1"
      aria-hidden="true"
      class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div class="relative p-4 w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          <!-- Modal header -->
          <div
            class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200"
          >
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Create New Article</h3>
            <button
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="crud-modal"
            >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
                @click="toggle('hide')"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->

          <form @submit.prevent="handleSubmit(article)" class="p-4 md:p-5">
            <div class="grid gap-4 mb-4 grid-cols-2 pb-10 overflow-y-scroll">
              <div class="col-span-2">
                <label
                  for="title"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Title</label
                >
                <input
                  type="text"
                  name="title"
                  id="title"
                  v-model="article.title"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Enter title"
                  required
                />
              </div>
              <div class="col-span-2 sm:col-span-1">
                <label
                  for="author-name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Author Name</label
                >
                <input
                  type="text"
                  name="author-name"
                  v-model="article.authorName"
                  id="author-name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Jane Doe"
                  required
                />
              </div>
              <div class="col-span-2 sm:col-span-1">
                <label
                  for="tag"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Tag</label
                >
                <select
                  id="tag"
                  v-model="article.tag"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                >
                  <option selected>Select tag</option>
                  <option v-for="tag in tags" :value="tag" :key="tag">{{ tag }}</option>
                </select>
              </div>
              <div class="col-span-2">
                <label
                  for="image"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Upload Image</label
                >
                <input
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  type="file"
                  accept="image/*"
                  name="image"
                  id="image"
                  required
                />
              </div>
              <div class="col-span-2">
                <label
                  for="content"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Content</label
                >
                <div
                  ref="editorContainer"
                  class="h-64 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                ></div>
              </div>
            </div>
            <button
              type="submit"
              class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                class="me-1 -ms-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Add new product
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
