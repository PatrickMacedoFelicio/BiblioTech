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
              <input class="form-control form-control-lg" type="text" v-model="filtro"
                placeholder="Digite o nome do fornecedor..." />
            </div>
            <div class="col col-lg-2 d-flex align-items-end">
              <button class="btn btn-success btn-fw btn-lg w-100 btn-icon-text" @click="buscarFornecedores">
                Buscar
              </button>
            </div>
          </div>

          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>CNPJ</th>
                  <th>Telefone</th>
                  <th>Email</th>
                  <th class="text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in fornecedorPaginado" :key="item.id">
                  <td>{{ item.nome }}</td>
                  <td>{{ item.cnpj }}</td>
                  <td>{{ item.telefone }}</td>
                  <td>{{ item.email }}</td>
                  <td>
                    <div class="d-flex justify-content-center">
                      <button class="btn btn-info btn-sm" @click="visualizarFornecedor(item)">
                        <i class="mdi mdi-magnify"></i>
                      </button>
                      <button class="btn btn-success btn-sm ms-2 gap1" @click="editarFornecedor(item.id)">
                        <i class="mdi mdi-pencil"></i>
                      </button>
                      <button class="btn btn-danger btn-sm ms-2 gap1" @click="confirmarExclusao(item)">
                        <i class="mdi mdi-delete"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-if="fornecedorFiltrado.length === 0">
            <p class="text-center text-muted">Nenhum item encontrado.</p>
          </div>

          <ModalFornecedor :visivel="mostrarModal" :fornecedor="fornecedorSelecionado" @fechar="fecharModal" />

          <div class="pagination mt-4">
            <button class="page-link" :disabled="paginaAtual === 1" @click="paginaAtual--">Anterior</button>

            <button v-for="pagina in totalPaginas" :key="pagina" class="page-link"
              :class="{ active: pagina === paginaAtual }" @click="irParaPagina(pagina)">
              {{ pagina }}
            </button>

            <button class="page-link" :disabled="paginaAtual === totalPaginas" @click="paginaAtual++">Próxima</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { api } from '@/common/http';
import { defineComponent } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import ModalFornecedor from '@/components/modals/ModalFornecedor.vue';

interface Fornecedor {
  id: number,
  nome: string,
  cnpj: string,
  cep: string,
  rua: string,
  bairro: string,
  estado: string,
  cidade: string,
  telefone: string,
  email: string,
}

export default defineComponent({
  name: 'ConsultaFornecedor',
  components: { ModalFornecedor },

  data() {
    return {
      fornecedor: [] as Fornecedor[],
      filtro: '',
      paginaAtual: 1,
      mostrarModal: false,
      itensPorPagina: 8,
      fornecedorSelecionado: {} as Fornecedor
    };
  },

  computed: {
    fornecedorFiltrado(): Fornecedor[] {
      const texto = this.filtro.toLowerCase();
      return this.fornecedor.filter(item =>
        item.nome?.toLowerCase().includes(texto)
      );
    },
    totalPaginas(): number {
      return Math.ceil(this.fornecedorFiltrado.length / this.itensPorPagina);
    },
    fornecedorPaginado(): Fornecedor[] {
      const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
      return this.fornecedorFiltrado.slice(inicio, inicio + this.itensPorPagina);
    }
  },

  mounted() {
    this.buscarFornecedores();
  },

  methods: {
    async buscarFornecedores() {
      this.paginaAtual = 1;
      try {
        const response = await api.get('/fornecedores');
        this.fornecedor = response.data;
      } catch (erro: any) {
        console.error('Erro ao buscar o fornecedor:', erro);
        Swal.fire({
          icon: 'error',
          title: 'Erro ao carregar o fornecedor',
          text: erro.message || 'Verifique se o servidor JSON está ativo.'
        });
      }
    },

    //Exclução das coisas
    confirmarExclusao(item: Fornecedor) {
      Swal.fire({
        title: 'Tem certeza?',
        text: `Deseja excluir o fornecedor "${item.nome}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.excluirFornecedor(item.id);
        }
      });
    },


    async excluirFornecedor(id: number) {
      try {
        await api.delete(`/fornecedores/${id}`);
        this.fornecedor = this.fornecedor.filter(cat => cat.id !== id);

        Swal.fire({
          icon: 'success',
          title: 'Excluído!',
          text: 'Fornecedor removido com sucesso.'
        });
      } catch (erro: any) {
        console.error('Erro ao excluir:', erro);
        Swal.fire({
          icon: 'error',
          title: 'Erro ao excluir fornecedor',
          text: erro.message || 'Tente novamente mais tarde.'
        });
      }
    },

    //Edição
    async editarFornecedor(id: number) {
      this.$router.push(`/editar/fornecedor/${id}`);
    },

    irParaPagina(pagina: number) {
      this.paginaAtual = pagina;
    },
    visualizarFornecedor(cat: Fornecedor) {
      this.fornecedorSelecionado = cat;
      this.mostrarModal = true;
    },
    fecharModal() {
      this.mostrarModal = false;
    },
  }
});
</script>
