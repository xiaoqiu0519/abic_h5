<template>
  <div class="aboutus">
    <Header :title="context.navtype[getlanguage][7]"></Header>
    <div class="content" v-if="getlanguage == 0">
        <div class="list gywm">
            <div class="title">关于我们</div>
            <p>超前房产成立于2018年，致力于成为一家值得信赖的房产中介公司。超前房产与菲律宾本地优秀的大品牌开发商合作，根据不同客户的不同需求，为客户量身定制投资方案。我们从选房，交易，收房和租赁托管提供一条龙服务，并确保交易过程中所需文件的合法性。我们秉承“诚信所以简单，专业所以放心”的经营理念，为您的房产交易保驾护航。</p>
        </div>
        <div class="list lxwm">
            <div class="title">联系我们：</div>
            <div class="nav">
              <div class="tit">手 <span style="margin-left:0.2rem"></span> 机：</div> 
              <div class="con">
                <p><a href="tel:0063-9155800518">+63 9155800518</a> 中文</p>
                <p><a href="tel:0063-915710777">+63 9157100777</a> 英文</p>
              </div>
            </div> 
            <div class="nav">
              <div class="tit">座 <span style="margin-left:0.2rem"></span> 机：</div>
              <div class="con">
                <p><a href="tel:0063-72405150">872405150</a></p>
              </div>
            </div> 
            <div class="nav">
              <div class="tit">小 飞 <span style="margin-left:0.05rem"></span> 机：</div>
              <div class="con">
                <p><a href="tel:09155800518">09155800518</a></p>
              </div>
            </div> 
            <div class="nav">
              <div class="tit">邮 <span style="margin-left:0.2rem"></span> 箱：</div>
              <div class="con">
                <p>abicrealty@gmail.com</p>
              </div>
            </div> 
            <div class="nav">
              <div class="tit">微 <span style="margin-left:0.2rem"></span> 信：</div>
              <div class="con"><img class="wechart" src="../assets/commom/wechat.jpg" alt="" srcset=""></div>
            </div>
            <div class="nav">
              <div class="tit">公司地址：</div>
              <div class="con">unit 601A Fedman suites bldg 199 salcedo st Makati city Metro Manila</div>
            </div> 
        </div>
    </div>
    <div class="content" v-else>
        <div class="list gywm">
            <div class="title">About Us</div>
            <p>ABIC REALTY has been established as a real estate company in the Philippines since 2018 .  
            We based on the demands that are factored with investments in the real estate industry .
            We are also certified by different reputable developer that is highly know in the Philippines . 
            which is great and trusted company, assets in puchasing for sale properties on global markets .
            The company undertakes all maintenance duties for real estate facilities and organizations and conducts all the security and checking for the properties to secure the .
            clients security and money for there investments and own safety</p> 
        </div>
        <div class="list lxwm">
          <div class="title">CONTACT US</div>
            <div class="nav">
              <div class="tit">Mobile</div>：
              <div class="con">
                <p><a href="tel:0063-9155800518">+63 9155800518</a> Chinese</p>
                <p><a href="tel:0063-9155800518">+63 9157100777</a> English</p>
              </div>
            </div> 
            <div class="nav">
              <div class="tit">Landline</div>：
              <div class="con">
                <p><a href="tel:0063-72405150">872405150</a></p>
              </div>
            </div> 
            <div class="nav">
              <div class="tit">Telegram</div>：
              <div class="con">
                <p><a href="tel:09155800518">09155800518</a></p>
              </div>
            </div> 
            <div class="nav">
              <div class="tit">Email</div>：
              <div class="con">
                <p>abicrealty@gmail.com</p>
              </div>
            </div> 
            <div class="nav">
              <div class="tit">WeChat</div>：
              <div><img class="wechart" src="../assets/commom/wechat.jpg" alt="" srcset=""></div>
            </div>
            <div class="nav">
              <div class="tit">company address</div>：
              <div class="con">unit 601A Fedman suites bldg 199 salcedo st Makati city Metro Manila</div>
            </div> 
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
  components:{
    Header
  },
  mounted(){
    
  }
}
</script>
<style lang="stylus" scoped>
.aboutus
    .content
        font-size 0.13rem;
        .list
            width 96%;
            margin 0 auto;
            margin-top 0.3rem;
            line-height 0.24rem;
            .title
              font-size 0.2rem;
              font-weight 600;
              padding-bottom 0.15rem;
            .nav
              width 100%;
              display flex; 
              margin-bottom 0.1rem;
              .tit
                width 0.7rem;
              .con
                flex 1;  
              img
                border 1px solid #999999;  
    .wechart
      width 2rem;
      text-align center;
</style>