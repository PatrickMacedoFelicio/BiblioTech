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
                            <div id="the-basics">
                                <input class="typeahead form-control form-control-lg" type="text"
                                    placeholder="Digite o título do livro...">
                            </div>
                        </div>
                        <div class="col col-lg-2 d-flex align-items-end">
                            <button class="btn btn-success btn-fw btn-lg w-100 btn-icon-text">Buscar</button>
                        </div>

                    </div>
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Título</th>
                                    <th>ISBN</th>
                                    <th>Autor</th>
                                    <th>Ano de publicação</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(livro, index) in listarLivro" :key="index">
                                    <td>{{ livro.id }}</td>
                                    <td>{{ livro.titulo }}</td>
                                    <td>{{ livro.isbn }}</td>
                                    <td>{{ livro.autor }}</td>
                                    <td>{{ livro.ano_publicacao }}</td>
                                    <td>
                                        <div class="d-flex justify-content-end">
                                            <RouterLink class="btn btn-info btn-sm" to="/">
                                                <i class="mdi mdi-magnify"></i>
                                            </RouterLink>
                                            <RouterLink class="btn btn-success btn-sm" to="/" style="margin-left: 0.5rem">
                                                <i class="mdi mdi-pencil"></i>
                                            </RouterLink>
                                            <RouterLink class="btn btn-danger btn-sm" to="/" style="margin-left: 0.5rem">
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
import { defineComponent } from "vue";

export default defineComponent({
    name: 'ViewLivro',

    data() {
        return {
            listarLivro: [] as Array<{
                id: number,
                titulo: string,
                isbn: string,
                ano_publicacao: string,
                autor: string,
            }>,
        }
    },

    mounted() {
        this.buscarLivro();
    },

    methods: {
        buscarLivro() {
            this.listarLivro.push({
                id: 1,
                titulo: 'Jogos Vorazes',
                isbn: '1-232-21-31231212',
                autor: 'Suzanne Collins',
                ano_publicacao: '2008'
            });

            this.listarLivro.push({
                id: 2,
                titulo: 'Tudo é Rio',
                isbn: '4-765-45-123123151',
                autor: 'Carla Madeiras',
                ano_publicacao: '2014'
            });

            this.listarLivro.push({
                id: 3,
                titulo: 'A Culpa É das Estrelas',
                isbn: '7-246-87-098098898',
                autor: 'John Green',
                ano_publicacao: '2012'
            });
        }
    }

});
</script>