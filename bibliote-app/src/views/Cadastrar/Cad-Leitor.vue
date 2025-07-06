<template>
  <div class="grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="salvar">
          <h3 class="card-title">Cadastro de leitor</h3>
          <div class="form-group row">
            <div class="col">
              <label>Nome Completo</label>
              <input class="form-control form-control-lg" type="text" placeholder="Digite o nome completo"
                     v-model="CadLivro.nome" />
              <div class="text-danger" v-if="v$.CadLivro.nome.$errors.length && v$.CadLivro.nome.$dirty">
                <p v-for="error of v$.CadLivro.nome.$errors" :key="error.$uid">
                  <small>{{ error.$message }}</small>
                </p>
              </div>
            </div>
            <div class="col">
              <label>E-mail</label>
              <input class="form-control form-control-lg" type="text" placeholder="Digite o e-mail"
                     v-model="CadLivro.email" />
              <div class="text-danger" v-if="v$.CadLivro.email.$errors.length && v$.CadLivro.email.$dirty">
                <p v-for="error of v$.CadLivro.email.$errors" :key="error.$uid">
                  <small>{{ error.$message }}</small>
                </p>
              </div>
            </div>
          </div>

          <div class="form-group row">
            <div class="col">
              <label>CPF</label>
              <input class="form-control form-control-lg" type="text" v-model="CadLivro.cpf" v-mask="'###.###.###-##'"
                     placeholder="Digite o CPF" />
              <div class="text-danger" v-if="v$.CadLivro.cpf.$errors.length && v$.CadLivro.cpf.$dirty">
                <p v-for="error of v$.CadLivro.cpf.$errors" :key="error.$uid">
                  <small>{{ error.$message }}</small>
                </p>
              </div>
            </div>
            <div class="col">
              <label>Telefone</label>
              <input class="form-control form-control-lg" type="text" v-mask="'(##) #####-####'"
                     placeholder="Digite o Telefone" v-model="CadLivro.telefone" />
              <div class="text-danger" v-if="v$.CadLivro.telefone.$errors.length && v$.CadLivro.telefone.$dirty">
                <p v-for="error of v$.CadLivro.telefone.$errors" :key="error.$uid">
                  <small>{{ error.$message }}</small>
                </p>
              </div>
            </div>
            <div class="col">
              <label>Data de Nascimento</label>
              <input class="form-control form-control-lg" type="date" v-model="CadLivro.dataNasc" />
              <div class="text-danger" v-if="v$.CadLivro.dataNasc.$errors.length && v$.CadLivro.dataNasc.$dirty">
                <p v-for="error of v$.CadLivro.dataNasc.$errors" :key="error.$uid">
                  <small>{{ error.$message }}</small>
                </p>
              </div>
            </div>
          </div>

          <h4 class="card-title">Endereço</h4>
          <div class="form-group row">
            <div class="col">
              <label>CEP</label>
              <input class="form-control-lg form-control" type="text" v-mask="'#####-###'" placeholder="CEP"
                     v-model="CadLivro.cep" @blur="buscarCep" />
              <div class="text-danger" v-if="v$.CadLivro.cep.$errors.length && v$.CadLivro.cep.$dirty">
                <p v-for="error of v$.CadLivro.cep.$errors" :key="error.$uid">
                  <small>{{ error.$message }}</small>
                </p>
              </div>
            </div>
            <div class="col">
              <label>Rua</label>
              <input class="form-control form-control-lg" type="text" placeholder="Nome da rua" v-model="CadLivro.Rua" />
              <div class="text-danger" v-if="v$.CadLivro.Rua.$errors.length && v$.CadLivro.Rua.$dirty">
                <p v-for="error of v$.CadLivro.Rua.$errors" :key="error.$uid">
                  <small>{{ error.$message }}</small>
                </p>
              </div>
            </div>
            <div class="col">
              <label>Bairro</label>
              <input class="form-control form-control-lg" type="text" placeholder="Digite o bairro"
                     v-model="CadLivro.Bairro" />
              <div class="text-danger" v-if="v$.CadLivro.Bairro.$errors.length && v$.CadLivro.Bairro.$dirty">
                <p v-for="error of v$.CadLivro.Bairro.$errors" :key="error.$uid">
                  <small>{{ error.$message }}</small>
                </p>
              </div>
            </div>
            <div class="col">
              <label>Número</label>
              <input class="form-control form-control-lg" type="text" placeholder="Número da casa"
                     v-model="CadLivro.Numero" />
              <div class="text-danger" v-if="v$.CadLivro.Numero.$errors.length && v$.CadLivro.Numero.$dirty">
                <p v-for="error of v$.CadLivro.Numero.$errors" :key="error.$uid">
                  <small>{{ error.$message }}</small>
                </p>
              </div>
            </div>
          </div>

          <div class="form-group row">
            <div class="col">
              <label>Estado</label>
              <select class="form-control form-control-lg" v-model="CadLivro.estado">
                <option value="" disabled selected>Selecione seu estado...</option>
                <option v-for="estado in estados" :key="estado.uf" :value="estado.uf">
                  {{ estado.nome }}
                </option>
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
                <option v-for="cidade in cidades" :key="cidade" :value="cidade">{{ cidade }}</option>
              </select>
              <div class="text-danger" v-if="v$.CadLivro.cidade.$errors.length && v$.CadLivro.nome.$dirty">
                <p v-for="error of v$.CadLivro.cidade.$errors" :key="error.$uid">
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
import { mask } from 'vue-the-mask';

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
      estados: [
        { uf: 'AC', nome: 'Acre' }, { uf: 'AL', nome: 'Alagoas' }, { uf: 'AP', nome: 'Amapá' },
        { uf: 'AM', nome: 'Amazonas' }, { uf: 'BA', nome: 'Bahia' }, { uf: 'CE', nome: 'Ceará' },
        { uf: 'DF', nome: 'Distrito Federal' }, { uf: 'ES', nome: 'Espírito Santo' }, { uf: 'GO', nome: 'Goiás' },
        { uf: 'MA', nome: 'Maranhão' }, { uf: 'MT', nome: 'Mato Grosso' }, { uf: 'MS', nome: 'Mato Grosso do Sul' },
        { uf: 'MG', nome: 'Minas Gerais' }, { uf: 'PA', nome: 'Pará' }, { uf: 'PB', nome: 'Paraíba' },
        { uf: 'PR', nome: 'Paraná' }, { uf: 'PE', nome: 'Pernambuco' }, { uf: 'PI', nome: 'Piauí' },
        { uf: 'RJ', nome: 'Rio de Janeiro' }, { uf: 'RN', nome: 'Rio Grande do Norte' },
        { uf: 'RS', nome: 'Rio Grande do Sul' }, { uf: 'RO', nome: 'Rondônia' }, { uf: 'RR', nome: 'Roraima' },
        { uf: 'SC', nome: 'Santa Catarina' }, { uf: 'SP', nome: 'São Paulo' },
        { uf: 'SE', nome: 'Sergipe' }, { uf: 'TO', nome: 'Tocantins' }
      ],
      estadoPorCep: ''
    };
  },

  watch: {
    'CadLivro.estado'(uf: string) {
      if (!uf) return;
      fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)
        .then(res => res.json())
        .then(data => {
          this.cidades = data.map((cidade: any) => cidade.nome);
          if (this.CadLivro.cidade && this.estadoPorCep === uf) {
          } else {
            this.CadLivro.cidade = '';
          }
        });
    }
  },

  validations() {
    return {
      CadLivro: {
        nome: { minLength: helpers.withMessage('O nome deve ter no mínimo 8 carácteres!', minLength(8)), required: helpers.withMessage('Nome é obrigatorio!', required) },
        email: { email: helpers.withMessage('Este e-mail não é considerado valido!', email), required: helpers.withMessage('E-mail é obrigatorio', required) },
        cpf: { required: helpers.withMessage('CPF é obrigatório', required) },
        telefone: { required: helpers.withMessage('Telefone é obrigatório', required), minLength: helpers.withMessage('Telefone deve ter ao menos 10 dígitos', minLength(10)) },
        dataNasc: { required: helpers.withMessage('Data de nascimento é obrigatória', required), dataFuturo },
        Rua: { required: helpers.withMessage('Rua é obrigatório', required) },
        Bairro: { required: helpers.withMessage('Bairro é obrigatório', required) },
        Numero: { required: helpers.withMessage('Número da casa é obrigatório', required) },
        cep: {},
        estado: { required: helpers.withMessage('Estado é obrigatório', required) },
        cidade: { required: helpers.withMessage('Cidade é obrigatório', required) }
      }
    };
  },

  methods: {
    async buscarCep() {
      const cep = this.CadLivro.cep.replace(/\D/g, '');
      if (cep.length !== 8) return;
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await res.json();
        if (data.erro) return;
        this.CadLivro.Rua = data.logradouro;
        this.CadLivro.Bairro = data.bairro;
        this.CadLivro.estado = data.uf;
        this.CadLivro.cidade = data.localidade;
        this.estadoPorCep = data.uf;
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
      }
    },

    async salvar() {
      const result = await this.v$.$validate();
      if (!result) return;
      console.log('Dados do formulário', this.CadLivro);
    },

    limparCampos() {
      this.CadLivro = {
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
        cidade: ''
      };
      this.v$.$reset();
    }
  }
});
</script>
