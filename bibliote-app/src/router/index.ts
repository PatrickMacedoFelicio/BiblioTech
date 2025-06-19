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
      path: '/consultar/leitor',
      name: 'viewLeitor',
      component: () => import('../views/Consultar/ViewLeitor.vue'),
    },
    {
      path: '/consultar/funcionario',
      name: 'viewFuncionario',
      component: () => import('../views/Consultar/View-Funcionario.vue'),
    },
    {
      path: '/consultar/livro',
      name: 'viewLivro',
      component: () => import('../views/Consultar/View-Livro.vue'),
    },
    {
      path: '/consultar/Estoque',
      name: 'viewEstoque',
      component: () => import('../views/Consultar/View-Estoque.vue'),
    },
    {
      path: '/consultar/Fornecedor',
      name: 'viewFornecedor',
      component: () => import('../views/Consultar/View-Fornecedor.vue'),
    },
    {
      path: '/consultar/Categoria',
      name: 'viewCategoria',
      component: () => import('../views/Consultar/View-Categoria.vue'),
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
      path: '/cadastrar/fornecedor',
      name: 'cadastrar-fornecedor',
      component: () => import('../views/Cadastrar/Cad-Fornecedor.vue'),
    },
    {
      path: '/Emprestimo',
      name: 'emprestimo',
      component: () => import('../views/Cadastrar/Emprestar.vue'),
    },
    {
      path: '/cadastrar/categoria',
      name: 'categoria',
      component: () => import('../views/Cadastrar/Cad-Categoria.vue'),
    },
    {
      path: '/cadastrar/estoque',
      name: 'cadastrar-estoque',
      component: () => import('../views/Cadastrar/Cad-Estoque.vue'),
    },
    {
      path: '/cadastrar/funcionario',
      name: 'funcionario',
      component: () => import('../views/Cadastrar/Cad-Funcionario.vue'),
    },

  ],
})

export default router
