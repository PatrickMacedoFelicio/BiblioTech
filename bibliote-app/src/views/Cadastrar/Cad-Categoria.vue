<template>
  <div class="grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="salvar">
          <h3 class="card-title mb-4">Cadastro de Categoria</h3>

          <!-- Nome -->
          <div class="form-group mb-3">
            <label>Nome da Categoria</label>
            <input
              type="text"
              class="form-control form-control-lg"
              placeholder="Digite o nome da categoria"
              v-model="categoria.nome"
            />
            <div class="text-danger mt-1" v-if="v$.categoria.nome.$error">
              <small>{{ v$.categoria.nome.$errors[0].$message }}</small>
            </div>
          </div>

          <!-- Descrição -->
          <div class="form-group mb-4">
            <label>Descrição</label>
            <textarea
              class="form-control"
              rows="4"
              placeholder="Descreva a categoria"
              v-model="categoria.descricao"
            ></textarea>
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
import { required, minLength, helpers } from '@vuelidate/validators';

export default defineComponent({
  name: 'CadastroCategoria',

  setup() {
    return { v$: useVuelidate() };
  },

  data() {
    return {
      categoria: {
        nome: '',
        descricao: '',
      },
    };
  },

  validations() {
    return {
      categoria: {
        nome: {
          required: helpers.withMessage('Nome é obrigatório!', required),
          minLength: helpers.withMessage('Mínimo de 3 caracteres', minLength(3))
        },
        descricao: {} // opcional
      },
    };
  },

  methods: {
    async salvar() {
      const valid = await this.v$.$validate();
      if (!valid) return;

      const confirmado = confirm('Deseja realmente cadastrar esta categoria?');

      if (confirmado) {
        // Aqui você pode substituir por uma chamada real à API
        console.log('Categoria cadastrada:', this.categoria);
        alert('Categoria cadastrada com sucesso!');
        this.limparCampos();
      }
    },

    limparCampos() {
      this.categoria.nome = '';
      this.categoria.descricao = '';
      this.v$.$reset();
    }
  },
});
</script>
