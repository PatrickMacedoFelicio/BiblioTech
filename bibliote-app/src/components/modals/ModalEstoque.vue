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
