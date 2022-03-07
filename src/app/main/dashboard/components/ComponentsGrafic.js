// import _ from '@lodash';
// import Card from '@material-ui/core/Card';
// import Divider from '@material-ui/core/Divider';
// import { useTheme } from '@material-ui/core/styles';
// import Tab from '@material-ui/core/Tab';
// import Tabs from '@material-ui/core/Tabs';
// import Typography from '@material-ui/core/Typography';
// import { memo, useState } from 'react';
// import ReactApexChart from 'react-apexcharts';

// const {

// 	makeStyles,

// } = require('@material-ui/core');

// function ComponetsGrafic(props) {
// 	const theme = useTheme();
// 	const [tabValue, setTabValue] = useState(0);
// 	const data = _.merge({}, props.data);
// 	//console.log(data.ranges);
// 	const series = data.ranges[Object.keys(data.ranges)[tabValue]];

// 	console.log(data.mainChart.options);
// 	console.log(series);
// 	console.log(data.mainChart.options.chart.type);
// 	console.log(data.mainChart.options.chart.height);
// 	const useStyles = makeStyles({
// 		layoutRoot: {
// 			padding: '10px 10px,10px,10px'
// 		},
// 		iconos: {
// 			fontSize: '1rem',

// 			color: 'red'
// 		},
// 		iconos2: {
// 			fontSize: '1rem',

// 			color: 'blue'
// 		},
// 		iconos3: {
// 			fontSize: '1rem',

// 			color: 'green'
// 		},
// 		card1: {
// 			color: '#3C5465'
// 		},
// 	});
// 	const classes = useStyles();
// 	_.setWith(data, 'options.colors', [theme.palette.secondary.main, theme.palette.primary.main]);

// 	return (
// 		<Card className={classes.card1}>
// 			<div className="relative p-20 flex flex-row items-center justify-between">
// 				<div className="flex flex-col">
// 					<Typography className="h3 sm:h2 font-medium">Visitors & Page views</Typography>
// 				</div>

// 				<div className="flex flex-row items-center">
// 					<Tabs
// 						value={tabValue}
// 						onChange={(event, value) => setTabValue(value)}
// 						indicatorColor="secondary"
// 						textColor="inherit"
// 						variant="scrollable"
// 						scrollButtons="off"
// 						className="w-full px-24 -mx-4 min-h-40"
// 						classes={{ indicator: 'flex justify-center bg-transparent w-full h-full' }}
// 						TabIndicatorProps={{
// 							children: <Divider className="w-full h-full rounded-full opacity-50" />
// 						}}
// 					>
// 						{Object.keys(data.ranges).map(key => (
// 							<Tab
// 								key={key}
// 								className="text-14 font-semibold min-h-40 min-w-64 mx-4 capitalize"
// 								disableRipple
// 								label={key}
// 							/>
// 						))}
// 					</Tabs>
// 				</div>
// 			</div>

// 			{/* <div className="relative h-200 sm:h-320 sm:pb-16">
// 				<ReactApexChart
// 					options={data.mainChart.options}
// 					series={series}
// 					type={data.mainChart.options.chart.type}
// 					height={data.mainChart.options.chart.height}
// 				/>
// 			</div> */}
// 		</Card>
// 	);
// }

// export default memo(ComponetsGrafic);
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

const { makeStyles, Grid, Button, CircularProgress, TextField, Checkbox } = require('@material-ui/core');

export default function ComponetsGrafic(props) {
	// const useStyles = makeStyles({
	// 	root: {
	// 		flexGrow: 1,
	// 		backgroundColor: 'white'
	// 	},
	// 	rootc: {
	// 		textAlign: 'left',
	// 		backgroundColor: ' transparent'
	// 		// width:'50%',
	// 		// height:'50%'
	// 	},
	// 	rootcli: {
	// 		textAlign: 'left',
	// 		backgroundColor: ' transparent'
	// 	},
	// 	titulo: {
	// 		fonWeight: 'bold',
	// 		fontSize: 40,
	// 		color: props.color
	// 	},
	// 	texto: {
	// 		fontSize: 25,
	// 		color: props.colortitulo
	// 	},
	// 	contenido: {
	// 		position: 'sticky',
	// 		top: '20px'
	// 	},
	// 	card1: {
	// 		background: props.colorcard
	// 	}
	// });
	const theme = useTheme();
	// const data = _.merge({}, props.data);
	//	const classes = useStyles();
	const useStyles = makeStyles({
		root: {
			flexGrow: 1,
			backgroundColor: 'white'
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
			fontSize: 40,
			color: props.color
		},
		texto: {
			fontSize: 25,
			color: props.colortitulo
		},
		contenido: {
			position: 'sticky',
			top: '20px'
		},
		card1: {
			background: 'red'
		}
	});
	const classes = useStyles();
	return (
		<Card className={classes.card1} sx={{ display: 'flex' }}>
			<Box className={classes.card1} sx={{ display: 'flex', flexDirection: 'column' }}>
				<CardContent sx={{ flex: '1 0 auto' }}>
					<Typography component="div" variant="h4">
						CLientes Nuevos
					</Typography>
					<Typography className="block text-16 text-red  rounded-full" component="div">
						150
					</Typography>
				</CardContent>
				{/* <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
					<IconButton aria-label="previous">
						{theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
					</IconButton>
					<IconButton aria-label="play/pause">
						<PlayArrowIcon sx={{ height: 38, width: 38 }} />
					</IconButton>
					<IconButton aria-label="next">
						{theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
					</IconButton>
				</Box> */}
			</Box>
			<SupervisedUserCircleIcon sx={{ fontSize: 130 }} className="block text-16 text-red bg-white rounded-full"/>
		</Card>
	);
}
