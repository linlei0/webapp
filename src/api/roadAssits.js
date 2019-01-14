import request from '@/lib/request';
import store from '@/store'
// 获取token
const {token,userid} = store.state.hrefParams.userData

/**
 * 新增道路救援
 * @param {*} data 
 */
function addRoadAssist(data) {
  data.token = token
  data.userid = userid
  let Signature = ''
 for(let o in data){
   if(o!='comments'){
    Signature+=data[o]
   }
 }
 data.Signature = Signature
  //const  
  console.log(data)
  return request({
    url: 'Rescue/add/',
    method:'post',
    data
  })
}

/**
 * 获取道路救援列表
 * @param {*} data 
 */
function getAssistList(data){
  data.token = token
  data.userid = userid
  let Signature = ''
  for(let o in data){
    Signature+=data[o]
  }
  data.Signature = Signature
  return request({
    url:'Rescue/list/',
    method:'post',
    data
  })
}
/**
 * 获取救援工单详情
 * @param {*} data 
 */
function getAssistDetails(data){
  data.token = token
  data.userId = userid
  let Signature = ''
  Signature = data.id + data.userId+ data.token
  data.Signature = Signature
  console.log(data)
  return request({
    url:'Rescue/detail/',
    method:'post',
    data
  })
}
/**
 * 评价
 * @param {*} data 
 */
function evaluate(data){
  data.token = token
  data.userId = userid
  let Signature = ''
  // for(let o in data){
  //   Signature+=data[o]
  // }
  Signature = data.id + data.userId + data.score + data.token
  data.Signature = Signature
  return request({
    url:'Rescue/score/',
    method:'post',
    data
  })
}

export{
  addRoadAssist,
  getAssistList,
  getAssistDetails,
  evaluate
}