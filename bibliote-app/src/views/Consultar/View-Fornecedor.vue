<template>
  <div class="page-header">
    <h3 class="card-title">Consulta de Fornecedores</h3>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">Consultar</a></li>
        <li class="breadcrumb-item active" aria-current="page">Fornecedores</li>
      </ol>
    </nav>
  </div>

  <div class="row">
    <div class="col-lg-12 grid-margin stretch-card">
      <div class="card">
        <div class="card-body">
          <div class="form-group row">
            <div class="col-5">
              <label>Nome do Fornecedor</label>
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="filtro"
                placeholder="Digite o nome do fornecedor..."
              />
            </div>
            <div class="col col-lg-2 d-flex align-items-end">
              <button
                class="btn btn-success btn-fw btn-lg w-100 btn-icon-text"
                @click="buscarFornecedores"
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
                  <th>CNPJ</th>
                  <th>Telefone</th>
                  <th>Email</th>
                  <th class="text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(fornecedor, index) in fornecedoresFiltrados" :key="index">
                  <td>{{ fornecedor.id }}</td>
                  <td>{{ fornecedor.nome }}</td>
                  <td>{{ fornecedor.cnpj }}</td>
                  <td>{{ fornecedor.telefone }}</td>
                  <td>{{ fornecedor.email }}</td>
                  <td>
                    <div class="d-flex justify-content-center">
                      <RouterLink class="btn btn-info btn-sm" to="/">
                        <i class="mdi mdi-magnify"></i>
                      </RouterLink>
                      <RouterLink class="btn btn-success btn-sm ms-2" to="/">
                        <i class="mdi mdi-pencil"></i>
                      </RouterLink>
                      <RouterLink class="btn btn-danger btn-sm ms-2" to="/">
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
  name: 'ConsultaFornecedor',

  data() {
    return {
      filtro: '',
      fornecedores: [] as Array<{
        id: number;
        nome: string;
        cnpj: string;
        telefone: string;
        email: string;
      }>
    };
  },

  computed: {
    fornecedoresFiltrados() {
      const texto = this.filtro.toLowerCase();
      return this.fornecedores.filter(f =>
        f.nome.toLowerCase().includes(texto)
      );
    }
  },

  mounted() {
    this.buscarFornecedores();
  },

  methods: {
    buscarFornecedores() {
      this.fornecedores = [
        {
          id: 1,
          nome: 'Editora ALT',
          cnpj: '12.345.678/0001-90',
          telefone: '(11) 3333-4444',
          email: 'contato@livrosbr.com'
        },
        {
          id: 2,
          nome: 'Editora Alfa',
          cnpj: '98.765.432/0001-21',
          telefone: '(21) 2222-1111',
          email: 'vendas@editoraalfa.com'
        },
        {
          id: 3,
          nome: 'Grupo Beta Books',
          cnpj: '45.678.901/0001-55',
          telefone: '(31) 9999-8888',
          email: 'suporte@betabooks.com'
        }
      ];
    }
  }
});
</script>
