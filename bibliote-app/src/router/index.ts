import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/tabela',
      name: 'tabela',
      component: () => import('../views/Servidor/TabelaView.vue'),
    },
    {
      path: '/testes',
      name: 'testes',
      component: () => import('../views/Servidor/teste.vue'),
    },
    {
      path: '/barra',
      name: 'barra',
      component: () => import('../views/Servidor/BarraView.vue'),
    },
  ],
})

export default router
