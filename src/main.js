import { createApp } from 'vue'
import App from './App.vue'
import { router } from './route'
import { toast } from './plugins/toastification'
import './assets/css/index.css'

createApp(App).use(router).use(toast).mount('#app')
