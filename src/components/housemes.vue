<template>
  <div class="houselist" v-if="housedata[getlanguage]">
    <div class="list" v-for="(list,index) in housedata[getlanguage]" :key="index" @click="gohouserdetail(list)">
        <div class="houseimg"><img src="../assets/commom/house.png" alt=""></div>
        <div class="meslist">
            <p class="title">{{list.title}}</p>
            <p class="mes">{{huxing[getlanguage]}}：{{layoutArr[getlanguage][list.layout]}}</p>
            <p class="mes">{{mianji[getlanguage]}}：{{list.size}}㎡</p>
            <p class="mes">{{fukuan[getlanguage]}}：{{paymentArr[getlanguage][housetype][list.payment]}}</p>
            <p class="mes">{{jiage[getlanguage]}}：
              <span class="price">{{list.sellingprice | formatnum}} {{list.type == 2 ? " p/月" : " p"}}</span>
            </p>
        </div>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  computed:{
    ...mapGetters(['getlanguage'])
  },
  data(){
      return{
          huxing:{0:'户型',1:'layout'},
          mianji:{0:'面积',1:'size'},
          fukuan:{0:'付款方式',1:'payment term'},
          jiage:{0:'价格',1:'selling price'},
          housetype:'',
          layoutArr:{
            0:{
              1:'单间',
              2:'1室1厅',
              3:'2室1厅',
              4:'3室1厅',
              5:'其它',
            },
            1:{
              1:'studio',
              2:'1BR',
              3:'2BR',
              4:'3BR',
              5:'others'
            }
          },
          paymentArr:{
            0:{
              1:{ // 买卖
                1:'一次性现金',
                2:'银行贷款',
                3:'其他',
              },
              2:{ // 租赁
                1:'压2付6',
                2:'压2付12',
                3:'压2付2+预付支票',
                4:'其他'
              },
              3:{
                1:'一次性现金',
                2:'银行贷款',
                3:'其他',
              }
            },
            1:{
              1:{ // 买卖
                1:'cash',
                2:'bank financing',
                3:'others',
              },
              2:{ // 租赁
                1:'2+6',
                2:'2+12',
                3:'2+2+PDc',
                4:'others'
              },
              3:{
                1:'cash',
                2:'bank financing',
                3:'others',
              }
            }
          }
      }
  },
  props:['housedata'],
  created(){
    this.housetype = this.$route.query.type;
    if(!this.housetype){
      this.$router.push('/index')
    }
  },
  mounted(){
    
  },
  methods:{
    gohouserdetail(list){
      this.$router.push('/housedetail');
      sessionStorage.setItem('sesshousedetail',JSON.stringify(list))
    }
  }
}
</script>
<style lang="stylus" scoped>
.houselist
    .list
        width 94%;
        margin 0 auto;
        padding 0 3%;
        height 1.2rem;
        border-bottom 1px solid #dddddd;
        display flex;
        .houseimg
            width 1.2rem;
            height 1.2rem;
            display flex;
            justify-content center;
            align-items center;
            img
                width 1.2rem;    
        .meslist
            width 2.3rem;
            margin-left 0.1rem;
            .title
                margin-top 0.14rem;
                font-size 0.16rem;
                font-weight 600;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis; 
            .mes
                font-size 0.12rem;
                margin-top 0.02rem;  
                .price
                    color #fa5741;
                    font-weight 600;         
</style>