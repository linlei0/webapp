<template>
  <div class="assistDetails">
    <app-header :title="title"></app-header>
    <div class="assistDetails-content  margin-top">
      <section v-if="rescuestate==0||rescuestate==1" class="pan-reach">
        <div class="reach-list reach-top">
          <div class="reach-time">
            <span>{{rescuestate==0?'已提交':'提交失败'}}</span>
          </div>
          <!-- <div class="waste-time">路途消耗时间<span class="waste-time-size-big">16分12秒</span></div> -->
        </div>
        <div class="reach-content">
          <p v-show="CCId">单号<span style="display:inline-block;width:2em;margin-left:0"></span><span>{{CCId}}</span></p>
          <p v-show="Createdtime">提交时间<span>{{Createdtime}}</span></p>
          <p v-show="rescuestate==1">关闭时间<span>{{CompleteTime}}</span></p>
        </div>
        <div class="contact-bottom">
          <p v-show="rescuestate==0">您的信息已提交，请等待客服联系您</p>
          <a :href="'tel:'+ServiceTel"><img class="call" src="../assets/images/call.png" alt=""> 联系人工客服</a>
        </div>
      </section>
      
      <section v-else-if="rescuestate==2" class="pan-close">
        <div class="close-list close-top">
          <div class="close">
            <span>{{statedes}}</span>
          </div>
        </div>
        <div class="close-content">
          <p v-show="CCId">单号<span style="display:inline-block;width:2em;margin-left:0"></span><span>{{CCId}}</span></p>
          <p v-show="Createdtime">提交时间<span>{{Createdtime}}</span></p>
          <p v-show="ContactTime">联系时间<span>{{ContactTime}}</span></p>
        </div>
        <div class="close-bottom">
         <a :href="'tel:'+ServiceTel"><img class="call" src="../assets/images/call.png" alt=""> 联系人工客服</a>
        </div>
      </section >

      <section v-else-if="rescuestate==3" class="pan-contact">
        <div class="contact-list contact-top">
          <div class="contact">
            <span>已完成</span>
          </div>
          <!-- <div class="come-time">预计到达时间<span class="come-time-size-big">16分12秒</span></div> -->
        </div>
        <div class="contact-content">
          <p v-show="CCId">单号<span style="display:inline-block;width:2em;margin-left:0"></span><span>{{CCId}}</span></p>
          <p v-show="Createdtime">提交时间<span>{{Createdtime}}</span></p>
          <p v-show="ContactTime">联系时间<span>{{ContactTime}}</span></p>
          <p v-show="CompleteTime">完成时间<span>{{CompleteTime}}</span></p>
        </div>
        <div class="reach-bottom" v-show="rescuestate==3" v-if="isEvaluate==1">
          <mt-button size="small" @click.native="isEvaluate=2" type="primary">评价</mt-button>
        </div>
        <div class="reach-bottom" v-show="rescuestate==3" v-else-if="isEvaluate==2">
          <p class="reach-evaluate">请评价</p>
          <ul>
            <li  v-for="(item,index) in liList"
              :class="[item<=score?'start':'']"
              :key="index"
              @click="selectScore(item)"
              ></li>
          </ul>
          <mt-button size="small" type="primary" @click.native="submit">提交</mt-button>
        </div>
        <div class="reach-bottom" v-show="rescuestate==3" v-else>
          <p class="reach-evaluate">已评价</p>
          <ul>
            <li  v-for="(item,index) in liList" :class="[item<=score?'start':'']" :key="index"></li>
          </ul>
          
        </div>
      </section>

      <section v-else-if="rescuestate==4" class="pan-submit">
        <div class="submit-list submit-top">
          <div class="submit">
            <span>无可用车辆</span>
          </div>
        </div>
        <div class="submit-content">
          <p v-show="CCId">单号<span style="display:inline-block;width:2em;margin-left:0"></span><span>{{CCId}}</span></p>
          <p v-show="Createdtime">提交时间<span>{{Createdtime}}</span></p>
          <p v-show="CompleteTime">关闭时间<span>{{CompleteTime}}</span></p>
        </div>
        <div class="submit-bottom">
          <!-- <p>您的信息已提交，请等待客服联系您</p> -->
         <a :href="'tel:'+ServiceTel"><img class="call" src="../assets/images/call.png" alt=""> 联系人工客服</a>
        </div>
      </section>
      <section v-else>
      </section>
      <footer class="footer-map">
      <el-amap ref="map"  
          vid="amapDemo" 
          :plugin="plugin"  
          :zoom="zoom" 
          :center="center" 
          :amap-manager="amapManager"
          class="amap" 
          :events="events">
          </el-amap>
      </footer>
    </div>
  </div>
</template>
<script>
import appHeader from '@/components/header.vue'
import { AMapManager } from "vue-amap"
import { getAssistDetails,evaluate } from '@/api/roadAssits'
import { Indicator,Toast } from 'mint-ui';
import {goback} from '@/mixins/goback'
// [116.478935,39.997761]  [116.48367,39.998968]
let amapManager = new AMapManager();  
  export default {
    name:'AssistDetails',
    components:{appHeader},
    mixins:[goback],
    data(){
      return {
        ServiceTel:'400-650-6766',//救援电话
        ContactTime:'',//联系时间
        score:0,// 评分
        CompleteTime:'',//完成时间
        Createdtime:'',//提交时间

        isEvaluate:1,// 1.评价按钮 2.评价start 3.已评价
        id:'',
        title:'救援详情',
        liList:[1,2,3,4,5],
       // 0: 救援已申请; 1: 救援申请失败; 2: 正在处理; 3: 已完成; 4: 已关闭
       rescuestate:0,
       statedes:'',// 状态描述
        CCId:'',//工单号
        rescuecar:[],//救援车位置
        pos:[],//故障车位置
        zoom: 15,
        amapManager,
        center: [116.478935,39.997761],//地图中心点
        events: {
            // 通过init暴露高德实例
            init: (o) => {
              this.map = amapManager.getMap();
              document.getElementsByClassName("amap-logo")[0].style.display = "none";
            },
          },
        plugin:[{
            pName: 'ToolBar',//工具条插件
            position: 'RB',
          },{
            pName:'Scale',//比例尺
          }]
      }
    },
    methods:{
      submit(){
        if(this.score<1){
           Toast({
            message: '请选择评分',
            duration: 1500,
            position: 'bottom'
          })
          return
        }
        
        const postData = {
          id:this.id,
          score: this.score + ''
        }
        
        Indicator.open({
          text: '评价中...',
          spinnerType: 'fading-circle'
        })
        evaluate(postData).then(({data})=>{
          
          Indicator.close()
          // 不知道什么原因执行关闭方法后不关闭，执行原生方法强制关闭（后期在优化）
          document.body.querySelector('.mint-indicator').style.display='none'
          if(data.success){
              Toast({
                message: '评价成功',
                iconClass: 'mintui mintui-success',
                duration: 500
              });
            this.isEvaluate = 3
          }else{
            Toast({
              message: data.msg || '评价失败',
              duration: 1500,
              position:'bottom'
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
      },
      selectScore(e){
      this.score = e
      }
    },
    created(){
      
      var driving = new AMap.Driving({
        // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
        policy: AMap.DrivingPolicy.LEAST_TIME
      })
      
      var startLngLat = [116.379028, 39.865042]
      var endLngLat = [116.427281, 39.903719]
      
      driving.search(startLngLat, endLngLat, function (status, result) {
        console.log(status, result)
        // 未出错时，result即是对应的路线规划方案
      })

      this.id = this.$route.params.id
      //this.Createdtime = this.$route.params.CreatedTime
      const postData = {
        id:this.id
      }
      getAssistDetails(postData).then(({data})=>{
        if(data.success){
          //  console.log(3333333333333)
          const result = data.RescueDetail
         console.log(result)
          this.ServiceTel =  result.ServiceTel;//救援电话
          this.score =  result.Score; //评分
          this.isEvaluate = this.score>0?3:this.isEvaluate;
          this.ContactTime =  result.ContactTime; // 联系时间
          this.CompleteTime =  result.CompleteTime;// 完成时间,关闭时间
          this.Createdtime = result.CreatedTime; // 提交时间
          this.rescuestate = result.RescueState; // 状态
          this.statedes = result.StateDes; // 描述
          this.CCId =  result.CCId; // 工单号
          
          this.rescuecar = [result.RescuecarX,result.RescuecarY];//救援车辆位置
          this.pos = [result.PosX,result.PosY]; // 车辆位置
          
          let rescueIcon,rescueMarker,carMarker,posIcon,addMap = []
          rescueIcon = new AMap.Icon({
            size: new AMap.Size(100, 32),
            // 图标的取图地址
            image: './static/images/rescue.png',
            // 图标所用图片大小
            imageSize: new AMap.Size(30, 30),
            // 图标取图偏移量
            imageOffset: new AMap.Pixel(0, 0)
          });
          if(this.rescuecar[0]!=0&this.rescuecar[1]!=0){
        
            rescueMarker = new AMap.Marker({
              position: this.rescuecar,
              icon: rescueIcon,
              offset: new AMap.Pixel(-13, -30)
            })
            addMap.push(rescueMarker)
          }
          
          posIcon = new AMap.Icon({
            image: './static/images/car.png',
            imageSize: new AMap.Size(30, 30),
            // 图标取图偏移量
            imageOffset: new AMap.Pixel(0, 0)
          })
          if(this.pos[0]!=0&&this.pos[1]!=0){
            this.center = [this.pos[0],this.pos[1]]
            // [116.478935,39.997761]
            carMarker = new AMap.Marker({
              position: this.pos,
              icon: posIcon,
              offset: new AMap.Pixel(-13, -30)
            })
            addMap.push(carMarker)
          }
          this.map.add(addMap);

        }else{
          Toast({
            message:data.msg||'请求错误',
            position:"bottom",
            duration:1500
          })
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
</script>

<style lang='scss' scoped>
@import '@/style/config.scss';
%bg_line{
  background-image: url('../assets/images/rescue_line_duan.png');
        background-repeat: no-repeat;
        background-position-y: bottom;
        margin:0 1rem;
}
%top_setting{
  padding:2rem 0 1rem 0;
  font-size: $assistDetails_size;
  margin:0 1rem;
}
%content_setting{
  p{
    padding: .4rem 0;
    font-size: 1.3rem;
    span{
      margin-left: 3rem;
      color: #999999
    }
  };
}
%pan-bg{
  background: #393A3D;
}
%pan-bottom-bg{
  background: #313234;
}
.assistDetails{
  width: 100%;
  height: 100%;
  display: flex;
  display: -webkit-flex;
  color: #fff;
  flex-direction: column;
  .assistDetails-content{
    flex:auto;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    // 已到达
    .pan-reach{
      @extend %pan-bg;
      .reach-list{
        @extend %bg_line;
      }
      .reach-top{
        @extend %top_setting;
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: baseline;
        .reach-time{
          font-size: 2rem;
         
        }
        .waste-time{
           color: #999999;
          .waste-time-size-big{
            font-size: 2.2rem;
            color: #fff;
          }
        }
      }
      .reach-content{
        @extend %content_setting;
        margin: 0 1rem;
      }
       .contact-bottom{
        @extend %pan-bottom-bg;
        padding: 1rem 0;
         text-align: center;
         p{
           color: #999999;
           font-size: 1.2rem;
         }
        a{
          text-decoration: none;
          color: #999999;
          font-size: 1.5rem;
          .call{
            width: 1.5rem;
            height: 1.5rem;
            vertical-align: middle;
          }
        }
      }
    
    }
    // 已关闭
    .pan-close{
       @extend %pan-bg;
      .close-list{
        @extend %bg_line;
      }
      .close-top{
        @extend %top_setting;
        margin: 0 1rem;
        
      }
      .close-content{
        @extend  %content_setting;
        margin: 0 1rem;
      }
      .close-bottom{
         @extend %pan-bottom-bg;
        padding: 1rem 0;
         text-align: center;
        a{
          text-decoration: none;
          color: #999999;
          font-size: 1.5rem;
          .call{
            width: 1.5rem;
            height: 1.5rem;
            vertical-align: middle;
          }
        }
      }
    }
    // 已联系
    .pan-contact{
      @extend %pan-bg;
      .contact-list{
        @extend %bg_line;
      }
      .contact-top{
        @extend %top_setting;
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: baseline;
        .come-time{
          color: #999999;
          .come-time-size-big{
            font-size: 2.2rem;
            color: #fff
          }
        }
      }
      .contact-content{
        @extend  %content_setting;
        margin: 0 1rem;
      }
        .reach-bottom{
       
        text-align: center;
         @extend %pan-bottom-bg;
        .reach-evaluate{
          padding: 1rem;
        color: #999999;
        font-size: $assistDetails_size;
        
        }
        ul{
          display: flex;
          display: -webkit-flex;
          flex-direction: row;
          justify-content:center;
          align-items: center;
          padding: .5rem 0 1rem 0;
          li{
              width: 2.5rem;
              height: 2.5rem;
              background: url('../assets/images/star_h.png') no-repeat;
              background-size: contain;
              margin: 0 .7rem;
              &.start{
                width: 2.5rem;
                height: 2.5rem;
                background: url('../assets/images/star_y.png') no-repeat;
                background-size: contain;
                margin: 0 .7rem;
              }
            }
        }
        .mint-button.mint-button--normal.mint-button--primary{
          height: 3rem;
        }
        .mint-button{
          border-radius: 1.5rem;
          width: 6rem !important;
          margin:1rem 0;
        }
      }
    }

    .pan-submit{
      @extend %pan-bg;
      .submit-list{
        @extend %bg_line;
      }
      .submit-top{
        @extend %top_setting;
        
      }
      .submit-content{
        @extend  %content_setting;
        margin: 0 1rem;
        
      }
      .submit-bottom{
        @extend %pan-bottom-bg;
        p{
          font-size: 1.2rem;
          color: #999999
        }
        padding: 1rem 0;
         text-align: center;
        a{
          text-decoration: none;
          color: #999999;
          font-size: 1.5rem;
          .call{
            width: 1.5rem;
            height: 1.5rem;
            vertical-align: middle;
          }
        }
      }
    }
    .footer-map{
      flex: 1;
      display: flex;
      display: -webkit-flex;
      position: relative;
      .amap{
        width: 100%;
        position:absolute;
        top: 0;
        bottom: 0;
      }
    }
  }
}
</style>