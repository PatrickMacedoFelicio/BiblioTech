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

                    <!-- Filtro -->
                    <div class="form-group row">
                        <div class="col-6">
                            <label for="filtro">Título do Livro</label>
                            <input id="filtro" v-model="filtro" type="text" class="form-control form-control-lg"
                                placeholder="Digite o título..." />
                        </div>
                        <div class="col-2 d-flex align-items-end">
                            <div class="col  d-flex align-items-end">
                                <RouterLink class="btn btn-success btn-fw btn-lg btn-icon-text" to="/cadastrar/estoque">
                                    <strong>+ Estoque</strong></RouterLink>
                            </div>
                        </div>
                    </div>

                    <!-- Tabela -->
                    <div class="table-responsive mt-4">
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
                                <tr v-for="item in estoquePaginado" :key="item.id">
                                    <td>{{ item.tituloLivro }}</td>
                                    <td>{{ item.codigoDeBarras }}</td>
                                    <td class="text-center">{{ item.quantidade }}</td>
                                    <td class="text-center">
                                        <button class="btn btn-purple btn-sm" @click="visualizarEstoque(item)">
                                            <i class="mdi mdi-magnify"></i>
                                        </button>
                                        <button class="btn btn-success btn-sm ms-2 gap1"
                                            @click="editarEstoque(item.id)">
                                            <i class="mdi mdi-pencil"></i>
                                        </button>
                                        <button class="btn btn-danger btn-sm ms-2 gap1"
                                            @click="confirmarExclusao(item)">
                                            <i class="mdi mdi-delete"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- Caso não tenha nenhuma info -->
                    <div v-if="estoqueFiltrado.length === 0">
                        <p class="text-center text-muted">Nenhum item encontrado.</p>
                    </div>

                    <!-- Para mostrar o Modal -->
                    <ModalEstoque :visivel="mostrarModal" :estoque="estoqueSelecionado" @fechar="fecharModal" />

                    <!-- Paginação -->
                    <div class="pagination mt-4">
                        <button class="page-link" :disabled="paginaAtual === 1" @click="paginaAtual--">Anterior</button>

                        <button v-for="pagina in totalPaginas" :key="pagina" class="page-link"
                            :class="{ active: pagina === paginaAtual }" @click="irParaPagina(pagina)">
                            {{ pagina }}
                        </button>

                        <button class="page-link" :disabled="paginaAtual === totalPaginas"
                            @click="paginaAtual++">Próxima</button>
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
import ModalEstoque from '@/components/modals/ModalEstoque.vue';

interface Estoque {
    id: number;
    codigoDeBarras: string;
    quantidade: number;
    livroId: number;
    tituloLivro?: string;
}

export default defineComponent({
    name: 'ViewEstoque',
    components: { ModalEstoque },

    data() {
        return {
            estoque: [] as Estoque[],
            livros: [] as any[],
            filtro: '',
            paginaAtual: 1,
            mostrarModal: false,
            itensPorPagina: 8,
            estoqueSelecionado: {} as Estoque,
        };
    },

    computed: {
        estoqueFiltrado(): Estoque[] {
            const texto = this.filtro.toLowerCase();
            return this.estoque.filter(item =>
                item.tituloLivro?.toLowerCase().includes(texto)
            );
        },
        totalPaginas(): number {
            return Math.ceil(this.estoqueFiltrado.length / this.itensPorPagina);
        },
        estoquePaginado(): Estoque[] {
            const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
            return this.estoqueFiltrado.slice(inicio, inicio + this.itensPorPagina);
        }
    },

    mounted() {
        this.buscarEstoque();
    },

    methods: {
        async buscarEstoque() {
            this.paginaAtual = 1;
            try {
                const [resEstoque, resLivros] = await Promise.all([
                    api.get('/estoques'),
                    api.get('/livros')
                ]);

                this.livros = resLivros.data;

                this.estoque = resEstoque.data.map((item: any) => {
                    const livroId = item.livro?.id;
                    const livroEncontrado = this.livros.find(l => l.id === livroId);
                    return {
                        ...item,
                        tituloLivro: livroEncontrado ? livroEncontrado.titulo : 'Livro não encontrado',
                    };
                });

            } catch (erro: any) {
                console.error('Erro ao buscar o estoque ou livros:', erro);
                Swal.fire({
                    icon: 'error',
                    title: 'Erro ao carregar o estoque',
                    text: erro.message || 'Verifique se o servidor JSON está ativo.'
                });
            }
        }
        ,


        //Exclução das coisas
        confirmarExclusao(item: Estoque) {
            Swal.fire({
                title: 'Tem certeza?',
                text: `Deseja excluir o livro "${item.tituloLivro}" do Estoque?`,
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

        // Excluir
        async excluirCategoria(id: number) {
            try {
                await api.delete(`/estoques/${id}`);
                this.estoque = this.estoque.filter(cat => cat.id !== id);

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

        //Edição
        async editarEstoque(id: number) {
            this.$router.push(`/editar/estoque/${id}`);
        },

        irParaPagina(pagina: number) {
            this.paginaAtual = pagina;
        },
        visualizarEstoque(cat: Estoque) {
            this.estoqueSelecionado = cat;
            this.mostrarModal = true;
        },
        fecharModal() {
            this.mostrarModal = false;
        },
    }
});
</script>