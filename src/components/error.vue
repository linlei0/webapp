<template>
  <div class="request-error">
    <img src="../assets/images/wifi@2x.png" alt="">
    <p>网络不给力</p>
    <mt-button class="submi-btn" type="primary" @click.native="click">点击刷新</mt-button>  
  </div>
</template>

<script>
  export default {
    name:'Error',
    props:{
      click:{
        type:Function,
        default:()=>{}
      }
    }
  }
</script>

<style lang='scss' scoped>
  .request-error{
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    img{
      width: 6rem;
      height: 6rem;
    }
    p{
      color: #fff;
      font-size: 1.3rem;
      margin: .5rem 0;
    }
    .mint-button.mint-button--normal.mint-button--primary{
      height: 3rem;
      background: transparent;
    }
    .mint-button{
      border-radius: 1.5rem;
      width: 7rem !important;
      font-size: 1.3rem;
      color: #585858;
      border: 1px solid #585858
    }
  }
</style>