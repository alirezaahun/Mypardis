<template>
  <div id="my-pardis-mapbox"></div>
</template>

<script>
import mapboxgl from '~/node_modules/mapbox-gl'

export default {
  name: 'MpSelectLocation',
  props: {
    value: {
      type: Array,
      required: false,
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      map: null,
      marker: null,
      accessToken:
        'pk.eyJ1IjoiYWJvbGZhemxiYWtoc2hpMjAyMCIsImEiOiJjazU1NWl5dGcwZDd3M2tsODZudms4d2IwIn0.OL97JSj3ZCW-8BV2ayUHZA',
      defaultLatLng: [51.816166, 35.740819],
      inputValue: [51.816166, 35.740819],
    }
  },
  watch: {
    value: {
      handler(value) {
        setTimeout(() => {
          if (value && value.length) {
            console.log('kjkjkjk: ', value)
            this.inputValue = value
            if (this.map && this.marker) {
              this.updateMarker()
              this.map.flyTo({
                center: [this.inputValue[1], this.inputValue[0]],
                zoom: 13,
              });
            }
          }
        }, 1000)
      },
      immediate: true,
    },
  },
  mounted() {
    if (!this.map) {
      this.initMap()
    }
    if (mapboxgl.getRTLTextPluginStatus() !== 'loaded') {
      mapboxgl.setRTLTextPlugin(
        'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
        null,
        false
      )
    }
    this.map.on('load', () => {
      this.map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
          showUserHeading: true,
        })
      )
      this.marker = new mapboxgl.Marker()
        .setLngLat([this.inputValue[0], this.inputValue[1]])
        .addTo(this.map)
      this.map.on('click', (e) => {
        this.inputValue[0] = e.lngLat.lat
        this.inputValue[1] = e.lngLat.lng
        this.updateMarker()
        this.$emit('input', this.inputValue)
      })
    })
  },
  methods: {
    initMap() {
      this.map = new mapboxgl.Map({
        accessToken: this.accessToken,
        container: 'my-pardis-mapbox',
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [this.inputValue[0], this.inputValue[1]],
        zoom: 13,
      })
    },
    updateMarker() {
      this.marker._lngLat.lat = this.inputValue[0]
      this.marker._lngLat.lng = this.inputValue[1]
      this.marker._update()
    },
  },
}
</script>

<style lang="scss"></style>
