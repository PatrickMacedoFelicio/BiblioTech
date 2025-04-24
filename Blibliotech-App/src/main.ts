import './assets/css/sb-admin-2.min.css'
import './assets/fontawesome-free/css/all.min.css'
    
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
