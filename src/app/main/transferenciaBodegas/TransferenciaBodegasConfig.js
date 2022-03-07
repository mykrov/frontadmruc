import TransferenciaBodegas from './TransferenciaBodegas';

const TransferenciaBodegasConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/transbob',
			component: TransferenciaBodegas
		}
	]
};

export default TransferenciaBodegasConfig;
