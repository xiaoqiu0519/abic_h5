<template>
  <div class="business">
    <Header :title="context.navtype[getlanguage][6]"></Header>
    <div class="content" v-if="getlanguage == 0">
        <div class="list">
            <div class="title">
              <img src="../assets/commom/chaoqianguoji.png" alt="" srcset="">
            </div>
            <p>官方网站：<a href="http://www.zixunph.com">http://www.zixunph.com</a></p> 
            <p>公司简介：超前国际创始人于2015在菲律宾从事 人力招聘以及商业咨询的相关业务。于 2018年正式成立超前国际咨询有限公司， 公司位于菲律宾的首都马尼拉。让更多的人能够更快 更好地了解菲律宾。我们的服务包含公司 注册、税务托管、移民签证、人力资源招 聘、和留学。
                公司拥有资深的律师，会计师和审计 师，是一支朝气蓬勃积极向上的专业团队。</p> 
        </div>
        <div class="list">
            <div class="title">
              <img src="../assets/commom/wdly.png" alt="" srcset="">
            </div>
            <p>官方网站：<a href="http://www.victoria-ph.com/">http://www.victoria-ph.com/</a></p> 
            <p>公司简介：菲律宾维多利亚地接社是一家在菲律宾正式注册的专门从事国际旅游业务的综合公司。旅行社拥有一支专业熟练、经验丰富的旅游专业人员和导游队伍。组织和接待各国公民赴菲律宾观光旅游、
                商务活动、学术交流、参观会展、国际会议、投资洽谈等业务，并承担中国客人到菲观光旅游事宜，为国内外游客提供交通、机票、导游、翻译、等服务。</p> 
        </div>
    </div>
    <div class="content" v-else>
        <div class="list">
            <div class="title">
              <img src="../assets/commom/chaoqianguoji.png" alt="" srcset="">
            </div>
            <p>official website：<a href="http://www.zixunph.com">http://www.zixunph.com</a></p> 
            <p>company profile ：The founder started to do the related work  in 2015 ,Later on Adbvance beyond international consulting Inc is
                officially established in 2018 which is located in the business district Makati -the  heart of Metro manila .
                The company  has a team of professional attorney ,accountant & auditor  to make your business has a  successful set up
                We provide services like  business registration,accounting ,visa ,recruitment and study abroad .
                </p> 
        </div>
        <div class="list">
            <div class="title">
              <img src="../assets/commom/wdly.png" alt="" srcset="">
            </div>
            <p>official website：<a href="http://www.victoria-ph.com/">http://www.victoria-ph.com/</a></p> 
            <p>company profile ：Victoria Travel and Tours is an integrated company officially registered in the Philippines specializing in international tourism.	Victoria Travel and Tours is an integrated company officially registered in the Philippines specializing in international tourism.	Victoria Travel and Tours is an integrated company officially registered in the Philippines specializing in international tourism.	Victoria Travel and Tours is an integrated company officially registered in the Philippines specializing in international tourism.
                The travel agency has a team of skilled and experienced tour professionals and tour guides. 			
                We organize and cater citizens from all countries to visit the Philippines for sightseeing, business activities, academic exchanges,			
                exhibitions, international conferences and other business. We provide transportation, air tickets, guided tours,			
                translation, other services.			
                </p> 
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
.business
    .content
        padding-bottom 0.3rem
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
                img
                  width 1.2rem;
</style>