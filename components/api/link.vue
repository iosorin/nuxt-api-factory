<template lang="pug">
    v-flex(xs6, sm4)
      nuxt-link(:to="'/dashboard/'+api.component")
        v-card(hover, color="grey darken-4", dark, img)
          v-img(
          :src="`images/${api.image}`",
          :lazy-src="`images/${api.image}`",
          aspect-ratio='1.6'
          )
          v-card-title
            div
              h3.headline.mb-0.text-uppercase {{api.title}}
              div {{api.description}}
</template>


<script>
export default {
    props: ['apidata'],

    data () {
        return {
            api: this.apidata
        }
    },

    computed: {
        clearUrl () {
            return this.api.title.toLowerCase().replace(/ /g, '-')
        }
    }
}
</script>

<style lang="stylus" scoped>
  .v-card
    height 100%
    display flex
    flex-direction column
    justify-content flex-end
    border none !important
    &__title
      background #424242 !important


  @media only screen and (max-width : 1600px)
    .v-card
      &__title
        padding 12px !important
        .headline
          font-size 17px !important
          + div
            font-size 13px
</style>
