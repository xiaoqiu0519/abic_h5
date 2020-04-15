<template>
  <div class="aboutus">
    <Header :title="context.navtype[getlanguage][7]"></Header>
    <div class="content" v-if="getlanguage == 0">
        <div class="list gywm">
            <div class="title">关于我们</div>
            <p>超前房产成立于2018年</p> 
            <p>立志于和菲律宾本地大品牌开发商合作</p> 
            <p>根据不同客户的需求量身定制</p> 
            <p>投资方案， 从选房，交易，收房，租赁托管提供一条龙服务</p> 
            <p>确保交易的合法性， 公平性</p> 
            <p>是一家值得信赖的房产中介公司</p>
        </div>
        <div class="list lxwm">
            <div class="title">联系我们</div>
            <p>联系电话：00639155800518 / 0063915710777</p> 
            <p>公司地址： unit 601A Fedman suites bldg 199 salcedo st Makati city Metro Manila </p> 
        </div>
    </div>
    <div class="content" v-else>
        <div class="list gywm">
            <div class="title">About Us</div>
            <p>ABIC REALTY has been established as a real estate company in the Philippines since 2018</p> 
            <p>We based on the demands that are factored with investments in the real estate industry</p>
            <p>We are also certified by different reputable developer that is highly know in the Philippines</p>  
            <p>which is great and trusted company, assets in puchasing for sale properties on global markets</p> 
            <p>The company undertakes all maintenance duties for real estate facilities and organizations and conducts all the security and checking for the properties to secure the</p> 
            <p>clients security and money for there investments and own safety</p> 
        </div>
        <div class="list lxwm">
            <div class="title">CONTACT US</div>
            <p>company contact：00639155800518 / 0063915710777</p> 
            <p>company address：unit 601A Fedman suites bldg 199 salcedo st Makati city Metro Manila</p> 
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
</style>