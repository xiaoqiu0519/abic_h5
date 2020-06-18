<template>
  <div class="news">
    <Header :title="context.navtype[getlanguage][4]"></Header>
    <nav class="nav">
        <div :class="{'selectfontcolor':navindex == 0}" @click="clicknav(0)">{{getlanguage == 0 ? "常见问题" : "Q & A"}}</div>
        <div :class="{'selectfontcolor':navindex == 1}" @click="clicknav(1)">{{getlanguage == 0 ? "房产资讯" : "Property"}}</div>
        <div :class="{'selectfontcolor':navindex == 2}" @click="clicknav(2)">{{getlanguage == 0 ? "菲常见闻" : "Entertainment"}}</div>
    </nav>
    <div class="qusetent" v-if="navindex == 0">
        <div class="list" v-for="(list,index) in questentArr[getlanguage]" :key="index">
            <div class="title">{{list.questent}}</div>
            <div class="con">{{list.answer}}</div>
        </div>
    </div>
    <div class="newscon" v-else>
      <div v-if="advisorydata[getlanguage] && advisorydata[getlanguage].length != 0">
        <div class="list" @click="godetail(list)" v-for="(list,index) in advisorydata[getlanguage]" :key="index">
          <div class="title">
            <p>{{list.title}}</p>
            <p class="time">{{list.createtime | formatDate('yyyy-mm-dd')}}</p>
          </div>
          <div class="img" v-if='advisorydata[getlanguage][index].imgArr.length != 0'>
            <img :src="advisorydata[getlanguage][index].imgArr[0]" alt="">
          </div>
        </div>
      </div>
      <div v-else style="margin-top:1rem">
        <Nodata :tip='tip'></Nodata>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import Header from '../components/header'
import Nodata from '../components/nodata'
export default {
  computed:{
    ...mapGetters(['getlanguage'])
  },
  data(){
    return{
      navindex:0,
      questentArr:[],
      advisorydata:[],
      conarr:'',
      sloganImg:'',
      tip:{
          0:'暂无数据',
          1:'no data'
      },
    }
  },
  components:{
    Header,
    Nodata
  },
  mounted(){
    this.navindex = sessionStorage.getItem('navindex') || 0
    this.init()
    
  },
  methods:{
      init(){
        if(this.navindex == 0){
          this.questentgetlist()
        }else if(this.navindex == 1){
          this.advisorylist(1)
        }else{
          this.advisorylist(2)
        }
      },
      clicknav(index){
        this.navindex = index;
        this.init()
        sessionStorage.setItem('navindex',index)
      },
      questentgetlist(){
        this.loadingflag(true)
        this.$post("/questent/getlist").then((res)=>{
          this.loadingflag(false)
          if(res.error == '0000'){
            this.questentArr = res.data;
          }
        })
      },
      advisorylist(newtype){
        this.advisorydata = []
        this.loadingflag(true)
        this.$post('/advisory/list',{
          params:JSON.stringify({
              type:newtype,
              status:1
          }),
        }).then((res)=>{
          this.loadingflag(false)
          if(res.error == '0000'){
            this.advisorydata = res.data
            for (let i = 0; i < res.data[0].length; i++) {
              this.advisorydata[0][i]['imgArr'] = []
              this.advisorydata[1][i]['imgArr'] = []
              let conarr = ''
              if(this.getlanguage == 0){
                conarr =  JSON.parse(res.data[0][i].content).sort(this.compare('num'))
              }else{
                conarr =  JSON.parse(res.data[1][i].content).sort(this.compare('num'))
              }
              for(let j = 0; j < conarr.length ; j++ ){
                if(conarr[j].type == 2){
                  this.advisorydata[0][i].imgArr.push(conarr[j].img)
                  this.advisorydata[1][i].imgArr.push(conarr[j].img)
                }
              }
            }
          }
        })
      },
      compare(property){
        return function(a,b){
            var value1 = a[property];
            var value2 = b[property];
            return value1 - value2;
        }
      },
      godetail(list){
        this.$router.push('/property?id='+ list.id + '&type=' + this.navindex)
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
    .newscon
      width 94%;
      margin 0 auto;
      padding-bottom 0.2rem;
      .list
        width 100%;
        height 1rem;
        padding 0.1rem 0;
        display flex;
        justify-content space-between;
        border-bottom 1px solid #ddd;
        align-items center;
        .title
          display flex;
          flex-wrap wrap;
          p
            width 100%;
          .time
            margin-top 0.1rem;
            color: #999
            font-size 0.12rem;
        .img
          width 1.5rem;
          height 1rem; 
          img
            width 1.5rem;
            height 1rem;                    
</style>