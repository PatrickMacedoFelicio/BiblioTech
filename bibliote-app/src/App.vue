<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import FooterBar from './components/layout/FooterBar.vue';
import NavSidebar from './components/layout/NavSidebar.vue';
import HeaderBar from './components/layout/HeaderBar.vue';


</script>

<template>

  <div id="wrapper">
    <!-- Barra de nageção lateral  -->
    <NavSidebar />
    <div id="content-wrapper" class="d-flex flex-column">

      <div id="content">
        <!-- Barra de cima  -->
        <HeaderBar />

        <RouterView />

      </div>
      <!-- Barra de baixo  -->
      <FooterBar />
    </div>
  </div>

</template>

<style scoped></style>
