import * as React from 'react';
import axios from 'axios';
import { Box, Button, ButtonGroup, TextField } from '@material-ui/core';
import { showMessage } from 'app/store/fuse/messageSlice';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { SearchOutlined } from '@material-ui/icons';
import FusePageCarded from '@fuse/core/FusePageCarded';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { DataGrid } from '@mui/x-data-grid';
import { printExcel } from 'app/main/comdistrib/styles';

const serverapi = process.env.REACT_APP_SERVERAPI; // SERVICIO
const options = { headers: { 'Access-Control-Allow-Origin': '*' } }; // cors

// FUNCION PRINCIPAL
function Producto(props) {
	// EXCEL
	const dispatch = useDispatch();
	const Excel = listaexcel => {
		if (listaexcel.length > 0) {
			// ${`${data.fi} a ${data.ff} ${data.hri} a ${data.hrf}`}
			printExcel(listaexcel, `Informe de productos`);
		} else {
			dispatch(
				showMessage({
					message: `Para generar un Excel deben existir datos en la tabla de productos`,
					variant: 'error',
					autoHideDuration: 5000,
					anchorOrigin: {
						vertical: 'top', // top bottom
						horizontal: 'center' // left center right
					}
				})
			);
		}
	};
	// lista para la busqueda
	// axios.get(`${serverapi}/itemsTodos`);
	// estilos para el text de busqueda
	const useStyles = makeStyles(() => ({
		noBorder: {
			border: 'none'
		},
		colortext: {
			color: 'black'
		}
	}));
	const classes = useStyles();
	// formato de monedas
	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2
	});
	//  ============== ESTRUCTURA DEL DATAGRID ==================
	// COLUMNAS
	const columns = [
		// { field: 'ID', headerName: 'ID', width: 140 },
		{ field: 'ITEM', headerName: 'Codigo', width: 100, headerClassName: 'columnclass' },
		{ field: 'CODBARRA', headerName: 'Codigo de Barra', width: 150, headerClassName: 'columnclass' },
		{ field: 'NOMBRE', headerName: 'Nombre', width: 200, headerClassName: 'columnclass' },
		{ field: 'ESTADO', headerName: 'Estado', width: 80, headerClassName: 'columnclass' },
		{ field: 'IVA', headerName: 'Iva', width: 80, headerClassName: 'columnclass' },
		{
			field: 'PRECIO1',
			headerName: 'Precio 1',
			width: 100,
			headerClassName: 'columnclass',
			valueFormatter: ({ value }) => formatter.format(value)
		},
		{
			field: 'PRECIO2',
			headerName: 'Precio 2',
			width: 100,
			headerClassName: 'columnclass',
			valueFormatter: ({ value }) => formatter.format(value)
		},
		{
			field: 'PRECIO3',
			headerName: 'Precio 3',
			width: 100,
			headerClassName: 'columnclass',
			valueFormatter: ({ value }) => formatter.format(value)
		},
		{
			field: 'PRECIO4',
			headerName: 'Precio 4',
			width: 100,
			headerClassName: 'columnclass',
			valueFormatter: ({ value }) => formatter.format(value)
		},
		{
			field: 'PRECIO5',
			headerName: 'Precio 5',
			width: 100,
			headerClassName: 'columnclass',
			valueFormatter: ({ value }) => formatter.format(value)
		}
	];
	// FILAS INICIALES
	const [rowss, setItems] = React.useState([]);
	// metodo para filtrar productos
	const [products, setProducts] = React.useState('');
	const BuscarProduct = async e => {
		setProducts(e.target.value);
		const str = e.target.value;
		let response = await axios(`${serverapi}/itemsTodos`, options);
		response = response.data.items;
		// console.log(response);
		const newlist = response.filter(p => {
			return (
				String(p.ITEM).includes(str.toLocaleUpperCase().trim()) ||
				String(p.NOMBRE).includes(str.toLocaleUpperCase()) ||
				String(p.CODBARRA).includes(str.toLocaleUpperCase())
			);
		});
		setItems(newlist);
	};
	// selecion para editar
	const onSelectEdit = e => {
		// console.log(e.id);
		props.history.push(`editproducto/${e.id}`);
	};
	// mostrando los productos
	React.useEffect(() => {
		async function GetProductos() {
			let response = await axios(`${serverapi}/itemsTodos`, options);
			response = response.data.items;
			setItems(response);
		}
		GetProductos();
	}, []);
	return (
		<FusePageCarded
			classes={{
				toolbar: 'p-0',
				header: 'min-h-52 h-72 sm:h-136 sm:min-h-136'
			}}
			header={
				<>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							// flexWrap: 'wrap',
							alignItems: 'center',
							width: '100%'
						}}
					>
						<h2 style={{ fontWeight: 'bold', fontSize: '3rem' }} className="none2">
							Productos
						</h2>
						<TextField
							style={{
								width: '50%',
								background: 'white',
								borderRadius: '3rem',
								color: 'black'
							}}
							InputProps={{
								classes: { notchedOutline: classes.noBorder, input: classes.colortext },
								startAdornment: <SearchOutlined style={{ color: 'black', margin: '0.5rem' }} />
							}}
							size="small"
							placeholder="Buscar productos"
							// name="buscar"
							variant="outlined"
							onChange={e => BuscarProduct(e)}
							value={products}
						/>
						<Button
							color="primary"
							style={{ background: '#40EDF7', minWidth: '150px', textDecoration: 'none', color: 'black' }}
							variant="contained"
							// href="/nuevoproducto"
							onClick={() => {
								props.history.replace(`/nuevoproducto`);
							}}
						>
							Nuevo Producto
						</Button>
					</div>
				</>
			}
			contentToolbar={
				<>
					<div
						style={{
							margin: '3rem',
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							width: '100%'
						}}
					>
						<h2 style={{ fontWeight: 'bold' }}>Opciones</h2>
						<ButtonGroup variant="contained" disableElevation>
							<Button
								color="primary"
								style={{ background: '#1f6e43', minWidth: '60px' }}
								variant="contained"
								onClick={() => {
									Excel(rowss);
								}}
							>
								Excel
							</Button>
							{/* <Button
								color="primary"
								style={{ background: '#F74C41', minWidth: '60px' }}
								variant="contained"
							>
								Pdf
							</Button> */}
						</ButtonGroup>
					</div>
				</>
			}
			content={
				<>
					<FuseAnimate
						animation={{
							translateX: [0, '100%'],
							opacity: [1, 0]
						}}
						duration={400}
						delay={400}
					>
						<Box
							sx={{
								'& .columnclass': {
									fontSize: '1.1rem',
									width: '100%',
									fontFamily: 'Franklin Gothic '
								},
								'& .MuiDataGrid-columnHeaders': {
									backgroundColor: '#EFEFEF',
									borderRadius: '0.5rem'
								},
								'& .yell': {
									backgroundColor: '#fafad2'
								},
								'& .cell': {
									backgroundColor: '#e0ffff'
								},
								'& .ross': {
									backgroundColor: '#ffe4e1'
								},
								'& .MuiDataGrid-columnsPanelRow': {
									border: '0'
								}
							}}
						>
							<div
								style={{
									margin: '0.8rem',
									height: '80vh',
									width: '100%',
									overflowY: 'scroll'
								}}
							>
								<DataGrid
									// disableColumnMenu
									hideFooterSelectedRowCount
									disableColumnSelector
									// onRowSelected={e => onSelectEdit(e)}
									onRowClick={e => onSelectEdit(e)}
									rows={rowss}
									columns={columns}
									density="compact"
									getRowId={rows => rows.ITEM}
									sx={{
										boxShadow: 2,
										borderRadius: 5
									}}
									// getCellClassName={params => {
									// 	// if (params.field === 'NUMERO') params.field = 'yell';
									// 	return (
									// 		params.field === 'NUMERO' ? 'yell' : '',
									// 		params.field === 'FECHA' ? 'cell' : ''
									// 	);
									// }}
								/>
							</div>
						</Box>
					</FuseAnimate>
				</>
			}
		/>
	);
}

export default Producto;
