<template>
  <div v-if="visivel" class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title cor">Detalhes da Categoria</h3>
        <button class="btn-close" @click="$emit('fechar')">&times;</button>
      </div>
      <div class="modal-body">
        <div class="grid-container">

          <div class="grid-item" style="grid-column: 1 / -1;">
            <div class="livros-container mt-2">
              <strong class="cor">Livros: </strong>
              <span v-for="(titulo, idx) in (emprestar.livrosNomes || emprestar.livros.join(',')).split(' & ')"
                :key="idx" :class="['badge', idx === 1 ? 'badge-outline-warning' : 'badge-outline-info']">
                {{ titulo }}
              </span>
            </div>
          </div>

          <div class="grid-item"><strong class="cor">Leitor: </strong> {{ emprestar.leitorNome || emprestar.leitor }}
          </div>
          <div class="grid-item"><strong class="cor">Data de Emprestimo: </strong> {{ emprestar.data_inicio }}</div>
          <div class="grid-item"><strong class="cor">Data de Vencimento: </strong> {{ emprestar.data_validade }}</div>
          <div class="grid-item"><strong class="cor">Status: </strong> {{ emprestar.status }}</div>
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
  name: 'ModalDevolucao',
  props: {
    visivel: {
      type: Boolean,
      required: true
    },
    emprestar: {
      type: Object as PropType<{
        id: string;
        leitor: string;
        livros: string[];
        data_inicio: string;
        data_validade: string;
        status: string;
        leitorNome?: string;
        livrosNomes?: string;
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

.livros-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.5rem;
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
