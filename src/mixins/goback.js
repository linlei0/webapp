const goback  = {
  methods: {
  },
  beforeRouteLeave(to,from,next){
    // console.log(this.$route.name)
    this.$store.dispatch('updatechace',this.$route.name)
    next()
  },
}
export { goback }