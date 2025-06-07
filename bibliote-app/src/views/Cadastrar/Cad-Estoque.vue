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

          <div class="form-group">
            <label>Título do Livro</label>
            <input
              class="form-control form-control-lg bg-light text-dark"
              type="text"
              :value="estoque.tituloLivro"
              readonly
            />
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

        <div v-if="dialog" class="alert alert-success mt-4" role="alert">
          Estoque salvo com sucesso!
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, minValue, helpers } from '@vuelidate/validators';

export default defineComponent({
  name: 'CadastroEstoque',

  setup() {
    return { v$: useVuelidate() };
  },

  data() {
    return {
      estoque: {
        codigoBarras: '',
        quantidade: 0,
        tituloLivro: 'O Pequeno Príncipe'
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
        tituloLivro: {}
      }
    };
  },

  methods: {
    async salvar() {
      const valido = await this.v$.$validate();
      if (!valido) return;

      this.dialog = true;
      setTimeout(() => (this.dialog = false), 3000);
      console.log('Estoque salvo:', this.estoque);
    },

    limparCampos() {
      this.estoque.codigoBarras = '';
      this.estoque.quantidade = 0;
      this.v$.$reset();
    }
  }
});
</script>
