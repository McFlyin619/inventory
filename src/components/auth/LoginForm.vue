<template>
	<base-modal :show="!!error" title="An error occurred" @close="handleError">
		<p>{{ error }}</p>
	</base-modal>
	<div>
		<h1 class="main-b mb-5">{{ loginTitle }}</h1>
		<!-- Pills navs -->
		<ul class="nav nav-pills nav-justified mb-3 p-0 ms-0" id="ex1" role="tablist">
			<li class="nav-item" role="presentation">
				<a
					@click="loginTitleToggle('login')"
					class="nav-link active"
					id="tab-login"
					data-mdb-toggle="pill"
					href="#pills-login"
					role="tab"
					>Login</a
				>
			</li>
			<li class="nav-item" role="presentation">
				<a
					@click="loginTitleToggle('register')"
					class="nav-link"
					id="tab-register"
					data-mdb-toggle="pill"
					href="#pills-register"
					role="tab"
					aria-controls="pills-register"
					aria-selected="false"
					>Register</a
				>
			</li>
		</ul>
		<!-- Pills navs -->

		<!-- Pills content -->
		<div class="tab-content">
			<div
				class="tab-pane fade show active text-start"
				id="pills-login"
				role="tabpanel"
				aria-labelledby="tab-login"
			>
				<form @submit.prevent="loginForm">
					<!-- Email input -->
					<div class="form-floating mb-4">
						<input type="email" id="loginEmail" class="form-control" v-model.trim="loginEmail" />
						<label class="form-label text-end" for="loginEmail">Email</label>
					</div>

					<!-- Password input -->
					<div class="form-floating mb-4">
						<input type="password" id="loginPassword" class="form-control" v-model.trim="loginPassword" />
						<label class="form-label" for="loginPassword">Password</label>
					</div>

					<!-- Submit button -->
					<button type="submit" class="btn btn-outline-main-b btn-lg btn-block mb-4">Sign in</button>
				</form>
			</div>
			<div class="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
				<form @submit.prevent="registerForm">
					<!-- Name input -->
					<div class="form-floating mb-4">
						<input type="text" id="registerName" class="form-control" v-model.trim="registerName" />
						<label class="form-label" for="registerName">Name</label>
					</div>

					<!-- Email input -->
					<div class="form-floating mb-4">
						<input type="email" id="registerEmail" class="form-control" v-model.trim="registerEmail" />
						<label class="form-label" for="registerEmail">Email</label>
					</div>

					<!-- Password input -->
					<div class="form-floating mb-4" :class="{ passCheck: invalidPassword }">
						<input
							type="password"
							id="registerPassword"
							class="form-control"
							v-model.trim="registerPassword"
						/>
						<label class="form-label" for="registerPassword">Password</label>
					</div>

					<!-- Repeat Password input -->
					<div class="form-floating mb-4 text-start" :class="{ passCheck: invalidPassword }">
						<input
							type="password"
							id="registerRepeatPassword"
							class="form-control"
							v-model.trim="registerRepeatPassword"
						/>
						<small v-show="invalidPassword">Passwords do not match</small>
						<label class="form-label" for="registerRepeatPassword">Repeat password</label>
					</div>
					<!-- Submit button -->
					<button type="submit" class="btn btn-block btn-outline-main-b btn-lg mb-3">Create Account</button>
				</form>
			</div>
		</div>
		<!-- Pills content -->
	</div>
</template>

<script>
export default {
	emits: ['close'],
	data() {
		return {
			loginTitle: 'Login',
			loginEmail: null,
			loginPassword: null,
			registerName: null,
			registerCompany: null,
			registerEmail: null,
			registerPassword: null,
			registerRepeatPassword: null,
			verifiedPassword: null,
			invalidPassword: false,
			error: null,
		};
	},
	watch: {
		registerRepeatPassword() {
			this.verifyPassword();
		},
	},
	computed: {},
	methods: {
		loginTitleToggle(mode) {
			if (mode === 'register') {
				this.loginTitle = 'Register';
			} else {
				this.loginTitle = 'Login';
			}
		},
		verifyPassword() {
			if (this.registerRepeatPassword !== this.registerPassword) {
				this.invalidPassword = true;
			} else {
				this.invalidPassword = false;
				this.verifiedPassword = this.registerPassword;
			}
		},
		async loginForm() {
			const payload = {
				email: this.loginEmail,
				password: this.loginPassword,
			};
			try {
				await this.$store.dispatch('signIn', payload);
			} catch (err) {
				this.error = err.message || 'Failed to login.';
			}
			this.$emit('close');
		},
		async registerForm() {
			const payload = {
				email: this.registerEmail,
				password: this.verifiedPassword,
				name: this.registerName
			};
			try {
				await this.$store.dispatch('signup', payload);
			} catch (err) {
				this.error = err.message || 'Failed to create account.';
			}
			this.$emit('close');
		},
		handleError() {
			this.error = null;
		},
	},
};
</script>

<style scoped>
.nav-pills .nav-link.active {
	background-color: var(--main-b);
}

.nav-pills .nav-link {
	background-color: var(--dark-2);
}

.form-floating label {
	color: #fff !important;
}

.form-floating label.active {
	color: var(--main-b) !important;
}

.form-floating input {
	color: var(--main-b) !important;
	border: 0.5px solid var(--main-b);
	background-color: var(--dark-3);
}

.form-floating input:focus {
	/* border: 3px solid var(--main-b) !important; */
	box-shadow: 0 1px 0 0 var(--main-b) !important;
	color: var(--main-b) !important;
	background-color: var(--dark-3);
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
	-webkit-box-shadow: 0 0 0 30px var(--dark-3) inset !important;
	-webkit-text-fill-color: var(--main-b);
}

.passCheck input {
	border: 0.5px solid red !important;
}
.passCheck {
	color: red !important;
}
</style>
