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

            <div class="form-group row">
              <div class="col-4">
                <label>Livro</label>
                <input class="form-control form-control-lg" type="text" v-model="filtroLivro"
                  placeholder="Digite o livro..." />
              </div>
              <div class="col-4">
                <label>Nome do leitor</label>
                <input class="form-control form-control-lg" type="text" v-model="filtroLeitor"
                  placeholder="Digite o nome do leitor..." />
              </div>
              <div class="col-2 d-flex align-items-end">
                <button class="btn btn-success w-100 btn-lg" @click="buscarEmprestimos">Buscar</button>
              </div>
            </div>

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
                    <td>
                      <div class="d-flex flex-wrap gap-1">
                        <span v-for="(titulo, idx) in (item.livrosNomes || '').split(', ')" :key="idx"
                          class="badge badge-outline-primary">
                          {{ titulo }}
                        </span>
                      </div>
                    </td>
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

            <div v-if="emprestimosFiltrados.length === 0" class="text-center text-muted mt-3">
              Nenhum empréstimo encontrado.
            </div>

            <ModalDevolucao :visivel="mostrarModal" :emprestimo="emprestimoSelecionado" @fechar="fecharModal" />

            <div class="pagination mt-4 d-flex justify-content-center">
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { api } from '@/common/http';
import Swal from 'sweetalert2';
import ModalDevolucao from '@/components/modals/ModalDevolucao.vue';

interface Emprestimo {
  id: number;
  clienteId: number | null;
  clienteNome: string;
  funcionarioId: number | null;
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

      // Filtra por status: 'Ativo' (ou 'EM_ANDAMENTO') e 'Vencido'
      const statusFiltro = ['ativo', 'em_andamento', 'vencido']; 

      return this.emprestimos.filter(e => {
        const matchesLivro = e.livrosNomes.toLowerCase().includes(livroFiltro);
        const matchesLeitor = e.clienteNome.toLowerCase().includes(leitorFiltro);
        // Verifica se o status do empréstimo está na lista de status permitidos
        const matchesStatus = statusFiltro.includes(e.status.toLowerCase());

        return matchesLivro && matchesLeitor && matchesStatus;
      });
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
        this.emprestimos = res.data.map((e: any) => ({
          id: e.id,
          clienteId: e.cliente?.id ?? null,
          clienteNome: e.cliente?.nome || 'Leitor não encontrado',
          
          funcionarioId: e.funcionario?.id ?? null,
          dataInicio: e.dataInicio,
          dataPrevista: e.dataPrevista,
          dataDevolucao: e.dataDevolucao,
          status: e.status,
          livrosIds: e.livros ? e.livros.map((l: any) => l.id) : [],
          livrosNomes: e.livros ? e.livros.map((l: any) => l.titulo).join(', ') : '',
        }));
      } catch (error: any) {
        console.error('Erro ao buscar empréstimos:', error);
        Swal.fire('Erro', 'Falha ao carregar empréstimos: ' + error.message, 'error');
      }
    },

     async atualizarStatus(emprestimo: Emprestimo, novoStatus: string) {
    // Impede a atualização se o status for o mesmo
    if (emprestimo.status.toLowerCase() === novoStatus.toLowerCase()) return;

    const emprestimoAtualizado: any = {
      dataInicio: emprestimo.dataInicio,
      dataPrevista: emprestimo.dataPrevista,
      status: novoStatus,
      livrosIds: emprestimo.livrosIds || [],
      clienteId: emprestimo.clienteId,
      funcionarioId: emprestimo.funcionarioId,
      dataDevolucao: ['Devolvido', 'Cancelado'].includes(novoStatus) 
                       ? new Date().toISOString().split('T')[0] 
                       : emprestimo.dataDevolucao,
    };

    // --- ADICIONE ESTE CONSOLE.LOG AQUI ---
    console.log('Objeto de empréstimo sendo enviado para atualização:', emprestimoAtualizado);
    // --- FIM DO CONSOLE.LOG ---

    try {
      await api.put(`/emprestimos/${emprestimo.id}`, emprestimoAtualizado);
      Swal.fire('Sucesso', `Status atualizado para ${novoStatus}`, 'success');
      this.buscarEmprestimos(); // Recarrega os dados para refletir a mudança
    } catch (error: any) {
      console.error('Erro ao atualizar status:', error);
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
      this.buscarEmprestimos(); 
    },

    getBadgeClass(status: string): string {
      switch (status.toLowerCase()) { // Usar toLowerCase para comparar
        case 'ativo':
        case 'em_andamento':
          return 'badge-warning'; // Mantém o amarelo para "Em Andamento"
        case 'vencido':
          return 'badge-danger'; // Vermelho para "Vencido"
        case 'devolvido':
          return 'badge-success';
        case 'cancelado':
          return 'badge-secondary'; // Cinza para "Cancelado" (ou outra cor que preferir)
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
  color: white; /* Adicionado para garantir texto branco em badges de sucesso */
}

.badge-danger {
  background-color: #dc3545;
  color: white; /* Adicionado para garantir texto branco em badges de perigo */
}

.badge-warning {
  background-color: #ffc107;
  color: black; /* Mantém texto preto para badges de aviso */
}

.badge-secondary {
  background-color: #6c757d;
  color: white; /* Adicionado para garantir texto branco em badges secundários */
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

/* Styles for badge-outline-primary, badge-outline-danger etc. */
.badge-outline-primary {
  color: #007bff;
  border: 1px solid #007bff;
  background-color: transparent;
  padding: 0.25em 0.5em;
  border-radius: 0.25rem;
  font-size: 0.9rem;
}

.badge-outline-danger {
  color: #dc3545;
  border: 1px solid #dc3545;
  background-color: transparent;
  padding: 0.25em 0.5em;
  border-radius: 0.25rem;
  font-size: 0.9rem;
}

.badge-outline-success {
  color: #28a745;
  border: 1px solid #28a745;
  background-color: transparent;
  padding: 0.25em 0.5em;
  border-radius: 0.25rem;
  font-size: 0.9rem;
}

.badge-outline-secondary {
  color: #6c757d;
  border: 1px solid #6c757d;
  background-color: transparent;
  padding: 0.25em 0.5em;
  border-radius: 0.25rem;
  font-size: 0.9rem;
}
</style>