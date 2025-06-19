<template>
  <div class="page-header">
    <h3 class="card-title">Consulta de Categorias</h3>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">Consultar</a></li>
        <li class="breadcrumb-item active" aria-current="page">Categorias</li>
      </ol>
    </nav>
  </div>

  <div class="row">
    <div class="col-lg-12 grid-margin stretch-card">
      <div class="card">
        <div class="card-body">
          <div class="form-group row">
            <div class="col-5">
              <label>Nome da Categoria</label>
              <input class="form-control form-control-lg" type="text" v-model="filtro"
                placeholder="Digite o nome da categoria..." />
            </div>
            <div class="col col-lg-2 d-flex align-items-end">
              <button class="btn btn-success btn-fw btn-lg w-100 btn-icon-text" @click="buscarCategorias">
                Buscar
              </button>
            </div>
          </div>

          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Descrição</th>
                  <th class="text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(categoria, index) in categoriasFiltradas" :key="index">
                  <td>{{ categoria.nome }}</td>
                  <td>{{ categoria.descricao }}</td>
                  <td>
                    <div class="d-flex justify-content-center">
                      <!-- Visualizar -->
                      <button class="btn btn-info btn-sm" @click="visualizar(categoria)">
                        <i class="mdi mdi-magnify"></i>
                      </button>

                      <!-- Editar -->
                      <RouterLink
                        class="btn btn-success btn-sm ms-2"
                        :to="{
                          name: 'EditarCategoria',
                          query: {
                            nome: categoria.nome,
                            descricao: categoria.descricao
                          }
                        }"
                      >
                        <i class="mdi mdi-pencil"></i>
                      </RouterLink>

                      <!-- Excluir -->
                      <button class="btn btn-danger btn-sm ms-2" @click="confirmarExclusao(categoria)">
                        <i class="mdi mdi-delete"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Swal from 'sweetalert2';

interface Categoria {
  nome: string;
  descricao: string;
}

export default defineComponent({
  name: 'ConsultaCategoria',

  data() {
    return {
      filtro: '',
      categorias: [] as Categoria[]
    };
  },

  computed: {
    categoriasFiltradas(): Categoria[] {
      const texto = this.filtro.toLowerCase();
      return this.categorias.filter(cat =>
        cat.nome.toLowerCase().includes(texto)
      );
    }
  },

  mounted() {
    this.buscarCategorias();
  },

  methods: {
    buscarCategorias() {
      this.categorias = [
        { nome: 'Ficção Científica', descricao: 'Livros com temáticas futuristas e tecnológicas' },
        { nome: 'Romance', descricao: 'Narrativas centradas em relações amorosas' },
        { nome: 'Biografia', descricao: 'Histórias de vida de pessoas reais' }
      ];
    },

    visualizar(categoria: Categoria) {
      Swal.fire({
        title: categoria.nome,
        text: categoria.descricao,
        icon: 'info',
        confirmButtonText: 'Fechar'
      });
    },

    confirmarExclusao(categoria: Categoria) {
      Swal.fire({
        title: 'Tem certeza?',
        text: `Deseja excluir a categoria "${categoria.nome}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.excluirCategoria(categoria);
        }
      });
    },

    excluirCategoria(categoria: Categoria) {
      this.categorias = this.categorias.filter(c => c !== categoria);
      Swal.fire('Excluído!', 'A categoria foi removida.', 'success');
    }
  }
});
</script>
