//import './assets/sb-admin-2.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { mask } from 'vue-the-mask'

const app = createApp(App)

app.directive('mask', mask)

app.use(router)

app.mount('#app')
