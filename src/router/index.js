import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
Vue.use(Router)

const routes = [{
  path: '/',
  name: 'RoadAssist',
  component: ()=> import('@/view/roadAssist.vue')
}
,{
  path:'/assistList',
  name:'AssistList',
  component:()=>import('@/view/assistList.vue')
},{
  path:'/assistDetails',
  name:'AssistDetails',
  component:()=>import('@/view/assistDetails.vue')
}]

const router = new Router({
  routes,
  scrollBehavior: () => ({ y: 0 }) 
})

router.beforeEach((to,from,next)=>{
  // console.log(to.name)
  store.dispatch('addchace',to.name)
  next()
})

export default router
export {
  routes
}