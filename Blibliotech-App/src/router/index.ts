// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/App.vue') // ou outro componente de sua preferência
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
