import { createApp } from 'vue'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


library.add(faPen, faTrash)
import './assets/main.css'

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')