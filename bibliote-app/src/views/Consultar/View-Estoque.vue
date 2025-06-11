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
                                    <th>ID</th>
                                    <th>Título</th>
                                    <th>Código de Barras</th>
                                    <th class="text-center">Quantidade</th>
                                    <th class="text-center">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in estoqueFiltrado" :key="index">
                                    <td>{{ item.id }}</td>
                                    <td>{{ item.titulo }}</td>
                                    <td>{{ item.codigoBarras }}</td>
                                    <td class="text-center">{{ item.quantidade }}</td>
                                    <td>
                                        <div class="d-flex justify-content-center">
                                            <RouterLink class="btn btn-info btn-sm" to="/">
                                                <i class="mdi mdi-magnify"></i>
                                            </RouterLink>
                                            <RouterLink class="btn btn-success btn-sm ms-2 gap1" to="/">
                                                <i class="mdi mdi-pencil"></i>
                                            </RouterLink>
                                            <RouterLink class="btn btn-danger btn-sm ms-2 gap1" to="/">
                                                <i class="mdi mdi-delete"></i>
                                            </RouterLink>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>

                        </table>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ConsultaEstoque',

    data() {
        return {
            filtro: '',
            estoque: [] as Array<{
                id: number;
                titulo: string;
                codigoBarras: string;
                quantidade: number;
            }>
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
        buscarEstoque() {
            this.estoque = [
                {
                    id: 1,
                    titulo: 'Jogos Vorazes',
                    codigoBarras: '9781234567897',
                    quantidade: 12
                },
                {
                    id: 2,
                    titulo: 'Tudo é Rio',
                    codigoBarras: '9789876543210',
                    quantidade: 5
                },
                {
                    id: 3,
                    titulo: 'A Culpa É das Estrelas',
                    codigoBarras: '9780123456789',
                    quantidade: 9
                }
            ];
        }
    }
});
</script>
