export default function ({ store, redirect, route }) {
	if (!store.getters.guest && ['login', 'registration'].includes(route.name)) redirect('/dashboard')
	if (store.getters.guest && ['settings', 'settings', 'dashboard', 'dashboard-slug'].includes(route.name)) redirect('/login')
}
