<template>
  <div class="news">
    <Header :title="context.navtype[getlanguage][4]"></Header>
    <nav class="nav">
        <div :class="{'selectfontcolor':navindex == 0}" @click="clicknav(0)">常见问题</div>
        <div :class="{'selectfontcolor':navindex == 1}" @click="clicknav(1)">房产资讯</div>
        <div :class="{'selectfontcolor':navindex == 2}" @click="clicknav(2)">菲常见闻</div>
    </nav>
    <div class="qusetent" v-if="navindex == 0">
        <div class="list" v-for="(list,index) in questentArr[getlanguage]" :key="index">
            <div class="title">{{list.questent}}</div>
            <div class="con">{{list.answer}}</div>
        </div>
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
      questentArr:[]
    }
  },
  components:{
    Header
  },
  mounted(){
    this.getlist()
  },
  methods:{
      clicknav(index){
          this.navindex = index;
      },
      getlist(){
        this.loadingflag(true)
        this.$get("/questent/getlist").then((res)=>{
          this.loadingflag(false)
          if(res.error == '0000'){
            this.questentArr = res.data;
          }
        })
      }
  }
}
</script>
<style lang="stylus" scoped>
.news
    width 100%;
    .nav
        width 94%;
        margin 0 auto;
        padding 0 3%;
        height 0.4rem;
        line-height 0.4rem;
        display flex;
        border-bottom 1px solid #dddddd;
        div    
            flex 1;
            text-align center;
    .qusetent
        width 94%;
        margin 0 auto;
        .list
            width 100%;
            margin-top 0.2rem;
            margin-bottom 0.2rem;
            padding-bottom 0.1rem;
            border-bottom 1px solid #eeeeee;
            .title
                width 100%;
                font-size 0.16rem;
                color #333333;
                font-weight 600; 
                margin-bottom 0.1rem;
            .con
                line-height 0.2rem;           
</style>