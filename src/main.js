import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Paginate from 'vuejs-paginate-next';
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)


import VueAxios from 'vue-axios';
import api from './plugins/api';

import './theme.css'

createApp(App)
  .use(router)
  .use(VueAxios, api)
  .use(Paginate)
  .use(Bar)
  .mount('#app')
