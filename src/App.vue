<template>
  <div id="app">
    <keepAlive :include="chaceList">
      <router-view/>
    </keepAlive>
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
