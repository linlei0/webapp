
import store from './store'
const href = window.location.href
const hrefParams = href.split('?')[1]
if(hrefParams){
  const paramsList = hrefParams.split('&')
  const o = {}
  paramsList.forEach(element => {
    let key = element.split('=')[0]
    let value = element.split('=')[1]
    o[key] = value
  })
  store.dispatch('update',o)
} else{
  // 调试数据
  store.dispatch('update',{
    token:'688xtx0',
    userid:'ffedf683-ce3c-471b-ba49-2a41db3ae7d9',
    vin:'LNBSCB20180116000'
  })
}

