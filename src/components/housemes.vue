<template>
  <div class="houselist" v-if="housedata[getlanguage]">
    <div class="list" v-for="(list,index) in housedata[getlanguage]" :key="index" @click="gohouserdetail(list)">
        <div class="houseimg">
          <img class="housepic" :src="JSON.parse(list.imgArr)[0]" alt="">
          <span class="newhouse" v-if="list.isnew == 1"></span>
        </div>
        <div class="meslist">
            <div class="nav_list">
              <p class="city">{{list.title}}</p>
            </div>
            <div class="nav_list">
              <p class="mes">
                <span>{{layoutArr[getlanguage][list.layout]}}</span>/ 
                <span>{{list.size}}㎡</span>/
                <span>{{paymentArr[getlanguage][housetype][list.payment]}}</span>/ 
                <span class="price" v-if="getlanguage == 0">{{list.sellingprice | formatnum}} {{list.type == 2 ? " p/月" : " p"}}</span>
                <span class="price" v-else>{{list.sellingprice | formatnum}} {{list.type == 2 ? " p/m" : " p"}}</span>
              </p>
            </div>
            <div class="nav_list">
              <p class="title">{{address[getlanguage]}}：{{list.cityname}}</p>
            </div>
        </div>
    </div>
    <div v-if="doneflag" class="done">{{datadone[getlanguage]}}</div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  computed:{
    ...mapGetters(['getlanguage','layoutArr','paymentArr'])
  },
  data(){
      return{
          datadone:{0:'数据加载完成',1:'Data loading is complete'},
          huxing:{0:'户型',1:'layout'},
          mianji:{0:'面积',1:'size'},
          address:{0:'地址',1:'address'},
          fukuan:{0:'付款方式',1:'payment term'},
          jiage:{0:'价格',1:'selling price'},
          housetype:'',
      }
  },
  props:['housedata','doneflag','searchparams'],
  created(){
    this.housetype = this.housedata[0][0].type == 2 ? 2 : 1;
    if(!this.housetype){
      this.$router.push('/index')
    }
  },
  mounted(){
    // console.log(this.searchparams)
  },
  methods:{
    gohouserdetail(list){
      this.$router.push('/housedetail');
      sessionStorage.setItem('sesshousedetail',JSON.stringify(list))
      sessionStorage.setItem('sesssearchparams',JSON.stringify(this.searchparams))
    }
  }
}
</script>
<style lang="stylus" scoped>
.houselist
    .list
        width 94%;
        padding 0 3%;
        border-bottom 1px solid #dddddd;
        display flex;
        padding-bottom 0.2rem;
        margin-top 0.2rem;
        position relative;
        .houseimg
            width 1.05rem;
            display flex;
            justify-content center;
            align-items center;
            position relative;
            overflow hidden;
            .housepic
              width 100%;
              height 0.75rem; 
            .newhouse
              width 0rem;
              height 0rem;
              position absolute;
              left -0.05rem;
              top -0.2rem;
              border-left 0.3rem solid red;
              border-top 0.3rem solid transparent;
              border-bottom 0.3rem solid transparent; 
              transform rotate(-135deg)   
              &::after
                display inline-block;
                content:'New' 
                text-align center;
                position absolute;
                left -0.35rem;
                top -0.1rem;
                color white;
                transform rotate(-270deg) 
                font-size 0.13rem;
        .meslist
            width 2.3rem;
            margin-left 0.1rem;
            display flex;
            flex-wrap wrap;
            align-items center;
            .nav_list
              width 100%;
              display flex;
              font-size 0.11rem;
              color #666666;
              .city
                color #111111;
              .price
                  color #fa5741;
                  font-weight 600;   
    .done 
        text-align center;
        line-height 0.4rem;                    
</style>