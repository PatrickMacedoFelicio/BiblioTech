<template>
  <div v-if="visivel" class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title cor">Detalhes da Categoria</h3>
        <button class="btn-close" @click="$emit('fechar')">&times;</button>
      </div>
      <div class="modal-body">
        <p><strong class="cor">Nome: </strong> {{ categoria.nome }}</p>
        <p><strong class="cor">Descrição: </strong> {{ categoria.descricao }}</p>
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
  name: 'ModalCategoria',
  props: {
    visivel: Boolean,
    categoria: {
      type: Object as PropType<{ nome: string; descricao: string }>,
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

.cor{
    color: #c3a3ff;
}

p{
    font-size:  1rem;
}

.modal-content {
  background: #191C24;
  border-radius: 8px;
  padding: 1.5rem;
  width: 500px;
  max-width: 90vw; /* Máximo de 90% da largura da tela */
  max-height: 90vh; /* Máximo de 90% da altura da tela */
  overflow-y: auto;
}

/* Responsividade para telas menores */
@media (max-width: 600px) {
  .modal-content {
    width: 90%;
    padding: 1rem;
  }
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
</style>
