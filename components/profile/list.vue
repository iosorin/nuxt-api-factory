<template lang="pug"> 
	v-list-group
		template(v-slot:activator)
			v-list-tile
				v-list-tile-action(v-if="listExist" )
					v-badge(color='white')
						template(v-slot:badge)
							span.black--text {{listExist}}
				v-list-tile-title Profiles
		v-list.pb-0.profiles-list(subheader)
			v-list-tile(
			v-for='profile in profiles',
			:key='profile.id',
			@click="setActiveStatus(profile.id)"
			:inactive="profile.active"
			:class="[profile.active ? 'white black--text' : '']"
			)
				v-list-tile-title.pl-2 {{profile.firstName}}  {{profile.lastName}}
				v-slide-x-reverse-transition
						v-list-tile-action.pl-4(v-show="profile.active")
							v-btn(icon).ma-0
								v-icon(color='black') done				
			v-progress-linear.ma-0.progress(
			:indeterminate='true',
			color='rgba(255, 255, 255, 0.75)',
			height='1', 
			:active="localload"
			background-color="transparent"
			value="50"
			)
			v-divider

			list-Bottom

</template>


<script>
	import listBottom from '~/components/profile/list-bottom'
	export default {
		components: {
			listBottom
		},
		data () {
			return {
				timeout: 1300
			}
		},
		methods: {
			setActiveStatus (id) {
				this.$store.dispatch('setActiveStatus', id)
					.then(() => {
						this.$nuxt.$emit('updateDashboard')
						setTimeout(() => { this.$router.push('/dashboard') }, this.timeout)
					})
					.catch((err) => console.log(err))
			}
		},
		computed: {
			profiles () {
				return this.$store.getters.profiles
			},
			listExist () {
				return this.profiles.length
			},
			localload () {
				return this.$store.getters.localload
			}
		}
	}
</script>

<style lang="stylus"  scoped>
.xs2 .ma-0 
	*
		margin 0 !important
	.v-input--selection-controls__ripple
		left -5px !important
		top calc(50% - 18px) !important
.profiles-list 
	position relative
	.progress
		position absolute
		bottom 0
		left 0
		width 100%
	.v-list__tile  p
		margin 0 !important
		font-size 13px
		text-transform uppercase
	
.v-divider + .d-flex .v-list__tile
	height 40px !important
.v-dialog  .v-list__tile__content
	font-size 14px !important		

.fade
	&-enter,
	&-leave-to
		opacity 0
	&-enter-active,
	&-leave-active 
		transition opacity .5s	

</style>