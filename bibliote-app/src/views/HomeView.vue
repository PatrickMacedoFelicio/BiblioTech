<template>
  <div class="d-flex align-items-center gap-2 flex-wrap mb-4">
    <h2 class="fw-bold mb-0">Bem-vindo</h2>
    <h2 class="text-success mb-0 gap1">Patrick Macêdo Felicio!</h2>
  </div>

  <div class="row">
    <div class="col-sm-4 grid-margin">
      <div class="card">
        <div class="card-body">
          <h4>Núemro de Leitores</h4>
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
          <h4>Quantidade de Emprestimos</h4>
          <div class="row">
            <div class="col-8 col-sm-12 col-xl-8 my-auto">
              <div class="d-flex d-sm-block d-md-flex align-items-center">
                <h2 class="text-danger mb-0">{{ totalEmprAtivo }}</h2>
                <h2 class="ml-2 mb-0 font-weight-medium"> Emprestimos</h2>
              </div>
              <h6 class="text-muted font-weight-normal">Finalizados e em andamento</h6>
            </div>
            <div class="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
              <i class="icon-lg mdi mdi-book-open-page-variant text-danger ml-auto"></i>
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
                <h2 class="text-success mb-0">{{ totalEmprVencido }}</h2>
                <h2 class="ml-2 mb-0 font-weight-medium"> Vencidos</h2>
              </div>
              <h6 class="text-muted font-weight-normal">Total com o status vencido</h6>
            </div>
            <div class="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
              <i class="icon-lg mdi mdi-monitor text-success ml-auto"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-md-4 grid-margin stretch-card">
      <div class="card">
        <div class="card-body text-center">
          <h4 class="card-title">10 Gêneros Mais Emprestados</h4>
          <div class="chart-container">
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

    <div class="col-md-8 grid-margin stretch-card">
      <div class="card">
        <div class="card-body">
          <div class="d-flex flex-row justify-content-between">
            <h4 class="card-title mb-1">Listas de Emprestimos Vencidos Hoje</h4>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import Chart from 'chart.js/auto';
import axios from 'axios';
import { api } from '@/common/http';


export default defineComponent({
  name: 'IndexView',
  setup() {
    // as metricas de cima
    const totalLeitores = ref(0)
    const totalEmprAtivo = ref(0)
    const totalEmprVencido = ref(0)


    const carregarLeitores = async () => {
      try {
        const resposta = await api.get('/clientes')
        totalLeitores.value = resposta.data.length
      } catch (erro) {
        console.error('Erro ao carregar leitores:', erro)
      }
    }

    const carregarEmprestimo = async () => {
      try {
        const resposta = await api.get('/emprestimos')
        const ativos = resposta.data.filter((emp: any) => emp.status === 'Ativo')
        const vencido = resposta.data.filter((emp: any) => emp.status === 'Vencido')
        totalEmprAtivo.value = ativos.length
        totalEmprVencido.value = vencido.length
      } catch (erro) {
        console.error('Erro ao carregar Emprestimos:', erro)
      }
    }


    // O grafico
    const labels = [
      'Ficção', 'Suspense', 'Romance', 'Ação',
      'Fantasia', 'Biografia', 'Ciência', 'História',
      'Terror', 'Comédia'
    ]

    const valores = [236, 593, 371, 190, 420, 155, 288, 300, 110, 260]

    const colors = [
      '#4CAF50', '#FFC107', '#E0E0E0', '#32CD32',
      '#FF5733', '#8E44AD', '#3498DB', '#E91E63',
      '#F39C12', '#00BCD4'
    ]

    const quickChecks = [
      {
        icon: 'mdi mdi-file-document',
        iconBg: 'bg-primary',
        title: 'Livros Emprestados Atrasados!',
        subtitle: 'Broadcast web app mockup',
        time: '15 minutes ago',
        tasks: '30 tasks, 5 issues'
      },
      {
        icon: 'mdi mdi-cloud-download',
        iconBg: 'bg-success',
        title: 'Wordpress Development',
        subtitle: 'Upload new design',
        time: '1 hour ago',
        tasks: '23 tasks, 5 issues'
      },
      {
        icon: 'mdi mdi-clock',
        iconBg: 'bg-info',
        title: 'Project meeting',
        subtitle: 'New project discussion',
        time: '35 minutes ago',
        tasks: '15 tasks, 2 issues'
      },
      {
        icon: 'mdi mdi-email-open',
        iconBg: 'bg-danger',
        title: 'Broadcast Mail',
        subtitle: 'Sent release details to team',
        time: '55 minutes ago',
        tasks: '35 tasks, 7 issues'
      },
      {
        icon: 'mdi mdi-chart-pie',
        iconBg: 'bg-warning',
        title: 'UI Design',
        subtitle: 'New application planning',
        time: '50 minutes ago',
        tasks: '27 tasks, 4 issues'
      }
    ]

    onMounted(() => {
      const canvas = document.getElementById('transaction-history') as HTMLCanvasElement | null
      if (!canvas) return

      new Chart(canvas, {
        type: 'doughnut',
        data: {
          labels,
          datasets: [{
            data: valores,
            backgroundColor: colors,
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '70%',
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.label || ''
                  const value = context.formattedValue || ''
                  return `${label}: ${value} empréstimos`
                }
              }
            }
          }
        }
      })
      carregarLeitores();
      carregarEmprestimo();
    })

    return { totalLeitores, labels, colors, quickChecks, totalEmprAtivo, totalEmprVencido }
  }


})
</script>

<style scoped>
h4 {
  color: #e7e8ee;
}

.chart-container {
  position: relative;
  width: 100%;
  max-width: 300px;
  height: 200px;
  margin: 0 auto;
}

.card {
  background-color: #191C24;
  color: white;
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
</style>
