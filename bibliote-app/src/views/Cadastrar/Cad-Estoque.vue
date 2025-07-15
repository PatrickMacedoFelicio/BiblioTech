<template>
  <div class="grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <h3 class="card-title">{{ ehEdicao ? 'Atualização de' : 'Cadastro de' }} Estoque</h3>
        <form @submit.prevent="salvar">
          <div class="form-group row align-items-end">
            <div class="col-6">
              <label>Título do Livro</label>

              <select class="form-control form-control-lg" v-model="estoque.livroId">
                <option disabled value="">Selecione um livro...</option>
                <option v-for="livro in listarLivros" :key="livro.id" :value="livro.id">
                  {{ livro.titulo }}
                </option>
              </select>
              <div class="text-danger" v-if="v$.estoque.livroId.$error">
                <small>{{ v$.estoque.livroId.$errors[0].$message }}</small>
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
              <input class="form-control form-control-lg" type="text" v-model="estoque.codigoDeBarras"
                placeholder="Digite o código de barras" />
              <div class="text-danger" v-if="v$.estoque.codigoDeBarras.$error">
                <small>{{ v$.estoque.codigoDeBarras.$errors[0].$message }}</small>
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
import { api } from '@/common/http';
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
        codigoDeBarras: '',
        quantidade: 0,
        livroId: 0,
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
        codigoDeBarras: {
          required: helpers.withMessage('Código de barras é obrigatório', required)
        },
        quantidade: {
          required: helpers.withMessage('Quantidade é obrigatória', required),
          minValue: helpers.withMessage('Deve ser no mínimo 1', minValue(1))
        },
        livroId: {
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
      };

      try {
        if (this.ehEdicao) {
          await api.put(`/estoques/${this.id}`, estoqueFinal);
          Toast.fire({ icon: 'success', title: 'Estoque atualizado com sucesso!' });
        } else {
          await api.post('/estoques', estoqueFinal);
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
        const resposta = await api.get('/estoques');
        this.estoques = resposta.data;
      } catch (erro) {
        console.error('Erro ao carregar estoque:', erro);
      }
    },

    // para edição das coisas
    async carregarDados() {
      try {
        const resposta = await api.get(`/estoques/${this.id}`);
        this.estoque = {
          codigoDeBarras: resposta.data.codigoDeBarras,
          quantidade: resposta.data.quantidade,
          livroId: resposta.data.livro?.id || '',
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
        const resposta = await api.get('/livros');
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
        codigoDeBarras: '',
        quantidade: 0,
        livroId: 0
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
