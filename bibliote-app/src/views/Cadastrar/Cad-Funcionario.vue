<template>
  <div class="grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="salvar">
          <h3 class="card-title">{{ ehEdicao ? 'Atualização de' : 'Cadastro de' }} Funcionário</h3>

          <div class="form-group row">
            <div class="col">
              <label>Nome</label>
              <input class="form-control form-control-lg" v-model="funcionario.nome" type="text"
                placeholder="Nome completo">
              <div class="text-danger" v-if="v$.funcionario.nome.$error">
                <small>{{ v$.funcionario.nome.$errors[0].$message }}</small>
              </div>
            </div>
            <div class="col">
              <label>CPF</label>
              <input class="form-control form-control-lg" v-mask="'###.###.###-##'" v-model="funcionario.cpf"
                type="text" placeholder="CPF">
              <div class="text-danger" v-if="v$.funcionario.cpf.$error">
                <small>{{ v$.funcionario.cpf.$errors[0].$message }}</small>
              </div>
            </div>
            <div class="col">
              <label>Cargo</label>
              <input class="form-control form-control-lg" v-model="funcionario.cargo" type="text" placeholder="Cargo">
              <div class="text-danger" v-if="v$.funcionario.cargo.$error">
                <small>{{ v$.funcionario.cargo.$errors[0].$message }}</small>
              </div>
            </div>
          </div>

          <div class="form-group row">
            <div class="col">
              <label>Telefone</label>
              <input class="form-control form-control-lg" v-mask="'(##) #####-####'" v-model="funcionario.telefone"
                type="text" placeholder="Telefone">
              <div class="text-danger" v-if="v$.funcionario.telefone.$error">
                <small>{{ v$.funcionario.telefone.$errors[0].$message }}</small>
              </div>
            </div>
            <div class="col">
              <label>Email</label>
              <input class="form-control form-control-lg" v-model="funcionario.email" type="email" placeholder="Email">
              <div class="text-danger" v-if="v$.funcionario.email.$error">
                <small>{{ v$.funcionario.email.$errors[0].$message }}</small>
              </div>
            </div>
            <div class="col">
              <label>Data de Admissão</label>
              <input class="form-control form-control-lg" v-model="funcionario.data_admissao" type="date">
              <div class="text-danger" v-if="v$.funcionario.data_admissao.$error">
                <small>{{ v$.funcionario.data_admissao.$errors[0].$message }}</small>
              </div>
            </div>
          </div>

          <h4 class="card-title">Endereço</h4>
          <div class="form-group row">
            <div class="col">
              <label>CEP</label>
              <input class="form-control form-control-lg" v-model="funcionario.cep" v-mask="'#####-###'"
                @blur="buscarCep" type="text" placeholder="CEP">
              <div class="text-danger" v-if="v$.funcionario.cep.$error">
                <small>{{ v$.funcionario.cep.$errors[0].$message }}</small>
              </div>
            </div>
            <div class="col">
              <label>Rua</label>
              <input class="form-control form-control-lg" v-model="funcionario.rua" type="text" placeholder="Rua">
              <div class="text-danger" v-if="v$.funcionario.rua.$error">
                <small>{{ v$.funcionario.rua.$errors[0].$message }}</small>
              </div>
            </div>
            <div class="col">
              <label>Bairro</label>
              <input class="form-control form-control-lg" v-model="funcionario.bairro" type="text" placeholder="Bairro">
              <div class="text-danger" v-if="v$.funcionario.bairro.$error">
                <small>{{ v$.funcionario.bairro.$errors[0].$message }}</small>
              </div>
            </div>
            <div class="text-danger" v-if="v$.funcionario.bairro.$error">
              <small>{{ v$.funcionario.bairro.$errors[0].$message }}</small>
            </div>
            <div class="col">
              <label>Número</label>
              <input class="form-control form-control-lg" v-model="funcionario.numero" type="text" placeholder="Número">
            </div>
          </div>

          <div class="form-group row">
            <div class="col">
              <label>Estado</label>
              <select class="form-control form-control-lg" v-model="funcionario.estado">
                <option :value="null" disabled>Selecione...</option>
                <option v-for="estado in estados" :key="estado.uf" :value="estado.uf">
                  {{ estado.nome }}
                </option>
              </select>
              <div class="text-danger" v-if="v$.funcionario.estado.$error">
                <small>{{ v$.funcionario.estado.$errors[0].$message }}</small>
              </div>
            </div>

            <div class="col">
              <label>Cidade</label>
              <select class="form-control form-control-lg" v-model="funcionario.cidade">
                <option :value="null" disabled>Selecione...</option>
                <option v-for="cidade in cidades" :key="cidade">{{ cidade }}</option>
              </select>
              <div class="text-danger" v-if="v$.funcionario.cidade.$error">
                <small>{{ v$.funcionario.cidade.$errors[0].$message }}</small>
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
import { defineComponent } from 'vue';
import { mask } from 'vue-the-mask';
import { required, minLength, helpers, email } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Toast } from '@/common/toast';

export default defineComponent({
  name: 'CadastroFuncionario',

  setup() {
    return { v$: useVuelidate() };
  },

  data() {
    return {
      funcionario: {
        id: '',
        nome: '',
        cpf: '',
        cargo: '',
        telefone: '',
        email: '',
        data_admissao: '',
        cep: '',
        rua: '',
        bairro: '',
        numero: '',
        estado: null,
        cidade: null
      },
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
      cidades: [] as string[],
      funcionarios: [] as any[],
      dialog: false
    };
  }
  ,

  watch: {
    'funcionario.estado'(uf: string) {
      if (!uf) return;
      fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)
        .then(res => res.json())
        .then(data => {
          this.cidades = data.map((cidade: any) => cidade.nome);
        });
    }
  },

  validations() {
    return {
      funcionario: {
        nome: {
          minLength: helpers.withMessage('O nome deve ter no mínimo 8 carácteres!', minLength(8)),
          required: helpers.withMessage('Nome é obrigatorio!', required)
        },
        email: {
          email: helpers.withMessage('Este e-mail não é considerado valido!', email),
          required: helpers.withMessage('E-mail é obrigatorio', required)
        },
        cargo: {
          required: helpers.withMessage('Cargo é obrigatorio', required)
        },
        cpf: {
          required: helpers.withMessage('CPF é obrigatório', required),
          minLength: helpers.withMessage('CPF deve ter pelo menos 11 dígitos', minLength(11))
        },
        telefone: {
          required: helpers.withMessage('Telefone é obrigatório', required),
          minLength: helpers.withMessage('Telefone deve ter ao menos 10 dígitos', minLength(10))
        },
        data_admissao: {
          required: helpers.withMessage('Data de admissão é obrigatória', required)
        },
        rua: { required: helpers.withMessage('Rua é obrigatório', required) },
        bairro: { required: helpers.withMessage('Bairro é obrigatório', required) },
        cep: { required: helpers.withMessage('CEP é obrigatório', required) },
        numero: { required: helpers.withMessage('Número da casa é obrigatório', required) },
        estado: { required: helpers.withMessage('Estado é obrigatório', required) },
        cidade: { required: helpers.withMessage('Cidade é obrigatório', required) },
      }
    };
  },

  methods: {
    async buscarCep() {
      const cep = this.funcionario.cep.replace(/\D/g, '');
      if (cep.length !== 8) return;
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await res.json();
        if (data.erro) return;
        this.funcionario.rua = data.logradouro;
        this.funcionario.bairro = data.bairro;
        this.funcionario.estado = data.uf;
        this.funcionario.cidade = data.localidade;
      } catch (err) {
        console.error('Erro ao buscar CEP', err);
      }
    },

    async salvar() {
      const valido = await this.v$.$validate();
      if (!valido) return;

      const confirmado = await Swal.fire({
        title: this.ehEdicao ? 'Confirmar atualização?' : 'Confirmar cadastro?',
        text: this.ehEdicao ? 'Deseja atualizar as informações deste Funcionário?' : 'Deseja realmente cadastrar este Funcionário?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#6c757d',
        confirmButtonText: this.ehEdicao ? 'Sim, atualizar!' : 'Sim, cadastrar!',
        cancelButtonText: 'Cancelar'
      });

      if (!confirmado.isConfirmed) return;


      const novoFuncionario = {
        ...this.funcionario,
        id: this.ehEdicao ? this.id : Math.random().toString(36).substring(2, 8)
      };

      try {
        if (this.ehEdicao) {
          await axios.put(`http://localhost:3000/funcionarios/${this.id}`, novoFuncionario);
          Toast.fire({ icon: 'success', title: 'Funcionário atualizado com sucesso!' });
        } else {
          await axios.post('http://localhost:3000/funcionarios', novoFuncionario);
          Toast.fire({ icon: 'success', title: 'Funcionário cadastrados com sucesso!' });
        }

        this.$router.push('/consultar/funcionario');
      } catch (erro) {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao salvar',
          text: 'Erro inesperado.'
        });
      }
    },

    async carregarFuncionario() {
      try {
        const resposta = await axios.get('http://localhost:3000/funcionarios');
        this.funcionarios = resposta.data;
      } catch (erro) {
        console.error('Erro ao carregar funcionarios:', erro);
      }
    },

    // para edição das coisas
    async carregarDados() {
      try {
        const resposta = await axios.get(`http://localhost:3000/funcionarios/${this.id}`);
        this.funcionario = {
          id: resposta.data.id,
          nome: resposta.data.nome,
          cpf: resposta.data.cpf,
          cargo: resposta.data.cargo,
          telefone: resposta.data.telefone,
          email: resposta.data.email,
          data_admissao: resposta.data.data_admissao,
          cep: resposta.data.cep,
          rua: resposta.data.rua,
          bairro: resposta.data.bairro,
          numero: resposta.data.numero,
          estado: resposta.data.estado,
          cidade: resposta.data.cidade
        };
      } catch (erro) {
        Toast.fire({
          icon: 'error',
          title: 'Erro ao carregar o funcionário para edição'
        });
        this.$router.push('/consultar/funcionario');
      }
    },

    limparCampos() {
      this.funcionario = {
        id: '',
        nome: '',
        cpf: '',
        cargo: '',
        telefone: '',
        email: '',
        data_admissao: '',
        cep: '',
        rua: '',
        bairro: '',
        numero: '',
        estado: null,
        cidade: null
      };
      this.v$.$reset();
    }
  },

  async mounted() {
    await this.carregarFuncionario();

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
