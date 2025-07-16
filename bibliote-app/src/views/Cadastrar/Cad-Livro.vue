<template>
  <div class="grid-margin stretch-card">
    <div class="card">
      <div class="card-body">

        <form @submit.prevent="salvar">
          <h3 class="card-title">{{ ehEdicao ? 'Atualização de' : 'Cadastro de' }} Livro</h3>
          <div class="form-group row">
            <div class="col">
              <label>Título</label>
              <div id="the-basics">
                <input class="typeahead form-control form-control-lg" type="text" placeholder="Digite o título"
                  v-model="livro.titulo">

                <div class="text-danger" v-if="v$.livro.titulo.$errors.length && v$.livro.titulo.$dirty">
                  <p v-for="error of v$.livro.titulo.$errors" :key="error.$uid">
                    <small>{{ error.$message }}</small>
                  </p>
                </div>

              </div>
            </div>
            <div class="col">
              <label>Autor</label>
              <div id="bloodhound">
                <input class="typeahead form-control form-control-lg" type="text" placeholder="Digite o nome do Autor"
                  v-model="livro.autor">

                <div class="text-danger" v-if="v$.livro.autor.$errors.length && v$.livro.autor.$dirty">
                  <p v-for="error of v$.livro.autor.$errors" :key="error.$uid">
                    <small>{{ error.$message }}</small>
                  </p>
                </div>

              </div>
            </div>
          </div>
          <div class="form-group row">
            <div class="col">
              <label>ISBN</label>
              <div id="bloodhound">
                <input class="typeahead form-control form-control-lg" type="text" placeholder="Digite o ISBN"
                  v-model="livro.isbn">

                <div class="text-danger" v-if="v$.livro.isbn.$errors.length && v$.livro.isbn.$dirty">
                  <p v-for="error of v$.livro.isbn.$errors" :key="error.$uid">
                    <small>{{ error.$message }}</small>
                  </p>
                </div>

              </div>
            </div>
            <div class="col">
              <label>Ano de publicação</label>
              <div id="bloodhound">
                <input class="typeahead form-control form-control-lg" type="date" v-model="livro.anoPublicacao">

                <div class="text-danger" v-if="v$.livro.anoPublicacao.$errors.length && v$.livro.anoPublicacao.$dirty">
                  <p v-for="error of v$.livro.anoPublicacao.$errors" :key="error.$uid">
                    <small>{{ error.$message }}</small>
                  </p>
                </div>

              </div>
            </div>
            <div class="col">
              <label>Editora</label>
              <div id="bloodhound">
                <input class="typeahead form-control form-control-lg" type="text" placeholder="Digite a editora"
                  v-model="livro.editora">

                <div class="text-danger" v-if="v$.livro.editora.$errors.length && v$.livro.editora.$dirty">
                  <p v-for="error of v$.livro.editora.$errors" :key="error.$uid">
                    <small>{{ error.$message }}</small>
                  </p>
                </div>

              </div>
            </div>
            <div class="col">
              <label for="exampleFormControlSelect1">Categoria</label>
              <select class="form-control form-control-lg" id="exampleFormControlSelect1" v-model="livro.generoId">
                <option value="" disabled>Selecione a categoria...</option>
                <option v-for="(cate, index) in listarGenero" :key="index" :value="cate.id">
                  {{ cate.nome }}
                </option>
              </select>


              <div class="text-danger" v-if="v$.livro.generoId.$errors.length && v$.livro.generoId.$dirty">
                <p v-for="error of v$.livro.generoId.$errors" :key="error.$uid">
                  <small>{{ error.$message }}</small>
                </p>
              </div>

            </div>
          </div>
          <div class="form-group row">
            <div class="col">
              <label for="exampleTextarea1">Sinopse</label>
              <textarea class="form-control" id="exampleTextarea1" rows="4" placeholder="Digite a sinopse do livro..."
                v-model="livro.sinopse"></textarea>

              <div class="text-danger" v-if="v$.livro.sinopse.$errors.length && v$.livro.sinopse.$dirty">
                <p v-for="error of v$.livro.sinopse.$errors" :key="error.$uid">
                  <small>{{ error.$message }}</small>
                </p>
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
import { api } from "@/common/http";
import { defineComponent } from "vue";
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, helpers } from '@vuelidate/validators';
import { mask } from 'vue-the-mask'
import axios from 'axios';
import Swal from 'sweetalert2';
import { Toast } from '@/common/toast';


export default defineComponent({
  name: 'livro',

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
      livro: {
        titulo: '',
        autor: '',
        isbn: '',
        anoPublicacao: '',
        editora: '',
        generoId: '',
        sinopse: '',
      },
      livros: [] as any[],
      listarGenero: [] as any[],

    };
  },

  validations() {
    return {
      livro: {
        titulo: {
          required: helpers.withMessage('Título é obrigatorio!', required)
        },
        autor: {
          required: helpers.withMessage('Autor é obrigatorio!', required)
        },
        isbn: {
          required: helpers.withMessage('ISBN é obrigatorio!', required)
        },
        anoPublicacao: {
          required: helpers.withMessage('Ano de publicação é obrigatorio!', required)
        },
        editora: {
          required: helpers.withMessage('Editora é obrigatorio!', required)
        },
        generoId: {
          required: helpers.withMessage('Categoria é obrigatorio!', required)
        },
        sinopse: {
          required: helpers.withMessage('Sinopse é obrigatorio!', required)
        },
      }
    }
  },

  methods: {
    async salvar() {
      const valido = await this.v$.$validate();
      if (!valido) return;

      const confirmado = await Swal.fire({
        title: this.ehEdicao ? 'Confirmar atualização?' : 'Confirmar cadastro?',
        text: this.ehEdicao ? 'Deseja atualizar as informações deste livro?' : 'Deseja realmente cadastrar ao livro?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#6c757d',
        confirmButtonText: this.ehEdicao ? 'Sim, atualizar!' : 'Sim, cadastrar!',
        cancelButtonText: 'Cancelar'
      });

      if (!confirmado.isConfirmed) return;

      const livroFinal = {
        ...this.livro,
      };

      try {
        if (this.ehEdicao) {
          await api.put(`/livros/${this.id}`, livroFinal);
        } else {
          await api.post(`/livros`, livroFinal);
        }


        this.$router.push('/consultar/livro');
      } catch (erro) {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao salvar',
          text: 'Erro inesperado.'
        });
      }
    },

    async carregarLivro() {
      try {
        const resposta = await api.get('/livros');
        this.livros = resposta.data;
      } catch (erro) {
        console.error('Erro ao carregar livros:', erro);
      }
    },

    // para edição das coisas
    async carregarDados() {
      try {
        const resposta = await api.get(`/livros/${this.id}`);
        this.livro = {
          titulo: resposta.data.titulo,
          autor: resposta.data.autor,
          isbn: resposta.data.isbn,
          anoPublicacao: resposta.data.anoPublicacao,
          editora: resposta.data.editora,
          generoId: resposta.data.genero?.id || '',
          sinopse: resposta.data.sinopse,
        };
      } catch (erro) {
        Toast.fire({
          icon: 'error',
          title: 'Erro ao carregar o livro para edição'
        });
        this.$router.push('/consultar/livros');
      }
    },

    // carregar as categorias para pegar no combobox
    async carregarGenero() {
      try {

        const resposta = await api.get('/generos');
        console.log('Livro carregado:', resposta.data);
        this.listarGenero = resposta.data;
      } catch (erro) {
        console.error('Erro ao carregar gêneros:', erro);
        Toast.fire({
          icon: 'error',
          title: 'Erro ao carregar Gêneros'
        });
      }
    },

    limparCampos() {
      this.livro = {
        titulo: '',
        autor: '',
        isbn: '',
        anoPublicacao: '',
        editora: '',
        generoId: '',
        sinopse: '',
      };
    },
  },
  async mounted() {
    await this.carregarLivro();
    await this.carregarGenero();

    if (this.ehEdicao) {
      await this.carregarDados();
    }
  },

});
</script>
