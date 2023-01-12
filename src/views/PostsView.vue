<template>
  <div class="home">
    <div class="posts">
      <h2>Posts</h2>
      <ul>
        <li v-for="post in newPostDate" :key="post.id">
          <ul>
            <li> <h3> {{ post.title }} </h3> </li>
            <li class="pl_3">
              <ul>
                <li  v-for="item in post.body" :key="item.id"> {{ item }} </li>
              </ul>
            </li>
            <!-- <li>{{ item.body }}</li> -->
            <li></li>
          </ul>
           <hr />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>


export default {
  name: 'PostsView',

  data() {
    return {
      newPostDate: []
    }
  },

  components: {

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

    }
  },

  created() {
    this.axios.get('/').then(response => {

      this.textDevision(response.data);
      console.log( this.newPostDate );

    });
  }
}
</script>
