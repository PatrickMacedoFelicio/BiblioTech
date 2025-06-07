<template>
  <div class="grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="salvar">
          <h3 class="card-title">Cadastro de Fornecedor</h3>

          <div class="form-group row">
            <div class="col">
              <label>Nome</label>
              <input class="form-control form-control-lg" type="text" placeholder="Digite o nome"
                v-model="fornecedor.nome">
              <div class="text-danger" v-if="v$.fornecedor.nome.$error">
                <small>{{ v$.fornecedor.nome.$errors[0].$message }}</small>
              </div>
            </div>
            <div class="col">
              <label>Email</label>
              <input class="form-control form-control-lg" type="email" placeholder="Digite o email"
                v-model="fornecedor.email" />
              <div class="text-danger" v-if="v$.fornecedor.email.$error">
                <small>{{ v$.fornecedor.email.$errors[0].$message }}</small>
              </div>
            </div>
          </div>

          <div class="form-group row">
            <div class="col">
              <label>CNPJ</label>
              <input class="form-control form-control-lg" type="text" placeholder="Digite o CNPJ"
                v-mask="'##.###.###/####-##'" v-model="fornecedor.cnpj">
              <div class="text-danger" v-if="v$.fornecedor.cnpj.$error">
                <small>{{ v$.fornecedor.cnpj.$errors[0].$message }}</small>
              </div>
            </div>

            <div class="col">
              <label>Telefone</label>
              <input class="form-control form-control-lg" type="text" placeholder="Digite o telefone"
                v-mask="'(##) #####-####'" v-model="fornecedor.telefone" />
              <div class="text-danger" v-if="v$.fornecedor.telefone.$error">
                <small>{{ v$.fornecedor.telefone.$errors[0].$message }}</small>
              </div>
            </div>
          </div>

          <h4 class="card-title">Endereço</h4>
          <div class="form-group row">
            <div class="col">
              <label>CEP</label>
              <input class="form-control form-control-lg" type="text" placeholder="Digite o CEP" v-mask="'#####-###'"
                v-model="fornecedor.cep" @blur="buscarCep">
              <div class="text-danger" v-if="v$.fornecedor.cep.$error">
                <small>{{ v$.fornecedor.cep.$errors[0].$message }}</small>
              </div>
            </div>
            <div class="col">
              <label>Rua</label>
              <input class="form-control form-control-lg" type="text" v-model="fornecedor.rua" placeholder="Rua" />
              <div class="text-danger" v-if="v$.fornecedor.rua.$error">
                <small>{{ v$.fornecedor.rua.$errors[0].$message }}</small>
              </div>
            </div>
            <div class="col">
              <label>Bairro</label>
              <input class="form-control form-control-lg" type="text" v-model="fornecedor.bairro"
                placeholder="Bairro" />
              <div class="text-danger" v-if="v$.fornecedor.bairro.$error">
                <small>{{ v$.fornecedor.bairro.$errors[0].$message }}</small>
              </div>
            </div>

          </div>


          <div class="form-group row">
            <div class="col">
              <label>Estado</label>
              <select class="form-control form-control-lg" v-model="fornecedor.estado">
                <option value="" disabled>Selecione seu estado...</option>
                <option v-for="estado in estados" :key="estado.uf" :value="estado.uf">
                  {{ estado.nome }}
                </option>
              </select>
              <div class="text-danger" v-if="v$.fornecedor.estado.$error">
                <small>{{ v$.fornecedor.estado.$errors[0].$message }}</small>
              </div>
            </div>
            <div class="col">
              <label>Cidade</label>
              <select class="form-control form-control-lg" v-model="fornecedor.cidade">
                <option value="" disabled>Selecione sua cidade...</option>
                <option v-for="cidade in cidades" :key="cidade">{{ cidade }}</option>
              </select>
              <div class="text-danger" v-if="v$.fornecedor.cidade.$error">
                <small>{{ v$.fornecedor.cidade.$errors[0].$message }}</small>
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
import { defineComponent } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, helpers } from '@vuelidate/validators';
import { mask } from 'vue-the-mask';

export default defineComponent({
  name: 'CadastroFornecedor',

  setup() {
    return { v$: useVuelidate() };
  },

  data() {
    return {
      fornecedor: {
        nome: '',
        cnpj: '',
        cep: '',
        rua: '',
        bairro: '',
        estado: '',
        cidade: '',
        telefone: '',
        email: '',
      },
      estados: [
        { uf: 'AC', nome: 'Acre' },
        { uf: 'AL', nome: 'Alagoas' },
        { uf: 'AP', nome: 'Amapá' },
        { uf: 'AM', nome: 'Amazonas' },
        { uf: 'BA', nome: 'Bahia' },
        { uf: 'CE', nome: 'Ceará' },
        { uf: 'DF', nome: 'Distrito Federal' },
        { uf: 'ES', nome: 'Espírito Santo' },
        { uf: 'GO', nome: 'Goiás' },
        { uf: 'MA', nome: 'Maranhão' },
        { uf: 'MT', nome: 'Mato Grosso' },
        { uf: 'MS', nome: 'Mato Grosso do Sul' },
        { uf: 'MG', nome: 'Minas Gerais' },
        { uf: 'PA', nome: 'Pará' },
        { uf: 'PB', nome: 'Paraíba' },
        { uf: 'PR', nome: 'Paraná' },
        { uf: 'PE', nome: 'Pernambuco' },
        { uf: 'PI', nome: 'Piauí' },
        { uf: 'RJ', nome: 'Rio de Janeiro' },
        { uf: 'RN', nome: 'Rio Grande do Norte' },
        { uf: 'RS', nome: 'Rio Grande do Sul' },
        { uf: 'RO', nome: 'Rondônia' },
        { uf: 'RR', nome: 'Roraima' },
        { uf: 'SC', nome: 'Santa Catarina' },
        { uf: 'SP', nome: 'São Paulo' },
        { uf: 'SE', nome: 'Sergipe' },
        { uf: 'TO', nome: 'Tocantins' },
      ],
      cidades: [] as string[]
    };
  },

  watch: {
    'fornecedor.estado'(uf: string) {
      if (!uf) return;
      fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)
        .then(res => res.json())
        .then(data => {
          this.cidades = data.map((c: any) => c.nome);
          if (!this.cidades.includes(this.fornecedor.cidade)) {
            this.fornecedor.cidade = '';
          }
        })
        .catch(console.error);
    }
  },

  validations() {
    return {
      fornecedor: {
        nome: {
          minLength: helpers.withMessage('O nome deve ter no mínimo 8 carácteres!', minLength(8)),
          required: helpers.withMessage('Nome é obrigatorio!', required)
        },
        email: {
          email: helpers.withMessage('Este e-mail não é considerado valido!', email),
          required: helpers.withMessage('E-mail é obrigatorio', required)
        },
        cnpj: {
          required: helpers.withMessage('CPF é obrigatório', required),
          minLength: helpers.withMessage('CPF deve ter pelo menos 11 dígitos', minLength(14))
        },
        telefone: {
          required: helpers.withMessage('Telefone é obrigatório', required),
          minLength: helpers.withMessage('Telefone deve ter ao menos 10 dígitos', minLength(10))
        },
        rua: { required: helpers.withMessage('Rua é obrigatório', required) },
        bairro: { required: helpers.withMessage('Bairro é obrigatório', required) },
        cep: { required: helpers.withMessage('CEP é obrigatório', required) },
        estado: { required: helpers.withMessage('Estado é obrigatório', required) },
        cidade: { required: helpers.withMessage('Cidade é obrigatório', required) },
      }
    };
  },

  methods: {
    async buscarCep() {
      const cep = this.fornecedor.cep.replace(/\D/g, '');
      if (cep.length !== 8) return;

      try {
        const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await res.json();
        if (data.erro) return;

        this.fornecedor.rua = data.logradouro;
        this.fornecedor.bairro = data.bairro;
        this.fornecedor.cidade = data.localidade;
        this.fornecedor.estado = data.uf;
      } catch (e) {
        console.error('Erro ao buscar CEP:', e);
      }
    },

    async salvar() {
      const valid = await this.v$.$validate();
      if (!valid) return;

      console.log('Fornecedor cadastrado:', this.fornecedor);
    }
  }
});
</script>
