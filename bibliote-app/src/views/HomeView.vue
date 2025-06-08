<template>
  <div class="row">
    <div class="col-sm-4 grid-margin">
      <div class="d-flex">
        <div>
          <h2>Bem-vindo </h2>
        </div>
        <div class="text-success" style="margin-left: 0.5rem">
          <h2>{user}!</h2>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-sm-4 grid-margin">
      <div class="card">
        <div class="card-body">
          <h5>Leitores Cadastrados</h5>
          <div class="row">
            <div class="col-8 col-sm-12 col-xl-8 my-auto">
              <div class="d-flex d-sm-block d-md-flex align-items-center">
                <h2 class="mb-0">102</h2>
                <p class="text-success ml-2 mb-0 font-weight-medium">+3.5%</p>
              </div>
              <h6 class="text-muted font-weight-normal">11.38% do mês passado</h6>
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
          <h5>Empresitmos de Livores</h5>
          <div class="row">
            <div class="col-8 col-sm-12 col-xl-8 my-auto">
              <div class="d-flex d-sm-block d-md-flex align-items-center">
                <h2 class="mb-0">34</h2>
                <p class="text-success ml-2 mb-0 font-weight-medium">+8.3%</p>
              </div>
              <h6 class="text-muted font-weight-normal"> 9.61% do mês passado</h6>
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
          <h5>Purchase</h5>
          <div class="row">
            <div class="col-8 col-sm-12 col-xl-8 my-auto">
              <div class="d-flex d-sm-block d-md-flex align-items-center">
                <h2 class="mb-0">$2039</h2>
                <p class="text-danger ml-2 mb-0 font-weight-medium">-2.1% </p>
              </div>
              <h6 class="text-muted font-weight-normal">2.27% Since last month</h6>
            </div>
            <div class="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
              <i class="icon-lg mdi mdi-monitor text-success ml-auto"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Gráfico de pizza com legenda -->
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
            <h4 class="card-title mb-1">Verificações Rápidas</h4>
            <p class="text-muted mb-1">--- Your data status</p>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="preview-list">
                <div class="preview-item border-bottom">
                  <div class="preview-thumbnail">
                    <div class="preview-icon bg-primary">
                      <i class="mdi mdi-file-document"></i>
                    </div>
                  </div>
                  <div class="preview-item-content d-sm-flex flex-grow">
                    <div class="flex-grow">
                      <h6 class="preview-subject">Livros Emprestados Atrasados!</h6>
                      <p class="text-muted mb-0">Broadcast web app mockup</p>
                    </div>
                    <div class="mr-auto text-sm-right pt-2 pt-sm-0">
                      <p class="text-muted">15 minutes ago</p>
                      <p class="text-muted mb-0">30 tasks, 5 issues </p>
                    </div>
                  </div>
                </div>
                <div class="preview-item border-bottom">
                  <div class="preview-thumbnail">
                    <div class="preview-icon bg-success">
                      <i class="mdi mdi-cloud-download"></i>
                    </div>
                  </div>
                  <div class="preview-item-content d-sm-flex flex-grow">
                    <div class="flex-grow">
                      <h6 class="preview-subject">Wordpress Development</h6>
                      <p class="text-muted mb-0">Upload new design</p>
                    </div>
                    <div class="mr-auto text-sm-right pt-2 pt-sm-0">
                      <p class="text-muted">1 hour ago</p>
                      <p class="text-muted mb-0">23 tasks, 5 issues </p>
                    </div>
                  </div>
                </div>
                <div class="preview-item border-bottom">
                  <div class="preview-thumbnail">
                    <div class="preview-icon bg-info">
                      <i class="mdi mdi-clock"></i>
                    </div>
                  </div>
                  <div class="preview-item-content d-sm-flex flex-grow">
                    <div class="flex-grow">
                      <h6 class="preview-subject">Project meeting</h6>
                      <p class="text-muted mb-0">New project discussion</p>
                    </div>
                    <div class="mr-auto text-sm-right pt-2 pt-sm-0">
                      <p class="text-muted">35 minutes ago</p>
                      <p class="text-muted mb-0">15 tasks, 2 issues</p>
                    </div>
                  </div>
                </div>
                <div class="preview-item border-bottom">
                  <div class="preview-thumbnail">
                    <div class="preview-icon bg-danger">
                      <i class="mdi mdi-email-open"></i>
                    </div>
                  </div>
                  <div class="preview-item-content d-sm-flex flex-grow">
                    <div class="flex-grow">
                      <h6 class="preview-subject">Broadcast Mail</h6>
                      <p class="text-muted mb-0">Sent release details to team</p>
                    </div>
                    <div class="mr-auto text-sm-right pt-2 pt-sm-0">
                      <p class="text-muted">55 minutes ago</p>
                      <p class="text-muted mb-0">35 tasks, 7 issues </p>
                    </div>
                  </div>
                </div>
                <div class="preview-item">
                  <div class="preview-thumbnail">
                    <div class="preview-icon bg-warning">
                      <i class="mdi mdi-chart-pie"></i>
                    </div>
                  </div>
                  <div class="preview-item-content d-sm-flex flex-grow">
                    <div class="flex-grow">
                      <h6 class="preview-subject">UI Design</h6>
                      <p class="text-muted mb-0">New application planning</p>
                    </div>
                    <div class="mr-auto text-sm-right pt-2 pt-sm-0">
                      <p class="text-muted">50 minutes ago</p>
                      <p class="text-muted mb-0">27 tasks, 4 issues </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>



</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import Chart from 'chart.js/auto'

export default defineComponent({
  name: 'IndexView',

  setup() {
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
          maintainAspectRatio: false, // permite usar altura fixa
          cutout: '70%',
          plugins: {
            legend: {
              display: false
            },
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
    })

    return { labels, colors }
  }
})
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  max-width: 300px;
  height: 200px;
  margin: 0 auto;
}

.card {
  background-color: #1e1e2f;
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
