<template>
<div>
	<nav-bar></nav-bar>
	<router-view />
</div>

</template>

<script>
import NavBar from '@/components/layout/NavBar.vue'
export default {
	components: {
		NavBar
	},
	created() {
		this.$store.dispatch('tryLogin');
	},
}
</script>

<style>
#app {
	font-family: 'Fira Sans', sans-serif !important;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
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
	border: 3px solid var(--main-b) !important;
	box-shadow: 0 1px 0 0 var(--main-b) !important;
	color: var(--main-b) !important;
	background-color: var(--dark-3);
}

.form-floating select {
	color: var(--main-b)!important;
	border: 0.5px solid var(--main-b)!important;
	background-color: var(--dark-3);
}

.form-floating select:focus {
	border: 2px solid var(--main-b)!important;
	box-shadow: 0 1px 0 0 var(--main-b)!important;
	color: var(--main-b)!important;
}

.table {
	background-color: var(--dark-3);
}
</style>
