<template>
  <div class="houselist">
    <Header :title="context.navtype[getlanguage][3]"></Header>
    <div class="nav">
        <span :class="{'navcolor':navindex == 0}" @click="clicknav(0)">出售</span>
        <span :class="{'navcolor':navindex == 1}" @click="clicknav(1)">租赁</span>
    </div>
    <div class="houseform">
        <div class="inputdiv">
            <span><i> * </i> 姓名</span>
            <input type="text" placeholder="请输入姓名">
        </div>
        <div class="inputdiv">
            <span><i> * </i> 电话</span>
            <input type="text" placeholder="请输入电话">
        </div>
        <div class="inputdiv">
            <span><i> * </i> 邮箱</span>
            <input type="text" placeholder="请输入邮箱">
        </div>
        <div class="inputdiv">
            <span><i> * </i> 楼盘名称</span>
            <input type="text" placeholder="请输入楼盘名称">
        </div>
        <div class="inputradio">
            <span><i> * </i> 房屋类型</span>
            <div class="radiolist">
                <span><input type="radio" name="housetype" id="">公寓</span>
                <span><input type="radio" name="housetype" id="">旺铺</span>
                <span><input type="radio" name="housetype" id="">办公室</span>
                <span><input type="radio" name="housetype" id="">土地</span>
            </div>
        </div>
        <div class="inputdiv">
            <span><i> * </i> 单元号&门牌号</span>
            <input type="text" placeholder="请输入单元号&门牌号">
        </div>
        <div class="inputradio">
            <span><i> * </i> 户型</span>
            <div class="radiolist">
                <span><input type="radio" name="layout" id="">单间</span>
                <span><input type="radio" name="layout" id="">1室1厅</span>
                <span><input type="radio" name="layout" id="">2室1厅</span>
                <span><input type="radio" name="layout" id="">3室1厅</span>
                <span><input type="radio" name="layout" id="">其它</span>
            </div>
        </div>
        <div class="inputdiv">
            <span><i> * </i> 面积</span>
            <input type="text" placeholder="请输入房产面积">
            <i>m²</i>
        </div>
        <div class="inputradio">
            <span><i> * </i> 朝向</span>
            <div class="radiolist">
                <span><input type="radio" name="face" id="">东</span>
                <span><input type="radio" name="face" id="">南</span>
                <span><input type="radio" name="face" id="">西</span>
                <span><input type="radio" name="face" id="">北</span>
            </div>
        </div>
        <div class="inputradio">
            <span><i> * </i> 阳台</span>
            <div class="radiolist">
                <span><input type="radio" name="balcony" id="">有</span>
                <span><input type="radio" name="balcony" id="">无</span>
            </div>
        </div>
        <div class="inputradio">
            <span><i> * </i> 车位</span>
            <div class="radiolist">
                <span><input type="radio" name="parking" id="">有</span>
                <span><input type="radio" name="parking" id="">无</span>
            </div>
        </div>
        <div class="inputdiv">
            <span><i> * </i> 预期售价</span>
            <input type="text" placeholder="请输入预期售价">
        </div>
        <div class="inputradio">
            <span><i> * </i> 付款方式</span>
            <div class="radiolist">
                <span><input type="radio" name="payment" id="">压2付6</span>
                <span><input type="radio" name="payment" id="">压2付1年</span>
                <span><input type="radio" name="payment" id="">2+2+预付支票</span>
                <span><input type="radio" name="payment" id="">其他</span>
            </div>
        </div>
        <div class="textarea">
            <span>备注</span>
            <textarea name="beizhu" placeholder="300字以内"></textarea>
        </div>
        <div class="inputradio">
            <span><i> * </i> 家具</span>
            <div class="radiolist">
                <span><input type="checkbox" v-model="furniture" value="1" id="">洗衣机</span>
                <span><input type="checkbox" v-model="furniture" value="2" id="">热水器</span>
                <span><input type="checkbox" v-model="furniture" value="3" id="">冰箱</span>
                <span><input type="checkbox" v-model="furniture" value="4" id="">电视机</span>
                <span><input type="checkbox" v-model="furniture" value="5" id="">桌椅</span>
                <span><input type="checkbox" v-model="furniture" value="6" id="">沙发</span>
                <span><input type="checkbox" v-model="furniture" value="7" id="">茶几</span>
                <span><input type="checkbox" v-model="furniture" value="8" id="">床</span>
            </div> 
        </div>
        <div class="btn">确认提交</div>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import Header from '../components/header'
export default {
  computed:{
    ...mapGetters(['getlanguage'])
  },
  data(){
      return{
          navindex:0,
          furniture:[1,2,3,4,5]
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