<script>
import { lineOptions } from '../utils/line-options';
import mapboxgl from 'mapbox-gl';

export default {
  props: {
    map: {
      type: Object,
      required: true
    },
    ...lineOptions
  },
  data: function () {
   return {
     pipe: {}
   };
 },
   mounted() {
    this.pipe = this.data.properties;

    this.map.addSource(`line_${this.data.properties.native_pipe_id}`, {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {
              color:  this.color
            },
            geometry: this.data.geometry
          }
        ]
      }
    });

    this.map.addLayer({
      id: `line_${this.data.properties.native_pipe_id}`,
      type: 'line',
      source: `line_${this.data.properties.native_pipe_id}`,
      paint: {
        'line-width': 3,
        'line-color': this.color
      }
    });

    var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    let m = this.map;
    let p = this.pipe;

    this.map.on('mousemove',`line_${this.data.properties.native_pipe_id}`, function (e) {
        if (e.features.length > 0) {
            var description = e.features[0].properties.year;

            popup.setLngLat(e.lngLat).setHTML("<div class='column'><p>Id: "+p.native_pipe_id+"</p><p>Year: "+p.year+"</p><p>Diameter: "+p.diameter+"</p><p>Material: "+p.material_type_code+"</p></div>").addTo(m);
        }
    });

    this.map.on('mouseleave', `line_${this.data.properties.native_pipe_id}`, function() {
        popup.remove();
    });
  },
  render() {}
};
</script>


<style scoped>
.column{
    min-width:120px;
    display: flex;
    flex-direction: column;
}
</style>
