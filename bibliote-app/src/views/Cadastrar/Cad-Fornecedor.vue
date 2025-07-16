<template>
  <div class="grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="salvar">
          <h3 class="card-title">{{ ehEdicao ? 'Atualização de' : 'Cadastro de' }} Fornecedor</h3>

          <!-- Indicador de etapas -->
          <div class="mb-4">
            <ul class="nav nav-pills justify-content-center">
              <li class="nav-item">
                <span class="nav-link" :class="{ active: etapaAtual === 1 }">
                  1. Dados Gerais
                </span>
              </li>
              <li class="nav-item">
                <span class="nav-link" :class="{ active: etapaAtual === 2 }">
                  2. Livros Associados
                </span>
              </li>
            </ul>
          </div>

          <div v-if="etapaAtual === 1">
            <div class="form-group row">
              <div class="col">
                <label>Nome</label>
                <input class="form-control form-control-lg" type="text" placeholder="Digite o nome"
                  v-model="fornecedor.nome">
              </div>
              <div class="col">
                <label>Email</label>
                <input class="form-control form-control-lg" type="email" placeholder="Digite o email"
                  v-model="fornecedor.email" />
              </div>
            </div>

            <div class="form-group row">
              <div class="col">
                <label>CNPJ</label>
                <input class="form-control form-control-lg" type="text" placeholder="Digite o CNPJ"
                  v-mask="'##.###.###/####-##'" v-model="fornecedor.cnpj">
              </div>
              <div class="col">
                <label>Telefone</label>
                <input class="form-control form-control-lg" type="text" placeholder="Digite o telefone"
                  v-mask="'(##) #####-####'" v-model="fornecedor.telefone" />
              </div>
            </div>

            <h4 class="card-title mt-4">Endereço</h4>
            <div class="form-group row">
              <div class="col">
                <label>CEP</label>
                <input class="form-control form-control-lg" type="text" placeholder="Digite o CEP" v-mask="'#####-###'"
                  v-model="fornecedor.cep">
              </div>
              <div class="col">
                <label>Rua</label>
                <input class="form-control form-control-lg" type="text" v-model="fornecedor.rua"
                  placeholder="Digite a rua" />
              </div>
              <div class="col">
                <label>Bairro</label>
                <input class="form-control form-control-lg" type="text" v-model="fornecedor.bairro"
                  placeholder="Digite o bairro" />
              </div>
              <div class="col">
                <label>Número</label>
                <input class="form-control form-control-lg" type="text" v-model="fornecedor.numero"
                  placeholder="Digite o número" />
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
              </div>
              <div class="col">
                <label>Cidade</label>
                <select class="form-control form-control-lg" v-model="fornecedor.cidade">
                  <option :value="null" disabled>Selecione sua cidade...</option>
                  <option v-for="cidade in cidades" :key="cidade">{{ cidade }}</option>
                </select>
              </div>
            </div>
          </div>

          <div v-if="etapaAtual === 2">
            <h4 class="card-title">Livros Associados</h4>

            <div v-for="(livroId, index) in fornecedor.livrosIds" :key="index"
              class="form-group row align-items-center mb-2">
              <div class="col-10">
                <label v-if="index === 0">Selecionar Livros</label>
                <select class="form-control" v-model="fornecedor.livrosIds[index]">
                  <option :value="null" disabled>Selecione um livro...</option>
                  <option v-for="livro in todosLivros" :key="livro.id" :value="livro.id">
                    {{ livro.titulo }} (ID: {{ livro.id }})
                  </option>
                </select>
              </div>
              <div class="col-2 d-flex align-items-end">
                <button type="button" class="btn btn-danger btn-sm" @click="removerLivroCampo(index)">
                  X
                </button>
              </div>
            </div>

            <div class="form-group">
              <button type="button" class="btn btn-primary btn-sm" @click="adicionarLivroCampo">
                + Adicionar Livro
              </button>
            </div>
          </div>

          <!-- Controles de navegação entre etapas -->
          <div class="form-group row mt-4">
            <div class="col-auto" v-if="etapaAtual > 1">
              <button type="button" class="btn btn-outline-secondary btn-lg" @click="etapaAtual--">
                Voltar
              </button>
            </div>

            <div class="col-auto" v-if="etapaAtual < totalEtapas">
              <button type="button" class="btn btn-outline-primary btn-lg" @click="etapaAtual++">
                Avançar
              </button>
            </div>

            <div class="col-auto" v-if="etapaAtual === totalEtapas">
              <button type="submit" class="btn btn-success btn-lg">Salvar</button>
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
import { required, email, minLength, helpers } from '@vuelidate/validators';
import Swal from 'sweetalert2';
import { Toast } from '@/common/toast';

interface Livro {
  id: number;
  titulo: string;
}

export default defineComponent({
  name: 'CadastroFornecedor',

  setup() {
    return { v$: useVuelidate() };
  },

  data() {
    return {
      etapaAtual: 1,
      totalEtapas: 2,
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
        livrosIds: [null],
      },
      estados: [
        { uf: 'AC', nome: 'Acre' }, { uf: 'AL', nome: 'Alagoas' }, { uf: 'AP', nome: 'Amapá' },
        { uf: 'AM', nome: 'Amazonas' }, { uf: 'BA', nome: 'Bahia' }, { uf: 'CE', nome: 'Ceará' },
        { uf: 'DF', nome: 'Distrito Federal' }, { uf: 'ES', nome: 'Espírito Santo' },
        { uf: 'GO', nome: 'Goiás' }, { uf: 'MA', nome: 'Maranhão' }, { uf: 'MT', nome: 'Mato Grosso' },
        { uf: 'MS', nome: 'Mato Grosso do Sul' }, { uf: 'MG', nome: 'Minas Gerais' },
        { uf: 'PA', nome: 'Pará' }, { uf: 'PB', nome: 'Paraíba' }, { uf: 'PR', nome: 'Paraná' },
        { uf: 'PE', nome: 'Pernambuco' }, { uf: 'PI', nome: 'Piauí' }, { uf: 'RJ', nome: 'Rio de Janeiro' },
        { uf: 'RN', nome: 'Rio Grande do Norte' }, { uf: 'RS', nome: 'Rio Grande do Sul' },
        { uf: 'RO', nome: 'Rondônia' }, { uf: 'RR', nome: 'Roraima' }, { uf: 'SC', nome: 'Santa Catarina' },
        { uf: 'SP', nome: 'São Paulo' }, { uf: 'SE', nome: 'Sergipe' }, { uf: 'TO', nome: 'Tocantins' }
      ],
      cidades: [] as string[],
      todosLivros: [] as Livro[],
    };
  },

  validations() {
    return {
      fornecedor: {
        nome: {
          minLength: helpers.withMessage('O nome deve ter no mínimo 8 caracteres!', minLength(8)),
          required: helpers.withMessage('Nome é obrigatório!', required)
        },
        email: {
          email: helpers.withMessage('Este e-mail não é considerado válido!', email),
          required: helpers.withMessage('E-mail é obrigatório', required)
        },
        cnpj: {
          required: helpers.withMessage('CNPJ é obrigatório', required),
          minLength: helpers.withMessage('CNPJ deve ter pelo menos 14 dígitos', minLength(14))
        },
        telefone: {
          required: helpers.withMessage('Telefone é obrigatório', required),
          minLength: helpers.withMessage('Telefone deve ter ao menos 10 dígitos', minLength(10))
        },
        rua: { required: helpers.withMessage('Rua é obrigatória', required) },
        bairro: { required: helpers.withMessage('Bairro é obrigatório', required) },
        cep: { required: helpers.withMessage('CEP é obrigatório', required) },
        estado: { required: helpers.withMessage('Estado é obrigatório', required) },
        numero: { required: helpers.withMessage('Número é obrigatório', required) },
        cidade: { required: helpers.withMessage('Cidade é obrigatória', required) },
      }
    };
  },

  watch: {
    'fornecedor.estado'(uf: string) {
      if (!uf) return;
      this.carregarCidadesPorEstado(uf);
    }
  },

  computed: {
    id() {
      return this.$route.params.id || null;
    },
    ehEdicao() {
      return !!this.id;
    }
  },

  methods: {
    proximaEtapa() {
      this.etapaAtual++;
    },

    etapaAnterior() {
      this.etapaAtual--;
    },

    adicionarLivroCampo() {
      this.fornecedor.livrosIds.push(null);
    },

    removerLivroCampo(index: number) {
      this.fornecedor.livrosIds.splice(index, 1);
      if (this.fornecedor.livrosIds.length === 0) {
        this.adicionarLivroCampo();
      }
    },

    limparCampos() {
      this.fornecedor = {
        nome: '', cnpj: '', cep: '', rua: '', bairro: '', estado: '', cidade: '', numero: '', telefone: '', email: '',
        livrosIds: [null],
      };
      this.v$.$reset();
      this.etapaAtual = 1;
    },

    async salvar() {
      const valido = await this.v$.fornecedor.$validate();
      if (!valido) {
        this.etapaAtual = 1;
        Toast.fire({ icon: 'error', title: 'Corrija os erros no formulário.' });
        return;
      }

      const livrosIdsParaEnviar = Array.from(new Set(this.fornecedor.livrosIds.filter(id => id !== null))) as number[];

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

      const dadosParaEnviar = {
        ...this.fornecedor,
        livrosIds: livrosIdsParaEnviar,
      };

      try {
        if (this.ehEdicao) {
          await api.put(`/fornecedores/${this.id}`, dadosParaEnviar);
          Toast.fire({ icon: 'success', title: 'Fornecedor atualizado com sucesso!' });
        } else {
          await api.post('/fornecedores', dadosParaEnviar);
          Toast.fire({ icon: 'success', title: 'Fornecedor cadastrado com sucesso!' });
        }
        this.$router.push('/consultar/fornecedor');
      } catch (erro) {
        Swal.fire({ icon: 'error', title: 'Erro ao salvar', text: 'Erro inesperado ao salvar o fornecedor.' });
      }
    },

    async carregarDados() {
      try {
        const resposta = await api.get(`/fornecedores/${this.id}`);
        this.fornecedor = {
          ...resposta.data,
          livrosIds: resposta.data.livrosIds || [null],
        };
        if (this.fornecedor.estado) {
          await this.carregarCidadesPorEstado(this.fornecedor.estado);
        }
      } catch (erro) {
        Toast.fire({ icon: 'error', title: 'Erro ao carregar o fornecedor para edição.' });
        this.$router.push('/consultar/fornecedor');
      }
    },

    async carregarCidadesPorEstado(uf: string) {
      try {
        const res = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
        const data = await res.json();
        this.cidades = data.map((c: any) => c.nome);
      } catch (error) {
        console.error('Erro ao carregar cidades:', error);
      }
    },

    async carregarTodosLivros() {
      try {
        const resposta = await api.get('/livros');
        this.todosLivros = resposta.data;
      } catch (error) {
        Toast.fire({ icon: 'error', title: 'Erro ao carregar livros.' });
      }
    },
  },

  async mounted() {
    await this.carregarTodosLivros();
    if (this.ehEdicao) {
      await this.carregarDados();
    }
  },
});
</script>


<style scoped>
.nav-link {
  cursor: default;
  background-color: #e9ecef;
  color: #6c757d;
}

.nav-link.active {
  background-color: #007bff;
  color: white;
}
</style>
