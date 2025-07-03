<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="card">
        <div class="card-header">
          <div class="row">
            <div class="col-sm-10">
              <h3 class="m-0">Cadastro de Categoria</h3>
            </div>
          </div>
        </div>

        <div class="card-body">

          <form @submit.prevent="salvar">
            <div class="mb-3">
              <label class="form-label">Nome da Categoria</label>
              <input type="text" class="form-control" v-model="categoria.nome" />
              <div class="text-danger" v-if="v$.categoria.nome.$errors.length">
                <p v-for="error of v$.categoria.nome.$errors" :key="error.$uid">
                  <small>{{ error.$message }}</small>
                </p>
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label">Descrição</label>
              <textarea class="form-control" rows="4" v-model="categoria.descricao"></textarea>
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, helpers } from '@vuelidate/validators';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Toast } from '@/common/toast';


interface Categoria {
  id: string;
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
        id: '',
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
        descricao: {}
      }
    };
  },

  methods: {
    async salvar() {
      const valido = await this.v$.$validate();
      if (!valido) return;

      const confirmado = await Swal.fire({
        title: 'Confirmar cadastro?',
        text: 'Deseja realmente cadastrar esta categoria?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sim, cadastrar!',
        cancelButtonText: 'Cancelar'
      });

      if (!confirmado.isConfirmed) return;


      const novaCategoria = {
        ...this.categoria,
        id: Math.random().toString(36).substring(2, 8)
      };

      try {
        await axios.post('http://localhost:3000/categorias', novaCategoria);
        Toast.fire({
          icon: 'success',
          title: 'Categoria cadastrada com sucesso!'
        });
        this.limparCampos();
        await this.carregarCategorias();
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
          title: 'Erro ao cadastrar',
          text: mensagemErro
        });
        console.error('Erro completo:', erro);
      }
    },

    async carregarCategorias() {
      try {
        const resposta = await axios.get('http://localhost:3000/categorias');
        this.categorias = resposta.data;
      } catch (erro) {
        console.error('Erro ao carregar categorias:', erro);
      }
    },

    limparCampos() {
      this.categoria = { id: '', nome: '', descricao: '' };
      this.v$.$reset();
    },
  },

  async mounted() {
    await this.carregarCategorias();
  },

  // Sessão de puxar id para editar
  computed:{
    id(){
      
    }
  }
  
});
</script>
