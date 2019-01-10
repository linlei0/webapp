<template>
  <div class="app-header">
    <mt-header :title="title" :fixed="true">
      <router-link to="" slot="left" v-show="show">
        <mt-button icon="back" @click.native="goback"></mt-button>
      </router-link>
    </mt-header>
  </div>
</template>

<script>
  export default {
    name:'Header',
    data(){
      return {}
    },
    props:{
      title:{
        type:String,
        default:''
      },
      show:{
        type:Boolean,
        default:false
      }
    },
    methods:{
      goback(){
        this.$store.dispatch('updatechace',this.$route.name)
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>

</style>