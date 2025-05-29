<template>

  <div class="grid-margin stretch-card">
    <div class="card">
      <div class="card-body">

       <form @submit.prevent="salvar">
           <h3 class="card-title">Cadastro de leitor</h3>
        <div class="form-group row">
          <div class="col">
            <label>Nome</label>
            <div id="the-basics">
              <input class="typeahead form-control form-control-lg" type="text" placeholder="States of USA" v-model="CadLivro.nome">
            </div>
          </div>
          <div class="col">
            <label>E-mail</label>
            <div id="bloodhound">
              <input class="typeahead form-control form-control-lg" type="text" placeholder="States of USA" v-model="CadLivro.email">
            </div>
          </div>
        </div>
        <div class="form-group row">
          <div class="col">
            <label>CPF</label>
            <div id="bloodhound">
              <input class="typeahead form-control form-control-lg" type="text" placeholder="States of USA" v-model="CadLivro.cpf">
            </div>
          </div>
          <div class="col">
            <label>Telefone</label>
            <div id="the-basics">
              <input class="typeahead form-control form-control-lg" type="text" placeholder="States of USA" v-model="CadLivro.telefone">
            </div>
          </div>
          <div class="col">
            <label>Data de Nascimento</label>
            <div id="the-basics">
              <input class="typeahead form-control form-control-lg" type="date" placeholder="States of USA" v-model="CadLivro.dataNasc">
            </div>
          </div>
        </div>

        <h4 class="card-title">Endereço</h4>
        <div class="form-group row">
          <div class="col">
            <label>Rua</label>
            <div id="the-basics">
              <input class="typeahead form-control form-control-lg" type="text" placeholder="States of USA" v-model="CadLivro.Rua">
            </div>
          </div>
          <div class="col">
            <label>Bairro</label>
            <div id="bloodhound">
              <input class="typeahead form-control form-control-lg" type="text" placeholder="States of USA" v-model="CadLivro.Bairro">
            </div>
          </div>
          <div class="col">
            <label>Número</label>
            <div id="bloodhound">
              <input class="typeahead form-control form-control-lg" type="text" placeholder="States of USA" v-model="CadLivro.Numero">
            </div>
          </div>
          <div class="col">
            <label>CEP</label>
            <div id="bloodhound">
              <input class="typeahead form-control-lg" type="text" placeholder="States of USA" v-model="CadLivro.cep">
            </div>
          </div>
        </div>

        <div class="form-group row">
          <div class="col">
            <label for="exampleFormControlSelect1">Estado</label>
            <select class="form-control form-control-lg" id="exampleFormControlSelect1" v-model="CadLivro.estado">
              <option value="AC">Acre</option>
              <option value="AL">Alagoas</option>
              <option value="AP">Amapá</option>
              <option value="AM">Amazonas</option>
              <option value="BA">Bahia</option>
              <option value="CE">Ceará</option>
              <option value="DF">Distrito Federal</option>
              <option value="ES">Espírito Santo</option>
              <option value="GO">Goiás</option>
              <option value="MA">Maranhão</option>
              <option value="MT">Mato Grosso</option>
              <option value="MS">Mato Grosso do Sul</option>
              <option value="MG">Minas Gerais</option>
              <option value="PA">Pará</option>
              <option value="PB">Paraíba</option>
              <option value="PR">Paraná</option>
              <option value="PE">Pernambuco</option>
              <option value="PI">Piauí</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="RN">Rio Grande do Norte</option>
              <option value="RS">Rio Grande do Sul</option>
              <option value="RO">Rondônia</option>
              <option value="RR">Roraima</option>
              <option value="SC">Santa Catarina</option>
              <option value="SP">São Paulo</option>
              <option value="SE">Sergipe</option>
              <option value="TO">Tocantins</option>
            </select>
          </div>
          <div class="col">
            <label>Cidade</label>
            <div id="bloodhound">
              <input class="typeahead form-control form-control-lg" type="text" placeholder="Cidade" v-model="CadLivro.cidade">
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
import { defineComponent } from "vue";

export default defineComponent({
  name: 'CadLeitor',

  data() {
    return{
      CadLivro:{
        nome:'',
        email:'',
        cpf:'',
        telefone:'',
        dataNasc:'',
        Rua:'',
        Bairro:'',
        Numero:'',
        cep:'',
        estado:'',
        cidade:'',
      }
    }
  },

  methods:{
    salvar(){
      console.log('Dados do formulario', this.CadLivro)
    }
  }
});
</script>