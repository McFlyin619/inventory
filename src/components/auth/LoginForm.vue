<template>
	<div>
		<!-- Pills navs -->
		<ul class="nav nav-pills nav-justified mb-3 p-0 ms-0" id="ex1" role="tablist">
			<li class="nav-item" role="presentation">
				<a class="nav-link active" id="tab-login" data-mdb-toggle="pill" href="#pills-login" role="tab"
					>Login</a
				>
			</li>
			<li class="nav-item" role="presentation">
				<a
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
			<div class="tab-pane fade show active text-start" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
				<form>
					<!-- Email input -->
					<div class="form-floating mb-4">
						<input type="email" id="loginName" class="form-control" />
						<label class="form-label text-end" for="loginName">Email or username</label>
					</div>

					<!-- Password input -->
					<div class="form-floating mb-4">
						<input type="password" id="loginPassword" class="form-control" />
						<label class="form-label" for="loginPassword">Password</label>
					</div>

					<!-- Submit button -->
					<button type="submit" class="btn btn-secondary btn-block mb-4">Sign in</button>
				</form>
			</div>
			<div class="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
				<form>
					<!-- Name input -->
					<div class="form-floating mb-4">
						<input type="text" id="registerName" class="form-control" />
						<label class="form-label" for="registerName">Name</label>
					</div>

					<!-- Email input -->
					<div class="form-floating mb-4">
						<input type="email" id="registerEmail" class="form-control" />
						<label class="form-label" for="registerEmail">Email</label>
					</div>

					<!-- Password input -->
					<div class="form-floating mb-4">
						<input type="password" id="registerPassword" class="form-control" />
						<label class="form-label" for="registerPassword">Password</label>
					</div>

					<!-- Repeat Password input -->
					<div class="form-floating mb-4">
						<input type="password" id="registerRepeatPassword" class="form-control" />
						<label class="form-label" for="registerRepeatPassword">Repeat password</label>
					</div>
					<!-- Submit button -->
					<button type="submit" class="btn btn-secondary btn-block mb-3">Sign in</button>
				</form>
			</div>
		</div>
		<!-- Pills content -->
	</div>
</template>

<style scoped>
.nav-pills .nav-link.active {
	background-color: #b23cfd;
}
.md-form label.active {
	color: #b23cfd !important;
}
.md-form input {
	color: #b23cfd !important;
}
.md-form input:focus {
	border-bottom: 0.5px solid #b23cfd !important;
	box-shadow: 0 1px 0 0 #b23cfd !important;
	color: #b23cfd !important;
}
.form-floating label {
	color: #fff !important;
}

.form-floating label.active {
	color: #b23cfd !important;
}

.form-floating input {
	color: #b23cfd !important;
	border: 0.5px solid #b23cfd !important;
	background-color: #212529;
}

.form-floating input:focus {
	border: 3px solid #b23cfd !important;
	box-shadow: 0 1px 0 0 #b23cfd !important;
	color: #b23cfd !important;
	background-color: #212529;
}

.form-floating select {
	color: #b23cfd !important;
	border: 0.5px solid #b23cfd !important;
	background-color: #212529;
}

.form-floating select:focus {
	border: 2px solid #b23cfd !important;
	box-shadow: 0 1px 0 0 #b23cfd !important;
	color: #b23cfd !important;
}
.form-outline textarea,
input {
	color: #b23cfd !important;
	border: 0.5px solid #b23cfd !important;
	background-color: #212529;
}

.form-outline textarea:focus,
input {
	border: 2px solid #b23cfd !important;
	box-shadow: 0 1px 0 0 #b23cfd !important;
	color: #b23cfd !important;
	background-color: #212529;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
	-webkit-box-shadow: 0 0 0 30px #212529 inset !important;
	-webkit-text-fill-color: #b23cfd;
}
</style>
