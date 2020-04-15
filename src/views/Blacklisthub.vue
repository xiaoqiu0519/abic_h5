<template>
  <div class="Blacklisthub">
    <Header :title="context.navtype[getlanguage][5]"></Header>
    <div class="content">
        <div class="nav">
            <span :class="{'navcolor':navindex == index}" v-for="(list,index) in context.blacknavtxt[getlanguage]"
                :key="index" @click="clicknav(index)">{{list.title}}</span>
        </div>
        <div class="conlist" v-if="navindex == 0">
            <div class="list" v-for="(list,index) in tabledata[getlanguage]" :key="index" @click="goblackcon(list)">
                <div class="title">
                    <span class="name">{{list.title}}</span>
                    <span class="time">{{list.createtime}}</span>
                </div>
                <div class="con">
                    {{list.content.length > 50  ? list.content.substring(0,50) + '...' : list.content}}
                </div>
                <div class="imgarr">
                    <img src="../assets/commom/house.png" v-for="(list,index) in 4" :key="index" alt="">
                </div>
            </div>
        </div>
        <div class="conform" v-else>
            <div class="inputdiv">
                <span>{{conformtxt[getlanguage].title}}：</span>
                <input type="text" v-model="title" :placeholder="conformtxt[getlanguage].placeholdertitle">
            </div>
            <div class="inputarea">
                <span>{{conformtxt[getlanguage].content}}：</span>
                <textarea name="" v-model="content" id="" cols="30" rows="10" 
                    :placeholder="conformtxt[getlanguage].placeholdercontent"></textarea>
            </div>
            <div class="updata">
                <span>{{conformtxt[getlanguage].updateimg}}：</span>
                <div class="imglist">

                </div>
            </div>
            <div class="inputdiv">
                <span>{{conformtxt[getlanguage].telphpne}}：</span>
                <input type="text" v-model="telphone" :placeholder="conformtxt[getlanguage].placeholdertel">
            </div>
            <div class="btn" @click="surebtn()">{{conformtxt[getlanguage].commitbtn}}</div>
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
          tabledata:[],
          title:'',
          content:'',
          telphone:'',
          conformtxt:{
              0:{
                  title:'标题',
                  placeholdertitle:'请输入标题',
                  content:'内容',
                  placeholdercontent:'请输入内容',
                  updateimg:'上传图片',
                  telphpne:'您的电话',
                  placeholdertel:'请输入您的电话以方便联系',
                  commitbtn:'确认提交'
              },
              1:{
                  title:'title',
                  placeholdertitle:'Please enter a title',
                  content:'content',
                  placeholdercontent:'Please enter a content',
                  updateimg:'Update Img',
                  telphpne:'telphone',
                  placeholdertel:'Please enter your phone',
                  commitbtn:'submission'
              }
          }
      }
  },
  components:{
    Header
  },
  mounted(){
    this.getblacklist()
  },
  methods:{
      getblacklist(){
          this.loadingflag(true)
        this.$post('/black/getlist',{
            status:'1'
        }).then((res)=>{
            this.loadingflag(false)
            if(res.error == '0000'){
                this.tabledata = res.data;
            }
        });
      },
      clicknav(index){
          this.navindex = index;
      },
      goblackcon(list){
          sessionStorage.setItem('blackdetail',JSON.stringify(list))
          this.$router.push('/blackcon')
      },
      surebtn(){
          this.$post('/black/updatecon',{
            title_c:this.getlanguage == '0' ? this.title : '',
            content_c:this.getlanguage == '0' ? this.content : '',
            title_e:this.getlanguage == '1' ? this.title : '',
            content_e:this.getlanguage == '1' ? this.content : '',
            telphone:this.telphone
          }).then((res)=>{
              console.log(res)
          })
      }
  }
}
</script>
<style lang="stylus" scoped>
.Blacklisthub
    .content
        width 94%;
        padding 0 3%;
        margin 0 auto;
        .nav
            width 100%;
            .navcolor
                background #FFA54F;
                color white;
            span 
                padding 0 0.1rem;
                height 0.3rem;
                display inline-block;
                margin 0.2rem 0.1rem;
                text-align center;
                line-height 0.3rem;
                background: #f8f8f9;
                color: #9399a5;
        .conlist
            width 100%;
            .list
                border-bottom 1px solid #ccc;
                margin-bottom 0.2rem;
                .title
                    width 100%;
                    line-height 0.3rem;
                    display flex;
                    justify-content space-between;
                    margin-bottom 0.06rem;
                    .name
                        width 2.6rem;
                        font-weight 600;
                        font-size 0.16rem;
                        color #333333;
                    .time
                        text-align right;
                        color #999;  
                .con
                    line-height 0.2rem;
                    font-size 0.12rem;
                    margin-bottom 0.06rem;
                .imgarr
                    width 100%;
                    margin-bottom 0.1rem;
                    img
                        width 0.6rem;
                        margin 0.1rem 0.1rem 0rem 0;

        .conform
            width 100%;
            &>div
                margin-top 0.1rem;
            .inputdiv
                height 0.4rem;
                margin 0 auto;
                display flex;
                align-items center;
                margin-top 0.1rem;
                span
                    width 0.8rem;
                input
                    flex 1;
                    border 1px solid #ccc;
                    height 0.3rem;
                    outline none;
            .inputarea
                display flex;
                span 
                    width 0.8rem;
                textarea
                    flex 1;   
                    outline none;     
                    border 1px solid #ccc;
            .updata
                display flex;
                span
                    width 0.8rem;
                .imglist
                    flex 1;
                    height 1rem;
                    background red;
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