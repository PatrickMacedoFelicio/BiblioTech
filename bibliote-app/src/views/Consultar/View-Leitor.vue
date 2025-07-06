<template>
  <div class="page-header">
    <h3 class="card-title">Consulta de Leitores</h3>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">Consultar</a></li>
        <li class="breadcrumb-item active" aria-current="page">Leitores</li>
      </ol>
    </nav>
  </div>

  <div class="row">
    <div class="col-lg-12 grid-margin stretch-card">
      <div class="card">
        <div class="card-body">
          <div class="form-group row">
            <div class="col-5">
              <label>Nome do Leitor</label>
              <input class="form-control form-control-lg" type="text" v-model="filtro"
                placeholder="Digite o nome do leitor..." />
            </div>
            <div class="col col-lg-2 d-flex align-items-end">
              <button class="btn btn-success btn-fw btn-lg w-100 btn-icon-text" @click="buscarLeitores">
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
                  <th>Telefone</th>
                  <th>Email</th>
                  <th class="text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="leitor in leitoresPaginado" :key="leitor.id">
                  <td>{{ leitor.nome }}</td>
                  <td>{{ leitor.cpf }}</td>
                  <td>{{ leitor.telefone }}</td>
                  <td>{{ leitor.email }}</td>
                  <td>
                    <div class="d-flex justify-content-center">
                      <button class="btn btn-info btn-sm" @click="visualizarLeitor(leitor)">
                        <i class="mdi mdi-magnify"></i>
                      </button>
                      <button class="btn btn-success btn-sm ms-2 gap1">
                        <i class="mdi mdi-pencil"></i>
                      </button>
                      <button class="btn btn-danger btn-sm ms-2 gap1" @click="confirmarExclusao(leitor)">
                        <i class="mdi mdi-delete"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-if="leitoresFiltrados.length === 0">
            <p class="text-center text-muted">Nenhum leitor encontrado.</p>
          </div>

          <!-- Modal de Visualização -->
          <ModalLeitor :visivel="mostrarModal" :leitor="leitorSelecionado" @fechar="fecharModal" />

          <!-- Paginação -->
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
import { defineComponent } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import ModalLeitor from '@/components/modals/ModalLeitor.vue';

interface Leitor {
  id: string,
  nome: string,
  email: string,
  telefone: string,
  cpf: string,
  dataNasc: string,
  cep: string,
  Rua: string,
  Bairro: string,
  Numero: string,
  estado: string,
  cidade: string,
}

export default defineComponent({
  name: 'ConsultaLeitor',
  components: { ModalLeitor },

  data() {
    return {
      leitores: [] as Leitor[],
      filtro: '',
      paginaAtual: 1,
      itensPorPagina: 8,
      mostrarModal: false,
      leitorSelecionado: {} as Leitor,
    };
  },

  computed: {
    leitoresFiltrados(): Leitor[] {
      const texto = this.filtro.toLowerCase();
      return this.leitores.filter(leitor => leitor.nome?.toLowerCase().includes(texto));
    },
    totalPaginas(): number {
      return Math.ceil(this.leitoresFiltrados.length / this.itensPorPagina);
    },
    leitoresPaginado(): Leitor[] {
      const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
      return this.leitoresFiltrados.slice(inicio, inicio + this.itensPorPagina);
    }
  },

  mounted() {
    this.buscarLeitores();
  },

  methods: {
    async buscarLeitores() {
      this.paginaAtual = 1;
      try {
        const response = await axios.get('http://localhost:3000/leitores');
        this.leitores = response.data;
      } catch (erro: any) {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao carregar leitores',
          text: erro.message || 'Verifique se o servidor JSON está ativo.'
        });
      }
    },

    confirmarExclusao(leitor: Leitor) {
      Swal.fire({
        title: 'Tem certeza?',
        text: `Deseja excluir o leitor "${leitor.nome}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar'
      }).then(result => {
        if (result.isConfirmed) {
          this.excluirLeitor(leitor.id);
        }
      });
    },

    async excluirLeitor(id: string) {
      try {
        await axios.delete(`http://localhost:3000/leitores/${id}`);
        this.leitores = this.leitores.filter(l => l.id !== id);
        Swal.fire({
          icon: 'success',
          title: 'Excluído!',
          text: 'Leitor removido com sucesso.'
        });
      } catch (erro: any) {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao excluir leitor',
          text: erro.message || 'Tente novamente mais tarde.'
        });
      }
    },

    visualizarLeitor(leitor: Leitor) {
      this.leitorSelecionado = leitor;
      this.mostrarModal = true;
    },

    fecharModal() {
      this.mostrarModal = false;
    },

    irParaPagina(pagina: number) {
      this.paginaAtual = pagina;
    }
  }
});
</script>
