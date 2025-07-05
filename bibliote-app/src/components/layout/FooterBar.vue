<template>
    <footer class="footer">
        <div class="d-sm-flex justify-content-center justify-content-sm-between">
            <span class="text-muted d-block text-center text-sm-left d-sm-inline-block">Copyright © <a
                    href="https://www.bootstrapdash.com/bootstrap-admin-template/" target="_blank">bootstrapdash.com</a> 2020</span>
            <span class="text-muted d-block text-center text-sm-left d-sm-inline-block"> Desenvolvido por <router-link target="_blank" to="/Colaboradores">Pekenahs</router-link> 2025</span>
        </div>
    </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: 'FooterBar'
})
</script>