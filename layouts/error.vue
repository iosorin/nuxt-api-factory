<template lang="pug">
    v-layout
      v-flex(xs12, sm6, offset-sm3)
        v-card(color="transparent")
          v-card-actions.mb-5
            v-btn(nuxt, to="/", flat, color='white') HOME
            v-btn(nuxt, to="/dashboard", flat, color='white', active-class="transparent") /DASHBOARD
          v-card-title.text-xs--center(primary-title)
            div
              h1.display-4.text-uppercase( v-if="error.statusCode === 404" ) Page not found
              h1.display-4.text-uppercase(v-else) Something went wrong

</template>

<script>
export default {
	props: ['error'],
	created () {
	 	this.$store.dispatch('setLoading', null)
	}
}
</script>


<style scoped lang="stylus">
.v-card
    box-shadow: none !important
</style>