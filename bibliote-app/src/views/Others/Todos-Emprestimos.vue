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
                                    <th>Nome</th>
                                    <th>Livro</th>
                                    <th class="text-center">Status</th>
                                    <th class="text-center">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in emprestimoPaginado" :key="index">
                                    <td>{{ item.leitorNome }}</td>
                                    <td>
                                        <div class="d-flex flex-wrap gap-1">
                                            <span v-for="(titulo, idx) in (item.livrosNomes || '').split(' & ')"
                                                :key="idx" class="badge badge-outline-primary">
                                                {{ titulo }}
                                            </span>
                                        </div>
                                    </td>

                                    <td class="text-center">
                                        <span class="badge" :class="getBadgeClass(item.status)">
                                            {{ item.status }}
                                        </span>
                                    </td>
                                    <td>
                                        <div class="d-flex justify-content-center">
                                            <button class="btn btn-info btn-sm" @click="visualizarEmprestimo(item)">
                                                <i class="mdi mdi-magnify"></i>
                                            </button>
                                            <button class="btn btn-success btn-sm ms-2 gap1">
                                                <i class="mdi mdi-pencil"></i>
                                            </button>
                                            <button class="btn btn-danger btn-sm ms-2 gap1"
                                                @click="confirmarExclusao(item)">
                                                <i class="mdi mdi-delete"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- Caso não tenha nenhuma info -->
                    <div v-if="emprestimoFiltrado.length === 0">
                        <p class="text-center text-muted">Nenhum item encontrado.</p>
                    </div>

                    <!-- DENTRO da <template>, mas FORA da tabela -->
                    <ModalDevolucao :visivel="mostrarModal" :emprestar="emprestimoSelecionado" @fechar="fecharModal" />
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
import { defineComponent } from 'vue';
import Swal from 'sweetalert2';
import axios from 'axios';
import ModalDevolucao from '@/components/modals/ModalDevolucao.vue';

interface Emprestimo {
    id: string,
    leitor: string,
    livros: string[];
    data_inicio: string,
    data_validade: string,
    status: string,
    leitorNome?: string,
    livrosNomes?: string
}

export default defineComponent({
    name: 'Devolucao',
    components: { ModalDevolucao },

    data() {
        return {
            filtro: '',
            emprestimo: [] as Emprestimo[],
            mostrarModal: false,
            emprestimoSelecionado: {
                id: '',
                leitor: '',
                livros: [''],
                data_inicio: '',
                data_validade: '',
                status: '',
            },
            paginaAtual: 1,
            itensPorPagina: 8,
        };
    },


    computed: {
        emprestimoFiltrado() {
            const texto = this.filtro.toLowerCase();
            return this.emprestimo.filter(item =>
                item.leitor?.toLowerCase().includes(texto)
            );
        },
        totalPaginas(): number {
            return Math.ceil(this.emprestimoFiltrado.length / this.itensPorPagina);
        },
        emprestimoPaginado(): Emprestimo[] {
            const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
            return this.emprestimoFiltrado.slice(inicio, inicio + this.itensPorPagina);
        },
    },

    mounted() {
        this.buscarEmprestimo();
    },

    methods: {
        async buscarEmprestimo() {
            this.paginaAtual = 1;
            try {
                const [resEmprestimos, resLeitores, resLivros] = await Promise.all([
                    axios.get('http://localhost:3000/emprestar'),
                    axios.get('http://localhost:3000/leitores'),
                    axios.get('http://localhost:3000/livros')
                ]);

                const leitores = resLeitores.data;
                const livros = resLivros.data;

                this.emprestimo = resEmprestimos.data.map((emp: any) => {
                    const leitorEncontrado = leitores.find((l: any) => l.id === emp.leitor);

                    const nomesLivros = emp.livros.map((livroId: string) => {
                        const livro = livros.find((l: any) => l.id === livroId);
                        return livro ? livro.titulo : 'Livro não encontrado';
                    });

                    return {
                        ...emp,
                        leitorNome: leitorEncontrado ? leitorEncontrado.nome : 'Leitor não encontrado',
                        livrosNomes: nomesLivros.join(' & ')
                    };
                });

            } catch (erro: any) {
                console.error('Erro ao buscar empréstimos:', erro);
                Swal.fire({
                    icon: 'error',
                    title: 'Erro ao buscar empréstimos',
                    text: erro.message || 'Verifique se o servidor está rodando.'
                });
            }
        },

        //Exclução das coisas
        confirmarExclusao(item: Emprestimo) {
            Swal.fire({
                title: 'Tem certeza?',
                text: `Deseja excluir o emprestimos do livros: "${item.livros}" para o leitor(a): "${item.leitor}"?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sim, excluir!',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.excluirEmprestimo(item.id);
                }
            });
        },

        async excluirEmprestimo(id: string) {
            try {
                await axios.delete(`http://localhost:3000/emprestar/${id}`);
                this.emprestimo = this.emprestimo.filter(cat => cat.id !== id);

                Swal.fire({
                    icon: 'success',
                    title: 'Excluído!',
                    text: 'O emprestimo foi removido com sucesso.'
                });
            } catch (erro: any) {
                console.error('Erro ao excluir:', erro);
                Swal.fire({
                    icon: 'error',
                    title: 'Erro ao excluir emprestimo',
                    text: erro.message || 'Tente novamente mais tarde.'
                });
            }
        },

         visualizarEmprestimo(cat: Emprestimo) {
            this.emprestimoSelecionado = cat;
            this.mostrarModal = true;
        },
        fecharModal() {
            this.mostrarModal = false;
        },
        irParaPagina(pagina: number) {
            this.paginaAtual = pagina;
        },

        // Edição das coisas
        async editarEmprestimo(id: string) {
            this.$router.push(`/editar/empretimo/${id}`);
        },

        getBadgeClass(status: string) {
            switch (status.toLowerCase()) {
                case 'ativo':
                    return 'badge-outline-primary';
                case 'vencido':
                    return 'badge-outline-danger';
                case 'devolvido':
                    return 'badge-outline-success';
                default:
                    return 'badge-outline-secondary';
            }
        }
    }
})
</script>
