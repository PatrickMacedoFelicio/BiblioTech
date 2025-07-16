<template>
  <div>
    <div class="page-header">
      <h3 class="card-title">Devolução</h3>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="#">Consultar</a></li>
          <li class="breadcrumb-item active" aria-current="page">Devoluções</li>
        </ol>
      </nav>
    </div>

    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">

            <!-- Filtros -->
            <div class="form-group row">
              <div class="col-4">
                <label>Livro</label>
                <input class="form-control form-control-lg" type="text" v-model="filtroLivro" placeholder="Digite o livro..." />
              </div>
              <div class="col-4">
                <label>Nome do leitor</label>
                <input class="form-control form-control-lg" type="text" v-model="filtroLeitor" placeholder="Digite o nome do leitor..." />
              </div>
              <div class="col-2 d-flex align-items-end">
                <button class="btn btn-success w-100 btn-lg" @click="buscarEmprestimos">Buscar</button>
              </div>
            </div>

            <!-- Tabela -->
            <div class="table-responsive mt-4">
              <table class="table">
                <thead>
                  <tr>
                    <th style="width: 100px;">Detalhes</th>
                    <th>Leitor</th>
                    <th>Livros</th>
                    <th class="text-center">Status</th>
                    <th class="text-center">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in emprestimosPaginados" :key="item.id">
                    <td class="text-center">
                      <button class="btn btn-info btn-sm" @click="visualizarEmprestimo(item)">
                        <i class="mdi mdi-magnify"></i>
                      </button>
                    </td>
                    <td>{{ item.clienteNome }}</td>
                    <td>{{ item.livrosNomes }}</td>
                    <td class="text-center">
                      <span class="badge" :class="getBadgeClass(item.status)">{{ item.status }}</span>
                    </td>
                    <td class="text-center">
                      <button class="btn btn-success btn-sm" @click="atualizarStatus(item, 'Devolvido')">
                        <i class="mdi mdi-check"></i>
                      </button>
                      <button class="btn btn-danger btn-sm ms-2" @click="atualizarStatus(item, 'Cancelado')">
                        <i class="mdi mdi-close"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Mensagem de lista vazia -->
            <div v-if="emprestimosFiltrados.length === 0" class="text-center text-muted mt-3">
              Nenhum empréstimo encontrado.
            </div>

            <!-- Modal para detalhes do empréstimo -->
            

            <!-- Paginação -->
            <div class="pagination mt-4 d-flex justify-content-center">
              <button class="page-link" :disabled="paginaAtual === 1" @click="paginaAtual--">Anterior</button>

              <button v-for="pagina in totalPaginas" :key="pagina" class="page-link"
                :class="{ active: pagina === paginaAtual }"
                @click="irParaPagina(pagina)">
                {{ pagina }}
              </button>

              <button class="page-link" :disabled="paginaAtual === totalPaginas" @click="paginaAtual++">Próxima</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { api } from '@/common/http';
import Swal from 'sweetalert2';
import ModalDevolucao from '@/components/modals/ModalDevolucao.vue';

interface Emprestimo {
  id: number;
  clienteId: number;
  clienteNome: string;
  funcionarioId: number;
  dataInicio: string;
  dataPrevista: string;
  dataDevolucao: string | null;
  status: string;
  livrosIds: number[];
  livrosNomes: string;
}

export default defineComponent({
  name: 'ViewDevolucao',
  components: { ModalDevolucao },

  data() {
    return {
      emprestimos: [] as Emprestimo[],
      filtroLivro: '',
      filtroLeitor: '',
      paginaAtual: 1,
      itensPorPagina: 8,
      mostrarModal: false,
      emprestimoSelecionado: null as Emprestimo | null,
    };
  },

  computed: {
    emprestimosFiltrados(): Emprestimo[] {
      const livroFiltro = this.filtroLivro.toLowerCase();
      const leitorFiltro = this.filtroLeitor.toLowerCase();
      return this.emprestimos.filter(e =>
        e.livrosNomes.toLowerCase().includes(livroFiltro) &&
        e.clienteNome.toLowerCase().includes(leitorFiltro)
      );
    },
    totalPaginas(): number {
      return Math.ceil(this.emprestimosFiltrados.length / this.itensPorPagina);
    },
    emprestimosPaginados(): Emprestimo[] {
      const start = (this.paginaAtual - 1) * this.itensPorPagina;
      return this.emprestimosFiltrados.slice(start, start + this.itensPorPagina);
    },
  },

  mounted() {
    this.buscarEmprestimos();
  },

  methods: {
    async buscarEmprestimos() {
      this.paginaAtual = 1;
      try {
        const res = await api.get('/emprestimos');
        // Mapeia o array, garantindo campos usados no template e no PUT
        this.emprestimos = res.data.map((e: any) => ({
          id: e.id,
          clienteId: e.clienteId,
          clienteNome: e.cliente?.nome || 'Cliente não encontrado',
          funcionarioId: e.funcionarioId,
          dataInicio: e.dataInicio,
          dataPrevista: e.dataPrevista,
          dataDevolucao: e.dataDevolucao,
          status: e.status,
          livrosIds: e.livros ? e.livros.map((l: any) => l.id) : [],
          livrosNomes: e.livros ? e.livros.map((l: any) => l.titulo).join(', ') : '',
        }));
      } catch (error: any) {
        Swal.fire('Erro', 'Falha ao carregar empréstimos: ' + error.message, 'error');
      }
    },

    async atualizarStatus(emprestimo: Emprestimo, novoStatus: string) {
      if (emprestimo.status === novoStatus) return;

      const emprestimoAtualizado = {
        dataInicio: emprestimo.dataInicio,
        dataPrevista: emprestimo.dataPrevista,
        dataDevolucao: novoStatus === 'Devolvido' ? new Date().toISOString() : emprestimo.dataDevolucao,
        status: novoStatus,
        clienteId: emprestimo.clienteId,
        funcionarioId: emprestimo.funcionarioId,
        livrosIds: emprestimo.livrosIds,
      };

      try {
        await api.put(`/emprestimos/${emprestimo.id}`, emprestimoAtualizado);
        Swal.fire('Sucesso', `Status atualizado para ${novoStatus}`, 'success');
        this.buscarEmprestimos();
      } catch (error: any) {
        Swal.fire('Erro', 'Falha ao atualizar status: ' + error.message, 'error');
      }
    },

    visualizarEmprestimo(emprestimo: Emprestimo) {
      this.emprestimoSelecionado = emprestimo;
      this.mostrarModal = true;
    },

    fecharModal() {
      this.mostrarModal = false;
      this.emprestimoSelecionado = null;
    },

    getBadgeClass(status: string): string {
      switch (status) {
        case 'Devolvido':
          return 'badge-success';
        case 'Cancelado':
          return 'badge-danger';
        case 'Ativo':
          return 'badge-warning';
        default:
          return 'badge-secondary';
      }
    },

    irParaPagina(pagina: number) {
      this.paginaAtual = pagina;
    },
  }
});
</script>

<style scoped>
.page-header {
  margin-bottom: 20px;
}
.badge-success {
  background-color: #28a745;
}
.badge-danger {
  background-color: #dc3545;
}
.badge-warning {
  background-color: #ffc107;
}
.badge-secondary {
  background-color: #6c757d;
}
.pagination .page-link {
  cursor: pointer;
}
.pagination .page-link.disabled {
  cursor: not-allowed;
}
.pagination .page-link.active {
  background-color: #007bff;
  color: white;
}
</style>
