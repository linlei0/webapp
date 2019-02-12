
import store from './store'
const href = window.location.href
console.log(href)
//.split('#')[0]
const hrefSplit = href.split('?')[1]
let hrefParams = ''
if(hrefSplit.indexOf("#")>-1){
  hrefParams = href.split('?')[1].split('#')[0]
}else{
  hrefParams = hrefSplit
}
if(hrefParams){
  const paramsList = hrefParams.split('&')
  const o = {}
  paramsList.forEach(element => {
    let key = element.split('=')[0]
    let value = element.split('=')[1]
    o[key] = value
  })
  console.log(o)
  store.dispatch('update',o)
} else{
  // 调试数据
  store.dispatch('update',{
    token:'688xtx0',
    userid:'ffedf683-ce3c-471b-ba49-2a41db3ae7d9',
    vin:'LNBSCB20180116000'
  })
}

