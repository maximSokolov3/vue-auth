import { createRouter, createWebHistory } from 'vue-router'

import Auth from "@/views/Auth.vue";
import Home from "@/views/Home.vue";
import Help from "@/views/Help.vue";
import request from "@/views/Request.vue";
import NotFound from '@/views/NotFound.vue'
import EmailActivated from '@/views/EmailActivated.vue'
import DragAndDrop from '@/views/DragAndDrop.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/requests',
      name: 'requests',
      component: Home,
      meta: {
        layout: 'main',
        auth: true
      }
    },
    {
      path: '/help',
      name: 'help',
      component: Help,
      meta: {
        layout: 'main',
        auth: true
      }
    },
    {
      path: '/request/:id?',
      name: 'request',
      component: request,
      props: true,
      meta: {
        layout: 'main',
        auth: true
      }
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth,
      meta: {
        layout: 'auth',
        auth: false
      }
    },
    {
      path: '/:notFound(.*)',
      name: 'NotFound',
      component: NotFound
    },
    {
      path: '/email-activation',
      name: 'email-activation',
      component: EmailActivated
    },
    {
      path: '/drag-n-drop',
      name: 'drag-n-drop',
      component: DragAndDrop
    },
  ],
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  const isAuthRequired = to.meta.auth;

  if (!localStorage.getItem('token') && isAuthRequired) {
    next('/auth?message=auth')
  } else {
    next();
  }
})

export default router

