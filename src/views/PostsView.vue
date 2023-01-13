<template>
  <div class="home">
    <div class="posts">
      <h2>Posts</h2>
      <ul >
        <li class="posts__post" v-for="post in count_list" :key="post.id">
          <ul class="mb-3">
            <li> <h3> {{ post.title }} </h3> </li>
            <li class="pl_3">
              <ul>
                <li  v-for="item in post.text" :key="item.id"> {{ item }} </li>
              </ul>
            </li>
            <!-- <li>{{ item.body }}</li> -->
            <li></li>
          </ul>
          <hr />
          <span >Comments</span>

          <ul>
            <li class="posts__comment" v-for="item in post.posts" :key="item.id">
              <h4>User: {{ item.name }}</h4> 
              <ul>
                <li v-for="item in item.posts" :key="item.id"> <i>{{ item }}</i> </li>
              </ul>
            </li>
          </ul>
          <div class="post__counter">
            <div class="post__num"> Counter letters: {{ post.text.length }} </div>
            <div class="post__num"> Post № {{ post.id }} </div>
          </div>
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

export default {
  name: 'PostsView',

  data() {
    return {
      newPostDate: [],
      count_list: [],

      page: 1,
      pagination_offset: 0,
      pagination_item_total: 0,
      pagination_items_per_page: 10
    }
  },

  components: {
   paginate: Paginate
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

      // console.log( "Page number: ", this.page );
      // console.log( "Page offset: ", this.pagination_offset );
    }

  },

  computed: {
    pagesCount() {
      return Math.ceil(this.pagination_item_total / this.pagination_items_per_page)
    },

    // countPosts() {
    //   return this.newPostDate.length;
    // }
  },

  created() {
    this.axios.get('/posts').then(response => {

      this.postTextDevision(response.data);
      // console.log( this.newPostDate );
      this.pagination_item_total = this.newPostDate.length
      // console.log( this.pagination_item_total );

      this.changePage(1);

    });

    this.axios.get('/comments').then(response => {


      // console.log( response.data );
      this.sortPosts(response.data);

      this.rendomNumberComments(this.newPostDate);
      // console.log( this.newPostDate );


    });
  }
}
</script>
