import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
	{
		key: 45,
		id: 'Inicio',
		title: 'INICIO',
		translate: 'Inicio',
		type: 'item',
		icon: 'laptop_windows',
		url: '/dashboard'
	},
	{
		key: 22,
		id: 'cxc',
		title: 'cxc',
		translate: 'Inventario',
		type: 'collapse',
		icon: 'account_tree',
		children: [
			{
				key: 5,
				id: 'InfInventario',
				title: 'INFINVENTARIO',
				translate: 'Informe de Stock',
				type: 'item',
				icon: 'ad_units',
				url: '/infinventario'
			},
			{
				key: 1,
				id: 'producto',
				title: 'Productos',
				translate: 'Productos',
				type: 'item',
				icon: 'all_inbox',
				url: '/productos'
			},
			{
				key: 2,
				id: 'transferecia-bodega',
				title: 'Transf. Productos',
				translate: 'Transf. Productos',
				type: 'item',
				icon: 'inbox',
				url: '/transbob'
			},
			{
				key: 3,
				id: 'ajustes-precio',
				title: 'Precios',
				translate: 'Precios',
				type: 'item',
				icon: 'more',
				url: '/ajusteprecio'
			},
			{
				key: 4,
				id: 'categoria',
				title: 'Categoria',
				translate: 'Categoria',
				type: 'item',
				icon: 'category',
				url: '/mcategoria'
			},
			{
				key: 7,
				id: 'familia',
				title: 'Familia',
				translate: 'Familia',
				type: 'item',
				icon: 'category',
				url: '/mfamilia'
			},
			{
				key: 8,
				id: 'linea',
				title: 'Linea',
				translate: 'Linea',
				type: 'item',
				icon: 'category',
				url: '/mlinea'
			},
			{
				key: 9,
				id: 'marca',
				title: 'Marca',
				translate: 'Marca',
				type: 'item',
				icon: 'new_releases',
				url: '/mmarca'
			},
			{
				key: 10,
				id: 'presentacion',
				title: 'Presentacion',
				translate: 'Presentacion',
				type: 'item',
				icon: 'archive',
				url: '/mpresentacion'
			}
		]
	}
];

export default navigationConfig;
