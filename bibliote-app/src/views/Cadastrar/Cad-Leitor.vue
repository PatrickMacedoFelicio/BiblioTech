<template>
  <div class="grid-margin stretch-card">
    <div class="card">
      <div class="card-body">

        <form @submit.prevent="salvar">
          <h3 class="card-title">Cadastro de leitor</h3>
          <div class="form-group row">
            <div class="col">
              <label>Nome Completo</label>
              <div id="the-basics">
                <input class="typeahead form-control form-control-lg" type="text" placeholder="Digite o nome completo"
                  v-model="CadLivro.nome">

                <div class="text-danger" v-if="v$.CadLivro.nome.$errors.length && v$.CadLivro.nome.$dirty">
                  <p v-for="error of v$.CadLivro.nome.$errors" :key="error.$uid">
                    <small>{{ error.$message }}</small>
                  </p>
                </div>

              </div>
            </div>
            <div class="col">
              <label>E-mail</label>
              <div id="bloodhound">
                <input class="typeahead form-control form-control-lg" type="text" placeholder="Digite o e-mail"
                  v-model="CadLivro.email">

                <div class="text-danger" v-if="v$.CadLivro.email.$errors.length && v$.CadLivro.email.$dirty">
                  <p v-for="error of v$.CadLivro.email.$errors" :key="error.$uid">
                    <small>{{ error.$message }}</small>
                  </p>
                </div>

              </div>
            </div>
          </div>
          <div class="form-group row">
            <div class="col">
              <label>CPF</label>
              <div id="bloodhound">
                <input class="form-control form-control-lg" type="text" v-model="CadLivro.cpf" v-mask="'###.###.###-##'"
                  placeholder="Digite o CPF" />

                <div class="text-danger" v-if="v$.CadLivro.cpf.$errors.length && v$.CadLivro.cpf.$dirty">
                  <p v-for="error of v$.CadLivro.cpf.$errors" :key="error.$uid">
                    <small>{{ error.$message }}</small>
                  </p>
                </div>

              </div>
            </div>
            <div class="col">
              <label>Telefone</label>
              <div id="the-basics">
                <input class="typeahead form-control form-control-lg" type="text" v-mask="'(##) #####-####'" placeholder="Digite o Telefone"
                  v-model="CadLivro.telefone">

                <div class="text-danger" v-if="v$.CadLivro.telefone.$errors.length && v$.CadLivro.telefone.$dirty">
                  <p v-for="error of v$.CadLivro.telefone.$errors" :key="error.$uid">
                    <small>{{ error.$message }}</small>
                  </p>
                </div>

              </div>
            </div>
            <div class="col">
              <label>Data de Nascimento</label>
              <div id="the-basics">
                <input class="typeahead form-control form-control-lg" type="date"
                  v-model="CadLivro.dataNasc">
                <div class="text-danger" v-if="v$.CadLivro.dataNasc.$errors.length && v$.CadLivro.dataNasc.$dirty">
                  <p v-for="error of v$.CadLivro.dataNasc.$errors" :key="error.$uid">
                    <small>{{ error.$message }}</small>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <h4 class="card-title">Endereço</h4>
          <div class="form-group row">
            <div class="col">
              <label>CEP</label>
              <div id="bloodhound">
                <input class="typeahead form-control-lg" type="text" v-mask="'#####-###'" placeholder="CEP" v-model="CadLivro.cep"
                  @blur="buscarCep">

                <div class="text-danger" v-if="v$.CadLivro.cep.$errors.length && v$.CadLivro.cep.$dirty">
                  <p v-for="error of v$.CadLivro.cep.$errors" :key="error.$uid">
                    <small>{{ error.$message }}</small>
                  </p>
                </div>

              </div>
            </div>

            <div class="col">
              <label>Rua</label>
              <div id="the-basics">
                <input class="typeahead form-control form-control-lg" type="text" placeholder="Nome da rua"
                  v-model="CadLivro.Rua">

                <div class="text-danger" v-if="v$.CadLivro.Rua.$errors.length && v$.CadLivro.Rua.$dirty">
                  <p v-for="error of v$.CadLivro.Rua.$errors" :key="error.$uid">
                    <small>{{ error.$message }}</small>
                  </p>
                </div>

              </div>
            </div>
            <div class="col">
              <label>Bairro</label>
              <div id="bloodhound">
                <input class="typeahead form-control form-control-lg" type="text"  placeholder="Digite o bairro"
                  v-model="CadLivro.Bairro">

                <div class="text-danger" v-if="v$.CadLivro.Bairro.$errors.length && v$.CadLivro.Bairro.$dirty">
                  <p v-for="error of v$.CadLivro.Bairro.$errors" :key="error.$uid">
                    <small>{{ error.$message }}</small>
                  </p>
                </div>

              </div>
            </div>
            <div class="col">
              <label>Número</label>
              <div id="bloodhound">
                <input class="typeahead form-control form-control-lg" type="text" placeholder="Número da casa"
                  v-model="CadLivro.Numero">

                <div class="text-danger" v-if="v$.CadLivro.Numero.$errors.length && v$.CadLivro.Numero.$dirty">
                  <p v-for="error of v$.CadLivro.Numero.$errors" :key="error.$uid">
                    <small>{{ error.$message }}</small>
                  </p>
                </div>

              </div>
            </div>
          </div>

          <div class="form-group row">
            <div class="col">
              <label for="exampleFormControlSelect1">Estado</label>
              <select class="form-control form-control-lg" id="exampleFormControlSelect1" v-model="CadLivro.estado">
                <option value="" disabled selected>Selecione seu estado...</option>
                <option value="AC">Acre</option>
                <option value="AL">Alagoas</option>
                <option value="AP">Amapá</option>
                <option value="AM">Amazonas</option>
                <option value="BA">Bahia</option>
                <option value="CE">Ceará</option>
                <option value="DF">Distrito Federal</option>
                <option value="ES">Espírito Santo</option>
                <option value="GO">Goiás</option>
                <option value="MA">Maranhão</option>
                <option value="MT">Mato Grosso</option>
                <option value="MS">Mato Grosso do Sul</option>
                <option value="MG">Minas Gerais</option>
                <option value="PA">Pará</option>
                <option value="PB">Paraíba</option>
                <option value="PR">Paraná</option>
                <option value="PE">Pernambuco</option>
                <option value="PI">Piauí</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="RN">Rio Grande do Norte</option>
                <option value="RS">Rio Grande do Sul</option>
                <option value="RO">Rondônia</option>
                <option value="RR">Roraima</option>
                <option value="SC">Santa Catarina</option>
                <option value="SP">São Paulo</option>
                <option value="SE">Sergipe</option>
                <option value="TO">Tocantins</option>
              </select>

              <div class="text-danger" v-if="v$.CadLivro.estado.$errors.length && v$.CadLivro.estado.$dirty">
                <p v-for="error of v$.CadLivro.estado.$errors" :key="error.$uid">
                  <small>{{ error.$message }}</small>
                </p>
              </div>
            </div>

            <div class="col">
              <label>Cidade</label>
              <select class="form-control form-control-lg" v-model="CadLivro.cidade">
                <option value="" disabled selected>Selecione sua cidade...</option>
                <option v-for="cidade in cidades" :key="cidade" :value="cidade">
                  {{ cidade }}
                </option>
              </select>

              <div class="text-danger" v-if="v$.CadLivro.cidade.$errors.length && v$.CadLivro.nome.$dirty">
                <p v-for="error of v$.CadLivro.cidade.$errors" :key="error.$uid">
                  <small>{{ error.$message }}</small>
                </p>
              </div>
            </div>

          </div>
          <div class="form-group row">
            <div class="col">
              <button type="submit" class="btn btn-success btn-fw btn-lg">Cadastrar</button>
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
import { required, email, minLength, helpers, maxLength } from '@vuelidate/validators';
import { mask } from 'vue-the-mask'

const dataFuturo = helpers.withMessage(
  'Data de nascimento não pode ser no futuro',
  (value: string) => {
    if (!value) return true;
    return new Date(value) <= new Date();
  }
);

export default defineComponent({
  name: 'CadLeitor',

  setup() {
    return { v$: useVuelidate() };
  },

  data() {
    return {
      CadLivro: {
        nome: '',
        email: '',
        cpf: '',
        telefone: '',
        dataNasc: '',
        Rua: '',
        Bairro: '',
        Numero: '',
        cep: '',
        estado: '',
        cidade: '',
      },
      cidades: [] as string[],
      estadoPorCep: '' // Usado para armazenar temporariamente o estado vindo do CEP
    };
  },

  watch: {
    'CadLivro.estado': {
      handler: async function (uf: string) {
        if (!uf) return;

        try {
          const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
          const data = await response.json();
          this.cidades = data.map((cidade: any) => cidade.nome);

          // Preenche a cidade automaticamente se já veio do CEP
          if (this.CadLivro.cidade && this.estadoPorCep === uf) {
            // cidade já preenchida via CEP, mantem
          } else {
            this.CadLivro.cidade = ''; // reseta cidade ao mudar estado manualmente
          }
        } catch (error) {
          console.error('Erro ao buscar cidades:', error);
        }
      },
      immediate: false
    }
  },

  validations() {
    return {
      CadLivro: {
        nome: {
          minLength: helpers.withMessage('O nome deve ter no mínimo 8 carácteres!', minLength(8)),
          required: helpers.withMessage('Nome é obrigatorio!', required)
        },
        email: {
          email: helpers.withMessage('Este e-mail não é considerado valido!', email),
          required: helpers.withMessage('E-mail é obrigatorio', required)
        },
        cpf: {
          required: helpers.withMessage('CPF é obrigatório', required),
          minLength: helpers.withMessage('CPF deve ter pelo menos 11 dígitos', minLength(14))
        },
        telefone: {
          required: helpers.withMessage('Telefone é obrigatório', required),
          minLength: helpers.withMessage('Telefone deve ter ao menos 10 dígitos', minLength(10))
        },
        dataNasc: {
          required: helpers.withMessage('Data de nascimento é obrigatória', required),
          dataFuturo
        },
        Rua: { required: helpers.withMessage('Rua é obrigatório', required) },
        Bairro: { required: helpers.withMessage('Bairro é obrigatório', required) },
        Numero: { required: helpers.withMessage('Número da casa é obrigatório', required) },
        cep: {},
        estado: { required: helpers.withMessage('Estado é obrigatório', required) },
        cidade: { required: helpers.withMessage('Cidade é obrigatório', required) },
      }
    };
  },

  methods: {
    async buscarCep() {
      const cep = this.CadLivro.cep.replace(/\D/g, '');
      if (cep.length !== 8) return;

      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
          console.error('CEP não encontrado');
          return;
        }

        this.CadLivro.Rua = data.logradouro;
        this.CadLivro.Bairro = data.bairro;
        this.CadLivro.cidade = data.localidade;
        this.CadLivro.estado = data.uf;
        this.estadoPorCep = data.uf; // Guarda para saber que foi via CEP

        // Força a atualização do array de cidades
        await this.$nextTick();

      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
      }
    },

    async salvar() {
      const result = await this.v$.$validate();

      console.log(this.v$.$errors);

      if (!result) return;

      console.log('Dados do formulário', this.CadLivro);
    }
  }
});
</script>
