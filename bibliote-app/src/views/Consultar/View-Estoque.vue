<template>
    <div class="page-header">
        <h3 class="card-title">Consulta de Estoque</h3>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="#">Consultar</a></li>
                <li class="breadcrumb-item active" aria-current="page">Estoque</li>
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
                            <div id="the-basics">
                                <input class="typeahead form-control form-control-lg" type="text" v-model="filtro"
                                    placeholder="Digite o título do livro..." />
                            </div>
                        </div>
                        <div class="col col-lg-2 d-flex align-items-end">
                            <button class="btn btn-success btn-fw btn-lg w-100 btn-icon-text" @click="buscarEstoque">
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
                                    <th class="text-center">Quantidade</th>
                                    <th class="text-center">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in estoqueFiltrado" :key="index">
                                    <td>{{ item.titulo }}</td>
                                    <td>{{ item.codigoBarras }}</td>
                                    <td class="text-center">{{ item.quantidade }}</td>
                                    <td>
                                        <div class="d-flex justify-content-center">
                                            <button class="btn btn-info btn-sm" @click="visualizarCategoria(item)">
                                                <i class="mdi mdi-magnify"></i>
                                            </button>
                                            <button class="btn btn-success btn-sm ms-2 gap1">
                                                <i class="mdi mdi-pencil"></i>
                                            </button>
                                            <button class="btn btn-danger btn-sm ms-2 gap1">
                                                <i class="mdi mdi-delete"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>

                        </table>
                    </div>
                    <ModalEstoque :visivel="mostrarModal" :categoria="estoqueSelecionada" @fechar="fecharModal" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Swal from 'sweetalert2';
import axios from 'axios';
import ModalEstoque from '@/components/modals/ModalEstoque.vue';

interface Estoque {
    id: string;
    titulo: string;
    codigoBarras: string;
    quantidade: number;
}

export default defineComponent({
    name: 'ConsultaEstoque',
    components: { ModalEstoque },

    data() {
        return {
            filtro: '',
            estoque: [] as Estoque[],
            mostrarModal: false,
            estoqueSelecionada: { titulo: '', codigoBarras: '', quantidade: 0, }
        };
    },

    computed: {
        estoqueFiltrado() {
            const texto = this.filtro.toLowerCase();
            return this.estoque.filter(item =>
                item.titulo.toLowerCase().includes(texto)
            );
        }
    },

    mounted() {
        this.buscarEstoque();
    },

    methods: {
        async buscarEstoque() {
            try {
                const response = await axios.get('http://localhost:3000/estoques');
                this.estoque = response.data;
                console.log('Dados recebidos:', this.estoque);
            } catch (erro: any) {
                console.error('Erro ao buscar no estoque:', erro);
                Swal.fire({
                    icon: 'error',
                    title: 'Erro ao buscar no estoque',
                    text: erro.message || 'Verifique se o servidor está rodando.'
                });
            }
        },

        //Exclução das coisas
        confirmarExclusao(item: Estoque) {
            Swal.fire({
                title: 'Tem certeza?',
                text: `Deseja excluir o livro "${item.titulo}" do estoque?`,
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
                await axios.delete(`http://localhost:3000/estoques/${id}`);
                this.estoque = this.estoque.filter(cat => cat.id !== id);

                Swal.fire({
                    icon: 'success',
                    title: 'Excluído!',
                    text: 'Livro do estoque removido com sucesso.'
                });
            } catch (erro: any) {
                console.error('Erro ao excluir:', erro);
                Swal.fire({
                    icon: 'error',
                    title: 'Erro ao excluir livro do estoque',
                    text: erro.message || 'Tente novamente mais tarde.'
                });
            }
        },

        //consultar as categorias com modal
        visualizarCategoria(cat: Estoque) {
            this.estoqueSelecionada = cat;
            this.mostrarModal = true;
        },
        fecharModal() {
            this.mostrarModal = false;
        }

        // Edição das coisas
    }
});
</script>
