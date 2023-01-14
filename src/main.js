import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Paginate from 'vuejs-paginate-next';
import { Bar } from 'vue-chartjs'

import VueAxios from 'vue-axios';
import api from './plugins/api';

import './theme.css'

createApp(App)
  .use(router)
  .use(VueAxios, api)
  .use(Paginate)
  .use(Bar)
  .mount('#app')
