<template>
  <div class="grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <h3 class="card-title">{{ ehEdicao ? 'Atualização de' : 'Cadastro de' }} Estoque</h3>
        <form @submit.prevent="salvar">
          <div class="form-group row align-items-end">
            <div class="col-6">
              <label>Título do Livro</label>

              <select class="form-control form-control-lg" v-model="estoque.livro">
                <option disabled value="">Selecione um livro...</option>
                <option v-for="livro in listarLivros" :key="livro.id" :value="livro.id">
                  {{ livro.titulo }}
                </option>
              </select>
              <div class="text-danger" v-if="v$.estoque.livro.$error">
                <small>{{ v$.estoque.livro.$errors[0].$message }}</small>
              </div>


            </div>
            <div class="col-2 text-end">
              <router-link class="btn btn-info btn-lg px-4 py-3" to="/cadastrar/livro">
                <strong>+</strong>
              </router-link>
            </div>
          </div>
          <div class="form-group row">
            <div class="col">
              <label>Código de Barras</label>
              <input class="form-control form-control-lg" type="text" v-model="estoque.codigoBarras"
                placeholder="Digite o código de barras" />
              <div class="text-danger" v-if="v$.estoque.codigoBarras.$error">
                <small>{{ v$.estoque.codigoBarras.$errors[0].$message }}</small>
              </div>
            </div>

            <div class="col">
              <label>Quantidade</label>
              <input class="form-control form-control-lg" type="number" v-model="estoque.quantidade"
                placeholder="Digite a quantidade" />
              <div class="text-danger" v-if="v$.estoque.quantidade.$error">
                <small>{{ v$.estoque.quantidade.$errors[0].$message }}</small>
              </div>
            </div>
          </div>
          <div class="form-group row mt-4">
            <div class="col-auto">
              <button type="submit" class="btn btn-success btn-lg">Salvar</button>
            </div>
            <div class="col-auto">
              <button type="button" class="btn btn-secondary btn-lg disable" @click="limparCampos">Limpar</button>
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
import "vue3-select/dist/vue3-select.css"

export default defineComponent({
  name: 'CadastroEstoque',

  setup() {
    return { v$: useVuelidate() };
  },

  computed: {
    id() {
      return this.$route.params.id || null;
    },
    ehEdicao() {
      return !!this.id;
    }
  },

  data() {
    return {
      estoque: {
        id: '',
        codigoBarras: '',
        quantidade: 0,
        livro: '',
      },
      estoques: [] as any[],
      listarLivros: [] as any[],
      dialog: false
    };
  }
  ,

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
        livro: {
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
        title: this.ehEdicao ? 'Confirmar atualização?' : 'Confirmar cadastro?',
        text: this.ehEdicao ? 'Deseja atualizar as informações deste estoque?' : 'Deseja realmente cadastrar ao estoque?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#6c757d',
        confirmButtonText: this.ehEdicao ? 'Sim, atualizar!' : 'Sim, cadastrar!',
        cancelButtonText: 'Cancelar'
      });

      if (!confirmado.isConfirmed) return;

      const estoqueFinal = {
        ...this.estoque,
        id: this.ehEdicao ? this.id : Math.random().toString(36).substring(2, 8)
      };

      try {
        if (this.ehEdicao) {
          await axios.put(`http://localhost:3000/estoques/${this.id}`, estoqueFinal);
          Toast.fire({ icon: 'success', title: 'Estoque atualizado com sucesso!' });
        } else {
          await axios.post('http://localhost:3000/estoques', estoqueFinal);
          Toast.fire({ icon: 'success', title: 'Estoque cadastrado com sucesso!' });
        }

        this.$router.push('/consultar/estoque');
      } catch (erro) {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao salvar',
          text: 'Erro inesperado.'
        });
      }
    },

    async carregarEstoque() {
      try {
        const resposta = await axios.get('http://localhost:3000/estoques');
        this.estoques = resposta.data;
      } catch (erro) {
        console.error('Erro ao carregar estoque:', erro);
      }
    },

    // para edição das coisas
    async carregarDados() {
      try {
        const resposta = await axios.get(`http://localhost:3000/estoques/${this.id}`);
        this.estoque = {
          id: resposta.data.id,
          codigoBarras: resposta.data.codigoBarras,
          quantidade: resposta.data.quantidade,
          livro: resposta.data.livro
        };
      } catch (erro) {
        Toast.fire({
          icon: 'error',
          title: 'Erro ao carregar o estoque para edição'
        });
        this.$router.push('/consultar/estoque');
      }
    },

    // carregar os livros para pegar no combobox
    async carregarLivros() {
      try {
        const resposta = await axios.get('http://localhost:3000/livros');
        this.listarLivros = resposta.data;
      } catch (erro) {
        console.error('Erro ao carregar livros:', erro);
        Toast.fire({
          icon: 'error',
          title: 'Erro ao carregar os livros'
        });
      }
    },


    limparCampos() {
      this.estoque = {
        id: '',
        codigoBarras: '',
        quantidade: 0,
        livro: ''
      };
      this.v$.$reset();
    }
  },

  async mounted() {
    await this.carregarLivros();
    await this.carregarEstoque();

    if (this.ehEdicao) {
      await this.carregarDados();
    }
  }
});
</script>
