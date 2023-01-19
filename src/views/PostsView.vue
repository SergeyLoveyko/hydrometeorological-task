<template>
  <div class="home">
    <barchart 
      class="myChart" 
      :chart="renderChart"
    >
      <!-- :countLetterList="arrCountLetters"
      :numberPostsList="newLabels" -->
    </barchart>
    <!-- <canvas id="myChart" class="myChart"></canvas> -->
    <div class="posts">
      <h2>Posts</h2>
      <form class="form" action="">
        <div class="form__content">
          <input class="form__input" type="text" placeholder="Title post" v-model="inputValue">
          <div>
            <button class="mr-2" @click.prevent="filterPostdata">Search</button>
            <button @click.prevent="resetPostData">Reset</button>
          </div>
        </div>
        <div v-if="search != false">  <strong> Number of found: {{ newPostDate.length }} </strong> </div>
      </form>
      
      <ul >
        <li class="posts__post" v-for="post in count_list" :key="post.id">
          <h3> {{ post.title }} </h3>
          <div class="mb-3">
            <p class="pl_3" v-for="item in post.text" :key="item.id"> {{ item }} </p>
            <!-- <li>{{ item.body }}</li> -->
          </div>
          <hr />
          <div class="post__comment-counter"> Count comments: {{ post.posts.length }} </div>

          <ul>
            <li class="posts__comment" v-for="item in post.posts" :key="item.id">
              <h4>User: {{ item.name }}</h4> 
                <p class="pl_3" v-for="item in item.posts" :key="item.id"> <i>{{ item }}</i> </p>
            </li>
          </ul>
          <div class="post__num"> Post № {{ post.id }} </div>
        </li>
      </ul>
    </div>
    <paginate class="paginate"
      v-model="page"
      :page-count="pagesCount"
      :click-handler="changePage"
    >
      <!-- :prev-text="Prev"
      :next-text="Next" -->
    </paginate>
  </div>
</template>

<script>
import Paginate from 'vuejs-paginate-next';
// import Chart from 'chart.js/auto';
import BarChart from '@/views/BarChart.vue'

export default {
  name: 'PostsView',

  components: {
   paginate: Paginate,
   barchart: BarChart
  },

  data() {
    return {
      mainPostDate: [],
      newPostDate: [],
      count_list: [],
      arrCountLetters: [],
      arrNumberPostList: [],
      arrLetterTest: [],
      arrNumberTest: [],
      // newLabels: ['Post', 'Post', 'Post', 'Post', 'Post', 'Post', 'Post', 'Post', 'Post', 'Post'],
      search: false,


      arrLetterTestNew: [],
      arrNumberTestNew: [],

      inputValue: '',
      page: 1,
      pagination_offset: 0,
      pagination_item_total: 0,
      pagination_items_per_page: 10,

      myChart: {
        labels: ['Post', 'Post', 'Post', 'Post', 'Post', 'Post', 'Post', 'Post', 'Post', 'Post'],
        // labels: {0: 'Post  1', 1: 'Post  2', 2: 'Post  3', 3: 'Post  4', 4: 'Post  5', 5: 'Post  6', 6: 'Post  7', 7: 'Post  8', 8: 'Post  9', 9: 'Post  10'},
        // labels: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
        ],
        datasets: [{ 
          label: 'My First Dataset',
          // data: [65, 59, 80, 81, 56, 55, 40, 23, 75, 30, 84],
          // data: {0: 48, 1: 73, 2: 29, 3: 43, 4: 57, 5: 24, 6: 70, 7: 26, 8: 58, 9: 69},
          data: this.arrCountLetters,
          // data: [],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
          ],
          borderWidth: 1
        }]
      }
    }
  },

  methods: {
    postTextDevision(postsDate) {
      let arr = []

      for(let post of postsDate) {

        const obj = {};

        obj.userId = post.userId;
        obj.id = post.id;
        obj.title = post.title;
        obj.text = post.body.split('\n');
        obj.posts = []

        arr.push(obj);
        
      }

      this.mainPostDate = arr;
    },

    sortPosts(commentsData) {
      for (let comment of commentsData) {
        this.mainPostDate[comment.postId - 1]
          .posts.push({name: comment.name, posts: comment.body
          .split('\n'), email: comment.email
        });
      }
      // console.log( 'Comments arr new:', this.newPostDate );
    },

    rendomNumberComments(data) {
      for (let item of data) {
        item.posts.splice(1, this.getRandomInt(2, 4));
      }
    },

    getRandomInt(min, max) {
      // console.log( Math.floor(Math.random() * (max - min + 1)) + min );
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    filterPostdata() {

      // if (this.inputValue == '') {
      //   this.newPostDate = this.mainPostDate;
      // } 
      
      if (this.inputValue !== '') {
        this.newPostDate = [];

        for (let post of this.mainPostDate) {

          if (post.title.includes( this.inputValue ) == true ) {
            this.newPostDate.push(post)
          } 
          // this.newPostDate.push( typeof post.title )
          // this.newPostDate.push( typeof this.inputValue, this.inputValue )
          console.log( 'run' );
        }

        this.inputValue = '';
      }

      this.countLetterComments();
      this.pagination_item_total = this.newPostDate.length
      this.changePage(1);

      // this.updateChart(this.myChart, this.newLabels, this.arrTest);

      this.search = true;

      console.log( "Input value: ", typeof this.inputValue, this.inputValue );
      // console.log( "Input value: ", this.inputValue );
      console.log( "New Posts Data after filter: ", this.newPostDate );
      console.log( "Count List: ", this.count_list );
    },

    resetPostData() {
      this.newPostDate =  this.mainPostDate;

      this.countLetterComments();
      this.pagination_item_total = this.newPostDate.length
      this.changePage(1);

      // this.changeProps();
      // this.updateChart(this.myChart, this.newLabels, this.arrCountLetters);

      this.search = false;

      // console.log( "New Posts Data after filter: ", this.newPostDate );
      console.log( "Count List: ", this.count_list );
      // console.log( "My Chart: ", this.this.myChart );
    },


    countLetterComments() {
      let arrSumComments = [];
      let arrIdPost = [];

      const testChart = {
        labels: ['Post', 'Post', 'Post', 'Post', 'Post', 'Post', 'Post', 'Post', 'Post', 'Post'],
        // labels: {0: 'Post  1', 1: 'Post  2', 2: 'Post  3', 3: 'Post  4', 4: 'Post  5', 5: 'Post  6', 6: 'Post  7', 7: 'Post  8', 8: 'Post  9', 9: 'Post  10'},
        // labels: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        datasets: [{ 
          label: 'Coutn letters from email',
          data: [65, 59, 80, 81, 56, 55, 40, 23, 75, 30, 84],
          // data: {0: 48, 1: 73, 2: 29, 3: 43, 4: 57, 5: 24, 6: 70, 7: 26, 8: 58, 9: 69},
          // data: this.arrCountLetters,
          // data: [],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
          ],
          borderWidth: 1
        }]
      };

      for (let childrenPosts of this.count_list) {
        let arrTwo = [];

        for (let comments of childrenPosts.posts) {

          // console.log( "Comments Post: ", comments.email );
          // console.log( "Comments Post: ", comments );
          

          // const sumText = Object.values(comments.posts).reduce((sum, current)=> { 
          //   return sum + current.length;
          // }, 0)

          const sumText = Object.values(comments.email).reduce((sum, current)=> { 
            return sum + current.length;
          }, 0)

          arrTwo.push( sumText )

        }
        
        const sumPost = arrTwo.reduce((sum, current) => {return sum + current}, 0)

        arrSumComments.push( sumPost );
        // this.myChart.datasets.data = sumPost;
        // this.myChart.labels = arrIdPost;
        arrIdPost.push( "Post " + " " + childrenPosts.id );

        // console.log( "childrenPosts Post: ", childrenPosts );
        // console.log( "childrenPosts Post: ", childrenPosts );

      }

      const newArr = [];

      for (let i = 0; i < arrSumComments.length; i++) {
        newArr.push(arrSumComments[i]);
      }

      this.arrCountLetters = arrSumComments;
      this.arrNumberPostList = arrIdPost;


      testChart.datasets[0].data = arrSumComments;
      testChart.labels = arrIdPost;


      this.myChart = testChart;


      // console.log( "My Chart: ", this.myChart );
      console.log( "Count Lettet comments, res arr: ", typeof arrSumComments, arrSumComments );
      console.log( "Arr Id Post List: ", arrIdPost );
      console.log( "Arr Count Letters: ", newArr );

      console.log( "Arr Count Post List: ", this.arrCountLetters );
      console.log( "Arr Num Post List: ", this.arrNumberPostList );
    },




    // changeProps() {
    //   // this.arrLetterTest = Array.from(this.arrCountLetters);
    //   // this.arrNumberTest = Array.from(this.arrNumberPostList);
    //   let arrLetter = [];
    //   let arrNumber = [];

      

    //   for (let i = 0; i < this.arrCountLetters.length; i++) {
    //     arrLetter.push(this.arrCountLetters[i])
    //   }

    //   for (let j = 0; j < this.arrNumberPostList.length; j++) {
    //     arrNumber.push(this.arrNumberPostList[j])
    //   }

    //   this.arrLetterTestNew = Object.values(arrLetter);
    //   this.arrNumberTestNew = Object.values(arrNumber);

    //   console.log( "----------------------" ); 
    //   console.log( "----------------------" ); 
    //   console.log( typeof this.arrCountLetters, this.arrCountLetters);
    //   console.log( typeof this.arrNumberPostList, this.arrNumberPostList);
    //   console.log( "----------------------" ); 
    //   console.log( typeof arrLetter, arrLetter);
    //   console.log( typeof arrNumber, arrNumber);
    //   console.log( "----------------------" ); 
    //   console.log( typeof this.arrLetterTestNew, this.arrLetterTestNew);
    //   console.log( typeof this.arrNumberTestNew, this.arrNumberTestNew);
    //   console.log( "----------------------" ); 
    //   console.log( "----------------------" ); 
    // },




    changePage(page_num) {
      this.page = page_num;
      this.pagination_offset = (this.pagination_items_per_page * page_num) - this.pagination_items_per_page;

      if (page_num === 1) {
        this.$router.push('/');
      } else {
        this.$router.push(`/?page=${page_num}`);
      }

      this.count_list = this.newPostDate.slice(this.pagination_offset, this.pagination_offset + 10);
      
      window.scrollTo({
        top: 0, 
        left: 0,
        behavior: "smooth"
      });

      this.countLetterComments();

      console.log( "Post Number List: ", Array.from(this.arrNumberPostList) );

      // this.updateChart(this.myChart, this.newLabels, this.arrCountLetters);

      // this.changeTypeArrCountLetters(this.arrCountLetters);
      // this.showChart();
      

      // console.log( "Page number: ", this.page );
      // console.log( "Page offset: ", this.pagination_offset );
    },


    // initChart() {
    //     const ctx = document.getElementById('myChart');

    //     // this.renderChart(Array.from(this.arrCountLetters))

    //     // eslint-disable-next-line no-unused-vars
    //     this.myChart = new Chart(ctx, {
    //     // eslint-disable-next-line no-undef
    //     // this.myChart = Vue.markRaw(new Chart(this.$refs.chart, {
    //     type: 'bar',
    //     data: {
    //       // labels: ['Post', 'Post', 'Post', 'Post', 'Post', 'Post', 'Post', 'Post', 'Post', 'Post'],
    //       labels: this.newLabels,
    //       datasets: [{
    //         label: 'Count letter Email',
    //         // data: [65, 59, 80, 81, 56, 55, 40, 23, 75, 30, 84],
    //         data: this.arrCountLetters,
    //         // data: Array.from(this.arrTest),
    //         backgroundColor: [
    //           'rgba(255, 99, 132, 0.2)',
    //           'rgba(255, 159, 64, 0.2)',
    //           'rgba(255, 205, 86, 0.2)',
    //           'rgba(75, 192, 192, 0.2)',
    //           'rgba(54, 162, 235, 0.2)',
    //           'rgba(153, 102, 255, 0.2)',
    //           'rgba(201, 203, 207, 0.2)',
    //           'rgba(101, 99, 132, 0.2)',
    //           'rgba(176, 159, 64, 0.2)',
    //           'rgba(205, 205, 86, 0.2)',
    //         ],
    //         borderColor: [
    //           'rgb(255, 99, 132)',
    //           'rgb(255, 159, 64)',
    //           'rgb(255, 205, 86)',
    //           'rgb(75, 192, 192)',
    //           'rgb(54, 162, 235)',
    //           'rgb(153, 102, 255)',
    //           'rgb(201, 203, 207)',
    //           'rgba(101, 99, 132)',
    //           'rgba(176, 159, 64)',
    //           'rgba(205, 205, 86)',
    //         ],
    //         borderWidth: 1
    //       }]
    //     },
    //     options: {
    //       scales: {
    //         y: {
    //           beginAtZero: true
    //         }
    //       }
    //     }
    //   });
    // },

    // updateChart(chart, label, data) {
    //   // chart.data.forEach((datalab) => {
    //   //   datalab.labels.push(label);
    //   // });
    //   chart.data.labels = label;
    //   // chart.data.labels.push(label);

    //   // chart.data.datasets.forEach((dataset) => {
    //   //   dataset.data.push(data);
    //   // });
    //   chart.data.datasets[0].data = data;
    //   chart.update();

    //   console.log( "Chart Data: ", chart.data );
    // }

  },

  mounted() {

    // this.initChart();

    // const ctx = document.getElementById('myChart');

    // // this.renderChart(Array.from(this.arrCountLetters))

    // console.log( "create Data:", this.arrCountLetters );

    // // eslint-disable-next-line no-unused-vars
    // const myChart = new Chart(ctx, {
    //   type: 'bar',
    //   data: {
    //     labels: ['Post', 'Post', 'Post', 'Post', 'Post', 'Post', 'Post', 'Post', 'Post', 'Post'],
    //     datasets: [{
    //       label: 'My First Dataset',
    //       // data: [65, 59, 80, 81, 56, 55, 40, 23, 75, 30, 84],
    //       // data: Object.values(this.arrCountLetters),
    //       data: Array.from(this.arrCountLetters),
    //       // data: Array.from(this.arrTest),
    //       backgroundColor: [
    //         'rgba(255, 99, 132, 0.2)',
    //         'rgba(255, 159, 64, 0.2)',
    //         'rgba(255, 205, 86, 0.2)',
    //         'rgba(75, 192, 192, 0.2)',
    //         'rgba(54, 162, 235, 0.2)',
    //         'rgba(153, 102, 255, 0.2)',
    //         'rgba(201, 203, 207, 0.2)'
    //       ],
    //       borderColor: [
    //         'rgb(255, 99, 132)',
    //         'rgb(255, 159, 64)',
    //         'rgb(255, 205, 86)',
    //         'rgb(75, 192, 192)',
    //         'rgb(54, 162, 235)',
    //         'rgb(153, 102, 255)',
    //         'rgb(201, 203, 207)'
    //       ],
    //       borderWidth: 1
    //     }]
    //   },
    //   options: {
    //     scales: {
    //       y: {
    //         beginAtZero: true
    //       }
    //     }
    //   }
    // });

  },

  computed: {
    pagesCount() {
      return Math.ceil(this.pagination_item_total / this.pagination_items_per_page)
    },

    renderChart() {
      console.log( "Chart: ", this.myChart );
      return this.myChart;
    },

    countLettersList() {
      return this.arrCountLetters;
    },

    NumberPostList() {
      return this.arrNumberPostList;
    }

  },

  created() {
    this.axios.get('/posts').then(response => {

      this.postTextDevision(response.data);
      
    }).then(() => {
      this.axios.get('/comments').then(response => {

      this.sortPosts(response.data);
      this.rendomNumberComments(this.mainPostDate);
      this.resetPostData();




      // console.log( "My Chart: ", this.myChart );
      
      // this.countLetterComments();
      // this.changePage(1);
      // this.updateChart(this.myChart, this.newLabels, this.arrCountLetters);

      

      // console.log( this.newPostDate );
      // console.log( typeof Array.from(this.arrCountLetters), Array.from(this.arrCountLetters) );
      // console.log( "Main Data: ", this.mainPostDate );
      // console.log( "Respons Comments Data: ", response.data );
      

      // this.showChart()
      // this.addData(this.arrCountLetters);
    });
    });
  }
}
</script>
