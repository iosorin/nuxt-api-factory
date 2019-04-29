<template lang="pug">
    v-list.pa-0
        v-layout(row, wrap)
            v-flex(grow)
                v-list-tile( nuxt, exact, to='/settings' )
                    v-list-tile-title(
                    :class="[{'text-uppercase text-xs-left': true}, activeProfile? '' : 'pl-2']"
                    v-if="$store.getters.profiles.length"
                    ) settings
                    v-list-tile-title(v-else).text-uppercase add new +
            v-slide-x-reverse-transition
                v-flex(xs12, md7, v-show="activeProfile")
                    v-layout(row, wrap)
                        v-flex(xs12, md6)
                            v-list-tile(@click.stop="dialog = true")
                                v-list-tile-title.body-2.text-uppercase.text-xs-center active profile
                        v-flex(xs12, md6)
                            v-list-tile(@click="resetActiveStatus")
                                v-list-tile-title.body-2.text-uppercase.text-xs-center deselect                    
                            v-dialog(v-model='dialog', max-width='320', v-if="activeProfile")
                                v-card
                                    v-card-title.text-uppercase
                                        h4 Active Profile
                                        v-spacer
                                        v-btn.ma-0(icon, small, @click="dialog = false")
                                            v-icon(size="20") close
                                    v-divider
                                    v-list(dense)
                                        v-list-tile
                                            v-list-tile-content First Name:
                                            v-list-tile-content.align-end {{activeProfile.firstName}}
                                        v-list-tile
                                            v-list-tile-content Last Name:
                                            v-list-tile-content.align-end {{activeProfile.lastName}}
                                        v-list-tile
                                            v-list-tile-content Favorite animal:
                                            v-list-tile-content.align-end {{activeProfile.animal || '--'}}
                                        v-list-tile
                                            v-list-tile-content Gender:
                                            v-list-tile-content.align-end {{activeProfile.gender || '--'}}
                                        v-list-tile
                                            v-list-tile-content City:
                                            v-list-tile-content.align-end {{activeProfile.city || '--'}}    
                                        v-list-tile(v-if="!activeProfile.bio")
                                            v-list-tile-content Bio:
                                            v-list-tile-content.align-end --
                                        v-list-tile.relative(v-else, @click="bio = !bio")
                                            v-list-tile-content Bio
                                            v-list-tile-content.align-end
                                                    v-icon(v-if="!bio") arrow_drop_down
                                                    v-icon(v-else) arrow_drop_up
                                            v-slide-y-transition
                                                v-card.bio-card(dark, v-show="bio")
                                                    p.pa-3.bio-tile.mb-0 {{activeProfile.bio}} 
   
</template>

<script>
    export default {
    	data () {
    		return {
    			dialog: false,
    			bio: false
    		}
    	},
    	methods: {
    		resetActiveStatus () {
    			this.$store.dispatch('resetActiveStatus')
    				.catch((err) => console.log(err))
    		}
    	},
    	computed: {
    		activeProfile () {
    			return this.$store.getters.activeProfile[0]
    		}
    	},
    	watch: {
    		activeProfile (obj) {
    			if (!obj) return
    			Object.keys(obj).forEach((key) => {
    				this[key] = obj[key]
    			})
    		}
    	}
    }
</script>

<style scoped>
.v-list__tile__content{
    font-size: 14px !important;
}
.v-list__tile__content.align-end{
    font-size: 12px !important;
}
.bio-card{
    position: absolute;
    top: 50px;
    left: 0;
    width: 100%;
}
.align-end{
  align-items: flex-end !important;
}
</style>