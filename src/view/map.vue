<template>
    <div class="_map">
        <div class="amap-page-container">
          <el-amap ref="map"  
          vid="amapDemo" 
          :plugin="plugin"  
          :zoom="zoom" 
          :center="center" 
          :amap-manager="amapManager"
          class="amap-demo" 
          :events="events">
          </el-amap>
        </div>
        <button @touchstart="startplay">开始播放</button>
        <button @touchstart="stopplay">暂停播放</button>
        <button @touchstart="playagin">继续播放</button>
        <button @touchstart="speedplay">加速播放</button>
    </div>
  </template>
 
  <script>  
    import { AMapManager } from "vue-amap"
    import { Toast } from 'mint-ui'
  //  通过amapManager拿到高德原生 AMap.Map
    let amapManager = new AMapManager();  
    export default {
      name: 'Map',
      components: {},
      data() {
        return {
          carcount:0,
          map:null,
          amapManager,
          currIndex: 0,
          zoom: 15,
          content: [],
          showInfo: true,//是否显示窗体
          center: [116.478935,39.997761],//地图中心点
          lineArr:[],//轨迹坐标
          polyline:null,//轨迹路线
          passPolyline:null,
          // 116.397428, 39.90923
          marker: null,//定位图标
          infoWindow:null,//窗体信息
          timer:null,
          times:1000,
          events: {
            // 通过init暴露高德实例
            init: (o) => {
              var vm = this;
              vm.content.push("地址：北京市朝阳区阜通1东");
              vm.map = amapManager.getMap();
              document.getElementsByClassName("amap-logo")[0].style.display = "none";

              var startIcon = new AMap.Icon({
                size: new AMap.Size(100, 32),
                // 图标的取图地址
                image: '/static/images/begin_icon.png',
                // 图标所用图片大小
                imageSize: new AMap.Size(30, 30),
                // 图标取图偏移量
                imageOffset: new AMap.Pixel(0, 0)
              });

              vm.marker = new AMap.Marker({
                position: vm.center,
                icon: startIcon,
                offset: new AMap.Pixel(-13, -30)
              })
              
              vm.infoWindow = new AMap.InfoWindow({
                isCustom: true,  //使用自定义窗体
                autoMove: true,
                content: vm.createInfoWindow(vm.content.join("<br/>")),
                offset: new AMap.Pixel(0,-30)
              });
              vm.polyline = new AMap.Polyline({
                path: vm.lineArr,
                // showDir:true,
                strokeColor: "#28F",  //线颜色
                // strokeOpacity: 1,     //线透明度
                strokeWeight: 6,      //线宽
                // strokeStyle: "solid"  //线样式
              })
              //地图自适应
              vm.map.setFitView();
              // 监听maker点击事件
              AMap.event.addListener(vm.marker, 'click', function () {
                if(!this.showInfo){
                  vm.infoWindow.open(vm.map, vm.center);
                }else{
                  vm.map.clearInfoWindow();
                }
                this.showInfo = !this.showInfo;
              });
              vm.map.add([vm.marker,vm.polyline]);
            },
            // 停止拖拽地图时触发
            "dragend": function(e) {
              //console.log("dragging",e,this.getCenter());
              var point = this.getCenter();
              var pos = [point.lng,point.lat];
            }
          },
          plugin:[{
            pName: 'ToolBar',//工具条插件
            position: 'RB',
          },
          // {
          //   pName: 'MapType',//卫星与地图切换
          //   defaultType: 0,
          //   showTraffic:true,//实时交通图层
          // },
          // {
          //   pName:'OverView',
          //   //isOpen:true//鹰眼是否打开
          // },
          {
            pName:'Scale',//比例尺
          }]
        };
      },
      created(){
        this.lineArr =  [
          [116.478935,39.997761],
          [116.478939,39.997825],
          [116.478912,39.998549],
          [116.478912,39.998549],
          [116.478998,39.998555],
          [116.478998,39.998555],
          [116.479282,39.99856],
          [116.479658,39.998528],
          [116.480151,39.998453],
          [116.480784,39.998302],
          [116.480784,39.998302],
          [116.481149,39.998184],
          [116.481573,39.997997],
          [116.481863,39.997846],
          [116.482072,39.997718],
          [116.482362,39.997718],
          [116.483633,39.998935],
          [116.48367,39.998968],
          [116.484648,39.999861]];
      },
      mounted(){
     
      },
      methods: {
        startplay() {
          this.timer && clearInterval(this.timer);
          if(this.carcount>=this.lineArr.length){//如果估计播放完毕，再次点击时重头播放
            this.carcount = 0;
          }
          this.timer = setInterval(()=>{
            this.center = [this.lineArr[this.carcount].lng,this.lineArr[this.carcount].lat];
            this.marker.setPosition(this.center);
            this.infoWindow.setPosition(this.center);
            // console.log(this.carcount);
            // console.log(JSON.stringify(this.lineArr[this.carcount]));
            this.carcount++;
            if(this.carcount>=this.lineArr.length){//表示轨迹已经播放结束
              Toast({
                message: '轨迹播放完毕',
                position: 'bottom',
                duration: 1500
              });
              clearInterval(this.timer);
              return;
            }
          },this.times)
        },
        stopplay() {
          clearInterval(this.timer);
        },
        speedplay() {
          this.times = 50;
          this.startplay();
        },
        playagin() {
          this.startplay();
        },
        createInfoWindow(content){//创建窗体
          var info = document.createElement("div");
          info.className = "custom-info input-card content-window-card";
          var middle = document.createElement("div");
          middle.className = "info-middle";
          middle.style.backgroundColor = 'white';
          middle.style.padding = '10px 20px';
          middle.innerHTML = content;
          info.appendChild(middle);
          
          // 定义底部内容
          var bottom = document.createElement("div");
          bottom.className = "info-bottom";
          bottom.style.position = 'relative';
          bottom.style.top = '0px';
          bottom.style.margin = '0 auto';
          var sharp = document.createElement("div");
          sharp.className = 'bottom_angle';
          bottom.appendChild(sharp);
          info.appendChild(bottom);
          return info;
        }
      }, 
    };
</script>
<style>
    .amap-page-container {
      height: 500px;
      position: relative;
    }
    .amap-demo {
      width: 100%;
      height: 500px;
    }
    .amap-logo {
        display: none;
     }
    .content-window-card {
      position: relative;
      box-shadow: none;
      bottom: 0;
      left: 0;
      width: auto;
      padding: 0;
    }
    .bottom_angle{
      width:0;
      height:0;
      border-width:10px 8px 0;
      border-style:solid;
      border-color:#fff transparent transparent;/*灰 透明 透明 */
      margin: auto;
      position:relative;
    }
  </style>