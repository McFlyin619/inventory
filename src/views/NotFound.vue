<template>
	<section class="text-info mt-5">
		<h1>{{randomMessages.title}}</h1>
		<h4>
			{{ randomMessages.message }}
			<router-link to="/">{{ randomMessages.linkText}}</router-link>.
		</h4>
	</section>
</template>

<script>
export default {
	data() {
		return {
			errorMessages : [
				{
					title: 'Aw snap.. here we go again',
					message: "we are playing an intense game of hide n seek, end the game by clicking",
					linkText: 'here'
				},
			]
		}
	},
	computed: {
		randomMessages() {
			const random = this.errorMessages[Math.floor(Math.random() * this.errorMessages.length)]
			return random
		}
	}
}
</script>