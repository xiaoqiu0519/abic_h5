<template>
  <div class="home">
    <header>
     <img class="logo" src="../assets/index/abiclogo.png" alt="" srcset="">
     <translation></translation>
    </header>
    <div class="houseimg">
        <Swiper :options="swiperOption">
            <swiper-slide v-for="(item,index) in sloganArr" :key="index">
              <div class="swiperimg">
                <img :src="item.img">
              </div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </Swiper>
    </div>
    <div class="navcon">
     <div class="list" @click="clicknav(index)"
        v-for="(item,index) in context.navtype[getlanguage]" :key="index">
        <p><img :src="navarrimg[index]" alt=""></p>
        <p>{{item}}</p>
      </div>
    </div>
    <div class="typelist" v-if="fcjyArr&& fcjyArr[getlanguage] && fcjyArr[getlanguage].length != 0">
      <p class="title" @click="clicknav(0)">
        <span class="type">{{context.fcjy[getlanguage].type}}</span>
        <!-- <span class="slogan">{{context.fcjy[getlanguage].slogan}}</span> -->
        <img class="more" src="../assets/commom/right(2).png" alt="" srcset="">
      </p>
      <houselist :housedata = 'fcjyArr'></houselist>
    </div>
    <div class="typelist" v-if="fczlArr && fczlArr[getlanguage] && fczlArr[getlanguage].length !=0">
      <p class="title"  @click="clicknav(1)">
        <span class="type">{{context.fczl[getlanguage].type}}</span>
        <!-- <span class="slogan">{{context.fczl[getlanguage].slogan}}</span> -->
        <img class="more" src="../assets/commom/right(2).png" alt="" srcset="">
      </p>
      <houselist :housedata = 'fczlArr'></houselist>
    </div>
    <div class="typelist" v-if="tjfyArr && tjfyArr[getlanguage] && tjfyArr[getlanguage].length !=0">
      <p class="title"  @click="clicknav(2)">
        <span class="type">{{context.tjyy[getlanguage].type}}</span>
         <!-- <span class="slogan">{{context.tjyy[getlanguage].slogan}}</span> -->
        <img class="more" src="../assets/commom/right(2).png" alt="" srcset="">
      </p>
      <houselist :housedata = 'tjfyArr'></houselist>
    </div>
    <div class="cityshadebox" v-if="selectflag">
      <div class="content">
        <div class="title">
          <span>{{context.areatitle[getlanguage]}}</span>
          <img @click="sharebtn()" class="closed" src="../assets/commom/close1.png" alt="">
        </div>
        <div class="list">
          <div class="left">
            <div :class="{'selectfontcolor':selectcityindex == index}"
              @click="selectcity(list,index)" 
              v-for="(list,index) in addressArr[getlanguage]" :key="index">
              {{list.label}}
            </div>
          </div>
          <div class="right">
            <div :class="{'selectfontcolor':selectaddressindex==index}" 
              @click="selectaddress(list,index)"
              v-for="(list,index) in addressArr[getlanguage][selectcityindex].children" :key="index">
              {{list.label}}
            </div>
          </div>
        </div>
        <div class="btn">
          <div class="clear" @click="clearbtn()">{{getlanguage == 0 ? '清空' : 'Clear'}}</div>
          <div class="share" @click="sharebtn()">{{getlanguage == 0 ? '确定' : 'Ok'}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import {mapGetters, mapActions } from 'vuex'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import translation from '../components/translation' 
import houselist from '../components/housemes';
// import Nodata from '../components/nodata'
export default {
  name: 'Home',
  data(){
    return{
      addressname:'',
      cityname:'',
      cityvalue:'',
      addressvalue:'',
      citylist:[],
      addressArr:{},
      fcjyArr:[],
      fczlArr:[],
      tjfyArr:'',
      selectcityindex:'0',
      selectaddressindex:'0',
      navarrimg:[
        require('../assets/index/fcjy.png'),
        require('../assets/index/fwfc.png'),
        require('../assets/index/tjfy.png'),
        require('../assets/index/zxsq.png'),
        require('../assets/index/zxfx.png'),
        require('../assets/index/tcxz.png'),
        require('../assets/index/swhz.png'),
        require('../assets/index/gywm.png'),
      ],
      selectflag:false,
      cityparams:'',
      housedata:'',
      sloganArr:[
        {
          img:require('../assets/index/1.jpg'),
          txt:{
            0: '诚信所以简单，专业所以放心',
            1: 'Itegrity and professional make you feel easy and relax'
          }
        },
        {
          img:require('../assets/index/2.jpg'),
          txt:{
            0: '轻松购房，交易无忧',
            1: 'Easy transaction , Worry free'
          }
        },
        {
          img:require('../assets/index/3.jpg'),
          txt:{
            0: '搜你所求，安心入住',
            1: 'Rent it , Hassle free'
          }
        },
        {
          img:require('../assets/index/4.jpg'),
          txt:{
            0: '机不可失，物超所值',
            1: 'Worthy to buy ,No hidden charge'
          }
        }
      ],
      swiperOption: {//swiper3
        pagination: {
          el: '.swiper-pagination'
        },
        autoplay: 3000,
        speed: 1000,
      }
    }
  },
  computed:{
    ...mapGetters(['getlanguage','layoutArr'])
  },
  components:{
    translation,
    houselist,
    Swiper,
    SwiperSlide
    //Nodata
  },
  mounted(){
    this.cityparams = this.cityvalue + '-' +this.addressvalue
    // this.getcity();
    this.init();
  },
  methods: {
    ...mapActions(['cityparamsstoreAsy']),
    selectaddressfun(list){
      this.addressname[this.getlanguage] = list;
      this.selectflag = false;
    },
    init(){
      this.gethouselist({
        pageNum: 1,
        pageSize: 1,
        params:JSON.stringify({type:1,status:1,city:this.cityparams})
      });
      this.gethouselist({
        pageNum: 1,
        pageSize: 1,
        params:JSON.stringify({type:2,status:1,city:this.cityparams})
      });
      this.gethouselist({
        pageNum: 1,
        pageSize: 1,
        params:JSON.stringify({type:3,status:1,city:this.cityparams})
      });
    },
    getcity(){
      if(sessionStorage.getItem('sessioncitydata') && sessionStorage.getItem('cityparams')){
        this.addressArr = JSON.parse(sessionStorage.getItem('sessioncitydata'));
        this.cityname = JSON.parse(sessionStorage.getItem('cityparams')).cityname;
        this.addressname = JSON.parse(sessionStorage.getItem('cityparams')).addressname;
        this.cityparams = JSON.parse(sessionStorage.getItem('cityparams')).cityparams
        this.cityvalue = this.cityparams.split('-')[0] || '';
        this.addressvalue = this.cityparams.split('-')[1] || '';
        this.selectcityindex = this.cityvalue || 0;
        this.selectaddressindex = this.addressvalue;
        return;
      }
      this.$get('/others/getcity').then((res)=>{
          if(res.error == '0000'){
              this.addressArr = res.data
              sessionStorage.setItem('sessioncitydata',JSON.stringify(res.data))
              this.cityname = this.addressArr[this.getlanguage][0].label;
          }
      })
    },
    gethouselist(params){
      this.loadingflag(true)
      this.$post('/house/houselist',params).then((res)=>{
        this.loadingflag(false)
          if(res.error == '0000'){
            let type = JSON.parse(params.params).type
            switch(type){
              case 1:
                this.fcjyArr = res.data
                break;
              case 2:
                this.fczlArr = res.data
                break;
              case 3:
                this.tjfyArr = res.data
                break;    
            }
          }
      })
    },
    selectcity(list,index){
      this.cityname = list.label;
      this.addressname = list.children[0].label;
      this.selectaddressindex = 0;
      this.addressvalue = list.children[0].value;
      this.selectcityindex = index;
      this.cityvalue = list.value;

    },
    selectaddress(list,index){
      this.selectaddressindex = index;
      this.addressname = list.label;
      this.addressvalue = list.value
    },
    selectflagfun(){
      this.selectflag = true;
    },
    sharebtn(){
      this.selectflag = false;
      this.cityparams = this.cityvalue + '-' +this.addressvalue
      this.cityparamsstoreAsy(this.cityparams)
      sessionStorage.setItem('cityparams',JSON.stringify({
        cityparams:this.cityparams,
        cityname:this.cityname,
        addressname:this.addressname
      }))
      this.init();
    },
    clearbtn(){
      this.selectcityindex = 0;
      this.selectaddressindex = 0;
      this.cityname = this.getlanguage == 0 ? '不限' : 'All';
      this.addressname = '';
    },
    clicknav(index){
      switch(index){
        case 0:
        case 1:
        case 2:
          this.$router.push('/houselist?type='+ (index+1))
          break;
        case 3:
          this.$router.push('/authorize')
          break;   
        case 4:
          this.$router.push('/news')
          break;        
        case 5:
          this.$router.push('/blacklisthub')
          break;      
        case 6:
          this.$router.push('/business')
          break;    
        case 7:
          this.$router.push('/aboutus')
          break;  
      }
    },
    gohouserdetail(list){
      this.$router.push('/housedetail')
      sessionStorage.setItem('sesshousedetail',JSON.stringify(list))
    }
  },
  
}
</script>
<style lang="stylus" scoped>
.home
  padding-bottom 0.3rem;
  header 
    width 94%;
    padding 0 3%;
    height 0.5rem;
    background #FFA54F;
    //background white;
    display flex;
    align-items center;
    justify-content center;
    .slogan
      flex 1;
      margin-left 0.5rem;
      font-size 0.14rem;
      font-weight 600;
  .navcon
    width: 100%;
    margin: 0.1rem auto 0;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    border-bottom: 1px solid #dddddd;
    .list
      width 25%;
      text-align center;
      margin-bottom: 0.2rem;
      img 
        width: 0.4rem;  
  .typelist
    width 100%;
    .title
      width 94%;
      padding 0 3%;
      height 0.4rem;
      margin 0.1rem auto;
      display flex;
      justify-content space-between;
      align-items center;
      .type
        font-size 0.2rem;
        color #ffa54f;
      .slogan
        font-size 0.16rem;  
      .more
        width 0.2rem;  
  .houseimg
    .swiperimg
      position relative;
      img
        width: 100%; 
        height 2.2rem;  
      .slogan
        width 100%;
        height 0.2rem;
        display inline-block;
        text-align center;
        position absolute;
        top 0.5rem;  
        left 0;
        color white;
        font-size 0.18rem;      
  .navlist  
    width: 94%;
    padding: 0 3%;
    margin: 0 auto;
    display: flex;
    padding-bottom: 0.15rem;
    justify-content: space-between;
    border-bottom: 1px solid #dddddd;    
    .list 
      width: 30%;
      font-size: 0.12rem;
      .houseimg
        width 100%;
        height 0.8rem;
      .card-title
        font-size 0.12rem 
      .price
        color: #fa5741;
        font-weight: 600;  
</style>
