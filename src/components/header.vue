<template>
  <div class="header">
      <img @click="$router.back(-1)" class="left" src="../assets/commom/left.png" alt="">
      <span class="title">{{title}}</span>
  </div>
</template>

<script>
export default {
  name: 'calltel',
  props: ['title']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.header
  width 96%;
  padding 0 2%;
  margin 0 auto;
  height 0.5rem;
  background #FFA54F;
  position relative;
  text-align center;
  line-height 0.5rem;
  font-size 0.2rem;
  .left
    width 0.3rem;
    position absolute;
    left 0;
    top 0.1rem;
</style>
