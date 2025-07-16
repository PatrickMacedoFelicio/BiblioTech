<template>
  <div class="grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-9">
              <form @submit.prevent="salvar">
                <h3 class="card-title">{{ ehEdicao ? 'Atualização de' : '' }} Empréstimo de Livro</h3>

                <div class="form-group row">
                  <div class="col-12">
                    <h3 class="card-title-info">Dados do Empréstimo</h3>
                    <label>Nome do Leitor</label>
                    <select class="form-control form-control-lg" v-model="emprestimo.clienteId">
                      <option :value="null" disabled>Selecione o leitor...</option>
                      <option v-for="leitor in listarLeitor" :key="leitor.id" :value="leitor.id">
                        {{ leitor.nome }}
                      </option>
                    </select>
                    <div class="text-danger" v-if="v$.emprestimo.clienteId.$error">
                      <small>{{ v$.emprestimo.clienteId.$errors[0].$message }}</small>
                    </div>
                  </div>
                </div>

                <div class="form-group row">
                  <div class="col-12">
                    <label>Funcionário</label>
                    <select class="form-control form-control-lg" v-model="emprestimo.funcionarioId">
                      <option :value="null" disabled>Selecione o funcionário...</option>
                      <option v-for="func in listarFuncionarios" :key="func.id" :value="func.id">
                        {{ func.nome }}
                      </option>
                    </select>
                    <div class="text-danger" v-if="v$.emprestimo.funcionarioId.$error">
                      <small>{{ v$.emprestimo.funcionarioId.$errors[0].$message }}</small>
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label>Livros</label>
                  <div class="form-group row align-items-end" v-for="(livroId, index) in emprestimo.livrosIds"
                    :key="index">
                    <div class="col-md-10">
                      <select class="form-control form-control-lg" v-model="emprestimo.livrosIds[index]">
                        <option :value="null" disabled>Selecione o livro...</option>
                        <option v-for="livro in listarLivros" :key="livro.id" :value="livro.id">
                          {{ livro.titulo }}
                        </option>
                      </select>
                    </div>
                    <div class="col-md-2">
                      <button v-if="index === emprestimo.livrosIds.length - 1 && emprestimo.livrosIds.length < 2"
                        class="btn btn-info btn-lg w-100" type="button" @click="adicionarLivro"
                        title="Adicionar outro livro">
                        <strong>+</strong>
                      </button>
                      <button v-else class="btn btn-danger btn-lg w-100" type="button" @click="removerLivro(index)"
                        title="Remover livro">
                        <strong>X</strong>
                      </button>
                    </div>
                  </div>
                  <div class="text-danger" v-if="v$.emprestimo.livrosIds.$error">
                    <small v-for="erro in v$.emprestimo.livrosIds.$errors" :key="erro.$uid">
                      {{ erro.$message }}
                    </small>
                  </div>
                </div>

                <h3 class="card-title-info">Datas</h3>
                <div class="form-group row">
                  <div class="col-6">
                    <label>Data de Empréstimo</label>
                    <input class="form-control form-control-lg" v-model="emprestimo.dataInicio" type="date" readonly />
                  </div>
                  <div class="col-6">
                    <label>Data de Devolução Prevista</label>
                    <input class="form-control form-control-lg" v-model="emprestimo.dataPrevista" type="date" />
                    <div class="text-danger" v-if="v$.emprestimo.dataPrevista.$error">
                      <small>{{ v$.emprestimo.dataPrevista.$errors[0].$message }}</small>
                    </div>
                  </div>
                </div>

                <div class="form-group row mt-4">
                  <div class="col-auto">
                    <button type="submit" class="btn btn-success btn-lg" :disabled="carregando">
                      <span v-if="carregando">Salvando...</span>
                      <span v-else>Salvar</span>
                    </button>
                  </div>
                  <div class="col-auto">
                    <button type="button" class="btn btn-secondary btn-lg" @click="limparCampos">Limpar</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { api } from '@/common/http';
import { defineComponent } from 'vue';
import { required, helpers } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import Swal from 'sweetalert2';
import { Toast } from '@/common/toast';

export default defineComponent({
  name: 'Emprestimo',

  setup() {
    return { v$: useVuelidate() };
  },

  data() {
    const hoje = new Date().toISOString().split('T')[0];
    return {
      emprestimo: {
        clienteId: null as number | null,
        funcionarioId: null as number | null,
        dataInicio: hoje,
        dataPrevista: '',
        dataDevolucao: null as string | null,
        status: 'EM_ANDAMENTO',
        livrosIds: [null as number | null]
      },
      listarLivros: [] as any[],
      listarLeitor: [] as any[],
      listarFuncionarios: [] as any[],
      carregando: false
    };
  },

  validations() {
    return {
      emprestimo: {
        clienteId: {
          required: helpers.withMessage('Selecione um Leitor!', required)
        },
        funcionarioId: {
          required: helpers.withMessage('Selecione um Funcionário!', required)
        },
        livrosIds: {
          required: helpers.withMessage(
            'Selecione pelo menos um livro!',
            (value: number[]) => Array.isArray(value) && value.length > 0
          ),
          validLivros: helpers.withMessage(
            'Selecione um livro válido!',
            (value: number[]) =>
              Array.isArray(value) && value.length > 0 && value.every(id => id && id > 0)
          )
        },
        dataPrevista: {
          required: helpers.withMessage('Selecione uma data de Validade!', required)
        }
      }
    };
  },

  methods: {
    async salvar() {
      const valido = await this.v$.$validate();
      if (!valido) return;

      const confirmado = await Swal.fire({
        title: 'Confirmar cadastro?',
        text: 'Deseja realmente fazer este empréstimo?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sim, emprestar!',
        cancelButtonText: 'Cancelar'
      });

      if (!confirmado.isConfirmed) return;

      this.carregando = true;

      try {
        const respostaEstoque = await api.get('/estoques');
        const livrosComProblema: string[] = [];

        for (const livroId of this.emprestimo.livrosIds) {
          const estoque = respostaEstoque.data.find((e: any) => e.livro.id === livroId);
          if (!estoque || estoque.quantidade <= 0) {
            const livro = this.listarLivros.find(l => l.id === livroId);
            const titulo = livro ? livro.titulo : `ID ${livroId}`;
            livrosComProblema.push(titulo);
          }
        }

        if (livrosComProblema.length > 0) {
          Swal.fire({
            icon: 'error',
            title: 'Estoque insuficiente',
            html: `Os seguintes livros estão sem estoque:<br><strong>${livrosComProblema.join('<br>')}</strong>`
          });
          return;
        }

        const novoEmprestimo: any = {
          clienteId: this.emprestimo.clienteId,
          funcionarioId: this.emprestimo.funcionarioId,
          livrosIds: this.emprestimo.livrosIds,
          dataInicio: new Date(this.emprestimo.dataInicio).toISOString(),
          dataPrevista: new Date(this.emprestimo.dataPrevista).toISOString(),
          status: this.emprestimo.status
        };

        if (this.emprestimo.dataDevolucao) {
          novoEmprestimo.dataDevolucao = new Date(this.emprestimo.dataDevolucao).toISOString();
        }

        await api.post('/emprestimos', novoEmprestimo);
        Toast.fire({ icon: 'success', title: 'Empréstimo cadastrado com sucesso!' });

        for (const livroId of this.emprestimo.livrosIds) {
          const estoque = respostaEstoque.data.find((e: any) => e.livro.id === livroId);
          if (estoque && estoque.quantidade > 0) {
            const novaQuantidade = estoque.quantidade - 1;
            await api.put(`/estoques/${estoque.id}`, {
              quantidade: novaQuantidade,
              codigoDeBarras: estoque.codigoDeBarras,
              livroId: estoque.livro.id
            });
          }
        }

        this.$router.push('/Devolucao');
      } catch (erro: any) {
        console.error('Erro ao salvar empréstimo ou atualizar estoque:', erro);
        Swal.fire({
          icon: 'error',
          title: 'Erro ao salvar',
          text: erro.response?.data?.title || 'Erro inesperado.'
        });
      } finally {
        this.carregando = false;
      }
    },

    adicionarLivro() {
      if (this.emprestimo.livrosIds.length < 2) {
        this.emprestimo.livrosIds.push(null);
      } else {
        Toast.fire({ icon: 'warning', title: 'Máximo de 2 livros por empréstimo.' });
      }
    },

    async removerLivro(index: number) {
      if (this.emprestimo.livrosIds.length > 1) {
        this.emprestimo.livrosIds.splice(index, 1);
        this.v$.$touch();
      }
    },

    async carregarLivros() {
      try {
        const resposta = await api.get('/livros');
        this.listarLivros = resposta.data.sort((a: any, b: any) => a.titulo.localeCompare(b.titulo));
      } catch (erro) {
        console.error('Erro ao carregar livros:', erro);
        Toast.fire({ icon: 'error', title: 'Erro ao carregar os livros' });
      }
    },

    async carregarLeitores() {
      try {
        const resposta = await api.get('/clientes');
        this.listarLeitor = resposta.data.sort((a: any, b: any) => a.nome.localeCompare(b.nome));
      } catch (erro) {
        console.error('Erro ao carregar leitores:', erro);
        Toast.fire({ icon: 'error', title: 'Erro ao carregar os leitores' });
      }
    },

    async carregarFuncionarios() {
      try {
        const resposta = await api.get('/funcionarios');
        this.listarFuncionarios = resposta.data.sort((a: any, b: any) => a.nome.localeCompare(b.nome));
      } catch (erro) {
        console.error('Erro ao carregar funcionários:', erro);
        Toast.fire({ icon: 'error', title: 'Erro ao carregar os funcionários' });
      }
    },

    async carregarDados() {
      try {
        const resposta = await api.get(`/emprestimos/${this.id}`);
        this.emprestimo = {
          clienteId: resposta.data.cliente?.id || null,
          funcionarioId: resposta.data.funcionario?.id || null,
          dataInicio: resposta.data.dataInicio,
          dataPrevista: resposta.data.dataPrevista,
          dataDevolucao: resposta.data.dataDevolucao || null,
          status: resposta.data.status || 'Em andamento',
          livrosIds: resposta.data.livros?.map((livro: any) => livro.id) || [null]
        };
      } catch (erro: any) {
        Toast.fire({ icon: 'error', title: 'Erro ao carregar o empréstimo para edição' });
        this.$router.push('/consultar/livros');
      }
    },

    limparCampos() {
      const hoje = new Date().toISOString().split('T')[0];
      this.emprestimo = {
        clienteId: null,
        funcionarioId: null,
        dataInicio: hoje,
        dataPrevista: '',
        dataDevolucao: null,
        status: 'EM_ANDAMENTO',
        livrosIds: [null]
      };
      this.v$.$reset();
    },
  },

  async mounted() {
    await this.carregarLivros();
    await this.carregarLeitores();
    await this.carregarFuncionarios();
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

<style>
input[readonly] {
  background-color: #2a2a3c !important;
  color: #c7c7c7 !important;
  cursor: not-allowed;
  border-color: #2a2a3c;
}
</style>