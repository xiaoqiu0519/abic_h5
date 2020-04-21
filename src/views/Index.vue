<template>
  <div class="home">
    <header>
      <img class="logo" src="../assets/index/logo.png" alt="" srcset="">
      <span class="slogan">{{context.slogan[getlanguage]}}</span>
    </header>
    <translation></translation>
    <div class="selectaddress">
      <div class="con" @click="selectflagfun()">
        <img class="icon" src="../assets/commom/dingwei.png" alt="">
        <span class="selectfontcolor">{{cityname}}  {{addressvalue ? addressname : ''}}</span>
        <img class="selectimg" src="../assets/commom/xiala.png" alt="">
      </div>
    </div>
    <div class="navcon">
     <div class="list" @click="clicknav(index)"
        v-for="(item,index) in context.navtype[getlanguage]" :key="index">
        <p><img :src="navarrimg[index]" alt=""></p>
        <p>{{item}}</p>
      </div>
    </div>
    <div class="typelist">
      <p class="title" @click="clicknav(0)">
        <span class="type">{{context.fcjy[getlanguage].type}}</span>
        <span class="slogan">{{context.fcjy[getlanguage].slogan}}</span>
        <img class="more" src="../assets/commom/right.png" alt="" srcset="">
      </p>
      <div class="navlist" v-if="fcjyArr && fcjyArr[getlanguage].length !=0">
        <div class="list" v-for="(list,index) in fcjyArr[getlanguage].slice(0,3)" :key="index"  @click="gohouserdetail(list)">
            <img class="houseimg" src="../assets/commom/house.png" alt="">
            <div class="card-title">{{layoutArr[getlanguage][list.layout]}} / {{list.size}} ㎡</div>
            <div class="price">{{list.sellingprice | formatnum}} peso</div>
        </div>
      </div>
      <div class="navlist" v-else>
        <Nodata></Nodata>
      </div>
    </div>
    <div class="typelist">
      <p class="title"  @click="clicknav(1)">
        <span class="type">{{context.fczl[getlanguage].type}}</span>
        <span class="slogan">{{context.fczl[getlanguage].slogan}}</span>
        <img class="more" src="../assets/commom/right.png" alt="" srcset="">
      </p>
      <div class="navlist" v-if="fczlArr && fczlArr[getlanguage].length !=0">
        <div class="list" v-for="(list,index) in fczlArr[getlanguage].slice(0,3)" :key="index" @click="gohouserdetail(list)">
            <img class="houseimg" src="../assets/commom/house.png" alt="">
            <div class="card-title">{{layoutArr[getlanguage][list.layout]}} / {{list.size}} ㎡</div>
            <div class="price">{{list.sellingprice | formatnum}} p/月</div>
        </div>
      </div>
      <div class="navlist" v-else>
        <Nodata></Nodata>
      </div>
    </div>
    <div class="typelist" >
      <p class="title"  @click="clicknav(2)">
        <span class="type">{{context.tjyy[getlanguage].type}}</span>
        <span class="slogan">{{context.tjyy[getlanguage].slogan}}</span>
        <img class="more" src="../assets/commom/right.png" alt="" srcset="">
      </p>
      <div class="navlist" v-if="tjfyArr && tjfyArr[getlanguage].length !=0" style="border-bottom:none">
        <div class="list" v-for="(list,index) in tjfyArr[getlanguage].slice(0,3)" :key="index"  @click="gohouserdetail(list)">
            <img class="houseimg" src="../assets/commom/house.png" alt="">
            <div class="card-title">{{layoutArr[getlanguage][list.layout]}} / {{list.size}} ㎡</div>
            <div class="price">{{list.sellingprice | formatnum}} peso</div>
        </div>
      </div>
      <div class="navlist" v-else>
        <Nodata></Nodata>
      </div>
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
import {mapGetters } from 'vuex'
import translation from '../components/translation' 
import Nodata from '../components/nodata'
export default {
  name: 'Home',
  data(){
    return{
      addressname:'',
      cityname:'',
      cityvalue:'',
      addressvalue:'',
      citylist:[],
      addressArr:{
        // 0:[
        //   {city:'全部',addressname:[]},
        //   {city:'马尼拉',address:['不限','makati','pasay','taguig','makati','pasay','taguig','makati','pasay','taguig']},
        //   {city:'甲美地',address:['不限','makati','pddddd','makati','pasay','taguig']},
        //   {city:'邦板牙',address:['不限','makati','pddddd','dsafdfadf','fgrefsdf']},
        //   {city:'马尼拉',address:['不限','makati','pddddd','iuidjisf','okm']}
        // ],
        // 1:[
        //   {city:'All',addressname:[]},
        //   {city:'manila',address:['All','makati','pasay','taguig','makati','pasay','taguig','makati','pasay','taguig']},
        //   {city:'cavite',address:['All','makati','pddddd','makati','pasay','taguig']},
        //   {city:'pampanga',address:['All','makati','pddddd','dsafdfadf','fgrefsdf']},
        //   {city:'manila',address:['All','makati','pddddd','iuidjisf','okm']}
        // ]
      },
      fcjyArr:'',
      fczlArr:'',
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
      cityparams:''
    }
  },
  computed:{
    ...mapGetters(['getlanguage','layoutArr'])
  },
  components:{
    translation,
    Nodata
  },
  mounted(){
    this.cityparams = this.cityvalue + '-' +this.addressvalue
    this.init();
    this.getcity();
  },
  methods: {
    selectaddressfun(list){
      this.addressname[this.getlanguage] = list;
      this.selectflag = false;
    },
    init(){
      this.gethouselist({
        params:JSON.stringify({type:1,status:1,city:this.cityparams})
      });
      this.gethouselist({
        params:JSON.stringify({type:2,status:1,city:this.cityparams})
      });
      this.gethouselist({
        params:JSON.stringify({type:3,status:1,city:this.cityparams})
      });
    },
    getcity(){
        this.$get('/others/getcity').then((res)=>{
            if(res.error == '0000'){
                this.addressArr = res.data
                // for(var i=0 ; i <res.data[0].length ;i++){
                //     for(var j=0 ;j <res.data[0][i].children.length;j++){
                //         this.citytran[0][res.data[0][i].value + '-' + res.data[0][i].children[j].value] = res.data[0][i].label + res.data[0][i].children[j].label
                //     }
                // }
                // for(var m=0 ; m <res.data[1].length ;m++){
                //     for(var n=0 ;n <res.data[1][m].children.length;n++){
                //         this.citytran[1][res.data[1][m].value + '-' + res.data[1][m].children[n].value] = res.data[1][m].label + res.data[1][m].children[n].label
                //     }
                // }
                // this.selectcitylist = res.data[0].slice(1)
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
    display flex;
    align-items center;
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
      height 0.4rem;
      margin 0.1rem auto;
      display flex;
      justify-content space-between;
      align-items center;
      .type
        font-size 0.2rem;
        font-weight 600;
      .slogan
        font-size 0.16rem;  
      .more
        width 0.2rem;  
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
      .card-title
        font-size 0.12rem 
      .price
        color: #fa5741;
        font-weight: 600;  
</style>
