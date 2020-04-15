<template>
    <div class="nodata">
        {{nodatames[getlanguage]}}
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
</style>