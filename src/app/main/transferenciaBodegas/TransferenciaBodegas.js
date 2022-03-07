import * as React from 'react';
import ReactDOM from 'react-dom';
import { PDFViewer, ReactPDF } from '@react-pdf/renderer';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Grid, Button, ButtonGroup, InputAdornment, IconButton, Modal, Fade, Backdrop } from '@material-ui/core';
import { showMessage } from 'app/store/fuse/messageSlice';
import { useDispatch } from 'react-redux';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { DataGrid, GridToolbarContainer, GridToolbarExport, gridClasses } from '@mui/x-data-grid';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import PropTypes from 'prop-types';
import { ExpandMore, SearchOutlined } from '@material-ui/icons';
import Typography from '@mui/material/Typography';
import { printExcel } from 'app/main/comdistrib/styles';
import SendIcon from '@mui/icons-material/Send';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { m } from 'framer-motion';
import { esES } from '@mui/material/locale';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import esEsLocale from './esEsLocale';
import ReportTable from './ReportTableComponent';

const { makeStyles, CircularProgress, TextField, Checkbox } = require('@material-ui/core');

const serverapi = process.env.REACT_APP_SERVERAPI;
const serverapi2 = process.env.REACT_APP_SERVERAPI2;

// localStorage.setItem('serverAPI', serverapi);
// localStorage.setItem('serverAPI2', serverapi2);

function TransferenciaBodegas() {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [TodasEmpresas, setTodasEmpresas] = useState({ NOMBRE: 'Cargando', CONEXION: '-', BODFAC: '10' });
	const [EmpresaOrigen, setEmpresaOrigen] = useState({ NOMBRE: 'Cargando', CONEXION: '-', BODFAC: '10' });
	const [EmpresaDestino, setEmpresaDestino] = useState({ NOMBRE: 'Cargando', CONEXION: '-', BODFAC: '10' });
	const [ItemSelected, setItemSelected] = useState({ CODIGO: '-', NOMBRE: '--', STOCK: 0, PRECIO1: 0 });
	const [motivos, setMotivos] = useState({ NOMBRE: '--', CODIGO: '--' });
	const [motivoSelected, setMotivoSelected] = useState({ NOMBRE: '--', CODIGO: '--' });
	const [openModal, setOpenModal] = useState(false);
	const [disableOrigen, setDisableOrigen] = useState(false);
	const handleOpenProd = () => setOpenModal(true);
	const handleCloseProd = () => setOpenModal(false);
	const [dialogoOpen, setdialogoOpen] = useState(false);
	const handleCloseDialogo = () => setdialogoOpen(false);
	const [verPdf, setVerPdf] = useState(false);
	const [mensajeOpe, setMensajeOpe] = useState('');
	const columnsProducto = [
		{ field: 'CODIGO', headerName: 'Codigo', width: 90, headerClassName: 'columnclass' },
		{ field: 'NOMBRE', headerName: 'Nombre', width: 250, headerClassName: 'columnclass' },
		{ field: 'STOCK', headerName: 'Stock', width: 90, headerClassName: 'columnclass' }
	];
	const [rowProducto, setrowProducto] = useState([
		{ key: '--f', CODIGO: 0, ITEM: '---', NOMBRE: '---', STOCK: 0, PRECIO1: 0 }
	]);

	const [rowProductoModal, setProductoModal] = useState([
		{ key: '--f', CODIGO: 0, ITEM: '---', NOMBRE: '---', STOCK: 0, PRECIO1: 0 }
	]);
	const [cantidad, setCantidad] = useState(0);
	const [btnProcesar, setBtnProcesar] = useState(true);
	const [rowPrint, setrowPrint] = useState([]);

	const colPrint = [
		{
			field: 'CODIGO',
			headerName: 'CODIGO',
			width: 100,
			editable: false,
			headerClassName: 'boldHeader'
		},
		{
			field: 'NOMBRE',
			headerName: 'NOMBRE',
			width: 190,
			editable: false,
			headerClassName: 'boldHeader'
		},
		{
			field: 'CANTIDAD',
			headerName: 'CANTIDAD',
			width: 100,
			editable: false,
			headerClassName: 'boldHeader'
		},
		{
			field: 'ORIGEN',
			headerName: 'ORIGEN',
			width: 150,
			editable: false,
			headerClassName: 'boldHeader'
		},
		{
			field: 'DESTINO',
			headerName: 'DESTINO',
			width: 150,
			editable: false,
			headerClassName: 'boldHeader'
		}
	];

	const onSelectProd = e => {
		setItemSelected({
			CODIGO: e.row.ITEM,
			NOMBRE: e.row.NOMBRE,
			STOCK: Math.trunc(e.row.STOCK),
			PRECIO1: e.row.PRECIO1
		});
		handleCloseProd();
		setmodalText('');
		setSearchMode('nombre');
	};

	const [modalSearchMode, setSearchMode] = useState('nombre');
	const [modalText, setmodalText] = useState('');

	const handleModalSearch = e => {
		setSearchMode(e.target.value);
		if (modalText.trim() !== '') {
			const PATTERN = `${modalText.toUpperCase()}`;
			if (e.target.value === 'nombre' && PATTERN !== '') {
				const itemfiltrado = rowProducto.filter(el => {
					return el.NOMBRE.includes(PATTERN);
				});
				setProductoModal(itemfiltrado);
			} else if (e.target.value === 'codigo' && PATTERN !== '') {
				const itemfiltrado = rowProducto.filter(el => {
					return el.ITEM.includes(PATTERN);
				});
				setProductoModal(itemfiltrado);
			} else if (e.target.value === 'codbarra' && PATTERN !== '') {
				const itemfiltrado = rowProducto.filter(el => {
					return el.NOMBRE.includes(PATTERN);
				});
				setProductoModal(itemfiltrado);
			} else {
				setProductoModal(rowProducto);
			}
		}
	};

	const onKeyPressBarcode = event => {
		if (event.keyCode === 13) {
			handleFilterModal(event.target.value);
		}
	};
	const handleFilterModal = string => {
		const PATTERN = `${string.toUpperCase()}`;
		// console.log(modalSearchMode);
		if (modalSearchMode === 'nombre' && PATTERN !== '') {
			const itemfiltrado = rowProducto.filter(el => {
				return el.NOMBRE.includes(PATTERN);
			});
			setProductoModal(itemfiltrado);
		} else if (modalSearchMode === 'codigo' && PATTERN !== '') {
			const itemfiltrado = rowProducto.filter(el => {
				return el.ITEM.includes(PATTERN);
			});
			setProductoModal(itemfiltrado);
		} else if (modalSearchMode === 'codbarra' && PATTERN !== '') {
			const itemfiltrado = rowProducto.filter(el => {
				return el.NOMBRE.includes(PATTERN);
			});
			setProductoModal(itemfiltrado);
		} else {
			setProductoModal(rowProducto);
		}
	};

	const handleChangeMotivo = e => {
		console.log(e.target.key);
		// setMotivoSelected({ key: e.target.CODIGO, NOMBRE: e.target.NOMBRE, CODIGO: e.target.CODIGO });
	};

	function NewlineText(text) {
		// eslint-disable-next-line prefer-destructuring
		return text.split('\n').map(str => <Typography sx={{ fontSize: '1.3rem' }}> {str} </Typography>);
	}

	const theme = createTheme(
		{
			palette: {}
		},
		esES
	);

	function CustomToolbar2() {
		return (
			<GridToolbarContainer className={gridClasses.toolbarContainer}>
				<GridToolbarExport
					style={{ fontSize: '1.5rem' }}
					printOptions={{
						hideFooter: true,
						hideToolbar: true,
						fields: ['CODIGO', 'NOMBRE', 'CANTIDAD', 'ORIGEN', 'DESTINO']
					}}
				/>
			</GridToolbarContainer>
		);
	}

	const stylemodal = {
		borderRadius: '1rem',
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: { xs: '90%', sm: '90%', md: '90%', lg: '45%' },
		height: '75vh',
		bgcolor: 'background.paper',
		boxShadow: 24
	};

	const [postData, setPostData] = useState({
		motivo: '',
		operador: 'ADM',
		empreOrigen: EmpresaOrigen.CONEXION,
		cabecera: [
			{
				iva: 0,
				neto: 0,
				observacion: 'realizado en Web'
			}
		],
		itemsp: []
	});

	const handleChangeCantidad = e => {
		setCantidad(e.target.value);
	};

	const handleOnCellClick = u => {
		if (u.field === 'ELIMINAR') {
			const itemFiltrado = rowsInfor.filter(item => item.id !== u.id);
			setRowsInfor(itemFiltrado);
			if (itemFiltrado.length === 0) {
				setBtnProcesar(true);
				setDisableOrigen(false);
			}
		}
	};

	function TabPanel(props) {
		const { children, value, index, ...other } = props;
		return (
			<div
				role="tabpanel"
				hidden={value !== index}
				id={`simple-tabpanel-${index}`}
				aria-labelledby={`simple-tab-${index}`}
				{...other}
			>
				{value === index && (
					<Box sx={{ p: 3 }}>
						<Typography component="div">{children}</Typography>
					</Box>
				)}
			</div>
		);
	}

	TabPanel.propTypes = {
		children: PropTypes.node,
		index: PropTypes.number.isRequired,
		value: PropTypes.number.isRequired
	};

	const Excel = listaexcel => {
		if (listaexcel.length > 0) {
			// ${`${data.fi} a ${data.ff} ${data.hri} a ${data.hrf}`}
			printExcel(listaexcel, `Transferencias de Productos`);
		} else {
			dispatch(
				showMessage({
					message: `Para generar un Excel deben existir datos en la tabla de operaciones`,
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

	const handleChangeOrigen = event => {
		console.log('se llama handlechangeorigen');
		console.log(event.target.value);
		// setEmpresaOrigen();
	};

	function Mensaje(msg, variante) {
		dispatch(
			showMessage({
				message: msg,
				autoHideDuration: 6000,
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'center'
				},
				variant: variante
			})
		);
	}

	const [rowsInfor, setRowsInfor] = useState([]);

	const columnsInfor = [
		{
			field: 'id',
			headerName: 'id',
			width: 100,
			editable: false,
			headerClassName: 'boldHeader'
		},
		{
			field: 'CODIGO',
			headerName: 'Código',
			width: 100,
			editable: false,
			headerClassName: 'boldHeader'
		},
		{
			field: 'NOMBRE',
			headerName: 'Nombre Producto',
			width: 200,
			editable: false,
			headerClassName: 'boldHeader'
		},
		{
			field: 'CANTIDAD',
			headerName: 'Cantidad',
			width: 100,
			editable: false,
			type: 'number',
			headerClassName: 'boldHeader'
		},
		{
			field: 'ORIGEN',
			headerName: 'Origen',
			width: 200,
			editable: false,
			headerClassName: 'boldHeader'
		},
		{
			field: 'DESTINO',
			headerName: 'Destino',
			width: 200,
			editable: false,
			headerClassName: 'boldHeader'
		},
		{
			field: 'ELIMINAR',
			headerName: 'Eliminar',
			width: 100,
			editable: false,
			renderCell: () => <DeleteIcon />,
			headerClassName: 'boldHeader'
		}
	];

	// eslint-disable-next-line consistent-return
	const handleAddButton = () => {
		// setdialogoOpen(true);
		// eslint-disable-next-line func-names
		// eslint-disable-next-line array-callback-return
		if (parseFloat(cantidad) === 0) {
			Mensaje('Debe indicar la cantidad a Transferir.', 'error');
			return 0;
		}

		const sumatoriaStok = rowsInfor.reduce((acc, curVal) => {
			if (curVal.CODIGO.trim() === ItemSelected.CODIGO.trim()) {
				return acc + curVal.CANTIDAD;
			}
			return acc + 0;
		}, 0);

		if (parseFloat(ItemSelected.STOCK) - (parseFloat(sumatoriaStok) + parseFloat(cantidad)) >= 0) {
			setRowsInfor([
				...rowsInfor,
				{
					key: `${ItemSelected.CODIGO}${EmpresaDestino.CONEXION}`,
					id: `${ItemSelected.CODIGO}${EmpresaDestino.CONEXION}`,
					CODIGO: ItemSelected.CODIGO,
					NOMBRE: ItemSelected.NOMBRE,
					CANTIDAD: parseFloat(cantidad) > 0 ? parseFloat(cantidad) : 1,
					PRECIO: parseFloat(ItemSelected.PRECIO1).toFixed(2),
					TOTAL: parseFloat(cantidad) * parseFloat(ItemSelected.PRECIO1).toFixed(2),
					ORIGEN: EmpresaOrigen.NOMBRE,
					DESTINO: EmpresaDestino.NOMBRE,
					ELIMINAR: 'X',
					DESTINOE: EmpresaDestino.CONEXION
				}
			]);
			console.log(parseFloat(ItemSelected.PRECIO1).toFixed(2));
			setBtnProcesar(false);
			setDisableOrigen(true);
			// setearItemPost();
			setCantidad(0);
		} else {
			Mensaje('No hay stock suficiente para las transacciones del producto seleccionado', 'error');
		}
	};

	// const setearItemPost = () => {
	// 	const itemsPost = rowsInfor.map(obj2 => {
	// 		return {
	// 			key: obj2.CODIGO,
	// 			item: obj2.CODIGO,
	// 			cantiu: parseFloat(obj2.CANTIDAD),
	// 			costo: parseFloat(obj2.TOTAL) / parseFloat(obj2.CANTIDAD),
	// 			precio: obj2.PRECIO,
	// 			subTotal: obj2.TOTAL,
	// 			iva: 0,
	// 			neto: obj2.TOTAL,
	// 			motivo: motivoSelected.CODIGO.trim(),
	// 			empresaDestino: obj2.DESTINOE
	// 		};
	// 	});
	// 	// console.log('rowsInfor Mapeado');
	// 	// console.log(itemsPost);
	// 	// setPostData({ ...postData, itemsp: itemsPost });
	// };

	const HandleTransferencia = () => {
		// setLoading(true);
		setBtnProcesar(true);
		const itemsPost = rowsInfor.map(obj2 => {
			return {
				key: obj2.CODIGO,
				item: obj2.CODIGO,
				cantiu: parseFloat(obj2.CANTIDAD),
				costo: parseFloat(obj2.TOTAL) / parseFloat(obj2.CANTIDAD),
				precio: obj2.PRECIO,
				subTotal: obj2.TOTAL,
				iva: 0,
				neto: obj2.TOTAL,
				motivo: motivoSelected.CODIGO.trim(),
				empresaDestino: obj2.DESTINOE
			};
		});

		if (itemsPost.length === 0) {
			Mensaje('No hay transferencias por realizar.', 'error');
		} else {
			postData.itemsp = itemsPost;
			postData.motivo = motivoSelected.CODIGO.trim();
			// console.log('Post Data en la HandlerTransferencia');
			console.log(postData);
			const options = { headers: { 'Access-Control-Allow-Origin': '*' } };
			const urlFinal2 = `${serverapi}/transbod`;
			axios.post(urlFinal2, postData, options).then(res => {
				console.log(res.data);
				if (res.data.status === 'ok') {
					// setrowPrint([itemsPost]);
					setLoading(false);
					setBtnProcesar(false);
					const opera = res.data.operaciones;
					let mensajeOpe2 = '';
					const fullRowsImpresion = [];
					let lineaPrint = 1;
					// console.log(opera);

					Object.entries(opera).forEach(([key, val]) => {
						// Obtengo la empresa
						const nombreope = TodasEmpresas.filter(empreobj => {
							return key === empreobj.CONEXION.trim();
						});

						// Crea cabecera al informe
						const cabeceraThis = {
							id: `${key}${lineaPrint}`,
							key: `${key}`,
							CODIGO: 'EMPRESA',
							NOMBRE: nombreope[0].NOMBRE,
							CANTIDAD: 'Operación: ==>',
							ORIGEN: val,
							DESTINO: ''
						};
						fullRowsImpresion.push(cabeceraThis);
						lineaPrint += 1;

						const operacionesEmpresa = itemsPost.filter(movimiento => {
							return nombreope[0].CONEXION === movimiento.empresaDestino.trim();
						});
						// console.log('Operaciones totales de la empresa');
						// console.log(operacionesEmpresa);

						Object.entries(operacionesEmpresa).forEach(([key1, val1]) => {
							console.log('Valor de val1');
							console.log(val1);
							const itemDetalle = rowProducto.filter(e => {
								return e.CODIGO === val1.item;
							});

							// console.log('Item detalle');
							// console.log(itemDetalle[0].NOMBRE);

							const rowThis = {
								id: `${key}${itemDetalle[0].CODIGO}`,
								key: `${key}${itemDetalle[0].CODIGO}`,
								CODIGO: itemDetalle[0].CODIGO,
								NOMBRE: itemDetalle[0].NOMBRE,
								CANTIDAD: val1.cantiu,
								ORIGEN: EmpresaOrigen.NOMBRE,
								DESTINO: nombreope[0].NOMBRE
							};
							fullRowsImpresion.push(rowThis);
						});
						setrowPrint(fullRowsImpresion);
						mensajeOpe2 += `${nombreope[0].NOMBRE} => ${val} \n`;
					});
					console.log(fullRowsImpresion);
					setRowsInfor([]);
					setMensajeOpe(mensajeOpe2);
					setdialogoOpen(true);
				} else {
					Mensaje('Inconvenientes al realizar transacciones', 'error');
				}
			});
		}
	};

	async function getDataItems(empr) {
		const dataPost = { empresa: empr };
		// console.log(empr);
		const options = { headers: { 'Access-Control-Allow-Origin': '*' } };
		const urlFinal2 = `${serverapi2}/itemstrans`;
		// console.log(dataPost);
		axios.post(urlFinal2, dataPost, options).then(res => {
			const productosMap = res.data.map(obj => {
				return {
					key: obj.ITEM,
					CODIGO: obj.ITEM,
					ITEM: obj.ITEM,
					NOMBRE: obj.NOMBRE,
					STOCK: Math.trunc(obj.STOCK),
					PRECIO1: obj.PRECIO1
				};
			});
			// console.log(productosMap);
			setrowProducto(productosMap);
		});
	}

	async function getMotivos() {
		const options = { headers: { 'Access-Control-Allow-Origin': '*' } };
		const urlFinal2 = `${serverapi2}/motivos`;
		axios.get(urlFinal2, options).then(res => {
			const motivosMap = res.data.map(obj => {
				return { key: obj.CODIGO, CODIGO: obj.CODIGO, NOMBRE: obj.NOMBRE };
			});
			// console.log(motivosMap);
			setMotivos(motivosMap);
			setMotivoSelected({
				key: motivosMap[0].CODIGO,
				NOMBRE: motivosMap[0].NOMBRE,
				CODIGO: motivosMap[0].CODIGO
			});
			setPostData({ ...postData, motivo: motivosMap[0].CODIGO });
			// console.log(postData);
		});
	}

	useEffect(() => {
		async function getDataEmpresas() {
			const options = { headers: { 'Access-Control-Allow-Origin': '*' } };
			const urlFinal = `${serverapi2}/getbodprin`;
			// consulta de las empresas y sus conexiones
			axios.get(urlFinal, options).then(res => {
				const dataC = res.data;
				setTodasEmpresas(dataC);
				const firstItem = dataC[0];
				const lastItem = dataC[1];
				setPostData({ ...postData, empreOrigen: firstItem.CONEXION });
				setEmpresaOrigen({
					key: firstItem.CONEXION,
					NOMBRE: firstItem.NOMBRE,
					BODFAC: firstItem.BODFAC,
					CONEXION: firstItem.CONEXION
				});
				setEmpresaDestino({
					key: lastItem.CONEXION,
					NOMBRE: lastItem.NOMBRE,
					BODFAC: lastItem.BODFAC,
					CONEXION: lastItem.CONEXION
				});
				const dataPost = { empresa: firstItem.CONEXION };
				const urlFinal2 = `${serverapi2}/itemstrans`;
				axios.post(urlFinal2, dataPost, options).then(res2 => {
					const productosMap = res2.data.map(obj => {
						return {
							key: obj.ITEM,
							CODIGO: obj.ITEM,
							ITEM: obj.ITEM,
							NOMBRE: obj.NOMBRE,
							STOCK: Math.trunc(obj.STOCK),
							PRECIO1: obj.PRECIO1
						};
					});
					setrowProducto(productosMap);
					setProductoModal(productosMap);
				});
			});
		}
		getDataEmpresas();
		getMotivos();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<FusePageCarded
			classes={{
				header: 'h-10 sm:min-h-10 sm:min-h-10'
			}}
			header={
				<>
					<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
						<h2 className="contentool">Transferencia de Productos</h2>
					</div>
				</>
			}
			contentToolbar={
				<div
					style={{
						margin: '3rem',
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						width: '100%'
					}}
				>
					<h2 className="contentitle">Transferencia de Productos</h2>
					<ButtonGroup variant="contained" color="primary" disableElevation>
						<Button
							color="primary"
							style={{ background: '#1976d2' }}
							variant="contained"
							onClick={() => {
								setRowsInfor([]);
								setItemSelected({ CODIGO: '-', NOMBRE: '--', STOCK: 0, PRECIO1: 0 });
								setDisableOrigen(false);
								setCantidad(0);
							}}
						>
							Limpiar
						</Button>
						<Button
							color="primary"
							onClick={() => HandleTransferencia()}
							style={{ background: '#1976d2' }}
							variant="contained"
							disabled={btnProcesar}
						>
							Procesar
						</Button>
						{/* <Button
							color="primary"
							onClick={() => {
								setVerPdf(true);
								setdialogoOpen(true);
							}}
							style={{ background: '#1976d2' }}
							variant="contained"
						>
							Ver PDF
						</Button*/}
					</ButtonGroup>
				</div>
			}
			content={
				<>
					<div style={{ margin: '1rem' }}>
						{/* Formulario */}
						<Accordion defaultExpanded>
							<AccordionSummary
								expandIcon={<ExpandMore />}
								aria-controls="panel1a-content"
								// id="panel1a-header"
								sx={{ bgcolor: '#3543d0' }}
							>
								<Typography sx={{ fontSize: '1.5rem', color: '#FFF' }}>Selección</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Box sx={{ width: '100%', marginTop: '0.5rem' }}>
									<Grid container>
										<Grid
											item
											xl={6}
											lg={6}
											md={6}
											sm={12}
											xs={12}
											style={{ marginTop: '0.75rem' }}
										>
											<FormControl fullWidth>
												<TextField
													id="origen"
													select
													size="small"
													variant="outlined"
													value={EmpresaOrigen.CONEXION}
													label="Empresa Origen"
												>
													{Object.values(TodasEmpresas).map(x => {
														return (
															<MenuItem
																key={`${x.CONEXION}`}
																value={x.CONEXION}
																disabled={disableOrigen}
																onClick={() => {
																	setEmpresaOrigen({
																		NOMBRE: x.NOMBRE,
																		CONEXION: x.CONEXION,
																		BODFAC: 10
																	});
																	setPostData({
																		...postData,
																		empreOrigen: x.CONEXION
																	});
																	getDataItems(x.CONEXION);
																}}
															>
																{x.NOMBRE}
															</MenuItem>
														);
													})}
												</TextField>
											</FormControl>
										</Grid>
										<Grid
											item
											xl={6}
											lg={6}
											md={6}
											sm={12}
											xs={12}
											style={{ marginTop: '0.75rem' }}
										>
											<FormControl fullWidth>
												<TextField
													id="destino"
													select
													size="small"
													fullWidth
													variant="outlined"
													value={EmpresaDestino.CONEXION}
													label="Empresa Destino"
													onChange={() => {
														// getDataItems();
													}}
												>
													{Object.values(TodasEmpresas).map(x => {
														return (
															<MenuItem
																key={`${x.CONEXION}`}
																value={x.CONEXION}
																onClick={() => {
																	if (postData.empreOrigen === x.CONEXION) {
																		// eslint-disable-next-line no-alert
																		Mensaje(
																			'Debe seleccionar una empresa diferente al origen.',
																			'error'
																		);
																	} else {
																		setEmpresaDestino({
																			NOMBRE: x.NOMBRE,
																			CONEXION: x.CONEXION,
																			BODFAC: 10
																		});
																	}
																}}
															>
																{x.NOMBRE}
															</MenuItem>
														);
													})}
												</TextField>
											</FormControl>
										</Grid>
									</Grid>
								</Box>
								<Box sx={{ width: '100%', marginTop: '1rem' }}>
									<Grid container direction="row" spacing={1}>
										<Grid item xl={3} lg={3} md={3} sm={3} xs={12}>
											<FormControl fullWidth>
												<TextField
													size="small"
													variant="outlined"
													value={ItemSelected.CODIGO}
													onChange={e => {
														// handleCodProd(e);
													}}
													label="Codigo Item"
													InputProps={{
														readOnly: true,
														endAdornment: (
															<InputAdornment position="end">
																<IconButton
																	onClick={() => {
																		setProductoModal(rowProducto);
																		handleOpenProd();
																	}}
																	size="small"
																	// disabled={op !== 'item'}
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
										<Grid item xl={7} lg={7} md={7} sm={9} xs={12}>
											<FormControl fullWidth>
												<TextField
													fullWidth
													size="small"
													variant="outlined"
													value={ItemSelected.NOMBRE}
													onChange={e => {
														// handleNomProd(e);
													}}
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
										<Grid item xl={2} lg={2} md={2} sm={12} xs={12}>
											<FormControl fullWidth>
												<TextField
													fullWidth
													size="small"
													variant="outlined"
													value={ItemSelected.STOCK}
													onChange={e => {
														// handleNomProd(e);
													}}
													label="Stock"
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
									<Box sx={{ width: '100%', marginTop: '0.5rem' }}>
										<Grid container direction="row" spacing={1}>
											<Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
												<FormControl fullWidth>
													<TextField
														fullWidth
														size="small"
														variant="outlined"
														value={cantidad}
														onChange={e => {
															handleChangeCantidad(e);
														}}
														label="Cantidad a Transferir"
														InputLabelProps={{
															shrink: true
														}}
													/>
												</FormControl>
											</Grid>
											<Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
												<FormControl fullWidth>
													<TextField
														id="origen"
														select
														size="small"
														variant="outlined"
														value={motivoSelected.NOMBRE}
														label="Motivo"
														onChange={e => {
															// handleChangeMotivo(e);
														}}
													>
														{Object.values(motivos).map(x => {
															return (
																<MenuItem
																	key={x.CODIGO}
																	value={x.NOMBRE}
																	onClick={() => {
																		setMotivoSelected({
																			key: x.CODIGO,
																			NOMBRE: x.NOMBRE,
																			CODIGO: x.CODIGO
																		});
																		// console.log(motivoSelected);
																		setPostData({ ...postData, motivo: x.CODIGO });
																	}}
																>
																	{x.NOMBRE}
																</MenuItem>
															);
														})}
													</TextField>
												</FormControl>
											</Grid>
											<Grid item>
												<Button
													variant="outlined"
													onClick={() => {
														handleAddButton();
													}}
													primary="true"
													endIcon={<SendIcon />}
												>
													Agregar
												</Button>
											</Grid>
										</Grid>
									</Box>
								</Box>
							</AccordionDetails>
						</Accordion>
						{/* fin de Formulario */}
						{/* TABLA */}
						<Accordion defaultExpanded>
							<AccordionSummary
								expandIcon={<ExpandMore />}
								aria-controls="panel1a-content"
								// id="panel1a-header"
								sx={{ bgcolor: '#3543D0' }}
							>
								<Typography sx={{ fontSize: '1.5rem', color: '#FFF' }}>Operaciones</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Box
									sx={{
										'& .columnclass': {
											fontSize: '1.1rem',
											width: '100%'
											// fontFamily: 'Franklin Gothic '
										},
										'& .MuiDataGrid-columnHeaders': {
											// backgroundColor: '#EFEFEF',
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
										'& .boldHeader': {
											fontWeight: '800',
											fontSize: '1.2rem'
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
										<ThemeProvider theme={theme}>
											<DataGrid
												// components={{
												// 	Toolbar: CustomToolbar2
												// }}
												hideFooterSelectedRowCount
												disableColumnSelector
												columns={columnsInfor}
												rows={rowsInfor}
												density="compact"
												getRowId={rows => rows.key}
												sx={{
													boxShadow: 2,
													borderRadius: 5
												}}
												onCellClick={handleOnCellClick}
												localeText={esEsLocale}
											/>
										</ThemeProvider>
									</div>
								</Box>
							</AccordionDetails>
						</Accordion>
						<Modal
							open={openModal}
							onClose={() => handleCloseProd()}
							aria-labelledby="modal-modal-title"
							aria-describedby="modal-modal-description"
							closeAfterTransition
							BackdropComponent={Backdrop}
							BackdropProps={{
								timeout: 500
							}}
						>
							<Fade in={openModal}>
								<Box sx={stylemodal}>
									<div>
										<h2 style={{ margin: '1rem', fontWeight: 'bold' }}>Seleccione Producto</h2>
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
													value={modalSearchMode}
													onChange={e => handleModalSearch(e)}
												>
													<MenuItem value="codigo">Codigo</MenuItem>
													<MenuItem value="nombre">Nombre</MenuItem>
													<MenuItem value="codbarra">Cod.Barra</MenuItem>
												</TextField>
											</Grid>
											<Grid item xl={9} lg={9} md={9} sm={9} xs={12}>
												<TextField
													fullWidth
													size="small"
													type="text"
													label={`Buscar ${modalSearchMode}`}
													variant="outlined"
													onKeyDown={onKeyPressBarcode}
													onChange={e => {
														handleFilterModal(e.target.value);
														setmodalText(e.target.value);
													}}
													value={modalText}
												/>
											</Grid>
										</Grid>
									</Box>
									<Box
										sx={{
											'& .columnclass': {
												fontSize: '2rem',
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
												onRowClick={e => onSelectProd(e)}
												rows={rowProductoModal}
												columns={columnsProducto}
												getRowId={rows => rows.CODIGO}
											/>
										</div>
									</Box>
								</Box>
							</Fade>
						</Modal>
						<Dialog
							open={dialogoOpen}
							onClose={handleCloseDialogo}
							aria-labelledby="alert-dialog-title"
							aria-describedby="alert-dialog-description"
							fullWidth
							maxWidth="xl"
						>
							<DialogTitle sx={{ color: '#FFF', fontSize: '1.3rem', background: '#3442cf' }}>
								Operaciones Realizadas
							</DialogTitle>
							<DialogContent dividers sx={{ height: '70vh', width: '100%' }}>
								{/* {NewlineText(mensajeOpe)} */}
								{/* <DataGrid
									density="compact"
									components={{
										Toolbar: CustomToolbar2
									}}
									columns={colPrint}
									rows={rowPrint}
									getRowId={rows => rows.id}
									localeText={esEsLocale}
								/> */}
								{/* <ReportTable lista={rowPrint} /> */}
								{verPdf ? (
									<PDFViewer style={{ width: '100%', height: '90%' }}>
										<ReportTable lista={rowPrint} />
									</PDFViewer>
								) : null}
							</DialogContent>
							<DialogActions>
								<Button onClick={handleCloseDialogo}>Cerrar</Button>
								<Button
									color="primary"
									style={{ background: '#1976d2' }}
									variant="contained"
									autoFocus
									onClick={() => {
										setVerPdf(true);
										// console.log(verPdf);
									}}
								>
									Imprimir
								</Button>
							</DialogActions>
						</Dialog>
					</div>
				</>
			}
		/>
	);
}

export default TransferenciaBodegas;
