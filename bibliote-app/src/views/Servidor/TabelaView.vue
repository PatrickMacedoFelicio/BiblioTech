<template>

    <div class="page-header">
        <h3 class="page-title"> Consultar Leitores </h3>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="#">Tables</a></li>
                <li class="breadcrumb-item active" aria-current="page">Basic tables</li>
            </ol>
        </nav>
    </div>
    <div class="row">
        <div class="col-lg-12 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">Leitores</h4>
                    <p class="card-description">Abaixo estão os leitores cadastrados</p>
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>CPF</th>
                                    <th>Telefone</th>
                                    <th>E-mail</th>
                                    <th>Endereço</th>
                                    <th>Data de Nascimento</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(leitor, index) in listaLeitor" :key="index">
                                    <td>{{ leitor.nome }}</td>
                                    <td>{{ leitor.cpf }}</td>
                                    <td>{{ leitor.telefone }}</td>
                                    <td>{{ leitor.email }}</td>
                                    <td>{{ leitor.endereco }}</td>
                                    <td>{{ leitor.dataNascimento.toLocaleDateString('pt-BR') }}</td>
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
    name: 'TabelaView',

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