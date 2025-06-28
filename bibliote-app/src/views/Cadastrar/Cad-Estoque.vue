<template>
  <div class="grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <h3 class="card-title">Cadastro de Estoque</h3>

        <form @submit.prevent="salvar">
          <div class="form-group row">
            <div class="col">
              <label>Código de Barras</label>
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="estoque.codigoBarras"
                placeholder="Digite o código de barras"
              />
              <div class="text-danger" v-if="v$.estoque.codigoBarras.$error">
                <small>{{ v$.estoque.codigoBarras.$errors[0].$message }}</small>
              </div>
            </div>

            <div class="col">
              <label>Quantidade</label>
              <input
                class="form-control form-control-lg"
                type="number"
                v-model="estoque.quantidade"
                placeholder="Digite a quantidade"
              />
              <div class="text-danger" v-if="v$.estoque.quantidade.$error">
                <small>{{ v$.estoque.quantidade.$errors[0].$message }}</small>
              </div>
            </div>
          </div>

          <div class="form-group row">
            <div class="col">
              <label>Título do Livro</label>
               <input
                class="form-control form-control-lg"
                type="text"
                v-model="estoque.tituloLivro"
                placeholder="Digite o titulo do livro..."
              />
              <div class="text-danger" v-if="v$.estoque.tituloLivro.$error">
                <small>{{ v$.estoque.tituloLivro.$errors[0].$message }}</small>
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
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, minValue, helpers } from '@vuelidate/validators';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Toast } from '@/common/toast';

export default defineComponent({
  name: 'CadastroEstoque',

  setup() {
    return { v$: useVuelidate() };
  },

  data() {
    return {
      estoque: {
        id: '',
        codigoBarras: '',
        quantidade: 0,
        tituloLivro: ''
      },
      dialog: false
    };
  },

  validations() {
    return {
      estoque: {
        codigoBarras: {
          required: helpers.withMessage('Código de barras é obrigatório', required)
        },
        quantidade: {
          required: helpers.withMessage('Quantidade é obrigatória', required),
          minValue: helpers.withMessage('Deve ser no mínimo 1', minValue(1))
        },
        tituloLivro: {
          required: helpers.withMessage('Escolher um livro é obrigatorio!', required)
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
        text: 'Deseja realmente cadastrar ao estoque?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sim, cadastrar!',
        cancelButtonText: 'Cancelar'
      });

      if (!confirmado.isConfirmed) return;


      const novoEstoque = {
        ...this.estoque,
        id: Math.random().toString(36).substring(2, 8)
      };

      try {
        await axios.post('http://localhost:3000/estoques', novoEstoque);
        Toast.fire({
          icon: 'success',
          title: 'Estoque cadastrado com sucesso!'
        });
        this.limparCampos();
        await this.carregarEstoque();
      } catch (erro: any) {
        let mensagemErro = 'Não foi possível salvar a categoria.';

        if (erro.response) {
          mensagemErro = `Erro ${erro.response.status}: ${erro.response.statusText}`;
        } else if (erro.request) {
          mensagemErro = 'Sem resposta do servidor. Verifique sua conexão.';
        } else if (erro.message) {
          mensagemErro = erro.message;
        }
        Swal.fire({
          icon: 'error',
          title: 'Erro ao cadastrar ao estoque',
          text: mensagemErro
        });
        console.error('Erro completo:', erro);
      }
    },

    async carregarEstoque() {
      try {
        const resposta = await axios.get('http://localhost:3000/estoques');
        this.estoque = resposta.data;
      } catch (erro) {
        console.error('Erro ao carregar estoque:', erro);
      }
    },


    limparCampos() {
      this.estoque.codigoBarras = '';
      this.estoque.tituloLivro = '';
      this.estoque.quantidade = 0;
      this.v$.$reset();
    }
  },

  async mounted() {
    await this.carregarEstoque();
  }
});
</script>
