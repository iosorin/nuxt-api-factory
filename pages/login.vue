<template lang="pug">
	v-flex(xs12, md6, xl4)
		v-card.elevation-3.pb-4
			v-toolbar(dark, color='black')
				v-toolbar-title Login
			v-card-text
				v-form#login-user(@submit.prevent="onSubmit")
					v-text-field(
						v-model="email",
						label='Email',
						type='text',
						color="white",
						:error-messages="EmailErrors"
						@change="$v.email.$touch()"
						)
					v-text-field.mt-3(
						v-model="password"
						label='Password',
						color="white",
						type='password',
						:error-messages="PasswordErrors"
						@change="$v.password.$touch()"
					)
			v-card-actions.justify-space-around
					v-btn.auth-btn(
						form="login-user",
						color='black',
						dark,
						large,
						type="submit"
					) Login

					div
						span.mr-3 Need Registration ?
						v-btn(depressed, small, nuxt, to='/registration', light, color='white')  Enter Here
		v-snackbar(
			v-model='snackbar',
			right,
			bottom,
			:auto-height="true",
			color="white",
			class="black--text text-xs-center",
			:timeout="timeout"
			)
			span.green--text(v-if="submitStatus==='OK'")  You`ve been successfully authorized!
			span.red--text(v-if="submitStatus==='ERROR'")  Please fill the form correctly.
			span(v-if="submitStatus !=='OK' && submitStatus !=='ERROR'") {{ submitStatus }}
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";

export default {
	data() {
		return {
			email: "",
			password: "",
			submitStatus: null,
			snackbar: false,
			timeout: 1850
		};
	},

	validations: {
		email: { required, email },
		password: { required, minLength: minLength(5) }
	},

	computed: {
		EmailErrors() {
			const errors = [];

			if (!this.$v.email.$dirty) return errors;

			!this.$v.email.email && errors.push("Email is not correct");
			!this.$v.email.required && errors.push("Field is required");

			return errors;
		},

		PasswordErrors() {
			const errors = [];

			if (!this.$v.password.$dirty) return errors;

			!this.$v.password.required && errors.push("Password is required");
			!this.$v.password.minLength &&

			errors.push(
				"Password must have at least " +
				this.$v.password.$params.minLength.min +
				" letters."
			);

			return errors;
		}
	},

	methods: {
		onSubmit() {
			this.$v.$touch();

			if (this.$v.$invalid) {
				this.submitStatus = "ERROR";

				this.snackbar = true;
			}
			else {
				const user = {
					email: this.email,
					password: this.password
				};

				this.$store.dispatch("loginUser", user)
					.then(() => {
						this.submitStatus = "OK";
						this.snackbar = true;
					}	)
					.then(() => {
						setTimeout(() => {
							this.$router.push("/dashboard/itunes");
						}, this.timeout);
					})
					.catch((err) => {
						this.submitStatus = err.message;
						this.snackbar = true;
					});
			}
		}
	}
};
</script>
