import Vue from 'vue'
import Vuetify, {
	VApp,
	VNavigationDrawer,
	VFooter,
	VToolbar
} from 'vuetify/lib'
import { Ripple } from 'vuetify/lib/directives'

Vue.use(Vuetify, {
	components: {
		VApp,
		VNavigationDrawer,
		VFooter,
		VToolbar
	},
	directives: {
		Ripple
	}
})
