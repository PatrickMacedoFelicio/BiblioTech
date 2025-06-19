<template>
  <div class="page-header">
    <h3 class="card-title">Consulta de Funcionários</h3>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">Consultar</a></li>
        <li class="breadcrumb-item active" aria-current="page">Funcionários</li>
      </ol>
    </nav>
  </div>

  <div class="row">
    <div class="col-lg-12 grid-margin stretch-card">
      <div class="card">
        <div class="card-body">
          <div class="form-group row">
            <div class="col-5">
              <label>Nome</label>
              <input
                class="typeahead form-control form-control-lg"
                type="text"
                v-model="filtro"
                placeholder="Digite o nome do funcionário..."
              />
            </div>
            <div class="col col-lg-2 d-flex align-items-end">
              <button class="btn btn-success btn-fw btn-lg w-100" @click="buscarFuncionarios">
                Buscar
              </button>
            </div>
          </div>

          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>CPF</th>
                  <th>Cargo</th>
                  <th>Telefone</th>
                  <th>Email</th>
                  <th class="text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(func, index) in funcionariosFiltrados" :key="index">
                  <td>{{ func.nome }}</td>
                  <td>{{ func.cpf }}</td>
                  <td>{{ func.cargo }}</td>
                  <td>{{ func.telefone }}</td>
                  <td>{{ func.email }}</td>
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
  name: 'ConsultaFuncionario',

  data() {
    return {
      filtro: '',
      funcionarios: [] as Array<{
        nome: string;
        cpf: string;
        cargo: string;
        telefone: string;
        email: string;
      }>
    };
  },

  computed: {
    funcionariosFiltrados() {
      const texto = this.filtro.toLowerCase();
      return this.funcionarios.filter(func =>
        func.nome.toLowerCase().includes(texto)
      );
    }
  },

  mounted() {
    this.buscarFuncionarios();
  },

  methods: {
    buscarFuncionarios() {
      // Simulação de dados
      this.funcionarios = [
        {
          nome: 'João da Silva',
          cpf: '123.456.789-00',
          cargo: 'Bibliotecário',
          telefone: '(69) 99999-9999',
          email: 'joao@exemplo.com'
        },
        {
          nome: 'Maria Oliveira',
          cpf: '987.654.321-00',
          cargo: 'Atendente',
          telefone: '(69) 98888-8888',
          email: 'maria@exemplo.com'
        }
      ];
    }
  }
});
</script>
