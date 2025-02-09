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
      path: '/user',
      name: 'user',
      meta: { requiresAuth: false },
      component: () => import('../views/UserAuth.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          meta: { requiresAuth: false },
          component: () => import('../views/LoginUser.vue'),
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
      path: '/chatroom/:id',
      name: 'chatroom',
      meta: { requiresAuth: true },
      component: () => import('../views/ChatRoom.vue'),
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
      path: '/admin',
      name: 'admin',
      meta: { requiresAuth: true },
      component: () => import('../views/AdminPanel.vue'),
      children: [
        {
          path: 'reports',
          name: 'reports',
          meta: { requiresAuth: true },
          component: () => import('../views/AdminReport.vue'),
        },
        {
          path: 'users',
          name: 'users',
          meta: { requiresAuth: true },
          component: () => import('../views/AdminUsers.vue'),
        },
        {
          path: 'therapists',
          name: 'therapists',
          meta: { requiresAuth: true },
          component: () => import('../views/AdminTherapists.vue'),
        },
      ],
    },
  ],
})
router.beforeEach(async (to, from) => {
  let loggedIn = (localStorage.getItem('loggedIn') == 'true' ? true : false) || false
  // console.log(from)
  if (to.meta.requiresAuth && !loggedIn) return { name: 'login' }
  // if (to.path.startsWith('/user') && loggedIn) return { path: '/' }
  if (to.meta.requiresAuth && loggedIn) return true
  if (!to.meta.requiresAuth && !loggedIn) return true
})
export default router
