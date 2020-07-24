<template>
  <div class="houselist">
    <Header :title="context.navtype[getlanguage][this.housetype-1]"></Header>
    <div class="selectsearch">
      <div class="nav">
        <div class="title" @click.stop="clickcity()">
          <span>{{cityaddressname}}</span>
          <img src="../assets/commom/xiala2.png" alt="" srcset="">
        </div>
        <div class="con" style="width:3rem;" v-if="navindex == 1">
          <img class="before" src="../assets/commom/up(2).png" alt="" srcset="">
          <div class="content">
            <div class="list">
              <div class="left">
                <div :class="{'usedclass':selectcityindex == index}"
                  @click="selectcity(list,index)" 
                  v-for="(list,index) in addressArr[getlanguage]" :key="index">
                  {{list.label}}
                </div>
              </div>
              <div class="right">
                <div :class="{'usedclass':selectaddressindex==index}" 
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
      <div class="nav">
        <div class="title" @click.stop="navindex = 2">
          <span>{{usedname}}</span>
          <img src="../assets/commom/xiala2.png" alt="" srcset="">
        </div>
        <div class="con" style="min-width:1.3rem;" v-if="navindex == 2">
          <img class="before" src="../assets/commom/up(2).png" alt="" srcset="">
          <div>
            <p :class="{usedclass:usedindex==0}" @click="clickused(getlanguage == 0 ? '用途' : 'Category',0)">{{getlanguage == 0 ? '用途' : 'Category'}}</p>
            <p :class="{usedclass:usedindex==index}" @click="clickused(list,index)" v-for="(list,index) in usedArr[getlanguage]" :key="index">{{list}}</p>
          </div>
        </div>
      </div>
      <div class="nav">
        <div class="title" @click.stop="navindex = 3">
          <span :class="{disabled: usedindex != 1}">{{layoutname}}</span>
          <img src="../assets/commom/xiala2.png" alt="" srcset="">
        </div>
        <div class="con" style="min-width:1.3rem;" v-if="navindex == 3 && usedindex == 1">
          <img class="before" src="../assets/commom/up(2).png" alt="" srcset="">
          <div>
            <p :class="{usedclass:layoutindex==0}" @click="clicklayout(getlanguage == 0 ? '户型' : 'Type',0)">{{getlanguage == 0 ? '户型' : 'Type'}}</p>
            <p :class="{usedclass:layoutindex==index}" @click="clicklayout(list,index)" v-for="(list,index) in layoutArr[getlanguage]" :key="index">{{list}}</p>
          </div>
        </div>
      </div>
      <div class="nav">
        <div class="title" @click.stop="navindex = 4">
          <span>{{pricename}}</span>
          <img src="../assets/commom/xiala2.png" alt="" srcset="">
        </div>
        <div class="con conright" style="min-width:1.3rem;" v-if="navindex == 4">
          <img class="before" src="../assets/commom/up(2).png" alt="" srcset="">
          <div>
            <p :class="{usedclass:priceindex==0}" @click="clickPrice(getlanguage == 0 ? '价格' : 'Price',0)">{{getlanguage == 0 ? '价格' : 'Price'}}</p>
            <p :class="{usedclass:priceindex==index}" @click="clickPrice(list,index)" v-for="(list,index) in priceArr[getlanguage]" :key="index">{{list}}</p>
          </div>
        </div>
      </div>
    </div>
      <houselist :housedata = 'housedata' :searchparams='searchparams' :doneflag='1' v-if="housedata[getlanguage] && housedata[getlanguage].length !=0"></houselist>
      <Nodata v-else></Nodata>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import Header from '../components/header';
import houselist from '../components/housemes';
import Nodata from '../components/nodata'
export default {
  computed:{
    ...mapGetters(['getlanguage','cityparamsstore','usedArr','layoutArr'])
  },
  data(){
    return{
      cityparams:'',
      sesssearchparams:'',
      cityvalue:0,
      addressvalue:0,
      housedata:[],
      cityname:'',
      addressname:'',
      housetype:'',
      navindex:0,
      selectcityindex:0,
      selectaddressindex:0,
      usedindex:'0',
      layoutindex:'0',
      priceindex:'0',
      usedname:'',
      cityaddressname:'',
      layoutname:'',
      pricename:'',
      addressArr:{},
      priceArr:{
        0:{
          1:'30,000以下',
          2:'30,000-50,000',
          3:'50,000-70,000',
          4:'70,000-100,000',
          5:'100,000以上 ',
          6:'5,000,000以下',
          7:'5,000,000-10,000,000',
          8:'10,000,000-15,000,000',
          9:'15,000,000-20,000,000',
          10:'20,000,000以上'
        },
        1:{
          1:'30k below',
          2:'30-50k',
          3:'50-70k',
          4:'70-100k',
          5:'100k above' ,
          6:'5,000K below',
          7:'5,000K-10,000K',
          8:'10,000K-15,000K',
          9:'15,000K-20,000K',
          10:'20,000K above'
        }    
      }
    }
  },
  components:{
    Header,
    houselist,
    Nodata
  },
  mounted(){
    this.housetype = this.$route.query.type;
    this.sesssearchparams = sessionStorage.getItem('sesssearchparams') ? 
      JSON.parse(sessionStorage.getItem('sesssearchparams')) : ''
    let priceindex = sessionStorage.getItem('priceindex')  
    if(this.housetype == 2){
      this.priceArr = {
        0:{
          1:'30,000以下',
          2:'30,000-50,000',
          3:'50,000-70,000',
          4:'70,000-100,000',
          5:'100,000以上 ',
        },
        1:{
          1:'30k below',
          2:'30-50k',
          3:'50-70k',
          4:'70-100k',
          5:'100k above' ,
        }
      }
    }else{
      this.priceArr = {
        0:{
          6:'5,000,000以下',
          7:'5,000,000-10,000,000',
          8:'10,000,000-15,000,000',
          9:'15,000,000-20,000,000',
          10:'20,000,000以上'
        },
        1:{
          6:'5,000K below',
          7:'5,000K-10,000K',
          8:'10,000K-15,000K',
          9:'15,000K-20,000K',
          10:'20,000K above'
        }
      }
    }
    this.getcity();
    if(this.sesssearchparams.used){
      this.usedname = this.usedArr[this.getlanguage][this.sesssearchparams.used]
    }else{
      this.usedname = this.getlanguage == 0 ? '用途' : 'Category';
    }
    if(this.sesssearchparams.layout){
      this.layoutname = this.layoutArr[this.getlanguage][this.sesssearchparams.layout]
    }else{
      this.layoutname = this.getlanguage ==0 ? '户型' : 'Type';
    }
    if(priceindex){
      this.priceindex = priceindex;
      this.pricename = this.priceArr[this.getlanguage][priceindex]
    }else{
      this.pricename = this.getlanguage ==0 ? '价格' : 'Price';
    }
    this.cityname = '不限';
    this.searchparams = {status:'1',type:this.housetype}
    for (const key in this.sesssearchparams) {
      this.searchparams[key] = this.sesssearchparams[key]
    }
    this.gethouselist();
  },
  methods:{
    gethouselist(){
      this.loadingflag(true)
      if(this.searchparams.used != 1){
        delete this.searchparams.layout
      }
      
      this.$post('/house/houselist',{
        params:JSON.stringify(this.searchparams)
      }).then((res)=>{
        this.navindex = 0;
        this.loadingflag(false)
        if(res.error == '0000'){
          this.housedata = res.data
        }
      })
    },
    selectcity(list,index){
      this.cityname = list.label;
      this.selectaddressindex = 0;
      this.selectcityindex = index;
      this.addressvalue = list.children[0].value;
      this.cityvalue = list.value;
    },
    selectaddress(list,index){
      this.selectaddressindex = index;
      this.addressname = list.label;
      this.addressvalue = list.value;
    },
    clickcity(){
      this.navindex = 1;
    },
    clearbtn(){},
    sharebtn(){
      this.cityaddressname = this.cityname + (this.addressvalue ? this.addressname  : '')
      this.searchparams.city = this.cityvalue + '-' +this.addressvalue
      this.gethouselist();
    },
    getcity(){
      this.$get('/others/getcity').then((res)=>{
          if(res.error == '0000'){
            this.addressArr = res.data
            if(this.sesssearchparams.city){
              let citystr = this.sesssearchparams.city.split('-')
              this.addressArr[this.getlanguage].map((ele)=>{
                if(ele.value === citystr[0]){
                  ele.children.map((arg)=>{
                    if(arg.value === citystr[1]){
                      this.cityaddressname = ele.label + (arg.value === '' ? '' : arg.label) 
                    }
                  })
                }
              })
            }else{
              this.cityaddressname = this.getlanguage == 0? "城市" : "City";
            }
          }
      })
    },
    clickused(list,index){
      this.usedindex = index;
      this.usedname = list; 
      this.searchparams.used = index;
      this.gethouselist();
    },
    clicklayout(list,index){
      this.layoutindex = index;
      this.layoutname = list; 
      this.searchparams.layout = index;
      this.gethouselist();
    },
    clickPrice(list,index){
      this.priceindex = index;
      sessionStorage.setItem('priceindex',this.priceindex)
      this.pricename = list; 
      switch(index){
        case 0:
          this.searchparams.price = {min:0,max:NaN}
          break;
        case "1":
          this.searchparams.price = {min:0,max:30000}
        break;
        case "2":
          this.searchparams.price = {min:30000,max:50000}
        break;
        case "3":
          this.searchparams.price = {min:50000,max:70000}
        break;
        case "4":
          this.searchparams.price = {min:70000,max:100000}
        break;
        case "5":
          this.searchparams.price = {min:100000,max:NaN}
        break;
        case "6":
          this.searchparams.price = {min:0,max:5000000}
        break;
        case "7":
          this.searchparams.price = {min:5000000,max:10000000}
        break;
        case "8":
          this.searchparams.price = {min:10000000,max:15000000}
        break;
        case "9":
          this.searchparams.price = {min:15000000,max:20000000}
        break;
        case "10":
          this.searchparams.price = {min:20000000,max:NaN}
        break;
      }
      this.gethouselist();
    },
  }
}
</script>
<style lang="stylus" scoped>
.nodata
  margin-top 1rem; 
.selectsearch
  width 94%;
  //padding 0 3%;
  margin 0.1rem auto  0rem;
  height 0.4rem; 
  line-height 0.4rem; 
  display flex;
  justify-content space-between;
  border-bottom 1px solid #dddddd;
  border-top 1px solid #dddddd;
  border-left 1px solid #dddddd;
  box-sizing border-box;
  .nav
    width 25%;
    text-indent 0.1rem;
    border-right 1px solid #dddddd;
    position relative;
    box-sizing border-box;
    .title
      display flex;
      align-items center;
      span 
        width 80%;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      img
        width 0.12rem;
      .disabled
        color #aaa !important  
     
    .con
      width auto;
      line-height 0.3rem;
      padding 0 0.1rem 0 0;
      background-color white;   
      position absolute;
      left -1px;
      top 0.55rem;
      z-index 99;
      font-size 0;
      .before
        position absolute;  
        top -0.2rem;
      &>div
        border 1px solid #dddddd;
        z-index 9999;
        padding-right 0.1rem;
        font-size 0.14rem;
        .list
          display flex;
          padding-top 0.1rem;
          &>div
            width 50%;
            max-height 2.6rem;
            overflow auto;
        .btn
          width 100%;
          height 0.6rem;
          display flex;
          justify-content space-around;
          &>div
            width 1rem;
            height 0.3rem;
            text-align center;
            line-height 0.3rem;
            border-radius 0.1rem;
            margin-top 0.1rem;
          .clear
            background: #f8f8f9;
            color: #9399a5; 
          .share
            background: #FFA54F;
            color: #fff;      
        .usedclass
          color #ffa54f;
        p
          white-space:nowrap;
    .conright
      right -0.1rem !important;          
      left auto !important;
      .before
        position absolute;  
        top -0.2rem;
        right 0.1rem;
</style>