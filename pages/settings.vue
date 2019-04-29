<template lang="pug">
		v-flex.relative(xs12, md11, xl8)
			v-toolbar(flat, color='white', light)
				v-toolbar-title My Profiles
				v-spacer
				v-dialog.form-dialog(
				v-model='dialog',
				max-width='50vw',
				overflow="visible"
				)
					template(v-slot:activator='{ on }')
						v-btn.mb-2.elevation-5(color='grey darken-4', icon, dark, v-on='on')
							v-icon add

					ProfileForm( :editedProfile="editedProfile" )

			v-data-table.elevation-1.text-capitalize(
				v-model="selected",
				:headers='headers',
				item-key="id",
				select-all,
				:items='profiles'
				:expand="expand"
				no-data-text="NO PROFILES YET",
			)
				template(v-slot:items='props')
					td
						v-checkbox(v-model='props.selected', color="wite", hide-details)
					td {{ props.item.firstName }} {{ props.item.lastName }}
					td 
						span(v-if="props.item.animal") {{props.item.animal}}
						span(v-else) --
					td 
						span(v-if="props.item.city") {{props.item.city}}
						span(v-else) --
					td 
						span(v-if="props.item.gender") {{props.item.gender}}
						span(v-else) --											
					
					td.pl-3.pointer(@click="props.expanded = !props.expanded", v-if="props.item.bio")
						v-icon(v-if="props.expanded") expand_less
						v-icon(v-else) expand_more
					td(v-if="!props.item.bio") --			
					td.relative
						v-btn.mr-2(icon, small)
							v-icon(small, @click='editItem(props.item)') edit
						v-btn(icon, small)
							v-icon(small, @click='removeProfiles(props.item.id)') delete
						span.active-status(v-if="props.item.active") active
				template(v-slot:expand='props')
					v-card(flat)
						v-card-text {{ props.item.bio }}            
			v-btn(
				absolute,
				fab, 
				bottom,
				left, 
				color="black",
				v-if="selected.length",
				@click="removeProfiles(selected)"
				)
				v-icon delete


</template>


<script>
	import ProfileForm from '~/components/profile/form'
	export default {
		components: {
			ProfileForm
		},
		data: () => ({
			dialog: false,
			expand: false,
			headers: [
				{ text: 'Full Name', value: 'name', sortable: false },
				{ text: 'Favorite animal', value: 'calories', sortable: false },
				{ text: 'City', value: 'carbs', sortable: false },
				{ text: 'Gender', value: 'fat', sortable: false },
				{ text: 'Bio', value: 'protein', sortable: false },
				{ text: 'Actions', value: 'name', sortable: false }
			],
			selected: [],
			editedProfile: []
		}),

		computed: {
			profiles () {
				return this.$store.getters.profiles
			}
		},

		watch: {
			dialog (val) {
				val || this.close()
			}
		},

		methods: {
			editItem (item) {
				this.editedProfile = item
				this.dialog = true
			},

			removeProfiles (data) {
				this.$store.dispatch('removeProfiles', data)
					.then(() => {
						this.$store.dispatch('loadProfiles')
					})
					.catch(err => {
						console.log(err)
					})
			},

			close () {
				this.editedProfile = []
				this.dialog = false
			}
		}
}
</script>

<style>
	.v-dialog{
		box-shadow: none !important;
		overflow-y: visible !important;
	}
	.active-status{
		text-transform: uppercase;
		font-weight: 500;
		position: absolute;
		top: 50%;
		right: 0;
		transform: translate(-100%, -50%);
	}
</style>