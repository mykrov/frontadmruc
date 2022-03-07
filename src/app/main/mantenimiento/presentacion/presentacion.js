import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { showMessage } from 'app/store/fuse/messageSlice';
import { useDispatch } from 'react-redux';
import { ButtonGroup } from '@mui/material';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { DataGrid } from '@mui/x-data-grid';
import { SearchRounded } from '@material-ui/icons';
import { Button, Box, Modal, Grid, TextField, MenuItem, Backdrop, Fade, CircularProgress } from '@material-ui/core';
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

function Presentacion() {
	const Excel = listaexcel => {
		if (listaexcel.length > 0) {
			// ${`${data.fi} a ${data.ff} ${data.hri} a ${data.hrf}`}
			printExcel(listaexcel, `Informe de Presentaciones`);
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
		codigo: '',
		nombre: '',
		estado: 'A'
		// esweb: 'N',
		// codigosap: null
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
				String(p.NOMBRE).includes(str.toLocaleUpperCase())
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
	const columns = [
		// { field: 'ID', headerName: 'ID', width: 140 },
		{ field: 'CODIGO', headerName: 'Codigo', width: 100, headerClassName: 'columnclass' },
		{ field: 'NOMBRE', headerName: 'Nombre', width: 250, headerClassName: 'columnclass' },
		{ field: 'ESTADO', headerName: 'Estado', width: 200, headerClassName: 'columnclass' }
	];
	// FILAS INICIALES
	const [rowss, setItems] = React.useState([]);
	// manejo de errores
	const [error, setError] = React.useState(false);
	const [error1, setError1] = React.useState(false);
	// const [gdatos, setGdatos] = React.useState([]);
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
	const onSelectEdit = e => {
		handleOpen1();
		// console.log(e.row);
		setData({ ...data, codigo: e.row.CODIGO, nombre: e.row.NOMBRE, estado: e.row.ESTADO });
	};
	// nueva categoria
	const nuevaPresentacion = e => {
		e.preventDefault();
		// console.log(data);
		if (data.nombre.trim().length > 0) {
			axios(
				{
					url: `${serverapi}/guardapresentacion`,
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
								message: `Presentacion agregada`,
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
								message: `Error al agregar una presentacion `,
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
			setData({ ...data, nombre: '', estado: 'A' });
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
	const editarPresentacion = e => {
		e.preventDefault();
		// console.log(data);
		if (data.nombre.trim().length > 0) {
			axios(
				{
					url: `${serverapi}/actualizapresentacion`,
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
								message: `Presentacion actualizada`,
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
								message: `Error al actualizar una presentacion `,
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
			setData({ ...data, nombre: '', estado: 'A' });
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
		response = response.data.presenta;
		// console.log(response);
		setItems(response);
		setLista(response);
	}
	React.useEffect(() => {
		getDatos();
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
							Presentacion
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
						placeholder="Buscar presentacion"
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
							Nueva Presentacion
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
									<h2 style={{ margin: '1rem', fontWeight: 'bold' }}>Nueva Presentacion</h2>
								</div>
								<form onSubmit={nuevaPresentacion}>
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
									<h2 style={{ margin: '1rem', fontWeight: 'bold' }}>Editar Presentacion</h2>
								</div>
								<form onSubmit={editarPresentacion}>
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
					{/* <Box sx={{ ml: 5, mr: 5, mt: 3 }}>
						<Card sx={{ p: 2, borderRadius: '50px', m: 2 }}>
							<TextField
								fullWidth
								sx={{ borderRadius: '50px' }}
								size="small"
								type="text"
								label="Buscar presentacion"
								variant="standard"
								onChange={e => handleBuscar(e)}
								value={buscar}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<SearchRounded />
										</InputAdornment>
									)
								}}
							/>
						</Card>
					</Box> */}
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
									// borderRadius: '0.5rem'
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
							// style={{ background: 'white' }}
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
									// sx={{
									// 	boxShadow: 2,
									// 	borderRadius: 5
									// }}
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

export default Presentacion;
