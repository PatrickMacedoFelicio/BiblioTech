<template>
  <div class="row">
    <div class="col-sm-4 grid-margin">
      <h2>Bem-vindo {user}!</h2>
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
  <div class="row">
    <div class="col-md-4 grid-margin stretch-card">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">Transaction History</h4>
          <canvas id="grafico-generos" class="transaction-chart"></canvas>
          <div class="bg-gray-dark d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
            <div class="text-md-center text-xl-left">
              <h6 class="mb-1">Transfer to Paypal</h6>
              <p class="text-muted mb-0">07 Jan 2019, 09:12AM</p>
            </div>
            <div class="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0">
              <h6 class="font-weight-bold mb-0">$236</h6>
            </div>
          </div>
          <div class="bg-gray-dark d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
            <div class="text-md-center text-xl-left">
              <h6 class="mb-1">Tranfer to Stripe</h6>
              <p class="text-muted mb-0">07 Jan 2019, 09:12AM</p>
            </div>
            <div class="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0">
              <h6 class="font-weight-bold mb-0">$593</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import Chart from 'chart.js/auto';

export default defineComponent({
  name: 'IndexView',

  setup() {
    onMounted(() => {
      const ctx = document.getElementById('grafico-generos') as HTMLCanvasElement
      if (ctx) {
        new Chart(ctx, {
          type: 'doughnut', // ou 'bar', 'pie', 'line'
          data: {
            labels: ['Romance', 'Aventura', 'Terror', 'Ficção'], // gêneros
            datasets: [{
              label: 'Livros Emprestados',
              data: [20, 15, 10, 5], // valores para cada gênero
              backgroundColor: ['#4CAF50', '#FFC107', '#F44336', '#2196F3']
            }]
          },
          options: {
            plugins: {
              legend: {
                position: 'bottom'
              }
            }
          }
        })
      }
    })
  }
})
</script>

<style>
.transaction-chart {
  width: 100%;
  max-width: 400px;
  height: 300px;
}
</style>