import Vue from 'vue'
import Vuex from 'vuex'
import cacheView from './module/cache'
import hrefParams from './module/hrefParams'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules:{
    cacheView, 
    hrefParams
  },
  // getters: {state=> state.cacheView.chaceList,}

})
export default store