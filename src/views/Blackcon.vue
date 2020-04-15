<template>
  <div class="blackcon">
    <Header :title="context.navtype[getlanguage][5]"></Header>
    <div class="blackimg"></div>
    <div class="con">
        {{blackdetail.content}}
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
      blackdetail:''
    }
  },
  components:{
    Header
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
    height 2.6rem;
  .con
    width 94%;
    margin 0 auto;
    line-height 0.2rem;  
</style>