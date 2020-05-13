<template>
    <div class="imglist">
        <div class="title">
            <input type="file"  name="file" ref="file" multiple @change="changeFile" accept=".jpg, .jpeg, .png"/>
            <span>{{uodatatxt[getlanguage]}}</span>
        </div>
        <div class="imgArr">
            <img v-for="(item,index) in upImgArr" :key="index" :src="item" alt="" srcset="">
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    data(){
        return{
            formData:'',
            upImgArr:[],
            uodatatxt:{
              0:'选择图片(最多选择8张)',
              1:'Select pictures (up to 8 pictures)'
            },
        }
    },
    computed:{
        ...mapGetters(['getlanguage'])
    },
    methods:{
      changeFile(){
        this.formData = new FormData();
        let file = this.$refs.file
        this.upImgArr = []
        file.files.forEach((ele) => {
            this.formData.append('images', ele)
            this.upImgArr.push(URL.createObjectURL(ele))
        })
        this.$emit('senddata',this.formData)
      },
      clearImg(){
          this.upImgArr = [];
      }
    }
}
</script>
<style lang="stylus" scoped>
.imglist
    flex 1;
    .title
        width 100%;
        height 0.3rem;
        position relative;
        margin-bottom 0.15rem;
        input 
            width 100%;
            opacity 0;
            background transparent;
            position absolute;
            height 0.3rem;
            left 0;
            top 0;
        span
            background #f8f8f9;
            padding 0.05rem 0.1rem 0.05rem 0;
            border-radius 0.04rem;    
    .imgArr
        font-size 0;
        img
            width 0.5rem;
            margin-right 0.15rem;
            margin-bottom 0.1rem;
</style>