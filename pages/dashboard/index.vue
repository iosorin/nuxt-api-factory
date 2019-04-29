<template lang="pug">
	v-container.d-flex.pa-0(fluid, grid-list-lg, justify-center)
		v-fade-transition
			v-flex(xs12, md10, xl8, v-show="LIST.length").mt-5.api-menu-container
				h2.display-2.mb-2 API LIST
				v-layout(layout mt-4 row wrap)
					API-LINK( v-for="item in LIST" :apidata="item" :key="item.id" )
				v-btn.b20(absolute, bottom, right, fab, small, @click="toggleLIST")
					v-icon remove_red_eye

</template>


<script>
	import APILINK from '~/components/api/link'

	export default {
		components: {
			APILINK
		},
		data () {
			return {
				LIST: [],
				itemsToShow: 3
			}
		},
		created () {
			this.$nuxt.$on('updateDashboard', () => {
				this.randomList()
			})
			this.$store.dispatch('getApiList')
				.then(() => {
					this.sliceFirst()
					// this.randomList()
				})
				.catch((e) => {
					console.log(e)
				})
		},
		computed: {
			APIList () {
				return this.$store.getters.APIList
			}
		},
		methods: {
			randomList () {
				if (!this.APIList) return
				let ar = this.APIList
				const shuffled = ar.sort(() => 0.5 - Math.random())
				const selected = shuffled.slice(0, this.itemsToShow)
				this.LIST = selected
			},
			sliceFirst () {
				this.LIST = this.APIList.slice(0, this.itemsToShow)
			},
			toggleLIST () {
				this.LIST.length > 3 ? this.sliceFirst() : this.LIST = this.APIList
			}
		},
		destroyed () {
			this.$nuxt.$off('updateDashboard')
		}
	}
</script>


<style scoped>

.shuffle-move {
	transition: transform 1s;
}

.fade-enter-active, .fade-leave-active {
	transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
	opacity: 0;
}
  @media only screen and (max-width : 1600px){
	.display-2{
		font-size: 35px !important;
	}
  }

</style>