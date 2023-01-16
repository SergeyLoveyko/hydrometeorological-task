<template>
  <div class="home">
    <canvas id="myChart" class="myChart"></canvas>
    <div class="posts">
      <h2>Posts</h2>
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
import Chart from 'chart.js/auto';

export default {
  name: 'PostsView',

  data() {
    return {
      newPostDate: [],
      count_list: [],
      arrCountLetters: [],
      arrTest: [10, 5, 29, 3, 5, 55, 40, 23, 75, 480],

      page: 1,
      pagination_offset: 0,
      pagination_item_total: 0,
      pagination_items_per_page: 10
    }
  },

  components: {
   paginate: Paginate,
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

      this.newPostDate = arr;
    },

    sortPosts(commentsData) {
      for (let comment of commentsData) {
        this.newPostDate[comment.postId - 1].posts.push({name: comment.name, posts: comment.body.split('\n')})
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

    countLetterComments() {
      let arrSumComments = [];

      for (let childrenPosts of this.count_list) {
        let arrTwo = [];

        for (let comments of childrenPosts.posts) {

          const sumText = Object.values(comments.posts).reduce((sum, current)=> { 
            return sum + current.length;
          }, 0)

          arrTwo.push( sumText )

        }
        
        const sumPost = arrTwo.reduce((sum, current) => {return sum + current}, 0)

        arrSumComments.push( sumPost )

      }

      this.arrCountLetters = Array.from(arrSumComments);

      console.log( "Count Lettet comments, res arr: ", typeof arrSumComments, arrSumComments );
    },

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
      // this.changeTypeArrCountLetters(this.arrCountLetters);
      // this.showChart();
      

      // console.log( "Page number: ", this.page );
      // console.log( "Page offset: ", this.pagination_offset );
    },

    showChart() {
        const ctx = document.getElementById('myChart');

        // this.renderChart(Array.from(this.arrCountLetters))

        // eslint-disable-next-line no-unused-vars
        const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Post', 'Post', 'Post', 'Post', 'Post', 'Post', 'Post', 'Post', 'Post', 'Post'],
          datasets: [{
            label: 'My First Dataset',
            // data: [65, 59, 80, 81, 56, 55, 40, 23, 75, 30, 84],
            // data: Object.values(this.arrCountLetters),
            data: Array.from(this.arrCountLetters),
            // data: Array.from(this.arrTest),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }

  },

  // mounted() {


  //   const ctx = document.getElementById('myChart');

  //   // this.renderChart(Array.from(this.arrCountLetters))

  //   console.log( "create Data:", this.arrCountLetters );

  //   // eslint-disable-next-line no-unused-vars
  //   const myChart = new Chart(ctx, {
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
  // },

  computed: {
    pagesCount() {
      return Math.ceil(this.pagination_item_total / this.pagination_items_per_page)
    }
  },

  created() {
    this.axios.get('/posts').then(response => {

      this.postTextDevision(response.data);

      this.pagination_item_total = this.newPostDate.length

      this.changePage(1);

    }).then(() => {
      this.axios.get('/comments').then(response => {


      // console.log( response.data );

      this.sortPosts(response.data);
      this.rendomNumberComments(this.newPostDate);
      this.countLetterComments();
      this.changePage(1);

      // console.log( this.newPostDate );
      console.log( this.count_list );
      console.log( typeof Array.from(this.arrCountLetters), Array.from(this.arrCountLetters) );
      console.log( typeof Array.from(this.arrTest), Array.from(this.arrTest) );

      this.showChart()
    });
    });
  }
}
</script>
