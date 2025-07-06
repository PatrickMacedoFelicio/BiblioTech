<template>
  <div class="grid-margin stretch-card">
    <div class="card">
      <div class="card-body">

        <form @submit.prevent="salvar">
          <h3 class="card-title">Cadastro de Livro</h3>
          <div class="form-group row">
            <div class="col">
              <label>Título</label>
              <div id="the-basics">
                <input class="typeahead form-control form-control-lg" type="text" placeholder="Digite o título"
                  v-model="CadLivro.titulo">

                <div class="text-danger" v-if="v$.CadLivro.titulo.$errors.length && v$.CadLivro.titulo.$dirty">
                  <p v-for="error of v$.CadLivro.titulo.$errors" :key="error.$uid">
                    <small>{{ error.$message }}</small>
                  </p>
                </div>

              </div>
            </div>
            <div class="col">
              <label>Autor</label>
              <div id="bloodhound">
                <input class="typeahead form-control form-control-lg" type="text" placeholder="Digite o nome do Autor"
                  v-model="CadLivro.autor">

                <div class="text-danger" v-if="v$.CadLivro.autor.$errors.length && v$.CadLivro.autor.$dirty">
                  <p v-for="error of v$.CadLivro.autor.$errors" :key="error.$uid">
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
                  v-model="CadLivro.ISBN">

                <div class="text-danger" v-if="v$.CadLivro.ISBN.$errors.length && v$.CadLivro.ISBN.$dirty">
                  <p v-for="error of v$.CadLivro.ISBN.$errors" :key="error.$uid">
                    <small>{{ error.$message }}</small>
                  </p>
                </div>

              </div>
            </div>
            <div class="col">
              <label>Ano de publicação</label>
              <div id="bloodhound">
                <input class="typeahead form-control form-control-lg" type="text" placeholder="Digite o e-mail"
                  v-model="CadLivro.ano_publicacao">

                <div class="text-danger"
                  v-if="v$.CadLivro.ano_publicacao.$errors.length && v$.CadLivro.ano_publicacao.$dirty">
                  <p v-for="error of v$.CadLivro.ano_publicacao.$errors" :key="error.$uid">
                    <small>{{ error.$message }}</small>
                  </p>
                </div>

              </div>
            </div>
            <div class="col">
              <label>Editora</label>
              <div id="bloodhound">
                <input class="typeahead form-control form-control-lg" type="text" placeholder="Digite o e-mail"
                  v-model="CadLivro.editora">

                <div class="text-danger" v-if="v$.CadLivro.editora.$errors.length && v$.CadLivro.editora.$dirty">
                  <p v-for="error of v$.CadLivro.editora.$errors" :key="error.$uid">
                    <small>{{ error.$message }}</small>
                  </p>
                </div>

              </div>
            </div>
            <div class="col">
              <label for="exampleFormControlSelect1">Categoria</label>
              <select class="form-control form-control-lg" id="exampleFormControlSelect1" v-model="CadLivro.categoria">
                <option value="" disabled selected>Selecione a categoria...</option>
              </select>

              <div class="text-danger" v-if="v$.CadLivro.categoria.$errors.length && v$.CadLivro.categoria.$dirty">
                <p v-for="error of v$.CadLivro.categoria.$errors" :key="error.$uid">
                  <small>{{ error.$message }}</small>
                </p>
              </div>

            </div>
          </div>
          <div class="form-group row">
            <div class="col">
              <label for="exampleTextarea1">Sinopse</label>
              <textarea class="form-control" id="exampleTextarea1" rows="4" placeholder="Digite a sinopse do livro..."
                v-model="CadLivro.sinopse"></textarea>

              <div class="text-danger" v-if="v$.CadLivro.sinopse.$errors.length && v$.CadLivro.sinopse.$dirty">
                <p v-for="error of v$.CadLivro.sinopse.$errors" :key="error.$uid">
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
import { defineComponent } from "vue";
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, helpers } from '@vuelidate/validators';
import { mask } from 'vue-the-mask'

export default defineComponent({
  name: 'CadLivro',

  setup() {
    return { v$: useVuelidate() };
  },

  data() {
    return {
      CadLivro: {
        id: '',
        titulo: '',
        autor: '',
        ISBN: '',
        ano_publicacao: '',
        editora: '',
        categoria: '',
        sinopse: '',
      },

    };
  },

  validations() {
    return {
      CadLivro: {
        titulo: {
          required: helpers.withMessage('Título é obrigatorio!', required)
        },
        autor: {
          required: helpers.withMessage('Autor é obrigatorio!', required)
        },
        ISBN: {
          required: helpers.withMessage('ISBN é obrigatorio!', required)
        },
        ano_publicacao: {
          required: helpers.withMessage('Ano de publicação é obrigatorio!', required)
        },
        editora: {
          required: helpers.withMessage('Editora é obrigatorio!', required)
        },
        categoria: {
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
      const result = await this.v$.$validate();

      console.log(this.v$.$errors);

      if (!result) return;

      console.log('Dados do formulário', this.CadLivro);
    },

    limparCampos() {
      this.CadLivro = {
        id: '',
        titulo: '',
        autor: '',
        ISBN: '',
        ano_publicacao: '',
        editora: '',
        categoria: '',
        sinopse: '',
      };
    },
  },
});
</script>
