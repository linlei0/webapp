const defaultView = 'RoadAssist'
const cacheView = {
  state:{
    chaceList: [defaultView]
  },
  mutations:{
    addchace(state,view){
      state.chaceList.push(view)
      state.chaceList = [...new Set(state.chaceList)]
    },
    updatechace(state,view){
      const index = state.chaceList.indexOf(view)
      //console.log(index)
      if(index>-1){
        state.chaceList.splice(index,1)
      }
    }
  },
  actions:{
    addchace({commit, state},view){
      commit('addchace',view)
    },
    updatechace({commit, state},view){
      commit('updatechace',view)
    }
  }
}
export default cacheView