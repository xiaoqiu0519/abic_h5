<template>
  <div class="blackcon">
    <Header :title="context.navtype[getlanguage][5]"></Header>
    <div class="blackimg">
      <Swiper :options="swiperOption" v-if="blackdetail">
        <swiper-slide v-for="(item,index) in JSON.parse(blackdetail.imgs)" :key="index"><img :src="item"></swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </Swiper>
    </div>
    <div class="black_con" v-html="blackdetail.content"></div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import Header from '../components/header'
export default {
  name:'blackcon',
  computed:{
    ...mapGetters(['getlanguage'])
  },
  data(){
    return{
      blackdetail:'',
      swiperOption: {//swiper3
        pagination: {
          el: '.swiper-pagination'
        },
        autoplay: 3000,
        speed: 1000,
      }
    }
  },
  components:{
    Header,
    Swiper,
    SwiperSlide
  },
  mounted(){
    if(sessionStorage.getItem('blackdetail')){
      this.blackdetail = JSON.parse(sessionStorage.getItem('blackdetail'))
    }else{
      this.$router.back('-1')
    }
  }
}
</script>
<style lang="stylus" scoped>
.blackcon
  .blackimg
    width 100%;
    line-height 100%;
    text-align center;
    img
      width 100%;
      max-height 2.6rem;
</style>
<style lang="stylus">
  .blackimg
    .swiper-slide
      display flex;
      height 2.6rem;
      justify-content center;
      align-items center;
  .black_con
    width 94%;
    margin 0 auto;
    line-height 0.2rem;  
    h3
      margin 0.2rem 0;
      font-size 0.14rem;
      font-weight 900;
    p
      margin  0.1rem 0;
</style>