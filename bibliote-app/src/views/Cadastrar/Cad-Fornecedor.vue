<template>
  <div class="grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="salvar">
          <h3 class="card-title">{{ ehEdicao ? 'Atualização de' : 'Cadastro de' }} Fornecedor</h3>

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
              <input class="form-control form-control-lg" type="text" v-model="fornecedor.rua" placeholder="Digite a rua" />
              <div class="text-danger" v-if="v$.fornecedor.rua.$error">
                <small>{{ v$.fornecedor.rua.$errors[0].$message }}</small>
              </div>
            </div>
            <div class="col">
              <label>Bairro</label>
              <input class="form-control form-control-lg" type="text" v-model="fornecedor.bairro"
                placeholder="Digite o bairro" />
              <div class="text-danger" v-if="v$.fornecedor.bairro.$error">
                <small>{{ v$.fornecedor.bairro.$errors[0].$message }}</small>
              </div>
            </div>
            <div class="col">
              <label>Número</label>
              <input class="form-control form-control-lg" type="text" v-model="fornecedor.numero"
                placeholder="Digite o número" />
              <div class="text-danger" v-if="v$.fornecedor.numero.$error">
                <small>{{ v$.fornecedor.numero.$errors[0].$message }}</small>
              </div>
            </div>
          </div>

          <div class="form-group row">
            <div class="col">
              <label>Estado</label>
              <select class="form-control form-control-lg" v-model="fornecedor.estado">
                <option :value="null" disabled>Selecione seu estado...</option>
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
                <option :value="null" disabled>Selecione sua cidade...</option>
                <option v-for="cidade in cidades" :key="cidade">{{ cidade }}</option>
              </select>
              <div class="text-danger" v-if="v$.fornecedor.cidade.$error">
                <small>{{ v$.fornecedor.cidade.$errors[0].$message }}</small>
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
import { api } from '@/common/http';
import { defineComponent } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, helpers, numeric } from '@vuelidate/validators';
import { mask } from 'vue-the-mask';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Toast } from '@/common/toast';

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
        numero: '',
        telefone: '',
        email: '',
        livrosIds: 0,
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
      cidades: [] as string[],
      fornecedores: [] as any[],
      listarLivro: [] as any[],
      dialog: false
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
          required: helpers.withMessage('CNPJ é obrigatório', required),
          minLength: helpers.withMessage('CNPJ deve ter pelo menos 14 dígitos', minLength(14))
        },
        telefone: {
          required: helpers.withMessage('Telefone é obrigatório', required),
          minLength: helpers.withMessage('Telefone deve ter ao menos 10 dígitos', minLength(10))
        },
        rua: { required: helpers.withMessage('Rua é obrigatório', required) },
        bairro: { required: helpers.withMessage('Bairro é obrigatório', required) },
        cep: { required: helpers.withMessage('CEP é obrigatório', required) },
        estado: { required: helpers.withMessage('Estado é obrigatório', required) },
        numero: { required: helpers.withMessage('Número é obrigatório', required) },
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
      const valido = await this.v$.$validate();
      if (!valido) return;

      const confirmado = await Swal.fire({
        title: this.ehEdicao ? 'Confirmar atualização?' : 'Confirmar cadastro?',
        text: this.ehEdicao ? 'Deseja atualizar as informações deste Fornecedor?' : 'Deseja realmente cadastrar este Fornecedor?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#6c757d',
        confirmButtonText: this.ehEdicao ? 'Sim, atualizar!' : 'Sim, cadastrar!',
        cancelButtonText: 'Cancelar'
      });

      if (!confirmado.isConfirmed) return;


      const novoFornecedor = {
        ...this.fornecedor,
        id: this.ehEdicao ? this.id : Math.random().toString(36).substring(2, 8)
      };

      try {
        if (this.ehEdicao) {
          await api.put(`/fornecedores/${this.id}`, novoFornecedor);
          Toast.fire({ icon: 'success', title: 'Fornecedor atualizado com sucesso!' });
        } else {
          await api.post('/fornecedores', novoFornecedor);
          Toast.fire({ icon: 'success', title: 'Fornecedor cadastrados com sucesso!' });
        }

        this.$router.push('/consultar/fornecedor');
      } catch (erro) {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao salvar',
          text: 'Erro inesperado.'
        });
      }
    },

    async carregarFornecedor() {
      try {
        const resposta = await api.get('/fornecedores');
        this.fornecedor = resposta.data;
      } catch (erro) {
        console.error('Erro ao carregar fornecedor:', erro);
      }
    },

    // para edição das coisas
    async carregarDados() {
      try {
        const resposta = await api.get(`/fornecedores/${this.id}`);
        this.fornecedor = {
          nome: resposta.data.nome,
          cnpj: resposta.data.cnpj,
          cep: resposta.data.cep,
          rua: resposta.data.rua,
          bairro: resposta.data.bairro,
          estado: resposta.data.estado,
          cidade: resposta.data.cidade,
          telefone: resposta.data.telefone,
          numero: resposta.data.numero,
          email: resposta.data.email,
          livrosIds: resposta.data.livrosIds
        };
      } catch (erro) {
        Toast.fire({
          icon: 'error',
          title: 'Erro ao carregar o forncedor para edição'
        });
        this.$router.push('/consultar/fornecedor');
      }
    },


    limparCampos() {
      this.fornecedor = {
        nome: '',
        cnpj: '',
        cep: '',
        rua: '',
        bairro: '',
        estado: '',
        cidade: '',
        numero: '',
        telefone: '',
        email: '',
        livrosIds: 0,
      };
      this.v$.$reset();
    }
  },

  async mounted() {
    await this.carregarFornecedor();

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
