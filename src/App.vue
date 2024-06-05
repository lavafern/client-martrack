<template>
  <div id="app">
    <appMap></appMap>
    <!-- <appMap2></appMap2> -->
  </div>
</template>

<script>
import appMap from './components/map/appMap.vue'
// import appMap2 from './components/map2/appMap2.vue'

export default {
  name: 'App',
  components: {
    appMap,
    // appMap2,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
