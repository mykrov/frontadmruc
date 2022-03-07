import * as React from 'react';
import axios from 'axios';
import {
	Box,
	Modal,
	Grid,
	Button,
	TextField,
	MenuItem,
	Checkbox,
	FormControl,
	FormControlLabel,
	InputAdornment,
	IconButton,
	Backdrop,
	InputLabel,
	Fade
} from '@material-ui/core';
import { showMessage } from 'app/store/fuse/messageSlice';
import { useDispatch } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { stylemodal, headers } from 'app/main/comdistrib/styles';
import { SearchOutlined } from '@material-ui/icons';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import { TextField, IconButton, InputAdornment } from '@material-ui/core';

const serverapi = process.env.REACT_APP_SERVERAPI; // SERVICIO
const options = { headers: { 'Access-Control-Allow-Origin': '*' } }; // cors

export default function GrabaCambio(data) {
	// data.data.op1 = currency;
	// console.log(data.data);
	/* controla el check */
	const [op, setOp] = React.useState('item');
	const handleChange = event => {
		setOp(event.target.value);
		setCodProd('');
		setNomProd('');
		setCodCat('');
		setNomCat('');
		setCodFam('');
		setNomFam('');
		setCodLinea('');
		setNomLinea('');
		setCodProv('');
		setNomProv('');
	};
	// primero elige una categoria
	// const [elijecat, setElijeCat] = React.useState(true);
	// const activateIcon = () => setElijeCat(false);
	// modal de productos
	const [listprod, setListprod] = React.useState([]);
	const [openprod, setOpenProd] = React.useState(false);
	const handleOpenProd = () => setOpenProd(true);
	const handleCloseProd = () => {
		setOpenProd(false);
		setBuscarProd('');
		setItemsProd(listprod);
	};
	// TABLA DE DATOS
	const columnsprod = [
		{ field: 'ITEM', headerName: 'Codigo', width: 90, headerClassName: 'columnclass' },
		{ field: 'NOMBRE', headerName: 'Nombre', width: 150, headerClassName: 'columnclass' },
		{ field: 'ESTADO', headerName: 'Estado', width: 90, headerClassName: 'columnclass' }
	];
	const [rowssprod, setItemsProd] = React.useState([]);
	const getProductos = async () => {
		let response = await axios(`${serverapi}/itemsTodos`, options);
		response = response.data.items;
		setItemsProd(response);
		setListprod(response);
	};
	// hook para buscar
	const [buscarprod, setBuscarProd] = React.useState('');
	const handlesetBuscarProd = async e => {
		setBuscarProd(e.target.value);
		const str = e.target.value;
		let response = await axios(`${serverapi}/itemsTodos`, options);
		let resultado;
		response = response.data.items;
		const newlist = response.filter(q => {
			if (opfillcat === 'codigo') {
				resultado = q.ITEM.includes(str.toLocaleUpperCase().trim());
			}
			if (opfillcat === 'nombre') {
				resultado = q.NOMBRE.includes(str.toLocaleUpperCase().trim());
			}
			if (opfillcat === 'estado') {
				resultado = q.ESTADO.includes(str.toLocaleUpperCase().trim());
			}
			return resultado;
		});
		setItemsProd(newlist);
	};
	// seleccinar
	const onSelectProd = e => {
		// console.log(e);
		// cambiando categoria
		setCodProd(e.row.ITEM);
		setNomProd(e.row.NOMBRE);
		handleCloseProd();
		setBuscarProd('');
		// DataView();
	};
	// modal de categoria
	const [opencat, setOpenCat] = React.useState(false);
	const handleOpenCat = () => setOpenCat(true);
	const handleCloseCat = () => {
		setOpenCat(false);
		setBuscarCat('');
		setItemsCat(listcat);
	};
	// TABLA DE DATOS
	const columnscat = [
		{ field: 'CODIGO', headerName: 'Codigo', width: 90, headerClassName: 'columnclass' },
		{ field: 'NOMBRE', headerName: 'Nombre', width: 150, headerClassName: 'columnclass' },
		{ field: 'ESTADO', headerName: 'Estado', width: 90, headerClassName: 'columnclass' }
	];
	// pa limpiar
	const [listcat, setListcat] = React.useState([]);
	const [rowsscat, setItemsCat] = React.useState([]);
	const getCategoria = async () => {
		let response = await axios(`${serverapi}/otrosrecursos`, options);
		response = response.data.categoria;
		setItemsCat(response);
		setListcat(response);
	};
	// hook de select
	const [opfillcat, setOpFillCat] = React.useState('nombre');
	const handlesetOpFillCat = async e => {
		setOpFillCat(e.target.value);
	};
	// hook para buscar
	const [buscarcat, setBuscarCat] = React.useState('');
	const handlesetBuscarCat = async e => {
		setBuscarCat(e.target.value);
		const str = e.target.value;
		let response = await axios(`${serverapi}/otrosrecursos`, options);
		let resultado;
		response = response.data.categoria;
		const newlist = response.filter(q => {
			if (opfillcat === 'codigo') {
				resultado = q.CODIGO.includes(str.toLocaleUpperCase().trim());
			}
			if (opfillcat === 'nombre') {
				resultado = q.NOMBRE.includes(str.toLocaleUpperCase().trim());
			}
			if (opfillcat === 'estado') {
				resultado = q.ESTADO.includes(str.toLocaleUpperCase().trim());
			}
			return resultado;
		});
		setItemsCat(newlist);
	};
	/* GRUPO */
	// seleccinar una categoria
	const onSelectCat = e => {
		// console.log(e);
		// cambiando categoria
		setCodCat(e.row.CODIGO);
		setNomCat(e.row.NOMBRE);
		// cambiando cambiando familia
		setCodFam('');
		setNomFam('');
		setCodLinea('');
		setNomLinea('');
		getFamilia2(e.row.CODIGO);
		getLinea2(e.row.CODIGO);
		// activateIcon();
		setBuscarCat('');
		handleCloseCat();
	};
	// modal de familia
	const columnsfam = [
		{ field: 'CODIGO', headerName: 'Codigo', width: 90, headerClassName: 'columnclass' },
		{ field: 'NOMBRE', headerName: 'Nombre', width: 150, headerClassName: 'columnclass' },
		{ field: 'ESTADO', headerName: 'Estado', width: 90, headerClassName: 'columnclass' }
	];
	// pa limpiar
	const [listfam, setListfam] = React.useState([]);
	const [rowssfam, setItemsFam] = React.useState([]);
	const [openfam, setOpenFam] = React.useState(false);
	const handleOpenFam = () => setOpenFam(true);
	const handleCloseFam = () => {
		setOpenFam(false);
		setBuscarFam('');
		setItemsFam(listfam);
	};
	const getFamilia = async () => {
		let response = await axios(`${serverapi}/otrosrecursos`, options);
		response = response.data.familia;
		setItemsFam(response);
		setListfam(response);
	};
	// se la emplea solo si se cambia de categoria
	const getFamilia2 = async param => {
		let response = await axios(`${serverapi}/otrosrecursos`, options);
		response = response.data.familia;
		const newlist = response.filter(t => {
			return t.CATEGORIA.trim() === param.trim();
		});
		// console.log(newlist);
		setItemsFam(newlist);
	};
	// hook para buscar
	const [buscarfam, setBuscarFam] = React.useState('');
	const handlesetBuscarFam = async e => {
		setBuscarFam(e.target.value);
		const str = e.target.value;
		let response = await axios(`${serverapi}/otrosrecursos`, options);
		let resultado;
		response = response.data.familia;
		const newlist = response.filter(w => {
			if (w.CATEGORIA.trim() === codcat.trim()) {
				if (opfillcat === 'codigo') {
					resultado = w.CODIGO.includes(str.toLocaleUpperCase().trim());
				}
				if (opfillcat === 'nombre') {
					resultado = w.NOMBRE.includes(str.toLocaleUpperCase().trim());
				}
				if (opfillcat === 'estado') {
					resultado = w.ESTADO.includes(str.toLocaleUpperCase().trim());
				}
			}
			return resultado;
		});
		setItemsFam(newlist);
	};
	// seleccinar una familia
	const onSelectFam = e => {
		// console.log(e);
		// cambiando categoria
		setCodFam(e.row.CODIGO);
		setNomFam(e.row.NOMBRE);
		// cambiando cambiando familia
		setCodLinea('');
		setNomLinea('');
		// getFamilia2();
		setBuscarFam('');
		handleCloseFam();
	};
	// modal de linea
	// pa limpiar
	const [listlin, setListlin] = React.useState([]);
	const [openlin, setOpenLin] = React.useState(false);
	const handleOpenLin = () => setOpenLin(true);
	const handleCloseLin = () => {
		setOpenLin(false);
		setBuscarLin('');
		setItemsLin(listlin);
	};
	const columnslim = [
		{ field: 'CODIGO', headerName: 'Codigo', width: 90, headerClassName: 'columnclass' },
		{ field: 'NOMBRE', headerName: 'Nombre', width: 150, headerClassName: 'columnclass' },
		{ field: 'ESTADO', headerName: 'Estado', width: 90, headerClassName: 'columnclass' }
	];
	const [rowsslim, setItemsLin] = React.useState([]);
	const getLinea = async () => {
		let response = await axios(`${serverapi}/otrosrecursos`, options);
		response = response.data.linea;
		setItemsLin(response);
		setListlin(response);
	};
	// segun la categoria q elija muestra la linea
	const getLinea2 = async param => {
		let response = await axios(`${serverapi}/otrosrecursos`, options);
		response = response.data.linea;
		const newlist = response.filter(t => {
			return t.CATEGORIA.trim() === param.trim();
		});
		// console.log(newlist);
		setItemsLin(newlist);
	};
	// hook para buscar
	const [buscarlin, setBuscarLin] = React.useState('');
	const handlesetBuscarLin = async e => {
		setBuscarLin(e.target.value);
		const str = e.target.value;
		let response = await axios(`${serverapi}/otrosrecursos`, options);
		let resultado;
		response = response.data.linea;
		const newlist = response.filter(r => {
			if (r.FAMILIA.trim() === codfam.trim()) {
				if (opfillcat === 'codigo') {
					resultado = r.CODIGO.includes(str.toLocaleUpperCase().trim());
				}
				if (opfillcat === 'nombre') {
					resultado = r.NOMBRE.includes(str.toLocaleUpperCase().trim());
				}
				if (opfillcat === 'estado') {
					resultado = r.ESTADO.includes(str.toLocaleUpperCase().trim());
				}
			}
			return resultado;
		});
		setItemsFam(newlist);
	};
	// selecciona la linea
	const onSelectLin = e => {
		// console.log(e);
		// cambiando categoria
		setCodLinea(e.row.CODIGO);
		setNomLinea(e.row.NOMBRE);
		// getFamilia2();
		setBuscarLin('');
		handleCloseLin();
	};
	// modal de proveedor
	const columnsprov = [
		{ field: 'CODIGO', headerName: 'Codigo', width: 90, headerClassName: 'columnclass' },
		{ field: 'NOMBRE', headerName: 'Nombre', width: 150, headerClassName: 'columnclass' },
		{ field: 'ESTADO', headerName: 'Estado', width: 90, headerClassName: 'columnclass' }
	];
	// pa limpiar
	const [listprov, setListprov] = React.useState([]);
	const [rowssprov, setItemsProv] = React.useState([]);
	const [openprov, setOpenProv] = React.useState(false);
	const handleOpenProv = () => setOpenProv(true);
	const handleCloseProv = () => {
		setOpenProv(false);
		setBuscarProv('');
		setItemsProv(listprov);
	};
	const getProveedor = async () => {
		let response = await axios(`${serverapi}/proveedor`, options);
		response = response.data.data;
		setItemsProv(response);
		setListprov(response);
	};
	// hook para buscar
	const [buscarprov, setBuscarProv] = React.useState('');
	const handlesetBuscarProv = async e => {
		setBuscarProv(e.target.value);
		const str = e.target.value;
		let response = await axios(`${serverapi}/proveedor`, options);
		let resultado;
		response = response.data.data;
		const newlist = response.filter(t => {
			if (opfillcat === 'codigo') {
				resultado = t.CODIGO.includes(str.toLocaleUpperCase().trim());
			}
			if (opfillcat === 'nombre') {
				resultado = t.NOMBRE.includes(str.toLocaleUpperCase().trim());
			}
			if (opfillcat === 'estado') {
				resultado = t.ESTADO.includes(str.toLocaleUpperCase().trim());
			}
			return resultado;
		});
		setItemsProv(newlist);
	};
	// selecciona la presentacion
	const onSelectProv = e => {
		// console.log(e);
		// cambiando categoria
		setCodProv(e.row.CODIGO);
		setNomProv(e.row.NOMBRE);
		// getFamilia2();
		setBuscarProv('');
		handleCloseProv();
	};
	/* HOOKS */
	// ITEM
	const [codprod, setCodProd] = React.useState('');
	const handleCodProd = e => {
		setCodProd(e.target.value);
	};
	const [nomprod, setNomProd] = React.useState('');
	const handleNomProd = e => {
		setNomProd(e.target.value);
	};
	// CATEGORIA
	const [codcat, setCodCat] = React.useState('');
	const handleCodCat = e => {
		setCodCat(e.target.value);
	};
	const [nomcat, setNomCat] = React.useState('');
	const handleNomCat = e => {
		setNomCat(e.target.value);
	};
	// FAMILIA
	const [codfam, setCodFam] = React.useState('');
	const handleCodFam = e => {
		setCodFam(e.target.value);
	};
	const [nomfam, setNomFam] = React.useState('');
	const handleNomFam = e => {
		setNomFam(e.target.value);
	};
	// LINEA
	const [codlinea, setCodLinea] = React.useState('');
	const handleCodLinea = e => {
		setCodFam(e.target.value);
	};
	const [nomlinea, setNomLinea] = React.useState('');
	const handleNomLinea = e => {
		setNomLinea(e.target.value);
	};
	// PROVEEDOR
	const [codprov, setCodProv] = React.useState('');
	const handleCodProv = e => {
		setCodProv(e.target.value);
	};
	const [nomprov, setNomProv] = React.useState('');
	const handleNomProv = e => {
		setNomProv(e.target.value);
	};
	// datos a pasar a ajustes
	data.data.opfilter = op;
	data.data.coditem = codprod;
	data.data.codcat = codcat;
	data.data.codfam = codfam;
	data.data.codlim = codlinea;
	data.data.codprov = codprov;
	//
	React.useEffect(() => {
		getProductos();
		getCategoria();
		getFamilia();
		getLinea();
		getProveedor();
	}, []);
	return (
		<>
			{/* modal linea */}
			<Modal
				open={openprod}
				onClose={handleCloseProd}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500
				}}
			>
				<Fade in={openprod}>
					<Box sx={stylemodal}>
						<div>
							<h2 style={{ margin: '1rem', fontWeight: 'bold' }}>Seleccione Item</h2>
						</div>
						<Box ml={2} mr={2}>
							<Grid container spacing={1} alignItems="center">
								<Grid item xl={3} lg={3} md={3} sm={3} xs={12}>
									<TextField
										fullWidth
										select
										size="small"
										label="Buscar por"
										variant="outlined"
										value={opfillcat}
										onChange={e => handlesetOpFillCat(e)}
									>
										<MenuItem value="codigo">Codigo</MenuItem>
										<MenuItem value="nombre">Nombre</MenuItem>
										<MenuItem value="estado">Estado</MenuItem>
									</TextField>
								</Grid>
								<Grid item xl={9} lg={9} md={9} sm={9} xs={12}>
									<TextField
										fullWidth
										size="small"
										type="text"
										label="Buscar item"
										variant="outlined"
										onChange={e => handlesetBuscarProd(e)}
										value={buscarprod}
									/>
								</Grid>
							</Grid>
						</Box>
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
								}
							}}
						>
							<div
								style={{
									padding: '2rem',
									height: '55vh',
									width: '100%'
								}}
							>
								<DataGrid
									density="compact"
									onRowClick={e => onSelectProd(e)}
									rows={rowssprod}
									columns={columnsprod}
									getRowId={rows => rows.ITEM}
								/>
							</div>
						</Box>
					</Box>
				</Fade>
			</Modal>
			{/* MODAL CATEGORIA */}
			<Modal
				open={opencat}
				onClose={handleCloseCat}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500
				}}
			>
				<Fade in={opencat}>
					<Box sx={stylemodal}>
						<div>
							<h2 style={{ margin: '1rem', fontWeight: 'bold' }}>Seleccione Categoria</h2>
						</div>
						<Box ml={2} mr={2}>
							<Grid container spacing={1} alignItems="center">
								<Grid item xl={3} lg={3} md={3} sm={3} xs={12}>
									<TextField
										fullWidth
										select
										size="small"
										label="Buscar por"
										variant="outlined"
										value={opfillcat}
										onChange={e => handlesetOpFillCat(e)}
									>
										<MenuItem value="codigo">Codigo</MenuItem>
										<MenuItem value="nombre">Nombre</MenuItem>
										<MenuItem value="estado">Estado</MenuItem>
									</TextField>
								</Grid>
								<Grid item xl={9} lg={9} md={9} sm={9} xs={12}>
									<TextField
										fullWidth
										size="small"
										type="text"
										label="Buscar categoria"
										variant="outlined"
										onChange={e => handlesetBuscarCat(e)}
										value={buscarcat}
									/>
								</Grid>
							</Grid>
						</Box>
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
								}
							}}
						>
							<div
								style={{
									padding: '2rem',
									height: '55vh',
									width: '100%'
								}}
							>
								<DataGrid
									density="compact"
									// onRowSelected={e => onSelect(e)}
									onRowClick={e => onSelectCat(e)}
									rows={rowsscat}
									columns={columnscat}
									getRowId={rows => rows.CODIGO}
								/>
							</div>
						</Box>
					</Box>
				</Fade>
			</Modal>
			{/* Familia */}
			<Modal
				open={openfam}
				onClose={handleCloseFam}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500
				}}
			>
				<Fade in={openfam}>
					<Box sx={stylemodal}>
						<div>
							<h2 style={{ margin: '1rem', fontWeight: 'bold' }}>Seleccione Familia</h2>
						</div>
						<Box ml={2} mr={2}>
							<Grid container spacing={1} alignItems="center">
								<Grid item xl={3} lg={3} md={3} sm={3} xs={12}>
									<TextField
										fullWidth
										select
										size="small"
										label="Buscar por"
										variant="outlined"
										value={opfillcat}
										onChange={e => handlesetOpFillCat(e)}
									>
										<MenuItem value="codigo">Codigo</MenuItem>
										<MenuItem value="nombre">Nombre</MenuItem>
										<MenuItem value="estado">Estado</MenuItem>
									</TextField>
								</Grid>
								<Grid item xl={9} lg={9} md={9} sm={9} xs={12}>
									<TextField
										fullWidth
										size="small"
										type="text"
										label="Buscar Familia"
										variant="outlined"
										onChange={e => handlesetBuscarFam(e)}
										value={buscarfam}
									/>
								</Grid>
							</Grid>
						</Box>
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
								}
							}}
						>
							<div
								style={{
									padding: '2rem',
									height: '55vh',
									width: '100%'
								}}
							>
								<DataGrid
									density="compact"
									onRowClick={e => onSelectFam(e)}
									// onRowSelected={e => onSelect(e)}
									rows={rowssfam}
									columns={columnsfam}
									getRowId={rows => rows.CODIGO}
								/>
							</div>
						</Box>
					</Box>
				</Fade>
			</Modal>
			{/* modal linea */}
			<Modal
				open={openlin}
				onClose={handleCloseLin}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500
				}}
			>
				<Fade in={openlin}>
					<Box sx={stylemodal}>
						<div>
							<h2 style={{ margin: '1rem', fontWeight: 'bold' }}>Seleccione Linea</h2>
						</div>
						<Box ml={2} mr={2}>
							<Grid container spacing={1} alignItems="center">
								<Grid item xl={3} lg={3} md={3} sm={3} xs={12}>
									<TextField
										fullWidth
										select
										size="small"
										label="Buscar por"
										variant="outlined"
										value={opfillcat}
										onChange={e => handlesetOpFillCat(e)}
									>
										<MenuItem value="codigo">Codigo</MenuItem>
										<MenuItem value="nombre">Nombre</MenuItem>
										<MenuItem value="estado">Estado</MenuItem>
									</TextField>
								</Grid>
								<Grid item xl={9} lg={9} md={9} sm={9} xs={12}>
									<TextField
										fullWidth
										size="small"
										type="text"
										label="Buscar Linea"
										variant="outlined"
										onChange={e => handlesetBuscarLin(e)}
										value={buscarlin}
									/>
								</Grid>
							</Grid>
						</Box>
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
								}
							}}
						>
							<div
								style={{
									padding: '2rem',
									height: '55vh',
									width: '100%'
								}}
							>
								<DataGrid
									density="compact"
									onRowClick={e => onSelectLin(e)}
									rows={rowsslim}
									columns={columnslim}
									getRowId={rows => rows.CODIGO}
								/>
							</div>
						</Box>
					</Box>
				</Fade>
			</Modal>
			{/* Modal proveedor */}
			<Modal
				open={openprov}
				onClose={handleCloseProv}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500
				}}
			>
				<Fade in={openprov}>
					<Box sx={stylemodal}>
						<div>
							<h2 style={{ margin: '1rem', fontWeight: 'bold' }}>Seleccione Presentacion</h2>
						</div>
						<Box ml={2} mr={2}>
							<Grid container spacing={1} alignItems="center">
								<Grid item xl={3} lg={3} md={3} sm={3} xs={12}>
									<TextField
										fullWidth
										select
										size="small"
										label="Buscar por"
										variant="outlined"
										value={opfillcat}
										onChange={e => handlesetOpFillCat(e)}
									>
										<MenuItem value="codigo">Codigo</MenuItem>
										<MenuItem value="nombre">Nombre</MenuItem>
										<MenuItem value="estado">Estado</MenuItem>
									</TextField>
								</Grid>
								<Grid item xl={9} lg={9} md={9} sm={9} xs={12}>
									<TextField
										fullWidth
										size="small"
										type="text"
										label="Buscar Proveedor"
										variant="outlined"
										onChange={e => handlesetBuscarProv(e)}
										value={buscarprov}
									/>
								</Grid>
							</Grid>
						</Box>
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
								}
							}}
						>
							<div
								style={{
									padding: '2rem',
									height: '55vh',
									width: '100%'
								}}
							>
								<DataGrid
									density="compact"
									onRowClick={e => onSelectProv(e)}
									rows={rowssprov}
									columns={columnsprov}
									getRowId={rows => rows.CODIGO}
								/>
							</div>
						</Box>
					</Box>
				</Fade>
			</Modal>
			<Box>
				<Grid container spacing={1} alignItems="center">
					<Grid container item xl={6} lg={6} md={12} sm={12} xs={12} spacing={1}>
						<Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
							<InputLabel> Opciones </InputLabel>
						</Grid>
						<Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
							<TextField
								fullWidth
								select
								size="small"
								variant="outlined"
								// sx={{ fontSize: '5rem' }}
								value={op}
								label="Cambiar"
								onChange={handleChange}
							>
								<MenuItem value="item">Item</MenuItem>
								<MenuItem value="grupo">Grupo</MenuItem>
								<MenuItem value="itemprov">Item del proveedor</MenuItem>
							</TextField>
						</Grid>
					</Grid>

					{/* Item */}
					<Grid container item xl={6} lg={6} md={12} sm={12} xs={12} spacing={1}>
						<Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
							<InputLabel> Item </InputLabel>
						</Grid>
						<Grid item container xl={12} lg={12} md={12} sm={12} xs={12} spacing={1}>
							<Grid item xl={3} lg={3} md={3} sm={3} xs={12}>
								<TextField
									size="small"
									fullWidth
									variant="outlined"
									value={codprod}
									onChange={e => {
										handleCodProd(e);
									}}
									label="Codigo"
									InputProps={{
										readOnly: true,
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													onClick={handleOpenProd}
													size="small"
													disabled={op !== 'item'}
												>
													<SearchOutlined />
												</IconButton>
											</InputAdornment>
										)
									}}
									InputLabelProps={{
										shrink: true
									}}
								/>
							</Grid>
							<Grid item xl={9} lg={9} md={9} sm={9} xs={12}>
								<TextField
									fullWidth
									size="small"
									variant="outlined"
									value={nomprod}
									onChange={e => {
										handleNomProd(e);
									}}
									label="Nombre"
									InputProps={{
										readOnly: true
									}}
									InputLabelProps={{
										shrink: true
									}}
								/>
							</Grid>
						</Grid>
					</Grid>

					{/* Categoria */}
					<Grid container item xl={6} lg={6} md={12} sm={12} xs={12} spacing={1}>
						<Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
							<InputLabel> Categoria </InputLabel>
						</Grid>
						<Grid item container xl={12} lg={12} md={12} sm={12} xs={12} spacing={1}>
							<Grid item xl={3} lg={3} md={3} sm={3} xs={12}>
								<FormControl fullWidth>
									<TextField
										size="small"
										variant="outlined"
										// sx={{ fontSize: '2.5rem' }}
										label="Codigo"
										onChange={e => handleCodCat(e)}
										value={codcat}
										InputProps={{
											readOnly: true,
											endAdornment: (
												<InputAdornment position="end">
													<IconButton
														onClick={handleOpenCat}
														size="small"
														disabled={op !== 'grupo'}
													>
														<SearchOutlined />
													</IconButton>
												</InputAdornment>
											)
										}}
										InputLabelProps={{
											shrink: true
										}}
									/>
								</FormControl>
							</Grid>
							<Grid item xl={9} lg={9} md={9} sm={9} xs={12}>
								<FormControl fullWidth>
									<TextField
										size="small"
										variant="outlined"
										onChange={e => handleNomCat(e)}
										value={nomcat}
										label="Nombre"
										InputProps={{
											readOnly: true
										}}
										InputLabelProps={{
											shrink: true
										}}
									/>
								</FormControl>
							</Grid>
						</Grid>
					</Grid>

					{/* Familia */}
					<Grid container item xl={6} lg={6} md={12} sm={12} xs={12} spacing={1}>
						<Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
							<InputLabel> Familia </InputLabel>
						</Grid>
						<Grid item container xl={12} lg={12} md={12} sm={12} xs={12} spacing={1}>
							<Grid item xl={3} lg={3} md={3} sm={3} xs={12}>
								<FormControl fullWidth>
									<TextField
										size="small"
										variant="outlined"
										label="Codigo"
										onChange={e => handleCodFam(e)}
										value={codfam}
										InputProps={{
											readOnly: true,
											endAdornment: (
												<InputAdornment position="end">
													<IconButton
														onClick={handleOpenFam}
														size="small"
														disabled={op !== 'grupo'}
													>
														<SearchOutlined />
													</IconButton>
												</InputAdornment>
											)
										}}
										InputLabelProps={{
											shrink: true
										}}
									/>
								</FormControl>
							</Grid>
							<Grid item xl={9} lg={9} md={9} sm={9} xs={12}>
								<FormControl fullWidth>
									<TextField
										size="small"
										variant="outlined"
										// sx={{ fontSize: '2.5rem' }}
										label="Nombre"
										onChange={e => handleNomFam(e)}
										value={nomfam}
										InputProps={{
											readOnly: true
										}}
										InputLabelProps={{
											shrink: true
										}}
									/>
								</FormControl>
							</Grid>
						</Grid>
					</Grid>

					{/* Linea */}
					<Grid container item xl={6} lg={6} md={12} sm={12} xs={12} spacing={1}>
						<Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
							<InputLabel> Linea </InputLabel>
						</Grid>
						<Grid item container xl={12} lg={12} md={12} sm={12} xs={12} spacing={1}>
							<Grid item xl={3} lg={3} md={3} sm={3} xs={12}>
								<FormControl fullWidth>
									<TextField
										size="small"
										variant="outlined"
										onChange={e => handleCodLinea(e)}
										value={codlinea}
										label="Codigo"
										InputProps={{
											readOnly: true,
											endAdornment: (
												<InputAdornment position="end">
													<IconButton
														onClick={handleOpenLin}
														size="small"
														disabled={op !== 'grupo'}
													>
														<SearchOutlined />
													</IconButton>
												</InputAdornment>
											)
										}}
										InputLabelProps={{
											shrink: true
										}}
									/>
								</FormControl>
							</Grid>
							<Grid item xl={9} lg={9} md={9} sm={9} xs={12}>
								<FormControl fullWidth>
									<TextField
										size="small"
										variant="outlined"
										onChange={e => handleNomLinea(e)}
										value={nomlinea}
										label="Nombre"
										InputProps={{
											readOnly: true
										}}
										InputLabelProps={{
											shrink: true
										}}
									/>
								</FormControl>
							</Grid>
						</Grid>
					</Grid>

					{/* Item del Proveedor */}
					<Grid container item xl={6} lg={6} md={12} sm={12} xs={12} spacing={1}>
						<Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
							<InputLabel> Proveedor </InputLabel>
						</Grid>
						<Grid item container xl={12} lg={12} md={12} sm={12} xs={12} spacing={1}>
							<Grid item xl={3} lg={3} md={3} sm={3} xs={12}>
								<FormControl fullWidth>
									<TextField
										size="small"
										variant="outlined"
										onChange={e => handleCodProv(e)}
										value={codprov}
										label="Codigo"
										InputProps={{
											readOnly: true,
											endAdornment: (
												<InputAdornment position="end">
													<IconButton
														onClick={handleOpenProv}
														size="small"
														disabled={op !== 'itemprov'}
													>
														<SearchOutlined />
													</IconButton>
												</InputAdornment>
											)
										}}
										InputLabelProps={{
											shrink: true
										}}
									/>
								</FormControl>
							</Grid>
							<Grid item xl={9} lg={9} md={9} sm={9} xs={12}>
								<TextField
									fullWidth
									size="small"
									variant="outlined"
									onChange={e => handleNomProv(e)}
									value={nomprov}
									label="Nombre"
									InputProps={{
										readOnly: true
									}}
									InputLabelProps={{
										shrink: true
									}}
								/>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Box>
		</>
	);
}
