<template>
  <div class="root">
    <div ref="mapboxMap" class="map" />
    <template v-if="isReady">
      <slot :map="map" />
    </template>
  </div>
</template>

<script>

import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import { mapOptions } from '../utils/map-options';
import { store } from '../utils/store';


export default {
props: {
   ...mapOptions
 },

data: function() {
  return {
    map: null,
    isReady: false
  };
},
computed: {
    mapCenter() {
      return store.mbglCenter;
    }
  },
  watch: {
    mapCenter(coordinates) {
      this.map.jumpTo({ center: coordinates });
    }
  },
  mounted() {
    this.initializeMap();
  },
  methods: {
  initializeMap() {
    var vm = this;

    const mapContainer = this.$refs.mapboxMap;

    mapboxgl.accessToken = 'pk.eyJ1IjoiZnJhY3RhdGVzdHMiLCJhIjoiY2tnaWd3NW10MDAzNDJzcnJuNzVrNGd5cSJ9.6pV_QFxNJE22pj4-uKCjpQ';

    this.map = new mapboxgl.Map({
      container: mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: 13,
      maxZoom: this.maxZoom,
      minZoom: this.minZoom,
      tolerance: 0.6,
      buffer: 24
    });

    this.map.on('styledata', function () {
      if(!vm.isReady) {
        vm.isReady = true;
      }
    });

    let m = this.map;

    this.map.on('load', function () {
        m.on('mousemove', 'state-fills', function (e) {
            console.log(e)
        });
    });
  },

  }
};
</script>

<style scoped>
.map {
  width: 100%;
  height: 100%;
}
</style>
