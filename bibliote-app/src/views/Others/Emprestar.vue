<template>
  <div class="grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-9">
              <form @submit.prevent="salvar">
                <h1 class="card-title">Emprestar Livros</h1>
                <div class="form-group row">

                  <div class="col-12">
                    <h3 class="card-title-info">Dados do Emprestimo</h3>
                    <label>Nome do Leitor</label>

                    <select class="form-control form-control-lg" v-model="emprestimo.leitor">
                      <option value="" disabled>Selecione o livro...</option>
                      <option v-for="leitor in listarLeitor" :key="leitor.id" :value="leitor.id">
                        {{ leitor.nome }}
                      </option>
                    </select>

                    <div class="text-danger" v-if="v$.emprestimo.leitor.$error">
                      <small>{{ v$.emprestimo.leitor.$errors[0].$message }}</small>
                    </div>
                  </div>
                </div>

                <div class="form-group row align-items-end">
                  <div class="col-10">
                    <label>Livro</label>
                    <select class="form-control form-control-lg" v-model="emprestimo.livro">
                      <option value="" disabled>Selecione o livro...</option>
                      <option v-for="livro in listarLivros" :key="livro.id" :value="livro.id">
                        {{ livro.titulo }}
                      </option>
                    </select>
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
      listarLivros: [] as any[],
      listarLeitor: [] as any[],
      dialog: false
    };
  },

  validations() {
    return {
      emprestimo: {
        leitor: {
          required: helpers.withMessage('Selecione um Leitor!', required)
        },
        livro: {
          required: helpers.withMessage('Selecione um Livro!', required)
        },
        data_validade: {
          required: helpers.withMessage('Selecione uma data de Validade!', required),
        }
      }
    };
  },

  methods: {
    async salvar() {
      const valido = await this.v$.$validate();
      if (!valido) return;

      const confirmado = await Swal.fire({
        title: 'Confirmar cadastro?',
        text: 'Deseja realmente fazer este emprestimo?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sim, emprestar!',
        cancelButtonText: 'Cancelar'
      });

      if (!confirmado.isConfirmed) return;

      const novoEmprestimo = {
        id: Math.random().toString(36).substring(2, 8),
        leitor: this.emprestimo.leitor,
        livro: this.emprestimo.livro,
        data_inicio: this.emprestimo.data_inicio,
        data_validade: this.emprestimo.data_validade
      };

      try {
        await axios.post('http://localhost:3000/emprestar', novoEmprestimo);
        Toast.fire({
          icon: 'success',
          title: 'Emprestimo cadastrado com sucesso!'
        });
        this.limparCampos();
        await this.carregarEmprestimo();
      } catch (erro: any) {
        let mensagemErro = 'Não foi possível salvar fornecedor.';

        if (erro.response) {
          mensagemErro = `Erro ${erro.response.status}: ${erro.response.statusText}`;
        } else if (erro.request) {
          mensagemErro = 'Sem resposta do servidor. Verifique sua conexão.';
        } else if (erro.message) {
          mensagemErro = erro.message;
        }

        Swal.fire({
          icon: 'error',
          title: 'Erro ao cadastrar o emprestimo',
          text: mensagemErro
        });
        console.error('Erro completo:', erro);
      }
    },
    async carregarEmprestimo() {
      try {
        const resposta = await axios.get('http://localhost:3000/emprestar');
        this.emprestimo = resposta.data;
      } catch (erro) {
        console.error('Erro ao carregar Emprestimos:', erro);
      }
    },

    // para edição das coisas
    async carregarDados() {

    },

    // carregar os Çivros para pegar no combobox
    async carregarLivros() {
      try {
        const resposta = await axios.get('http://localhost:3000/livros');
        this.listarLivros = resposta.data.sort((a: any, b: any) => {
          return a.titulo.localeCompare(b.titulo);
        });

      } catch (erro) {
        console.error('Erro ao carregar livros:', erro);
        Toast.fire({
          icon: 'error',
          title: 'Erro ao carregar os livros'
        });
      }
    },

    // carregar os leitores
    async carregarLeitores() {
      try {
        const resposta = await axios.get('http://localhost:3000/leitores');
        this.listarLeitor = resposta.data.sort((a: any, b: any) => {
          return a.nome.localeCompare(b.nome);
        });

      } catch (erro) {
        console.error('Erro ao carregar leitores:', erro);
        Toast.fire({
          icon: 'error',
          title: 'Erro ao carregar os leitores'
        });
      }
    },

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
  },

  async mounted() {
    await this.carregarLivros();
    await this.carregarLeitores();
    await this.carregarEmprestimo();
  }
});
</script>

<style>
.destaque {
  color: blueviolet;
}

input[readonly] {
  background-color: #2a2a3c !important;
  color: #c7c7c7 !important;
  cursor: not-allowed;
  border-color: #2a2a3c;
}
</style>
