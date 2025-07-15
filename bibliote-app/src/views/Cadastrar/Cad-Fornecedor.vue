<template>
  <div class="grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="salvar">
          <h3 class="card-title">{{ ehEdicao ? 'Atualização de' : 'Cadastro de' }} Fornecedor</h3>

          <ul class="nav nav-tabs mb-4" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
              <a class="nav-link" :class="{ active: activeTab === 'dadosGerais' }" id="dadosGerais-tab"
                data-toggle="tab" href="#dadosGerais" role="tab" aria-controls="dadosGerais"
                :aria-selected="activeTab === 'dadosGerais'" @click="activeTab = 'dadosGerais'">Dados Gerais</a>
            </li>
            <li class="nav-item" role="presentation">
              <a class="nav-link" :class="{ active: activeTab === 'livros' }" id="livros-tab" data-toggle="tab"
                href="#livros" role="tab" aria-controls="livros" :aria-selected="activeTab === 'livros'"
                @click="activeTab = 'livros'">Livros</a>
            </li>
          </ul>

          <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade" :class="{ 'show active': activeTab === 'dadosGerais' }" id="dadosGerais"
              role="tabpanel" aria-labelledby="dadosGerais-tab">
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

              <h4 class="card-title mt-4">Endereço</h4>
              <div class="form-group row">
                <div class="col">
                  <label>CEP</label>
                  <input class="form-control form-control-lg" type="text" placeholder="Digite o CEP"
                    v-mask="'#####-###'" v-model="fornecedor.cep" @blur="buscarCep">
                  <div class="text-danger" v-if="v$.fornecedor.cep.$error">
                    <small>{{ v$.fornecedor.cep.$errors[0].$message }}</small>
                  </div>
                </div>
                <div class="col">
                  <label>Rua</label>
                  <input class="form-control form-control-lg" type="text" v-model="fornecedor.rua"
                    placeholder="Digite a rua" />
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
            </div>

            <div class="tab-pane fade" :class="{ 'show active': activeTab === 'livros' }" id="livros" role="tabpanel"
              aria-labelledby="livros-tab">
              <h4 class="card-title">Livros Associados</h4>

              <div v-for="(livroId, index) in fornecedor.livrosIds" :key="index" class="form-group row align-items-center mb-2">
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

              <h5 class="mt-4">Livros Selecionados:</h5>
              <ul class="list-group">
                <li class="list-group-item" v-for="livroId in livrosSelecionadosFormatados" :key="livroId.id">
                  {{ livroId.titulo }} (ID: {{ livroId.id }})
                </li>
                <li class="list-group-item text-muted" v-if="fornecedor.livrosIds.length === 0">Nenhum livro
                  selecionado.</li>
              </ul>
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
import { required, email, minLength, helpers } from '@vuelidate/validators';
import { mask } from 'vue-the-mask';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Toast } from '@/common/toast';

// Interface para tipagem dos livros
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
        livrosIds: [] as (number | null)[], // Pode conter null para seleções vazias
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
      activeTab: 'dadosGerais', // Controla a aba atualmente visível
      todosLivros: [] as Livro[], // Armazena a lista de todos os livros disponíveis da API
    };
  },

  watch: {
    'fornecedor.estado'(uf: string) {
      if (!uf) return;
      this.carregarCidadesPorEstado(uf); // Chama a função para carregar cidades
    }
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
        // Não é necessário validar livrosIds aqui, pois pode ter null ou ser vazio no array
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
        if (data.erro) {
          Toast.fire({ icon: 'error', title: 'CEP não encontrado ou inválido.' });
          return;
        }

        this.fornecedor.rua = data.logradouro;
        this.fornecedor.bairro = data.bairro;
        this.fornecedor.cidade = data.localidade;
        this.fornecedor.estado = data.uf;
        await this.carregarCidadesPorEstado(data.uf); // Garante que as cidades são carregadas após buscar o CEP
      } catch (e) {
        console.error('Erro ao buscar CEP:', e);
        Toast.fire({ icon: 'error', title: 'Erro ao buscar CEP. Tente novamente.' });
      }
    },

    async salvar() {
      const valido = await this.v$.fornecedor.$validate();
      if (!valido) {
        // Se a validação falhar, direciona o usuário para a aba "Dados Gerais"
        this.activeTab = 'dadosGerais';
        Toast.fire({ icon: 'error', title: 'Por favor, corrija os erros nos Dados Gerais.' });
        return;
      }

      // Filtra livrosIds para remover nulls e duplicatas antes de enviar
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
        nome: this.fornecedor.nome,
        cnpj: this.fornecedor.cnpj,
        telefone: this.fornecedor.telefone,
        email: this.fornecedor.email,
        cep: this.fornecedor.cep,
        rua: this.fornecedor.rua,
        bairro: this.fornecedor.bairro,
        numero: this.fornecedor.numero,
        estado: this.fornecedor.estado,
        cidade: this.fornecedor.cidade,
        livrosIds: livrosIdsParaEnviar, // Usa o array filtrado
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
        console.error('Erro ao salvar fornecedor:', erro);
        Swal.fire({
          icon: 'error',
          title: 'Erro ao salvar',
          text: 'Ocorreu um erro inesperado ao tentar salvar o fornecedor. Por favor, tente novamente.'
        });
      }
    },

    async carregarDados() {
      try {
        const resposta = await api.get(`/fornecedores/${this.id}`);
        this.fornecedor = {
          nome: resposta.data.nome,
          cnpj: resposta.data.cnpj,
          cep: resposta.data.cep,
          rua: resposta.data.logradouro,
          bairro: resposta.data.bairro,
          estado: resposta.data.estado,
          cidade: resposta.data.cidade,
          telefone: resposta.data.telefone,
          numero: resposta.data.numero,
          email: resposta.data.email,
          livrosIds: resposta.data.livrosIds || [],
        };
        // Para garantir que as cidades do estado carreguem corretamente ao editar
        if (this.fornecedor.estado) {
          await this.carregarCidadesPorEstado(this.fornecedor.estado);
        }
      } catch (erro) {
        console.error('Erro ao carregar o fornecedor para edição:', erro);
        Toast.fire({
          icon: 'error',
          title: 'Erro ao carregar o fornecedor para edição.'
        });
        this.$router.push('/consultar/fornecedor');
      }
    },

    async carregarCidadesPorEstado(uf: string) {
      try {
        const res = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
        const data = await res.json();
        this.cidades = data.map((c: any) => c.nome);
      } catch (error) {
        console.error('Erro ao carregar cidades por estado:', error);
      }
    },

    async carregarTodosLivros() {
      try {
        const resposta = await api.get('/livros'); // Ajuste a rota se necessário
        this.todosLivros = resposta.data;
      } catch (error) {
        console.error('Erro ao carregar todos os livros:', error);
        Toast.fire({
          icon: 'error',
          title: 'Erro ao carregar a lista de livros.'
        });
      }
    },

    getLivroTitulo(id: number | null): string {
      if (id === null) return 'Nenhum livro selecionado';
      const livro = this.todosLivros.find(l => l.id === id);
      return livro ? livro.titulo : `Livro ${id} (Título não encontrado)`;
    },

    // Métodos para o combobox dinâmico de livros
    adicionarLivroCampo() {
      this.fornecedor.livrosIds.push(null); // Adiciona um campo de seleção vazio
    },
    removerLivroCampo(index: number) {
      this.fornecedor.livrosIds.splice(index, 1);
      // Se remover o último campo e o array ficar vazio, adiciona um novo campo vazio
      if (this.fornecedor.livrosIds.length === 0) {
        this.adicionarLivroCampo();
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
        livrosIds: [null], // Inicia com um campo de seleção de livro vazio
      };
      this.v$.$reset();
      this.activeTab = 'dadosGerais';
    }
  },

  async mounted() {
    await this.carregarTodosLivros();

    if (this.ehEdicao) {
      await this.carregarDados();
    } else {
      // Se for um novo cadastro, já adiciona um campo de seleção de livro vazio
      this.adicionarLivroCampo();
    }
  },

  computed: {
    id() {
      return this.$route.params.id || null;
    },
    ehEdicao() {
      return !!this.id;
    },
    livrosSelecionadosFormatados() {
        // Filtra para remover valores nulos e duplicados, depois mapeia para objetos Livro
        const idsUnicos = Array.from(new Set(this.fornecedor.livrosIds.filter(id => id !== null))) as number[];
        return idsUnicos
            .map(id => this.todosLivros.find(l => l.id === id))
            .filter((livro): livro is Livro => livro !== undefined); // Garante que apenas objetos Livro válidos passem
    }
  }
});
</script>

<style scoped>
.nav-tabs .nav-link.active {
  background-color: #e9ecef;
  border-color: #dee2e6 #dee2e6 #fff;
}

.tab-content {
  border: 1px solid #dee2e6;
  border-top: none;
  padding: 20px;
  border-radius: 0 0 0.25rem 0.25rem;
}
</style>