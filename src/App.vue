<template>
  <div id="app">
  <!--  onselectstart="return false" -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  @import '../static/css/base.css';
  @import '../static/css/font-awesome.min.css';

  @font-face {
    font-family: PingFang;
    src: url('assets/fonts/PingFangSC/PingFang Medium.ttf');
  }
  body {
    font-family: PingFang;
  }
</style>
<style lang='sass'>
  @import './assets/main.scss';
  /*@import '../static/scss/font-awesome.scss';*/

  #app 
    padding: 20px 50px;
    color: #424e67;
    font-size: 14px;

</style>
