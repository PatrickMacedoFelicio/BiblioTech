<template>
<div class="page-header">
        <h3 class="card-title">Consulta de Leitores</h3>
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
                            <label>Nome</label>
                            <div id="the-basics">
                                <input class="typeahead form-control form-control-lg" type="text"
                                    placeholder="Digite o nome do leitor...">
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
                                    <th>Nome</th>
                                    <th>CPF</th>
                                    <th>Telefone</th>
                                    <th>E-mail</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(leitor, index) in listaLeitor" :key="index">
                                    <td>{{ leitor.nome }}</td>
                                    <td>{{ leitor.cpf }}</td>
                                    <td>{{ leitor.telefone }}</td>
                                    <td>{{ leitor.email }}</td>
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
import { defineComponent } from "vue";

export default defineComponent({
    name: 'ViewLeitor',

    data(){
        return{
            listaLeitor: [] as Array<{
                nome: string,
                email: string,
                telefone: string,
                cpf: string,
                endereco: string,
                dataNascimento: Date,
            }>,
        }
    },

    mounted(){
        this.buscarLeitor();
    },

    methods: {
        buscarLeitor(){
            this.listaLeitor.push({
                nome: 'Patrick Felicio',
                email: 'patrickmac@gmail.com',
                telefone: '(69) 99255-0726',
                cpf: '123.452.541-56',
                endereco: 'Rua Colorado do oeste, 3164, Cafezinho',
                dataNascimento: new Date('2004-10-23')
            });

            this.listaLeitor.push({
                nome: 'Lucas Semeler',
                email: 'Semelerzinho12@gmail.com',
                telefone: '(69) 98354-4466',
                cpf: '017.456.270-57',
                endereco: 'Rua Albino Germano Roth, 762, Lomba Grande',
                dataNascimento: new Date('2004-07-02')
            });

            this.listaLeitor.push({
                nome: 'Samuel Felipe',
                email: 'samZic402@gmail.com',
                telefone: '(69) 99153-3946',
                cpf: '477.501.238-06',
                endereco: 'Rua Moisés Caroso, 200, Jequiezinho',
                dataNascimento: new Date('2004-02-12')
            });
        }
    }
    
});
</script>