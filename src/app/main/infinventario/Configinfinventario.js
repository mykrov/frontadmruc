import { authRoles } from 'app/auth';
import IndexInfInventario from './indexinfinventario';

const ConfigInfInventario = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/infinventario',
			component: IndexInfInventario
		}
	]
};

export default ConfigInfInventario;
