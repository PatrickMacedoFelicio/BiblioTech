<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="card">
        <div class="card-header">
          <div class="row">
            <div class="col-sm-10">
              <h3 class="m-0">Cadastro de Categoria</h3>
            </div>
            <div class="col-sm-2 d-grid">
              <RouterLink class="btn btn-secondary" to="/categorias">
                <i class="fas fa-arrow-left me-2"></i>Voltar
              </RouterLink>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="alert alert-warning" v-if="v$.$errors.length">
            <p class="m-0 p-0" v-for="error of v$.$errors" :key="error.$uid">
              {{ error.$property }}: {{ error.$message }}
            </p>
          </div>
          <form @submit.prevent="salvar">
            <div class="mb-3">
              <label class="form-label">Nome da Categoria</label>
              <input
                type="text"
                class="form-control"
                v-model="categoria.nome"
              />
              <div class="text-danger" v-if="v$.categoria.nome.$errors.length">
                <p v-for="error of v$.categoria.nome.$errors" :key="error.$uid">
                  <small>{{ error.$message }}</small>
                </p>
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label">Descrição</label>
              <textarea
                class="form-control"
                rows="4"
                v-model="categoria.descricao"
              ></textarea>
            </div>

            <div class="d-flex gap-2">
              <button type="submit" class="btn btn-success">
                <i class="fas fa-save me-2"></i>Salvar
              </button>
              <button type="button" class="btn btn-secondary gap1" @click="limparCampos">
                Limpar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, helpers } from '@vuelidate/validators';
import axios from 'axios';
import { Toast } from '@/common/toast'; 

export default defineComponent({
  name: 'CadastroCategoria',

  setup() {
    return { v$: useVuelidate() };
  },

  data() {
    return {
      categoria: {
        nome: '',
        descricao: ''
      }
    };
  },

  validations() {
    return {
      categoria: {
        nome: {
          required: helpers.withMessage('Nome é obrigatório!', required),
          minLength: helpers.withMessage('Mínimo de 3 caracteres', minLength(3))
        },
        descricao: {}
      }
    };
  },

  methods: {
    async salvar() {
      const valid = await this.v$.$validate();
      if (!valid) return;

      const dados = {
        ...this.categoria,
        id: Math.random().toString(36).substring(2, 8) 
      };

      const headers = {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420'
      };

      try {
        const response = await axios.post('http://localhost:3000/categorias', dados, { headers });
        if (response.status === 201) {
          Toast.fire({
            icon: 'success',
            title: 'Categoria cadastrada com sucesso!'
          });
          this.$router.push('/categorias');
        }
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: 'Erro ao cadastrar categoria'
        });
      }
    },

    limparCampos() {
      this.categoria.nome = '';
      this.categoria.descricao = '';
      this.v$.$reset();
    }
  }
});
</script>
