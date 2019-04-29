<template lang="pug">
	v-flex(xs12, md6, xl4)
		v-card.elevation-3.pb-4
			v-toolbar(dark, color='black')
				v-toolbar-title Registration
			v-card-text
				v-form#registration(@submit.prevent="onSubmit")
					v-text-field(
						v-model="email",
						label='Email',
						type='text',
						color="white",
						:error-messages="EmailErrors",
						@change="$v.email.$touch()"
						)
					v-text-field.mt-3(
						v-model="password"
						label='Password',
						color="white",
						type='password',
						:error-messages="PasswordErrors",
						@change="$v.password.$touch()"
					)
					v-text-field.mt-3(
						v-model="repeatPassword",
						label='Repeat your password',
						color="white",
						type='password',
						:error-messages="RepeatPasswordErrors",
						@change="$v.repeatPassword.$touch()"
					)
			v-card-actions.justify-space-around
					v-btn.auth-btn(
						type="submit",
						form="registration",
						color='black',
						dark,
						large
					) Registration
					div
						span.mr-3 Already have an account?
						v-btn(depressed, small, nuxt, to='/login', light, color='white')  Enter Here
		v-snackbar(
			v-model='snackbar',
			right,
			bottom,
			color="white",
			:auto-height="true",
			class="black--text text-xs-center snackbar",
			:timeout=timeout
			)
			span.green--text(v-if="submitStatus==='OK'")  Thanks for your submission!
			span.red--text(v-if="submitStatus==='ERROR'")  Please fill the form correctly.
			span(v-if="submitStatus !=='OK' && submitStatus !=='ERROR'") {{ submitStatus }}
</template>



<script>
	import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
	export default {
		data () {
			return {
				email: '',
				password: '',
				repeatPassword: '',
				submitStatus: null,
				snackbar: false,
				timeout: 1850
			}
		},
		validations: {
			email: { required, email },
			password: { required, minLength: minLength(5) },
			repeatPassword: { sameAsPassword: sameAs('password') }
		},
		computed: {
			EmailErrors () {
			  const errors = []
			  if (!this.$v.email.$dirty) return errors
			  !this.$v.email.email && errors.push('Email is not correct')
			  !this.$v.email.required && errors.push('Field is required')
			  return errors
			},
			PasswordErrors () {
				const errors = []
				if (!this.$v.password.$dirty) return errors
				!this.$v.password.required && errors.push('Password is required')
				!this.$v.password.minLength && errors.push('Password must have at least ' + this.$v.password.$params.minLength.min + ' letters.')
				return errors
			},
			RepeatPasswordErrors () {
				const errors = []
				if (!this.$v.repeatPassword.$dirty) return errors
				!this.$v.repeatPassword.sameAsPassword && errors.push('Passwords must be identical')
				return errors
			}
		},
		methods: {
			onSubmit () {
				this.$v.$touch()
				if (this.$v.$invalid) {
					this.submitStatus = 'ERROR'
					this.snackbar = true
				} else {
					const user = {
						email: this.email,
						password: this.password
					}
					this.$store.dispatch('registerUser', user)
						.then(() => {
							this.submitStatus = 'OK'
							this.snackbar = true
						})
						.then(() => {
							setTimeout(() => { this.$router.push('/dashboard') }, this.timeout)
						})
						.catch(err => {
							this.submitStatus = err.message
							this.snackbar = true
						})
				}
			}
		}
	}
</script>