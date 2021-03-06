// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAMap from 'vue-amap'
import store from './store'
// 手机端插件开发过程中使用发布关闭
// import './vconsole'
import './getHerfParams'

//公共css
import '@/style/index.scss'
//使用按需加载，减少打包体积
import { 
  Button,
  Cell,
  Loadmore,
  Header,
  Spinner,
  Field,
  InfiniteScroll
} from 'mint-ui'

Vue.component(Spinner.name, Spinner);
Vue.component(Button.name, Button)
Vue.component(Cell.name, Cell)
Vue.component(Loadmore.name, Loadmore)
Vue.component(Header.name, Header)
Vue.component(Field.name, Field);
Vue.config.productionTip = false
Vue.use(InfiniteScroll);
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: '5c7fe59c2920194a21ac88bf3b762a49',
  plugin: [
    'AMap.Autocomplete',//输入提示插件
    'AMap.PlaceSearch', //POI搜索插件
    'AMap.Scale',  //右下角缩略图插件 比例尺
    'AMap.OverView',  //地图鹰眼插件
    'AMap.ToolBar', //地图工具条
    'AMap.MapType', //类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
    'AMap.PolyEditor', //编辑 折线多，边形
    'AMap.CircleEditor', //圆形编辑器插件
    "AMap.Geolocation", //定位控件，用来获取和展示用户主机所在的经纬度位置
    "AMap.Driving" //路线规划插件
  ],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
