<template>
	<div class="container mt-5 text-start">
		<base-modal :show="!!error" title="An error occurred" @close="handleError">
			<p>{{ error }}</p>
		</base-modal>
		<h1 class="mb-5 main-b text-center">Add Categories</h1>
		<form @submit.prevent="addCategories">
			<div v-for="(input, index) in category" :key="`categoryInput-${index}`" class="row mb-2">
				<div class="col-10">
					<div class="form-floating">
						<input type="text" id="categoryName" class="form-control" v-model.trim="input.categoryName" />
						<label class="form-label text-end" for="categoryName">Category</label>
					</div>
				</div>
				<div class="col-2 d-flex align-items-center">
					<a role="button" class="me-2" @click="addField(input, category)"
						><i class="fas fa-plus-circle fa-2x text-main-b"></i
					></a>
					<a v-show="category.length > 1" role="button" @click="removeField(index, category)"
						><i class="far fa-times-circle text-main-danger fa-2x"></i
					></a>
				</div>
			</div>
			<button class="btn btn-main-b btn-lg mt-5">Save</button>
		</form>
	</div>
</template>

<script>
export default {
	emits: ['added'],
	data() {
		return {
			category: [{ categoryName: ''}],
			error: null,
		};
	},
	methods: {
		addField(value, fieldType) {
			fieldType.push({ value: '' });
		},
		removeField(index, fieldType) {
			fieldType.splice(index, 1);
		},
		async addCategories() {
			const payload = {
				category: this.category,
			};
			try {
				await this.$store.dispatch('inventory/addNewCategories', payload);
				this.$emit('added')
			} catch (err) {
				this.error = err.message || 'Failed to add inventory';
			}
			this.category = [{ categoryName: ''}]
		},
		handleError() {
			this.error = null;
		},
	},
};
</script>