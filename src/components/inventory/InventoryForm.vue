<template>
	<div class="container mt-5 text-start">
		<base-modal :show="!!error" title="An error occurred" @close="handleError">
			<p>{{ error }}</p>
		</base-modal>
		<h1 class="mb-5 main-b text-center">Add Inventory</h1>
		<form @submit.prevent="addInventory">
			<div v-for="(input, index) in inventory" :key="`inventoryInput-${index}`" class="row mb-2">
				<div class="col-3">
					<div class="form-floating">
						<select class="form-select" id="inventoryCategory"  v-model.trim="input.inventoryCategory">
							<option selected>Select a category</option>
							<option v-for="cat in categories" :key="cat" :value="cat.categoryName">{{ cat.categoryName }}</option>
						</select>
						<label class="form-label text-end" for="inventoryCategory">Category</label>
					</div>
				</div>
				<div class="col-3">
					<div class="form-floating">
						<input type="text" id="inventoryName" class="form-control" v-model.trim="input.inventoryName" />
						<label class="form-label text-end" for="inventoryName">Product Name</label>
					</div>
				</div>
				<div class="col-2">
					<div class="form-floating">
						<input
							type="number"
							id="inventoryCount"
							class="form-control"
							v-model.trim="input.inventoryCount"
						/>
						<label class="form-label text-end" for="inventoryName">Current Stock</label>
					</div>
				</div>
				<div class="col-2">
					<div class="form-floating">
						<input
							type="number"
							id="inventoryCountTotal"
							class="form-control"
							v-model.trim="input.inventoryCountTotal"
						/>
						<label class="form-label text-end" for="inventoryName">Stock Total</label>
					</div>
				</div>
				<div class="col-2 d-flex align-items-center">
					<a role="button" class="me-2" @click="addField(input, inventory)"
						><i class="fas fa-plus-circle fa-2x text-main-b"></i
					></a>
					<a v-show="inventory.length > 1" role="button" @click="removeField(index, inventory)"
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
	props:['categories'],
	data() {
		return {
			inventory: [{ inventoryCategory: '', inventoryName: '', inventoryCount: 0, inventoryCountTotal: 0 }],
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
		async addInventory() {
			const payload = {
				inventory: this.inventory,
			};
			try {
				await this.$store.dispatch('inventory/addNew', payload);
				this.$emit('added');
			} catch (err) {
				this.error = err.message || 'Failed to add inventory';
			}
			this.inventory = [{ inventoryCategory: '', inventoryName: '', inventoryCount: 0 }];
		},
		handleError() {
			this.error = null;
		},
	},
};
</script>
