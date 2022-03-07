// import { useEffect, useState } from 'react';

// const {
// 	Card,
// 	CardContent,
// 	makeStyles,
// 	Grid,
// 	Typography,
// 	Button,
// 	CircularProgress,
// 	TextField,
// 	Checkbox,
// 	useTheme
// } = require('@material-ui/core');

// function ComponetsCards(props) {
// 	const useStyles = makeStyles({
// 		root: {
// 			flexGrow: 1,
// 			backgroundColor: 'white'
// 		},
// 		rootc: {
// 			textAlign: 'left',
// 			backgroundColor: ' transparent'
// 			// width:'50%',
// 			// height:'50%'
// 		},
// 		rootcli: {
// 			textAlign: 'left',
// 			backgroundColor: ' transparent'
// 		},
// 		titulo: {
// 			fonWeight: 'bold',
// 			fontSize: 30,
// 			color: props.color
// 		},
// 		texto: {
// 			fontSize: 20,
// 			color: props.colortitulo
// 		},
// 		contenido: {
// 			position: 'sticky',
// 			top: '20px'
// 		},
// 		card1: {
// 			background: props.colorcard
// 		}
// 	});
// 	const theme = useTheme();
// 	// const data = _.merge({}, props.data);
// 	const classes = useStyles();
// 	// _.setWith(data, 'options.colors', [theme.palette.secondary.main]);

// 	return (
// 		<Card className={classes.card1}>
// 			<CardContent>
// 				{/* <div className={classes.contenido}>

// 				</div> */}
// 				{ props.icono}
// 				<Typography className={classes.titulo}>{props.texto}</Typography>
// 				<Typography className={classes.texto}>{props.titulo}</Typography>
// 			</CardContent>
// 		</Card>
// 	);
// }

// export default ComponetsCards;

import Card from '@material-ui/core/Card';
import Icon from '@material-ui/core/Icon';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import _ from '@lodash';
import ReactApexChart from 'react-apexcharts';

function ComponetsCards(props) {
	const theme = useTheme();
	const data = _.merge({}, props.data);
	_.setWith(data, 'options.colors', ['#FBFBFB']);

	return (
		<Card className="w-full rounded-20 shadow" style={{ background: '#007BFF' }}>
			<div className="p-20 pb-0">
				<Typography className="h3 text-white font-medium">Cliente Nuevos</Typography>

				<div className="flex flex-row flex-wrap items-center mt-12">
					<Typography className="text-48  text-white font-semibold leading-none tracking-tighter">
						{props.valor}
					</Typography>
				</div>
			</div>
			<div className="h-96 w-100-p">
				<ReactApexChart options={data.options} series={data.series} type="area" height="100" />
			</div>
		</Card>
	);
}

export default ComponetsCards;
