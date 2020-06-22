<template>
  <div class="Blacklisthub">
    <Header :title="context.navtype[getlanguage][5]"></Header>
    <div class="content">
        <div class="nav">
            <span :class="{'navcolor':navindex == index}" v-for="(list,index) in context.blacknavtxt[getlanguage]"
                :key="index" @click="clicknav(index)">{{list.title}}</span>
        </div>
        <div class="conlist" v-if="navindex == 0">
            <div v-if="tabledata[getlanguage] && tabledata[getlanguage].length !=0">
                <div class="list" v-for="(list,index) in tabledata[getlanguage]" :key="index" @click="goblackcon(list)">
                    <div class="title">
                        <span class="name">{{list.title}}</span>
                        <span class="time">{{list.createtime}}</span>
                    </div>
                    <div class="con">
                        {{list.content.length > 50  ? list.content.substring(0,50) + '...' : list.content}}
                    </div>
                    <div class="imgarr">
                        <img v-for="(item,index) in JSON.parse(list.imgs)" :src="item" :key="index" alt="">
                    </div>
                </div>
            </div>
            <div v-else>
                <Nodata :tip='tip'></Nodata>
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
                <UpFile @senddata='getMsgForm'  @alertfun='alertfun' ref="ConFile"></UpFile>
            </div>
            <div class="inputdiv">
                <span>{{conformtxt[getlanguage].telphpne}}：</span>
                <input type="text" v-model="telphone" :placeholder="conformtxt[getlanguage].placeholdertel">
            </div>
            <div class="btn" @click="surebtn()">{{conformtxt[getlanguage].commitbtn}}</div>
        </div>
        <div class="alertbox" @touchmove.prevent v-if="alertflag">
            <div class="tip">
                <img src="../assets/commom/tip.png" alt="" srcset="">
                {{tiptext}}
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import Header from '../components/header'
import UpFile from '../components/upfile'
import Nodata from '../components/nodata'
export default {
  computed:{
    ...mapGetters(['getlanguage'])
  },
  watch:{
    alertflag(){
      if(this.alertflag){
        setTimeout(()=>{
          this.alertflag = false;
        },1500)
      }
    }
  },
  data(){
      return{
          //formData:'',
          tip:{
              0:'暂无数据',
              1:'no data'
          },
          alertflag:false,
          tiptext:'',
          navindex:0,
          tabledata:[],
          title:'',
          content:'',
          telphone:'',
          //upImgArr:[],
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
                  commitbtn:'Submission'
              }
          }
      }
  },
  components:{
    Nodata,  
    Header,
    UpFile
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
      getMsgForm(data){
        this.formData = data
      },
      clicknav(index){
          this.navindex = index;
      },
      initdata(){
          this.title = '';
          this.content = '';
          this.telphone = '';
          this.$refs.ConFile.clearImg()
      },
      goblackcon(list){
          sessionStorage.setItem('blackdetail',JSON.stringify(list))
          this.$router.push('/blackcon')
      },
      alertfun(){
        this.alertflag = true;
        this.tiptext = this.getlanguage == 0 ? "您上传的图片格式有误，请重新上传~" : "The format of the picture you uploaded is wrong, please upload again~"
      },
      surebtn(){
          if(!this.title){
            this.alertflag = true;
            this.tiptext = this.conformtxt[this.getlanguage].placeholdertitle;
            return;
          }
          if(!this.content){
            this.alertflag = true;
            this.tiptext = this.conformtxt[this.getlanguage].placeholdercontent;
            return;
          }
          if(!this.telphone){
            this.alertflag = true;
            this.tiptext = this.conformtxt[this.getlanguage].placeholdertel;
            return;
          }
          this.loadingflag(true)
          this.formData.append('title_c',this.getlanguage == '0' ? this.title : '');
          this.formData.append('content_c',this.getlanguage == '0' ? this.title : '');
          this.formData.append('title_e',this.getlanguage == '0' ? this.title : '');
          this.formData.append('content_e',this.getlanguage == '0' ? this.title : '');
          this.formData.append('telphone',this.telphone);
          this.$post('/black/updatecon',this.formData).then((res)=>{
               this.loadingflag(false)
              if(res.error == '0000'){
                  this.alertflag = true;
                  this.tiptext = '提交成功，待后台审核'
                  this.initdata();
              }
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