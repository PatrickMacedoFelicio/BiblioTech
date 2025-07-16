<template>
  <div v-if="visivel" class="modal-overlay">
    <div v-if="emprestimo" class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title cor">Detalhes do Empréstimo</h3>
        <button class="btn-close" @click="$emit('fechar')">&times;</button>
      </div>
      <div class="modal-body">
        <h5 class="cor mb-3">Informações do Empréstimo</h5>
        <div class="grid-container">
          <div class="grid-item" style="grid-column: 1 / -1;">
            <div class="livros-container mt-2">
              <strong class="cor">Livros: </strong>
              <span
                v-for="(titulo, idx) in (emprestimo.livrosNomes || '').split(/\s*,\s*/)"
                :key="idx"
                class="badge badge-outline-info"
              >
                {{ titulo }}
              </span>
            </div>
          </div>

          <div class="grid-item">
            <strong class="cor">Leitor: </strong>
            {{ emprestimo.clienteNome || 'N/D' }}
          </div>

          <div class="grid-item">
            <strong class="cor">Data de Empréstimo: </strong>
            {{ formatarData(emprestimo.dataInicio) }}
          </div>

          <div class="grid-item">
            <strong class="cor">Data Prevista: </strong>
            {{ formatarData(emprestimo.dataPrevista) }}
          </div>

          <div class="grid-item">
            <strong class="cor">Data de Devolução: </strong>
            {{ emprestimo.dataDevolucao ? formatarData(emprestimo.dataDevolucao) : 'Não devolvido' }}
          </div>

          <div class="grid-item">
            <strong class="cor">Status: </strong>
            <span :class="['badge', getBadgeClass(emprestimo.status)]">
              {{ emprestimo.status ? capitalize(emprestimo.status) : 'Não informado' }}
            </span>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn btn-secondary" @click="$emit('fechar')">Fechar</button>
      </div>
    </div>

    <div v-else-if="visivel" class="modal-content">
      <p>Carregando detalhes do empréstimo...</p>
      <div class="modal-footer">
        <button class="btn btn-secondary" @click="$emit('fechar')">Fechar</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

interface Emprestimo {
  id: number;
  clienteId: number | null;
  clienteNome: string;
  funcionarioId: number | null;
  dataInicio: string;
  dataPrevista: string;
  dataDevolucao: string | null;
  status: string;
  livrosIds: number[];
  livrosNomes: string;
}

export default defineComponent({
  name: 'ModalDevolucao',
  props: {
    visivel: {
      type: Boolean,
      required: true,
    },
    emprestimo: {
      type: Object as PropType<Emprestimo | null>,
      required: false,
      default: null,
    },
  },
  methods: {
    formatarData(data?: string | null) {
      if (!data) return 'N/D';
      try {
        const dt = new Date(data);
        if (isNaN(dt.getTime())) return 'Data inválida';
        return dt.toLocaleDateString('pt-BR');
      } catch {
        return 'Data inválida';
      }
    },
    getBadgeClass(status: string): string {
      switch (status.toLowerCase()) {
        case 'devolvido':
          return 'badge-success';
        case 'cancelado':
          return 'badge-danger';
        case 'ativo':
          return 'badge-warning';
        case 'em_andamento':
          return 'badge-normal';
        case 'vencido':
          return 'badge-danger';
        default:
          return 'badge-secondary';
      }
    },
    capitalize(str: string): string {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    },
  },
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
  background: #191c24;
  border-radius: 8px;
  padding: 1.5rem;
  width: 900px;
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

.badge {
  padding: 0.3em 0.6em;
  border-radius: 0.3rem;
  font-size: 0.85rem;
  color: #fff;
}

.badge-success {
  background-color: #28a745;
}

.badge-danger {
  background-color: #dc3545;
}

.badge-warning {
  background-color: #ffc107;
  color: #212529;
}

.badge-secondary {
  background-color: #6c757d;
}

.badge-normal {
  background-color: #007bff;
  color: white;
}

.badge-outline-info {
  color: #17a2b8;
  border: 1px solid #17a2b8;
  background-color: transparent;
  padding: 0.25em 0.5em;
  border-radius: 0.25rem;
  font-size: 0.9rem;
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
