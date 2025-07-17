<template>
  <div class="d-flex align-items-center gap-2 flex-wrap mb-4">
    <h2 class="fw-bold mb-0">Bem-vindos</h2>
    <h2 class="text-success mb-0 gap1">Patrick, Lucas e Samuel!</h2>
  </div>

  <div class="row">
    <div class="col-sm-4 grid-margin">
      <div class="card">
        <div class="card-body">
          <h4>Número de Leitores</h4>
          <div class="row">
            <div class="col-8 col-sm-12 col-xl-8 my-auto">
              <div class="d-flex d-sm-block d-md-flex align-items-center">
                <h2 class="text-primary mb-0">{{ totalLeitores }}</h2>
                <h2 class="ml-2 mb-0 font-weight-medium"> Cadastrados</h2>
              </div>
              <h6 class="text-muted font-weight-normal">Número total no sistema</h6>
            </div>
            <div class="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
              <i class="icon-lg mdi mdi-account-multiple-outline text-primary ml-auto"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-sm-4 grid-margin">
      <div class="card">
        <div class="card-body">
          <h4>Emprestimos em Aberto</h4>
          <div class="row">
            <div class="col-8 col-sm-12 col-xl-8 my-auto">
              <div class="d-flex d-sm-block d-md-flex align-items-center">
                <h2 class="text-success mb-0">{{ totalEmprAtivo }}</h2>
                <h2 class="ml-2 mb-0 font-weight-medium"> Emprestimos</h2>
              </div>
              <h6 class="text-muted font-weight-normal">Finalizados e em andamento</h6>
            </div>
            <div class="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
              <i class="icon-lg mdi mdi-book-open-page-variant text-success ml-auto"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-sm-4 grid-margin">
      <div class="card">
        <div class="card-body">
          <h4>Emprestimos Vencidos</h4>
          <div class="row">
            <div class="col-8 col-sm-12 col-xl-8 my-auto">
              <div class="d-flex d-sm-block d-md-flex align-items-center">
                <h2 class="text-danger mb-0">{{ totalEmprVencido }}</h2>
                <h2 class="ml-2 mb-0 font-weight-medium"> Vencidos</h2>
              </div>
              <h6 class="text-muted font-weight-normal">Total com o status vencido</h6>
            </div>
            <div class="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
              <i class="icon-lg mdi mdi-monitor text-danger ml-auto"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-12 grid-margin stretch-card">
      <div class="card">
        <div class="card-body">
          <div class="d-flex flex-row justify-content-between align-items-center mb-2">
            <h4 class="card-title mb-0">Empréstimos Vencidos (a partir de hoje)</h4>
          </div>

          <div v-if="vencidosHoje.length > 0" class="table-responsive">
            <table class="table table-dark table-striped custom-table">
              <thead>
                <tr>
                  <th>Detalhes</th>
                  <th>Leitor</th>
                  <th>Livro(s)</th>
                  <th>Vencimento</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="emp in paginaAtualVencidos" :key="emp.id">
                  <td>
                    <button class="btn btn-sm btn-info" @click="abrirModal(emp)">
                      <i class="mdi mdi-magnify"></i>
                    </button>
                  </td>
                  <td>{{ emp.clienteNome }}</td>
                  <td>
                    <span v-for="(livro, i) in emp.livros" :key="i" class="badge bg-primary me-1">
                      {{ livro.titulo }}
                    </span>
                  </td>
                  <td>
                    <span class="badge bg-secondary">
                      {{ formatarData(emp.dataPrevista || emp.data_validade) }}
                    </span>
                  </td>
                  <td><span class="badge bg-danger">Vencido</span></td>
                </tr>
              </tbody>
            </table>

            <!-- Paginação -->
            <div class="d-flex justify-content-between mt-2">
              <button class="btn btn-sm btn-secondary" :disabled="paginaAtual === 1" @click="paginaAtual--">
                ⬅️ Anterior
              </button>
              <span>Página {{ paginaAtual }} / {{ totalPaginas }}</span>
              <button class="btn btn-sm btn-secondary" :disabled="paginaAtual === totalPaginas" @click="paginaAtual++">
                Próximo ➡️
              </button>
            </div>
          </div>

          <div v-else class="text-muted">
            Nenhum empréstimo vencido hoje 🎉
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Gráfico e tabela abaixo -->
  <div class="row">
    <!-- Gêneros mais emprestados -->
    <div class="col-md-4 grid-margin stretch-card">
      <div class="card">
        <div class="card-body text-center">
          <h4 class="card-title">10 Gêneros Mais Emprestados</h4>
          <div class="chart-container" style="max-width:500px; margin:auto;">
            <canvas id="transaction-history"></canvas>
          </div>

          <div class="custom-legend">
            <div class="legend-item" v-for="(label, index) in labels" :key="index">
              <span class="legend-color" :style="{ backgroundColor: colors[index] }"></span>
              <span class="legend-text">{{ label }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <ModalVencido v-if="modalVisivel" :visivel="modalVisivel" :emprestimo="emprestimoSelecionado"
    @fechar="modalVisivel = false" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from "vue";
import Chart from "chart.js/auto";
import { api } from "@/common/http";
import ModalVencido from "@/components/modals/ModalVencido.vue";


export default defineComponent({
  name: "IndexView",
  components: { ModalVencido },

  setup() {
    const totalLeitores = ref(0);
    const totalEmprAtivo = ref(0);
    const totalEmprVencido = ref(0);

    const labels = ref<string[]>([]);
    const valores = ref<number[]>([]);

    const colors = [
      "#f13678",
      "#00e5ff",
      "#ffea00",
      "#ff3d00",
      "#00ff6a",
      "#8c00ff",
      "#ff00c8",
      "#1de9b6",
      "#ff9100",
      "#2979ff",
    ];

    const vencidosHoje = ref<any[]>([]);
    const paginaAtual = ref(1);
    const itensPorPagina = 5;

    const totalPaginas = computed(() =>
      Math.ceil(vencidosHoje.value.length / itensPorPagina)
    );

    const paginaAtualVencidos = computed(() => {
      const start = (paginaAtual.value - 1) * itensPorPagina;
      return vencidosHoje.value.slice(start, start + itensPorPagina);
    });

    const modalVisivel = ref(false);
    const emprestimoSelecionado = ref<any>(null);

    const abrirModal = (emp: any) => {
      emprestimoSelecionado.value = emp;
      modalVisivel.value = true;
    };

    const formatarData = (data?: string | null) => {
      if (!data) return "N/D";
      const dt = new Date(data);
      if (isNaN(dt.getTime())) return "Inválida";
      return dt.toLocaleDateString("pt-BR");
    };

    const carregarLeitores = async () => {
      try {
        const resposta = await api.get("/clientes");
        totalLeitores.value = resposta.data.length;
      } catch (erro) {
        console.error("Erro ao carregar leitores:", erro);
      }
    };

    const carregarEmprestimo = async () => {
      try {
        const resposta = await api.get("/emprestimos");

        // Contagem
        totalEmprAtivo.value = resposta.data.filter((e: any) => e.status === "EM_ANDAMENTO").length;
        totalEmprVencido.value = resposta.data.filter((e: any) => e.status === "Vencido").length;

        const hoje = new Date().toISOString().split("T")[0];

        // Montagem igual ao todos-emprestimos
        vencidosHoje.value = resposta.data
          .filter((e: any) => {
            const dataPrevista = (e.dataPrevista || e.data_validade || "").split("T")[0];
            return e.status === "Vencido" && dataPrevista <= hoje;
          })
          .map((e: any) => ({
            id: e.id,
            clienteId: e.cliente?.id ?? null,
            clienteNome: e.cliente?.nome || "Leitor não encontrado",
            dataPrevista: e.dataPrevista,
            status: e.status,
            livros: e.livros
              ? e.livros.map((l: any) => ({ id: l.id, titulo: l.titulo }))
              : [],
          }));
      } catch (erro) {
        console.error("Erro ao carregar Emprestimos:", erro);
      }
    };


    const carregarGraficoGeneros = async () => {
      try {
        const [emprestimosRes, livrosRes] = await Promise.all([
          api.get("/emprestimos"),
          api.get("/livros"),
        ]);

        const emprestimos = emprestimosRes.data;
        const livros = livrosRes.data;

        const mapaGeneros: Record<number, string> = {};
        livros.forEach((livro: any) => {
          const genero =
            livro.genero?.nome ||
            livro.generoNome ||
            livro.genero ||
            "Desconhecido";
          mapaGeneros[livro.id] = genero;
        });

        const contagem: Record<string, number> = {};
        emprestimos.forEach((emp: any) => {
          if (emp.livros) {
            emp.livros.forEach((livro: any) => {
              const genero = mapaGeneros[livro.id] || "Desconhecido";
              contagem[genero] = (contagem[genero] || 0) + 1;
            });
          }
        });

        const generosOrdenados = Object.entries(contagem)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 10);

        labels.value = generosOrdenados.map(([nome]) => nome);
        valores.value = generosOrdenados.map(([, total]) => total);
      } catch (erro) {
        console.error("Erro ao carregar gráfico de gêneros:", erro);
      }
    };

    onMounted(async () => {
      await carregarLeitores();
      await carregarEmprestimo();
      await carregarGraficoGeneros();

      const canvas = document.getElementById(
        "transaction-history"
      ) as HTMLCanvasElement;
      if (canvas && labels.value.length > 0) {
        new Chart(canvas, {
          type: "doughnut",
          data: {
            labels: labels.value,
            datasets: [
              {
                data: valores.value,
                backgroundColor: colors.slice(0, labels.value.length),
                borderWidth: 0,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: "65%",
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: (context) => {
                    const label = context.label || "";
                    const value = context.formattedValue || "";
                    return `${label}: ${value} empréstimos`;
                  },
                },
              },
            },
          },
        });
      }
    });

    return {
      totalLeitores,
      totalEmprAtivo,
      totalEmprVencido,
      labels,
      valores,
      colors,
      vencidosHoje,
      paginaAtual,
      paginaAtualVencidos,
      totalPaginas,
      abrirModal,
      modalVisivel,
      emprestimoSelecionado,
      formatarData,
    };
  },
});
</script>

<style scoped>
h4 {
  color: #e7e8ee;
}

.card {
  background-color: #191c24;
  color: white;
}

.card-body {
  padding: 16px 18px;
}

.card-title {
  color: #e7e8ee;
  font-weight: bold;
  font-size: 18px;
}

.chart-container {
  position: relative;
  width: 100%;
  max-width: 300px;
  height: 200px;
  margin: 0 auto;
}

.custom-legend {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
}

.legend-item {
  display: flex;
  align-items: center;
}

.legend-color {
  width: 16px;
  height: 16px;
  display: inline-block;
  border-radius: 50%;
  margin-right: 8px;
}

.legend-text {
  font-size: 14px;
}

.table.custom-table {
  color: #e7e8ee;
  font-size: 15px;
  margin-bottom: 0;
}

.table.custom-table thead {
  background-color: #1f2232;
  color: #e7e8ee;
}

.table.custom-table thead th {
  font-size: 16px;
  font-weight: bold;
}

.table.custom-table tbody td {
  font-size: 15px;
}

.table.custom-table tbody tr {
  background-color: #191c24;
  transition: all 0.2s ease;
}

.table.custom-table tbody tr:hover {
  background-color: #1f2232;
  transform: translateY(-2px);
}

.badge.bg-primary {
  background-color: #2979ff !important;
  color: white;
  font-size: 12px;
  padding: 6px 8px;
  border-radius: 4px;
}

.badge.bg-secondary {
  background-color: #2c2f3f !important;
  color: #e7e8ee;
  font-size: 12px;
  padding: 6px 8px;
}

.badge.bg-danger {
  background-color: #f13636 !important;
  color: white;
  font-size: 12px;
  padding: 6px 8px;
}

.btn-info {
  border: none;
  color: #191c24;
  border-radius: 5px;
  padding: 4px 8px;
  font-size: 12px;
  transition: background 0.2s ease;
}

.btn-info:hover {
  background-color: #c848f0;
}

.d-flex.justify-content-between.mt-2 {
  background-color: #191c24;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 13px;
}

button.btn.btn-sm.btn-secondary {
  background-color: #2c2f3f;
  border: none;
  color: #e7e8ee;
  border-radius: 6px;
  transition: background 0.2s ease;
}

button.btn.btn-sm.btn-secondary:hover:not(:disabled) {
  background-color: #3a3d4d;
}

button.btn.btn-sm.btn-secondary:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
</style>
