<template>
  <div  style="height: 85vh; width: 90vw; margin: 0 auto">
    <!-- <leaflet id="map"></leaflet> -->
    <l-map 
      class="map__container"
      v-model="zoom"
      v-model:zoom="zoom"
      :center="[48.592135, 31.964179]"
      @move="log('move')"
      @click.left="addMarker"
    >
      <l-tile-layer 
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></l-tile-layer>
      <!-- <l-control-layers /> -->
      <l-marker :lat-lng="[48.592135, 31.964179]" draggable @moveend="log('moveend')">
        <l-tooltip>
          <h3>Marker to Me</h3>
          <span>48.592135, 31.964179</span>
        </l-tooltip>
      </l-marker>

      <l-marker :lat-lng="[47.41322, -1.219482]">
        <l-icon :icon-url="iconUrl" :icon-size="iconSize" />
      </l-marker>

      <l-marker :lat-lng="[44.971619, 34.116190]" draggable @moveend="log('moveend')">
        <l-popup>
          lol
        </l-popup>
      </l-marker>

      <l-polyline
        :lat-lngs="[
          [47.334852, -1.509485],
          [47.342596, -1.328731],
          [47.241487, -1.190568],
          [47.234787, -1.358337],
        ]"
        color="green"
      ></l-polyline>
      <l-polygon
        :lat-lngs="[
          [46.334852, -1.509485],
          [46.342596, -1.328731],
          [46.241487, -1.190568],
          [46.234787, -1.358337],
        ]"
        color="#41b782"
        :fill="true"
        :fillOpacity="0.5"
        fillColor="#41b782"
      />
      <l-rectangle
        :lat-lngs="[
          [46.334852, -1.509485],
          [46.342596, -1.328731],
          [46.241487, -1.190568],
          [46.234787, -1.358337],
        ]"
        :fill="true"
        color="#35495d"
      />
      <l-rectangle
        :bounds="[
          [46.334852, -1.190568],
          [46.241487, -1.090357],
        ]"
      >
        <l-popup>
          lol
        </l-popup>
      </l-rectangle>
      <l-marker
        if="markers.length != 0" 
        v-for="marker in markers" 
        :key="marker.id"
        :lat-lng="marker.location"
      >
        <l-tooltip>
          <h3> {{ marker.title }} </h3>
          <!-- <span> {{ marker.lat }} {{ marker.lng }} </span> -->
          <!-- <span> {{ marker.location.lat }} | {{ marker.location.lng }} </span> -->
          <!-- <span> {{ marker.location.lat }}, {{ marker.location.lng }} </span> -->
          <span> {{ marker.location[0] }}, {{ marker.location[1] }} </span>
        </l-tooltip>
      </l-marker>
    </l-map>
    <!-- <button @click="changeIcon">New kitten icon</button> -->
    <!-- <button @click="add">New kitten icon</button> -->
  </div>
  <MapModal :show="showModal" :position="positionMarker" @add="createMarker" @close="closeModal"/>
  <!-- <Modal /> -->
</template>

<script>
import {ref} from "vue";

import {
  LMap,
  LIcon,
  LTileLayer,
  LMarker,
  // LControlLayers,
  LTooltip,
  LPopup,
  LPolyline,
  LPolygon,
  LRectangle,
} from "@vue-leaflet/vue-leaflet";

import MapModal from "../components/MapModal.vue";

// import "leaflet/dist/leaflet.css";
// import leaflet from "leaflet";
// import { onMounted } from '@vue/runtime-core';



export default {
  name: 'App',

  components: {
    // leaflet,
    LMap,
    LIcon,
    LTileLayer,
    LMarker,
    // LControlLayers,
    LTooltip,
    LPopup,
    LPolyline,
    LPolygon,
    LRectangle,
    MapModal
  },

  // sutup() {
  //   // eslint-disable-next-line no-unused-vars
  //   let myMap;

  //   onMounted(() => {
  //     myMap = leaflet.map('map').setView([51.505, -0.09], 13);

  //     leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //       maxZoom: 19,
  //       attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  //     }).addTo(myMap);
  //   });

  // },

  data() {
    return {
      zoom: 6,
      iconWidth: 25,
      iconHeight: 40,
      positionMarker: [],
      markers: [{title: 'New', location: [49.85393540370436, 35.27871887296394]}],

      showModal: ref(false),

      // map: leaflet.map('map').setView([51.505, -0.09], 13)

    };
  },

  computed: {
    iconUrl() {
      return `https://placekitten.com/${this.iconWidth}/${this.iconHeight}`;
    },

    iconSize() {
      return [this.iconWidth, this.iconHeight];
    },

    statusModal() {
      return this.showModal;
    }
  },

  methods: {

    log(a) {
      console.log(a);
    },

    changeIcon() {
      this.iconWidth += 2;
      if (this.iconWidth > this.iconHeight) {
        this.iconWidth = Math.floor(this.iconHeight / 2);
      }
    },

    addMarker(e) {
      // let popup = LMap;

      // this.markers.push({
      //   title: '',
      //   location: LMap.latlng()
      // });
      // popup
      //   .setLatLng(e.latlng)
      //   .setContent("You clicked the map at" + e.latlng.toString())
        // .openOn(map)
        // LPopup

        // console.log( popup );


        // console.log( "event: ", e.latlng );


        // console.log( "LMap: ", LMap );
    //     console.log( "LMarker: ", LMarker );
    //     console.log( "LTooltip: ", LTooltip );
    //     console.log( "e.latlng: ", e.latlng );
      // this.markers.push({title: 'My Name', location: e.latlng, lat: e.latlng.lat, lng: e.latlng.lng});
      this.positionMarker = e.latlng;
      // const name = prompt("Name marker", '') 
      this.showModal = true;

      // console.log( "Click new Marker to App, status showModal: ", this.showModal );

      // this.markers.push({title: name, location: Object.values(e.latlng)});

      // console.log( "markers: ", this.markers );

    },

    createMarker(data) {

      this.markers.push({ title: data.title, location: Object.values(data.position)});
      this.showModal = false;

      localStorage.setItem('markersData', JSON.stringify(this.markers));

      console.log( "This is new position Marker: ", data );
      console.log( "markers: ", this.markers );
    },

    closeModal() {
      this.showModal = false;

      console.log( "Change status Modal to App: ", this.showModal );
    },

    alert() {
      console.log( "Hello" );
    },

    add() {
      this.showModal = ref(true);

      console.log( "Click button Add to App, status showModal: ", this.showModal );
    }

  },

  created() {
    this.markers = JSON.parse(localStorage.getItem('markersData'));
  }
};
</script>

<style>
  .map__container {
    z-index: 5!important;
  }

</style>
