<template>
  <div class="road-assist">
    <app-header :title="title"></app-header>
    <div class="road-content margin-top">
      <div class="road-content-list">
        <h2 class="list-title">事故类型</h2>
        <div class="btn-list">
          <mt-button 
          v-for="(item,index) in accidentTypeList" 
          @click.native="handleType(item)"
          :key="index" size="small" 
          :type="item.type">{{item.name}}</mt-button>
        </div>
      </div>
      <div class="road-content-list">
        <h2 class="list-title">事故发生时间</h2>
        <div class="btn-list">
          <mt-button 
          v-for="(item,index) in  accidentTimeList" 
          @click.native="handleTime(item)"
          :key="index" size="small" 
          :type="item.type">{{item.name}}</mt-button>
        </div>
      </div>
      <div class="road-content-list">
        <h2 class="list-title">备注</h2>
        <div class="road-assits-remark">
          <mt-field placeholder="备注" :attr="{ maxlength: 64 }" type="textarea" rows="4" v-model="remark"></mt-field>
          <p class="number-title"><span>{{remark.length||0}}</span>/64</p>
        </div>
      </div>
      <div class="road-footer">
        <mt-button class="submi-btn" type="primary" @click.native="submit">道路救援</mt-button>
        <span class="rescue-order" @click="toAssistList">我的救援订单></span>
      </div>
    </div>
  </div>
</template>

<script>
import appHeader from '@/components/header.vue'
import {addRoadAssist} from '@/api/roadAssits'
import { Indicator,Toast } from 'mint-ui';
  export default {
    name:'RoadAssist',
    components:{appHeader},
    data(){
      return {
        title:'道路救援',
        accidentType:'',
        accidentTypeList:[ // default：未选中颜色  primary：选中颜色
          {name:'交通事故',type:"default",index:0},
          {name:'火灾',type:"default",index:1},
          {name:'淹水',type:"default",index:2},
          {name:'其他',type:"default",index:3}
        ],
        accidentTime:'',
        accidentTimeList:[
          {name:'5分钟内',type:"default",index:0},
          {name:'20分钟内',type:"default",index:1},
          {name:'1小时内',type:"default",index:2},
          {name:'3小时内',type:"default",index:3},
          {name:'其他',type:"default",index:4},
        ],
        remark:'',
        id:'',
        //CreatedTime:''
      }
    },
    computed:{
      userInfo(){
        return this.$store.state.hrefParams.userData
      } 
    },
    methods:{
      toAssistList(){
        this.$router.push({name:'AssistList'})
      },
      handleType(e){
          this.accidentType = this.select(this.accidentTypeList,e)
      },
      handleTime(e){
        this.accidentTime = this.select(this.accidentTimeList,e)
      },
      select(list,e){
        let result = ''
        for(let i=0;i<list.length;i++){
          if(e.index===list[i].index){
            if(e.type==='primary'){
              e.type = 'default'
              result = ''
            }else if(e.type==='default'){
              e.type= 'primary'
              result = e.index
            }else{
            }
          }else{
            list[i].type="default"
          }
        }
        return result
      },
      submit(){
        if(typeof this.accidentType === 'string'){
          Toast({
            message: '请选择事故类型',
            duration: 1500,
            position: 'bottom'
          })
          return 
        }
        if(typeof this.accidentTime === 'string'){
          Toast({
            message: '请选择事故发生时间',
            duration: 1500,
            position: 'bottom'
          })
          return 
        }
        const {userid,vin} = this.userInfo
        const postData = {
          userid,
          vin,
          faulthappenedtime:this.accidentTime*1 + 1,// 发生时间
          faultdes: this.accidentTypeList[this.accidentType].name,// 事故类型
          comments:this.remark // 备注
        }
        Indicator.open({
          text: '提交中...',
          spinnerType: 'fading-circle'
        })
        addRoadAssist(postData).then(({data})=>{
          console.log('返回数据')
          console.log(data)
          if(data.success){
            this.id = data.id
            Indicator.close()
            Toast({
              message: '提交成功',
              iconClass: 'mintui mintui-success',
              duration: 500
            });
            setTimeout(()=>{
               this.$router.push({name:'AssistDetails',params:{id:this.id}})
            },500)
          }else{
            
             Toast({
              message: data.msg,
              position:'bottom',
              duration: 1500
            });
            Indicator.close()
          }
        })
        .catch(error=>{
          console.log('返回数据')
          console.log(error)
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
@import '@/style/config.scss';
.road-assist{
  width: 100%;
  height: 100%;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
.road-content{
  flex: 1;
  padding: 1.4rem;
  .road-content-list{
    h2.list-title{
      background: url('../assets/images/rescue_icon.png') no-repeat;
      background-size: contain;
      background-position: 0 center;
      text-align: left;
      text-indent: 1rem;
      color: $white_color;
      font-size:$roadAssist_h2_size;
      font-weight: 400;
      display: block;
    }
  }
  .btn-list{
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 2rem 0 1rem 0;
    .mint-button--default{
      background: #666666;
      color: #fff;
      
    }
    .mint-button--small{
      height: 2.4rem;
      margin-right: 1rem;
      margin-bottom: 1rem
    }
  }
  .road-assits-remark{
    margin-top: 2rem;
    position: relative;
    .number-title{
      font-size: 1.2rem;
      color: #666666;
      position:absolute;
      right: .5rem;
      bottom: .5rem;
    }
  }
  .road-footer{
    margin-top: 2rem;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
      .mint-button.mint-button--normal.mint-button--primary{
        width: 18rem !important;
        height: 3.3rem;
      }
      .rescue-order{
        color: #666666;
        font-size: 1.3rem;
        margin-top: 1.2rem;
      }
  }
}
}

</style>