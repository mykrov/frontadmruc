import * as React from 'react';
import axios from 'axios';
import { Box, Grid, Button, ButtonGroup, CircularProgress, Modal, Fade, Backdrop } from '@material-ui/core';
import { showMessage } from 'app/store/fuse/messageSlice';
import { useDispatch } from 'react-redux';
// import ButtonGroup from '@mui/material/ButtonGroup';
import FusePageCarded from '@fuse/core/FusePageCarded';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { DataGrid } from '@mui/x-data-grid';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { FindReplaceOutlined, ExpandMore } from '@material-ui/icons';
import Typography from '@mui/material/Typography';
import { printExcel, stylemodal } from 'app/main/comdistrib/styles';
import SetPrecio from '../comdistrib/opcambios';
import ListaEmpresa from '../comdistrib/listaempresa';
import OpcionIncremento from '../comdistrib/opincrem';
// eslint-disable-next-line import/no-cycle
import GrabaCambio from '../comdistrib/grabacambio';

// const serverapi = 'http://181.198.213.18:3302/api/grabartippoticket';// servicio
const serverapi = process.env.REACT_APP_SERVERAPI; // SERVICIO
const serverapi3 = process.env.REACT_APP_SERVERAPI; // SERVICIO
const options = { headers: { 'Access-Control-Allow-Origin': '*' } }; // cors
// document.body.style.overflowY = 'hidden';

// FUNCION PRINCIPAL
function AjustePrecio(props) {
	const dispatch = useDispatch();
	// PARA IMPRIMIR EXCEL
	const Excel = listaexcel => {
		if (listaexcel.length > 0) {
			// ${`${data.fi} a ${data.ff} ${data.hri} a ${data.hrf}`}
			printExcel(listaexcel, `Informe de ajuste de precios`);
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
	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2
	});
	const columns = [
		{
			field: 'ITEM',
			headerName: 'Codigo',
			width: 90,
			headerClassName: 'columnclass',
			sortable: false,
			disableColumnMenu: true
		},
		{
			field: 'NOMBRE',
			headerName: 'Nombre',
			width: 180,
			headerClassName: 'columnclass',
			sortable: false,
			disableColumnMenu: true
		},
		{
			field: 'IVA',
			headerName: 'Iva',
			width: 50,
			headerClassName: 'columnclass',
			sortable: false,
			disableColumnMenu: true
		},
		{
			field: 'COSTOP',
			headerName: 'Costo',
			width: 75,
			headerClassName: 'columnclass',
			sortable: false,
			disableColumnMenu: true,
			valueFormatter: ({ value }) => formatter.format(value)
		},
		{
			field: 'PRECIO1',
			headerName: 'Precio 1',
			width: 80,
			headerClassName: 'columnclass',
			sortable: false,
			disableColumnMenu: true,
			valueFormatter: ({ value }) => formatter.format(value)
		},
		{
			field: 'INC1',
			headerName: '%Inc1',
			width: 80,
			headerClassName: 'columnclass',
			sortable: false,
			disableColumnMenu: true,
			editable: true,
			type: 'number'
		},
		{
			field: 'NEWPRE1',
			headerName: 'Nuev-Pre 1',
			width: 120,
			headerClassName: 'columnclass',
			sortable: false,
			disableColumnMenu: true,
			valueFormatter: ({ value }) => formatter.format(value),
			editable: true,
			type: 'number'
		},
		{
			field: 'PRECIO2',
			headerName: 'Precio 2',
			width: 80,
			sortable: false,
			disableColumnMenu: true,
			headerClassName: 'columnclass',
			valueFormatter: ({ value }) => formatter.format(value)
		},
		{
			field: 'INC2',
			headerName: '%Inc2',
			width: 80,
			headerClassName: 'columnclass',
			sortable: false,
			disableColumnMenu: true,
			editable: true,
			type: 'number'
		},
		{
			field: 'NEWPRE2',
			headerName: 'Nuev-Pre 2',
			width: 120,
			headerClassName: 'columnclass',
			sortable: false,
			disableColumnMenu: true,
			valueFormatter: ({ value }) => formatter.format(value),
			editable: true,
			type: 'number'
		},
		{
			field: 'PRECIO3',
			headerName: 'Precio 3',
			width: 80,
			headerClassName: 'columnclass',
			sortable: false,
			disableColumnMenu: true,
			valueFormatter: ({ value }) => formatter.format(value)
		},
		{
			field: 'INC3',
			headerName: '%Inc3',
			width: 80,
			headerClassName: 'columnclass',
			editable: true,
			sortable: false,
			disableColumnMenu: true,
			type: 'number'
		},
		{
			field: 'NEWPRE3',
			headerName: 'Nuev-Pre 3',
			width: 120,
			headerClassName: 'columnclass',
			sortable: false,
			disableColumnMenu: true,
			valueFormatter: ({ value }) => formatter.format(value),
			editable: true,
			type: 'number'
		},
		{
			field: 'PRECIO4',
			headerName: 'Precio 4',
			width: 80,
			headerClassName: 'columnclass',
			sortable: false,
			disableColumnMenu: true,
			valueFormatter: ({ value }) => formatter.format(value)
		},
		{
			field: 'INC4',
			headerName: '%Inc4',
			width: 80,
			headerClassName: 'columnclass',
			sortable: false,
			disableColumnMenu: true,
			editable: true,
			type: 'number'
		},
		{
			field: 'NEWPRE4',
			headerName: 'Nuev-Pre 4',
			width: 120,
			headerClassName: 'columnclass',
			sortable: false,
			disableColumnMenu: true,
			valueFormatter: ({ value }) => formatter.format(value),
			editable: true,
			type: 'number'
		},
		{
			field: 'PRECIO5',
			headerName: 'Precio 5',
			width: 80,
			headerClassName: 'columnclass',
			sortable: false,
			disableColumnMenu: true,
			valueFormatter: ({ value }) => formatter.format(value)
		},
		{
			field: 'INC5',
			headerName: '%Inc5',
			width: 80,
			headerClassName: 'columnclass',
			sortable: false,
			disableColumnMenu: true,
			editable: true,
			type: 'number'
		},
		{
			field: 'NEWPRE5',
			headerName: 'Nuev-Pre 5',
			width: 120,
			headerClassName: 'columnclass',
			sortable: false,
			disableColumnMenu: true,
			valueFormatter: ({ value }) => formatter.format(value),
			editable: true,
			type: 'number'
		}
	];
	// FILAS INICIALES
	// const [rowss, setItems] = React.useState([]);
	const [value, setValue] = React.useState(0);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	// hook donde se mandaran los datos para filtrar
	const [data, setdata] = React.useState({
		opfilter: '',
		coditem: '',
		codcat: '',
		codfam: '',
		codlim: '',
		codprov: '',
		opinc: '',
		porcen: 0,
		chpvp: [],
		empresas: [],
		isnew: false,
		tab: []
	});
	// Limpiar los datos
	// metodo de busqueda => datos a mostrar en la tabla
	// const [listac, setListac] = React.useState([]);
	const DataView = async () => {
		let listaitems = [];
		let response = await axios(`${serverapi}/itemsTodos`, options);
		response = response.data.items;
		if (data.opfilter === 'item') {
			listaitems = response.filter(it => {
				if (it.IVA === 'S') {
					it.COSTOP = parseFloat(it.COSTOP) * iva + parseFloat(it.COSTOP);
					it.PRECIO1 = parseFloat(it.PRECIO1) * iva + parseFloat(it.PRECIO1);
					it.PRECIO2 = parseFloat(it.PRECIO2) * iva + parseFloat(it.PRECIO2);
					it.PRECIO3 = parseFloat(it.PRECIO3) * iva + parseFloat(it.PRECIO3);
					it.PRECIO4 = parseFloat(it.PRECIO4) * iva + parseFloat(it.PRECIO4);
					it.PRECIO5 = parseFloat(it.PRECIO5) * iva + parseFloat(it.PRECIO5);
				}
				// console.log(it.PRECIO1);
				return it.ITEM.trim() === data.coditem.trim();
			});
		}
		if (data.opfilter === 'grupo') {
			listaitems = response.filter(gp => {
				if (gp.IVA === 'S') {
					gp.COSTOP = parseFloat(gp.COSTOP) * iva + parseFloat(gp.COSTOP);
					gp.PRECIO1 = parseFloat(gp.PRECIO1) * iva + parseFloat(gp.PRECIO1);
					gp.PRECIO2 = parseFloat(gp.PRECIO2) * iva + parseFloat(gp.PRECIO2);
					gp.PRECIO3 = parseFloat(gp.PRECIO3) * iva + parseFloat(gp.PRECIO3);
					gp.PRECIO4 = parseFloat(gp.PRECIO4) * iva + parseFloat(gp.PRECIO4);
					gp.PRECIO5 = parseFloat(gp.PRECIO5) * iva + parseFloat(gp.PRECIO5);
				}
				return (
					gp.CATEGORIA.trim() === data.codcat.trim() ||
					gp.FAMILIA.trim() === data.codfam.trim() ||
					gp.LINEA.trim() === data.codlim.trim()
				);
			});
		}
		if (data.opfilter === 'itemprov') {
			listaitems = response.filter(ip => {
				if (ip.IVA === 'S') {
					ip.COSTOP = parseFloat(ip.COSTOP) * iva + parseFloat(ip.COSTOP);
					ip.PRECIO1 = parseFloat(ip.PRECIO1) * iva + parseFloat(ip.PRECIO1);
					ip.PRECIO2 = parseFloat(ip.PRECIO2) * iva + parseFloat(ip.PRECIO2);
					ip.PRECIO3 = parseFloat(ip.PRECIO3) * iva + parseFloat(ip.PRECIO3);
					ip.PRECIO4 = parseFloat(ip.PRECIO4) * iva + parseFloat(ip.PRECIO4);
					ip.PRECIO5 = parseFloat(ip.PRECIO5) * iva + parseFloat(ip.PRECIO5);
				}
				return ip.PROVEEDOR.trim() === data.codprov.trim();
			});
		}
		listaitems.forEach(ad => {
			ad.INC1 = 0;
			ad.NEWPRE1 = 0;
			ad.INC2 = 0;
			ad.NEWPRE2 = 0;
			ad.INC3 = 0;
			ad.NEWPRE3 = 0;
			ad.INC4 = 0;
			ad.NEWPRE4 = 0;
			ad.INC5 = 0;
			ad.NEWPRE5 = 0;
		});
		// console.log('mira', listaitems);
		// data.tab = listaitems;
		setdata({ tab: listaitems });
		// setItems(listaitems);
		// setListac(listaitems);
	};
	// console.log(data.tab);
	// metodo para calcular los nuevos precios
	const CalNewPvp = () => {
		// console.log(data);
		const newlist = data.tab;
		newlist.forEach(r => {
			// r.INC5 = data.porcen;
			data.chpvp.forEach(ch => {
				// r.INC5 = data.porcen;
				if (ch === 'Precio 1') {
					r.INC1 = data.porcen;
					if (data.opinc === 'costo') {
						r.NEWPRE1 = parseFloat(r.COSTOP) * (parseFloat(data.porcen) / 100) + parseFloat(r.COSTOP);
					}
					if (data.opinc === 'precio') {
						r.NEWPRE1 = parseFloat(r.PRECIO1) * (parseFloat(data.porcen) / 100) + parseFloat(r.PRECIO1);
					}
				}
				if (ch === 'Precio 2') {
					r.INC2 = data.porcen;
					if (data.opinc === 'costo') {
						r.NEWPRE2 = parseFloat(r.COSTOP) * (parseFloat(data.porcen) / 100) + parseFloat(r.COSTOP);
					}
					if (data.opinc === 'precio') {
						r.NEWPRE2 = parseFloat(r.PRECIO2) * (parseFloat(data.porcen) / 100) + parseFloat(r.PRECIO2);
					}
				}
				if (ch === 'Precio 3') {
					r.INC3 = data.porcen;
					if (data.opinc === 'costo') {
						r.NEWPRE3 = parseFloat(r.COSTOP) * (parseFloat(data.porcen) / 100) + parseFloat(r.COSTOP);
					}
					if (data.opinc === 'precio') {
						r.NEWPRE3 = parseFloat(r.PRECIO3) * (parseFloat(data.porcen) / 100) + parseFloat(r.PRECIO3);
					}
				}
				if (ch === 'Precio 4') {
					r.INC4 = data.porcen;
					if (data.opinc === 'costo') {
						r.NEWPRE4 = parseFloat(r.COSTOP) * (parseFloat(data.porcen) / 100) + parseFloat(r.COSTOP);
					}
					if (data.opinc === 'precio') {
						r.NEWPRE4 = parseFloat(r.PRECIO4) * (parseFloat(data.porcen) / 100) + parseFloat(r.PRECIO4);
					}
				}
				if (ch === 'Precio 5') {
					r.INC5 = data.porcen;
					if (data.opinc === 'costo') {
						r.NEWPRE5 = parseFloat(r.COSTOP) * (parseFloat(data.porcen) / 100) + parseFloat(r.COSTOP);
					}
					if (data.opinc === 'precio') {
						r.NEWPRE5 = parseFloat(r.PRECIO5) * (parseFloat(data.porcen) / 100) + parseFloat(r.PRECIO5);
					}
				}
			});
		});
		// console.log(listaitems);
		// setListac(newlist);
		// console.log('mira esto importante', newlist);
		// data.tab = newlist;
		// data.tab = newlist;
		setdata({ tab: newlist });
		// setItems(newlist);
		// setItems(newlist);
	};
	// obtiene el iva
	const [iva, setIva] = React.useState(0.12);
	// MODAL DE CARGANDO
	const [open1, setOpen1] = React.useState(false);
	const handleOpen1 = () => setOpen1(true);
	const handleClose1 = () => setOpen1(false);
	const onSubmit = async e => {
		e.preventDefault();
		// console.log(data);
		// almacena las empresa a enviar
		const newlist = [];
		// almacena los precios
		const newlist2 = [];
		let response = await axios(`${serverapi}/itemsTodos`, options);
		response = response.data.empresas;
		response.forEach(emp => {
			data.empresas.forEach(le => {
				if (emp.NOMBRE === le) {
					newlist.push({ ID: emp.ID });
				}
			});
		});
		data.tab.forEach(s => {
			newlist2.push({
				codigo: s.ITEM,
				precio1: s.NEWPRE1 / (1 + iva),
				precio2: s.NEWPRE2 / (1 + iva),
				precio3: s.NEWPRE3 / (1 + iva),
				precio4: s.NEWPRE4 / (1 + iva),
				precio5: s.NEWPRE5 / (1 + iva)
			});
			// console.log(s.NEWPRE1 / (1 + iva));
		});
		// console.log(newlist);
		// console.log(newlist2);
		if (newlist.length > 0 && newlist2.length > 0) {
			axios(
				{
					url: `${serverapi3}/ajustepre`,
					method: 'POST',
					data: {
						empresas: newlist,
						items: newlist2
					},
					options
				},
				handleOpen1()
			)
				.then(res => {
					const resp = res.data;
					if (resp.status === 'ok') {
						dispatch(
							showMessage({
								message: `Ajuste de precios efectuados correctamente`,
								variant: 'success',
								autoHideDuration: 5000,
								anchorOrigin: {
									vertical: 'top', // top bottom
									horizontal: 'center' // left center right
								}
							})
						);
						handleClose1();
						setdata({ tab: [] });
					} else {
						dispatch(
							showMessage({
								message: `Error al efectuar los ajustes de precios`,
								variant: 'error',
								autoHideDuration: 5000,
								anchorOrigin: {
									vertical: 'top', // top bottom
									horizontal: 'center' // left center right
								}
							})
						);
						handleClose1();
					}
				})
				.catch(err => {
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
					message: `Las empresas o los precios estan vacios`,
					variant: 'error',
					autoHideDuration: 5000,
					anchorOrigin: {
						vertical: 'top', // top bottom
						horizontal: 'center' // left center right
					}
				})
			);
			handleClose1();
		}
	};
	const Prueba2 = e => {
		// console.log('inicio', e);
		if (typeof e.value === 'undefined' || e.value === null) {
			e.value = 0;
		}
		let newlist = []; // alamcena el valor cambiado
		let nl; // lista a enviar
		// PRECIO
		if (data.opinc === 'precio') {
			// incrementar por porcentaje el pvp
			if (e.field === 'INC1') {
				newlist = data.tab.filter(ni => {
					return ni.ITEM === e.id;
				});
				newlist.forEach(i1 => {
					i1.NEWPRE1 = parseFloat(i1.PRECIO1) * (parseFloat(e.value) / 100) + parseFloat(i1.PRECIO1);
					i1.INC1 = e.value;
				});
				nl = newlist.concat(data.tab);
				nl.shift(0);
				// console.log('mira esto', nl);
				// setdata({ tab: nl });
				setdata({ tab: nl });
			}
			if (e.field === 'INC2') {
				newlist = data.tab.filter(ni => {
					return ni.ITEM === e.id;
				});
				newlist.forEach(i1 => {
					i1.NEWPRE2 = parseFloat(i1.PRECIO2) * (parseFloat(e.value) / 100) + parseFloat(i1.PRECIO2);
					i1.INC2 = e.value;
				});
				nl = newlist.concat(data.tab);
				nl.shift(0);
				setdata({ tab: nl });
			}
			if (e.field === 'INC3') {
				newlist = data.tab.filter(ni => {
					return ni.ITEM === e.id;
				});
				newlist.forEach(i1 => {
					i1.NEWPRE3 = parseFloat(i1.PRECIO3) * (parseFloat(e.value) / 100) + parseFloat(i1.PRECIO3);
					i1.INC3 = e.value;
				});
				nl = newlist.concat(data.tab);
				nl.shift(0);
				setdata({ tab: nl });
			}
			if (e.field === 'INC4') {
				newlist = data.tab.filter(ni => {
					return ni.ITEM === e.id;
				});
				newlist.forEach(i1 => {
					i1.NEWPRE4 = parseFloat(i1.PRECIO4) * (parseFloat(e.value) / 100) + parseFloat(i1.PRECIO4);
					i1.INC4 = e.value;
				});
				nl = newlist.concat(data.tab);
				nl.shift(0);
				setdata({ tab: nl });
			}
			if (e.field === 'INC5') {
				newlist = data.tab.filter(ni => {
					return ni.ITEM === e.id;
				});
				newlist.forEach(i1 => {
					i1.NEWPRE5 = parseFloat(i1.PRECIO5) * (parseFloat(e.value) / 100) + parseFloat(i1.PRECIO5);
					i1.INC5 = e.value;
				});
				nl = newlist.concat(data.tab);
				nl.shift(0);
				setdata({ tab: nl });
			}
			// hallar el porcentaje
			if (e.field === 'NEWPRE1') {
				newlist = data.tab.filter(ni => {
					return ni.ITEM === e.id;
				});
				newlist.forEach(i1 => {
					let v = e.value / parseFloat(i1.PRECIO1);
					// eslint-disable-next-line no-restricted-globals
					v = Number.POSITIVE_INFINITY === v || Number.NEGATIVE_INFINITY === v || isNaN(v) === true ? 0 : v;
					// console.log('mira', v);
					i1.INC1 = (v - 1) * 100;
					i1.NEWPRE1 = e.value;
				});
				nl = newlist.concat(data.tab);
				nl.shift(0);
				setdata({ tab: nl });
			}
			if (e.field === 'NEWPRE2') {
				newlist = data.tab.filter(ni => {
					return ni.ITEM === e.id;
				});
				newlist.forEach(i1 => {
					let v = e.value / parseFloat(i1.PRECIO2);
					// console.log('mira', Number.POSITIVE_INFINITY === v);
					// eslint-disable-next-line no-restricted-globals
					v = Number.POSITIVE_INFINITY === v || Number.NEGATIVE_INFINITY === v || isNaN(v) === true ? 0 : v;
					// console.log('mira', v);
					i1.INC2 = (v - 1) * 100;
					i1.NEWPRE2 = e.value;
				});
				nl = newlist.concat(data.tab);
				nl.shift(0);
				setdata({ tab: nl });
			}
			if (e.field === 'NEWPRE3') {
				newlist = data.tab.filter(ni => {
					return ni.ITEM === e.id;
				});
				newlist.forEach(i1 => {
					let v = e.value / parseFloat(i1.PRECIO3);
					// eslint-disable-next-line no-restricted-globals
					v = Number.POSITIVE_INFINITY === v || Number.NEGATIVE_INFINITY === v || isNaN(v) === true ? 0 : v;
					i1.INC3 = (v - 1) * 100;
					i1.NEWPRE3 = e.value;
				});
				nl = newlist.concat(data.tab);
				nl.shift(0);
				setdata({ tab: nl });
			}
			if (e.field === 'NEWPRE4') {
				newlist = data.tab.filter(ni => {
					return ni.ITEM === e.id;
				});
				newlist.forEach(i1 => {
					let v = e.value / parseFloat(i1.PRECIO4);
					// eslint-disable-next-line no-restricted-globals
					v = Number.POSITIVE_INFINITY === v || Number.NEGATIVE_INFINITY === v || isNaN(v) === true ? 0 : v;
					i1.INC4 = (v - 1) * 100;
					i1.NEWPRE4 = e.value;
				});
				nl = newlist.concat(data.tab);
				nl.shift(0);
				setdata({ tab: nl });
			}
			if (e.field === 'NEWPRE5') {
				newlist = data.tab.filter(ni => {
					return ni.ITEM === e.id;
				});
				newlist.forEach(i1 => {
					let v = e.value / parseFloat(i1.PRECIO5);
					// eslint-disable-next-line no-restricted-globals
					v = Number.POSITIVE_INFINITY === v || Number.NEGATIVE_INFINITY === v || isNaN(v) === true ? 0 : v;
					i1.INC5 = (v - 1) * 100;
					i1.NEWPRE5 = e.value;
				});
				nl = newlist.concat(data.tab);
				nl.shift(0);
				setdata({ tab: nl });
			}
		}
		// si es costo
		if (data.opinc === 'costo') {
			// incrementar por porcentaje el pvp
			if (e.field === 'INC1') {
				newlist = data.tab.filter(ni => {
					return ni.ITEM === e.id;
				});
				newlist.forEach(i1 => {
					const v = parseFloat(i1.COSTOP) * (e.value / 100) + parseFloat(i1.COSTOP);
					// eslint-disable-next-line no-restricted-globals
					i1.NEWPRE1 = isNaN(v) === true ? 0 : v;
					// console.log(i1.NEWPRE1);
					i1.INC1 = e.value;
				});
				nl = newlist.concat(data.tab);
				nl.shift(0);
				// console.log('mira esto', nl);
				setdata({ tab: nl });
			}
			if (e.field === 'INC2') {
				newlist = data.tab.filter(ni => {
					return ni.ITEM === e.id;
				});
				newlist.forEach(i1 => {
					const v = parseFloat(i1.COSTOP) * (e.value / 100) + parseFloat(i1.COSTOP);
					// eslint-disable-next-line no-restricted-globals
					i1.NEWPRE2 = isNaN(v) === true ? 0 : v;
					i1.INC2 = e.value;
				});
				nl = newlist.concat(data.tab);
				nl.shift(0);
				setdata({ tab: nl });
			}
			if (e.field === 'INC3') {
				newlist = data.tab.filter(ni => {
					return ni.ITEM === e.id;
				});
				newlist.forEach(i1 => {
					i1.NEWPRE3 = parseFloat(i1.COSTOP) * (parseFloat(e.value) / 100) + parseFloat(i1.COSTOP);
					i1.INC3 = e.value;
				});
				nl = newlist.concat(data.tab);
				nl.shift(0);
				setdata({ tab: nl });
			}
			if (e.field === 'INC4') {
				newlist = data.tab.filter(ni => {
					return ni.ITEM === e.id;
				});
				newlist.forEach(i1 => {
					i1.NEWPRE4 = parseFloat(i1.COSTOP) * (parseFloat(e.value) / 100) + parseFloat(i1.COSTOP);
					i1.INC4 = e.value;
				});
				nl = newlist.concat(data.tab);
				nl.shift(0);
				setdata({ tab: nl });
			}
			if (e.field === 'INC5') {
				newlist = data.tab.filter(ni => {
					return ni.ITEM === e.id;
				});
				newlist.forEach(i1 => {
					i1.NEWPRE5 = parseFloat(i1.COSTOP) * (parseFloat(e.value) / 100) + parseFloat(i1.COSTOP);
					i1.INC5 = e.value;
				});
				nl = newlist.concat(data.tab);
				nl.shift(0);
				setdata({ tab: nl });
			}
			// hallar el porcentaje
			if (e.field === 'NEWPRE1') {
				newlist = data.tab.filter(ni => {
					return ni.ITEM === e.id;
				});
				newlist.forEach(i1 => {
					let v = e.value / parseFloat(i1.COSTOP);
					// eslint-disable-next-line no-restricted-globals
					v = Number.POSITIVE_INFINITY === v || Number.NEGATIVE_INFINITY === v || isNaN(v) === true ? 0 : v;
					i1.INC1 = (v - 1) * 100;
					i1.NEWPRE1 = e.value;
				});
				nl = newlist.concat(data.tab);
				nl.shift(0);
				setdata({ tab: nl });
			}
			if (e.field === 'NEWPRE2') {
				newlist = data.tab.filter(ni => {
					return ni.ITEM === e.id;
				});
				newlist.forEach(i1 => {
					let v = e.value / parseFloat(i1.COSTOP);
					// eslint-disable-next-line no-restricted-globals
					v = Number.POSITIVE_INFINITY === v || Number.NEGATIVE_INFINITY === v || isNaN(v) === true ? 0 : v;
					i1.INC2 = (v - 1) * 100;
					i1.NEWPRE2 = e.value;
				});
				nl = newlist.concat(data.tab);
				nl.shift(0);
				setdata({ tab: nl });
			}
			if (e.field === 'NEWPRE3') {
				newlist = data.tab.filter(ni => {
					return ni.ITEM === e.id;
				});
				newlist.forEach(i1 => {
					let v = e.value / parseFloat(i1.COSTOP);
					// eslint-disable-next-line no-restricted-globals
					v = Number.POSITIVE_INFINITY === v || Number.NEGATIVE_INFINITY === v || isNaN(v) === true ? 0 : v;
					i1.INC3 = (v - 1) * 100;
					i1.NEWPRE3 = e.value;
				});
				nl = newlist.concat(data.tab);
				nl.shift(0);
				setdata({ tab: nl });
			}
			if (e.field === 'NEWPRE4') {
				newlist = data.tab.filter(ni => {
					return ni.ITEM === e.id;
				});
				newlist.forEach(i1 => {
					let v = e.value / parseFloat(i1.COSTOP);
					// eslint-disable-next-line no-restricted-globals
					v = Number.POSITIVE_INFINITY === v || Number.NEGATIVE_INFINITY === v || isNaN(v) === true ? 0 : v;
					i1.INC4 = (v - 1) * 100;
					i1.NEWPRE4 = e.value;
				});
				nl = newlist.concat(data.tab);
				nl.shift(0);
				setdata({ tab: nl });
			}
			if (e.field === 'NEWPRE5') {
				newlist = data.tab.filter(ni => {
					return ni.ITEM === e.id;
				});
				newlist.forEach(i1 => {
					let v = e.value / parseFloat(i1.COSTOP);
					// eslint-disable-next-line no-restricted-globals
					v = Number.POSITIVE_INFINITY === v || Number.NEGATIVE_INFINITY === v || isNaN(v) === true ? 0 : v;
					i1.INC5 = (v - 1) * 100;
					i1.NEWPRE5 = e.value;
				});
				nl = newlist.concat(data.tab);
				nl.shift(0);
				setdata({ tab: nl });
			}
		}
	};
	// para obtener el iva desde la bd
	React.useEffect(() => {
		async function getIva() {
			let response = await axios(`${serverapi}/itemsTodos`, options);
			response = response.data.empresas;
			setIva(parseFloat(response[0].PORIVA) / 100);
		}
		getIva();
	}, []);
	// para el modal de buscar
	const [openb, setOpenb] = React.useState(false);
	const handleOpenb = () => setOpenb(true);
	const handleCloseb = () => setOpenb(false);
	return (
		<FusePageSimple
			classes={{
				// toolbar: 'p-0',
				// header: 'h-10 sm:min-h-10 sm:min-h-10'
				// header: 'h-20 sm:h-21 sm:min-h-21'
				// contentToolbar: 'p-0'
				header: 'h-10 sm:min-h-60 sm:min-h-60'
			}}
			header={
				<>
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
						<h2 style={{ fontWeight: 'bold' }}>Ajuste de precios</h2>
						<form onSubmit={onSubmit}>
							<ButtonGroup variant="contained" color="primary" disableElevation>
								<Button
									color="primary"
									style={{ background: '#40EDF7', color: 'black', fontWeight: 'bold' }}
									onClick={DataView}
									// onClick={handleOpenb}
									variant="contained"
								>
									Buscar
								</Button>
								<Button
									color="primary"
									style={{ background: '#40EDF7', color: 'black', fontWeight: 'bold' }}
									variant="contained"
									onClick={() => {
										Excel(data.tab);
									}}
								>
									Excel
								</Button>

								<Button
									color="primary"
									type="submit"
									// onClick={onSubmit}
									style={{ background: '#40EDF7', color: 'black', fontWeight: 'bold' }}
									variant="contained"
								>
									Grabar
								</Button>
							</ButtonGroup>
						</form>
					</div>
				</>
			}
			// contentToolbar={
			// 	<div
			// 		style={{
			// 			margin: '3rem',
			// 			display: 'flex',
			// 			flexDirection: 'row',
			// 			justifyContent: 'space-between',
			// 			alignItems: 'center',
			// 			width: '100%'
			// 		}}
			// 	>
			// 		<h2 className="contentitle">Ajuste de precios</h2>
			// 		<form onSubmit={onSubmit}>
			// 			<ButtonGroup variant="contained" color="primary" disableElevation>
			// 				{/* <Button
			// 					color="primary"
			// 					style={{ background: '#1976d2' }}
			// 					// onClick={Nuevo}
			// 					variant="contained"
			// 				>
			// 					Nuevo
			// 				</Button> */}
			// 				<Button
			// 					color="primary"
			// 					style={{ background: '#1976d2' }}
			// 					onClick={DataView}
			// 					variant="contained"
			// 				>
			// 					Buscar
			// 				</Button>
			// 				<Button
			// 					color="primary"
			// 					style={{ background: '#1976d2' }}
			// 					variant="contained"
			// 					onClick={() => {
			// 						Excel(data.tab);
			// 					}}
			// 				>
			// 					Excel
			// 				</Button>

			// 				<Button
			// 					color="primary"
			// 					type="submit"
			// 					// onClick={onSubmit}
			// 					style={{ background: '#1976d2' }}
			// 					variant="contained"
			// 				>
			// 					Grabar
			// 				</Button>
			// 			</ButtonGroup>
			// 		</form>
			// 	</div>
			// }
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
					{/* Modal busqueda */}
					{/* <Modal
						open={openb}
						onClose={handleCloseb}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
						closeAfterTransition
						BackdropComponent={Backdrop}
						BackdropProps={{
							timeout: 500
						}}
					>
						<Fade in={openb}>
							<Box sx={stylemodal}>
								<div>
									<h2 style={{ margin: '1rem', fontWeight: 'bold' }}>Filtros</h2>
								</div>
								<Box ml={2} mr={2}>
									<GrabaCambio data={data} />
								</Box>
							</Box>
						</Fade>
					</Modal> */}
					<div style={{ margin: '2rem' }}>
						<Accordion defaultExpanded>
							<AccordionSummary
								expandIcon={<ExpandMore style={{ color: 'white' }} />}
								aria-controls="panel1a-content"
								// id="panel1a-header"
								sx={{ bgcolor: '#3543d0', color: 'white' }}
							>
								<Typography sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Busqueda</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Box m={2}>
									<Grid container spacing={1}>
										<Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
											<GrabaCambio data={data} />
										</Grid>
										<Grid container item xl={12} lg={12} md={12} sm={12} xs={12} spacing={1}>
											<Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
												<SetPrecio data={data} />
											</Grid>
											<Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
												<ListaEmpresa data={data} />
											</Grid>
											<Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
												<OpcionIncremento data={data} />
											</Grid>
											<Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
												<Button
													onClick={CalNewPvp}
													color="primary"
													variant="contained"
													style={{ Width: '200px' }}
													startIcon={<FindReplaceOutlined />}
												>
													{' '}
													Calcular{' '}
												</Button>
											</Grid>
										</Grid>
										<Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
											<p style={{ color: '#F20519' }}>la opcion incluye iva</p>
										</Grid>
									</Grid>
								</Box>
							</AccordionDetails>
						</Accordion>
						{/* TABLA */}
						<Accordion defaultExpanded>
							<AccordionSummary
								expandIcon={<ExpandMore style={{ color: 'white' }} />}
								aria-controls="panel1a-content"
								// id="panel1a-header"
								sx={{ bgcolor: '#3543d0', color: 'white' }}
							>
								<Typography sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Informe</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Box
									sx={{
										'& .columnclass': {
											fontSize: '1.1rem',
											width: '100%',
											fontFamily: 'Franklin Gothic '
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
										}
									}}
								>
									<div
										style={{
											margin: '0.8rem',
											height: '50vh',
											width: '100%',
											overflowY: 'hidden'
										}}
									>
										<DataGrid
											{...data.tab}
											editMode="cell"
											// disableColumnMenu
											hideFooterSelectedRowCount
											// disableColumnSelector
											onCellEditCommit={e => {
												Prueba2(e);
											}}
											// apiRef={apiRef}
											rows={data.tab}
											columns={columns}
											density="compact"
											getRowId={rows => rows.ITEM}
											sx={{
												boxShadow: 2,
												borderRadius: 5
											}}
											// editMode="cell"
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
							</AccordionDetails>
						</Accordion>
					</div>
				</>
			}
		/>
	);
}

export default AjustePrecio;
