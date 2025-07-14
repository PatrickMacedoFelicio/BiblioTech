<template>
  <div class="grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="salvar">
          <h3 class="card-title">{{ ehEdicao ? 'Atualização de' : 'Cadastro de' }} Categoria</h3>

          <div class="form-group row">
            <div class="col">
              <label class="form-label">Nome da Categoria</label>
              <input type="text" class="form-control" v-model="categoria.nome"
                placeholder="Digite o nome da categoria..." />
              <div class="text-danger" v-if="v$.categoria.nome.$errors.length">
                <p v-for="error of v$.categoria.nome.$errors" :key="error.$uid">
                  <small>{{ error.$message }}</small>
                </p>
              </div>
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label">Descrição</label>
            <textarea class="form-control" placeholder="Descreva a categoria para o livro..." rows="4"
              v-model="categoria.descricao"></textarea>
            <div class="text-danger" v-if="v$.categoria.descricao.$errors.length">
              <p v-for="error of v$.categoria.descricao.$errors" :key="error.$uid">
                <small>{{ error.$message }}</small>
              </p>
            </div>
          </div>

          <div class="d-flex gap-2">
            <div class="form-group row mt-4">
              <div class="col-auto">
                <button type="submit" class="btn btn-success btn-lg">Salvar</button>
              </div>
              <div class="col-auto">
                <button type="button" class="btn btn-secondary btn-lg" @click="limparCampos">Limpar</button>
              </div>
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
import axios from 'axios';
import Swal from 'sweetalert2';
import { Toast } from '@/common/toast';
import { api } from '@/common/http';


interface Categoria {
  nome: string;
  descricao: string;
}

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
      } as Categoria,
      categorias: [] as Categoria[]
    };
  },

  validations() {
    return {
      categoria: {
        nome: {
          required: helpers.withMessage('Nome é obrigatório!', required),
          minLength: helpers.withMessage('Mínimo de 3 caracteres', minLength(3))
        },
        descricao: {
          required: helpers.withMessage('A descrição é obrigatória!', required),
          minLength: helpers.withMessage('Mínimo de 10 caracteres', minLength(10))
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
        text: this.ehEdicao ? 'Deseja atualizar as informações desta categoria?' : 'Deseja realmente cadastrar esta categoria?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#6c757d',
        confirmButtonText: this.ehEdicao ? 'Sim, atualizar!' : 'Sim, cadastrar!',
        cancelButtonText: 'Cancelar'
      });

      if (!confirmado.isConfirmed) return;


      const novoGenero = {
        ...this.categoria,
      };

      try {
        if (this.ehEdicao) {
          await api.put(`/generos/${this.id}`, novoGenero)
          Toast.fire({ icon: 'success', title: 'Genero atualizada com sucesso!' });
        } else {
          await api.post(`/generos`, novoGenero)
          Toast.fire({ icon: 'success', title: 'Genero cadastrada com sucesso!' });
        }

        this.$router.push('/consultar/categoria');
      } catch (erro) {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao salvar',
          text: 'Erro inesperado.'
        });
      }
    },

    async carregarGeneros() {
      try {
        const resposta = await api.get('/generos');
        this.categorias = resposta.data;
      } catch (erro) {
        console.error('Erro ao carregar generos:', erro);
      }
    },

    // para edição das coisas
    async carregarDados() {
      try {
        const resposta = await api.get(`/generos/${this.id}`);
        this.categoria = resposta.data;
      } catch (erro) {
        Toast.fire({
          icon: 'error',
          title: 'Erro ao carregar genero para edição'
        });
        this.$router.push('/consultar/categoria');
      }
    },

    limparCampos() {
      this.categoria = { nome: '', descricao: '' };
      this.v$.$reset();
    },
  },

  async mounted() {
    await this.carregarGeneros();

    if (this.ehEdicao) {
      await this.carregarDados();
    }
  },

  // Sessão de puxar id para editar
  computed: {
    id() {
      return this.$route.params.id || null;
    },
    ehEdicao() {
      return !!this.id;
    }
  }

});
</script>
