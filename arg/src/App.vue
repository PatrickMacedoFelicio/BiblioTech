<template>

  <div class="container-scroller">
    <!-- Barra de nageção lateral  -->
    <NavSidebar />
    <div class="container-fluid page-body-wrapper">
      
      <HeaderBar />

      <div class="main-panel">
        <div class="content-wrapper">

          <RouterView />

        </div>
         <!-- Barra de baixo -->
        <FooterBar />
      </div>      
    </div>
  </div>

</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import FooterBar from './components/layout/FooterBar.vue';
import NavSidebar from './components/layout/NavSidebar.vue';
import HeaderBar from './components/layout/HeaderBar.vue';


</script>

