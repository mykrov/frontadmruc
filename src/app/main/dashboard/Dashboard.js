import FusePageSimple from '@fuse/core/FusePageSimple';
import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect } from 'react';
import _ from '@lodash';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import axios from 'axios';
import { motion } from 'framer-motion';
import ComponetsCards from './components/ComponentsCards';
import ComponetsCards2 from './components/CompoentsCards2';
import ComponetsCards3 from './components/ComponenetsCard3';

const { Card, makeStyles, Typography, CircularProgress } = require('@material-ui/core');

const ChartTittle = {
	fontSize: '1.5rem',
	fontWeight: '500'
};

const CardHeadWidget = {
	background: '#fff',
	color: '#1b2330',
	paddingBottom: '2rem'
};

function Dashboard() {
	const theme = useTheme();
	const useStyles = makeStyles({});
	// MODAL DE CARGANDO
	const [open1, setOpen1] = useState(false);
	const handleOpen1 = () => setOpen1(true);
	const handleClose1 = () => setOpen1(false);

	const [valTipoEmpresa, setvalTipoEmpresa] = useState([{ ID: 0, NOMBRE: '' }]);
	const [validEmpresa, setvalvalidEmpresa] = useState('');
	const [valCard1, setvalCard1] = useState(0);
	const [valCard2, setvalCard2] = useState(0);
	const [valCard3, setvalCard3] = useState(0);
	const classes = useStyles();

	const handleChangeValTipoIva = event => {
		setvalvalidEmpresa(event.target.value);
		getSearchData(event.target.value);
	};

	const [dataVentas, setDataVentas] = useState([
		{
			options: {
				stroke: {
					curve: 'smooth'
				},
				chart: {
					id: 'Ventas Charts',
					type: 'line',
					height: 100,
					background: '#fff'
				},
				xaxis: {
					categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec']
				}
			},
			series: [
				{
					nombre: 'Ventas Charts.',
					data: ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']
				}
			]
		}
	]);
	const [dataCobros, setDataCobros] = useState([
		{
			options: {
				stroke: {
					width: 1,
					colors: ['#fff']
				},
				chart: {
					id: 'Cobros Charts',
					type: 'bar',
					height: 100,
					background: '#FDFDFD'
				},
				plotOptions: {
					bar: {
						barHeight: '100%',
						distributed: true,
						horizontal: true,
						dataLabels: {
							position: 'bottom'
						}
					}
				},
				colors: ['#EC0033', '#09F5BE', '#F57403', '#005FF8', '#056212A2', '#90ee7e', '#F424D8', '#69d2e7'],
				xaxis: {
					categories: [
						'Efectivo',
						'Cheques',
						'Cuenta Contable',
						'Debito Bancario',
						'Depositos',
						'Otros',
						'Tarjeta de Credito',
						'Transferencia'
					]
				}
			},
			series: [
				{
					nombre: 'Cobros del Dia.',
					data: ['0', '0', '0', '0', '0', '0', '0', '0']
				}
			]
		}
	]);
	const [valTableProductos, setvalTableProductos] = useState([
		{
			ITEM: '02255',
			NOMBRE: '',
			total: '0'
		}
	]);

	const container = {
		show: {
			transition: {
				staggerChildren: 0.06
			}
		}
	};
	const item = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0 }
	};
	const datainfor = {
		id: 'widget2',
		conversion: {
			value: 492,
			ofTarget: 13
		},
		series: [
			{
				name: 'Conversion',
				data: [50.1, 20]
			}
		],
		options: {
			chart: {
				type: 'area',
				height: '100%',
				sparkline: {
					enabled: true
				}
			},
			fill: {
				type: 'solid',
				opacity: 0.7
			},
			xaxis: {
				categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
			},
			tooltip: {
				followCursor: true,
				theme: 'dark',
				fixed: {
					enabled: false,
					position: 'topRight',
					offsetX: 0,
					offsetY: 0
				}
			}
		}
	};
	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2
	});
	_.setWith(dataVentas[0], 'options.colors', [theme.palette.error.main]);

	useEffect(() => {
		async function obtenerCargaInicial() {
			const serverapi = process.env.REACT_APP_SERVERAPI;
			const options = { headers: { 'Access-Control-Allow-Origin': '*' } };
			handleOpen1();
			const urlFinal = `${serverapi}/dashboarinicial`;
			axios
				.get(urlFinal, options)
				.then(res => {
					const _listaventas = [];
					let _val01 = 0;
					let _val02 = 0;
					let _val03 = 0;
					let _val04 = 0;
					let _val05 = 0;
					let _val06 = 0;
					let _val07 = 0;
					let _val08 = 0;
					let _val09 = 0;
					let _val10 = 0;
					let _val11 = 0;
					let _val12 = 0;
					const dataC = res.data;
					setvalTipoEmpresa(dataC.empresas);
					setvalvalidEmpresa(dataC.empresas[0].ID);
					const dataCatCobros = dataC.cobropos.map(obj => {
						return obj.nombre;
					});
					const datanetoCobors = dataC.cobropos.map(obj => {
						return obj.total;
					});
					const seriesven = dataC.ventas.map(obj => {
						return parseFloat(obj.NETO).toFixed(2);
					});
					Object.values(dataC.ventas).forEach(val => {
						if (val.month_year === '01') {
							_val01 = parseFloat(val.NETO).toFixed(2);
						}
						if (val.month_year === '02') {
							_val02 = parseFloat(val.NETO).toFixed(2);
						}
						if (val.month_year === '03') {
							_val03 = parseFloat(val.NETO).toFixed(2);
						}
						if (val.month_year === '04') {
							_val04 = parseFloat(val.NETO).toFixed(2);
						}
						if (val.month_year === '05') {
							_val05 = parseFloat(val.NETO).toFixed(2);
						}
						if (val.month_year === '06') {
							_val06 = parseFloat(val.NETO).toFixed(2);
						}
						if (val.month_year === '07') {
							_val07 = parseFloat(val.NETO).toFixed(2);
						}
						if (val.month_year === '08') {
							_val08 = parseFloat(val.NETO).toFixed(2);
						}
						if (val.month_year === '09') {
							_val09 = parseFloat(val.NETO).toFixed(2);
						}
						if (val.month_year === '10') {
							_val10 = parseFloat(val.NETO).toFixed(2);
						}
						if (val.month_year === '11') {
							_val11 = parseFloat(val.NETO).toFixed(2);
						}
						if (val.month_year === '12') {
							_val12 = parseFloat(val.NETO).toFixed(2);
						}
					});

					_listaventas.push(_val01);
					_listaventas.push(_val02);
					_listaventas.push(_val03);
					_listaventas.push(_val04);
					_listaventas.push(_val05);
					_listaventas.push(_val06);
					_listaventas.push(_val07);
					_listaventas.push(_val08);
					_listaventas.push(_val09);
					_listaventas.push(_val10);
					_listaventas.push(_val11);
					_listaventas.push(_val12);
					setDataVentas([
						{
							options: {
								xaxis: {
									categories: [
										'Ene',
										'Feb',
										'Mar',
										'Abr',
										'May',
										'Jun',
										'Jul',
										'Ago',
										'Sep',
										'Oct',
										'Nov',
										'Dec'
									]
								}
							},
							series: [
								{
									name: 'Total $',
									data: _listaventas
								}
							]
						}
					]);
					// Cobros
					setDataCobros([
						{
							colors: [
								'#d4526e',
								'#13d8aa',
								'#A5978B',
								'#2b908f',
								'#f9a3a4',
								'#90ee7e',
								'#f48024',
								'#69d2e7'
							],
							options: {
								xaxis: {
									categories: dataCatCobros
								}
							},
							series: [
								{
									name: 'Sumatoria Total $ ',
									data: datanetoCobors
								}
							]
						}
					]);
					setvalTableProductos(dataC.productos);
					setvalCard1(dataC.cliente);
					setvalCard2(parseFloat(dataC.ventadirec).toFixed(2));
					setvalCard3(parseFloat(dataC.ventapos).toFixed(2));
					handleClose1();
				})
				.catch(err => {
					handleClose1();
				});
		}
		obtenerCargaInicial();
	}, []);

	async function getSearchData(idempresaval) {
		const serverapi = process.env.REACT_APP_SERVERAPI;
		const options = { headers: { 'Access-Control-Allow-Origin': '*' } };
		handleOpen1();
		const urlFinal = `${serverapi}/dashboardempresa/${idempresaval}`;
		axios
			.get(urlFinal, options)
			.then(res => {
				const dataC = res.data;
				const _listaventas = [];
				let _val01 = 0;
				let _val02 = 0;
				let _val03 = 0;
				let _val04 = 0;
				let _val05 = 0;
				let _val06 = 0;
				let _val07 = 0;
				let _val08 = 0;
				let _val09 = 0;
				let _val10 = 0;
				let _val11 = 0;
				let _val12 = 0;
				const dataCatCobros = dataC.cobropos.map(obj => {
					return obj.nombre;
				});
				const datanetoCobors = dataC.cobropos.map(obj => {
					return obj.total;
				});
				Object.values(dataC.ventas).forEach(val => {
					if (val.month_year === '01') {
						_val01 = parseFloat(val.NETO).toFixed(2);
					}
					if (val.month_year === '02') {
						_val02 = parseFloat(val.NETO).toFixed(2);
					}
					if (val.month_year === '03') {
						_val03 = parseFloat(val.NETO).toFixed(2);
					}
					if (val.month_year === '04') {
						_val04 = parseFloat(val.NETO).toFixed(2);
					}
					if (val.month_year === '05') {
						_val05 = parseFloat(val.NETO).toFixed(2);
					}
					if (val.month_year === '06') {
						_val06 = parseFloat(val.NETO).toFixed(2);
					}
					if (val.month_year === '07') {
						_val07 = parseFloat(val.NETO).toFixed(2);
					}
					if (val.month_year === '08') {
						_val08 = parseFloat(val.NETO).toFixed(2);
					}
					if (val.month_year === '09') {
						_val09 = parseFloat(val.NETO).toFixed(2);
					}
					if (val.month_year === '10') {
						_val10 = parseFloat(val.NETO).toFixed(2);
					}
					if (val.month_year === '11') {
						_val11 = parseFloat(val.NETO).toFixed(2);
					}
					if (val.month_year === '12') {
						_val12 = parseFloat(val.NETO).toFixed(2);
					}
				});

				_listaventas.push(_val01);
				_listaventas.push(_val02);
				_listaventas.push(_val03);
				_listaventas.push(_val04);
				_listaventas.push(_val05);
				_listaventas.push(_val06);
				_listaventas.push(_val07);
				_listaventas.push(_val08);
				_listaventas.push(_val09);
				_listaventas.push(_val10);
				_listaventas.push(_val11);
				_listaventas.push(_val12);
				setDataVentas([
					{
						options: {
							xaxis: {
								categories: [
									'Ene',
									'Feb',
									'Mar',
									'Abr',
									'May',
									'Jun',
									'Jul',
									'Ago',
									'Sep',
									'Oct',
									'Nov',
									'Dec'
								]
							}
						},
						series: [
							{
								name: 'Total $',
								data: _listaventas
							}
						]
					}
				]);
				// Cobros
				setDataCobros([
					{
						colors: [
							'#d4526e',
							'#13d8aa',
							'#A5978B',
							'#2b908f',
							'#f9a3a4',
							'#90ee7e',
							'#f48024',
							'#69d2e7'
						],
						options: {
							xaxis: {
								categories: dataCatCobros
							}
						},
						series: [
							{
								name: 'Sumatoria Total $ ',
								data: datanetoCobors
							}
						]
					}
				]);
				setvalTableProductos(dataC.productos);
				setvalCard1(dataC.cliente);
				setvalCard2(parseFloat(dataC.ventadirec).toFixed(2));
				setvalCard3(parseFloat(dataC.ventapos).toFixed(2));
				handleClose1();
			})
			.catch(err => {
				handleClose1();
			});
	}

	return (
		<FusePageSimple
			classes={{
				root: classes.layoutRoot
			}}
			contentToolbar={
				<div className="px-20 flex flex-col ">
					<h1>IMPORTADORA ZANNU </h1>
				</div>
			}
			content={
				<div className="w-full">
					<div className="px-24">
						<FormControl sx={{ m: 1, minWidth: 350 }}>
							<Select
								className="bg-white"
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={validEmpresa}
								size="small"
								label={validEmpresa}
								onChange={handleChangeValTipoIva}
							>
								{valTipoEmpresa.map(rows => (
									<MenuItem key={rows.ID} value={rows.ID}>
										{rows.NOMBRE}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</div>
					<div className="px-24">
						<Card className="w-full rounded-20 shadow " sx={{ borderRadius: '1.5rem' }}>
							<div className="p-5 pb-2" style={CardHeadWidget}>
								<Typography className="h3 font-medium" style={ChartTittle}>
									Ventas del Año.
								</Typography>
							</div>

							<div className="h-97 w-100-p">
								<ReactApexChart
									options={dataVentas[0].options}
									series={dataVentas[0].series}
									type="area"
									height="200"
								/>
							</div>
						</Card>
					</div>
					<motion.div
						className="flex flex-col md:flex-row sm:p-8 container"
						variants={container}
						initial="hidden"
						animate="show"
					>
						<div className="flex flex-1 flex-col min-w-0 pt-10">
							<div className="flex flex-col sm:flex sm:flex-row pb-1">
								<motion.div variants={item} className="widget flex w-full sm:w-1/2 p-16">
									<ComponetsCards data={datainfor} valor={valCard1} />
								</motion.div>
								<motion.div variants={item} className="widget flex w-full sm:w-1/2 p-16">
									<ComponetsCards2 data={datainfor} valor={valCard2} />
								</motion.div>
								<motion.div variants={item} className="widget flex w-full sm:w-1/2 p-16">
									<ComponetsCards3 data={datainfor} valor={valCard3} />
								</motion.div>
							</div>
							<motion.div variants={item} className="widget w-full p-10 pb-5">
								<Card
									className="w-full rounded-20 shadow "
									elevation={12}
									sx={{ borderRadius: '1.5rem' }}
								>
									<div className="p-20 pb-2" style={CardHeadWidget}>
										<Typography className="h3 font-medium" style={ChartTittle}>
											Cobros del Dia.
										</Typography>
									</div>

									<div className="h-97 w-100-p">
										<ReactApexChart
											options={dataCobros[0].options}
											series={dataCobros[0].series}
											type="bar"
											height="300"
										/>
									</div>
								</Card>
							</motion.div>
						</div>
						<div className="flex flex-wrap w-full md:w-320 pt-10">
							<div className="mb-32 w-full sm:w-1/2 md:w-full">
								<motion.div variants={item} className="widget w-full p-16">
									<Card className="w-full rounded-20 shadow p-20">
										<div className="p-20 pb-2" style={CardHeadWidget}>
											<Typography className="h3 font-medium" style={ChartTittle}>
												Productos Mas Vendidos
											</Typography>
										</div>
										<table className="simple clickable">
											<thead>
												<tr>
													<th className="text-left">
														<Typography color="textSecondary" className="font-semibold">
															Nombre
														</Typography>
													</th>
													<th className="text-right">
														<Typography color="textSecondary" className="font-semibold">
															Valor
														</Typography>
													</th>
												</tr>
											</thead>
											<tbody>
												{valTableProductos.map(row => (
													<tr key={row.ITEM}>
														<td className="font-semibold">{row.NOMBRE}</td>
														<td className="text-right">{formatter.format(row.total)}</td>
													</tr>
												))}
											</tbody>
										</table>
									</Card>
								</motion.div>
							</div>
						</div>
					</motion.div>
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
				</div>
			}
		/>
	);
}

export default Dashboard;
