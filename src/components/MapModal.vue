<template>
  <div class="modal" v-if="show">
    <div class="modal__container">

      <header class="modal__title">
        <h3>Create New Marker</h3>
      </header>
      
      <main>
        <input 
            class="modal__input"
            type="text" 
            placeholder="Enter Marker's name" 
            @keyup.enter="safeTitle"
            v-model="inputTitle"
        >
        <div>
          Position: <span> {{ position.lat }}, {{ position.lng }} </span>
        </div>
      </main>

      <footer class="modal__btn">
        <button @click="createMarker">Create</button>
        <button @click="closeModal">Close</button>
      </footer>

    </div>
  </div>
</template>

<script> 

  // defineProps({
  //   show: Boolean
  // });
  
  export default {
      // "leaflet": "^1.9.3",
  // "@vue-leaflet/vue-leaflet": "^0.7.0",
    
    name: 'MapModal',

    // props: { 'show': Boolean },
    props: [ 'show', 'position' ],

    emits: [ 'close' ],

    data() {
      return {
        inputTitle: '',
        // statusModal: this.show,
        // showModal: true,
        // positionData: this.position,
      }
    },

    methods: {
      safeTitle() {
        console.log( "Input Title: ", this.inputTitle );
        this.inputTitleData = this.inputTitle;
        this.inputTitle = '',
        
        console.log( "Input Title Data: ", this.inputTitleData );
      },

      createMarker() {
        const propsMarker = { title: this.inputTitle, position: this.position };
        this.statusModal = false;
        this.$emit('add', propsMarker);
        this.inputTitle = '';
      },

      closeModal() {
        this.statusModal = false;
        this.$emit('close');

        console.log( "Click button Modal Close, new status: ", this.statusModal ); 
      }
    },

    computed: {
      checkShow() {
        console.log( "Get propertes from App: ", this.statusModal);

        return this.statusModal;
      }
    }

  }

</script>

<style scoped>
  .modal {
    position: fixed;
    display: grid;
    place-items: center;
    inset: 0;
    background: rgba(0, 0, 0, .08);
    z-index: 10!important;
  }

  .modal__container {
    background: white;
    padding: 0.5rem 2rem 1rem 2rem;
    width: 35%;
    max-width: 500px;
    border-radius: 15px;
  }

  .modal__container>:not(:last-child) {
    margin-bottom: 1rem;
  }

  .modal__title {
    display: flex;
    justify-content: center;
  }

  .modal__title h3 {
    margin: 0;
  }

  .modal__input {
    margin-bottom: 1rem;
  }

  .modal__btn {
    display: flex;
    justify-content: space-between;
  }
</style>