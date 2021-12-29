<template>
	<div class="container overflow-auto">
		<base-modal :show="!!error" title="An error occurred" @close="handleError">
			<p>{{ error }}</p>
		</base-modal>
		<base-modal :show="showChangeStock" @close="showChangeStock = false">
			<change-inventory-form :editInventory="editInventory" @edited-inventory="changeStock" @close="showChangeStock = false"></change-inventory-form>
		</base-modal>
		<table class="table">
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">Category</th>
					<th scope="col">Product</th>
					<th scope="col">Amount</th>
					<th scope="col">Stock Total</th>
					<th scope="col">% On Hand</th>
					<th scope="col">Change Amount</th>
					<th scope="col">Edit Inventory</th>

				</tr>
			</thead>
			<tbody>
				<tr v-for="(i, index ) in currentInventory" :key="i.name" :class="{'text-main-success': percentage(i.count, i.countTotal) > 50, 'text-main-warning': percentage(i.count, i.countTotal) > 25 && percentage(i.count, i.countTotal) < 51, 'text-main-danger': percentage(i.count, i.countTotal) < 26}">
					<th scope="row">{{ index + 1 }}</th>
					<td>{{ i.category }}</td>
					<td>{{ i.name }}</td>
					<td>{{ i.count }}</td>
					<td>{{ i.countTotal }}</td>
					<td>{{ percentage(i.count, i.countTotal).toFixed(0)}} %</td>
					<td><a @click="changeStockCount(i)" role="button"><i class="fas fa-exchange-alt text-main-b"></i></a></td>
					<td><a role="button" class="me-3"><i class="far fa-edit text-main-b"></i></a></td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import ChangeInventoryForm from '@/components/inventory/ChangeInventoryForm.vue'
export default {
	components: {
		ChangeInventoryForm
	},
	data() {
		return {
			showChangeStock: false,
			editInventory: null,
			error: null,
			compKey: 0
		};
	},
	created() {
		this.loadInventory();
	},
	watch: {
		compKey() {
			this.loadInventory()
		}
	},
	computed: {
		currentInventory() {
			const items = this.$store.getters['inventory/getInventory'];
			return items.sort((a, b) => {
				if (a.category < b.category) return -1;
				if (a.category > b.category) return 1;
			});
		},
	},
	methods: {
		changeStockCount(inventory) {
			this.editInventory = inventory
			this.showChangeStock = true
		},
		async changeStock(inventory) {
			console.log(inventory)
			const payload = {
				inventory: inventory,
			}
			try {
				await this.$store.dispatch('inventory/updateInventory', payload)
			} catch (err) {
				this.error = err.message
			}
			this.compKey += 1
		},
		percentage(current, stock) {
			const per = (current/stock) * 100
			return per
		},
		loadInventory() {
			this.$store.dispatch('inventory/fetchInventory');
		},
		handleError() {
			this.error = null
		}
	},
};
</script>

<style scoped>

</style>
