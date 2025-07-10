<template>
    <div class="page-header">
        <h3 class="card-title">Devolução</h3>
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
                        <div class="col-4">
                            <label>Livro</label>
                            <input class="form-control form-control-lg" type="text" v placeholder="Digite o livro..." />
                        </div>
                        <div class="col-4">
                            <label>Nome do leitor</label>
                            <input class="form-control form-control-lg" type="text" v
                                placeholder="Digite o nome do leitor..." />
                        </div>
                        <div class="col col-lg-2 d-flex align-items-end">
                            <button class="btn btn-success btn-fw btn-lg w-100 btn-icon-text">
                                Buscar
                            </button>
                        </div>
                    </div>

                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Nome</th>
                                    <th>Livro</th>
                                    <th>Data de Vencimento</th>
                                    <th>Status</th>
                                    <th class="text-center">Ações</th>
                                </tr>
                            </thead>
                        </table>
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

interface Devolucao {
    id: string;
    data_devolucao: string,
    leitor: string,
    funcionario: string,
    emprestimo: string
}

export default defineComponent({
    name: 'Devolucao',
    components: { ModalCategoria },

    data() {
        return {
            filtro: '',
            devolucao: [] as Devolucao[],
            leitor: [] as any[],
            funcionario: [] as any[],
            emprestimo: [] as any[],
            mostrarModal: false,
            categoriaSelecionada: { data_devolucao: '' },
            paginaAtual: 1,
            itensPorPagina: 8,
        };
    },

    computed: {
        devolucaoFiltrada() {
            const texto = this.filtro.toLowerCase();
            return this.devolucao.filter(item =>
                item.id?.toLowerCase().includes(texto)
            );
        },
        totalPaginas(): number {
            return Math.ceil(this.devolucaoFiltrada.length / this.itensPorPagina);
        },
        categoriaPaginado(): Devolucao[] {
            const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
            return this.devolucaoFiltrada.slice(inicio, inicio + this.itensPorPagina);
        },
    },

    mounted() {
        this.buscarDevolucao();
    },

    methods: {
        async buscarDevolucao() {
            this.paginaAtual = 1;
            try {
                const [resDevolucao, resCliente, resEmprestar] = await Promise.all([
                    axios.get('http://localhost:3000/devolucao'),
                    axios.get('http://localhost:3000/leitores'),
                    axios.get('http://localhost:3000/emprestar')
                ]);

                this.emprestimo = resEmprestar.data;
                this.leitor = resCliente.data;

                this.devolucao = resDevolucao.data.map((item: Devolucao) => {
                    const leitorEncontrado = this.leitor.find(l => l.id === item.leitor);
                    return {
                        ...item,
                        tituloLivro: leitorEncontrado ? leitorEncontrado.nome : 'Leitor não encontrado'
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
        },

        //Exclução das coisas
        confirmarExclusao(item: Devolucao) {
            Swal.fire({
                title: 'Tem certeza?',
                text: `Deseja excluir a devolucao do livro "${item.nome}"?`,
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
        },
        irParaPagina(pagina: number) {
            this.paginaAtual = pagina;
        },

        // Edição das coisas
        async editarCategoria(id: string) {
            this.$router.push(`/editar/categoria/${id}`);
        }
    }
});
</script>
