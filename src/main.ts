import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store/store'
import vuetify from "@/plugins/vuetify";

import '@/assets/base.css'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(vuetify)
app.mount('#app')
