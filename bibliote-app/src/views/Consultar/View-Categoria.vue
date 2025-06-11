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
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="filtro"
                placeholder="Digite o nome da categoria..."
              />
            </div>
            <div class="col col-lg-2 d-flex align-items-end">
              <button
                class="btn btn-success btn-fw btn-lg w-100 btn-icon-text"
                @click="buscarCategorias"
              >
                Buscar
              </button>
            </div>
          </div>

          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Descrição</th>
                  <th class="text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(categoria, index) in categoriasFiltradas" :key="index">
                  <td>{{ categoria.id }}</td>
                  <td>{{ categoria.nome }}</td>
                  <td>{{ categoria.descricao }}</td>
                  <td>
                    <div class="d-flex justify-content-center">
                      <RouterLink class="btn btn-info btn-sm" to="/">
                        <i class="mdi mdi-magnify"></i>
                      </RouterLink>
                      <RouterLink class="btn btn-success btn-sm ms-2 gap1" to="/">
                        <i class="mdi mdi-pencil"></i>
                      </RouterLink>
                      <RouterLink class="btn btn-danger btn-sm ms-2 gap1" to="/">
                        <i class="mdi mdi-delete"></i>
                      </RouterLink>
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

export default defineComponent({
  name: 'ConsultaCategoria',

  data() {
    return {
      filtro: '',
      categorias: [] as Array<{
        id: number;
        nome: string;
        descricao: string;
      }>
    };
  },

  computed: {
    categoriasFiltradas() {
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
        { id: 1, nome: 'Ficção Científica', descricao: 'Livros com temáticas futuristas e tecnológicas' },
        { id: 2, nome: 'Romance', descricao: 'Narrativas centradas em relações amorosas' },
        { id: 3, nome: 'Biografia', descricao: 'Histórias de vida de pessoas reais' }
      ];
    }
  }
});
</script>
