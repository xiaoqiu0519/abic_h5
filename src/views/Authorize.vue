<template>
  <div class="houselist">
    <Header :title="context.navtype[getlanguage][3]"></Header>
    <div class="nav">
        <span :class="{'navcolor':navindex == 0}" @click="clicknav(0)">{{getlanguage == 0 ? "出售" : "rent"}}</span>
        <span :class="{'navcolor':navindex == 1}" @click="clicknav(1)">{{getlanguage == 0 ? "租赁" : "sell"}}</span>
    </div>
    <div class="houseform">
        <div class="inputdiv">
            <span><i> * </i> {{tabtext[getlanguage].username}}</span>
            <input type="text" :placeholder="pleaseenter[getlanguage] + ' ' + tabtext[getlanguage].username">
        </div>
        <div class="inputdiv">
            <span><i> * </i> {{tabtext[getlanguage].telphone}}</span>
             <input type="text" :placeholder="pleaseenter[getlanguage] + ' ' + tabtext[getlanguage].telphone">
        </div>
        <div class="inputdiv">
            <span><i> * </i> {{tabtext[getlanguage].email}}</span>
            <input type="text" :placeholder="pleaseenter[getlanguage] + ' ' + tabtext[getlanguage].email">
        </div>
        <div class="inputdiv">
            <span><i> * </i> {{tabtext[getlanguage].title}}</span>
            <input type="text" :placeholder="pleaseenter[getlanguage] + ' ' + tabtext[getlanguage].title">
        </div>
        <div class="inputradio">
            <span><i> * </i> {{tabtext[getlanguage].type}}</span>
            <div class="radiolist">
                <span v-for="(list,index) in usedArr[getlanguage]" :key="index"><input type="radio" name="housetype" id="">{{list}}</span>
            </div>
        </div>
        <div class="inputdiv">
            <span><i> * </i> {{tabtext[getlanguage].tower}}</span>
            <input type="text" :placeholder="pleaseenter[getlanguage] + ' ' + tabtext[getlanguage].tower">
        </div>
        <div class="inputradio">
            <span><i> * </i> {{tabtext[getlanguage].layout}}</span>
            <div class="radiolist">
                <span v-for="(list,index) in layoutArr[getlanguage]" :key="index">
                    <input type="radio" name="layout" id="">{{list}}
                </span>
            </div>
        </div>
        <div class="inputdiv">
            <span><i> * </i> {{tabtext[getlanguage].size}}</span>
            <input type="text" :placeholder="pleaseenter[getlanguage] + ' ' + tabtext[getlanguage].size">
            <i>m²</i>
        </div>
        <div class="inputradio">
            <span><i> * </i> {{tabtext[getlanguage].faceto}}</span>
            <div class="radiolist">
                <span v-for="(list,index) in faceToArr[getlanguage]" :key="index"><input type="radio" name="housetype" id="">{{list}}</span>
            </div>
        </div>
        <div class="inputradio">
            <span><i> * </i> {{tabtext[getlanguage].balcony}}</span>
            <div class="radiolist">
                <span><input type="radio" name="balcony" id="">{{getlanguage==0?'有':'Y'}}</span>
                <span><input type="radio" name="balcony" id="">{{getlanguage==0?'无':'N'}}</span>
            </div>
        </div>
        <div class="inputradio">
            <span><i> * </i> {{tabtext[getlanguage].parking}}</span>
            <div class="radiolist">
                <span><input type="radio" name="parking" id="">{{getlanguage==0?'有':'Y'}}</span>
                <span><input type="radio" name="parking" id="">{{getlanguage==0?'无':'N'}}</span>
            </div>
        </div>
        <div class="inputdiv">
            <span><i> * </i> {{tabtext[getlanguage].sellingprice}}</span>
            <input type="text" :placeholder="pleaseenter[getlanguage] + ' ' + tabtext[getlanguage].sellingprice">
        </div>
        <div class="inputradio">
            <span><i> * </i> {{tabtext[getlanguage].payment}}</span>
            <div class="radiolist">
                <span v-for="(list,index) in paymentArr[getlanguage][navindex+1]" :key="index"><input type="radio" name="housetype" id="">{{list}}</span>
            </div>
        </div>
        <div class="textarea">
            <span>{{tabtext[getlanguage].notes}}</span>
            <textarea name="beizhu" :placeholder="getlanguage==0 ? '300字以内' : 'Within 300 words'"></textarea>
        </div>
        <div class="inputradio">
            <span><i> * </i> {{tabtext[getlanguage].furniture}}</span>
            <div class="radiolist">
                <span v-for="(list,index) in furnitureArr[getlanguage]" :key="index"><input type="checkbox" v-model="furniture" :value="index" id="">{{list}}</span>
            </div> 
        </div>
        <div class="btn">{{commitbtn[getlanguage]}}</div>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import Header from '../components/header'
export default {
  computed:{
    ...mapGetters([
        'getlanguage',
        'layoutArr',
        'furnitureArr',
        'usedArr',
        'faceToArr',
        'paymentArr'
        ])
  },
  data(){
      return{
          navindex:0,
          furniture:[1,2,3,5],
          pleaseenter:{
              0:'请输入',
              1:'please enter'
          },
          commitbtn:{
              0:'确认提交',
              1:'submission'
          },
          tabtext:{
              0:{
                    username:'姓名',
                    telphone:'电话',
                    email:'邮箱',
                    title:'楼盘名称',
                    type:'房屋类型',
                    tower:'单元号&门牌号',
                    layout:'户型',
                    size:'面积',
                    faceto:'朝向',
                    balcony:'阳台',
                    parking:'车位',
                    sellingprice:'预售价格',
                    payment:"支付方式",
                    notes:'备注',
                    furniture:'家具',
              },
              1:{
                    username:'name',
                    telphone:'contact no',
                    email:'email',
                    title:'project name',
                    type:'type',
                    tower:'tower/unit no',
                    layout:'layout',
                    size:'size',
                    faceto:'face to',
                    balcony:'balcony',
                    parking:'parking slot',
                    sellingprice:'selling price',
                    payment:"payment",
                    notes:'notes',
                    furniture:'furniture',
              }
          }
      }
  },
  components:{
    Header
  },
  mounted(){
    
  },
  methods:{
      clicknav(index){
          this.navindex = index;
      }
  }
}
</script>
<style lang="stylus" scoped>
.houselist
    .nav
        width 100%;
        .navcolor
            background #FFA54F;
            color white;
        span 
            width 0.6rem;
            height 0.3rem;
            display inline-block;
            margin 0.2rem 0.1rem;
            text-align center;
            line-height 0.3rem;
            background: #f8f8f9;
            color: #9399a5;
    .houseform
        width 94%;
        padding 0 3%;
        font-size 0.13rem;
        padding-bottom 0.5rem;
        input[type='checkbox']
        input[type='radio']
            position relative;
            top 0.01rem;
        .inputdiv
            width 100%;
            height 0.4rem;
            line-height 0.4rem;
            display flex;
            border-bottom 1px solid #ddd;
            span
                width 1rem;
                i
                    color #f43e5a;
            input
                flex 1;
                border none;
                outline none;
        .inputradio
            width 100%;
            line-height 0.4rem;
            display flex;
            border-bottom 1px solid #ddd;
            &>span
                width 1rem;
                i
                    color #f43e5a; 
            .radiolist
                flex 1
                padding 0.08rem 0;
                line-height 0.24rem;
                span
                    display inline-block;
                    margin 0 0.08rem 0 0;                       
        .textarea
            width 100%;
            height 0.6rem;
            line-height 0.6rem;
            display flex;
            border-bottom 1px solid #ddd;
            &>span
                width 1rem;
            textarea
                width 2.5rem;
                border 1px solid #ccc;    
                outline none;
        .btn
            width 2.6rem;
            height 0.36rem;
            background #ffa54f;
            text-align center;
            line-height 0.36rem;
            margin 0 auto;  
            border-radius 0.1rem;
            margin-top 0.2rem;
            color white;        
</style>