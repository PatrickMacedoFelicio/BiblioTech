<template>
  <div class="page-header">
    <h3 class="card-title">Editar Categoria</h3>
  </div>

  <div class="row">
    <div class="col-lg-12 grid-margin stretch-card">
      <div class="card">
        <div class="card-body">
          <form @submit.prevent="salvar">
            <div class="form-group">
              <label>Nome</label>
              <input type="text" class="form-control form-control-lg" v-model="categoria.nome" required />
            </div>
            <div class="form-group">
              <label>Descrição</label>
              <textarea class="form-control form-control-lg" rows="4" v-model="categoria.descricao"></textarea>
            </div>

            <div class="d-flex justify-content-end mt-4">
              <button type="submit" class="btn btn-success me-2">Salvar</button>
              <RouterLink class="btn btn-secondary" to="/categorias">Cancelar</RouterLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Swal from 'sweetalert2';

interface Categoria {
  nome: string;
  descricao: string;
}

export default defineComponent({
  name: 'EditarCategoria',

  setup() {
    const route = useRoute();
    const router = useRouter();

    const categoria = reactive<Categoria>({
      nome: '',
      descricao: ''
    });

    onMounted(() => {
      // Recebe dados via query e preenche o formulário
      const nome = route.query.nome as string || '';
      const descricao = route.query.descricao as string || '';
      categoria.nome = nome;
      categoria.descricao = descricao;
    });

    function salvar() {
      Swal.fire({
        title: 'Sucesso!',
        text: 'Categoria atualizada com sucesso.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        router.push('/categorias');
      });
    }

    return {
      categoria,
      salvar
    };
  }
});
</script>
