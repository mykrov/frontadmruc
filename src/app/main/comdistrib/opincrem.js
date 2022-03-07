import * as React from 'react';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
// import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import TextField from '@mui/material/TextField';
import { TextField } from '@material-ui/core';

export default function OpcionIncremento(data) {
	const [op, setOp] = React.useState('costo');
	const handleChange = event => {
		setOp(event.target.value);
	};
	const [por, setPor] = React.useState(0);
	const handleSetPor = event => {
		setPor(event.target.value);
	};

	// pa el ajuste
	data.data.opinc = op;
	data.data.porcen = por;
	return (
		<Box>
			<Grid container spacing={1}>
				<Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
					<TextField
						select
						size="small"
						variant="outlined"
						fullWidth
						// sx={{ fontSize: '5rem' }}
						value={op}
						label="Opcion de incremento en base al"
						onChange={handleChange}
					>
						<MenuItem value="costo">Costo</MenuItem>
						<MenuItem value="precio">Precio</MenuItem>
					</TextField>
				</Grid>
				<Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
					<TextField
						size="small"
						variant="outlined"
						fullWidth
						value={por}
						onChange={handleSetPor}
						label="Porcentaje"
						type="number"
						InputLabelProps={{
							shrink: true
						}}
						InputProps={{ inputProps: { min: 0 } }}
					/>
				</Grid>
			</Grid>
		</Box>
	);
}
