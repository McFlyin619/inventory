<template>
	<div>
		<base-modal :show="showLoginForm" @close="close" title="Login">
			<login-form></login-form>
		</base-modal>
		<nav class="navbar navbar-expand-lg sticky-top navbar-secondary bg-dark" data-mdb-color="secondary">
			<!-- Container wrapper -->
			<div class="container-fluid">
				<!-- Toggle button -->
				<button
					class="navbar-toggler"
					type="button"
					data-mdb-toggle="collapse"
					data-mdb-target="#navbarRightAlignExample"
					aria-controls="navbarRightAlignExample"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<i class="fas fa-bars"></i>
				</button>

				<!-- Collapsible wrapper -->
				<div class="collapse navbar-collapse" id="navbarRightAlignExample">
					<!-- Left links -->
					<ul class="navbar-nav ms-auto mb-2 mb-lg-0">
						<li v-if="isAuth" class="nav-item">
							<a
								role="button"
								data-mdb-toggle="sidenav"
								data-mdb-target="#sidenav"
								class="nav-link"
								aria-controls="#sidenav-1"
								aria-haspopup="true"
								>Menu</a
							>
						</li>
						<li v-if="!isAuth" class="nav-item">
							<a role="button" @click="showLoginForm = true" class="nav-link">Login</a>
						</li>
						<!-- Navbar dropdown -->
						<li v-if="isAuth" class="nav-item dropdown">
							<a
								class="nav-link dropdown-toggle"
								href="#"
								id="navbarDropdown"
								role="button"
								data-mdb-toggle="dropdown"
								aria-expanded="false"
							>
								Profile
							</a>
							<!-- Dropdown menu -->
							<ul class="dropdown-menu text-center" aria-labelledby="navbarDropdown">
								<li>
									<a class="dropdown-item" href="#">Action</a>
								</li>
								<li>
									<a class="dropdown-item" href="#">Another action</a>
								</li>
								<li><hr class="dropdown-divider" /></li>
								<li>
									<a class="dropdown-item" href="#">Something else here</a>
								</li>
							</ul>
						</li>
					</ul>
					<!-- Left links -->
				</div>
				<!-- Collapsible wrapper -->
			</div>
			<!-- Container wrapper -->
		</nav>
		<nav id="sidenav" class="sidenav bg-dark text-white" data-mdb-mode="over" data-mdb-color="secondary">
			<ul class="sidenav-menu">
				<li class="sidenav-item">
					<a class="sidenav-link"><span>Category 1</span></a>
					<ul class="sidenav-collapse show">
						<li class="sidenav-item">
							<a class="sidenav-link">Link 2</a>
						</li>
						<li class="sidenav-item">
							<a class="sidenav-link">Link 3</a>
						</li>
					</ul>
				</li>
				<li class="sidenav-item">
					<a class="sidenav-link"><span>Category 2</span></a>
					<ul class="sidenav-collapse">
						<li class="sidenav-item">
							<a class="sidenav-link">Link 4</a>
						</li>
						<li class="sidenav-item">
							<a class="sidenav-link">Link 5</a>
						</li>
					</ul>
				</li>
			</ul>
		</nav>
		<!-- Sidenav -->
	</div>
</template>

<script>
import LoginForm from '@/components/auth/LoginForm.vue'
export default {
	components: {
		LoginForm
	},
	data() {
		return {
			showLoginForm: false
		}
	},
	computed: {
		isAuth() {
			return this.$store.getters.isAuthenticated
		}
	},
	methods: {
		close() {
			this.showLoginForm = false
		}
	}
}
</script>