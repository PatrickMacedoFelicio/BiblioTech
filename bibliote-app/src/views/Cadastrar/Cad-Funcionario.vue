<template>
  <div class="grid-margin stretch-card">
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="salvar">
          <h3 class="card-title">Cadastro de Funcionário</h3>

          <div class="form-group row">
            <div class="col">
              <label>Nome</label>
              <input class="form-control form-control-lg" v-model="funcionario.nome" type="text" placeholder="Nome completo">
            </div>
            <div class="col">
              <label>CPF</label>
              <input class="form-control form-control-lg" v-mask="'###.###.###-##'" v-model="funcionario.cpf" type="text" placeholder="CPF">
            </div>
            <div class="col">
              <label>Cargo</label>
              <input class="form-control form-control-lg" v-model="funcionario.cargo" type="text" placeholder="Cargo">
            </div>
          </div>

          <div class="form-group row">
            <div class="col">
              <label>Telefone</label>
              <input class="form-control form-control-lg" v-mask="'(##) #####-####'" v-model="funcionario.telefone" type="text" placeholder="Telefone">
            </div>
            <div class="col">
              <label>Email</label>
              <input class="form-control form-control-lg" v-model="funcionario.email" type="email" placeholder="Email">
            </div>
            <div class="col">
              <label>Data de Admissão</label>
              <input class="form-control form-control-lg" v-model="funcionario.data_admissao" type="date">
            </div>
          </div>

          <h4 class="card-title">Endereço</h4>
          <div class="form-group row">
            <div class="col">
              <label>CEP</label>
              <input class="form-control form-control-lg" v-model="funcionario.cep" v-mask="'#####-###'" @blur="buscarCep" type="text" placeholder="CEP">
            </div>
            <div class="col">
              <label>Rua</label>
              <input class="form-control form-control-lg" v-model="funcionario.rua" type="text" placeholder="Rua">
            </div>
            <div class="col">
              <label>Bairro</label>
              <input class="form-control form-control-lg" v-model="funcionario.bairro" type="text" placeholder="Bairro">
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
                <option value="" disabled>Selecione...</option>
                <option v-for="estado in estados" :key="estado.uf" :value="estado.uf">
                  {{ estado.nome }}
                </option>
              </select>
            </div>
            <div class="col">
              <label>Cidade</label>
              <select class="form-control form-control-lg" v-model="funcionario.cidade">
                <option value="" disabled>Selecione...</option>
                <option v-for="cidade in cidades" :key="cidade">{{ cidade }}</option>
              </select>
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
import { mask } from 'vue-the-mask';

export default defineComponent({
  name: 'CadastroFuncionario',

  data() {
    return {
      funcionario: {
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
        estado: '',
        cidade: ''
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
      cidades: [] as string[]
    };
  },

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

    salvar() {
      console.log('Funcionário cadastrado:', this.funcionario);
    },

    limparCampos() {
      Object.keys(this.funcionario).forEach(k => this.funcionario[k] = '');
    }
  }
});
</script>
