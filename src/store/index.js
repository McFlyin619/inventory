import { createStore } from 'vuex';
import authModule from './modules/auth/index.js';
import inventoryModule from './modules/inventory/index.js'

export default createStore({
	modules: {
		auth: authModule,
		inventory: inventoryModule
	},
});
