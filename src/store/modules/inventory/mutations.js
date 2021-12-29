export default {
	addStateInventory(state, payload) {
		state.inventory.push(payload);
	},
	setStateInventory(state, payload) {
		state.inventory = payload;
	},
	addStateCategories(state, payload) {
		state.categories.push(payload);
	},
	setStateCategories(state, payload) {
		state.categories = payload;
	},

};
