<template lang="pug">
	v-container(fluid, grid-list-lg, fill-height, justify-center)
		v-fade-transition
			v-flex.h100(xs12, md10, xl8 v-show="loaded")
				v-layout(row, wrap, v-show="loaded")
					v-flex(xs12).d-flex.mt-5
						h2.headline.d-flex.align-center.text-uppercase {{TITLE}}
						.text-xs-right
							v-btn(nuxt, to="/dashboard", color="white", light) go back
					v-flex.mt-4(xs12)
						Component(:is="component", :data="DATA")
</template>

<script>
	const getInstance = slug => ({
		component: import(`~/components/api/templates/${slug}`)
	})

	export default {
		data () {
			return {
				TITLE: '',
				DATA: [],
				loaded: false
			}
		},
		beforeCreate () {
			this.component = () => getInstance(this.$route.params.slug)
		},
		created () {
			this.initAPI(this.$route.params.slug)
		},
		computed: {
			API () {
				return this.$store.getters.API
			},
			APIData () {
				return this.$store.getters.APIData
			},
			APITitle () {
				return this.API.info.title
			}
		},
		mounted () {
	
		},
		methods: {
			initAPI (slug) {
				this.$store.dispatch('setApiPerPage', slug)
					.then(() => {
						this.loaded = true
						this.TITLE = this.APITitle
						this.DATA = this.APIData
					})
					.catch(er => console.log(er))
			}
		}
	}
</script>

<style scoped lang="stylus">
	.v-btn
		&--active:before,
		&:hover:before,
		&:focus:before
			background-color: #fff !important
</style>