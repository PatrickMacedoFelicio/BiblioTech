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
              <input class="typeahead form-control form-control-lg" type="text" v-model="filtro"
                placeholder="Digite o nome do funcionário..." />
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
                <tr v-for="item in funcionarioPaginado" :key="item.id">
                  <td>{{ item.nome }}</td>
                  <td>{{ item.cpf }}</td>
                  <td>{{ item.cargo }}</td>
                  <td>{{ item.telefone }}</td>
                  <td>{{ item.email }}</td>
                  <td>
                    <div class="d-flex justify-content-center">
                      <button class="btn btn-info btn-sm" @click="visualizarFuncionario(item)">
                        <i class="mdi mdi-magnify"></i>
                      </button>
                      <button class="btn btn-success btn-sm ms-2 gap1" @click="editarFuncionario(item.id)">
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
          <div v-if="funcionarioFiltrado.length === 0">
            <p class="text-center text-muted">Nenhum item encontrado.</p>
          </div>

          <!-- Para mostrar o Modal -->
          <ModalFuncionario :visivel="mostrarModal" :funcionario="funcionarioSelecionado" @fechar="fecharModal" />

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
import ModalFuncionario from '@/components/modals/ModalFuncionario.vue';

interface Funcionario {
  id: string,
  nome: string,
  cpf: string,
  cargo: string,
  telefone: string,
  email: string,
  data_admissao: string,
  cep: string,
  rua: string,
  bairro: string,
  numero: string,
  estado: string,
  cidade: string
}

export default defineComponent({
  name: 'ConsultaFuncionario',
  components: { ModalFuncionario },

  data() {
    return {
      funcionario: [] as Funcionario[],
      filtro: '',
      paginaAtual: 1,
      mostrarModal: false,
      itensPorPagina: 8,
      funcionarioSelecionado: { id: '', nome: '', cpf: '', cargo: '', telefone: '', email: '', data_admissao: '', cep: '', rua: '', bairro: '', numero: '', estado: '', cidade: '' }
    };
  },

  computed: {
    funcionarioFiltrado(): Funcionario[] {
      const texto = this.filtro.toLowerCase();
      return this.funcionario.filter(item =>
        item.nome?.toLowerCase().includes(texto)
      );
    },
    totalPaginas(): number {
      return Math.ceil(this.funcionarioFiltrado.length / this.itensPorPagina);
    },
    funcionarioPaginado(): Funcionario[] {
      const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
      return this.funcionarioFiltrado.slice(inicio, inicio + this.itensPorPagina);
    }
  },

  mounted() {
    this.buscarFuncionarios();
  },

  methods: {
    async buscarFuncionarios() {
      this.paginaAtual = 1;
      try {
        const response = await axios.get('http://localhost:3000/funcionarios');
        this.funcionario = response.data;
      } catch (erro: any) {
        console.error('Erro ao buscar o funcionário:', erro);
        Swal.fire({
          icon: 'error',
          title: 'Erro ao carregar o funcionário',
          text: erro.message || 'Verifique se o servidor JSON está ativo.'
        });
      }
    },


    //Exclução das coisas
    confirmarExclusao(item: Funcionario) {
      Swal.fire({
        title: 'Tem certeza?',
        text: `Deseja excluir o funcionário "${item.nome}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.excluirFuncionario(item.id);
        }
      });
    },


    async excluirFuncionario(id: string) {
      try {
        await axios.delete(`http://localhost:3000/funcionarios/${id}`);
        this.funcionario = this.funcionario.filter(cat => cat.id !== id);

        Swal.fire({
          icon: 'success',
          title: 'Excluído!',
          text: 'Funcionário removido com sucesso.'
        });
      } catch (erro: any) {
        console.error('Erro ao excluir:', erro);
        Swal.fire({
          icon: 'error',
          title: 'Erro ao excluir funcionário',
          text: erro.message || 'Tente novamente mais tarde.'
        });
      }
    },

    //Edição
    async editarFuncionario(id: string) {
      this.$router.push(`/editar/funcionario/${id}`);
    },

    irParaPagina(pagina: number) {
      this.paginaAtual = pagina;
    },
    visualizarFuncionario(cat: Funcionario) {
      this.funcionarioSelecionado = cat;
      this.mostrarModal = true;
    },
    fecharModal() {
      this.mostrarModal = false;
    }
  }
});
</script>
