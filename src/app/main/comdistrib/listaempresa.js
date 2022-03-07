import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const serverapi = process.env.REACT_APP_SERVERAPI; // SERVICIO
const options = { headers: { 'Access-Control-Allow-Origin': '*' } }; // cors
// REFLEJA CAMBIO DE PRECIO
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

export default function ListaEmpresa(data) {
	const MenuProps = {
		PaperProps: {
			style: {
				maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
				width: 250
			}
		}
	};
	const [names, setName] = React.useState([]);
	// console.log(names);
	// let nameq = [];
	React.useEffect(() => {
		async function GetEmpresas() {
			let response = await axios(`${serverapi}/itemsTodos`, options);
			response = response.data.empresas;
			// eslint-disable-next-line react-hooks/exhaustive-deps
			// nameq = response.data.empresas;
			setName(response);
		}
		// async function GetEmpresas1() {
		// 	let response = await axios(`${serverapi}/itemsTodos`);
		// 	response = response.data.empresas;
		// 	// eslint-disable-next-line react-hooks/exhaustive-deps
		// 	nameu = response.data.empresas.map(er => {
		// 		return er.NOMBRE;
		// 	});
		// }
		GetEmpresas();
		// GetEmpresas1();
	}, []);
	function getStyles(name, personName, theme) {
		return {
			fontWeight:
				personName.indexOf(name.NOMBRE) === -1
					? theme.typography.fontWeightRegular
					: theme.typography.fontWeightMedium
		};
	}
	const dt = [];
	function GetEmpresas1() {
		axios(`${serverapi}/itemsTodos`, options).then(res => {
			const emp = res.data.empresas;
			emp.forEach(re => {
				dt.push(re.NOMBRE);
			});
		});
	}
	GetEmpresas1();
	// console.log(dt);
	const theme = useTheme();
	const [personName, setPersonName] = React.useState(dt);

	const handleChange = event => {
		const {
			target: { value }
		} = event;
		setPersonName(
			// On autofill we get a the stringified value.
			typeof value === 'string' ? value.split(',') : value
		);
	};
	// pa ajuste
	data.data.empresas = personName;
	return (
		<div>
			<FormControl fullWidth>
				{/* <InputLabel id="demo-multiple-chip-label" sx={{ fontSize: '1.2rem' }}>
					Empresas
				</InputLabel> */}
				<Select
					labelId="demo-multiple-chip-label"
					id="demo-multiple-chip"
					size="medium"
					multiple
					// defaultChecked
					value={personName}
					onChange={handleChange}
					input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
					renderValue={selected => (
						<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, fontWeight: 'bold' }}>
							{selected.map(value => (
								<Chip key={value} label={value} />
							))}
						</Box>
					)}
					MenuProps={MenuProps}
				>
					{names.map(name => (
						<MenuItem key={name.ID} value={name.NOMBRE} style={getStyles(name, personName, theme)}>
							{name.NOMBRE}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
}
