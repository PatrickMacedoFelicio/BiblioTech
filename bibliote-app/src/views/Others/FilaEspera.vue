<template>
    <div class="page-header">
        <h3 class="card-title">Consulta de Fornecedores</h3>
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
                        <div class="col-5">
                            <label>Nome do Fornecedor</label>
                            <input class="form-control form-control-lg" type="text" v-model="filtro"
                                placeholder="Digite o nome do fornecedor..." />
                        </div>
                        <div class="col col-lg-2 d-flex align-items-end">
                            <button class="btn btn-success btn-fw btn-lg w-100 btn-icon-text"
                                @click="buscarFornecedores">
                                Buscar
                            </button>
                        </div>
                    </div>

                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>CNPJ</th>
                                    <th>Telefone</th>
                                    <th>Email</th>
                                    <th class="text-center">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in fornecedorPaginado" :key="item.id">
                                    <td>{{ item.nome }}</td>
                                    <td>{{ item.cnpj }}</td>
                                    <td>{{ item.telefone }}</td>
                                    <td>{{ item.email }}</td>
                                    <td>
                                        <div class="d-flex justify-content-center">
                                            <button class="btn btn-info btn-sm" @click="visualizarFornecedor(item)">
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
                    <div v-if="fornecedorFiltrado.length === 0">
                        <p class="text-center text-muted">Nenhum item encontrado.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

</script>
