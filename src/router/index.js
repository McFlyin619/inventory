import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import AddInventory from '../views/inventory/AddInventory.vue'
import AddCategories from '../views/inventory/AddCategories.vue';
import store from '../store/index.js';


const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/add-inventory',
		name: 'AddInventory',
		component: AddInventory,
		meta: { requiresAuth: true },
	},
	{
		path: '/categories',
		name: 'AddCategories',
		component: AddCategories,
		meta: { requiresAuth: true },
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

router.beforeEach(function (to, _, next) {
	if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
		next('/');
	} else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
		next('/discussions');
	} else {
		next();
	}
});

export default router;
