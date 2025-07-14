<template>
  <div class="page-header">
    <h3 class="card-title">Consulta de Gêneros</h3>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">Consultar</a></li>
        <li class="breadcrumb-item active" aria-current="page">Gêneros</li>
      </ol>
    </nav>
  </div>

  <div class="row">
    <div class="col-lg-12 grid-margin stretch-card">
      <div class="card">
        <div class="card-body">
          <div class="form-group row">
            <div class="col-5">
              <label>Gênero</label>
              <input class="form-control form-control-lg" type="text" v-model="filtro"
                     placeholder="Digite o nome do gênero..." />
            </div>
            <div class="col col-lg-2 d-flex align-items-end">
              <button class="btn btn-success btn-fw btn-lg w-100 btn-icon-text" @click="buscarGeneros">
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
              <tr v-for="(item, index) in generosPaginado" :key="index">
                <td>{{ item.nome }}</td>
                <td>{{ item.descricao.length > 50 ? item.descricao.slice(0, 100) + '...' : item.descricao }}</td>
                <td>
                  <div class="d-flex justify-content-center">
                    <button class="btn btn-info btn-sm" @click="visualizarGenero(item)">
                      <i class="mdi mdi-magnify"></i>
                    </button>
                    <button class="btn btn-success btn-sm ms-2 gap1" @click="editarGenero(item.id)">
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

          <div v-if="generosFiltrados.length === 0">
            <p class="text-center text-muted">Nenhum gênero encontrado.</p>
          </div>

          <!-- Modal -->
          <ModalCategoria :visivel="mostrarModal" :categoria="generoSelecionado" @fechar="fecharModal" />

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
import Swal from 'sweetalert2';
import axios from 'axios';
import ModalCategoria from '@/components/modals/ModalCategoria.vue';
import { api } from '@/common/http';


interface Genero {
  id: number;
  nome: string;
  descricao: string;
}

export default defineComponent({
  name: 'ConsultarGenero',
  components: { ModalCategoria },

  data() {
    return {
      filtro: '',
      generos: [] as Genero[],
      mostrarModal: false,
      generoSelecionado: {} as Genero,
      paginaAtual: 1,
      itensPorPagina: 8,
    };
  },

  computed: {
    generosFiltrados(): Genero[] {
      const texto = this.filtro.toLowerCase();
      return this.generos.filter(item =>
        item.nome?.toLowerCase().includes(texto)
      );
    },
    totalPaginas(): number {
      return Math.ceil(this.generosFiltrados.length / this.itensPorPagina);
    },
    generosPaginado(): Genero[] {
      const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
      return this.generosFiltrados.slice(inicio, inicio + this.itensPorPagina);
    },
  },

  mounted() {
    this.buscarGeneros();
  },

  methods: {
    async buscarGeneros() {
      this.paginaAtual = 1;
      try {
        const response = await api.get('/generos');
        this.generos = response.data;
      } catch (erro: any) {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao buscar gêneros',
          text: erro.message || 'Verifique se o servidor está rodando.'
        });
      }
    },

    confirmarExclusao(item: Genero) {
      Swal.fire({
        title: 'Tem certeza?',
        text: `Deseja excluir o gênero "${item.nome}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.excluirGenero(item.id);
        }
      });
    },

    async excluirGenero(id: number) {
      try {
        await api.delete(`/generos/${id}`);
        this.generos = this.generos.filter(g => g.id !== id);

        Swal.fire({
          icon: 'success',
          title: 'Excluído!',
          text: 'O gênero foi removido com sucesso.'
        });
      } catch (erro: any) {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao excluir gênero',
          text: erro.message || 'Tente novamente mais tarde.'
        });
      }
    },

    visualizarGenero(genero: Genero) {
      this.generoSelecionado = genero;
      this.mostrarModal = true;
    },

    fecharModal() {
      this.mostrarModal = false;
    },

    irParaPagina(pagina: number) {
      this.paginaAtual = pagina;
    },

    editarGenero(id: number) {
      this.$router.push(`/editar/genero/${id}`);
    }
  }
});
</script>
