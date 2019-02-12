<template>
  <div id="app">
    <!-- :include="chaceList" -->
   
      <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed:{
    chaceList(){
      console.log(this.$store.state.cacheView.chaceList)
      return this.$store.state.cacheView.chaceList
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  height: 100%;
  width:100%;
 overflow: auto;
}
</style>
