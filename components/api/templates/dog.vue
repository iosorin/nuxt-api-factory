<template lang="pug">
    v-container.pa-0(grid-list-lg, fluid)
      v-layout(row, wrap)
        v-flex(v-for='(image, n) in images', :key='n', xs3, d-flex)
          v-card.d-flex
            v-img.grey.lighten-2(
            :src='image',
            :lazy-src='image',
            aspect-ratio='1.21'
            position="top center"
            )
              template(v-slot:placeholder)
                v-layout(fill-height, align-center, justify-center, ma-0)
                  v-progress-circular(indeterminate, color='grey lighten-5')

</template>


<script>
export default {
	props: ['data'],
	computed: {
		images () {
			return this.data.slice(0, 12)
		}
	}
}
</script>


<style lang="stylus" scoped>
  .v-card
    border-radius: 10px
  
</style>