import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/LandingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { requiresAuth: false },
      component: LandingView,
    },
    {
      path: '/anon-chatroom/:id',
      name: 'anon-chatroom',
      meta: { requiresAuth: true },
      component: () => import('../views/AnonChat.vue'),
    },
    {
      path: '/anon-chats',
      name: 'anon-chats',
      meta: { requiresAuth: true },
      component: () => import('../views/AnonChats.vue'),
    },
    {
      path: '/user',
      name: 'user',
      meta: { requiresAuth: false },
      component: () => import('../views/UserAuth.vue'),
      children: [
        {
          path: 'signin',
          name: 'signin',
          meta: { requiresAuth: false },
          component: () => import('../views/SigninUser.vue'),
        },
        {
          path: 'signup',
          name: 'signup',
          component: () => import('../views/SignupUser.vue'),
        },
        {
          path: 'signup-therapist',
          name: 'signup-therapist',
          meta: { requiresAuth: false },
          component: () => import('../views/SignupTherapist.vue'),
        },
        {
          path: 'signup-student',
          name: 'signup-student',
          meta: { requiresAuth: false },
          component: () => import('../views/SignupStudent.vue'),
        },
      ],
    },
    {
      path: '/chat-call/:id',
      name: 'chat-call',
      meta: { requiresAuth: true },
      component: () => import('../views/CallVideo.vue'),
    },

    {
      path: '/chat/:id',
      name: 'chat',
      meta: { requiresAuth: true },
      component: () => import('../views/ChatRoom.vue'),
    },
    {
      path: '/chat-history',
      name: 'chat-history',
      meta: { requiresAuth: true },
      component: () => import('../views/ChatHistory.vue'),
    },

    {
      path: '/our-team',
      name: 'our-team',
      meta: { requiresAuth: true },
      component: () => import('../views/OurTeam.vue'),
    },
    {
      path: '/therapist/:id',
      name: 'therapist',
      meta: { requiresAuth: true },
      component: () => import('../views/TherapistProfile.vue'),
    },
    {
      path: '/resources',
      name: 'resources',
      meta: { requiresAuth: true },
      component: () => import('../views/ResourcesView.vue'),
    },
    {
      path: '/resource/:id',
      name: 'resource',
      meta: { requiresAuth: true },
      component: () => import('../views/ViewResource.vue'),
    },
    {
      path: '/user-profile',
      name: 'user-profile',
      meta: { requiresAuth: true },
      component: () => import('../views/UserProfile.vue'),
    },

    {
      path: '/admin',
      name: 'admin',
      meta: { requiresAuth: true },
      component: () => import('../views/AdminPanel.vue'),
      children: [
        {
          path: 'reports',
          name: 'admin-reports',
          meta: { requiresAuth: true },
          component: () => import('../views/AdminReport.vue'),
        },
        {
          path: 'users',
          name: 'admin-users',
          meta: { requiresAuth: true },
          component: () => import('../views/AdminUsers.vue'),
        },
        {
          path: 'therapists',
          name: 'admin-therapists',
          meta: { requiresAuth: true },
          component: () => import('../views/AdminTherapists.vue'),
        },
        {
          path: 'resources',
          name: 'admin-resources',
          meta: { requiresAuth: true },
          component: () => import('../views/AdminResources.vue'),
        },
      ],
    },
  ],
})
router.beforeEach(async (to, from) => {
  let loggedIn = (localStorage.getItem('loggedIn') == 'true' ? true : false) || false
  console.log(from)
  if (to.meta.requiresAuth && !loggedIn) return { name: 'login' }
  // if (to.path.startsWith('/user') && loggedIn) return { path: '/' }
  if (to.meta.requiresAuth && loggedIn) return true
  if (!to.meta.requiresAuth && !loggedIn) return true
})
export default router
