<template>
  <div v-if="visivel" class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title cor">Detalhes da Categoria</h3>
        <button class="btn-close" @click="$emit('fechar')">&times;</button>
      </div>
      <div class="modal-body">
        <p><strong class="cor">Nome: </strong> {{ categoria.titulo }}</p>
        <p><strong class="cor">Descrição: </strong> {{ categoria.codigoBarras }}</p>
        <p><strong class="cor">Descrição: </strong> {{ categoria.quantidade }}</p>
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
  name: 'ModalEstoque',
  props: {
    visivel: Boolean,
    categoria: {
      type: Object as PropType<{
        titulo: string;
        codigoBarras: string;
        quantidade: number;
      }>,
      required: true
    }
  }
});
</script>
