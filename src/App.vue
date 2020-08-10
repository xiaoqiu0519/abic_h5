<template>
  <div id="app">
    <router-view/>
    <div class="online">
      <a href="tel:09155800518">
        <img src="./assets/commom/zxkf.png" alt="" srcset="">
        <p class="selectfontcolor">{{Customer[getlanguage]}}</p>
      </a>
    </div>
    <div class="loadingbox" @touchmove.prevent v-if="getloading">
      <img src="./assets/commom/loading.png" alt="">
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name:'App',
  data(){
    return{
      Customer:{
        0:'客服',
        1:'Customer'
      },
      //getloading:1
    }
  },
  computed:{
    ...mapGetters(['getlanguage','getloading'])
  },
  created(){
    
  },
  methods:{
   getcity(){
      if(sessionStorage.getItem('sessioncitydata')){
        this.addressArr = JSON.parse(sessionStorage.getItem('sessioncitydata'))
        return;
      }
      this.$get('/others/getcity').then((res)=>{
          if(res.error == '0000'){
              this.addressArr = res.data
              sessionStorage.setItem('sessioncitydata',JSON.stringify(res.data))
          }
      })
    },
  }
}
</script>
<style lang="stylus">
@-webkit-keyframes rotation{
  from {-webkit-transform: rotate(0deg);}
  to {-webkit-transform: rotate(360deg);}
}
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  font-size 0.14rem
  .online
    position fixed;
    bottom 0.7rem;
    right 0.1rem;
    width 0.5rem;
    height 0.5rem;
    text-align center;
    display flex;
    flex-wrap wrap;
    align-items center;
    justify-content center;
    img 
      width 0.3rem; 
  .loadingbox
    width 100%;
    height 100%;
    position fixed;
    background rgba(0,0,0,0.1);
    left 0;
    top 0;    
    z-index 9999999;
    display flex;
    justify-content center;
    align-items center;
    img
      width 0.4rem;
      -webkit-transform: rotate(360deg);
      animation: rotation 1s linear infinite;
      -moz-animation: rotation 1s linear infinite;
      -webkit-animation: rotation 1s linear infinite;
      -o-animation: rotation 1s linear infinite;
      
.wh_show_bgcolor
  background #ffa54f !important;          
</style>

