<template>
<div class="housedetail">
<Header :title="housedetail[getlanguage]"></Header>
<div class="detail">
    <div class="houseimg">
        <Swiper :options="swiperOption" v-if="housedetaildata">
            <swiper-slide v-for="(item,index) in JSON.parse(housedetaildata.imgArr)" :key="index"><img :src="item"></swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </Swiper>
    </div>
    <div class="detaillist">
        <div class="housetitle">{{housedetaildata.title}}</div>
        <div  class='house-intro'>
            <ul v-if="housedetaildata">
                <li>
                    <span class="type">{{context.housedesc[getlanguage].allprice}}：</span> 
                    <span class="spec">
                        {{housedetaildata.sellingprice | formatnum}} {{housedetaildata.type == 2 ? " p/m" : " p"}}
                    </span>
                </li>    
                <li>
                    <span class="type">{{context.housedesc[getlanguage].layout}}：</span>
                    <span class="spec" v-if="housedetaildata.used == 1"> {{layoutArr[getlanguage][housedetaildata.layout]}}</span>
                    <span v-else>--</span>
                </li>
                <li>
                    <span class="type">{{context.housedesc[getlanguage].size}}：</span> 
                    <span class="spec">{{housedetaildata.size}} ㎡</span>
                </li>
                <li>
                    <span class="type">{{context.housedesc[getlanguage].use}}：</span> 
                    <span class="spec">{{usedArr[getlanguage][housedetaildata.used]}}</span>
                </li>
                <li>
                    <span class="type">{{context.housedesc[getlanguage].faceTo}}：</span> 
                    <span>{{faceToArr[getlanguage][housedetaildata.faceto]}}</span> 
                </li>
                <li>
                    <span class="type">{{context.housedesc[getlanguage].tower}}：</span> 
                    <span>{{housedetaildata.tower}}</span> 
                </li>
                <li>
                    <span class="type">{{context.housedesc[getlanguage].paymentterm}}：</span> 
                    <span>{{paymentArr[getlanguage][1][housedetaildata.payment] || paymentArr[getlanguage][2][housedetaildata.payment]}}</span>
                </li>
                <li>
                    <span class="type">{{context.housedesc[getlanguage].balcony}}：</span> 
                    <span v-if="getlanguage == 0">{{housedetaildata.balcony == 1? '有' : '无'}}</span>
                    <span v-else>{{housedetaildata.balcony == 1? 'Yes' : 'N/A'}}</span>
                </li>                     
                <li>
                    <span class="type">{{context.housedesc[getlanguage].parkingslot}}：</span> 
                    <span v-if="getlanguage == 0">{{housedetaildata.parking == 1? '有' : '无'}}</span>
                    <span v-else>{{housedetaildata.parking == 1? 'Yes' : 'N/A'}}</span>
                </li>
                <li>
                    <span class="type">{{context.housedesc[getlanguage].city}}：</span> 
                    <span>{{housedetaildata.cityname}}</span>
                </li>                  
                <li class="full">
                    <span class="type">{{context.housedesc[getlanguage].furniture}}：</span>
                    <p>
                        <i v-for="(list,index) in JSON.parse(housedetaildata.furniture)" :key="index">
                            {{furnitureArr[getlanguage][list]}}<i v-if="index != JSON.parse(housedetaildata.furniture).length - 1">、</i>
                        </i> 
                    </p> 
                </li>                  
                <li class="full">
                    <span class="type">{{context.housedesc[getlanguage].surrounding}}：</span>
                    <p>
                        <i v-for="(list,index) in JSON.parse(housedetaildata.surrounding)" :key="index">
                            {{surroundingArr[getlanguage][list]}} <i v-if="index != JSON.parse(housedetaildata.surrounding).length - 1">、</i>
                        </i> 
                    </p>
                </li>
                <li class="full">
                    <span class="type">{{context.housedesc[getlanguage].notes}}：</span>
                    <span>{{housedetaildata.notes}}</span> 
                </li>
                <li class="full">
                    <span class="type">{{context.housedesc[getlanguage].introduction}}：</span>
                    <span>{{housedetaildata.introduction}}</span> 
                </li>
            </ul>
        </div>
    </div>
</div>
</div>
</template>
<script>
import {mapGetters} from 'vuex'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import Header from '../components/header'
export default {
  computed:{
    ...mapGetters([
    'getlanguage',
    'layoutArr',
    'furnitureArr',
    'surroundingArr',
    'usedArr',
    'faceToArr',
    'paymentArr'
    ])
  },
  data(){
    return{
      housedetail:{0:'房屋详情',1:'Details'},
      housedetaildata:'',   
      housedId:'',
      city:'',
      swiperOption: {//swiper3
        pagination: {
          el: '.swiper-pagination'
        },
        autoplay: 3000,
        speed: 1000,
      }
    }
  },
  components:{
    Header,
    Swiper,
    SwiperSlide
  },
  mounted(){   
    this.housedId = this.$route.query && this.$route.query.id
    if(this.housedId){
        this.gethousedetail(this.housedId)
    }else{
        this.$router.push('/')
    }
    //this.housedetaildata = sessionStorage.getItem('sesshousedetail') ? JSON.parse(sessionStorage.getItem('sesshousedetail')) : ''
    let cityname = sessionStorage.getItem('cityparams') ? JSON.parse(sessionStorage.getItem('cityparams')).cityname : ''
    let addressname = sessionStorage.getItem('cityparams') ? JSON.parse(sessionStorage.getItem('cityparams')).addressname : ''
    this.city = cityname +  '  ' + addressname
  },
  methods: {
     gethousedetail(id){
        this.$post('/house/gethousedetail',{
            id:id
        }).then(res=>{
            this.housedetaildata = res.data[this.getlanguage][0]
        })
     } 
  },
}
</script>
<style lang="stylus" scoped>
.housedetail
    .detail
        .houseimg
            width 100%;
            height 2rem;
            text-align center;
            img
                width 100%;
                height 2rem;
        .detaillist
            width 94%;
            margin 0 3%;
            .housetitle
                width 100%;
                font-size 0.18rem;
                font-weight 600; 
                margin 0.15rem 0; 
            .house-intro
                margin 0.2rem auto 0;
                font-size 0.12rem;
                ul
                    display flex;
                    flex-wrap wrap;
                    li
                        width 50%;
                        margin-bottom 0.06rem;
                        line-height 0.2rem;
                        display flex;
                        span
                            display inline-block;
                    .type
                        color #999;
                        max-width 1.2rem;
                        min-width 0.6rem;
                    .full 
                        width 100% !important; 
                        &>span:nth-child(2)
                            width 80%;   
                    .spec
                        color #fa5741;
                        font-weight 600;          
</style>