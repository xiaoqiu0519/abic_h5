<template>
  <div class="houselist">
    <Header :title="context.navtype[getlanguage][0]"></Header>
    <houselist :housedata = 'housedata' v-if="housedata[getlanguage] && housedata[getlanguage].length !=0"></houselist>
    <div class="nodata" v-else>
      <Nodata></Nodata>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import Header from '../components/header';
import houselist from '../components/housemes';
import Nodata from '../components/nodata'
export default {
  computed:{
    ...mapGetters(['getlanguage'])
  },
  data(){
    return{
      housedata:[],
      housetype:''
    }
  },
  components:{
    Header,
    houselist,
    Nodata
  },
  mounted(){
    this.housetype = this.$route.query.type;
    this.gethouselist();
  },
  methods:{
    gethouselist(){
       this.loadingflag(true)
      this.$post('/house/houselist',{
        params:JSON.stringify({type:this.housetype,status:1})
      }).then((res)=>{
         this.loadingflag(false)
          if(res.error == '0000'){
            this.housedata = res.data
          }
      })
    },
  }
}
</script>
<style lang="stylus" scoped>
.nodata
  margin-top 1rem;
</style>