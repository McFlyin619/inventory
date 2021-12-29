export default {
	setUser(state, payload) {
		state.token = payload.token;
		state.userId = payload.userId;
		state.email = payload.email;
		state.name = payload.name
	},
	setAutoLogout(state) {
		state.didAutoLogout = true;
	},
};
