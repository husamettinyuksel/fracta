<template>
  <div id="app" class="root">
    <div class="banner">
        <button class="button" v-on:click="detectBy('year')">Detect By Year</button>
        <button class="button" v-on:click="detectBy('diameter')">Detect By Diameter</button>
        <button class="button" v-on:click="detectBy('material_type_code')">Detect By Material</button>
        <button class="button" v-on:click="randomlyUpdate">Update Year Randomly</button>
    </div>
    <Map id="map" ref="mapRef" v-bind="mapOptions">
        <template slot-scope="{ map }">
            <MapLine v-for="line in lineData" :data="line" :id="line.properties.native_pipe_id" :key="line.properties.native_pipe_id" :map="map" />
        </template>
    </Map>
  </div>
</template>

<script>
import Map from './components/Map.vue'
import MapLine from './components/MapLine.vue'
import {MAP_STYLE} from './utils/constants'
import axios from 'axios';

export default {
  name: 'App',
  components: {
    Map,
    MapLine
  },
  data: function () {
   return {
     mapOptions: {
       mapStyle: MAP_STYLE,
     },
     lineData: [],
     colorMap: {}
   };
 },
 mounted(){
    this.loadInitialMap();
 },
 methods: {
    loadInitialMap() {
        this.colorMap = {};

        axios.get("pipes.json")
            .then(res => {
                this.lineData = res.data.features;
        });
   },
   detectBy(param){
    this.colorMap = {};
    const r = () => Math.floor(256 * Math.random());

    this.lineData.map(line => {
        if(!this.colorMap[line.properties[param]]){
            this.colorMap[line.properties[param]] = `rgb(${r()}, ${r()}, ${r()})`;
        }

        this.$refs.mapRef.map.setPaintProperty(`line_${line.properties.native_pipe_id}`, 'line-color', this.colorMap[line.properties[param]]);
    });

   },
   randomlyUpdate(){
        var randomIndex = Math.floor(Math.random() * Math.floor(this.lineData.length));
        var item = this.lineData[randomIndex];
        var newYear = Math.floor(Math.random() * (2020 - 1960) + 1960);
        item.properties.year = newYear;
   }
 }
}
</script>

<style scoped>
#app{
    display: flex;
    flex-direction: column;
}

#map {
flex: 1 1 auto;
overflow: auto;
}

#banner{
  width: 100%;
  display: flex;
  flex-direction: row;
}

.button {
    padding:10px;
    background-color: #1aa832;
    color: white;
    border: 1px solid #ccc;
}

</style>
