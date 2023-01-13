<template>
  <div class="home">
    <div class="posts">
      <h2>Posts</h2>
      <ul>
        <li v-for="post in count_list" :key="post.id">
          <ul class="mb-3">
            <li> <h3> {{ post.title }} </h3> </li>
            <li class="pl_3">
              <ul>
                <li  v-for="item in post.body" :key="item.id"> {{ item }} </li>
              </ul>
            </li>
            <!-- <li>{{ item.body }}</li> -->
            <li></li>
          </ul>
          <div class="post__counter">
            <div class="post__num"> Counter letters: {{ post.body.length }} </div>
            <div class="post__num"> Post № {{ post.id }} </div>
          </div>
           <hr />
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
    textDevision(postsDate) {
      let arr = []

      for(let post of postsDate) {

        const obj = {};

        obj.userId = post.userId;
        obj.id = post.id;
        obj.title = post.title;
        obj.body = post.body.split('\n');

        arr.push(obj);
        
      }

      this.newPostDate = arr;
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
      // windows.scrollTO(0, 0);

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
    this.axios.get('/').then(response => {

      this.textDevision(response.data);
      // console.log( this.newPostDate );
      this.pagination_item_total = this.newPostDate.length
      // console.log( this.pagination_item_total );

      this.changePage(1)

    });
  }
}
</script>
