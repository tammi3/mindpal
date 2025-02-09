<script setup>
import HeaderView from '@/components/HeaderView.vue'
</script>
<template>
  <div>
    <!-- Header Section -->
    <HeaderView />

    <!-- Main Content Section -->
    <div class="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
      <!-- Blog Post Content -->
      <article class="flex-grow bg-white rounded-lg shadow-md overflow-hidden p-6">
        <!-- Featured Image -->
        <img
          src="https://via.placeholder.com/800x400"
          alt="Featured Image"
          class="w-full h-64 sm:h-96 object-cover rounded-lg"
        />
        <!-- Title -->
        <h1 class="text-3xl font-bold text-gray-800 mt-6 mb-4">Managing Anxiety in Daily Life</h1>
        <!-- Author and Date -->
        <div class="flex items-center text-gray-600 mb-6">
          <span class="mr-4">By <strong>Jane Doe</strong></span>
          <span>Published on <strong>October 10, 2023</strong></span>
        </div>
        <!-- Blog Body -->
        <div class="prose max-w-none text-gray-700">
          <p>
            Anxiety is a common mental health challenge that affects millions of people worldwide.
            While it can feel overwhelming, there are practical steps you can take to manage anxiety
            and improve your daily life. In this article, we'll explore some effective strategies to
            help you stay calm and focused.
          </p>
          <h2 class="text-2xl font-bold mt-6">1. Practice Deep Breathing</h2>
          <p>
            Deep breathing is a simple yet powerful technique to reduce anxiety. By focusing on your
            breath, you can calm your nervous system and regain control over your emotions. Try the
            4-7-8 breathing technique: inhale for 4 seconds, hold for 7 seconds, and exhale for 8
            seconds.
          </p>
          <h2 class="text-2xl font-bold mt-6">2. Stay Active</h2>
          <p>
            Regular physical activity can significantly reduce anxiety levels. Exercise releases
            endorphins, which are natural mood boosters. Whether it's a brisk walk, yoga, or a
            workout session, find an activity you enjoy and make it part of your routine.
          </p>
          <h2 class="text-2xl font-bold mt-6">3. Limit Caffeine and Alcohol</h2>
          <p>
            Caffeine and alcohol can exacerbate anxiety symptoms. Try to limit your intake of these
            substances, especially if you notice they make you feel more anxious or restless.
          </p>
          <h2 class="text-2xl font-bold mt-6">4. Seek Professional Help</h2>
          <p>
            If anxiety is significantly impacting your life, consider seeking help from a mental
            health professional. Therapy, counseling, and medication can provide effective support
            and treatment.
          </p>
        </div>
        <!-- Call-to-Action -->
        <div class="mt-8 p-6 bg-teal-50 rounded-lg">
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
            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="flex items-center mb-2">
                <span class="font-bold text-gray-800">John Doe</span>
                <span class="text-sm text-gray-600 ml-4">October 12, 2023</span>
              </div>
              <p class="text-gray-700">
                This article was really helpful! The breathing technique has made a big difference
                for me.
              </p>
            </div>
            <!-- Comment 2 -->
            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="flex items-center mb-2">
                <span class="font-bold text-gray-800">Jane Smith</span>
                <span class="text-sm text-gray-600 ml-4">October 11, 2023</span>
              </div>
              <p class="text-gray-700">
                Thank you for sharing these tips. Staying active has been a game-changer for my
                anxiety.
              </p>
            </div>
          </div>
          <!-- Comment Form -->
          <form class="mt-6">
            <textarea
              placeholder="Add a comment..."
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
      <aside class="w-full lg:w-[450px]">
        <!-- Resources Section -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
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
        <div class="bg-white rounded-lg shadow-md p-6">
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
