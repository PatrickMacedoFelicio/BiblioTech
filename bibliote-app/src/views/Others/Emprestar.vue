<template>
  <div class="grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-9">
              <form @submit.prevent="">
                <h1 class="card-title">Emprestar Livros</h1>
                <div class="form-group row">
                  <div class="col-12">
                    <h3 class="card-title-info">Dados do Emprestimo</h3>
                    <label>Nome do Leitor</label>
                    <input class="form-control form-control-lg" v-model="emprestimo.leitor" type="text"
                      placeholder="Nome completo" />
                    <div class="text-danger" v-if="v$.emprestimo.leitor.$error">
                      <small>{{ v$.emprestimo.leitor.$errors[0].$message }}</small>
                    </div>
                  </div>
                </div>

                <div class="form-group row align-items-end">
                  <div class="col-10">
                    <label>Livro</label>
                    <input class="form-control form-control-lg" v-model="emprestimo.livro" type="text"
                      placeholder="Título do livro" />
                    <div class="text-danger" v-if="v$.emprestimo.livro.$error">
                      <small>{{ v$.emprestimo.livro.$errors[0].$message }}</small>
                    </div>
                  </div>
                  <div class="col-2 text-end">
                    <button class="btn btn-info btn-lg px-4 py-3" type="button">
                      <strong>+</strong>
                    </button>
                  </div>
                </div>
                <h3 class="card-title-info">Datas</h3>
                <div class="form-group row">
                  <div class="col-6">
                    <label>Data de Empréstimo</label>
                    <input class="form-control form-control-lg" v-model="emprestimo.data_inicio" type="date" readonly />
                    <div class="text-danger" v-if="v$.emprestimo.data_inicio.$error">
                      <small>{{ v$.emprestimo.data_inicio.$errors[0].$message }}</small>
                    </div>
                  </div>
                  <div class="col-6">
                    <label>Data de Devolução</label>
                    <input class="form-control form-control-lg" v-model="emprestimo.data_validade" type="date" />
                    <div class="text-danger" v-if="v$.emprestimo.data_validade.$error">
                      <small>{{ v$.emprestimo.data_validade.$errors[0].$message }}</small>
                    </div>
                  </div>
                </div>

                <div class="form-group row mt-4">
                  <div class="col-auto">
                    <button type="submit" class="btn btn-success btn-lg">Salvar</button>
                  </div>
                  <div class="col-auto">
                    <button type="button" class="btn btn-secondary btn-lg" @click="limparCampos">Limpar</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mask } from 'vue-the-mask';
import { required, minLength, helpers, email } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Toast } from '@/common/toast';

export default defineComponent({
  name: 'Emprestimo',

  setup() {
    return { v$: useVuelidate() };
  },

  data() {
    const hoje = new Date().toISOString().split('T')[0];

    return {
      emprestimo: {
        id: '',
        leitor: '',
        livro: '',
        data_inicio: hoje,
        data_validade: ''
      },
      emprestimos: [] as any[],
      dialog: false
    };
  },

  validations() {
    return {
      emprestimo: {
        leitor: {
          required: helpers.withMessage('Nome é obrigatorio!', required)
        },
        livro: {
          required: helpers.withMessage('E-mail é obrigatorio', required)
        },
        data_inicio: {
          required: helpers.withMessage('Cargo é obrigatorio', required)
        },
        data_validade: {
          required: helpers.withMessage('CPF é obrigatório', required),
        }
      }
    };
  },

  methods: {
    limparCampos() {
      const hoje = new Date().toISOString().split('T')[0];
      this.emprestimo = {
        id: '',
        leitor: '',
        livro: '',
        data_inicio: hoje,
        data_validade: ''
      };
      this.v$.$reset();
    }
  }
});
</script>

<style>
.destaque{
  color: blueviolet;
}

input[readonly] {
  background-color: #2a2a3c !important;   
  color: #c7c7c7 !important;              
  cursor: not-allowed;
  border-color: #2a2a3c;                   
}

</style>

