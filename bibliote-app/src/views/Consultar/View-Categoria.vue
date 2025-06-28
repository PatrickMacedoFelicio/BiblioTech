<template>
  <div class="page-header">
    <h3 class="card-title">Consulta de Categoria</h3>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">Consultar</a></li>
        <li class="breadcrumb-item active" aria-current="page">Categoria</li>
      </ol>
    </nav>
  </div>

  <div class="row">
    <div class="col-lg-12 grid-margin stretch-card">
      <div class="card">
        <div class="card-body">
          <div class="form-group row">
            <div class="col-5">
              <label>Categoria</label>
              <div id="the-basics">
                <input class="typeahead form-control form-control-lg" type="text" v-model="filtro"
                  placeholder="Digite o nome da categoria..." />
              </div>
            </div>
            <div class="col col-lg-2 d-flex align-items-end">
              <button class="btn btn-success btn-fw btn-lg w-100 btn-icon-text" @click="buscarCategoria">
                Buscar
              </button>
            </div>
          </div>

          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Código de Barras</th>
                  <th class="text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in categoriaFiltrado" :key="index">
                  <td>{{ item.nome }}</td>
                  <td>{{ item.descricao.length > 50 ? item.descricao.slice(0, 80) + '...' : item.descricao }}</td>
                  <td>
                    <div class="d-flex justify-content-center">
                      <button class="btn btn-info btn-sm" @click="visualizarCategoria(item)">
                        <i class="mdi mdi-magnify"></i>
                      </button>
                      <button class="btn btn-success btn-sm ms-2 gap1">
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
            <!-- DENTRO da <template>, mas FORA da tabela -->
              <ModalCategoria :visivel="mostrarModal" :categoria="categoriaSelecionada" @fechar="fecharModal" />
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

interface Categoria {
  id: string;
  nome: string;
  descricao: string;
}

export default defineComponent({
  name: 'ConsultarCategoria',
  components: { ModalCategoria },

  data() {
    return {
      filtro: '',
      categoria: [] as Categoria[],
      mostrarModal: false,
      categoriaSelecionada: { nome: '', descricao: '' }
    };
  },

  computed: {
    categoriaFiltrado() {
      const texto = this.filtro.toLowerCase();
      return this.categoria.filter(item =>
        item.nome?.toLowerCase().includes(texto)
      );
    }
  },

  mounted() {
    this.buscarCategoria();
  },

  methods: {
    async buscarCategoria() {
      try {
        const response = await axios.get('http://localhost:3000/categorias');
        this.categoria = response.data;
      } catch (erro: any) {
        console.error('Erro ao buscar categorias:', erro);
        Swal.fire({
          icon: 'error',
          title: 'Erro ao buscar categorias',
          text: erro.message || 'Verifique se o servidor está rodando.'
        });
      }
    },

    //Exclução das coisas
    confirmarExclusao(item: Categoria) {
      Swal.fire({
        title: 'Tem certeza?',
        text: `Deseja excluir a categoria "${item.nome}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.excluirCategoria(item.id);
        }
      });
    },

    async excluirCategoria(id: string) {
      try {
        await axios.delete(`http://localhost:3000/categorias/${id}`);
        this.categoria = this.categoria.filter(cat => cat.id !== id);

        Swal.fire({
          icon: 'success',
          title: 'Excluído!',
          text: 'A categoria foi removida com sucesso.'
        });
      } catch (erro: any) {
        console.error('Erro ao excluir:', erro);
        Swal.fire({
          icon: 'error',
          title: 'Erro ao excluir categoria',
          text: erro.message || 'Tente novamente mais tarde.'
        });
      }
    },

    //consultar as categorias com modal
    visualizarCategoria(cat: Categoria) {
      this.categoriaSelecionada = cat;
      this.mostrarModal = true;
    },
    fecharModal() {
      this.mostrarModal = false;
    }

    // Edição das coisas

  }
});
</script>
