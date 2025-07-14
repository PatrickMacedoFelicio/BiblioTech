<template>
  <div class="page-header">
    <h3 class="card-title">Consulta De Livros</h3>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">Consultar</a></li>
        <li class="breadcrumb-item active" aria-current="page">Livros</li>
      </ol>
    </nav>
  </div>

  <div class="row">
    <div class="col-lg-12 grid-margin stretch-card">
      <div class="card">
        <div class="card-body">
          <div class="form-group row">
            <div class="col-5">
              <label>Título</label>
              <input class="form-control form-control-lg" type="text" v-model="filtro"
                placeholder="Digite o título do livro..." />
            </div>
            <div class="col col-lg-2 d-flex align-items-end">
              <button class="btn btn-success btn-fw btn-lg w-100 btn-icon-text" @click="buscarLivros">
                Buscar
              </button>
            </div>
          </div>

          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>ISBN</th>
                  <th>Autor</th>
                  <th>Categoria</th>
                  <th class="text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="livro in livrosPaginados" :key="livro.id">
                  <td>{{ livro.titulo }}</td>
                  <td>{{ livro.isbn }}</td>
                  <td>{{ livro.autor }}</td>
                  <td>{{ livro.nomeCategoria }}</td>
                  <td>
                    <div class="d-flex justify-content-end">
                      <button class="btn btn-info btn-sm" @click="visualizarLivro(livro)">
                        <i class="mdi mdi-magnify"></i>
                      </button>
                      <button class="btn btn-success btn-sm gap1" @click="editarEstoque(livro.id)">
                        <i class="mdi mdi-pencil"></i>
                      </button>
                      <button class="btn btn-danger btn-sm gap1" @click="confirmarExclusao(livro)">
                        <i class="mdi mdi-delete"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <ModalLivro :visivel="mostrarModal" :livro="livroSelecionado" @fechar="fecharModal" />

          <div v-if="livrosFiltrados.length === 0">
            <p class="text-center text-muted">Nenhum livro encontrado.</p>
          </div>

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
import ModalLivro from '@/components/modals/ModalLivro.vue';
import { api } from '@/common/http';

interface Livro {
  id: number;
  titulo: string;
  autor: string;
  isbn: string;
  anoPublicacao: string;
  editora: string;
  generoId: number;
  sinopse: string;
  nomeCategoria?: string;
}

export default defineComponent({
  name: 'ViewLivro',
  components: { ModalLivro },

  data() {
    return {
      livros: [] as Livro[],
      categorias: [] as any[],
      filtro: '',
      paginaAtual: 1,
      itensPorPagina: 8,
      mostrarModal: false,
      livroSelecionado: {} as Livro,
    };
  },

  computed: {
    livrosFiltrados(): Livro[] {
      const termo = this.filtro.toLowerCase();
      return this.livros.filter(livro =>
        livro.titulo?.toLowerCase().includes(termo)
      );
    },
    totalPaginas(): number {
      return Math.ceil(this.livrosFiltrados.length / this.itensPorPagina);
    },
    livrosPaginados(): Livro[] {
      const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
      return this.livrosFiltrados.slice(inicio, inicio + this.itensPorPagina);
    }
  },

  mounted() {
    this.buscarLivros();
  },

  methods: {
    async buscarLivros() {
      this.paginaAtual = 1;
      try {
        const [resLivro, resGeneros ] = await Promise.all([
          await api.get('/livros'),
          await api.get('/generos')
        ]);

        this.categorias = resGeneros.data;

        this.livros = resLivro.data.map((item: Livro) => {
          const categoriaEncontrada = this.categorias.find(cat => cat.id === item.generoId);
          return {
            ...item,
            nomeCategoria: categoriaEncontrada ? categoriaEncontrada.nome : 'Categoria não encontrada'
          };
        });

      } catch (erro: any) {
        console.error('Erro ao buscar livros ou categoria:', erro);
        Swal.fire({
          icon: 'error',
          title: 'Erro ao carregar livros',
          text: erro.message || 'Verifique se o servidor JSON está ativo.'
        });
      }
    },

    visualizarLivro(livro: Livro) {
      this.livroSelecionado = livro;
      this.mostrarModal = true;
    },

    fecharModal() {
      this.mostrarModal = false;
    },

    confirmarExclusao(livro: Livro) {
      Swal.fire({
        title: 'Tem certeza?',
        text: `Deseja excluir o livro "${livro.titulo}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.excluirLivro(livro.id);
        }
      });
    },

    async excluirLivro(id: number) {
      try {
        await api.delete(`http://localhost:3000/livros/${id}`);
        this.livros = this.livros.filter(l => l.id !== id);
        Swal.fire({
          icon: 'success',
          title: 'Excluído!',
          text: 'Livro removido com sucesso.'
        });
      } catch (erro: any) {
        console.error('Erro ao excluir livro:', erro);
        Swal.fire({
          icon: 'error',
          title: 'Erro ao excluir livro',
          text: erro.message || 'Tente novamente mais tarde.'
        });
      }
    },

    //Edição
    async editarEstoque(id: number) {
      this.$router.push(`/editar/livro/${id}`);
    },


    irParaPagina(pagina: number) {
      this.paginaAtual = pagina;
    }
  }
});
</script>
