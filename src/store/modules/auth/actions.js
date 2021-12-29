let timer;
export default {
	async signup(context, payload) {
		const response = await fetch(
			'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + process.env.VUE_APP_FB_KEY,
			{
				method: 'POST',
				body: JSON.stringify({
					email: payload.email,
					password: payload.password,
					returnSecureToken: true,
					displayName: payload.name,
				}),
			}
		);

		const responseData = await response.json();
		if (!response.ok) {
			const error = new Error(responseData.message || 'There was an error. Please try again.');
			throw error;
		}
		const expiresIn = +responseData.expiresIn * 1000;
		// const expiresIn = 5000;
		const expirationDate = new Date().getTime() + expiresIn;
		localStorage.setItem('token', responseData.idToken);
		localStorage.setItem('userId', responseData.localId);
		localStorage.setItem('tokenExpiration', expirationDate);
		localStorage.setItem('name', responseData.displayName);
		context.commit('setUser', {
			token: responseData.idToken,
			userId: responseData.localId,
			email: responseData.email,
			name: responseData.displayName
		});
	},
	async signIn(context, payload) {
		const response = await fetch(
			'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + process.env.VUE_APP_FB_KEY,
			{
				method: 'POST',
				body: JSON.stringify({
					email: payload.email,
					password: payload.password,
					returnSecureToken: true,
				}),
			}
		);

		const responseData = await response.json();
		if (!response.ok) {
			const error = new Error(responseData.message || 'There was an error. Please try again.');
			throw error;
		}
		const expiresIn = +responseData.expiresIn * 10000;
		const expirationDate = new Date().getTime() + expiresIn;

		localStorage.setItem('token', responseData.idToken);
		localStorage.setItem('userId', responseData.localId);
		localStorage.setItem('tokenExpiration', expirationDate);
		localStorage.setItem('email', responseData.email);
		localStorage.setItem('name', responseData.displayName);


		timer = setTimeout(() => {
			context.dispatch('autoLogout');
		}, expiresIn);

		context.commit('setUser', {
			token: responseData.idToken,
			userId: responseData.localId,
			email: responseData.email,
			name: responseData.displayName
		});
	},
	logout(context) {
		localStorage.removeItem('token');
		localStorage.removeItem('userId');
		localStorage.removeItem('tokenExpiration');
		localStorage.removeItem('email')
		localStorage.removeItem('name');


		clearTimeout(timer);

		context.commit('setUser', {
			token: null,
			userId: null,
			email: null
		});
	},
	tryLogin(context,) {
		const token = localStorage.getItem('token');
		const userId = localStorage.getItem('userId');
		const tokenExpiration = localStorage.getItem('tokenExpiration');
		const email = localStorage.getItem('email');
		const name = localStorage.getItem('name')


		const expiresIn = +tokenExpiration - new Date().getTime();

		if (expiresIn < 0) {
			return;
		}

		timer = setTimeout(() => {
			context.dispatch('autoLogout');
		}, expiresIn);

		if (userId && token ) {
			context.commit('setUser', {
				token: token,
				userId: userId,
				email: email,
				name: name
			});
		}
	},
	autoLogout(context) {
		context.dispatch('logout');
		context.commit('setAutoLogout');
	},
};
