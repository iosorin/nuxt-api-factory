<template lang="pug">
  v-card.elevation-10(color="black")
    v-carousel.elevation-0(
      delimiter-icon="trending_flat"
      hide-delimiters
      next-icon="arrow_right"
      prev-icon="arrow_left"
      :cycle="false"
      height="70vh"
      dark
      )
      v-carousel-item(v-for='(item,i) in data', :key='i')
        blockquote.blockquote
          h4.display-1.font-weight-thin {{item.quote}}
          h5.blockquote_author.display-4.font-weight-black {{item.author}}
</template>

<script>
export default {
    props: ['data']
}
</script>

<style lang="stylus" scoped>
  .blockquote
    text-align center
    position absolute
    width 100%
    height 100%
    left 0
    bottom 0
    display flex
    align-items center
    justify-content center
    h4
      width 50%
    &_author
      position absolute
      width 100%
      left 0
      bottom 20px
      color #e7b312 !important

</style>
