<template lang="pug">
  no-ssr
    .preloader__wrapper(:class="{active: loading}")
      span
      span
      span
</template>

<script>
export default {
	computed: {
		loading () {
			return this.$store.getters.loading
		}
	}
}
</script>

<style scoped lang="stylus">
  animationDelay = -0.23s
  .preloader__wrapper
    width 100vw
    height 100vh
    display flex
    justify-content center
    align-items center
    position absolute
    top 0
    left 0
    z-index 999
    background-image linear-gradient(to top, #fff1eb 0%, #ace0f9 100%)
    opacity 0
    transition .3s ease-in
    visibility hidden
    user-select none
    pointer-events none
    &.active
      user-select all
      pointer-events all
      opacity 0.35
      transition .3s ease-out
      visibility visible
    > span
      width 30px
      opacity 0.8
      height @width
      display flex
      margin-right 8px
      background-color black
      border-radius 50%
      animation loader 1.1s infinite ease-in-out both
      z-index 9999
      &:nth-child(2)
        animation-delay animationDelay - 50%
      &:nth-child(3)
        animation-delay animationDelay
        margin-right 0

  @keyframes loader
    0%, 80%, 100%
      transform scale(0)
    40%
      transform scale(1.0)
</style>
