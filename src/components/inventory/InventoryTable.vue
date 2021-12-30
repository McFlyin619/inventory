<template>
	<div class="container">
		<base-modal :show="!!error" title="An error occurred" @close="handleError">
			<p>{{ error }}</p>
		</base-modal>
		<base-modal :show="showChangeStock" @close="showChangeStock = false">
			<change-inventory-form
				:editInventory="editInventory"
				@edited-inventory="changeStock"
				@close="showChangeStock = false"
			></change-inventory-form>
		</base-modal>
		<div class="card bg-dark-3">
			<div class="row pt-5">
				<div class="col-md-8">
					<h1 class="main-b">Current Stock</h1>
				</div>
				<div class="col-md-3">
					<div class="form-floating">
						<input
							type="text"
							class="form-control text-main-b"
							id="searchInventory"
							@keyup="searchInventory"
							
						/>
						<label class="form-label text-white-50 text-end" for="searchInventory">Search category and product</label>
					</div>
				</div>
			</div>
			<div class="card-body overflow-auto">
				<table class="table table-responsive table-sm" id="inventoryTable">
					<thead>
						<tr class="text-white-50">
							<th scope="col">#</th>
							<th scope="col">Category</th>
							<th scope="col">Product</th>
							<th scope="col">Current Stock</th>
							<th scope="col">% On Hand</th>
							<th scope="col">Allotted Stock</th>
							<th scope="col">Add/Remove</th>
							<th scope="col">
								<div class="tooltip1">
									Edit
									<span class="tooltiptext1">Edit inventory item</span>
								</div>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(i, index) in currentInventory" :key="i.name" class="text-main-b">
							<th scope="row" class="text-white-50">{{ index + 1 }}</th>
							<td>{{ i.category }}</td>
							<td>{{ i.name }}</td>
							<td
								:class="{
									'text-main-success': percentage(i.count, i.countTotal) > 50,
									'text-main-warning':
										percentage(i.count, i.countTotal) > 25 &&
										percentage(i.count, i.countTotal) < 51,
									'text-main-danger': percentage(i.count, i.countTotal) < 26,
								}"
							>
								{{ i.count }}
							</td>
							<td
								:class="{
									'text-main-success': percentage(i.count, i.countTotal) > 50,
									'text-main-warning':
										percentage(i.count, i.countTotal) > 25 &&
										percentage(i.count, i.countTotal) < 51,
									'text-main-danger': percentage(i.count, i.countTotal) < 26,
								}"
							>
								{{ percentage(i.count, i.countTotal).toFixed(0) }} %
							</td>
							<td class="text-main-b">
								{{ i.countTotal }}
							</td>
							<td>
								<a @click="changeStockCount(i)" role="button">
									<i class="fas fa-exchange-alt text-main-b"></i>
								</a>
							</td>
							<td>
								<a role="button" class="me-3">
									<i class="far fa-edit text-main-b"></i>
								</a>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
import ChangeInventoryForm from '@/components/inventory/ChangeInventoryForm.vue';
export default {
	components: {
		ChangeInventoryForm,
	},
	data() {
		return {
			showChangeStock: false,
			editInventory: null,
			error: null,
			compKey: 0,
		};
	},
	created() {
		this.loadInventory();
	},
	watch: {
		compKey() {
			this.loadInventory();
		},
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
		searchInventory() {
			// Declare variables
			var input, filter, table, tr, td, td1, i, txtValue, txtValue1;
			input = document.getElementById('searchInventory');
			filter = input.value.toUpperCase();
			table = document.getElementById('inventoryTable');
			tr = table.getElementsByTagName('tr');

			// Loop through all table rows, and hide those who don't match the search query
			for (i = 0; i < tr.length; i++) {
				td = tr[i].getElementsByTagName('td')[0];
				td1 = tr[i].getElementsByTagName('td')[1];
				if (td || td1) {
					txtValue = td.textContent || td.innerText;
					txtValue1 = td1.textContent || td1.innerText;
					if (txtValue.toUpperCase().indexOf(filter) > -1 || txtValue1.toUpperCase().indexOf(filter) > -1) {
						tr[i].style.display = '';
					} else {
						tr[i].style.display = 'none';
					}
				}
			}
		},
		changeStockCount(inventory) {
			this.editInventory = inventory;
			this.showChangeStock = true;
		},
		async changeStock(inventory) {
			console.log(inventory);
			const payload = {
				inventory: inventory,
			};
			try {
				await this.$store.dispatch('inventory/updateInventory', payload);
			} catch (err) {
				this.error = err.message;
			}
			this.compKey += 1;
		},
		percentage(current, stock) {
			const per = (current / stock) * 100;
			return per;
		},
		loadInventory() {
			this.$store.dispatch('inventory/fetchInventory');
		},
		handleError() {
			this.error = null;
		},
	},
};
</script>

<style scoped></style>
