<template>
  <div class="grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="salvar">
          <h3 class="card-title">{{ ehEdicao ? 'Atualização de' : 'Cadastro de' }} Leitor</h3>

          <div class="form-group row">
            <div class="col">
              <label>Nome Completo</label>
              <input class="form-control form-control-lg" type="text" placeholder="Digite o nome completo"
                v-model="CadLeitores.nome" />
              <div class="text-danger" v-if="v$.CadLeitores.nome.$errors.length && v$.CadLeitores.nome.$dirty">
                <p v-for="error of v$.CadLeitores.nome.$errors" :key="error.$uid">
                  <small>{{ error.$message }}</small>
                </p>
              </div>
            </div>
            <div class="col">
              <label>E-mail</label>
              <input class="form-control form-control-lg" type="text" placeholder="Digite o e-mail"
                v-model="CadLeitores.email" />
              <div class="text-danger" v-if="v$.CadLeitores.email.$errors.length && v$.CadLeitores.email.$dirty">
                <p v-for="error of v$.CadLeitores.email.$errors" :key="error.$uid">
                  <small>{{ error.$message }}</small>
                </p>
              </div>
            </div>
          </div>

          <div class="form-group row">
            <div class="col">
              <label>CPF</label>
              <input class="form-control form-control-lg" type="text" v-model="CadLeitores.cpf"
                v-mask="'###.###.###-##'" placeholder="Digite o CPF" />
              <div class="text-danger" v-if="v$.CadLeitores.cpf.$errors.length && v$.CadLeitores.cpf.$dirty">
                <p v-for="error of v$.CadLeitores.cpf.$errors" :key="error.$uid">
                  <small>{{ error.$message }}</small>
                </p>
              </div>
            </div>
            <div class="col">
              <label>Telefone</label>
              <input class="form-control form-control-lg" type="text" v-mask="'(##) #####-####'"
                placeholder="Digite o Telefone" v-model="CadLeitores.telefone" />
              <div class="text-danger" v-if="v$.CadLeitores.telefone.$errors.length && v$.CadLeitores.telefone.$dirty">
                <p v-for="error of v$.CadLeitores.telefone.$errors" :key="error.$uid">
                  <small>{{ error.$message }}</small>
                </p>
              </div>
            </div>
            <div class="col">
              <label>Data de Nascimento</label>
              <input class="form-control form-control-lg" type="date" v-model="CadLeitores.dataNasc" />
              <div class="text-danger" v-if="v$.CadLeitores.dataNasc.$errors.length && v$.CadLeitores.dataNasc.$dirty">
                <p v-for="error of v$.CadLeitores.dataNasc.$errors" :key="error.$uid">
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
                v-model="CadLeitores.cep" @blur="buscarCep" />
              <div class="text-danger" v-if="v$.CadLeitores.cep.$errors.length && v$.CadLeitores.cep.$dirty">
                <p v-for="error of v$.CadLeitores.cep.$errors" :key="error.$uid">
                  <small>{{ error.$message }}</small>
                </p>
              </div>
            </div>
            <div class="col">
              <label>Rua</label>
              <input class="form-control form-control-lg" type="text" placeholder="Nome da rua"
                v-model="CadLeitores.Rua" />
              <div class="text-danger" v-if="v$.CadLeitores.Rua.$errors.length && v$.CadLeitores.Rua.$dirty">
                <p v-for="error of v$.CadLeitores.Rua.$errors" :key="error.$uid">
                  <small>{{ error.$message }}</small>
                </p>
              </div>
            </div>
            <div class="col">
              <label>Bairro</label>
              <input class="form-control form-control-lg" type="text" placeholder="Digite o bairro"
                v-model="CadLeitores.Bairro" />
              <div class="text-danger" v-if="v$.CadLeitores.Bairro.$errors.length && v$.CadLeitores.Bairro.$dirty">
                <p v-for="error of v$.CadLeitores.Bairro.$errors" :key="error.$uid">
                  <small>{{ error.$message }}</small>
                </p>
              </div>
            </div>
            <div class="col">
              <label>Número</label>
              <input class="form-control form-control-lg" type="text" placeholder="Número da casa"
                v-model="CadLeitores.Numero" />
              <div class="text-danger" v-if="v$.CadLeitores.Numero.$errors.length && v$.CadLeitores.Numero.$dirty">
                <p v-for="error of v$.CadLeitores.Numero.$errors" :key="error.$uid">
                  <small>{{ error.$message }}</small>
                </p>
              </div>
            </div>
          </div>

          <div class="form-group row">
            <div class="col">
              <label>Estado</label>
              <select class="form-control form-control-lg" v-model="CadLeitores.estado">
                <option value="" disabled selected>Selecione seu estado...</option>
                <option v-for="estado in estados" :key="estado.uf" :value="estado.uf">
                  {{ estado.nome }}
                </option>
              </select>
              <div class="text-danger" v-if="v$.CadLeitores.estado.$errors.length && v$.CadLeitores.estado.$dirty">
                <p v-for="error of v$.CadLeitores.estado.$errors" :key="error.$uid">
                  <small>{{ error.$message }}</small>
                </p>
              </div>
            </div>
            <div class="col">
              <label>Cidade</label>
              <select class="form-control form-control-lg" v-model="CadLeitores.cidade">
                <option value="" disabled selected>Selecione sua cidade...</option>
                <option v-for="cidade in cidades" :key="cidade" :value="cidade">{{ cidade }}</option>
              </select>
              <div class="text-danger" v-if="v$.CadLeitores.cidade.$errors.length && v$.CadLeitores.nome.$dirty">
                <p v-for="error of v$.CadLeitores.cidade.$errors" :key="error.$uid">
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
import axios from 'axios';
import Swal from 'sweetalert2';
import { Toast } from '@/common/toast';

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
      CadLeitores: {
        id: '',
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
  'CadLeitores.estado'(uf: string) {
    if (!uf) return;

    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)
      .then(res => res.json())
      .then(data => {
        this.cidades = data.map((cidade: any) => cidade.nome);

        // Se a cidade atual não está na nova lista, zera
        if (!this.cidades.includes(this.CadLeitores.cidade)) {
          this.CadLeitores.cidade = '';
        }
      })
      .catch(erro => {
        console.error('Erro ao buscar cidades:', erro);
      });
  }
}
,

  

  validations() {
    return {
      CadLeitores: {
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
      const cep = this.CadLeitores.cep.replace(/\D/g, '');
      if (cep.length !== 8) return;
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await res.json();
        if (data.erro) return;
        this.CadLeitores.Rua = data.logradouro;
        this.CadLeitores.Bairro = data.bairro;
        this.CadLeitores.estado = data.uf;
        this.CadLeitores.cidade = data.localidade;
        this.estadoPorCep = data.uf;
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
      }
    },

    async salvar() {
      const valido = await this.v$.$validate();
      if (!valido) return;

      const confirmado = await Swal.fire({
        title: this.ehEdicao ? 'Confirmar atualização?' : 'Confirmar cadastro?',
        text: this.ehEdicao ? 'Deseja atualizar as informações deste leitor?' : 'Deseja realmente cadastrar este leitor?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#6c757d',
        confirmButtonText: this.ehEdicao ? 'Sim, atualizar!' : 'Sim, cadastrar!',
        cancelButtonText: 'Cancelar'
      });

      if (!confirmado.isConfirmed) return;


      const novoLeitor = {
        ...this.CadLeitores,
        id: this.ehEdicao ? this.id : Math.random().toString(36).substring(2, 8)
      };

      try {
        if (this.ehEdicao) {
          await axios.put(`http://localhost:3000/leitores/${this.id}`, novoLeitor);
          Toast.fire({ icon: 'success', title: 'Leitor atualizadp com sucesso!' });
        } else {
          await axios.post('http://localhost:3000/leitores', novoLeitor);
          Toast.fire({ icon: 'success', title: 'Leitor cadastrado com sucesso!' });
        }

        this.$router.push('/consultar/leitor');
      } catch (erro) {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao salvar',
          text: 'Erro inesperado.'
        });
      }
    },

    async carregarDados() {
      try {
        const resposta = await axios.get(`http://localhost:3000/leitores/${this.id}`);
        this.CadLeitores = {
          id: resposta.data.id,
          nome: resposta.data.nome,
          email: resposta.data.email,
          cpf: resposta.data.cpf,
          telefone: resposta.data.telefone,
          dataNasc: resposta.data.dataNasc,
          Rua: resposta.data.Rua,
          Bairro: resposta.data.Bairro,
          Numero: resposta.data.Numero,
          cep: resposta.data.cep,
          estado: resposta.data.estado,
          cidade: resposta.data.cidade,
        };
      } catch (erro) {
        Toast.fire({
          icon: 'error',
          title: 'Erro ao carregar a categoria para edição'
        });
        this.$router.push('/consultar/leitor');
      }
    },

    async carregarLeitor() {
      try {
        const resposta = await axios.get('http://localhost:3000/leitores');
        this.CadLeitores = resposta.data;
      } catch (erro) {
        console.error('Erro ao carregar leitores:', erro);
      }
    },

    limparCampos() {
      this.CadLeitores = {
        id: '',
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
  },

  async mounted() {
    await this.carregarLeitor();

    if (this.ehEdicao) {
      await this.carregarDados();
    }
  },

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
