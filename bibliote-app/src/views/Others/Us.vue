<template>
  <div class="row">
    <div class="col-12 mb-4">
      <h3 class="card-title">Equipe do Projeto</h3>
      <p class="text-muted">Conheça os responsáveis por este sistema.</p>
    </div>

    <div v-for="colab in colaboradores" :key="colab.nome" class="col-md-4 grid-margin">
      <div class="card h-100 text-center">
        <div class="card-body d-flex flex-column align-items-center">
          <img :src="colab.foto" class="rounded-circle mb-3" alt="Foto" width="100" height="100" />
          <h4 class="mb-1">{{ colab.nome }}</h4>
          <p class="text-muted mb-3">{{ colab.descricao }}</p>
          <div class="d-flex gap-3">
            <a v-if="colab.instagram" :href="colab.instagram" target="_blank">
              <i class="mdi mdi-instagram text-danger mdi-24px"></i>
            </a>
            <a v-if="colab.linkedin" :href="colab.linkedin" target="_blank" class="gap1">
              <i class="mdi mdi-linkedin text-primary mdi-24px"></i>
            </a>
            <a v-if="colab.github" :href="colab.github" target="_blank" class="gap1">
              <i class="mdi mdi-github-circle text-info mdi-24px"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Colaboradores',
  data() {
    return {
      colaboradores: [
        {
          nome: 'Patrick Macêdo',
          foto: 'https://avatars.githubusercontent.com/u/102430160?v=4',
          descricao: 'Desenvolvedor Front-end e UI/UX do sistema.',
          instagram: 'https://instagram.com/patrick_maiscedo',
          linkedin: 'https://www.linkedin.com/in/patrick-mac%C3%AAdo-felicio-8a65922b3/',
          github: 'https://github.com/PatrickMacedoFelicio'
        },
        {
          nome: 'Lucas Semeler',
          foto: 'https://avatars.githubusercontent.com/u/133254072?v=4',
          descricao: 'Integrador de APIs e backend do sistema.',
          instagram: '',
          linkedin: '',
          github: 'https://github.com/Semeler'
        },
        {
          nome: 'Samuel Felipe',
          foto: 'https://avatars.githubusercontent.com/u/176979034?v=4',
          descricao: 'Responsável pelo banco de dados, Front-end e testes.',
          instagram: '',
          linkedin: '',
          github: 'https://github.com/samzik4'
        }
      ]
    }
  }
})
</script>

<style scoped>
.rounded-circle {
  object-fit: cover;
  border: 3px solid #3b3b50;
}
</style>
