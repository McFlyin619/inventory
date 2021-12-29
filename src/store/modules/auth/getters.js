export default {
	isAuthenticated(state) {
		return !!state.token;
	},
	didAutoLogout(state) {
		return state.didAutoLogout;
	},
	getUserName(state) {
		return state.name
	}
};
