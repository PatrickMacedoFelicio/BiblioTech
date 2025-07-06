<template>
  <div v-if="visivel" class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title cor">Detalhes do Livro</h3>
        <button class="btn-close" @click="$emit('fechar')">&times;</button>
      </div>

      <div class="modal-body">
        <div class="grid-container">
          <div class="grid-item"><strong class="cor">Título:</strong> {{ livro.titulo }}</div>
          <div class="grid-item"><strong class="cor">Autor:</strong> {{ livro.autor }}</div>
          <div class="grid-item"><strong class="cor">ISBN:</strong> {{ livro.ISBN }}</div>
          <div class="grid-item"><strong class="cor">Ano de Publicação:</strong> {{ livro.ano_publicacao }}</div>
          <div class="grid-item"><strong class="cor">Editora:</strong> {{ livro.editora }}</div>
          <div class="grid-item"><strong class="cor">Categoria:</strong> {{ livro.categoria }}</div>
          <div class="grid-item" style="grid-column: 1 / -1;">
            <strong class="cor">Sinopse:</strong><br /> {{ livro.sinopse }}
          </div>
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
  name: 'ModalLivro',
  props: {
    visivel: {
      type: Boolean,
      required: true
    },
    livro: {
      type: Object as PropType<{
        id: string;
        titulo: string;
        autor: string;
        ISBN: string;
        ano_publicacao: string;
        editora: string;
        categoria: string;
        sinopse: string;
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
  color: #fff;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #fff;
}

.modal-body {
  color: #f1f1f1;
}

.cor {
  color: #c3a3ff;
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
 