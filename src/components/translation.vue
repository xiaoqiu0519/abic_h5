<template>
  <div class="translation">
    <div class="language" v-if="isshowlanguage">
      <span :class="{selectcolor:getlanguage == 0}" @click.stop="ChangeLangugaeAsy(0)">中文</span>  / 
      <span :class="{selectcolor:getlanguage == 1}" @click.stop="ChangeLangugaeAsy(1)">English</span>
     <!-- <img @click.stop="changelanguageflag" src="../assets/commom/close.png" alt=""> -->
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  computed:{
    ...mapGetters(['getlanguage'])
  },
  data(){
      return{
          isshowlanguage: 1
      }
  },
  mounted(){
    // let LANGUAGETYPE = sessionStorage.getItem('languagetype') ? sessionStorage.getItem('languagetype') : 1; //1中文   2英文  
    // this.ChangeLangugaeAsy(LANGUAGETYPE);
  },
  methods:{
   ChangeLangugaeAsy(LANGUAGETYPE){
     sessionStorage.setItem('languagetype',LANGUAGETYPE)
     this.$store.dispatch('ChangeLangugaeAsy',LANGUAGETYPE);
   },
   changelanguageflag(){
     this.isshowlanguage = false;
     sessionStorage.setItem('languageflag',false)
   }
  }
}
</script>
<style lang="stylus" scoped>
.language
    width 0.8rem;
    height 0.5rem;
    line-height 0.5rem;
    // background #3072f6;
    position absolute;
    right 3%;
    top 0rem;
    color white;
    font-size 0.12rem;
    display flex;
    justify-content space-around;
    align-items center;
    z-index 9999;
    img 
      width 0.2rem;
      height 0.2rem;   
    .selectcolor
      color #3072f6  
      font-weight: 600
</style>