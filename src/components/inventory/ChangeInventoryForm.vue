<template>
	<div>
		<h1 v-if="!mode" class="main-b mb-5">Add/Remove Stock</h1>
		<h1 v-else class="main-b mb-5">Edit Stock</h1>
		<form @submit.prevent="changeInventory">
			<div class="row mb-2 p-0">
				<div class="col-md-4 mb-2">
					<div class="form-floating">
						<select
							:disabled="mode === false"
							class="form-select"
							id="inventoryCategory"
							v-model.trim="newInventory.category"
						>
							<option selected>{{ newInventory.category }}</option>
							<option v-for="cat in categoriesNew" :key="cat">{{ cat.categoryName }}</option>
						</select>
						<label class="form-label text-end" for="inventoryCategory">Category</label>
					</div>
				</div>
				<div class="col-md-4 mb-2">
					<div class="form-floating">
						<input
							:disabled="mode === false"
							type="text"
							id="inventoryName"
							class="form-control"
							v-model.trim="newInventory.name"
						/>
						<label class="form-label text-end" for="inventoryName">Product Name</label>
					</div>
				</div>
				<div class="col-md-2 mb-2">
					<div class="form-floating">
						<input
							type="number"
							id="inventoryCount"
							class="form-control"
							v-model.trim="newInventory.count"
						/>
						<label class="form-label text-end" for="inventoryName">Current Stock</label>
					</div>
				</div>
				<div class="col-md-2 mb-2">
					<div class="form-floating">
						<input
							:disabled="mode === false"
							type="number"
							id="inventoryCountTotal"
							class="form-control"
							v-model.trim="newInventory.countTotal"
						/>
						<label class="form-label text-end" for="inventoryName">Allotted Stock</label>
					</div>
				</div>
			</div>
			<button class="btn btn-main-b btn-lg mt-5">Save</button>
		</form>
	</div>
</template>

<script>
export default {
	emits: ['edited-inventory', 'close'],
	props: ['editInventory', 'mode', 'categories'],
	data() {
		return {
			newInventory: {
				id: this.editInventory.id,
				itemIndex: this.editInventory.itemIndex,
				category: this.editInventory.category,
				name: this.editInventory.name,
				count: this.editInventory.count,
				countTotal: this.editInventory.countTotal,
			},
		};
	},
	computed: {
		categoriesNew() {
			const all = this.categories
			return all.filter(i => i.categoryName !== this.newInventory.category)
		},
	},
	methods: {
		changeInventory() {
			this.$emit('edited-inventory', this.newInventory);
			this.$emit('close');
		},
	},
};
</script>

<style scoped>
input:disabled,
select:disabled {
	background-color: var(--dark-1);
}
</style>
