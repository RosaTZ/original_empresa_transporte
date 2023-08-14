import { createApp } from 'vue'
import {createPinia} from 'pinia'

import './style.css'
import App from '../src/App.vue'
import {router} from './routes/routes.js'
import { Quasar, format } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

const app = createApp(App)
const pinia =createPinia()

app.use(router)
app.use(pinia)

app.use(Quasar, {
  plugins: {}, 
})

app.mount('#app')
