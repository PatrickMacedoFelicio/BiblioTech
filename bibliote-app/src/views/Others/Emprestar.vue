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
                      <select class="form-control form-control-lg" v-model="emprestimo.livrosIds[index]"
                        @change="handleLivroChange(index, ($event.target as HTMLSelectElement).value)">
                        <option :value="null" disabled>Selecione o livro...</option>
                        <option v-for="livro in listarLivros" :key="livro.id" :value="livro.id"
                          :disabled="livrosIndisponiveisNaSelecao.includes(livro.id) && livro.id !== emprestimo.livrosIds[index]">
                          {{ livro.titulo }}
                          <span v-if="livro.id !== emprestimo.livrosIds[index] && livrosIndisponiveisNaSelecao.includes(livro.id)"> (Indisponível)</span>
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

interface Estoque {
  id: number;
  quantidade: number;
  codigoDeBarras: string;
  livroId: number;
  livro: any;
}

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
      emprestimos: [] as any[],
      listarLivros: [] as any[],
      listarLeitor: [] as any[],
      listarFuncionarios: [] as any[],
      dialog: false,
      livrosSelecionadosAnteriormente: [] as (number | null)[],
      livrosIndisponiveisNaSelecao: [] as number[],
      estoqueAtualLocal: new Map<number, number>(),
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
          ),
          estoqueDisponivel: helpers.withMessage(
            'Um ou mais livros selecionados não têm estoque disponível!',
            (value: number[]) => {
              return value.every(id => {
                if (id === null) return true;
                return (this.estoqueAtualLocal.get(id) ?? 0) > 0;
              });
            }
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

      const livrosSemEstoqueParaEmprestar = this.emprestimo.livrosIds.filter(id => {
          return (this.estoqueAtualLocal.get(id ?? 0) ?? 0) <= 0;
      });

      if (livrosSemEstoqueParaEmprestar.length > 0) {
          Swal.fire({
              icon: 'error',
              title: 'Estoque Insuficiente!',
              text: 'Um ou mais livros selecionados não possuem estoque disponível para empréstimo.'
          });
          return;
      }

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

      console.log('Enviando para a API:', JSON.stringify(novoEmprestimo, null, 2));

      try {
        if (this.ehEdicao) {
          await api.put(`/emprestimos/${this.id}`, novoEmprestimo);
          Toast.fire({ icon: 'success', title: 'Empréstimo atualizado com sucesso!' });
        } else {
          await api.post(`/emprestimos`, novoEmprestimo);
          Toast.fire({ icon: 'success', title: 'Empréstimo cadastrado com sucesso!' });
        }

        this.$router.push('/Devolucao');
      } catch (erro: any) {
        console.error('Resposta de erro da API:', JSON.stringify(erro.response?.data, null, 2));
        Swal.fire({
          icon: 'error',
          title: 'Erro ao salvar',
          text: erro.response?.data?.title || 'Erro inesperado.'
        });
        this.emprestimo.livrosIds.forEach(async (livroId) => {
            if (livroId) {
                await this.updateEstoque(livroId, 1);
                this.estoqueAtualLocal.set(livroId, (this.estoqueAtualLocal.get(livroId) ?? 0) + 1);
            }
        });
      }
    },

    async fetchEstoque(livroId: number): Promise<number> {
        try {
            const response = await api.get(`/estoques/${livroId}`);
            const estoque: Estoque = response.data;
            this.estoqueAtualLocal.set(livroId, estoque.quantidade);
            return estoque.quantidade;
        } catch (error: any) {
            console.error(`Erro ao buscar estoque para o livro ${livroId}:`, error.response?.data || error);
            Toast.fire({
                icon: 'error',
                title: `Erro ao buscar estoque do livro.`,
                text: error.response?.data?.detail || 'Verifique se o endpoint /estoques/{id} está correto e ativo.'
            });
            this.estoqueAtualLocal.set(livroId, 0);
            return 0;
        }
    },

    async updateEstoque(livroId: number, change: number) {
        try {
            const currentEstoque = this.estoqueAtualLocal.get(livroId) ?? 0;
            const newQuantidade = currentEstoque + change;

            await api.put(`/estoques/${livroId}`, { quantidade: newQuantidade });
            this.estoqueAtualLocal.set(livroId, newQuantidade);
        } catch (error: any) {
            console.error(`Erro ao atualizar estoque para o livro ${livroId} (mudança: ${change}):`, error.response?.data || error);
            Toast.fire({
                icon: 'error',
                title: `Erro ao atualizar estoque do livro na API.`,
                text: error.response?.data?.detail || 'Verifique se o endpoint PUT /estoques/{id} está correto e ativo.'
            });
        }
    },

    async handleLivroChange(index: number, newLivroIdValue: string | number | null) {
      const newLivroId = newLivroIdValue === null ? null : Number(newLivroIdValue);
      const livroIdAnterior = this.livrosSelecionadosAnteriormente[index];

      if (livroIdAnterior && livroIdAnterior !== newLivroId) {
        await this.updateEstoque(livroIdAnterior, 1);
        const idx = this.livrosIndisponiveisNaSelecao.indexOf(livroIdAnterior);
        if (idx > -1) {
            this.livrosIndisponiveisNaSelecao.splice(idx, 1);
        }
      }

      if (newLivroId) {
        const quantidadeReal = await this.fetchEstoque(newLivroId);

        if (quantidadeReal <= 0) {
          Swal.fire({
            icon: 'warning',
            title: 'Estoque Insuficiente!',
            text: `O livro "${this.listarLivros.find(l => l.id === newLivroId)?.titulo}" não possui estoque disponível.`
          });
          this.emprestimo.livrosIds[index] = livroIdAnterior;
          this.livrosSelecionadosAnteriormente[index] = livroIdAnterior;
          if (!this.livrosIndisponiveisNaSelecao.includes(newLivroId)) {
            this.livrosIndisponiveisNaSelecao.push(newLivroId);
          }
          this.v$.emprestimo.livrosIds.$touch();
          return;
        }

        if (newLivroId !== livroIdAnterior) {
            await this.updateEstoque(newLivroId, -1);
            const idx = this.livrosIndisponiveisNaSelecao.indexOf(newLivroId);
            if (idx > -1) {
                this.livrosIndisponiveisNaSelecao.splice(idx, 1);
            }
        }
      }

      this.livrosSelecionadosAnteriormente[index] = newLivroId;

      this.v$.emprestimo.livrosIds.$touch();
    },

    adicionarLivro() {
      if (this.emprestimo.livrosIds.length < 2) {
        this.emprestimo.livrosIds.push(null);
        this.livrosSelecionadosAnteriormente.push(null);
      } else {
        Toast.fire({ icon: 'warning', title: 'Máximo de 2 livros por empréstimo.' });
      }
    },

    async removerLivro(index: number) {
      if (this.emprestimo.livrosIds.length > 1) {
        const livroIdRemovido = this.emprestimo.livrosIds[index];
        if (livroIdRemovido) {
            await this.updateEstoque(livroIdRemovido, 1);
            const idx = this.livrosIndisponiveisNaSelecao.indexOf(livroIdRemovido);
            if (idx > -1) {
                this.livrosIndisponiveisNaSelecao.splice(idx, 1);
            }
        }
        this.emprestimo.livrosIds.splice(index, 1);
        this.livrosSelecionadosAnteriormente.splice(index, 1);
        this.v$.$touch();
      }
    },

    livrosDisponiveis(index: number) {
      const livrosJaSelecionadosEmOutrosCampos = this.emprestimo.livrosIds.filter((_, i) => i !== index);
      return this.listarLivros.filter(livro => {
        if (livro.id === this.emprestimo.livrosIds[index]) {
            return true;
        }
        return !livrosJaSelecionadosEmOutrosCampos.includes(livro.id) && 
               !this.livrosIndisponiveisNaSelecao.includes(livro.id);
      });
    },

    async carregarLivros() {
      try {
        const resposta = await api.get('/livros');
        this.listarLivros = resposta.data.sort((a: any, b: any) => a.titulo.localeCompare(b.titulo));
        for (const livro of this.listarLivros) {
            await this.fetchEstoque(livro.id);
        }
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
          status: resposta.data.status || 'EM_ANDAMENTO',
          livrosIds: resposta.data.livros?.map((livro: any) => livro.id) || [null]
        };

        if (this.ehEdicao && resposta.data.livros) {
            for (const livroEmprestado of resposta.data.livros) {
                this.estoqueAtualLocal.set(livroEmprestado.id, (this.estoqueAtualLocal.get(livroEmprestado.id) ?? 0) - 1);
            }
            this.livrosSelecionadosAnteriormente = [...this.emprestimo.livrosIds];
        }

        console.log('Empréstimo carregado para edição:', JSON.stringify(this.emprestimo, null, 2));
      } catch (erro: any) {
        console.error('Erro ao carregar o empréstimo para edição:', erro.response?.data || erro);
        Toast.fire({
          icon: 'error',
          title: 'Erro ao carregar o empréstimo para edição'
        });
        this.$router.push('/consultar/livros');
      }
    },

    async limparCampos() {
      const hoje = new Date().toISOString().split('T')[0];

      for (const livroId of this.emprestimo.livrosIds) {
          if (livroId) {
              await this.updateEstoque(livroId, 1);
          }
      }

      this.emprestimo = {
        clienteId: null,
        funcionarioId: null,
        dataInicio: hoje,
        dataPrevista: '',
        dataDevolucao: null,
        status: 'EM_ANDAMENTO',
        livrosIds: [null]
      };

      this.livrosSelecionadosAnteriormente = [null];
      this.livrosIndisponiveisNaSelecao = [];
      this.estoqueAtualLocal.clear();
      
      await this.carregarLivros(); 

      console.log('Campos resetados:', JSON.stringify(this.emprestimo, null, 2));
      this.v$.$reset();
    }
  },

  async mounted() {
    await this.carregarLivros();
    await this.carregarLeitores();
    await this.carregarFuncionarios();

    if (!this.ehEdicao) {
        this.livrosSelecionadosAnteriormente = [...this.emprestimo.livrosIds];
    } else {
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

<style>
input[readonly] {
  background-color: #2a2a3c !important;
  color: #c7c7c7 !important;
  cursor: not-allowed;
  border-color: #2a2a3c;
}
</style>