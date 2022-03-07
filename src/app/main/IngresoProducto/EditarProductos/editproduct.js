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
	Fade,
	CircularProgress
} from '@material-ui/core';
import { showMessage } from 'app/store/fuse/messageSlice';
import { useDispatch } from 'react-redux';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { DataGrid } from '@mui/x-data-grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { ShoppingBasket, KeyboardReturn, Save, SearchOutlined } from '@material-ui/icons';
import { stylemodal, headers } from 'app/main/comdistrib/styles';
import 'styles/condistri.css';

const serverapi = process.env.REACT_APP_SERVERAPI; // SERVICIO
const options = { headers: { 'Access-Control-Allow-Origin': '*' } }; // cors
// FUNCION PRINCIPAL
function EditProduct(props) {
	const dispatch = useDispatch();
	// variables independientes
	// primero elige una categoria
	const [elijecat, setElijeCat] = React.useState(true);
	const activateIcon = () => setElijeCat(false);
	const [tabValue, setTabValue] = React.useState(0);
	const handleTabChange = (event, value) => {
		setTabValue(value);
	};
	// modal de categoria
	// pa limpiar
	const [listcat, setListcat] = React.useState([]);
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
	const [rowsscat, setItemsCat] = React.useState([]);
	const getCategoria = async () => {
		let response = await axios(`${serverapi}/otrosrecursos`, options);
		response = response.data.categoria;
		setItemsCat(response);
		setListcat(response);
	};
	// hook de select
	const [opfillcat, setOpFillCat] = React.useState('codigo');
	const handlesetOpFillCat = e => {
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
	// seleccinar una categoria
	const onSelectCat = async e => {
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
		activateIcon();
		let response = await axios(`${serverapi}/otrosrecursos`, options);
		response = response.data.categoria;
		setItemsCat(response);
		setBuscarCat('');
		handleCloseCat();
	};
	// modal de familia
	// pa limpiar
	const [listfam, setListfam] = React.useState([]);
	const columnsfam = [
		{ field: 'CODIGO', headerName: 'Codigo', width: 90, headerClassName: 'columnclass' },
		{ field: 'NOMBRE', headerName: 'Nombre', width: 150, headerClassName: 'columnclass' },
		{ field: 'ESTADO', headerName: 'Estado', width: 90, headerClassName: 'columnclass' }
	];
	const [rowssfam, setItemsFam] = React.useState([]);
	const [openfam, setOpenFam] = React.useState(false);
	const handleOpenFam = () => setOpenFam(true);
	const handleCloseFam = () => {
		setOpenFam(false);
		setBuscarFam('');
		setItemsFam(listfam);
	};
	const getFamilia = async () => {
		let response = await axios(`${serverapi}/otrosrecursos`);
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
	const onSelectFam = async e => {
		// console.log(e);
		// cambiando categoria
		setCodFam(e.row.CODIGO);
		setNomFam(e.row.NOMBRE);
		// cambiando cambiando familia
		setCodLinea('');
		setNomLinea('');
		// getFamilia2();
		let response = await axios(`${serverapi}/otrosrecursos`, options);
		response = response.data.familia;
		setItemsFam(response);
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
		setItemsLin(newlist);
	};
	// selecciona la linea
	const onSelectLin = async e => {
		// console.log(e);
		// cambiando categoria
		setCodLinea(e.row.CODIGO);
		setNomLinea(e.row.NOMBRE);
		// getFamilia2();
		let response = await axios(`${serverapi}/otrosrecursos`, options);
		response = response.data.linea;
		setItemsLin(response);
		setBuscarLin('');
		handleCloseLin();
	};
	// modal de marca
	const columnsmar = [
		{ field: 'CODIGO', headerName: 'Codigo', width: 90, headerClassName: 'columnclass' },
		{ field: 'NOMBRE', headerName: 'Nombre', width: 150, headerClassName: 'columnclass' },
		{ field: 'ESTADO', headerName: 'Estado', width: 90, headerClassName: 'columnclass' }
	];
	// pa limpiar
	const [listmar, setListmar] = React.useState([]);
	const [rowssmar, setItemsMar] = React.useState([]);
	const [openmar, setOpenMar] = React.useState(false);
	const handleOpenMar = () => setOpenMar(true);
	const handleCloseMar = () => {
		setOpenMar(false);
		setBuscarMar('');
		setItemsMar(listmar);
	};
	const getMarca = async () => {
		let response = await axios(`${serverapi}/otrosrecursos`, options);
		response = response.data.marca;
		setItemsMar(response);
		setListmar(response);
	};
	// hook para buscar
	const [buscarmar, setBuscarMar] = React.useState('');
	const handlesetBuscarMar = async e => {
		setBuscarMar(e.target.value);
		const str = e.target.value;
		let response = await axios(`${serverapi}/otrosrecursos`, options);
		let resultado;
		response = response.data.marca;
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
		setItemsMar(newlist);
	};
	// selecciona la marca
	const onSelectMar = async e => {
		// console.log(e);
		// cambiando categoria
		setCodMarca(e.row.CODIGO);
		setNomMarca(e.row.NOMBRE);
		// getFamilia2();
		let response = await axios(`${serverapi}/otrosrecursos`, options);
		response = response.data.marca;
		setItemsMar(response);
		setBuscarMar('');
		handleCloseMar();
	};
	// modal de presentacion
	// pa limpiar
	const [listpress, setListpress] = React.useState([]);
	const columnspress = [
		{ field: 'CODIGO', headerName: 'Codigo', width: 90, headerClassName: 'columnclass' },
		{ field: 'NOMBRE', headerName: 'Nombre', width: 150, headerClassName: 'columnclass' },
		{ field: 'ESTADO', headerName: 'Estado', width: 90, headerClassName: 'columnclass' }
	];
	const [rowsspress, setItemsPress] = React.useState([]);
	const [openpress, setOpenPress] = React.useState(false);
	const handleOpenPress = () => setOpenPress(true);
	const handleClosePress = () => {
		setOpenPress(false);
		setBuscarPress('');
		setItemsPress(listpress);
	};
	const getPresentacion = async () => {
		let response = await axios(`${serverapi}/otrosrecursos`, options);
		response = response.data.presenta;
		setItemsPress(response);
		setListpress(response);
	};
	// hook para buscar
	const [buscarpress, setBuscarPress] = React.useState('');
	const handlesetBuscarPress = async e => {
		setBuscarPress(e.target.value);
		const str = e.target.value;
		let response = await axios(`${serverapi}/otrosrecursos`, options);
		let resultado;
		response = response.data.presenta;
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
		setItemsPress(newlist);
	};
	// selecciona la presentacion
	const onSelectPress = async e => {
		// console.log(e);
		// cambiando categoria
		setCodPress(e.row.CODIGO);
		setNomPress(e.row.NOMBRE);
		// getFamilia2();
		let response = await axios(`${serverapi}/otrosrecursos`, options);
		response = response.data.presenta;
		setItemsPress(response);
		setBuscarPress('');
		handleClosePress();
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
	const onSelectProv = async e => {
		// console.log(e);
		// cambiando categoria
		setCodProv(e.row.CODIGO);
		setNomProv(e.row.NOMBRE);
		// getFamilia2();
		let response = await axios(`${serverapi}/proveedor`, options);
		response = response.data.data;
		setItemsProv(response);
		setBuscarProv('');
		handleCloseProv();
	};
	// obtiene el id por la url
	const lenpathname = String(props.location.pathname).length;
	const codigoProduct = String(props.location.pathname).substring(14, lenpathname);
	// HOOKS DE LOS INPUTS
	// DATOS BASICOS
	// COD PRODUCTO
	const [codprod, setCodProd] = React.useState('');
	const handleCodprod = e => {
		setCodProd(e.target.value);
	};
	// COD BARRA
	const [codbarra, setBarra] = React.useState('');
	const handleBarra = e => {
		setBarra(e.target.value);
	};
	// NOMBRE
	const [nombre, setNombre] = React.useState('');
	const handleNombre = e => {
		setNombre(e.target.value);
	};
	// DESCRIPCION
	const [descripcion, setDescripcion] = React.useState('');
	const handleDescripcion = e => {
		setDescripcion(e.target.value);
	};
	// ESTADO
	const [estado, setEstado] = React.useState('A');
	const handleEstado = e => {
		setEstado(e.target.value);
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
	// MARCA
	const [codmarca, setCodMarca] = React.useState('');
	const handleCodMarca = e => {
		setCodMarca(e.target.value);
	};
	const [nommarca, setNomMarca] = React.useState('');
	const handleNomMarca = e => {
		setNomMarca(e.target.value);
	};
	// PRESENTACION
	const [codpress, setCodPress] = React.useState('');
	const handleCodPress = e => {
		setCodPress(e.target.value);
	};
	const [nompress, setNomPress] = React.useState('');
	const handleNomPress = e => {
		setNomPress(e.target.value);
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
	// COMPLEMENTARIOS
	// FACTOR
	const [factor, setFactor] = React.useState('');
	const handleFactor = e => {
		setFactor(e.target.value);
	};
	// PESO
	const [peso, setPeso] = React.useState('');
	const handlePeso = e => {
		setPeso(e.target.value);
	};
	// VOLUMEN
	const [vol, setVol] = React.useState('');
	const handleVol = e => {
		setVol(e.target.value);
	};
	// DISPONIBILIDAD DE VENTA
	const [disven, setDisVen] = React.useState(false);
	const handlesetDisVen = e => {
		setDisVen(e.target.checked);
	};
	// GRABA IVA
	const [grabaiva, setGrabaIva] = React.useState(false);
	const handlesetGrabaIva = e => {
		setGrabaIva(e.target.checked);
	};
	// ITEM - COMBO
	const [itemcom, setItemCom] = React.useState(false);
	const handlesetItemCom = e => {
		setItemCom(e.target.checked);
	};
	// ITEM - REGALO
	const [itemre, setItemRe] = React.useState(false);
	const handlesetItemRe = e => {
		setItemRe(e.target.checked);
	};
	// PRODUCTO ESPECIAL
	const [prodespe, setProdEsp] = React.useState(false);
	const handlesetProdEsp = e => {
		setProdEsp(e.target.checked);
	};
	// SOLO PARA POS
	const [solopos, setSoloPos] = React.useState(false);
	const handlesetSoloPos = e => {
		setSoloPos(e.target.checked);
	};
	// PRODUCTO CON SERIE
	const [prodserie, setProdSerie] = React.useState(false);
	const handlesetProdSerie = e => {
		setProdSerie(e.target.checked);
	};
	// PRODUCTO TRANSPORTE
	const [prodtran, setProdTran] = React.useState(false);
	const handlesetProdTran = e => {
		setProdTran(e.target.checked);
	};
	// OBSERVACION
	const [observa, setObserva] = React.useState('');
	const handlesetObserva = e => {
		setObserva(e.target.value);
	};
	// %DES SUG ADICIONAL
	const [dessub, setDesSub] = React.useState('');
	const handlesetDesSub = e => {
		setDesSub(e.target.value);
	};
	// STOCK MINIMO
	const [stockmin, setStockMin] = React.useState('');
	const handlesetStockMin = e => {
		setStockMin(e.target.value);
	};
	// STOCK MAXIMO
	const [stockmax, setStockMax] = React.useState('');
	const handlesetStockMax = e => {
		setStockMax(e.target.value);
	};
	// PVP
	const [pvp, setPvp] = React.useState('');
	const handlesetPvp = e => {
		setPvp(e.target.value);
	};
	// COD PROV
	const [codprovi, setCodProvi] = React.useState('');
	const handlesetCodProvi = e => {
		setCodProvi(e.target.value);
	};
	// UTIL VENTA
	const [utilventa, setUtilVenta] = React.useState('');
	const handlesetUtilVenta = e => {
		setUtilVenta(e.target.value);
	};
	// UTIL MINIMO
	const [utilmin, setUtilMin] = React.useState('');
	const handlesetUtilMin = e => {
		setUtilMin(e.target.value);
	};
	// MODAL DE CARGANDO
	const [open1, setOpen1] = React.useState(false);
	const handleOpen1 = () => setOpen1(true);
	const handleClose1 = () => setOpen1(false);
	// ENVIAR DATOS
	// campos a completar
	const [faltadato, setFaltadato] = React.useState(false);
	const OnSubmit = e => {
		e.preventDefault();
		const ds = disven === true ? 'S' : 'N';
		const giva = grabaiva === true ? 'S' : 'N';
		const itc = itemcom === true ? 'S' : 'N';
		const itr = itemre === true ? 'S' : 'N';
		const psd = prodespe === true ? 'S' : 'N';
		const spos = solopos === true ? 'S' : 'N';
		const ps = prodserie === true ? 'S' : 'N';
		const pt = prodtran === true ? 'S' : 'N';
		// validar
		const validar = [
			codprod,
			nombre,
			estado,
			codcat,
			nomcat,
			codfam,
			nomfam,
			codlinea,
			nomlinea,
			codmarca,
			nommarca,
			codpress,
			nompress,
			codprov,
			nomprov,
			factor,
			peso,
			vol,
			dessub,
			stockmin,
			stockmax,
			pvp,
			utilventa,
			utilmin
		];
		const post = validar.map(vari => {
			return vari !== '';
		});
		const vallnull = post.filter(val => {
			return val === false;
		});
		if (vallnull[0] !== false) {
			axios(
				{
					url: `${serverapi}/actualizaproducto`,
					method: 'POST',
					data: {
						item: codprod,
						nombreitem: nombre.toLocaleUpperCase(),
						descrextra: descripcion.toLocaleUpperCase(),
						categoria: codcat,
						familia: codfam,
						linea: codlinea,
						marca: codmarca,
						presentacion: codpress,
						estado,
						dispoventa: ds,
						iva: giva,
						proveedor: codprov,
						factor,
						peso,
						volumen: vol,
						observacion: observa.toLocaleUpperCase(),
						itemcombo: itc,
						itemregalo: itr,
						codbarra,
						solopos: spos,
						stockminimo: stockmin,
						stockmaximo: stockmax,
						codprov: codprovi,
						imagen: null,
						ptransporte: pt,
						pserie: ps,
						pespecial: psd,
						pordessugerido: dessub,
						porutiventa: utilventa,
						poruti: utilmin,
						pvp
					},
					options
				},
				handleOpen1()
			)
				.then(res => {
					const response = res.data;
					if (response.status === 'ok') {
						dispatch(
							showMessage({
								message: `Producto actualizado correctamente`,
								variant: 'success',
								autoHideDuration: 5000,
								anchorOrigin: {
									vertical: 'top', // top bottom
									horizontal: 'center' // left center right
								}
							})
						);
						handleClose1();
						setFaltadato(false);
						props.history.replace(`/productos`);
					} else {
						dispatch(
							showMessage({
								message: `Error al actualizar producto`,
								variant: 'error',
								autoHideDuration: 5000,
								anchorOrigin: {
									vertical: 'top', // top bottom
									horizontal: 'center' // left center right
								}
							})
						);
					}
					// console.log(response);
				})
				.catch(error => {
					dispatch(
						showMessage({
							message: `Problemas de conexion con la base de datos`,
							variant: 'error',
							autoHideDuration: 5000,
							anchorOrigin: {
								vertical: 'top', // top bottom
								horizontal: 'center' // left center right
							}
						})
					);
					handleClose1();
				});
		} else {
			dispatch(
				showMessage({
					message: `Complete los campos sugeridos`,
					variant: 'error',
					autoHideDuration: 5000,
					anchorOrigin: {
						vertical: 'top', // top bottom
						horizontal: 'center' // left center right
					}
				})
			);
			setFaltadato(true);
			handleClose1();
		}
	};
	// hook que maneja el estado del factor
	const [mfactor, setMfactor] = React.useState(false);
	React.useEffect(() => {
		// setCodProd(codigoProduct);
		async function GetProductos() {
			let response = await axios(`${serverapi}/productoxcod/${codigoProduct}`, options);
			response = response.data.items;
			// DATOS BASICOS
			setCodProd(response.ITEM);
			setBarra(response.CODBARRA);
			setNombre(response.NOMBRE);
			setDescripcion(response.NOMBRECORTO);
			setEstado(response.ESTADO);
			setCodCat(response.CATEGORIA);
			setNomCat(response.NOMCATEGORIA);
			setCodFam(response.FAMILIA);
			setNomFam(response.NOMFAMILIA);
			setCodLinea(response.LINEA);
			setNomLinea(response.NOMLINEA);
			setCodMarca(response.MARCA);
			setNomMarca(response.NOMMARCA);
			setCodPress(response.PRESENTA);
			setNomPress(response.NOMPRESENTACION);
			setCodProv(response.PROVEEDOR);
			setNomProv(response.NOMPROVEEDOR);
			// COMPLEMENTARIOS
			// validacion del factor
			const factorx = parseFloat(response.STOCK) > 0;
			setMfactor(factorx);
			setFactor(response.FACTOR);
			setPeso(response.PESO);
			setVol(response.VOLUMEN);
			// checks
			setDisVen(response.DISPOVEN === 'S');
			setGrabaIva(response.IVA === 'S');
			setItemCom(response.COMBO === 'S');
			setItemRe(response.REGALO === 'S');
			setProdEsp(response.pespecial === 'S');
			setSoloPos(response.SOLOPOS === 'S');
			setProdSerie(response.pserie === 'S');
			setProdTran(response.ptransporte === 'S');
			//
			setObserva(response.OBSERVA);
			setDesSub(response.PORDESSUGERIDO);
			setStockMin(response.STOCKMI);
			setStockMax(response.STOCKMA);
			setPvp(response.PVP);
			setCodProvi(response.CODPROV);
			setUtilVenta(response.PORUTIVENTA);
			setUtilMin(response.PORUTI);
		}
		GetProductos();
		getCategoria();
		getFamilia();
		getLinea();
		getMarca();
		getPresentacion();
		getProveedor();
	}, [codigoProduct]);
	return (
		<FusePageCarded
			classes={{
				toolbar: 'p-0',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={
				<>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
							width: '100%'
						}}
					>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'start'
							}}
						>
							<Button
								color="primary"
								variant="contained"
								// href="/productos"
								onClick={() => {
									props.history.replace(`/productos`);
								}}
								startIcon={<KeyboardReturn />}
								style={{ minWidth: '150px', textDecoration: 'none', color: 'white' }}
							>
								Productos
							</Button>
							<div className="none">
								<ShoppingBasket style={{ fontWeight: 'bold', fontSize: '4rem' }} />
								<h2 style={headers}>Editar Producto</h2>
							</div>
						</div>
						<form onSubmit={OnSubmit}>
							<Button
								color="primary"
								style={{
									background: '#40EDF7',
									minWidth: '150px',
									textDecoration: 'none',
									color: 'black'
								}}
								type="submit"
								variant="contained"
								// href="/nuevoproducto"
								startIcon={<Save />}
							>
								Guardar
							</Button>
						</form>
					</div>
				</>
			}
			contentToolbar={
				<Tabs
					value={tabValue}
					onChange={handleTabChange}
					indicatorColor="primary"
					textColor="primary"
					variant="fullWidth"
					scrollButtons="auto"
					classes={{ root: 'w-full h-64' }}
				>
					<Tab className="h-64" label="Datos Basicos" />
					<Tab className="h-64" label="Complementarios" />
					{/* <Tab className="h-64" label="Pricing" />
					<Tab className="h-64" label="Inventory" />
					<Tab className="h-64" label="Shipping" /> */}
				</Tabs>
			}
			content={
				<>
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
								justifyContent: 'center',
								alignItems: 'center'
							}}
						>
							<Box mx="auto">
								<CircularProgress style={{ color: '#2196F3' }} />
							</Box>
						</Box>
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
					{/* Modal marca */}
					<Modal
						open={openmar}
						onClose={handleCloseMar}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
						closeAfterTransition
						BackdropComponent={Backdrop}
						BackdropProps={{
							timeout: 500
						}}
					>
						<Fade in={openmar}>
							<Box sx={stylemodal}>
								<div>
									<h2 style={{ margin: '1rem', fontWeight: 'bold' }}>Seleccione Marca</h2>
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
												label="Buscar Marca"
												variant="outlined"
												onChange={e => handlesetBuscarMar(e)}
												value={buscarmar}
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
											onRowClick={e => onSelectMar(e)}
											rows={rowssmar}
											columns={columnsmar}
											getRowId={rows => rows.CODIGO}
										/>
									</div>
								</Box>
							</Box>
						</Fade>
					</Modal>
					{/* Modal presentacion */}
					<Modal
						open={openpress}
						onClose={handleClosePress}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
						closeAfterTransition
						BackdropComponent={Backdrop}
						BackdropProps={{
							timeout: 500
						}}
					>
						<Fade in={openpress}>
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
												label="Buscar Presentacion"
												variant="outlined"
												onChange={e => handlesetBuscarPress(e)}
												value={buscarpress}
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
											onRowClick={e => onSelectPress(e)}
											rows={rowsspress}
											columns={columnspress}
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
									<h2 style={{ margin: '1rem', fontWeight: 'bold' }}>Seleccione Proveedor</h2>
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
					<div className="p-16 sm:p-24 max-w-2xl">
						<div className={tabValue !== 0 ? 'hidden' : ''}>
							<Grid container spacing={1} alignItems="center">
								{/* Codigo del producto */}
								<Grid item xl={1} lg={1} md={1} sm={3} xs={6}>
									<TextField
										fullWidth
										size="small"
										type="text"
										label="Codigo"
										variant="outlined"
										onChange={e => handleCodprod(e)}
										value={codprod}
										InputProps={{
											readOnly: true
										}}
									/>
								</Grid>
								{/* codigo de barra */}
								<Grid item xl={2} lg={2} md={2} sm={9} xs={6}>
									<TextField
										fullWidth
										size="small"
										type="text"
										label="Codigo de barra"
										variant="outlined"
										onChange={e => handleBarra(e)}
										value={codbarra}
									/>
								</Grid>
								{/* Nombre */}
								<Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
									<TextField
										error={faltadato}
										fullWidth
										size="small"
										type="text"
										label="Nombre"
										variant="outlined"
										onChange={e => handleNombre(e)}
										value={nombre}
									/>
								</Grid>
								{/* descripcion */}
								<Grid item xl={3} lg={3} md={3} sm={6} xs={12}>
									<TextField
										fullWidth
										size="small"
										type="text"
										label="Descripcion"
										variant="outlined"
										onChange={e => handleDescripcion(e)}
										value={descripcion}
									/>
								</Grid>
								{/* estado */}
								<Grid item xl={2} lg={2} md={2} sm={12} xs={12}>
									<TextField
										select
										size="small"
										variant="outlined"
										fullWidth
										value={estado}
										label="Estado"
										onChange={handleEstado}
									>
										<MenuItem value="A">Activo</MenuItem>
										<MenuItem value="N">Inactivo</MenuItem>
									</TextField>
								</Grid>
								<Grid
									container
									item
									xl={6}
									lg={6}
									md={12}
									sm={12}
									xs={12}
									direction="column"
									spacing={1}
								>
									{/* Categoria */}
									<Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
										<InputLabel> Categoria </InputLabel>
									</Grid>
									<Grid container item xl={12} lg={12} md={12} sm={12} xs={12} spacing={1}>
										<Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
											<TextField
												error={faltadato}
												fullWidth
												size="small"
												type="text"
												label="Codigo"
												variant="outlined"
												onChange={e => handleCodCat(e)}
												value={codcat}
												InputProps={{
													readOnly: true,
													endAdornment: (
														<InputAdornment position="end">
															<IconButton onClick={handleOpenCat} size="small">
																<SearchOutlined />
															</IconButton>
														</InputAdornment>
													)
												}}
											/>
										</Grid>
										<Grid item xl={9} lg={9} md={9} sm={12} xs={12}>
											<TextField
												error={faltadato}
												fullWidth
												size="small"
												type="text"
												label="Nombre"
												variant="outlined"
												onChange={e => handleNomCat(e)}
												value={nomcat}
												InputProps={{
													readOnly: true
												}}
											/>
										</Grid>
									</Grid>
									{/* Familia */}
									<Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
										<InputLabel> Familia </InputLabel>
									</Grid>
									<Grid container item xl={12} lg={12} md={12} sm={12} xs={12} spacing={1}>
										<Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
											<TextField
												error={faltadato}
												fullWidth
												size="small"
												type="text"
												label="Codigo"
												variant="outlined"
												onChange={e => handleCodFam(e)}
												value={codfam}
												InputProps={{
													readOnly: true,
													endAdornment: (
														<InputAdornment position="end">
															<IconButton
																onClick={handleOpenFam}
																size="small"
																disabled={elijecat}
															>
																<SearchOutlined />
															</IconButton>
														</InputAdornment>
													)
												}}
											/>
										</Grid>
										<Grid item xl={9} lg={9} md={9} sm={12} xs={12}>
											<TextField
												error={faltadato}
												fullWidth
												size="small"
												type="text"
												label="Nombre"
												variant="outlined"
												onChange={e => handleNomFam(e)}
												value={nomfam}
												InputProps={{
													readOnly: true
												}}
											/>
										</Grid>
									</Grid>

									{/* linea */}
									<Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
										<InputLabel> Linea </InputLabel>
									</Grid>
									<Grid container item xl={12} lg={12} md={12} sm={12} xs={12} spacing={1}>
										<Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
											<TextField
												error={faltadato}
												fullWidth
												size="small"
												type="text"
												label="Codigo"
												variant="outlined"
												onChange={e => handleCodLinea(e)}
												value={codlinea}
												InputProps={{
													readOnly: true,
													endAdornment: (
														<InputAdornment position="end">
															<IconButton
																onClick={handleOpenLin}
																size="small"
																disabled={elijecat}
															>
																<SearchOutlined />
															</IconButton>
														</InputAdornment>
													)
												}}
											/>
										</Grid>
										<Grid item xl={9} lg={9} md={9} sm={12} xs={12}>
											<TextField
												error={faltadato}
												fullWidth
												size="small"
												type="text"
												label="Nombre"
												variant="outlined"
												onChange={e => handleNomLinea(e)}
												value={nomlinea}
												InputProps={{
													readOnly: true
												}}
											/>
										</Grid>
									</Grid>
								</Grid>

								<Grid
									container
									item
									xl={6}
									lg={6}
									md={12}
									sm={12}
									xs={12}
									direction="column"
									spacing={1}
								>
									<Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
										<InputLabel> Marca </InputLabel>
									</Grid>
									<Grid container item xl={12} lg={12} md={12} sm={12} xs={12} spacing={1}>
										{/* marca */}
										<Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
											<TextField
												error={faltadato}
												fullWidth
												size="small"
												type="text"
												label="Codigo"
												variant="outlined"
												onChange={e => handleCodMarca(e)}
												value={codmarca}
												InputProps={{
													readOnly: true,
													endAdornment: (
														<InputAdornment position="end">
															<IconButton onClick={handleOpenMar} size="small">
																<SearchOutlined />
															</IconButton>
														</InputAdornment>
													)
												}}
											/>
										</Grid>
										<Grid item xl={9} lg={9} md={9} sm={12} xs={12}>
											<TextField
												error={faltadato}
												fullWidth
												size="small"
												type="text"
												label="Nombre"
												variant="outlined"
												onChange={e => handleNomMarca(e)}
												value={nommarca}
												InputProps={{
													readOnly: true
												}}
											/>
										</Grid>
									</Grid>
									<Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
										<InputLabel> Presentacion </InputLabel>
									</Grid>
									<Grid container item xl={12} lg={12} md={12} sm={12} xs={12} spacing={1}>
										{/* Presentacion */}
										<Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
											<TextField
												error={faltadato}
												fullWidth
												size="small"
												type="text"
												label="Codigo"
												variant="outlined"
												onChange={e => handleCodPress(e)}
												value={codpress}
												InputProps={{
													readOnly: true,
													endAdornment: (
														<InputAdornment position="end">
															<IconButton onClick={handleOpenPress} size="small">
																<SearchOutlined />
															</IconButton>
														</InputAdornment>
													)
												}}
											/>
										</Grid>
										<Grid item xl={9} lg={9} md={9} sm={12} xs={12}>
											<TextField
												error={faltadato}
												fullWidth
												size="small"
												type="text"
												label="Nombre"
												variant="outlined"
												onChange={e => handleNomPress(e)}
												value={nompress}
												InputProps={{
													readOnly: true
												}}
											/>
										</Grid>
									</Grid>
									<Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
										<InputLabel> Proveedor </InputLabel>
									</Grid>
									<Grid container item xl={12} lg={12} md={12} sm={12} xs={12} spacing={1}>
										{/* Proveedor */}
										<Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
											<TextField
												error={faltadato}
												fullWidth
												size="small"
												type="text"
												label="Codigo"
												variant="outlined"
												onChange={e => handleCodProv(e)}
												value={codprov}
												InputProps={{
													readOnly: true,
													endAdornment: (
														<InputAdornment position="end">
															<IconButton onClick={handleOpenProv} size="small">
																<SearchOutlined />
															</IconButton>
														</InputAdornment>
													)
												}}
											/>
										</Grid>
										<Grid item xl={9} lg={9} md={9} sm={12} xs={12}>
											<TextField
												error={faltadato}
												fullWidth
												size="small"
												type="text"
												label="Nombre"
												variant="outlined"
												onChange={e => handleNomProv(e)}
												value={nomprov}
												InputProps={{
													readOnly: true
												}}
											/>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</div>

						<div className={tabValue !== 1 ? 'hidden' : ''}>
							<Grid container spacing={1} alignItems="center">
								<Grid container item xl={6} lg={6} md={6} sm={6} xs={12} spacing={1} direction="column">
									<Grid item>
										<TextField
											error={faltadato}
											fullWidth
											size="small"
											type="number"
											label="Factor por caja"
											variant="outlined"
											onChange={e => handleFactor(e)}
											value={factor}
											InputProps={{ inputProps: { min: 0 }, readOnly: mfactor }}
										/>
									</Grid>
									<Grid item>
										<TextField
											error={faltadato}
											fullWidth
											size="small"
											type="number"
											label="Peso (gms)"
											variant="outlined"
											onChange={e => handlePeso(e)}
											value={peso}
											InputProps={{ inputProps: { min: 0 } }}
										/>
									</Grid>
									<Grid item>
										<TextField
											error={faltadato}
											fullWidth
											size="small"
											type="number"
											label="Volumen (cm3)"
											variant="outlined"
											onChange={e => handleVol(e)}
											value={vol}
											InputProps={{ inputProps: { min: 0 } }}
										/>
									</Grid>
								</Grid>
								<Grid container item xl={6} lg={6} md={6} sm={6} xs={12}>
									<Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
										<FormControl>
											<FormControlLabel
												control={
													<Checkbox
														size="small"
														name="estadp"
														checked={disven}
														onChange={handlesetDisVen}
													/>
												}
												label="Disponible para la venta"
											/>
										</FormControl>
									</Grid>
									<Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
										<FormControl>
											<FormControlLabel
												control={
													<Checkbox
														size="small"
														name="estadp"
														checked={grabaiva}
														onChange={handlesetGrabaIva}
													/>
												}
												label="Graba Iva"
											/>
										</FormControl>
									</Grid>
									<Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
										<FormControl>
											<FormControlLabel
												control={
													<Checkbox
														size="small"
														name="estadp"
														checked={itemcom}
														onChange={handlesetItemCom}
													/>
												}
												label="Item - Combo"
											/>
										</FormControl>
									</Grid>
									<Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
										<FormControl>
											<FormControlLabel
												control={
													<Checkbox
														size="small"
														name="estadp"
														checked={itemre}
														onChange={handlesetItemRe}
													/>
												}
												label="Item - Regalo"
											/>
										</FormControl>
									</Grid>
									<Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
										<FormControl>
											<FormControlLabel
												control={
													<Checkbox
														size="small"
														name="estadp"
														checked={prodespe}
														onChange={handlesetProdEsp}
													/>
												}
												label="Producto Especial"
											/>
										</FormControl>
									</Grid>
									<Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
										<FormControl>
											<FormControlLabel
												control={
													<Checkbox
														size="small"
														name="estadp"
														checked={solopos}
														onChange={handlesetSoloPos}
													/>
												}
												label="Solo para POS"
											/>
										</FormControl>
									</Grid>
									<Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
										<FormControl>
											<FormControlLabel
												control={
													<Checkbox
														size="small"
														name="estadp"
														checked={prodserie}
														onChange={handlesetProdSerie}
													/>
												}
												label="Producto con Serie"
											/>
										</FormControl>
									</Grid>
									<Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
										<FormControl>
											<FormControlLabel
												control={
													<Checkbox
														size="small"
														name="estadp"
														checked={prodtran}
														onChange={handlesetProdTran}
													/>
												}
												label="Producto transporte"
											/>
										</FormControl>
									</Grid>
								</Grid>
								<Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
									<TextField
										// error={faltadato}
										fullWidth
										size="small"
										type="text"
										label="Observacion"
										variant="outlined"
										onChange={e => handlesetObserva(e)}
										value={observa}
									/>
								</Grid>
								<Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
									<TextField
										error={faltadato}
										fullWidth
										size="small"
										type="number"
										label="% des sug adicional"
										variant="outlined"
										onChange={e => handlesetDesSub(e)}
										value={dessub}
										InputProps={{ inputProps: { min: 0 } }}
									/>
								</Grid>
								{/* sotck */}
								<Grid item xl={2} lg={2} md={6} sm={6} xs={6}>
									<TextField
										error={faltadato}
										fullWidth
										size="small"
										type="number"
										label="Stock minimo"
										variant="outlined"
										onChange={e => handlesetStockMin(e)}
										value={stockmin}
										InputProps={{ inputProps: { min: 0 } }}
									/>
								</Grid>
								<Grid item xl={2} lg={2} md={6} sm={6} xs={6}>
									<TextField
										error={faltadato}
										fullWidth
										size="small"
										type="number"
										label="Stock maximo"
										variant="outlined"
										onChange={e => handlesetStockMax(e)}
										value={stockmax}
										InputProps={{ inputProps: { min: 0 } }}
									/>
								</Grid>
								<Grid item xl={2} lg={2} md={6} sm={6} xs={6}>
									<TextField
										error={faltadato}
										fullWidth
										size="small"
										type="number"
										label="PVP"
										variant="outlined"
										onChange={e => handlesetPvp(e)}
										value={pvp}
										InputProps={{ inputProps: { min: 0 } }}
									/>
								</Grid>
								<Grid item xl={2} lg={2} md={6} sm={6} xs={6}>
									<TextField
										error={faltadato}
										fullWidth
										size="small"
										type="text"
										label="Cod Proveedor"
										variant="outlined"
										onChange={e => handlesetCodProvi(e)}
										value={codprovi}
									/>
								</Grid>
								<Grid item xl={2} lg={2} md={6} sm={6} xs={6}>
									<TextField
										error={faltadato}
										fullWidth
										size="small"
										type="number"
										label="% util venta"
										variant="outlined"
										onChange={e => handlesetUtilVenta(e)}
										value={utilventa}
										InputProps={{ inputProps: { min: 0 } }}
									/>
								</Grid>
								<Grid item xl={2} lg={2} md={6} sm={6} xs={6}>
									<TextField
										error={faltadato}
										fullWidth
										size="small"
										type="number"
										label="% utilidad minimo"
										variant="outlined"
										onChange={e => handlesetUtilMin(e)}
										value={utilmin}
										InputProps={{ inputProps: { min: 0 } }}
									/>
								</Grid>
							</Grid>
						</div>

						{/* <div className={tabValue !== 2 ? 'hidden' : ''}>hace</div>

						<div className={tabValue !== 3 ? 'hidden' : ''}>ss</div>

						<div className={tabValue !== 4 ? 'hidden' : ''}>eee</div> */}
					</div>
				</>
			}
			innerScroll
		/>
	);
}

export default EditProduct;
