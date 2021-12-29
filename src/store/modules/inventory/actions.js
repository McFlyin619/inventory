export default {
	async addNew(context, payload) {
		const inPayload = {
			items: payload.inventory,
		};
		const response = await fetch('https://inventory-beb75-default-rtdb.firebaseio.com/inventory.json', {
			method: 'POST',
			body: JSON.stringify(inPayload),
		});

		const responseData = await response.json();
		if (!response.ok) {
			const error = new Error(responseData.message || 'Failed to add inventory');
			throw error;
		}

		context.commit('addStateInventory', inPayload);
	},
	async updateInventory(context, payload) {
		console.log(payload)
		const id = payload.inventory.id
		const index = payload.inventory.itemIndex
		const inPayload = {
			inventoryCategory: payload.inventory.category,
			inventoryCount: payload.inventory.count,
			inventoryCountTotal: payload.inventory.countTotal,
			inventoryName:payload.inventory.inventoryName
		};
		const response = await fetch(`https://inventory-beb75-default-rtdb.firebaseio.com/inventory/${id}/items/${index}.json`, {
			method: 'PATCH',
			body: JSON.stringify(inPayload),
		});

		const responseData = await response.json();
		if (!response.ok) {
			const error = new Error(responseData.message || 'Failed to add inventory');
			throw error;
		}
	},
	async fetchInventory(context) {
		const response = await fetch('https://inventory-beb75-default-rtdb.firebaseio.com/inventory.json', {
			method: 'GET',
		});

		const responseData = await response.json();
		if (!response.ok) {
			const error = new Error(responseData.message || 'Failed to add inventory');
			throw error;
		}
		const inventory = [];
		for (const key in responseData) {
			for (const index in responseData[key].items) {
				const items = {
					id: key,
					itemIndex: index,
					name: responseData[key].items[index].inventoryName,
					category: responseData[key].items[index].inventoryCategory,
					count: responseData[key].items[index].inventoryCount,
					countTotal: responseData[key].items[index].inventoryCountTotal,
				};
				inventory.push(items);
			}
		}

		context.commit('setStateInventory', inventory);
	},
	async addNewCategories(context, payload) {
		const inPayload = {
			category: payload.category,
		};
		const response = await fetch('https://inventory-beb75-default-rtdb.firebaseio.com/categories.json', {
			method: 'POST',
			body: JSON.stringify(inPayload),
		});

		const responseData = await response.json();
		if (!response.ok) {
			const error = new Error(responseData.message || 'Failed to add inventory');
			throw error;
		}

		context.commit('addStateCategories', inPayload);
	},
	async fetchCategories(context) {
		const response = await fetch('https://inventory-beb75-default-rtdb.firebaseio.com/categories.json', {
			method: 'GET',
		});

		const responseData = await response.json();
		if (!response.ok) {
			const error = new Error(responseData.message || 'Failed to add inventory');
			throw error;
		}
		const categories = [];
		for (const key in responseData) {
			const item = {
				id: key,
				category: responseData[key].category,
			};
			categories.push(item);
		}

		context.commit('setStateCategories', categories);
	},
};
