<template lang="pug">
	v-layout(column, wrap)
		v-flex(xs12)
			v-toolbar
				v-flex(xs6)
					form.d-flex(@submit.prevent="submit")
						v-text-field(
							v-model="searchWord",
							type='text',
							color="white"
							placeholder="Enter Arthist Name"
							)
				v-flex(xs6).text-xs-right.title Albums
		v-flex.iterator(xs12 v-if="dataExist")
			v-data-iterator.h100(
			:items='albums',
			:rows-per-page-items='rowsPerPageItems',
			:pagination.sync='pagination',
			content-class='layout row wrap iterator-inner',
			)
				template(v-slot:item='props')
					v-flex(xs12, sm6, md4)
						v-hover
							v-card(
							color="black",
							slot-scope="{ hover }",
							:class="`elevation-${hover ? 12 : 2}`",
							:href="props.item.artistViewUrl"
							target="_blank"
							)
								v-img(
								v-if="props.item.artworkUrl100"
								:src="replaceThumb(props.item.artworkUrl100)"
								:lazy-src="replaceThumb(props.item.artworkUrl100)"
								aspect-ratio="1"
								)
								v-card-title.pb-0
									.subheading {{props.item.artistName}}
									.title.mt-2 {{ props.item.collectionCensoredName }} 
									div.title-bottom
										.body-1 TRACK COUNT: {{props.item.trackCount}}
										.body-1(v-if="props.item.releaseDate") {{ getDate(props.item.releaseDate) }} 




</template>

<script>
	export default {
		props: ['data'],
		data () {
			return {
				searchWord: 'daft',
				rowsPerPageItems: [],
				pagination: {
					rowsPerPage: 3
				}
			}
		},
		methods: {
			submit () {
				this.$store.dispatch('getAlbum', this.searchWord)
			},
			replaceThumb (url) {
				return url.replace('100x100bb', '600x600bb')
			},
			getDate (d) {
			   return d.split('T0')[0]
			}
		},
		computed: {
			dataExist () {
				return this.albums && this.albums.length > 0
			},
			albums () {
				return this.$store.getters.APIData
			}
		}
	}
</script>


<style scoped lang="stylus">
.md4 .v-card,
.iterator > .v-card,
.iterator .layout.row.wrap{
	height: 100% !important
}
.iterator
	&-inner
		min-height 60vh;
	.v-card
		position relative
		.title-bottom
			position absolute
			bottom 0
			left 0
			padding 0 15px 15px
			display flex
			width 100%
			justify-content space-between
		.v-image
			height 70%
		&__title
			display flex
			flex-direction column
			align-items flex-start
			height: 30%
			> *
				text-align left
			.title
				line-height 1.2 !important
			.subheading
				width 100%
		&__text
			background-position center
			background-size 200%
			position relative
			overflow hidden

@media only screen and (max-width : 1600px)
	.v-card
		.v-image
			height 60% !important
		.title
			font-size 17px !important

</style>