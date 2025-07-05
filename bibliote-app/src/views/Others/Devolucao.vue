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
                            <input class="form-control form-control-lg" type="text" v
                                placeholder="Digite o nome do fornecedor..." />
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
                                    <th>CNPJ</th>
                                    <th>Telefone</th>
                                    <th>Email</th>
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
export default defineComponent({
    name: 'Devolucao'
})
</script>
