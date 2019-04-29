<template lang="pug">
    v-flex(xs12)
        v-card(color='blue-grey lighten-5', light).py-2.px-3
            v-card-title.text-uppercase
                h3 {{formTitle}}
            v-card-text
                v-form(ref='form',  @submit.prevent="onSubmit")
                    v-container.pa-0
                        v-layout(wrap)
                            v-flex(xs6)
                                v-text-field(
                                v-model='firstName',
                                label='First name',
                                color="black"
                                required
                                :rules="nameRules"
                                )
                            v-flex(xs6)
                                v-text-field(
                                v-model='lastName',
                                label='Last Name',
                                color="black"
                                required
                                :rules="nameRules"
                                )
                            v-flex(xs6)
                                v-select(v-model='animal', :items='animals', color='black', label='Favorite animal')
                            v-flex(xs6)
                                v-text-field(v-model="city", label="City", color="black")
                            v-flex(xs12)
                                v-radio-group.mt-0(v-model="gender",  row)
                                    v-radio(label='Male', value='Male', color="black")
                                    v-radio(label='Female', value='Female', color="black")
                            v-flex(xs12)
                                v-textarea(v-model="bio", box, label='Bio (optional)', color="black")
                        v-layout(wrap)
                            v-flex.text-xs-right
                                v-btn(
                                    type="submit"
                                    fab,
                                    dark,
                                    color='grey darken-4 elevation-3'
                                    )
                                    v-icon(v-if="!editMode" dark) add
                                    v-icon(v-else dark) save


        v-snackbar(
            v-model='snackbar',
            right,
            bottom,
            color="white",
            class="black--text",
            :timeout="timeout"
            )
            p.green--text(v-if="submitStatus==='OK'")  Profile was successfully 
                span(v-if="!editMode") added
                span(v-else) updated
            p.red--text(v-if="submitStatus==='ERROR'")  Please fill the form correctly.
            p(v-if="submitStatus !=='OK' && submitStatus !=='ERROR'") {{ submitStatus }}
</template>

<script>
    export default {
    	props: ['editedProfile'],
    	data () {
    		return {
    			formTitle: 'New Profile',
    			firstName: '',
    			lastName: '',
    			gender: '',
    			city: '',
    			animal: '',
    			bio: '',
    			animals: ['Dog', 'Cat', 'Rabbit', 'Turtle', 'Snake'],
    			nameRules: [v => !!v || 'required'],
    			submitStatus: null,
    			timeout: 1300,
    			snackbar: false
    		}
    	},
    	watch: {
    		editedProfile (obj) {
    			if (obj.length === 0) {
    				this.formTitle = 'New Profile'
    				this.resetForm()
    			}
    			Object.keys(obj).forEach((key) => {
    				this.formTitle = 'Edit Profile'
    				if (obj[key] !== null) {
    					this[key] = obj[key]
    				}
    			})
    		}
    	},
    	computed: {
    		editMode () {
    			return this.editedProfile.length !== 0
    		}
    	},
    	methods: {
    		onSubmit () {
    			!this.editMode ? this.addNewProfile() : this.updateProfile()
    		},

    		updateProfile () {
    			if (!this.$refs.form.validate()) {
    				this.submitStatus = 'ERROR'
    				this.snackbar = true
    			} else {
    				const obj = this.editedProfile
    				Object.keys(obj).forEach((key) => {
    					if (obj[key] !== null) {
    						obj[key] = this[key]
    					}
    				})
    
    				this.$store.dispatch('editProfile', obj)

    					.then(() => {
    						this.submitStatus = 'OK'
    						this.snackbar = true
    					})
    					.catch(err => {
    						this.submitStatus = err.message
    					})
    			}
    		},
    		addNewProfile () {
    			if (!this.$refs.form.validate()) {
    				this.submitStatus = 'ERROR'
    				this.snackbar = true
    			} else {
    				const profile = {
    					firstName: this.firstName,
    					lastName: this.lastName,
    					animal: this.animal,
    					city: this.city,
    					gender: this.gender,
    					bio: this.bio
    				}
    				this.$store.dispatch('newProfile', profile)
    					.then(() => {
    						this.submitStatus = 'OK'
    						this.snackbar = true
    					})
    					.catch(err => {
    						this.submitStatus = err.message
    					})
    				this.resetForm()
    			}
    		},
    		resetForm () {
    			this.$refs.form.reset()
    			this.firstName = ''
    			this.lastName = ''
    			this.animal = ''
    			this.city = ''
    			this.gender = ''
    			this.bio = ''
    		}
	}

}
</script>


<style lang="stylus" scoped>
.error-input
    color red
.error-message
    color red !important
    &:placeholder
        color red !important

</style>
