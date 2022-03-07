import { useEffect, useState } from 'react';
import axios from 'axios';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import XLSX from 'xlsx';
import { InsertDriveFile, ExpandMore, SearchOutlined } from '@material-ui/icons';
import { showMessage } from 'app/store/fuse/messageSlice';
import { useDispatch } from 'react-redux';
import { IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const {
	makeStyles,
	Grid,
	Typography,
	Button,
	CircularProgress,
	TextField,
	Checkbox,
	InputAdornment
} = require('@material-ui/core');

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '50%',
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4
};
const columnsGeneral = [
	{ field: 'item', headerName: 'Item', width: 120, headerClassName: 'super-app-theme--header' },
	{ field: 'nombre', headerName: 'Nombre', width: 270, headerClassName: 'super-app-theme--header' },
	{ field: 'caja', headerName: 'Caja', width: 120, headerClassName: 'super-app-theme--header' },
	{ field: 'unidad', headerName: 'Unidad', width: 120, headerClassName: 'super-app-theme--header' },
	{ field: 'factor', headerName: 'Factor', width: 120, headerClassName: 'super-app-theme--header' },
	{ field: 'totalunidad', headerName: 'Total Unidad', width: 150, headerClassName: 'super-app-theme--header' },
	{ field: 'costou', headerName: 'Costo U', width: 130, headerClassName: 'super-app-theme--header' },
	{ field: 'totalcosto', headerName: 'Total Costo', width: 150, headerClassName: 'super-app-theme--header' },
	{ field: 'iva', headerName: 'Iva', width: 90, headerClassName: 'super-app-theme--header' }
];

const formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 2
});
const columnsItema = [
	{ field: 'ITEM', headerName: 'Item', Width: 110, headerClassName: 'super-app-theme--header' },
	{ field: 'NOMBRE', headerName: 'Nombre', width: 150, headerClassName: 'super-app-theme--header' },
	{ field: 'ESTADO', headerName: 'Estado', width: 250, headerClassName: 'super-app-theme--header' }
];
let _listaItems = [];
let _listaEmpresas = [];
let _datosdeexcel = [];
const serverapi = process.env.REACT_APP_SERVERAPI;
function HeaderInfInventario() {
	let i = 1;
	const dispatch = useDispatch();
	// items
	const [openItems, setopenItems] = useState(false);
	const handleopenItems = () => setopenItems(true);
	const handleCloseItems = () => setopenItems(false);

	// MODAL DE CARGANDO
	const [open1, setOpen1] = useState(false);
	const handleOpen1 = () => setOpen1(true);
	const handleClose1 = () => setOpen1(false);

	const [queitemes, setqueitemes] = useState(1);
	const [valitemdesde, setvalitemdesde] = useState({ codigo: 'Cargando...', nombre: 'Cargando...' });
	const [valitemhasta, setvalitemhasta] = useState({ codigo: 'Cargando...', nombre: 'Cargando...' });
	const [valTipoIva, setvalTipoIva] = useState(30);
	const [valTipoEstado, setvalTipoEstado] = useState(30);
	const [valBuscItem, settipoBuscItem] = useState(10);
	const [valBuscItemText, setBuscItemText] = useState('');

	// variable para buscqueda y tablas de saldo a cliente
	const [valtableinforme, setvaltableinforme] = useState([
		{
			ID: 0,
			item: '',
			nombre: '',
			caja: '',
			unidad: '',
			factor: '',
			totalunidad: '',
			costou: '',
			totalcosto: '',
			iva: ''
		}
	]);

	const [valtableItem, setvaltableItem] = useState([]);
	// Variable de chechbox
	const [todasEmpresas, setContodasEmpresas] = useState(false);
	const [muestracosto, setmuestracosto] = useState(false);
	const [constock, setconstock] = useState(false);
	const [valTipoEmpresa, setvalTipoEmpresa] = useState([{ ID: 30, NOMBRE: 'TODOS' }]);
	const [validEmpresa, setvalvalidEmpresa] = useState('');

	const handleChangeItem = event => {
		let result = [];
		settipoBuscItem(event.target.value);
		if (event.target.value === 10) {
			// nombre
			result = _listaItems.filter(val => val.NOMBRE.includes(valBuscItemText.toUpperCase()));
		} else {
			// codigo
			result = _listaItems.filter(val => val.ITEM.includes(valBuscItemText.toUpperCase()));
		}
		setvaltableItem(result);
	};
	const handleChangeChkEmpresa = event => {
		setContodasEmpresas(event.target.checked);
		setvaltableinforme([]);
	};
	const handleChangeChkMuestraCosto = event => {
		setmuestracosto(event.target.checked);
		setvaltableinforme([]);
	};
	const handleChangeChkConStock = event => {
		setconstock(event.target.checked);
		setvaltableinforme([]);
	};
	const handleChangeValTipoIva = event => {
		setvalTipoIva(event.target.value);
		setvaltableinforme([]);
	};
	const handleChangeValTipoEmpresa = event => {
		setvaltableinforme([]);
		setvalvalidEmpresa(event.target.value);
		// getSearchData(event.target.value);
	};

	const handleChangeValEstado = event => {
		setvaltableinforme([]);
		setvalTipoEstado(event.target.value);
	};

	const buscarItems = event => {
		let result = [];
		setBuscItemText(event.target.value);
		if (valBuscItem === 10) {
			// nombre
			result = _listaItems.filter(val => val.NOMBRE.includes(event.target.value.toUpperCase()));
		} else {
			// codigo
			result = _listaItems.filter(val => val.ITEM.includes(event.target.value.toUpperCase()));
		}
		setvaltableItem(result);
	};

	const useStyles = makeStyles({
		root: {
			flexGrow: 1,
			backgroundColor: 'transparent'
		},

		rootc: {
			textAlign: 'left',
			backgroundColor: ' transparent'
			// width:'50%',
			// height:'50%'
		},
		rootcli: {
			textAlign: 'left',
			backgroundColor: ' transparent'
		},
		titulo: {
			fonWeight: 'bold',
			fontSize: 15
		},
		datetextfield: {
			padding: '10px 2px 5px 2px',
			width: '100%'
		},
		dateclientefield: {
			flexGrow: 2
		},
		datacliecontent: {
			padding: '10px 2px 5px 2px'
		},

		datachkitem: {
			padding: '1px 2px 5px 2px'
		},
		tabla: {
			padding: '12px 1px 1px 1px'
		}
	});

	// datos que se cargan a iniciar la pantalla
	useEffect(() => {
		async function obtenerInformacion() {
			const urlFinal = `${serverapi}/items`;
			await axios.get(urlFinal).then(res => {
				_listaItems = res.data.items;
				_listaEmpresas = res.data.empresas;
				const totalItems = _listaItems.length;
				setvaltableItem(_listaItems);
				setvalitemdesde({ codigo: _listaItems[0].ITEM, nombre: _listaItems[0].NOMBRE });
				setvalitemhasta({
					codigo: _listaItems[totalItems - 1].ITEM,
					nombre: _listaItems[totalItems - 1].NOMBRE
				});
				_listaEmpresas.push({ ID: 30, NOMBRE: 'TODOS', RUC: '' });
				setvalTipoEmpresa(_listaEmpresas);
				setvalvalidEmpresa(_listaEmpresas[0].ID);
			});
		}
		obtenerInformacion();
	}, []);
	// metodo buscar informacion y aplicar filtro
	function callBuscar() {
		const _dataLista = [];
		const _dataListafinal = [];
		const options = { headers: { 'Access-Control-Allow-Origin': '*' } };
		if (valitemdesde.codigo > valitemhasta.codigo) {
			dispatch(
				showMessage({
					message: `El codigo desde del Item debe ser menor o igual al codigo hasta`,
					variant: 'error',
					autoHideDuration: 5000,
					anchorOrigin: {
						vertical: 'top', // top bottom
						horizontal: 'center' // left center right
					}
				})
			);
		}
		handleOpen1();
		const urlFinal = `${serverapi}/infproductostock`;
		let _valorestado = 'A';
		if (valTipoEstado === 20) {
			_valorestado = 'I';
		}
		try {
			axios
				.post(
					urlFinal,
					{
						empresa: validEmpresa,
						codempresa: validEmpresa,
						coniva: valTipoIva,
						constocks: constock,
						itemdesde: valitemdesde.codigo,
						itemhasta: valitemhasta.codigo
					},
					options
				)
				.then(res => {
					res.data.forEach(element => {
						Object.keys(element).forEach(key => {
							const _datacli = element[key];
							Object.values(_datacli).forEach(val => {
								// aki hacer la validacion dwel estado
								if (valTipoEstado === 30) {
									_dataLista.push(val);
								} else if (val.ESTADO === _valorestado) {
									_dataLista.push(val);
								}
							});
						});
					});
					const result = _dataLista.reduce((r, a) => {
						r[a.ITEM] = r[a.ITEM] || [];
						r[a.ITEM].push(a);
						return r;
					}, Object.create(null));

					Object.keys(result).forEach(key => {
						const _datacli = result[key];
						i += 1;
						let _calculaUni = 0;
						let _calculaCajas = 0;
						let _totalstock = 0;
						let _cantifinal = 0;
						let _valnombre = '';
						let _valfactor = 1;
						let _valiva = 'S';
						let _valcosto = 0;
						Object.values(_datacli).forEach(val => {
							_totalstock += parseFloat(val.STOCK);
							_valnombre = val.NOMBRE;
							_valfactor = parseFloat(val.FACTOR);
							_valcosto = parseFloat(val.COSTOP);
							_valiva = val.IVA;
						});
						_calculaCajas = _totalstock / parseFloat(_valfactor);
						const _cajaxfactor = Math.floor(_calculaCajas) * parseFloat(_valfactor);
						_cantifinal = _totalstock - _cajaxfactor;
						_calculaUni = _cantifinal;
						if (_calculaCajas < 1) {
							_calculaUni = _totalstock;
							_calculaCajas = 0;
						}
						const _valtotlcosto = _totalstock * _valcosto;
						const _agregaritem = {
							ID: i,
							item: key,
							nombre: _valnombre,
							caja: Math.floor(_calculaCajas),
							unidad: _calculaUni,
							factor: _valfactor,
							totalunidad: _totalstock,
							costou: muestracosto ? formatter.format(_valcosto) : '',
							totalcosto: muestracosto ? formatter.format(_valtotlcosto) : '',
							iva: _valiva
						};

						_dataListafinal.push(_agregaritem);
					});

					_datosdeexcel = _dataListafinal;
					setvaltableinforme(_dataListafinal);
					handleClose1();
				})
				.catch(erro => {
					handleClose1();
				});
		} catch (error) {
			handleClose1();
		}
	}
	function limpiar() {
		setvaltableinforme([]);
		setvalitemdesde({ codigo: _listaItems[0].ITEM, nombre: _listaItems[0].NOMBRE });
		const totalItems = _listaItems.length;
		setvalitemhasta({
			codigo: _listaItems[totalItems - 1].ITEM,
			nombre: _listaItems[totalItems - 1].NOMBRE
		});
		setmuestracosto(false);
		setconstock(false);
		setvalTipoIva(30);
		setvalTipoEstado(30);
		setBuscItemText('');
		setvaltableItem(_listaItems);
	}
	function callExportExcel() {
		const workSeet = XLSX.utils.json_to_sheet(_datosdeexcel);
		const workBook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workBook, workSeet, 'Informe');
		XLSX.write(workBook, { bookType: 'xlsx', type: 'binary' });
		XLSX.writeFile(workBook, `infinventario.xlsx`);
	}
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Accordion style={{ margin: '1rem' }} elevation={3} sx={{ borderRadius: '0.5rem' }} defaultExpanded>
				<AccordionSummary
					expandIcon={<ExpandMore style={{ color: 'white' }} />}
					aria-controls="panel1a-content"
					id="panel1a-header"
					sx={{ bgcolor: '#3543d0', color: 'white', borderRadius: '0.5rem' }}
				>
					<Typography sx={{ fontSize: '1.5rem' }}>Busqueda</Typography>
				</AccordionSummary>
				<AccordionDetails sx={{ borderRadius: '0.5rem' }}>
					<Grid container spacing={1}>
						<Grid item xs={12} md={4} lg={4} xl={4}>
							<div className={classes.rootcli}>
								<Typography className={classes.titulo}>Item</Typography>
								<div className={classes.datacliecontent}>
									<div className={classes.dateclientefield}>
										<TextField
											variant="outlined"
											label="Desde"
											size="small"
											value={valitemdesde.codigo}
											onChange={newValue => {
												setvalitemdesde({ codigo: newValue });
											}}
											InputProps={{
												readOnly: true,
												endAdornment: (
													<InputAdornment position="end">
														<IconButton
															onClick={() => {
																setBuscItemText('');
																setvaltableItem(_listaItems);
																setqueitemes(1);
																handleopenItems();
															}}
															size="small"
														>
															<SearchOutlined />
														</IconButton>
													</InputAdornment>
												)
											}}
											style={{ width: '30%' }}
										/>
										<TextField
											variant="outlined"
											InputProps={{
												readOnly: true
											}}
											value={valitemdesde.nombre}
											size="small"
											style={{ width: '70%' }}
											onChange={newValue => {
												setvalitemdesde({ nombre: newValue });
											}}
										/>
									</div>
								</div>
								<div className={classes.datacliecontent}>
									<div className={classes.dateclientefield}>
										<TextField
											variant="outlined"
											label="Hasta"
											value={valitemhasta.codigo}
											InputProps={{
												readOnly: true,
												endAdornment: (
													<InputAdornment position="end">
														<IconButton
															onClick={() => {
																setBuscItemText('');
																setvaltableItem(_listaItems);
																setqueitemes(2);
																handleopenItems();
															}}
															size="small"
														>
															<SearchOutlined />
														</IconButton>
													</InputAdornment>
												)
											}}
											size="small"
											onChange={newValue => {
												setvalitemhasta({ codigo: newValue });
											}}
											style={{ width: '30%' }}
										/>
										<TextField
											variant="outlined"
											value={valitemhasta.nombre}
											InputProps={{
												readOnly: true
											}}
											size="small"
											onChange={newValue => {
												setvalitemhasta({ nombre: newValue });
											}}
											style={{ width: '70%' }}
										/>
									</div>
								</div>
							</div>
						</Grid>
						<Grid item xs={12} md={4} lg={4} xl={4}>
							<div className={classes.rootcli}>
								<Typography className={classes.titulo}>Empresa</Typography>
								<div className={classes.datacliecontent}>
									<FormControl sx={{ m: 1, minWidth: 350 }}>
										<Select
											className="bg-white"
											labelId="demo-simple-select-label"
											id="demo-simple-select"
											value={validEmpresa}
											size="small"
											onChange={handleChangeValTipoEmpresa}
										>
											{valTipoEmpresa.map(rows => (
												<MenuItem key={rows.ID} value={rows.ID}>
													{rows.NOMBRE}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</div>
							</div>
						</Grid>

						<Grid item xs={12} md={2} lg={2} xl={2}>
							<div className={classes.rootcli}>
								<Typography className={classes.titulo}>Filtros</Typography>
								<div className={classes.datacliecontent}>
									<div className={classes.dateclientefield}>
										{/* <FormControl fullWidth> */}
										<FormControl fullWidth>
											<Select
												labelId="demo-simple-select-label"
												id="demo-simple-select"
												value={valTipoIva}
												size="small"
												onChange={handleChangeValTipoIva}
											>
												<MenuItem value={10}>Con Iva</MenuItem>
												<MenuItem value={20}>Sin Iva</MenuItem>
												<MenuItem value={30}>Todos</MenuItem>
											</Select>
										</FormControl>
									</div>
								</div>
								<div className={classes.datacliecontent}>
									<div className={classes.dateclientefield}>
										<FormControl fullWidth>
											<Select
												labelId="demo-simple-select-label"
												id="demo-simple-select"
												value={valTipoEstado}
												size="small"
												onChange={handleChangeValEstado}
											>
												<MenuItem value={10}>Activo</MenuItem>
												<MenuItem value={20}>Inactivo</MenuItem>
												<MenuItem value={30}>Todos</MenuItem>
											</Select>
										</FormControl>
									</div>
								</div>
							</div>
						</Grid>
						<Grid item xs={12} md={2} lg={2} xl={2}>
							<div className={classes.rootcli}>
								<Typography className={classes.titulo}>Otros Filtros</Typography>
								<div className={classes.datacliecontent}>
									<FormControlLabel
										//	style={{ color: 'red' }}
										control={
											<Checkbox checked={muestracosto} onChange={handleChangeChkMuestraCosto} />
										}
										label="Mostrar Costo"
									/>
								</div>
								<div className={classes.datachkitem}>
									<FormControlLabel
										//	style={{ color: 'red' }}
										control={<Checkbox checked={constock} onChange={handleChangeChkConStock} />}
										label="Solo Item con stock"
									/>
								</div>
							</div>
						</Grid>
						<Stack padding={1} spacing={1} direction="row">
							<Button variant="contained" color="primary" onClick={() => callBuscar()}>
								Buscar
							</Button>
							<Button variant="contained" color="inherit" onClick={() => limpiar()}>
								Limpiar
							</Button>
						</Stack>
					</Grid>
				</AccordionDetails>
			</Accordion>
			<Accordion style={{ margin: '1rem' }} elevation={3} sx={{ borderRadius: '0.5rem' }} defaultExpanded>
				<AccordionSummary
					expandIcon={<ExpandMore style={{ color: 'white' }} />}
					aria-controls="panel1a-content"
					id="panel1a-header"
					sx={{ bgcolor: '#3543d0', color: 'white', borderRadius: '0.5rem' }}
				>
					<Typography sx={{ fontSize: '1.5rem' }}>Informe</Typography>
				</AccordionSummary>
				<AccordionDetails sx={{ borderRadius: '0.5rem' }}>
					<Stack padding={1} spacing={1} direction="row">
						<Button
							variant="outlined"
							style={{ color: '#1f6e43', border: '1px solid #1f6e43', maxWidth: '120px' }}
							onClick={() => callExportExcel()}
							startIcon={<InsertDriveFile />}
						>
							Excel
						</Button>
						{/* <Button
							variant="outlined"
							style={{ color: '#F74C41', border: '1px solid #F74C41', maxWidth: '120px' }}
							onClick={() => callExportExcel()}
							startIcon={<InsertDriveFile />}
						>
							Pdf
						</Button> */}
					</Stack>
					<Box
						sx={{
							height: '70vh',
							'& .super-app-theme--header': {
								backgroundColor: '#FFFFFF',
								color: '#000000',
								fontFamily: 'Arial Black',
								borderRadius: '0.5rem'
								// fontSize: 12
							}
						}}
					>
						<DataGrid
							sx={{
								boxShadow: 2,
								borderRadius: 5
							}}
							rows={valtableinforme}
							columns={columnsGeneral}
							disableSelectionOnClick
							getRowId={rows => rows.ID}
							hideFooterSelectedRowCount
							density="compact"
							disableColumnSelector
						/>
					</Box>
				</AccordionDetails>
			</Accordion>
			<Modal
				open={open1}
				onClose={handleClose1}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box
					mx="auto"
					style={{
						display: 'flex',
						position: 'absolute',
						margin: 'auto',
						backgroundColor: 'black',
						opacity: '50%',
						width: '100vw',
						height: '100vh',
						zIndex: 'auto',
						justifyContent: 'center'
					}}
				>
					<Box mx="auto" marginTop="25rem">
						<Box mx="auto">
							<CircularProgress style={{ color: '#2196F3' }} />
						</Box>
					</Box>
				</Box>
			</Modal>
			<Modal
				open={openItems}
				onClose={handleCloseItems}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				disableEnforceFocus
			>
				<Box sx={style}>
					<div>
						<h4>Busquedad de Items</h4>

						<Grid container spacing={1}>
							<Grid item xs={12} md={4} lg={4} xl={4}>
								<FormControl fullWidth>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										size="small"
										value={valBuscItem}
										onChange={handleChangeItem}
									>
										<MenuItem value={10}>Nombre</MenuItem>
										<MenuItem value={30}>Codigo</MenuItem>
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={12} md={8} lg={8} xl={8}>
								<TextField
									variant="outlined"
									label=""
									value={valBuscItemText}
									// style={{ width: '70%' }}
									fullWidth
									onChange={buscarItems}
									size="small"
								/>
							</Grid>
						</Grid>
					</div>

					<Box
						sx={{
							height: '50vh',
							'& .super-app-theme--header': {
								backgroundColor: '#FFFFFF',
								color: '#000000',
								fontFamily: 'Arial Black',
								borderRadius: '0.5rem'
								// fontSize: 12
							}
						}}
					>
						<DataGrid
							sx={{
								boxShadow: 2,
								borderRadius: 5
							}}
							onCellClick={(params, event) => {
								if (queitemes === 1) {
									setvalitemdesde({ codigo: params.row.ITEM, nombre: params.row.NOMBRE });
								} else {
									setvalitemhasta({ codigo: params.row.ITEM, nombre: params.row.NOMBRE });
								}
								handleCloseItems();
							}}
							rows={valtableItem}
							columns={columnsItema}
							getRowId={rows => rows.ITEM}
						/>
					</Box>
				</Box>
			</Modal>
		</div>
	);
}

export default HeaderInfInventario;
