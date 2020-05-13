<template>
    <div class="nodata">
        <img src="../assets/commom/nodata-file.png" alt="" srcset="">
        <span>{{nodatames[getlanguage]}}</span> 
    </div>
</template>
<script>
import {mapGetters } from 'vuex'
export default {
    data(){
        return{
            nodatames:{
                0:'一大波房源信息即将到来，敬请期待',
                1:'A wave of listing information is coming, so stay tuned'
            }
        }
    },
    computed:{
        ...mapGetters(['getlanguage'])
    },
}
</script>
<style lang="stylus" scoped>
    .nodata
        width 100%;
        margin 0.2rem 0;
        text-align center;
        img 
            display block;
            width 1.2rem;
            margin 0.2rem auto;
</style>