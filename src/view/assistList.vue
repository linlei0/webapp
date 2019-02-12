<template>
  <div>
   <app-header :title="title"></app-header>
   <div  class="assist-content margin-top" v-if="!showAgian">
     <ul class="assist-list-ul">
       <li class="assist-list-li" v-for="(item,index) in assistList" :key="index" @click="toAssistDetails(item)">
         <div class="assist-pan list-top">
           <span>{{item.FaultDes}}</span>
           <span class="handle-type">{{item.RescueState | switchType}}</span>
         </div>
         <div class="assist-pan list-bottom">
           <span>提交时间:{{item.CreatedTime }}</span>
         </div>
       </li>
     </ul>
   </div>
   <app-error v-else :click="getAssistList"></app-error>
  </div>
</template>

<script>
import appHeader from '@/components/header.vue'
import appError from '@/components/error.vue'
import { Toast } from 'mint-ui';
import {getAssistList} from '@/api/roadAssits'
import {goback} from '@/mixins/goback'
  export default {
    name:'AssistList',
    components:{appHeader,appError},
    mixins:[goback],
    data(){
      return {
        title:'救援列表',
        showAgian:false,
        assistList:[]
      }
    },
    filters:{
      switchType(e){
        switch(e){
          case '0':
          return '已提交';
          case '1':
          return '已关闭';
          case '2':
          return '处理中';
          case '3':
          return '已完成';
          case '4':
          return '已关闭';
        }
      }
    },
    computed:{
    userInfo(){
        return this.$store.state.hrefParams.userData
      } 
    },
    created(){
      const {userid} = this.$store.state.hrefParams.userData
      this.userid = userid
      this.getAssistList()
    },
    methods:{
      toAssistDetails(e){
        this.$router.push({name:'AssistDetails',params:{id:e.Id}})
      },
      getAssistList(){
        const postData = {
          userid:this.userid
       }
       getAssistList(postData).then(({data})=>{
        if(data.success){
          console.log(data)
          this.showAgian = false
          this.assistList = data.rescueItems
        }else{
          if(data.state==19||data.state==20){
          
          }else{
            this.showAgian = true
          }
          Toast({
            message: data.msg,
            position:"bottom",
            duration: 1500
          });
        }
       })
       .catch(error=>{
          Toast({
              message: '请求超时',
              position:'bottom',
              duration: 1500
            });
           Indicator.close()
        })
      }
    }
  }
</script>

<style lang='scss' scoped>
.assist-content{
  color: #fff;
  margin-top: 5.5rem;
  .assist-list-ul{
    .assist-list-li{
      background: #333436;
      margin-top: 1rem;
      // box-shadow: 0 0 1px red;
      &:first-child{
        margin-top: 1.5rem;
      }
      .assist-pan{
        padding:1rem 0;
        margin-left: 1rem;
        box-sizing: border-box;
        &.list-top{
         background: url('../assets/images/rescue_line_duan.png') no-repeat;
         background-position-y: bottom;
         span{
           font-size: 1.2rem;
         }
        }
        &.list-bottom{
           color: #999999;
           font-size: 1.2rem;
        }
        position: relative;
        .handle-type{
          position: absolute;
          right: 1rem;
          color: #999999
        }
      }
    }
  }

}

</style>