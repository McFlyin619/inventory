<template>
	<div>
		<inventory-form v-if="categories.length > 0" @added="watchCount" :categories="categories" class="border-bottom pb-5"></inventory-form>
		<h1 v-else class="main-b mt-5">Please add a category <router-link class="text-white-50" to="/categories">here</router-link> to begin</h1>
		<inventory-table v-if="categories.length > 0" class="mt-5"></inventory-table>
	</div>
</template>

<script>
import InventoryForm from '@/components/inventory/InventoryForm.vue';
import InventoryTable from '@/components/inventory/InventoryTable.vue'
export default {
	components: {
		InventoryForm,
		InventoryTable
	},
	data() {
		return {
			count: 0
		}
	},
	created() {
		this.loadCategories()
	},
	watch: {
		count() {
			this.loadInventory()
		}
	},
	computed: {
		categories() {
			const all = this.$store.getters['inventory/getCategories']
			const cat = []
			for(const i in all) {
				for(const j in all[i].category) {
					cat.push(all[i].category[j])
				}
			}
			return cat
		}
	},
	methods: {
		watchCount() {
			this.count += 1
		},
		loadInventory() {
			this.$store.dispatch('inventory/fetchInventory')
		},
		loadCategories() {
			this.$store.dispatch('inventory/fetchCategories')
		}
	}
};
</script>
