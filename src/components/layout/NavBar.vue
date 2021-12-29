<template>
	<div>
		<base-modal :show="showLoginForm" @close="close">
			<login-form @close="close"></login-form>
		</base-modal>
		<nav class="navbar navbar-expand-lg sticky-top" >
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
				<div class="collapse navbar-collapse d-flex align-items-center" id="navbarRightAlignExample">
					<!-- Left links -->
					<ul class="navbar-nav ms-auto mb-2 mb-lg-0">
						<li v-if="isAuth" class="nav-item">
							<a
								role="button"
								data-mdb-toggle="sidenav"
								data-mdb-target="#sidenav"
								class="nav-link nav-link-1"
								aria-controls="#sidenav-1"
								aria-haspopup="true"
								>Menu</a
							>
						</li>
						<li v-if="!isAuth" class="nav-item">
							<a role="button" @click="showLoginForm = true" class="nav-link nav-link-1">Login</a>
						</li>
						<!-- Navbar dropdown -->
						
						<li v-if="isAuth" class="nav-item dropdown">
							<a
								class="nav-link dropdown-toggle nav-link-1 hidden-arrow"
								href="#"
								id="navbarDropdown"
								role="button"
								data-mdb-toggle="dropdown"
								aria-expanded="false"
							>
								Hi, {{ userName }}
							</a>
							<!-- Dropdown menu -->
							<ul class="dropdown-menu dropdown-menu-end text-center" aria-labelledby="navbarDropdown">
								<li>
									<a class="dropdown-item nav-link-1" href="#">Action</a>
								</li>
								<li>
									<a class="dropdown-item nav-link-1" href="#">Another action</a>
								</li>
								<li><hr class="dropdown-divider nav-link-1" /></li>
								<li>
									<a class="dropdown-item nav-link-1" href="#" @click="logout">Logout</a>
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
		<nav id="sidenav" class="sidenav" data-mdb-mode="over" data-mdb-color="light">
			<ul class="sidenav-menu">
				<li class="sidenav-item">
					<a class="sidenav-link"><span>Inventory</span></a>
					<ul class="sidenav-collapse show">
						<li class="sidenav-item">
							<router-link to="/add-inventory" class="sidenav-link">Inventory</router-link>
						</li>
						<li class="sidenav-item">
							<a class="sidenav-link">Use Stock</a>
						</li>
					</ul>
				</li>
				<li class="sidenav-item">
					<a class="sidenav-link"><span>Settings</span></a>
					<ul class="sidenav-collapse">
						<li class="sidenav-item">
							<router-link to="/categories" class="sidenav-link">Categories</router-link>
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
		},
		userName() {
			return this.$store.getters.getUserName
		}
	},
	methods: {
		logout() {
			this.$store.dispatch('logout')
		},
		close() {
			this.showLoginForm = false
		}
	}
}
</script>