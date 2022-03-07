import Producto from './producto';

const ProductoConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/productos',
			component: Producto
		}
	]
};

export default ProductoConfig;
