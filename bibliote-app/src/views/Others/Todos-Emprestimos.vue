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
                                        <th>Leitor</th>
                                        <th>Livros</th>
                                        <th class="text-center">Status</th>
                                        <th class="text-center">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in emprestimosPaginados" :key="item.id">
                                        <td>{{ item.clienteNome }}</td>
                                        <td>
                                            <div class="d-flex flex-wrap gap-1">
                                                <span v-for="(titulo, idx) in (item.livrosNomes || '').split(', ')"
                                                    :key="idx" class="badge badge-outline-primary">
                                                    {{ titulo }}
                                                </span>
                                            </div>
                                        </td>
                                        <td class="text-center">
                                            <span class="badge" :class="getBadgeClass(item.status)">{{ item.status
                                                }}</span>
                                        </td>
                                        <td class="text-center">
                                            <button class="btn btn-info btn-sm" @click="visualizarEmprestimo(item)">
                                                <i class="mdi mdi-magnify"></i>
                                            </button>
                                            <button class="btn btn-success btn-sm gap1"
                                                @click="editarEmprestimo(item.id)">
                                                <i class="mdi mdi-pencil"></i>
                                            </button>
                                            <button class="btn btn-danger btn-sm ms-2 gap1"
                                                @click="excluirEmprestimo(item.id)">
                                                <i class="mdi mdi-delete"></i>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div v-if="emprestimosFiltrados.length === 0" class="text-center text-muted mt-3">
                            Nenhum empréstimo encontrado.
                        </div>

                        <ModalDevolucao :visivel="mostrarModal" :emprestimo="emprestimoSelecionado"
                            @fechar="fecharModal" />

                        <div class="pagination mt-4 d-flex justify-content-center">
                            <button class="page-link" :disabled="paginaAtual === 1"
                                @click="paginaAtual--">Anterior</button>

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

            return this.emprestimos.filter(e => {
                const matchesLivro = e.livrosNomes.toLowerCase().includes(livroFiltro);
                const matchesLeitor = e.clienteNome.toLowerCase().includes(leitorFiltro);

                return matchesLivro && matchesLeitor;
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

                const hoje = new Date().toISOString().split('T')[0];

                for (const emprestimo of this.emprestimos) {
                    const statusAtual = emprestimo.status.toLowerCase();
                    if (
                        statusAtual !== 'devolvido' &&
                        statusAtual !== 'cancelado' &&
                        emprestimo.dataPrevista < hoje &&
                        statusAtual !== 'vencido'
                    ) {
                        await api.put(`/emprestimos/${emprestimo.id}`, {
                            ...emprestimo,
                            status: 'Vencido',
                        });
                    }
                }

                // Recarregar os dados após atualizar vencidos
                const resAtualizado = await api.get('/emprestimos');
                this.emprestimos = resAtualizado.data.map((e: any) => ({
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

        confirmarExclusao(item: Emprestimo) {
            Swal.fire({
                title: 'Tem certeza?',
                text: `Deseja excluir o empréstimo do livro(s): "${item.livrosNomes}" para o leitor(a): "${item.clienteNome}"?`,
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

        async excluirEmprestimo(id: number) {
            try {
                await api.delete(`/emprestimos/${id}`);
                this.emprestimos = this.emprestimos.filter(e => e.id !== id);
                Swal.fire({
                    icon: 'success',
                    title: 'Excluído!',
                    text: 'O empréstimo foi removido com sucesso.'
                });
            } catch (erro: any) {
                console.error('Erro ao excluir:', erro);
                Swal.fire({
                    icon: 'error',
                    title: 'Erro ao excluir empréstimo',
                    text: erro.message || 'Tente novamente mais tarde.'
                });
            }
        },

        //Edição
        async editarEmprestimo(id: number) {
            this.$router.push(`/editar/empretimo${id}`);
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
                case 'EM_ANDAMENTO':
                    return 'badge-normal';
                case 'Vencido':
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
    color: black;
}

.badge-secondary {
    background-color: #6c757d;
}

.badge-normal {
    background-color: #007bff;
    color: white;
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