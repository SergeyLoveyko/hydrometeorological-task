<template>
  <Bar
    id="my-chart-id"
    :options="chartOptions"
    :data="chart"
  />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',

  props:  [ 'countLetterList', 'numberPostsList', 'chart' ],

  components: { Bar },
  
  data() {
    return {
      // chartData: this.chart,
      // chartData: {
      //   // labels: ['Post', 'Post', 'Post', 'Post', 'Post', 'Post', 'Post', 'Post', 'Post', 'Post'],
      //   labels: this.numberPostsList,
      //   backgroundColor: [
      //     'rgba(255, 99, 132, 0.2)',
      //     'rgba(255, 159, 64, 0.2)',
      //     'rgba(255, 205, 86, 0.2)',
      //     'rgba(75, 192, 192, 0.2)',
      //     'rgba(54, 162, 235, 0.2)',
      //     'rgba(153, 102, 255, 0.2)',
      //     'rgba(201, 203, 207, 0.2)'
      //   ],
      //   datasets: [{ 
      //     // data: [65, 59, 80, 81, 56, 55, 40, 23, 75, 30, 84],
      //     data: this.countLetterList,
      //     backgroundColor: [
      //       'rgba(255, 99, 132, 0.2)',
      //       'rgba(255, 159, 64, 0.2)',
      //       'rgba(255, 205, 86, 0.2)',
      //       'rgba(75, 192, 192, 0.2)',
      //       'rgba(54, 162, 235, 0.2)',
      //       'rgba(153, 102, 255, 0.2)',
      //       'rgba(201, 203, 207, 0.2)',
      //       'rgba(255, 99, 132, 0.2)',
      //       'rgba(255, 159, 64, 0.2)',
      //       'rgba(255, 205, 86, 0.2)',
      //     ],
      //     borderColor: [
      //       'rgb(255, 99, 132)',
      //       'rgb(255, 159, 64)',
      //       'rgb(255, 205, 86)',
      //       'rgb(75, 192, 192)',
      //       'rgb(54, 162, 235)',
      //       'rgb(153, 102, 255)',
      //       'rgb(201, 203, 207)',
      //       'rgb(255, 99, 132)',
      //       'rgb(255, 159, 64)',
      //       'rgb(255, 205, 86)',
      //     ],
      //     borderWidth: 1
      //   }]
      // },
      chartOptions: {
        responsive: true
      }
    }
  },

  computed: {
    // chartData() { return this.chart }
  }
}
</script>