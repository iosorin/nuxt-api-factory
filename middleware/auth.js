export default function ({ store, redirect, route }) {
	const isGuest = store.getters.guest;

	const isAuthPage = ['login', 'registration'].includes(route.name);
	const isSitePage = ['settings', 'settings', 'dashboard', 'dashboard-slug'].includes(route.name);

	if (!isGuest && isAuthPage) {
		redirect('/dashboard');
	}

	if (isGuest && isSitePage) {
		redirect('/login');
	}
}
