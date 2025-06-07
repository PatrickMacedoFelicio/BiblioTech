<template>
  <div class="grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="confirmarSalvar">
          <h3 class="card-title">Cadastro de Estoque de Livro</h3>

          <div class="form-group row">
            <div class="col">
              <label>Título do Livro</label>
              <select class="form-control form-control-lg" v-model="estoque.livroId">
                <option disabled value=""></option>
                <option v-for="livro in livros" :key="livro.id" :value="livro.id">
                  {{ livro.titulo }}
                </option>
              </select>
              <div class="text-danger" v-if="v$.estoque.livroId.$error">
                <small>{{ v$.estoque.livroId.$errors[0].$message }}</small>
              </div>
            </div>
            <div class="col">
              <label>Código de Barras</label>
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Digite o código de barras"
                v-model="estoque.codigoBarras"
              />
              <div class="text-danger" v-if="v$.estoque.codigoBarras.$error">
                <small>{{ v$.estoque.codigoBarras.$errors[0].$message }}</small>
              </div>
            </div>
          </div>

          <div class="form-group row">
            <div class="col">
              <label>Quantidade em Estoque</label>
              <input
                class="form-control form-control-lg"
                type="number"
                placeholder="Informe a quantidade"
                v-model="estoque.quantidade"
              />
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

export default defineComponent({
  name: 'CadastroEstoque',

  setup() {
    return { v$: useVuelidate() };
  },

  data() {
    return {
      estoque: {
        livroId: '',
        codigoBarras: '',
        quantidade: 1,
      },
      livros: [
        { id: '1', titulo: 'Dom Casmurro' },
        { id: '2', titulo: 'O Pequeno Príncipe' },
        { id: '3', titulo: '1984' },
        // Substitua pelos dados reais da sua API ou store
      ],
      mostrarDialogo: false,
    };
  },

  validations() {
    return {
      estoque: {
        livroId: { required: helpers.withMessage('Livro é obrigatório', required) },
        codigoBarras: { required: helpers.withMessage('Código de barras é obrigatório', required) },
        quantidade: {
          required: helpers.withMessage('Quantidade é obrigatória', required),
          minValue: helpers.withMessage('Quantidade deve ser maior que zero', minValue(1)),
        },
      },
    };
  },

  methods: {
    confirmarSalvar() {
      this.v$.$validate().then((valid) => {
        if (valid) {
          this.mostrarDialogo = true;
        }
      });
    },
    salvar() {
      console.log('Estoque salvo:', this.estoque);
      this.mostrarDialogo = false;
      this.limparCampos();
    },
    limparCampos() {
      this.estoque = {
        livroId: '',
        codigoBarras: '',
        quantidade: 1,
      };
      this.v$.$reset();
    },
  },
});
</script>
