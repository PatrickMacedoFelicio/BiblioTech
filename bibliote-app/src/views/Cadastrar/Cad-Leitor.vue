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
                v-model="CadCliente.nome" />
              <div class="text-danger" v-if="v$.CadCliente.nome.$errors.length && v$.CadCliente.nome.$dirty">
                <p v-for="error of v$.CadCliente.nome.$errors" :key="error.$uid">
                  <small>{{ error.$message }}</small>
                </p>
              </div>
            </div>
            <div class="col">
              <label>E-mail</label>
              <input class="form-control form-control-lg" type="text" placeholder="Digite o e-mail"
                v-model="CadCliente.email" />
              <div class="text-danger" v-if="v$.CadCliente.email.$errors.length && v$.CadCliente.email.$dirty">
                <p v-for="error of v$.CadCliente.email.$errors" :key="error.$uid">
                  <small>{{ error.$message }}</small>
                </p>
              </div>
            </div>
          </div>

          <div class="form-group row">
            <div class="col">
              <label>CPF</label>
              <input class="form-control form-control-lg" type="text" v-model="CadCliente.cpf" v-mask="'###.###.###-##'"
                placeholder="Digite o CPF" />
              <div class="text-danger" v-if="v$.CadCliente.cpf.$errors.length && v$.CadCliente.cpf.$dirty">
                <p v-for="error of v$.CadCliente.cpf.$errors" :key="error.$uid">
                  <small>{{ error.$message }}</small>
                </p>
              </div>
            </div>
            <div class="col">
              <label>Telefone</label>
              <input class="form-control form-control-lg" type="text" v-mask="'(##) #####-####'"
                placeholder="Digite o Telefone" v-model="CadCliente.telefone" />
              <div class="text-danger" v-if="v$.CadCliente.telefone.$errors.length && v$.CadCliente.telefone.$dirty">
                <p v-for="error of v$.CadCliente.telefone.$errors" :key="error.$uid">
                  <small>{{ error.$message }}</small>
                </p>
              </div>
            </div>
            <div class="col">
              <label>Data de Nascimento</label>
              <input class="form-control form-control-lg" type="date" v-model="CadCliente.dataNascimento" />
              <div class="text-danger"
                v-if="v$.CadCliente.dataNascimento.$errors.length && v$.CadCliente.dataNascimento.$dirty">
                <p v-for="error of v$.CadCliente.dataNascimento.$errors" :key="error.$uid">
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
                v-model="CadCliente.cep" @blur="buscarCep" />
            </div>
            <div class="col">
              <label>Rua</label>
              <input class="form-control form-control-lg" type="text" placeholder="Nome da rua"
                v-model="CadCliente.rua" />
              <div class="text-danger" v-if="v$.CadCliente.rua.$errors.length && v$.CadCliente.rua.$dirty">
                <p v-for="error of v$.CadCliente.rua.$errors" :key="error.$uid">
                  <small>{{ error.$message }}</small>
                </p>
              </div>
            </div>
            <div class="col">
              <label>Bairro</label>
              <input class="form-control form-control-lg" type="text" placeholder="Digite o bairro"
                v-model="CadCliente.bairro" />
              <div class="text-danger" v-if="v$.CadCliente.bairro.$errors.length && v$.CadCliente.bairro.$dirty">
                <p v-for="error of v$.CadCliente.bairro.$errors" :key="error.$uid">
                  <small>{{ error.$message }}</small>
                </p>
              </div>
            </div>
            <div class="col">
              <label>Número</label>
              <input class="form-control form-control-lg" type="text" placeholder="Número da casa"
                v-model="CadCliente.numero" />
              <div class="text-danger" v-if="v$.CadCliente.numero.$errors.length && v$.CadCliente.numero.$dirty">
                <p v-for="error of v$.CadCliente.numero.$errors" :key="error.$uid">
                  <small>{{ error.$message }}</small>
                </p>
              </div>
            </div>
          </div>

          <div class="form-group row">
            <div class="col">
              <label>Estado</label>
              <select class="form-control form-control-lg" v-model="CadCliente.estado">
                <option value="" disabled selected>Selecione seu estado...</option>
                <option v-for="estado in Estados" :key="estado.uf" :value="estado.uf">
                  {{ estado.nome }}
                </option>
              </select>
              <div class="text-danger" v-if="v$.CadCliente.estado.$errors.length && v$.CadCliente.estado.$dirty">
                <p v-for="error of v$.CadCliente.estado.$errors" :key="error.$uid">
                  <small>{{ error.$message }}</small>
                </p>
              </div>
            </div>
            <div class="col">
              <label>Cidade</label>
              <select class="form-control form-control-lg" v-model="CadCliente.cidade">
                <option value="" disabled selected>Selecione sua cidade...</option>
                <option v-for="cidade in Cidades" :key="cidade" :value="cidade">{{ cidade }}</option>
              </select>
              <div class="text-danger" v-if="v$.CadCliente.cidade.$errors.length && v$.CadCliente.cidade.$dirty">
                <p v-for="error of v$.CadCliente.cidade.$errors" :key="error.$uid">
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
import { mask } from 'vue-the-mask';
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
      CadCliente: {
        nome: '',
        email: '',
        cpf: '',
        telefone: '',
        dataNascimento: '',
        rua: '',
        bairro: '',
        numero: '',
        cep: '',
        estado: '',
        cidade: ''
      },
      Cidades: [] as string[],
      Estados: [
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
    'CadCliente.estado'(uf: string) {
      if (!uf) return;
      fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)
        .then(res => res.json())
        .then(data => {
          this.Cidades = data.map((cidade: any) => cidade.nome);
          if (!this.Cidades.includes(this.CadCliente.cidade)) {
            this.CadCliente.cidade = '';
          }
        })
        .catch(err => console.error('Erro ao buscar cidades:', err));
    }
  },

  validations() {
    return {
      CadCliente: {
        nome: { minLength: helpers.withMessage('O nome deve ter no mínimo 8 caracteres!', minLength(8)), required: helpers.withMessage('Nome é obrigatório!', required) },
        email: { email: helpers.withMessage('E-mail inválido!', email), required: helpers.withMessage('E-mail é obrigatório', required) },
        cpf: { required: helpers.withMessage('CPF é obrigatório', required) },
        telefone: { required: helpers.withMessage('Telefone é obrigatório', required), minLength: helpers.withMessage('Telefone deve ter ao menos 10 dígitos', minLength(10)) },
        dataNascimento: { required: helpers.withMessage('Data de nascimento é obrigatória', required), dataFuturo },
        rua: { required: helpers.withMessage('Rua é obrigatória', required) },
        bairro: { required: helpers.withMessage('Bairro é obrigatório', required) },
        numero: { required: helpers.withMessage('Número é obrigatório', required) },
        cep: {},
        estado: { required: helpers.withMessage('Estado é obrigatório', required) },
        cidade: { required: helpers.withMessage('Cidade é obrigatória', required) }
      }
    };
  },

  methods: {
    async buscarCep() {
      const cep = this.CadCliente.cep.replace(/\D/g, '');
      if (cep.length !== 8) return;
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await res.json();
        if (data.erro) return;
        this.CadCliente.rua = data.logradouro;
        this.CadCliente.bairro = data.bairro;
        this.CadCliente.estado = data.uf;
        this.CadCliente.cidade = data.localidade;
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
        ...this.CadCliente,
        dataNascimento: new Date(this.CadCliente.dataNascimento).toISOString()
      };

      try {
        if (this.ehEdicao) {
          await api.put(`/clientes/${this.id}`, novoLeitor);
          Toast.fire({ icon: 'success', title: 'Leitor atualizado com sucesso!' });
        } else {
          await api.post(`/clientes`, novoLeitor);
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
        const resposta = await api.get(`/clientes/${this.id}`);
        this.CadCliente = resposta.data;
      } catch (erro) {
        Toast.fire({
          icon: 'error',
          title: 'Erro ao carregar leitor para edição'
        });
        this.$router.push('/consultar/leitor');
      }
    },

    async carregarLeitor() {
      try {
        const resposta = await api.get('/clientes');
        this.CadCliente = resposta.data;
      } catch (erro) {
        console.error('Erro ao carregar leitores:', erro);
      }
    },

    limparCampos() {
      this.CadCliente = {
        nome: '',
        email: '',
        cpf: '',
        telefone: '',
        dataNascimento: '',
        rua: '',
        bairro: '',
        numero: '',
        cep: '',
        estado: '',
        cidade: ''
      };
      this.v$.$reset();
    }
  },

  async mounted() {
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
