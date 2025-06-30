<template>
  <div v-if="visivel" class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title cor">Detalhes do Funcionário</h3>
        <button class="btn-close" @click="$emit('fechar')">&times;</button>
      </div>
      <div class="modal-body">
        <div class="grid-container">
          <div class="grid-item"><strong class="cor">Nome:</strong> {{ funcionario.nome }}</div>
          <div class="grid-item"><strong class="cor">CPF:</strong> {{ funcionario.cpf }}</div>
          <div class="grid-item"><strong class="cor">Cargo:</strong> {{ funcionario.cargo }}</div>
          <div class="grid-item"><strong class="cor">Telefone:</strong> {{ funcionario.telefone }}</div>
          <div class="grid-item"><strong class="cor">E-mail:</strong> {{ funcionario.email }}</div>
          <div class="grid-item"><strong class="cor">Data de Admissão:</strong> {{ funcionario.data_admissao }}</div>
          <div class="grid-item"><strong class="cor">CEP:</strong> {{ funcionario.cep }}</div>
          <div class="grid-item"><strong class="cor">Rua:</strong> {{ funcionario.rua }}</div>
          <div class="grid-item"><strong class="cor">Bairro:</strong> {{ funcionario.bairro }}</div>
          <div class="grid-item"><strong class="cor">Número:</strong> {{ funcionario.numero }}</div>
          <div class="grid-item"><strong class="cor">Estado:</strong> {{ funcionario.estado }}</div>
          <div class="grid-item"><strong class="cor">Cidade:</strong> {{ funcionario.cidade }}</div>
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn btn-secondary" @click="$emit('fechar')">Fechar</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';


export default defineComponent({
  name: 'ModalFuncionario',
  props: {
    visivel: Boolean,
    funcionario: {
      type: Object as PropType<{
        id: string;
        nome: string;
        cpf: string;
        cargo: string;
        telefone: string;
        email: string;
        data_admissao: string;
        cep: string;
        rua: string;
        bairro: string;
        numero: string;
        estado: string;
        cidade: string
      }>,
      required: true
    }
  }
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #191C24;
  border-radius: 8px;
  padding: 1.5rem;
  width: 900px;
  height: auto;
  max-width: 96vw;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
}

.modal-header,
.modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #fff;
}

.cor {
  color: #c3a3ff;
}

p {
  font-size: 1rem;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.grid-item {
  background-color: #1f2232;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  font-size: 0.95rem;
  margin-bottom: 10px;
  color: #f1f1f1;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

/* Responsivo */
@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr;
  }

  .modal-content {
    width: 95%;
    padding: 1rem;
  }
}
</style>
