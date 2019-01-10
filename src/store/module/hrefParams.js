const hrefParams = {
  state:{
    userData:{
      token:'',
      userid:'',
      vin:''
    }
  },
  mutations:{
    update(state,data) {
      state.userData = {...state.userData,...data}
    },
  },
  actions:{
    update({commit},data){
      commit('update',data)
    }
  }
 
}
export default hrefParams