<template>
  <div class="map-container">
    <h1>This is a Map page</h1>
    <div class="map__window">
      <l-map ref="map" v-model="zoom" :center="[49.320788, 31.304999]">
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
        ></l-tile-layer>
      </l-map>
    </div>
  </div>
</template>

<script>
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";

export default {
  components: {
    LMap,
    LTileLayer,
  },
  data() {
    return {
      zoom: 10,
    };
  },
};
</script>

<style></style>