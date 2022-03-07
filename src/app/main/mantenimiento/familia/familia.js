import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { showMessage } from 'app/store/fuse/messageSlice';
import { useDispatch } from 'react-redux';
import { ButtonGroup } from '@mui/material';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { DataGrid } from '@mui/x-data-grid';
import { SearchRounded } from '@material-ui/icons';
import {
	Button,
	Box,
	Modal,
	Grid,
	TextField,
	MenuItem,
	InputAdornment,
	IconButton,
	Backdrop,
	Fade,
	CircularProgress
} from '@material-ui/core';
import axios from 'axios';
import { printExcel } from 'app/main/comdistrib/styles';
import { stylemodal } from '../funstyle';
// import { stylemodal } from '../style&func/funstyle';

const useStyles = makeStyles(() => ({
	noBorder: {
		border: 'none'
	},
	colortext: {
		color: 'black'
	}
}));
const serverapi = process.env.REACT_APP_SERVERAPI; // SERVICIO
const options = { headers: { 'Access-Control-Allow-Origin': '*' } }; // cors

function Familia() {
	const Excel = listaexcel => {
		if (listaexcel.length > 0) {
			// ${`${data.fi} a ${data.ff} ${data.hri} a ${data.hrf}`}
			printExcel(listaexcel, `Informe de Familias`);
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
	const classes = useStyles();
	const dispatch = useDispatch();
	const [data, setData] = React.useState({
		categoria: '',
		nomcat: '',
		codigo: '',
		nombre: '',
		estado: 'A',
		esweb: 'N',
		costohora: '0'
	});
	// busqueda
	const [lista, setLista] = React.useState([]);
	const [buscar, setBuscar] = React.useState('');
	const handleBuscar = e => {
		setBuscar(e.target.value);
		const str = e.target.value;
		const newlist = lista.filter(p => {
			p.CODIGO = String(p.CODIGO).trim();
			return (
				String(p.CODIGO).includes(str.toLocaleUpperCase().trim()) ||
				String(p.NOMBRE).includes(str.toLocaleUpperCase()) ||
				String(p.CATEGORIA).includes(str.toLocaleUpperCase())
			);
		});
		setItems(newlist);
	};
	// para crear
	const handleSnombre = e => {
		setData({ ...data, nombre: String(e.target.value).toLocaleUpperCase() });
	};
	const handleSestado = e => {
		setData({ ...data, estado: e.target.value });
	};
	const handleSccategoria = e => {
		setData({ ...data, categoria: e.target.value });
	};
	const handleSncategoria = e => {
		setData({ ...data, nomcat: e.target.value });
	};
	const columns = [
		// { field: 'ID', headerName: 'ID', width: 140 },
		{ field: 'CODIGO', headerName: 'Codigo', width: 100, headerClassName: 'columnclass' },
		{ field: 'CATEGORIA', headerName: 'Categoria', width: 100, headerClassName: 'columnclass' },
		{ field: 'NOMBRE', headerName: 'Nombre', width: 250, headerClassName: 'columnclass' },
		{ field: 'ESTADO', headerName: 'Estado', width: 200, headerClassName: 'columnclass' }
	];
	// FILAS INICIALES
	const [rowss, setItems] = React.useState([]);
	// manejo de errores
	const [error, setError] = React.useState(false);
	const [error1, setError1] = React.useState(false);
	// const [gdatos, setGdatos] = React.useState([]);
	// modal de categoria
	// hook de select
	const [opfillcat, setOpFillCat] = React.useState('codigo');
	const handlesetOpFillCat = e => {
		setOpFillCat(e.target.value);
	};
	const columnscat = [
		{ field: 'CODIGO', headerName: 'Codigo', width: 90, headerClassName: 'columnclass' },
		{ field: 'NOMBRE', headerName: 'Nombre', width: 150, headerClassName: 'columnclass' },
		{ field: 'ESTADO', headerName: 'Estado', width: 90, headerClassName: 'columnclass' }
	];
	// pa limpiar
	const [listcat, setListcat] = React.useState([]);
	const [rowsscat, setItemsCat] = React.useState([]);
	const [opencat, setOpencat] = React.useState(false);
	const handleOpenCat = () => setOpencat(true);
	const handleCloseCat = () => {
		setOpencat(false);
		setBuscarcat('');
		setItemsCat(listcat);
		setOpFillCat('codigo');
	};
	// hook para buscar
	const [buscarcat, setBuscarcat] = React.useState('');
	const handlesetBuscarCat = e => {
		setBuscarcat(e.target.value);
		const str = e.target.value;
		let res;
		const newlist = listcat.filter(w => {
			if (opfillcat === 'codigo') {
				res = w.CODIGO.includes(str.toLocaleUpperCase().trim());
			}
			if (opfillcat === 'nombre') {
				res = w.NOMBRE.includes(str.toLocaleUpperCase().trim());
			}
			if (opfillcat === 'estado') {
				res = w.ESTADO.includes(str.toLocaleUpperCase().trim());
			}
			return res;
		});
		setItemsCat(newlist);
	};
	// seleccinar una familia
	const onSelectFam = e => {
		// console.log(e);
		// cambiando categoria
		setData({ ...data, categoria: e.row.CODIGO, nomcat: e.row.NOMBRE });
		handleCloseCat();
	};
	// nueva
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	// editar
	const [open1, setOpen1] = React.useState(false);
	const handleOpen1 = () => setOpen1(true);
	const handleClose1 = () => setOpen1(false);
	// modal loading
	const [open2, setOpen2] = React.useState(false);
	const handleOpen2 = () => setOpen2(true);
	const handleClose2 = () => setOpen2(false);
	// editar categoria
	const onSelectEdit = async e => {
		handleOpen1();
		// console.log(String(e.row.CATEGORIA).trim());
		let response = await axios(`${serverapi}/categoriaxid/${String(e.row.CATEGORIA).trim()}`);
		response = response.data.categoria[0].NOMBRE;
		// console.log(response);
		setData({
			...data,
			codigo: e.row.CODIGO,
			categoria: e.row.CATEGORIA,
			nomcat: response,
			nombre: e.row.NOMBRE,
			estado: e.row.ESTADO
		});
	};
	// nueva categoria
	const nuevaCategoria = e => {
		e.preventDefault();
		// console.log(data);
		if (data.nombre.trim().length > 0) {
			axios(
				{
					url: `${serverapi}/guardafamilia`,
					method: 'POST',
					data,
					options
				},
				handleOpen2()
			)
				.then(res => {
					const response = res.data;
					// console.log(response);
					if (response.status === 'ok') {
						dispatch(
							showMessage({
								message: `Familia agregada`,
								variant: 'success',
								autoHideDuration: 5000,
								anchorOrigin: {
									vertical: 'top', // top bottom
									horizontal: 'center' // left center right
								}
							})
						);
						getDatos();
					} else {
						dispatch(
							showMessage({
								message: `Error al agregar una familia `,
								variant: 'error',
								autoHideDuration: 5000,
								anchorOrigin: {
									vertical: 'top', // top bottom
									horizontal: 'center' // left center right
								}
							})
						);
					}
				})
				.catch(err => {
					dispatch(
						showMessage({
							message: `Error de conexion con la base de datos `,
							variant: 'error',
							autoHideDuration: 5000,
							anchorOrigin: {
								vertical: 'top', // top bottom
								horizontal: 'center' // left center right
							}
						})
					);
				});
			setData({ ...data, nombre: '', estado: 'A', categoria: '', nomcat: '' });
			handleClose();
			setError(false);
		} else {
			dispatch(
				showMessage({
					message: `Complete los campos requeridos `,
					variant: 'error',
					autoHideDuration: 5000,
					anchorOrigin: {
						vertical: 'top', // top bottom
						horizontal: 'center' // left center right
					}
				})
			);
			setError(true);
		}
		handleClose2();
	};
	// editar categoria
	const editarCategoria = e => {
		e.preventDefault();
		// console.log(data);
		if (data.nombre.trim().length > 0) {
			axios(
				{
					url: `${serverapi}/actualizafamilia`,
					method: 'POST',
					data,
					options
				},
				handleOpen2()
			)
				.then(res => {
					const response = res.data;
					// console.log(response);
					if (response.status === 'ok') {
						dispatch(
							showMessage({
								message: `Familia actualizada`,
								variant: 'success',
								autoHideDuration: 5000,
								anchorOrigin: {
									vertical: 'top', // top bottom
									horizontal: 'center' // left center right
								}
							})
						);
						getDatos();
					} else {
						dispatch(
							showMessage({
								message: `Error al actualizar una familia `,
								variant: 'error',
								autoHideDuration: 5000,
								anchorOrigin: {
									vertical: 'top', // top bottom
									horizontal: 'center' // left center right
								}
							})
						);
					}
				})
				.catch(err => {
					dispatch(
						showMessage({
							message: `Error de conexion con la base de datos `,
							variant: 'error',
							autoHideDuration: 5000,
							anchorOrigin: {
								vertical: 'top', // top bottom
								horizontal: 'center' // left center right
							}
						})
					);
				});
			setData({ ...data, nombre: '', estado: 'A', categoria: '', nomcat: '' });
			handleClose1();
			setError1(false);
		} else {
			dispatch(
				showMessage({
					message: `Complete los campos requeridos `,
					variant: 'error',
					autoHideDuration: 5000,
					anchorOrigin: {
						vertical: 'top', // top bottom
						horizontal: 'center' // left center right
					}
				})
			);
			setError1(true);
		}
		handleClose2();
	};
	async function getDatos() {
		let response = await axios(`${serverapi}/otrosrecursos`, options);
		response = response.data.familia;
		// console.log(response);
		setItems(response);
		setLista(response);
	}
	async function getCategoria() {
		let response = await axios(`${serverapi}/otrosrecursos`, options);
		response = response.data.categoria;
		// console.log(response);
		setItemsCat(response);
		setListcat(response);
	}
	React.useEffect(() => {
		getDatos();
		getCategoria();
	}, []);
	return (
		<FusePageCarded
			classes={{
				toolbar: 'p-0',
				header: 'min-h-52 h-72 sm:h-136 sm:min-h-136'
			}}
			header={
				<div
					className="p-24"
					style={{
						width: '100%',
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between'
					}}
				>
					<div>
						<h1 style={{ fontWeight: 'bold', fontSize: '3rem' }} className="none2">
							Familia
						</h1>
					</div>
					<TextField
						style={{
							width: '50%',
							background: 'white',
							borderRadius: '3rem',
							color: 'black'
						}}
						size="small"
						type="text"
						placeholder="Buscar familia"
						variant="outlined"
						onChange={e => handleBuscar(e)}
						value={buscar}
						InputProps={{
							classes: { notchedOutline: classes.noBorder, input: classes.colortext },
							startAdornment: <SearchRounded style={{ color: 'black', margin: '0.5rem' }} />
						}}
					/>

					<div>
						<Button
							style={{ background: '#40EDF7', minWidth: '150px', textDecoration: 'none', color: 'black' }}
							onClick={() => {
								handleOpen();
								setData({ ...data, nombre: '', estado: 'A' });
							}}
							variant="contained"
						>
							Nueva Familia
						</Button>
					</div>
				</div>
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
								style={{ borderRadius: '50px', background: '#1f6e43', minWidth: '60px' }}
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
											onRowClick={e => onSelectFam(e)}
											rows={rowsscat}
											columns={columnscat}
											getRowId={rows => rows.CODIGO}
										/>
									</div>
								</Box>
							</Box>
						</Fade>
					</Modal>
					<Modal
						open={open2}
						onClose={handleClose2}
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
								justifyContent: 'center',
								alignItems: 'center'
							}}
						>
							<Box mx="auto">
								<CircularProgress style={{ color: '#2196F3' }} />
							</Box>
						</Box>
					</Modal>
					{/* MODAL NUEVO */}
					<Modal
						open={open}
						onClose={handleClose}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
						closeAfterTransition
						BackdropComponent={Backdrop}
						BackdropProps={{
							timeout: 500
						}}
					>
						<Fade in={open}>
							<Box sx={stylemodal}>
								<div>
									<h2 style={{ margin: '1rem', fontWeight: 'bold' }}>Nueva Familia</h2>
								</div>
								<form onSubmit={nuevaCategoria}>
									<Box ml={2} mr={2} mb={4}>
										<Grid container spacing={1} alignItems="center">
											<Grid item xs={12}>
												<TextField
													error={error}
													fullWidth
													size="small"
													type="text"
													label="Nombre"
													variant="filled"
													onChange={e => handleSnombre(e)}
													value={data.nombre}
												/>
											</Grid>
											<Grid item container xl={12} lg={12} md={12} sm={12} xs={12}>
												<Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
													<TextField
														fullWidth
														size="small"
														style={{ display: 'none' }}
														// name="cjid"
														// label="Desde"
														type="number"
														InputProps={{
															readOnly: true
														}}
														onChange={e => handleSccategoria(e)}
														value={data.categoria}
														variant="outlined"
													/>
												</Grid>
												<Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
													<TextField
														fullWidth
														size="small"
														// style={{ width: 200 }}
														name="cjin"
														label="Categoria"
														type="text"
														value={data.nomcat}
														InputProps={{
															readOnly: true,
															endAdornment: (
																<InputAdornment position="end">
																	<IconButton onClick={handleOpenCat} size="small">
																		<SearchRounded />
																	</IconButton>
																</InputAdornment>
															),
															startAdornment: (
																<InputAdornment position="start">
																	{data.categoria} -
																</InputAdornment>
															)
														}}
														onChange={e => handleSncategoria(e)}
														variant="filled"
													/>
												</Grid>
											</Grid>
											<Grid item xs={12}>
												<TextField
													select
													size="small"
													variant="filled"
													fullWidth
													value={data.estado}
													label="Estado"
													onChange={e => handleSestado(e)}
												>
													<MenuItem value="A">Activo</MenuItem>
													<MenuItem value="I">Inactivo</MenuItem>
												</TextField>
											</Grid>
											<Grid item xs={12}>
												<Button
													fullWidth
													style={{
														// borderRadius: '50px',
														background: '#3204D9',
														color: 'white'
													}}
													// onClick={() => {
													// 	handleOpen();
													// }}
													variant="contained"
													size="medium"
													type="submit"
												>
													Agregar
												</Button>
											</Grid>
										</Grid>
									</Box>
								</form>
							</Box>
						</Fade>
					</Modal>
					{/* MODAL EDITAR */}
					<Modal
						open={open1}
						onClose={handleClose1}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
						closeAfterTransition
						BackdropComponent={Backdrop}
						BackdropProps={{
							timeout: 500
						}}
					>
						<Fade in={open1}>
							<Box sx={stylemodal}>
								<div>
									<h2 style={{ margin: '1rem', fontWeight: 'bold' }}>Editar Familia</h2>
								</div>
								<form onSubmit={editarCategoria}>
									<Box ml={2} mr={2} mb={4}>
										<Grid container spacing={1} alignItems="center">
											<Grid item xs={12}>
												<TextField
													error={error1}
													fullWidth
													size="small"
													type="text"
													label="Nombre"
													variant="filled"
													onChange={e => handleSnombre(e)}
													value={data.nombre}
												/>
											</Grid>
											<Grid item container xl={12} lg={12} md={12} sm={12} xs={12}>
												<Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
													<TextField
														fullWidth
														size="small"
														style={{ display: 'none' }}
														// name="cjid"
														// label="Desde"
														type="number"
														InputProps={{
															readOnly: true
														}}
														onChange={e => handleSccategoria(e)}
														value={data.categoria}
														variant="outlined"
													/>
												</Grid>
												<Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
													<TextField
														fullWidth
														size="small"
														// style={{ width: 200 }}
														name="cjin"
														label="Categoria"
														type="text"
														value={data.nomcat}
														InputProps={{
															readOnly: true,
															endAdornment: (
																<InputAdornment position="end">
																	<IconButton onClick={handleOpenCat} size="small">
																		<SearchRounded />
																	</IconButton>
																</InputAdornment>
															),
															startAdornment: (
																<InputAdornment position="start">
																	{data.categoria} -
																</InputAdornment>
															)
														}}
														onChange={e => handleSncategoria(e)}
														variant="filled"
													/>
												</Grid>
											</Grid>
											<Grid item xs={12}>
												<TextField
													select
													size="small"
													variant="filled"
													fullWidth
													value={data.estado}
													label="Estado"
													onChange={e => handleSestado(e)}
												>
													<MenuItem value="A">Activo</MenuItem>
													<MenuItem value="I">Inactivo</MenuItem>
												</TextField>
											</Grid>
											<Grid item xs={12}>
												<Button
													fullWidth
													style={{
														// borderRadius: '50px',
														background: '#3204D9',
														color: 'white'
													}}
													type="submit"
													variant="contained"
													size="medium"
												>
													Editar
												</Button>
											</Grid>
										</Grid>
									</Box>
								</form>
							</Box>
						</Fade>
					</Modal>

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
									backgroundColor: '#EFEFEF'
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
								},
								ml: 2,
								mr: 5,
								mb: 3
							}}
						>
							<div
								style={{
									margin: '0.8rem',
									height: '55vh',
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
									getRowId={rows => rows.CODIGO}
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

export default Familia;
