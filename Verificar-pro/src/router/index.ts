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
      path: '/viewLeitor',
      name: 'viewLeitor',
      component: () => import('../views/Consultar/ViewLeitor.vue'),
    },
    {
      path: '/consultar/livro',
      name: 'viewLivro',
      component: () => import('../views/Consultar/View-Livro.vue'),
    },
    {
      path: '/cadastrar/leitor',
      name: 'cadastrar-leitor',
      component: () => import('../views/Cadastrar/Cad-Leitor.vue'),
    },
    {
      path: '/cadastrar/livro',
      name: 'cadastrar-livro',
      component: () => import('../views/Cadastrar/Cad-Livro.vue'),
    },
    {
      path: '/Emprestimo',
      name: 'emprestimo',
      component: () => import('../views/Emprestar.vue'),
    },

  ],
})

export default router
