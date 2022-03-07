import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import ExampleConfig from 'app/main/example/ExampleConfig';

// Walter
import DashboardConfig from 'app/main/dashboard/DashboardConfig';
import LoginConfig from 'app/main/login/loginConfig';
import ConfigInfInventario from 'app/main/infinventario/Configinfinventario';

// Allan
import ProductoConfig from 'app/main/IngresoProducto/Productos/productoConfig';
import NewProductConfig from 'app/main/IngresoProducto/VerProductos/newproductConfig';
import EditProductConfig from 'app/main/IngresoProducto/EditarProductos/editproductConfig';
import AjustePrecioConfig from 'app/main/AjustePrecio/ajusteprecioConfig';
import CategoriaConfig from 'app/main/mantenimiento/categoria/categoriaConfig';
import MarcaConfig from 'app/main/mantenimiento/marca/marcaConfig';
import PresentacionConfig from 'app/main/mantenimiento/presentacion/presentacionConfig';
import FamiliaConfig from 'app/main/mantenimiento/familia/familiaConfig';
import LineaConfig from 'app/main/mantenimiento/linea/lineaConfig';
// Manuel
import TransferenciaBodegasConfig from 'app/main/transferenciaBodegas/TransferenciaBodegasConfig';

const routeConfigs = [
	ExampleConfig,
	DashboardConfig,
	LoginConfig,
	ConfigInfInventario,
	ProductoConfig,
	NewProductConfig,
	EditProductConfig,
	TransferenciaBodegasConfig,
	AjustePrecioConfig,
	CategoriaConfig,
	MarcaConfig,
	PresentacionConfig,
	FamiliaConfig,
	LineaConfig
];

const routes = [
	// if you want to make whole app auth protected by default change defaultAuth for example:
	// ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
	// The individual route configs which has auth option won't be overridden.
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: '/',
		component: () => <Redirect to="/login" />
	},
	{
		path: '/dashboard',
		component: () => <Redirect to="/dashboard" />
	},
	{
		path: '/infinventario',
		component: () => <Redirect to="/infinventario" />
	},
	{
		path: '/productos',
		component: () => <Redirect to="/productos" />
	},
	{
		path: '/nuevoproducto',
		component: () => <Redirect to="/nuevoproducto" />
	},
	{
		path: '/editproducto',
		component: () => <Redirect to="/editproducto" />
	},
	{
		path: '/transbob',
		component: () => <Redirect to="/transbob" />
	},
	{
		path: '/ajusteprecio',
		component: () => <Redirect to="/ajusteprecio" />
	},
	{
		path: '/mcategoria',
		component: () => <Redirect to="/mcategoria" />
	},
	{
		path: '/mmarca',
		component: () => <Redirect to="/mmarca" />
	},
	{
		path: '/mpresentacion',
		component: () => <Redirect to="/mpresentacion" />
	},
	{
		path: '/mfamilia',
		component: () => <Redirect to="/mfamilia" />
	},
	{
		path: '/mlinea',
		component: () => <Redirect to="/mlinea" />
	}
];

export default routes;
