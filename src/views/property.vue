<template>
  <div class="detail">
    <Header :title="title[getlanguage]"></Header>
    <div class="contitle">{{contitle}}</div>
    <div class="content" v-html="content"></div>
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
      title:{
        
      },
      contitle:'',
      content:'',
      conarr:''
    }
  },
  components:{
    Header
  },
  mounted(){
    if(this.$route.query.type && this.$route.query.type == 1){
      this.title = {
        0:'房产资讯',
        1:'Property'
      }
    }else{
      this.title = {
        0:'菲常见闻',
        1:'Entertainment'  
      }
    }
    this.$post('/advisory/advisorydetail',{
      id:this.$route.query.id
    }).then((res)=>{
      if(res.error == '0000'){
        if(this.getlanguage == 0){
          this.contitle = res.data[0][0].title;
          this.conarr =  JSON.parse(res.data[0][0].content).sort(this.compare('num'))
        }else{
          this.contitle = res.data[1][0].title;
          this.conarr =  JSON.parse(res.data[1][0].content).sort(this.compare('num'))
        }
        
        this.conarr.map((ele)=>{
          if(ele.type == 1){
            this.content += `<div style='width:100%;margin-top:0.15rem'>
                              ${ele.content}
                            </div>` 
          }else{
            this.content += `<div style='width:100%;margin-top:0.15rem'>
                              <img style='width:100%' src=${ele.img} />
                             <div>`
          }
        })
      }
    })
    
  },
  methods:{
    compare(property){
      return function(a,b){
          var value1 = a[property];
          var value2 = b[property];
          return value1 - value2;
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.detail
  .contitle
    width 94%;
    margin 0.1rem auto 0.2rem;
    font-size 0.16rem;
    font-weight 900;
  .content
    width 94%;
    margin 0 auto; 
    padding-bottom 0.2rem;
    div
      width 100%;
      margin-top 0.1rem;
      img
        width 100%;             
</style>